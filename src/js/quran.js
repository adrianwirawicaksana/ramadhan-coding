const API = 'https://equran.id/api/v2';
const QARI = [
    { key: '01', name: 'Abdullah Al-Juhany' },
    { key: '02', name: 'Abdul Muhsin Al-Qasim' },
    { key: '03', name: 'Abdurrahman As-Sudais' },
    { key: '04', name: 'Ibrahim Al-Dossari' },
    { key: '05', name: 'Misyari Rasyid Al-Afasy' },
    { key: '06', name: 'Yasser Al-Dosari' },
];

const S = {
    allSurat: [],
    currentSurah: null,
    currentAyat: [],
    juzAyahs: [],
    juzPlayingIdx: -1,
    qari: '05',
    playingNo: null,
    playingIdx: -1,
    tab: 'surat',
    fullPlaying: false,
    bookmarks: JSON.parse(localStorage.getItem('qbm') || '[]'),
};

const audio = document.getElementById('qAudio');
const qMini = document.getElementById('qMini');
const qMiniSurah = document.getElementById('qMiniSurah');
const qMiniAyat = document.getElementById('qMiniAyat');
const qMiniProg = document.getElementById('qMiniProg');
const qMiniTime = document.getElementById('qMiniTime');
const qMiniIcon = document.getElementById('qMiniIcon');
const qToast = document.getElementById('qToast');

/* ══════════════════════════════════
   SIDEBAR TOGGLE (Mobile)
══════════════════════════════════ */
function toggleSidebar() {
    document.getElementById('qSidebar').classList.toggle('open');
    document.getElementById('qOverlay').classList.toggle('on');
}

document.getElementById('qOverlay').addEventListener('click', () => {
    document.getElementById('qSidebar').classList.remove('open');
    document.getElementById('qOverlay').classList.remove('on');
});

/* ══════════════════════════════════
   TABS — Surat / Juz
══════════════════════════════════ */
document.querySelectorAll('.q-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.q-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        S.tab = btn.dataset.tab;
        const searchEl = document.getElementById('qSearch');
        searchEl.value = '';
        if (S.tab === 'surat') {
            searchEl.placeholder = 'Cari nama surat, arti…';
            renderSuratList(S.allSurat);
        } else {
            searchEl.placeholder = 'Cari nomor juz…';
            renderJuzList();
        }
    });
});

/* ══════════════════════════════════
   SEARCH
══════════════════════════════════ */
document.getElementById('qSearch').addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    if (S.tab === 'surat') {
        renderSuratList(q ? S.allSurat.filter(s =>
            s.namaLatin.toLowerCase().includes(q) ||
            s.nama.includes(q) ||
            s.arti.toLowerCase().includes(q) ||
            String(s.nomor).includes(q)
        ) : S.allSurat);
    } else {
        const nums = Array.from({ length: 30 }, (_, i) => i + 1);
        renderJuzList(q ? nums.filter(n => String(n).includes(q) || `juz ${n}`.includes(q)) : nums);
    }
});

/* ══════════════════════════════════
   INIT — Load semua surat
══════════════════════════════════ */
async function init() {
    try {
        const r = await fetch(`${API}/surat`);
        const j = await r.json();
        S.allSurat = j.data;
        renderSuratList(S.allSurat);
    } catch {
        document.getElementById('qList').innerHTML =
            `<div class="q-err">Gagal memuat. Periksa koneksi internet.</div>`;
    }
}

/* ══════════════════════════════════
   RENDER SURAT LIST
══════════════════════════════════ */
function renderSuratList(list) {
    const el = document.getElementById('qList');
    if (!list.length) {
        el.innerHTML = `<div style="padding:20px;text-align:center;color:var(--muted);font-size:12px">Tidak ditemukan</div>`;
        return;
    }
    el.innerHTML = list.map(s => `
        <div class="q-surat-item ${S.currentSurah?.nomor === s.nomor ? 'active' : ''}"
             data-n="${s.nomor}" onclick="loadSurah(${s.nomor})">
            <div class="q-surat-num">${s.nomor}</div>
            <div class="q-surat-info">
                <div class="q-surat-name">${s.namaLatin}</div>
                <div class="q-surat-meta">
                    <span>${s.arti}</span>
                    <span class="q-dot"></span>
                    <span>${s.jumlahAyat} ayat</span>
                    <span class="q-dot"></span>
                    <span style="text-transform:capitalize">${s.tempatTurun}</span>
                </div>
            </div>
            <div class="q-surat-ar">${s.nama}</div>
        </div>
    `).join('');
}

