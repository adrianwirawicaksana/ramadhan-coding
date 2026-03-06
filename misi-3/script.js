/* =============================================
   script.js — Kalkulator Zakat
   ============================================= */

'use strict';

/* ===== KONSTANTA NISAB 2026 ===== */
const NISAB_TAHUN = 91_681_728;   // SK BAZNAS No.15 Tahun 2026
const NISAB_BULAN = 7_640_144;
const NISAB_EMAS_GRAM = 85;

/* ===== UTILITAS ===== */

/** Pastikan nilai tidak negatif / NaN */
const clamp = (n) => Math.max(0, isNaN(n) ? 0 : n);

/** Format angka ke Rupiah */
const rp = (n) => 'Rp ' + Math.round(clamp(n)).toLocaleString('id-ID');

/** Format angka ribuan tanpa simbol */
const fmt = (n) => Math.round(clamp(n)).toLocaleString('id-ID');

/** Set value pada elemen input */
const setVal = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.value = v;
};

/** Set textContent pada elemen */
const setTxt = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
};

/** Set innerHTML pada elemen */
const setHTML = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = v;
};

/** Scroll otomatis ke hasil */
function scrollToResult(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const modalBox = el.closest('.modal-box');
    if (!modalBox) return;

    setTimeout(() => {
        modalBox.scrollTo({
            top: el.offsetTop - 20,
            behavior: "smooth"
        });
    }, 150);
}

/** Badge status wajib / belum wajib */
const badge = (wajib) =>
    `<span class="badge ${wajib ? 'badge-wajib' : 'badge-belum'}">
    ${wajib ? '⚠ Wajib Zakat' : '✓ Belum Wajib'}
  </span>`;

/** Baca nilai numerik dari input currency (hapus pemisah ribuan) */
const num = (id) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    const raw = el.value.replace(/\./g, '').replace(/,/g, '').trim();
    return clamp(parseFloat(raw) || 0);
};

/** Format input Rupiah dengan pemisah titik ribuan, jaga posisi kursor */
function formatCurrency(el) {
    const cursorFromEnd = el.value.length - el.selectionEnd;
    const raw = el.value.replace(/\./g, '').replace(/[^\d]/g, '');
    if (!raw) { el.value = ''; return; }
    const formatted = parseInt(raw, 10).toLocaleString('id-ID');
    el.value = formatted;
    const newPos = formatted.length - cursorFromEnd;
    el.selectionStart = el.selectionEnd = Math.max(0, newPos);
}

/* ===== INISIALISASI INPUT ===== */

document.addEventListener('DOMContentLoaded', () => {
    /* --- Input Rupiah: hanya angka, auto format titik ribuan --- */
    document.querySelectorAll('input.currency').forEach((el) => {
        el.addEventListener('keydown', (e) => {
            const allowed = [
                'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
                'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End',
            ];
            if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
            if (!/^\d$/.test(e.key)) e.preventDefault();
        });

        el.addEventListener('input', () => {
            formatCurrency(el);
            triggerCalc(el);
        });

        el.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasted = (e.clipboardData || window.clipboardData).getData('text');
            const digits = pasted.replace(/[^\d]/g, '');
            const pos = el.selectionStart;
            const current = el.value.replace(/\./g, '');
            const newRaw = current.slice(0, pos) + digits + current.slice(el.selectionEnd);
            el.value = newRaw;
            formatCurrency(el);
            triggerCalc(el);
        });
    });

    /* --- Input gram emas: boleh desimal --- */
    document.querySelectorAll('input.currency-gram').forEach((el) => {
        el.addEventListener('keydown', (e) => {
            const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End', '.'];
            if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
            if (!/^\d$/.test(e.key)) e.preventDefault();
        });

        el.addEventListener('input', () => {
            el.value = el.value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
            if (parseFloat(el.value) < 0) el.value = '';
            triggerCalc(el);
        });
    });
});

/** Panggil fungsi kalkulasi yang didaftarkan pada data-calc */
function triggerCalc(el) {
    const fn = el.dataset.calc;
    if (fn && typeof window[fn] === 'function') window[fn]();
}

/* ===== MODAL ===== */

/** Validasi field required sebelum submit; kembalikan true jika semua valid */
function validateRequired(ids) {
    let valid = true;
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const wrap = el.closest('.input-wrap');
        const empty = !el.value || el.value.trim() === '' || el.value === '0';
        if (empty) {
            if (wrap) wrap.style.borderColor = '#fca5a5';
            el.style.background = '#fff5f5';
            valid = false;
        } else {
            if (wrap) wrap.style.borderColor = '';
            el.style.background = '';
        }
    });
    return valid;
}

