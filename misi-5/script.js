'use strict';

/* ════════════════════════════════════════
   JADWAL IMSAKIYAH — script.js
   ════════════════════════════════════════ */

/* ── CONSTANTS ── */
const BASE_URL = 'https://api.myquran.com/v2/sholat';

function _localDate() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

const TODAY = _localDate();
const TAHUN = new Date().getFullYear();
const BULAN = new Date().getMonth() + 1;

/* ── STATE ── */
let currentKota = '';
let fetchSeq = 0;

/* ── UTILITIES ── */
const sleep = ms => new Promise(r => setTimeout(r, ms));

function toTitleCase(s) {
    return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

/* ── DATA STORE ── */
const CITIES = [];
const CITY_NAME_MAP = {};

/* ════════════════════════════════════════
   DOM REFS
   ════════════════════════════════════════ */
const kotaInfo = document.getElementById('kotaInfo');
const kotaBadge = document.getElementById('kotaBadge');
const kotaNama = document.getElementById('kotaNama');
const kotaDaerah = document.getElementById('kotaDaerah');
const todayBar = document.getElementById('todayBar');
const todayBarText = document.getElementById('todayBarText');
const stateLoading = document.getElementById('stateLoading');
const stateError = document.getElementById('stateError');
const stateEmpty = document.getElementById('stateEmpty');
const tableWrap = document.getElementById('tableWrap');
const jadwalBody = document.getElementById('jadwalBody');
const errorMsg = document.getElementById('errorMsg');
const pageLoader = document.getElementById('pageLoader');
const loaderText = document.getElementById('loaderText');

/* ════════════════════════════════════════
   UI HELPERS
   ════════════════════════════════════════ */

function showState(active) {
    [stateLoading, stateError, stateEmpty, tableWrap, todayBar]
        .forEach(el => el.classList.remove('show'));
    if (active) active.classList.add('show');
}

function showLoader(msg) {
    loaderText.textContent = msg || 'Memuat…';
    pageLoader.classList.add('show');
}

function hideLoader() {
    pageLoader.classList.remove('show');
}

/* ════════════════════════════════════════
   LOAD CITIES FROM API
   ════════════════════════════════════════ */
async function loadCities() {
    const input = document.getElementById('citySearch');
    input.placeholder = 'Memuat daftar kota…';
    input.disabled = true;

    try {
        const res = await fetch(`${BASE_URL}/kota/semua`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json.status || !Array.isArray(json.data))
            throw new Error('Format data tidak valid');

        CITIES.length = 0;
        json.data.forEach(item => {
            const raw = (item.lokasi || item.kota || '').trim();
            const id = String(item.id);
            const isKab = /^KAB/i.test(raw);
            const bersih = raw.replace(/^(KOTA\s+|KAB\.\s*|KABUPATEN\s+)/i, '').trim();
            const prov = (item.daerah || item.provinsi || '').trim();
            CITIES.push({ id, n: bersih, p: prov, t: isKab ? 'Kabupaten' : 'Kota' });
            CITY_NAME_MAP[id] = bersih;
        });

        CITIES.sort((a, b) =>
            a.p.localeCompare(b.p, 'id') ||
            a.n.localeCompare(b.n, 'id') ||
            (a.t === 'Kota' ? -1 : 1)
        );

        input.placeholder = 'Cari kota atau kabupaten…';
        input.disabled = false;

    } catch (e) {
        input.placeholder = 'Gagal memuat kota';
        input.disabled = false;

        const dd = document.getElementById('cityDropdown');
        dd.innerHTML = `
            <div class="cd-empty" style="padding:20px 16px">
                <div style="font-size:26px;margin-bottom:8px">⚠️</div>
                <div style="font-weight:700;color:#DC2626;margin-bottom:4px">Gagal memuat daftar kota</div>
                <div style="font-size:11px;color:#6B7280;margin-bottom:12px">${e.message}</div>
                <button onclick="retryLoadCities()"
                    style="padding:8px 16px;background:var(--green);color:#fff;border:none;
                           border-radius:7px;font-family:'Poppins',sans-serif;
                           font-size:12px;font-weight:700;cursor:pointer">
                    ↺ Coba Lagi
                </button>
            </div>`;
        dd.classList.add('show');
    }
}

async function retryLoadCities() {
    document.getElementById('cityDropdown').classList.remove('show');
    await loadCities();
}

/* ════════════════════════════════════════
   SEARCH & DROPDOWN
   ════════════════════════════════════════ */
let dropdownHighlight = -1;

function buildDropdown(list) {
    const dd = document.getElementById('cityDropdown');

    if (!list.length) {
        dd.innerHTML = '<div class="cd-empty">Kota tidak ditemukan</div>';
        dd.classList.add('show');
        return;
    }

    const byProv = {};
    list.forEach(c => {
        if (!byProv[c.p]) byProv[c.p] = [];
        byProv[c.p].push(c);
    });

    let html = '';
    Object.entries(byProv)
        .sort(([a], [b]) => a.localeCompare(b, 'id'))
        .forEach(([prov, cities]) => {
            html += `<div class="cd-prov-label">${prov}</div>`;
            cities.forEach(c => {
                html += `<div class="cd-item${c.id === currentKota ? ' selected' : ''}"
                              data-id="${c.id}" onclick="selectCity('${c.id}')">
                             ${c.n}
                             <span class="cd-item-kabkot">${c.t}</span>
                         </div>`;
            });
        });

    dd.innerHTML = html;
    dd.classList.add('show');
    dropdownHighlight = -1;
}

function showDropdown() {
    const q = document.getElementById('citySearch').value.trim();
    if (!q) buildDropdown(CITIES);
    else onSearch();
}

function onSearch() {
    const q = document.getElementById('citySearch').value.trim().toLowerCase();
    document.getElementById('searchClear').classList.toggle('show', q.length > 0);
    if (!q) { buildDropdown(CITIES); return; }
    buildDropdown(
        CITIES.filter(c =>
            c.n.toLowerCase().includes(q) ||
            c.p.toLowerCase().includes(q)
        )
    );
}

function clearSearch() {
    document.getElementById('citySearch').value = '';
    document.getElementById('searchClear').classList.remove('show');
    buildDropdown(CITIES);
    document.getElementById('citySearch').focus();
}

function onSearchKey(e) {
    const items = document.querySelectorAll('#cityDropdown .cd-item');
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        dropdownHighlight = Math.min(dropdownHighlight + 1, items.length - 1);
        highlightItem(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        dropdownHighlight = Math.max(dropdownHighlight - 1, 0);
        highlightItem(items);
    } else if (e.key === 'Enter' && dropdownHighlight >= 0 && items[dropdownHighlight]) {
        items[dropdownHighlight].click();
    } else if (e.key === 'Escape') {
        closeDropdown();
    }
}

function highlightItem(items) {
    items.forEach((el, i) => el.classList.toggle('highlight', i === dropdownHighlight));
    if (items[dropdownHighlight])
        items[dropdownHighlight].scrollIntoView({ block: 'nearest' });
}

function closeDropdown() {
    document.getElementById('cityDropdown').classList.remove('show');
    dropdownHighlight = -1;
}

document.addEventListener('mousedown', e => {
    if (!document.getElementById('citySearch').closest('.search-wrap').contains(e.target))
        closeDropdown();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDropdown(); });

/* ════════════════════════════════════════
   SELECT CITY
   ════════════════════════════════════════ */
function selectCity(id) {
    const city = CITIES.find(c => c.id === id);
    if (!city) return;
    currentKota = id;
    document.getElementById('citySearch').value = city.n;
    document.getElementById('searchClear').classList.add('show');
    closeDropdown();
    fetchJadwal();
}

/* ════════════════════════════════════════
   FETCH JADWAL
   ════════════════════════════════════════ */
async function fetchJadwal() {
    showState(stateLoading);
    showLoader('Memuat data jadwal…');
    hideCountdown();

    const seq = ++fetchSeq;
    const kotaSnap = currentKota;
    const url = `${BASE_URL}/jadwal/${kotaSnap}/${TAHUN}/${BULAN}`;

    try {
        const [res] = await Promise.all([fetch(url), sleep(1200)]);
        if (seq !== fetchSeq) return;

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (seq !== fetchSeq) return;

        if (!json.status || !json.data) throw new Error('Data tidak valid');
        renderTable(json.data, kotaSnap);

    } catch (err) {
        if (seq !== fetchSeq) return;
        errorMsg.textContent = err.message.includes('HTTP')
            ? `Server error: ${err.message}`
            : 'Gagal terhubung ke server. Periksa koneksi internet.';
        showState(stateError);

    } finally {
        if (seq === fetchSeq) hideLoader();
    }
}

function retryFetch() {
    if (currentKota) fetchJadwal();
}

/* ════════════════════════════════════════
   RENDER TABLE
   ════════════════════════════════════════ */
function renderTable(data, kotaSnap) {
    const city = CITIES.find(c => c.id === kotaSnap);
    kotaBadge.textContent = city ? city.t : '—';
    kotaNama.textContent = data.lokasi ? toTitleCase(data.lokasi) : (city?.n || '—');
    kotaDaerah.textContent = data.daerah ? toTitleCase(data.daerah) : (city?.p || '—');
    kotaInfo.classList.add('show');

    const jadwal = data.jadwal || [];
    if (!jadwal.length) {
        errorMsg.textContent = 'Tidak ada data jadwal untuk bulan ini.';
        showState(stateError);
        return;
    }

    const todayRow = jadwal.find(j => j.date === TODAY);

    const badge = t => `<span class="time-badge">${t}</span>`;
    jadwalBody.innerHTML = jadwal.map(j => `
        <tr class="${j.date === TODAY ? 'today-row' : ''}">
            <td>${j.tanggal}</td>
            <td>${badge(j.imsak)}</td>
            <td>${badge(j.subuh)}</td>
            <td>${badge(j.dzuhur)}</td>
            <td>${badge(j.ashar)}</td>
            <td>${badge(j.maghrib)}</td>
            <td>${badge(j.isya)}</td>
        </tr>`).join('');

    if (todayRow) {
        todayBarText.textContent = `Hari ini — ${todayRow.tanggal} — ditandai hijau`;
        todayBar.classList.add('show');
    }

    showState(null);
    tableWrap.classList.add('show');

    if (todayRow) {
        startCountdown(todayRow);
    } else {
        hideCountdown();
    }

    if (window.innerWidth < 700) {
        const hint = document.getElementById('swipeHintTable');
        hint.classList.add('show');
        const hide = () => {
            hint.style.transition = 'opacity .3s';
            hint.style.opacity = '0';
            setTimeout(() => hint.style.display = 'none', 300);
        };
        tableWrap.addEventListener('scroll', hide, { once: true, passive: true });
        setTimeout(hide, 4000);
    }

    if (todayRow) {
        setTimeout(() => {
            const tr = jadwalBody.querySelector('.today-row');
            if (tr) tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
    }
}

/* ════════════════════════════════════════
   COUNTDOWN — DATA
   ════════════════════════════════════════ */
const PRAYERS = [
    { key: 'imsak', label: 'Imsak', icon: '🌙' },
    { key: 'subuh', label: 'Subuh', icon: '🌅' },
    { key: 'dzuhur', label: 'Dzuhur', icon: '☀️' },
    { key: 'ashar', label: 'Ashar', icon: '🌤️' },
    { key: 'maghrib', label: 'Maghrib', icon: '🌆' },
    { key: 'isya', label: 'Isya', icon: '🌃' },
];

let _cdInterval = null;
let _cdSchedule = null;

function timeToSec(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 3600 + m * 60;
}

function nowSec() {
    const d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

function fmtSec(s) {
    const hh = String(Math.floor(s / 3600)).padStart(2, '0');
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}

/* Format tanggal Indonesia */
function formatTanggalHariIni() {
    const d = new Date();
    const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const BULAN_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return {
        hari: HARI[d.getDay()],
        full: `${d.getDate()} ${BULAN_ID[d.getMonth()]} ${d.getFullYear()}`
    };
}

/* ════════════════════════════════════════
   COUNTDOWN — INIT & DESTROY
   ════════════════════════════════════════ */
function startCountdown(scheduleRow) {
    _cdSchedule = scheduleRow;

    const times = PRAYERS.map(p => ({
        ...p,
        sec: timeToSec(scheduleRow[p.key]),
        rawTime: scheduleRow[p.key],
    }));

    /* Inject tanggal ke section-head */
    _renderDatePill();

    const sec = document.getElementById('sectionCountdown');
    sec.style.display = '';
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(18px)';
    requestAnimationFrame(() => {
        sec.style.transition = 'opacity .5s ease, transform .5s ease';
        sec.style.opacity = '1';
        sec.style.transform = 'translateY(0)';
    });

    if (_cdInterval) clearInterval(_cdInterval);
    _cdTick(times);
    _cdInterval = setInterval(() => _cdTick(times), 1000);
}

function hideCountdown() {
    if (_cdInterval) { clearInterval(_cdInterval); _cdInterval = null; }
    _cdSchedule = null;
    const sec = document.getElementById('sectionCountdown');
    sec.style.display = 'none';
}

/* ── Render pill tanggal di section-head ── */
function _renderDatePill() {
    const head = document.querySelector('#sectionCountdown .section-head');
    if (!head) return;

    /* Hapus pill lama kalau ada */
    const old = head.querySelector('.cdt-date-pill');
    if (old) old.remove();

    const { hari, full } = formatTanggalHariIni();
    const pill = document.createElement('div');
    pill.className = 'cdt-date-pill';
    pill.innerHTML = `
        <span class="cdt-date-day">${hari}</span>
        <span class="cdt-date-full">${full}</span>`;
    head.appendChild(pill);
}

/* ════════════════════════════════════════
   COUNTDOWN — TICK
   ════════════════════════════════════════ */
function _cdTick(times) {
    const now = nowSec();

    let nextIdx = times.findIndex(p => p.sec > now);

    let prev, next;

    if (nextIdx === -1) {
        prev = times[times.length - 1];
        next = { ...times[0], sec: times[0].sec + 86400, label: 'Imsak (Esok)' };
    } else if (nextIdx === 0) {
        prev = { label: 'Tengah Malam', icon: '🌑', sec: 0, rawTime: '00:00' };
        next = times[0];
    } else {
        prev = times[nextIdx - 1];
        next = times[nextIdx];
    }

    const remaining = next.sec - now;
    const total = next.sec - prev.sec;
    const elapsed = total - remaining;
    const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));

    /* Update kolom kiri */
    document.getElementById('cdtPeriodIcon').textContent = prev.icon || '🕌';
    document.getElementById('cdtPeriodName').textContent = `Waktu ${prev.label}`;
    document.getElementById('cdtPeriodTime').textContent = prev.rawTime || '—';

    /* Update kolom tengah */
    document.getElementById('cdtNextLabel').textContent = `Menuju ${next.label}`;
    document.getElementById('cdtTimer').textContent = fmtSec(remaining);
    document.getElementById('cdtNextTime').textContent = next.rawTime ? `pukul ${next.rawTime}` : '';

    document.getElementById('cdtProgressFill').style.width = `${progress}%`;
    document.getElementById('cdtProgStart').textContent = `${prev.label} ${prev.rawTime || ''}`;
    document.getElementById('cdtProgEnd').textContent = `${next.label} ${next.rawTime || ''}`;

    /* Update kolom kanan — 1 item saja: waktu BERIKUTNYA */
    document.getElementById('cdtPrayerList').innerHTML = `
        <div class="cdt-right-label">Berikutnya</div>
        <div class="cdt-prayer-icon">${next.icon || '🕌'}</div>
        <div class="cdt-prayer-name">${next.label}</div>
        <div class="cdt-prayer-time">${next.rawTime || '—'}</div>`;
}

/* ════════════════════════════════════════
   COUNTDOWN — RENDER PRAYER LIST (tidak dipakai, tapi dibiarkan)
   ════════════════════════════════════════ */
function renderPrayerList() { /* digantikan oleh _cdTick */ }

/* ════════════════════════════════════════
   GEOLOCATION
   ════════════════════════════════════════ */
function deg2rad(d) { return d * Math.PI / 180 }
function haversine(la1, ln1, la2, ln2) {
    const R = 6371;
    const dL = deg2rad(la2 - la1);
    const dN = deg2rad(ln2 - ln1);
    const a = Math.sin(dL / 2) ** 2
        + Math.cos(deg2rad(la1)) * Math.cos(deg2rad(la2)) * Math.sin(dN / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const CITY_COORDS = {
    'BANDA ACEH': [5.5577, 95.3222], 'MEDAN': [3.5897, 98.6728], 'PADANG': [-0.9492, 100.3543],
    'PEKANBARU': [0.5071, 101.4478], 'BATAM': [1.13, 104.02], 'JAMBI': [-1.6101, 103.6131],
    'PALEMBANG': [-2.9761, 104.7754], 'BENGKULU': [-3.7928, 102.2608],
    'BANDARLAMPUNG': [-5.3971, 105.2668], 'PANGKALPINANG': [-2.1316, 106.1169],
    'TANJUNGPINANG': [0.918, 104.458], 'JAKARTA': [-6.2088, 106.8456],
    'SERANG': [-6.1104, 106.164], 'BANDUNG': [-6.9175, 107.6191], 'BEKASI': [-6.2349, 106.9896],
    'BOGOR': [-6.5971, 106.806], 'DEPOK': [-6.4025, 106.7942], 'CIREBON': [-6.7063, 108.557],
    'SEMARANG': [-6.9667, 110.4167], 'SURAKARTA': [-7.5561, 110.8316], 'SALATIGA': [-7.3306, 110.5081],
    'PEKALONGAN': [-6.8886, 109.6753], 'TEGAL': [-6.8694, 109.1403],
    'YOGYAKARTA': [-7.7956, 110.3695], 'SURABAYA': [-7.2575, 112.7521], 'MALANG': [-7.9797, 112.6304],
    'KEDIRI': [-7.848, 112.0176], 'MADIUN': [-7.6298, 111.5239], 'BLITAR': [-8.0957, 112.1609],
    'BATU': [-7.8721, 112.5269], 'MOJOKERTO': [-7.4721, 112.4336], 'PASURUAN': [-7.6453, 112.9076],
    'PROBOLINGGO': [-7.7543, 113.2159], 'DENPASAR': [-8.65, 115.2167], 'MATARAM': [-8.5833, 116.1167],
    'KUPANG': [-10.1772, 123.607], 'PONTIANAK': [-0.0236, 109.3425], 'PALANGKARAYA': [-2.2136, 113.9108],
    'BANJARMASIN': [-3.3186, 114.5944], 'BANJARBARU': [-3.4419, 114.8311],
    'SAMARINDA': [-0.5022, 117.1536], 'BALIKPAPAN': [-1.2654, 116.8312], 'TARAKAN': [3.3017, 117.6369],
    'MANADO': [1.4748, 124.8421], 'GORONTALO': [0.5435, 123.0568], 'PALU': [-0.9003, 119.8779],
    'MAKASSAR': [-5.1477, 119.4327], 'KENDARI': [-3.9985, 122.5127], 'AMBON': [-3.6954, 128.1814],
    'TERNATE': [0.7833, 127.3667], 'SORONG': [-0.8617, 131.252], 'JAYAPURA': [-2.5337, 140.7181],
};

function nearestCity(lat, lng) {
    if (!CITIES.length) return null;
    let best = null, bestDist = Infinity;
    for (const [nama, coords] of Object.entries(CITY_COORDS)) {
        const dist = haversine(lat, lng, coords[0], coords[1]);
        if (dist >= bestDist) continue;
        const found = CITIES.find(c => c.t === 'Kota' && c.n.toLowerCase() === nama.toLowerCase())
            || CITIES.find(c => c.n.toLowerCase() === nama.toLowerCase());
        if (found) { bestDist = dist; best = found; }
    }
    return best || CITIES[0];
}

async function reverseGeocode(lat, lng) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
        { headers: { 'Accept-Language': 'id' } }
    );
    if (!res.ok) throw new Error('Nominatim error');
    const data = await res.json();
    const addr = data.address || {};
    return {
        city: addr.city || addr.town || addr.municipality || '',
        county: addr.county || addr.state_district || '',
    };
}

function matchCityFromGeo(geo) {
    function find(clean) {
        if (!clean || clean.length < 3) return null;
        return CITIES.find(c => c.t === 'Kota' && c.n.toLowerCase() === clean)
            || CITIES.find(c => c.n.toLowerCase() === clean)
            || CITIES.find(c => c.t === 'Kota' && c.n.toLowerCase().includes(clean))
            || CITIES.find(c => c.n.toLowerCase().includes(clean))
            || null;
    }
    for (const raw of [geo.city, geo.county]) {
        if (!raw) continue;
        const isKota = /^kota\s/i.test(raw);
        const clean = raw.replace(/^(kota\s+|kabupaten\s+|kab\.\s*)/i, '').trim().toLowerCase();
        if (isKota) {
            const f = CITIES.find(c => c.t === 'Kota' && c.n.toLowerCase() === clean)
                || CITIES.find(c => c.t === 'Kota' && c.n.toLowerCase().includes(clean));
            if (f) return f;
        }
        const f = find(clean);
        if (f) return f;
    }
    return null;
}

function allowGeo() {
    document.getElementById('geoModal').classList.remove('show');
    showLoader('Mendeteksi lokasi Anda…');

    navigator.geolocation.getCurrentPosition(
        async pos => {
            try {
                let waited = 0;
                while (CITIES.length === 0 && waited < 5000) { await sleep(200); waited += 200; }

                loaderText.textContent = 'Mencocokkan kota…';

                let city = null;
                try {
                    city = matchCityFromGeo(
                        await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
                    );
                } catch (_) { /* fallback */ }

                if (!city) city = nearestCity(pos.coords.latitude, pos.coords.longitude);

                if (city) {
                    document.getElementById('citySearch').value = city.n;
                    document.getElementById('searchClear').classList.add('show');
                    currentKota = city.id;
                    fetchJadwal();
                } else {
                    hideLoader();
                }
            } catch (_) { hideLoader(); }
        },
        () => hideLoader(),
        { timeout: 8000, maximumAge: 60000 }
    );
}

function skipGeo() {
    document.getElementById('geoModal').classList.remove('show');
}

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
    showState(stateEmpty);

    document.querySelectorAll('.anim-hidden').forEach((el, i) => {
        setTimeout(() => el.classList.add('anim-visible'), 100 + i * 150);
    });

    await loadCities();

    if ('geolocation' in navigator) {
        setTimeout(() => document.getElementById('geoModal').classList.add('show'), 400);
    }
});