/* ══════════════════════════════════
   RENDER JUZ LIST
══════════════════════════════════ */
function renderJuzList(list) {
    const nums = list || Array.from({ length: 30 }, (_, i) => i + 1);
    const el = document.getElementById('qList');
    if (!nums.length) {
        el.innerHTML = `<div style="padding:20px;text-align:center;color:var(--muted);font-size:12px">Tidak ditemukan</div>`;
        return;
    }
    el.innerHTML = nums.map(n => `
        <div class="q-juz-item" onclick="loadJuz(${n})">
            <div class="q-juz-badge">${n}</div>
            <div>
                <div class="q-juz-label">Juz ${n}</div>
                <div class="q-juz-sub">Bagian ke-${n} dari 30</div>
            </div>
        </div>
    `).join('');
}

/* ══════════════════════════════════
   LOAD SURAH
══════════════════════════════════ */
async function loadSurah(nomor) {
    showView();
    document.getElementById('qHead').innerHTML = loader();
    document.getElementById('qAyatWrap').innerHTML = '';
    document.getElementById('qContent').scrollTop = 0;
    try {
        const r = await fetch(`${API}/surat/${nomor}`);
        const j = await r.json();
        const d = j.data;
        S.currentSurah = d;
        S.currentAyat = d.ayat;
        stopAudio();
        document.querySelectorAll('.q-surat-item').forEach(el =>
            el.classList.toggle('active', parseInt(el.dataset.n) === nomor)
        );
        document.getElementById('qCurLabel').textContent = `${d.namaLatin} (${d.nomor})`;
        renderSurahHead(d);
        renderAyat(d);
        document.getElementById('qSidebar').classList.remove('open');
        document.getElementById('qOverlay').classList.remove('on');
    } catch {
        document.getElementById('qHead').innerHTML = `<div class="q-err" style="margin:0">Gagal memuat surat.</div>`;
    }
}