function openModal(id) {
    document.getElementById('modal-' + id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById('modal-' + id).classList.remove('active');
    document.body.style.overflow = '';
}

/* Tutup modal saat klik backdrop */
document.querySelectorAll('.modal-overlay').forEach((el) => {
    el.addEventListener('click', (e) => {
        if (e.target === el) {
            el.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

/** Switch tab pada modal Perusahaan */
function switchTab(tab) {
    document.getElementById('panel-jasa').style.display = tab === 'jasa' ? '' : 'none';
    document.getElementById('panel-dagang').style.display = tab === 'dagang' ? '' : 'none';
    document.getElementById('tab-jasa').classList.toggle('active', tab === 'jasa');
    document.getElementById('tab-dagang').classList.toggle('active', tab === 'dagang');
    document.getElementById('res-jasa').classList.remove('show');
    document.getElementById('res-dagang').classList.remove('show');
}

/* ===== KALKULASI: PENGHASILAN ===== */

function autoCalcPenghasilan() {
    const jumlahBulan = num('peng-gaji') + num('peng-lain');
    setVal('peng-jumlah', jumlahBulan > 0 ? fmt(jumlahBulan) : '');
}

function hitungPenghasilan() {
    if (!validateRequired(['peng-gaji'])) return;

    const gaji = num('peng-gaji');
    const lain = num('peng-lain');
    const jumlahBulan = gaji + lain;
    const jumlahTahun = jumlahBulan * 12;
    const wajib = jumlahTahun > 0 && jumlahTahun >= NISAB_TAHUN;

    setTxt('rp-gaji', rp(gaji));
    setTxt('rp-lain', rp(lain));
    setTxt('rp-jumlah', rp(jumlahBulan));
    setTxt('rp-jumlah-tahun', rp(jumlahTahun));
    setTxt('rp-nisab-b', rp(NISAB_BULAN));
    setTxt('rp-nisab-t', rp(NISAB_TAHUN));
    setHTML('rp-status', badge(wajib));
    setTxt('rp-zakat', wajib ? rp(jumlahBulan * 0.025) : 'Belum Wajib');

    document.getElementById('res-penghasilan').classList.add('show');
    scrollToResult('res-penghasilan');
}

/* ===== KALKULASI: PERUSAHAAN JASA ===== */

function autoCalcJasa() {
    // Tidak ada kalkulasi otomatis untuk jasa (satu input saja)
}

function hitungJasa() {
    if (!validateRequired(['jasa-pendapatan'])) return;

    const pendapatan = num('jasa-pendapatan');
    const wajib = pendapatan > 0 && pendapatan >= NISAB_TAHUN;

    setTxt('rj-pendapatan', rp(pendapatan));
    setTxt('rj-nisab', rp(NISAB_TAHUN));
    setHTML('rj-status', badge(wajib));
    setTxt('rj-zakat', wajib ? rp(pendapatan * 0.025) : 'Belum Wajib');

    document.getElementById('res-jasa').classList.add('show');
    scrollToResult('res-jasa');
}

/* ===== KALKULASI: PERUSAHAAN DAGANG / INDUSTRI ===== */

function autoCalcDagang() {
    const jumlah = clamp(num('ind-aktiva') - num('ind-pasiva'));
    setVal('ind-jumlah', fmt(jumlah));
}

function hitungDagang() {
    if (!validateRequired(['ind-aktiva'])) return;

    const aktiva = num('ind-aktiva');
    const pasiva = num('ind-pasiva');
    const jumlah = clamp(aktiva - pasiva);
    const wajib = jumlah > 0 && jumlah >= NISAB_TAHUN;

    setTxt('rd-aktiva', rp(aktiva));
    setTxt('rd-pasiva', rp(pasiva));
    setTxt('rd-jumlah', rp(jumlah));
    setTxt('rd-nisab', rp(NISAB_TAHUN));
    setHTML('rd-status', badge(wajib));
    setTxt('rd-zakat', wajib ? rp(jumlah * 0.025) : 'Belum Wajib');

    document.getElementById('res-dagang').classList.add('show');
    scrollToResult('res-dagang');
}

/* ===== KALKULASI: PERDAGANGAN ===== */

function autoCalcPerdagangan() {
    const jumlah = clamp(num('dag-aset') + num('dag-laba'));
    setVal('dag-jumlah', fmt(jumlah));
}

function hitungPerdagangan() {
    if (!validateRequired(['dag-aset'])) return;

    const aset = num('dag-aset');
    const laba = num('dag-laba');
    const jumlah = clamp(aset + laba);
    const wajib = jumlah > 0 && jumlah >= NISAB_TAHUN;

    setTxt('rpd-aset', rp(aset));
    setTxt('rpd-laba', rp(laba));
    setTxt('rpd-jumlah', rp(jumlah));
    setTxt('rpd-nisab', rp(NISAB_TAHUN));
    setHTML('rpd-status', badge(wajib));
    setTxt('rpd-zakat', wajib ? rp(jumlah * 0.025) : 'Belum Wajib');

    document.getElementById('res-perdagangan').classList.add('show');
    scrollToResult('res-perdagangan');
}

/* ===== KALKULASI: EMAS ===== */

function autoCalcEmas() {
    // Nisab emas bersifat statis (85 gram), tidak ada kalkulasi otomatis
}

function hitungEmas() {
    if (!validateRequired(['em-berat'])) return;

    const berat = parseFloat(document.getElementById('em-berat').value) || 0;
    const wajib = berat > 0 && berat >= NISAB_EMAS_GRAM;

    setTxt('re-berat', berat.toLocaleString('id-ID') + ' gram');
    setTxt('re-nisab', NISAB_EMAS_GRAM + ' gram');
    setHTML('re-status', badge(wajib));
    setTxt(
        're-zakat',
        wajib
            ? (berat * 0.025).toLocaleString('id-ID', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + ' gram'
            : 'Belum Wajib'
    );

    document.getElementById('res-emas').classList.add('show');
    scrollToResult('res-emas');
}