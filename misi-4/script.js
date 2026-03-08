/* ═══════════════════════════════════════════════════════
   script.js — Ramadhan To-Do List 1446 H
   Logic: state, render, UI updates, localStorage, tabs
═══════════════════════════════════════════════════════ */

/* ─── STATE ─────────────────────────────────────────── */
const state = {
    shalat: { subuh: false, dzuhur: false, ashar: false, maghrib: false, isya: false },
    quran: { target: 604, dibaca: 0, selesai: false },
    puasa: { days: {}, todayChecked: false },
    dzikir: {}
};

/* ─── DATA DEFINITIONS ──────────────────────────────── */
const shalatItems = [
    { id: 'subuh', name: 'Subuh', time: '~04:30', icon: '🌅' },
    { id: 'dzuhur', name: 'Dzuhur', time: '~12:00', icon: '☀️' },
    { id: 'ashar', name: 'Ashar', time: '~15:30', icon: '🌤️' },
    { id: 'maghrib', name: 'Maghrib', time: '~18:00', icon: '🌇' },
    { id: 'isya', name: 'Isya', time: '~19:15', icon: '🌃' },
];

const dzikirData = [
    { id: 'subhanallah', name: 'Subhanallah', arabic: 'سُبْحَانَ اللهِ', target: 33 },
    { id: 'alhamdulillah', name: 'Alhamdulillah', arabic: 'اَلْحَمْدُ لِلَّهِ', target: 33 },
    { id: 'allahuakbar', name: 'Allahu Akbar', arabic: 'اَللهُ أَكْبَرُ', target: 34 },
    { id: 'istighfar', name: 'Istighfar', arabic: 'أَسْتَغْفِرُ اللهَ', target: 100 },
    { id: 'shalawat', name: 'Shalawat', arabic: 'اللّٰهُمَّ صَلِّ عَلَى مُحَمَّد', target: 10 },
];

dzikirData.forEach(d => state.dzikir[d.id] = false);

/* ─── HELPERS ───────────────────────────────────────── */
function getRamadhanDay() {
    const start = new Date('2026-02-19');
    return Math.min(Math.max(Math.floor((new Date() - start) / 86400000) + 1, 1), 30);
}

function motivasi(p) {
    if (p === 0) return '✨ Semangat jalani Ramadhan & ayo bangun progress-mu setiap hari!';
    if (p < 30) return '🌱 Setiap langkah kecil bernilai di sisi Allah. Teruslah!';
    if (p < 60) return '🌟 Separuh jalan sudah kamu tempuh. Jangan berhenti!';
    if (p < 90) return '🔥 Hampir sempurna! Allah melihat setiap usahamu.';
    return '🌙 MasyaAllah! Ramadhan ini penuh berkah bersamamu!';
}

function showToast(msg, gold = false) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.background = '#0F9D58';
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ─── CALCULATIONS ──────────────────────────────────── */
function calcShalatPct() { return Math.round(Object.values(state.shalat).filter(Boolean).length / 5 * 100); }
function calcQuranPct() { return state.quran.selesai ? 100 : Math.min(100, Math.round(state.quran.dibaca / (state.quran.target || 604) * 100)); }
function calcPuasaPct() { return Math.round(Object.values(state.puasa.days).filter(Boolean).length / 30 * 100); }
function calcPuasaHarianPct() { return state.puasa.todayChecked ? 100 : 0; }
function calcDzikirPct() {
    const done = dzikirData.filter(x => state.dzikir[x.id]).length;
    return Math.round(done / dzikirData.length * 100);
}

/* ─── SUMMARY ───────────────────────────────────────── */
function updateSummary() {
    const avg = Math.round((calcShalatPct() + calcQuranPct() + calcPuasaHarianPct() + calcDzikirPct()) / 4);
    document.getElementById('summaryBar').style.width = avg + '%';
    document.getElementById('summaryPct').textContent = avg + '%';
    document.getElementById('summaryLabel').textContent =
        avg === 0 ? 'Ayo mulai!' : avg < 50 ? 'Terus semangat!' : avg < 80 ? 'Luar biasa!' : 'MasyaAllah!';
    document.getElementById('motivasiBadge').textContent = motivasi(avg);
}

/* ─── TABS ──────────────────────────────────────────── */
function switchTab(name) {
    const goldTabs = ['quran', 'dzikir'];
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-green', 'active-gold'));
    document.getElementById('panel-' + name).classList.add('active');
    document.getElementById('tab-' + name).classList.add(goldTabs.includes(name) ? 'active-gold' : 'active-green');
}