/* ══════════════════════════════════
   LOAD JUZ
══════════════════════════════════ */
async function loadJuz(juz) {
    showView();
    document.getElementById('qHead').innerHTML = loader();
    document.getElementById('qAyatWrap').innerHTML = '';
    document.getElementById('qContent').scrollTop = 0;
    S.currentSurah = null; S.currentAyat = [];
    stopAudio();
    document.getElementById('qCurLabel').textContent = `Juz ${juz}`;
    try {
        const res = await fetch(`https://api.myquran.com/v2/quran/ayat/juz/${juz}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.status !== true) throw new Error('Status false dari API');
        const ayahs = json.data;
        S.juzAyahs = ayahs;
        S.juzPlayingIdx = -1;

        document.getElementById('qHead').innerHTML = `
            <div class="q-surah-head-inner">
                <div class="q-surah-top">
                    <div class="q-surah-top-info">
                        <h1>Juz ${juz}</h1>
                        <p>Bagian ke-${juz} dari 30 &bull; ${ayahs.length} ayat</p>
                    </div>
                    <div style="font-family:'Amiri Quran',serif;font-size:40px;color:#111827;line-height:1">
                        الجزء ${toAr(juz)}
                    </div>
                </div>
                <div class="q-badges" style="margin-bottom:14px">
                    <span class="q-badge">Juz ${juz}</span>
                    <span class="q-badge gold">${ayahs.length} Ayat</span>
                </div>
                <div class="q-audio" id="qJuzAudio">
                    <div class="q-audio-controls">
                        <button class="btn-aud" id="qJuzPrev" title="Ayat sebelumnya" onclick="juzHeadPrev()">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
                        </button>
                        <button class="btn-aud play-btn" id="qJuzPlay" onclick="juzHeadPlay()" title="Putar">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" id="qJuzIcon"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button class="btn-aud" id="qJuzNext" title="Ayat berikutnya" onclick="juzHeadNext()">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18 14.5 12 6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/></svg>
                        </button>
                    </div>
                    <div class="q-audio-bar">
                        <div class="q-audio-label" id="qJuzLabel">Putar Ayat per Ayat</div>
                        <input type="range" class="q-progress" id="qJuzProg" min="0" max="100" value="0" oninput="seekTo(this.value)"/>
                    </div>
                    <span class="q-audio-time" id="qJuzTime">0:00</span>
                </div>
            </div>`;

        let lastSurahNo = null;
        document.getElementById('qAyatWrap').innerHTML = ayahs.map((a, i) => {
            const isNewSurah = a.surah !== lastSurahNo;
            if (isNewSurah) lastSurahNo = a.surah;
            const surahObj = S.allSurat.find(x => x.nomor == a.surah);
            const surahName = surahObj?.namaLatin || `Surah ${a.surah}`;
            const surahArab = surahObj?.nama || '';
            const showBismillah = false;
            const idBtn = `jbtn-${a.surah}-${a.ayah}`;
            return `
                ${isNewSurah ? `
                <div class="q-surat-divider">
                    <div class="q-surat-divider-line"></div>
                    <div class="q-surat-divider-badge">
                        <span>${surahName}</span>
                        ${surahArab ? `<span>${surahArab}</span>` : ''}
                    </div>
                    <div class="q-surat-divider-line"></div>
                </div>
                ` : ''}
                <div class="q-ayat" id="ja-${a.surah}-${a.ayah}" style="animation-delay:${Math.min(i, 8) * .025}s">
                    <div class="q-ayat-top">
                        <div class="q-ayat-num">${a.ayah}</div>
                        <div style="display:flex;align-items:center;gap:6px">
                            <span style="font-size:10px;color:var(--muted)">${surahName}:${a.ayah}</span>
                            ${a.audio ? `
                            <button class="btn-ayat-act" id="${idBtn}"
                                    onclick="playJuzAyat('${a.audio}','${a.surah}-${a.ayah}')" title="Putar">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            </button>` : ''}
                        </div>
                    </div>
                    <div class="q-arabic">${a.arab}</div>
                    ${a.latin ? `<div class="q-latin">${a.latin}</div>` : ''}
                    <div class="q-trans">${a.text}</div>
                </div>`;
        }).join('');

        document.getElementById('qSidebar').classList.remove('open');
        document.getElementById('qOverlay').classList.remove('on');
    } catch (err) {
        console.error('loadJuz error:', err);
        document.getElementById('qHead').innerHTML = '';
        document.getElementById('qAyatWrap').innerHTML = `
            <div style="padding:40px 20px;text-align:center;color:var(--muted)">
                <div style="font-size:36px;margin-bottom:12px">⚠️</div>
                <div style="font-size:13px;font-weight:600;color:var(--green-dark);margin-bottom:8px">Gagal memuat Juz ${juz}</div>
                <div style="font-size:12px;margin-bottom:16px">Periksa koneksi internet, lalu coba lagi.</div>
                <button onclick="loadJuz(${juz})" style="padding:9px 22px;background:var(--green);color:#fff;border:none;border-radius:8px;font-family:'Poppins',sans-serif;font-size:12px;font-weight:600;cursor:pointer">Coba Lagi</button>
            </div>`;
    }
}

/* ══════════════════════════════════
   PLAY JUZ AYAT
══════════════════════════════════ */
let juzPlayingId = null;

function playJuzAyat(src, id) {
    if (!src || src === 'undefined' || src === 'null') { toast('Audio ayat tidak tersedia'); return; }
    if (juzPlayingId === id && !audio.paused) {
        audio.pause();
        const curBtn = document.getElementById(`jbtn-${id}`);
        if (curBtn) curBtn.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        juzPlayingId = null;
        qMiniIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        return;
    }
    if (juzPlayingId) {
        const oldBtn = document.getElementById(`jbtn-${juzPlayingId}`);
        if (oldBtn) oldBtn.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    }
    S.fullPlaying = false; S.playingNo = null; S.playingIdx = -1;
    audio.onended = null;
    clearPlaying();
    juzPlayingId = id;
    S.juzPlayingIdx = S.juzAyahs.findIndex(a => `${a.surah}-${a.ayah}` === id);
    audio.src = src; audio.load();
    audio.play().catch(e => { toast("Gagal memutar audio"); console.warn(e); });
    const btn = document.getElementById(`jbtn-${id}`);
    if (btn) btn.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const juzIcon = document.getElementById('qJuzIcon');
    if (juzIcon) juzIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    const juzLabel = document.getElementById('qJuzLabel');
    const parts = id.split('-');
    const surahObj = S.allSurat.find(x => x.nomor == parts[0]);
    const surahName = surahObj?.namaLatin || 'Surat ' + parts[0];
    if (juzLabel) juzLabel.textContent = surahName + ' : ' + parts[1];
    showMini(surahName, 'Ayat ' + parts[1]);
    audio.onended = () => {
        if (btn) btn.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        const ji = document.getElementById('qJuzIcon');
        if (ji) ji.innerHTML = '<path d="M8 5v14l11-7z"/>';
        const next = S.juzAyahs[S.juzPlayingIdx + 1];
        if (next && next.audio) { playJuzAyat(next.audio, `${next.surah}-${next.ayah}`); }
        else { juzPlayingId = null; S.juzPlayingIdx = -1; qMiniIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; }
    };
}

/* ══════════════════════════════════
   RENDER SURAH HEAD
══════════════════════════════════ */
function renderSurahHead(d) {
    const qariOpts = QARI.map(q =>
        `<option value="${q.key}" ${q.key === S.qari ? 'selected' : ''}>${q.name}</option>`
    ).join('');
    document.getElementById('qHead').innerHTML = `
        <div class="q-surah-head-inner">
            <div class="q-surah-top">
                <div class="q-surah-top-info">
                    <h1>${d.namaLatin}</h1>
                    <p>${d.arti} &bull; ${cap(d.tempatTurun)}</p>
                </div>
                <div class="q-surah-arabic">${d.nama}</div>
            </div>
            <div class="q-badges" style="margin-bottom:14px">
                <span class="q-badge">Surat ${d.nomor}</span>
                <span class="q-badge gold">${d.jumlahAyat} Ayat</span>
                <span class="q-badge">${cap(d.tempatTurun)}</span>
            </div>
            <div class="q-audio">
                <select class="q-qari-select" id="qQari" onchange="changeQari(this.value)">${qariOpts}</select>
                <div class="q-audio-controls">
                    <button class="btn-aud play-btn" id="qFullPlay" onclick="toggleFull()" title="Putar surat">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" id="qFullIcon"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                </div>
                <div class="q-audio-bar">
                    <div class="q-audio-label" id="qAudioLabel">Putar Surat Lengkap</div>
                    <input type="range" class="q-progress" id="qFullProg" min="0" max="100" value="0" oninput="seekTo(this.value)"/>
                </div>
                <span class="q-audio-time" id="qFullTime">0:00</span>
            </div>
        </div>`;
}

/* ══════════════════════════════════
   RENDER AYAT
══════════════════════════════════ */
function renderAyat(d) {
    document.getElementById('qAyatWrap').innerHTML = d.ayat.map((a, i) => {
        const bm = S.bookmarks.includes(`${d.nomor}-${a.nomorAyat}`);
        return `
            <div class="q-ayat" id="a-${a.nomorAyat}" style="animation-delay:${Math.min(i, 5) * .04}s">
                <div class="q-ayat-top">
                    <div class="q-ayat-num">${a.nomorAyat}</div>
                    <div class="q-ayat-actions">
                        <button class="btn-ayat-act" id="abtn-${a.nomorAyat}" onclick="playAyat(${a.nomorAyat})" title="Putar/Pause">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button class="btn-ayat-act ${bm ? 'bm-active' : ''}" id="bm-${d.nomor}-${a.nomorAyat}"
                                onclick="toggleBm(${d.nomor},${a.nomorAyat})" title="Tandai">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="${bm ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                            </svg>
                        </button>
                        <button class="btn-ayat-act" onclick="copyAyat(${a.nomorAyat})" title="Salin">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2"/>
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="q-arabic">${a.teksArab}</div>
                <div class="q-latin">${a.teksLatin || ''}</div>
                <div class="q-trans">${a.teksIndonesia}</div>
            </div>`;
    }).join('');
}

/* ══════════════════════════════════
   TOGGLE FULL AUDIO (Surat Lengkap)
══════════════════════════════════ */
function toggleFull() {
    if (!S.currentSurah) return;
    const url = S.currentSurah.audioFull?.[S.qari];
    if (!url) { toast('Audio tidak tersedia untuk qari ini'); return; }
    const icon = document.getElementById('qFullIcon');
    const label = document.getElementById('qAudioLabel');
    // Jika sedang main full → pause
    if (S.fullPlaying && !audio.paused) {
        audio.pause(); S.fullPlaying = false;
        icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        qMiniIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        return;
    }
    // Jika paused dan masih full → resume
    if (S.fullPlaying && audio.paused) {
        audio.play().catch(e => console.warn(e));
        icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        qMiniIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        return;
    }
    // Mulai baru
    S.playingNo = null; S.playingIdx = -1; S.fullPlaying = true;
    clearPlaying();
    audio.src = url; audio.load();
    audio.play().catch(e => { toast("Gagal memutar audio"); console.warn(e); });
    icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    label.textContent = `${S.currentSurah.namaLatin} — ${QARI.find(q => q.key === S.qari)?.name}`;
    showMini(S.currentSurah.namaLatin, 'Surat Lengkap');
}

/* ══════════════════════════════════
   PLAY AYAT (mode surat)
══════════════════════════════════ */
function playAyat(no) {
    const ayat = S.currentAyat.find(a => a.nomorAyat === no);
    if (!ayat) return;
    const url = ayat.audio?.[S.qari];
    if (!url || url === 'undefined') { toast('Audio ayat tidak tersedia'); return; }

    const btnId = `abtn-${no}`;
    const btn = document.getElementById(btnId);
    const pauseIcon = '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const playIcon = '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

    // Toggle pause jika klik ayat yang sama sedang main
    if (S.playingNo === no && !audio.paused) {
        audio.pause();
        if (btn) btn.innerHTML = playIcon;
        qMiniIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        return;
    }
    // Resume jika ayat sama sedang paused
    if (S.playingNo === no && audio.paused) {
        audio.play().catch(e => console.warn(e));
        if (btn) btn.innerHTML = pauseIcon;
        qMiniIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        return;
    }

    // Reset tombol ayat lama
    if (S.playingNo !== null) {
        const oldBtn = document.getElementById(`abtn-${S.playingNo}`);
        if (oldBtn) oldBtn.innerHTML = playIcon;
    }

    clearPlaying();
    S.playingNo = no;
    S.playingIdx = S.currentAyat.findIndex(a => a.nomorAyat === no);
    S.fullPlaying = false;
    const fullIcon = document.getElementById('qFullIcon');
    if (fullIcon) fullIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    document.getElementById(`a-${no}`)?.classList.add('playing');
    document.getElementById(`a-${no}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (btn) btn.innerHTML = pauseIcon;
    audio.src = url; audio.load();
    audio.play().catch(e => { toast("Gagal memutar audio ayat"); console.warn(e); });
    showMini(S.currentSurah?.namaLatin || '', `Ayat ${no}`);
    audio.onended = () => {
        document.getElementById(`a-${no}`)?.classList.remove('playing');
        if (btn) btn.innerHTML = playIcon;
        const next = S.currentAyat[S.playingIdx + 1];
        if (next) playAyat(next.nomorAyat);
        else { S.playingNo = null; S.playingIdx = -1; qMiniIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; }
    };
}

/* ══════════════════════════════════
   MINI PLAYER
══════════════════════════════════ */
function showMini(surah, ayat) {
    qMini.classList.add('on');
    qMiniSurah.textContent = surah;
    qMiniAyat.textContent = ayat;
    qMiniIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
}

document.getElementById('qMiniPlay').addEventListener('click', () => {
    if (audio.paused) { audio.play().catch(e => console.warn(e)); qMiniIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'; }
    else { audio.pause(); qMiniIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; }
});

document.getElementById('qMiniPrev').addEventListener('click', () => {
    if (juzPlayingId !== null) {
        const prev = S.juzAyahs[S.juzPlayingIdx - 1];
        if (prev && prev.audio) playJuzAyat(prev.audio, `${prev.surah}-${prev.ayah}`);
    } else if (S.playingIdx > 0) {
        playAyat(S.currentAyat[S.playingIdx - 1].nomorAyat);
    }
});

document.getElementById('qMiniNext').addEventListener('click', () => {
    if (juzPlayingId !== null) {
        const next = S.juzAyahs[S.juzPlayingIdx + 1];
        if (next && next.audio) playJuzAyat(next.audio, `${next.surah}-${next.ayah}`);
    } else {
        const n = S.currentAyat[S.playingIdx + 1];
        if (n) playAyat(n.nomorAyat);
    }
});

document.getElementById('qMiniClose').addEventListener('click', stopAudio);

qMiniProg.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (qMiniProg.value / 100) * audio.duration;
});

/* ══════════════════════════════════
   AUDIO TIMEUPDATE
══════════════════════════════════ */
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const p = (audio.currentTime / audio.duration) * 100;
    qMiniProg.value = p;
    ['qFullProg', 'qJuzProg'].forEach(id => { const el = document.getElementById(id); if (el) el.value = p; });
    const t = fmt(audio.currentTime);
    qMiniTime.textContent = t;
    ['qFullTime', 'qJuzTime'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = t; });
});

