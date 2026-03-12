'use strict';

/* ════════════════════════════════════════
   JADWAL IMSAKIYAH — script.js
   ════════════════════════════════════════ */

/* ── CONSTANTS ── */
const BASE_URL = 'https://api.myquran.com/v2/sholat';

// ✅ FIX: Gunakan waktu lokal perangkat (bukan UTC) agar tanggal sesuai WIB
function _localDate() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

const TODAY = _localDate();               // pakai waktu lokal, bukan UTC
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

/** Show one state panel, hide the rest */
function showState(active) {
    [stateLoading, stateError, stateEmpty, tableWrap, todayBar]
        .forEach(el => el.classList.remove('show'));
    if (active) active.classList.add('show');
}

/** Show full-screen loading overlay */
function showLoader(msg) {
    loaderText.textContent = msg || 'Memuat…';
    pageLoader.classList.add('show');
}

/** Hide full-screen loading overlay */
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

        // Sort: provinsi A-Z → nama kota A-Z → Kota before Kabupaten
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

/** Build and show the dropdown with a filtered city list */
function buildDropdown(list) {
    const dd = document.getElementById('cityDropdown');

    if (!list.length) {
        dd.innerHTML = '<div class="cd-empty">Kota tidak ditemukan</div>';
        dd.classList.add('show');
        return;
    }

    // Group by province
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

/** Open dropdown: show full list or search results */
function showDropdown() {
    const q = document.getElementById('citySearch').value.trim();
    if (!q) buildDropdown(CITIES);
    else onSearch();
}

/** Filter dropdown while typing */
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

/** Clear search input and reset dropdown */
function clearSearch() {
    document.getElementById('citySearch').value = '';
    document.getElementById('searchClear').classList.remove('show');
    buildDropdown(CITIES);
    document.getElementById('citySearch').focus();
}

/** Keyboard nav: Arrow keys + Enter + Escape */
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

// Close dropdown when clicking outside
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

    // Race-condition guard: only the latest request wins
    const seq = ++fetchSeq;
    const kotaSnap = currentKota;
    const url = `${BASE_URL}/jadwal/${kotaSnap}/${TAHUN}/${BULAN}`;

    try {
        const [res] = await Promise.all([fetch(url), sleep(1200)]);
        if (seq !== fetchSeq) return; // stale response, discard

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

/** Called by "Coba Lagi" button */
function retryFetch() {
    if (currentKota) fetchJadwal();
}

/* ════════════════════════════════════════
   RENDER TABLE
   ════════════════════════════════════════ */
function renderTable(data, kotaSnap) {
    // Update kota chip
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

    // Build table rows
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

    // Today bar
    if (todayRow) {
        todayBarText.textContent = `Hari ini — ${todayRow.tanggal} — ditandai hijau`;
        todayBar.classList.add('show');
    }

    showState(null);
    tableWrap.classList.add('show');

    // Swipe hint (mobile only, auto-hides after 4s or on scroll)
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

    // Scroll today row into view
    if (todayRow) {
        setTimeout(() => {
            const tr = jadwalBody.querySelector('.today-row');
            if (tr) tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
    }
}

/* ════════════════════════════════════════
   GEOLOCATION
   ════════════════════════════════════════ */

/** Haversine distance between two lat/lng points (km) */
function deg2rad(d) { return d * Math.PI / 180 }
function haversine(la1, ln1, la2, ln2) {
    const R = 6371;
    const dL = deg2rad(la2 - la1);
    const dN = deg2rad(ln2 - ln1);
    const a = Math.sin(dL / 2) ** 2
        + Math.cos(deg2rad(la1)) * Math.cos(deg2rad(la2)) * Math.sin(dN / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Approximate coordinates of major Indonesian cities (fallback) */
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

/** Find nearest city from CITY_COORDS by haversine distance */
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

/** Reverse geocode via Nominatim (OpenStreetMap) */
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

/** Match a Nominatim geo result to a city in CITIES list */
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

/** Called when user clicks "Izinkan Lokasi" */
function allowGeo() {
    document.getElementById('geoModal').classList.remove('show');
    showLoader('Mendeteksi lokasi Anda…');

    navigator.geolocation.getCurrentPosition(
        async pos => {
            try {
                // Wait for cities to load (max 5s)
                let waited = 0;
                while (CITIES.length === 0 && waited < 5000) { await sleep(200); waited += 200; }

                loaderText.textContent = 'Mencocokkan kota…';

                let city = null;
                try {
                    city = matchCityFromGeo(
                        await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
                    );
                } catch (_) { /* fallback to haversine below */ }

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

/** Called when user clicks "Lewati" */
function skipGeo() {
    document.getElementById('geoModal').classList.remove('show');
}

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
    // Show empty state
    showState(stateEmpty);

    // Staggered entrance animations
    document.querySelectorAll('.anim-hidden').forEach((el, i) => {
        setTimeout(() => el.classList.add('anim-visible'), 100 + i * 150);
    });

    // Load city list from API
    await loadCities();

    // Show geo permission modal after short delay
    if ('geolocation' in navigator) {
        setTimeout(() => document.getElementById('geoModal').classList.add('show'), 400);
    }
});