/* ─── SHALAT ────────────────────────────────────────── */
function renderShalat() {
    document.getElementById('shalatList').innerHTML = shalatItems.map(s => `
        <div class="shalat-item ${state.shalat[s.id] ? 'checked' : ''}" onclick="toggleShalat('${s.id}')">
            <div class="shalat-check">✓</div>
            <span class="shalat-icon">${s.icon}</span>
            <span class="shalat-name">${s.name}</span>
            <span class="shalat-time">${s.time}</span>
        </div>`).join('');
}

function toggleShalat(id) {
    state.shalat[id] = !state.shalat[id];
    renderShalat(); updateShalatUI(); updateSummary();
}

function updateShalatUI() {
    const p = calcShalatPct();
    document.getElementById('shalatPct').textContent = p + '%';
    document.getElementById('shalatBar').style.width = p + '%';
    const s = document.getElementById('shalatStatus');
    if (p === 100) { s.textContent = 'MasyaAllah lengkap! 🌟'; s.style.color = '#0F9D58'; }
    else if (p >= 40) { s.textContent = 'Cukup baik, teruskan! 👍'; s.style.color = '#059669'; }
    else { s.textContent = 'Belum optimal 💪'; s.style.color = '#D97706'; }
}

/* ─── QURAN ─────────────────────────────────────────── */
function updateQuran() {
    let t = parseInt(document.getElementById('targetHalaman').value) || 0;
    if (t > 604) { t = 604; document.getElementById('targetHalaman').value = 604; }
    const dibacaEl = document.getElementById('dibacaHalaman');
    let d = parseInt(dibacaEl.value);
    if (isNaN(d) || dibacaEl.value === '' || d < 0) { d = 0; dibacaEl.value = 0; }
    if (d > 604) { d = 604; dibacaEl.value = 604; }
    state.quran.target = t;
    state.quran.dibaca = d;
    document.getElementById('quranDibaca').textContent = d;
    document.getElementById('quranTarget').textContent = t;
    const p = calcQuranPct();
    document.getElementById('quranPct').textContent = p + '%';
    document.getElementById('quranBar').style.width = p + '%';
    const chip = document.getElementById('quranStatus');
    if (p >= 100) {
        chip.textContent = 'Target tercapai! 🎉';
        chip.style.cssText = 'background:rgba(167,243,208,0.5);color:#0F9D58;font-weight:700';
    } else if (p >= 50) {
        chip.textContent = 'Hampir selesai! 🌟';
        chip.style.cssText = 'background:rgba(167,243,208,0.4);color:#059669;font-weight:600';
    } else {
        chip.textContent = 'Masih bisa ditambah 📖';
        chip.style.cssText = 'background:rgba(255,255,255,0.5);color:#D97706;font-weight:600';
    }
    updateSummary();
}

function toggleComplete() {
    state.quran.selesai = !state.quran.selesai;
    const box = document.getElementById('completeBox');
    const wrap = document.getElementById('completeToggle');
    const dibacaEl = document.getElementById('dibacaHalaman');
    if (state.quran.selesai) {
        box.textContent = '✓'; box.classList.add('checked'); wrap.style.borderColor = '#0F9D58';
        dibacaEl.value = state.quran.target; // auto-fill sudah dibaca = target
    } else {
        box.textContent = ''; box.classList.remove('checked'); wrap.style.borderColor = 'transparent';
        dibacaEl.value = 0;
    }
    updateQuran();
}

/* ─── PUASA ─────────────────────────────────────────── */
function buildCalendar() {
    const cal = document.getElementById('ramadhanCalendar');
    const today = getRamadhanDay();
    cal.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
        const done = !!state.puasa.days[i];
        const isToday = i === today;
        const isFuture = i > today;
        const el = document.createElement('div');
        el.className = 'cal-day ' + (isFuture ? 'future' : done ? 'done' : 'empty') + (isToday ? ' today-ring' : '');
        el.innerHTML = done ? '✓' : i;
        el.title = isFuture ? `Hari ke-${i} belum tiba` : '';
        el.onclick = () => {
            if (isFuture) { showToast(`⏳ Hari ke-${i} belum tiba, sabar ya!`); return; }
            state.puasa.days[i] = !state.puasa.days[i];
            if (i === today) { state.puasa.todayChecked = !!state.puasa.days[i]; syncTodayUI(); }
            buildCalendar(); updatePuasaUI(); updateSummary();
        };
        cal.appendChild(el);
    }
}