/* ══════════════════════════════════
   JUZ HEAD CONTROLS
══════════════════════════════════ */
function juzHeadPlay() {
    if (!S.juzAyahs.length) return;
    if (juzPlayingId !== null && !audio.paused) {
        audio.pause();
        ['qJuzIcon'].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = '<path d="M8 5v14l11-7z"/>'; });
        qMiniIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    } else if (juzPlayingId !== null && audio.paused) {
        audio.play().catch(e => console.warn(e));
        ['qJuzIcon'].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'; });
        qMiniIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    } else {
        const first = S.juzAyahs.find(a => a.audio);
        if (first) playJuzAyat(first.audio, `${first.surah}-${first.ayah}`);
    }
}

function juzHeadPrev() {
    if (S.juzPlayingIdx > 0) {
        const prev = S.juzAyahs[S.juzPlayingIdx - 1];
        if (prev && prev.audio) playJuzAyat(prev.audio, `${prev.surah}-${prev.ayah}`);
    }
}

function juzHeadNext() {
    const next = S.juzAyahs[S.juzPlayingIdx + 1];
    if (next && next.audio) playJuzAyat(next.audio, `${next.surah}-${next.ayah}`);
}

function seekTo(v) {
    if (audio.duration) audio.currentTime = (v / 100) * audio.duration;
}

function changeQari(k) {
    S.qari = k;
    stopAudio();
    const label = document.getElementById('qAudioLabel');
    if (label) label.textContent = 'Putar Surat Lengkap';
    const icon = document.getElementById('qFullIcon');
    if (icon) icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
}

/* ══════════════════════════════════
   BOOKMARK
══════════════════════════════════ */
function toggleBm(surah, ayat) {
    const k = `${surah}-${ayat}`;
    const btn = document.getElementById(`bm-${k}`);
    const idx = S.bookmarks.indexOf(k);
    if (idx === -1) {
        S.bookmarks.push(k);
        btn?.classList.add('bm-active');
        btn?.querySelector('svg').setAttribute('fill', 'currentColor');
        toast('Ayat ditandai 🔖');
    } else {
        S.bookmarks.splice(idx, 1);
        btn?.classList.remove('bm-active');
        btn?.querySelector('svg').setAttribute('fill', 'none');
        toast('Tanda dihapus');
    }
    localStorage.setItem('qbm', JSON.stringify(S.bookmarks));
}

/* ══════════════════════════════════
   COPY AYAT
══════════════════════════════════ */
function copyAyat(no) {
    const a = S.currentAyat.find(x => x.nomorAyat === no);
    if (!a) return;
    navigator.clipboard.writeText(`${a.teksArab}\n\n${a.teksIndonesia}`).then(() => toast('Disalin ✓'));
}