function syncTodayUI() {
    const c = state.puasa.todayChecked;
    const btn = document.getElementById('puasaTodayBtn');
    const check = document.getElementById('puasaTodayCheck');
    if (c) {
        btn.classList.add('checked'); check.textContent = '✓';
        check.style.cssText = 'background:#0F9D58;border-color:#0F9D58;color:white';
    } else {
        btn.classList.remove('checked'); check.textContent = ''; check.style.cssText = '';
    }
    document.getElementById('puasaIcon').textContent = c ? '🎉' : '🌟';
    const now = new Date();
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bln = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    document.getElementById('puasaTodaySub').textContent =
        `${hari[now.getDay()]}, ${now.getDate()} ${bln[now.getMonth()]} ${now.getFullYear()}`;
}

function togglePuasaToday() {
    state.puasa.todayChecked = !state.puasa.todayChecked;
    state.puasa.days[getRamadhanDay()] = state.puasa.todayChecked;
    syncTodayUI(); buildCalendar(); updatePuasaUI(); updateSummary();
}

function updatePuasaUI() {
    const done = Object.values(state.puasa.days).filter(Boolean).length;
    const p = calcPuasaPct();
    document.getElementById('puasaPct').textContent = p + '%';
    document.getElementById('puasaBar').style.width = p + '%';
    const s = document.getElementById('puasaStatus');
    if (p >= 100) { s.textContent = 'Alhamdulillah puasa penuh! 🌙'; s.style.color = '#0F9D58'; }
    else if (p >= 60) { s.textContent = `${done}/30 hari — Luar biasa! 🌟`; s.style.color = '#059669'; }
    else if (done > 0) { s.textContent = `${done}/30 hari — Terus semangat! 💪`; s.style.color = '#10B981'; }
    else { s.textContent = 'Semangat puasanya! 🌙'; s.style.color = '#D97706'; }
}

/* ─── DZIKIR ────────────────────────────────────────── */
function renderDzikir() {
    document.getElementById('dzikirList').innerHTML = dzikirData.map(d => {
        const checked = !!state.dzikir[d.id];
        return `
        <div class="dzikir-item ${checked ? 'done' : ''}" onclick="toggleDzikir('${d.id}')">
            <div class="dzikir-info">
                <div class="dzikir-arabic">${d.arabic}</div>
                <div class="dzikir-name">${d.name}</div>
                <div class="dzikir-count">${d.target}×</div>
            </div>
            <div class="dzikir-check ${checked ? 'checked' : ''}">✓</div>
        </div>`;
    }).join('');
}

function toggleDzikir(id) {
    state.dzikir[id] = !state.dzikir[id];
    renderDzikir(); updateDzikirUI(); updateSummary();
}

function updateDzikirUI() {
    const p = calcDzikirPct();
    document.getElementById('dzikirPct').textContent = p + '%';
    document.getElementById('dzikirBar').style.width = p + '%';
    const s = document.getElementById('dzikirStatus');
    if (p >= 100) { s.textContent = 'MasyaAllah, lengkap! 📿'; s.style.color = '#0F9D58'; }
    else if (p >= 60) { s.textContent = 'Hampir selesai, teruskan! ✨'; s.style.color = '#059669'; }
    else if (p >= 30) { s.textContent = 'Bagus! Terus berdzikir 🌿'; s.style.color = '#10B981'; }
    else { s.textContent = 'Mulai berdzikir 📿'; s.style.color = '#D97706'; }
}

/* ─── SAVE ──────────────────────────────────────────── */
function save(type) {
    const payload = { ...state[type], savedDate: new Date().toDateString() };
    try { localStorage.setItem(type, JSON.stringify(payload)); } catch (e) { }
    const msgs = {
        shalat: '✅ Shalat tersimpan!',
        quran: "✅ Qur'an tersimpan!",
        puasa: '✅ Puasa tersimpan!',
        dzikir: '✅ Dzikir tersimpan!'
    };
    showToast(msgs[type], type === 'quran' || type === 'dzikir');
}