/* ══════════════════════════════════
   STOP AUDIO
══════════════════════════════════ */
function stopAudio() {
    audio.pause(); audio.src = ''; audio.onended = null;
    S.fullPlaying = false; S.playingNo = null; S.playingIdx = -1;
    S.juzPlayingIdx = -1; juzPlayingId = null;
    qMini.classList.remove('on');
    clearPlaying();
}

/* ══════════════════════════════════
   HELPERS
══════════════════════════════════ */
function clearPlaying() {
    document.querySelectorAll('.q-ayat.playing').forEach(el => el.classList.remove('playing'));
}

function showView() {
    document.getElementById('qWelcome').style.display = 'none';
    const v = document.getElementById('qView');
    v.style.display = 'flex';
}

function loader() {
    return `<div class="q-loader" style="min-height:80px"><div class="q-spinner"></div>Memuat…</div>`;
}

function fmt(s) {
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function cap(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function toAr(n) {
    return String(n).split('').map(d => '٠١٢٣٤٥٦٧٨٩'[d] || d).join('');
}

function toast(msg) {
    qToast.textContent = msg;
    qToast.classList.add('show');
    clearTimeout(qToast._t);
    qToast._t = setTimeout(() => qToast.classList.remove('show'), 2000);
}

/* ══════════════════════════════════
   START
══════════════════════════════════ */
init();