/* ─── LOAD ──────────────────────────────────────────── */
function loadStorage() {
    const todayStr = new Date().toDateString();
    try {
        // SHALAT — reset tiap hari baru
        const s = localStorage.getItem('shalat');
        if (s) {
            const sd = JSON.parse(s);
            if (sd.savedDate && sd.savedDate === todayStr) {
                const { savedDate, ...rest } = sd;
                Object.assign(state.shalat, rest);
            }
        }
        // QURAN — restore hari sama, reset hari baru
        const q = localStorage.getItem('quran');
        if (q) {
            const qd = JSON.parse(q);
            if (qd.savedDate && qd.savedDate === todayStr) {
                const { savedDate, ...rest } = qd;
                Object.assign(state.quran, rest);
            } else {
                state.quran.target = 604;
                state.quran.dibaca = 0;
                state.quran.selesai = false;
            }
            document.getElementById('targetHalaman').value = state.quran.target;
            document.getElementById('dibacaHalaman').value = state.quran.dibaca;
        }
        // PUASA — histori tetap, todayChecked reset jika ganti hari
        const p = localStorage.getItem('puasa');
        if (p) {
            const pd = JSON.parse(p);
            if (!pd.savedDate || pd.savedDate !== todayStr) pd.todayChecked = false;
            Object.assign(state.puasa, pd);
        }
        // DZIKIR — reset tiap hari baru
        const dz = localStorage.getItem('dzikir');
        if (dz) {
            const dzd = JSON.parse(dz);
            if (dzd.savedDate && dzd.savedDate === todayStr) {
                const { savedDate, ...rest } = dzd;
                Object.assign(state.dzikir, rest);
            }
        }
    } catch (e) { }
}

/* ─── INIT ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    loadStorage();
    document.getElementById('hariKe').textContent = 'Hari ke-' + getRamadhanDay();
    renderShalat();
    renderDzikir();
    updateShalatUI();
    updatePuasaUI();
    updateDzikirUI();
    updateQuran();
    buildCalendar();
    syncTodayUI();
    updateSummary();

    // Restore quran complete checkbox
    if (state.quran.selesai) {
        const box = document.getElementById('completeBox');
        const wrap = document.getElementById('completeToggle');
        box.textContent = '✓'; box.classList.add('checked'); wrap.style.borderColor = '#0F9D58';
    }

    // Staggered entrance animations
    document.querySelectorAll('.anim-hidden').forEach((el, i) => {
        setTimeout(() => el.classList.add('anim-visible'), 100 + i * 130);
    });
});

/* ─── RESET ─────────────────────────────────────────── */
let _resetTarget = null;

const resetLabels = {
    shalat: { title: 'Reset Shalat?', desc: 'Semua checklist shalat hari ini akan dikosongkan.' },
    quran: { title: "Reset Qur'an?", desc: 'Data halaman target & sudah dibaca akan direset ke awal.' },
    puasa: { title: 'Reset Puasa?', desc: 'Seluruh kalender puasa 30 hari akan dihapus.' },
    dzikir: { title: 'Reset Dzikir?', desc: 'Semua checklist dzikir hari ini akan dikosongkan.' },
};

function confirmReset(type) {
    _resetTarget = type;
    const lbl = resetLabels[type];
    document.getElementById('modalTitle').textContent = lbl.title;
    document.getElementById('modalDesc').textContent = lbl.desc;
    document.getElementById('resetModal').classList.add('show');
}

function closeModal() {
    document.getElementById('resetModal').classList.remove('show');
    _resetTarget = null;
}

function executeReset() {
    if (!_resetTarget) return;
    const type = _resetTarget;
    closeModal();

    if (type === 'shalat') {
        Object.keys(state.shalat).forEach(k => state.shalat[k] = false);
        try { localStorage.removeItem('shalat'); } catch (e) { }
        renderShalat(); updateShalatUI();
    }
    else if (type === 'quran') {
        state.quran = { target: 604, dibaca: 0, selesai: false };
        try { localStorage.removeItem('quran'); } catch (e) { }
        document.getElementById('targetHalaman').value = 604;
        document.getElementById('dibacaHalaman').value = 0;
        // reset checklist UI
        const box = document.getElementById('completeBox');
        const wrap = document.getElementById('completeToggle');
        box.textContent = ''; box.classList.remove('checked'); wrap.style.borderColor = 'transparent';
        updateQuran();
    }
    else if (type === 'puasa') {
        state.puasa = { days: {}, todayChecked: false };
        try { localStorage.removeItem('puasa'); } catch (e) { }
        syncTodayUI(); buildCalendar(); updatePuasaUI();
    }
    else if (type === 'dzikir') {
        dzikirData.forEach(d => state.dzikir[d.id] = false);
        try { localStorage.removeItem('dzikir'); } catch (e) { }
        renderDzikir(); updateDzikirUI();
    }

    updateSummary();
    showToast(`🔄 Progress ${type.charAt(0).toUpperCase() + type.slice(1)} direset!`);
}

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});