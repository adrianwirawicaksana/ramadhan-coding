/* ===================================================
   PORTAL RAMADHAN 1447 H — main.js

   Catatan: Logika drawer (hamburger/mobile menu) sudah
   dipindah ke dalam components/navbar.js dan berjalan
   otomatis saat <site-navbar> di-render.
   File ini hanya menangani hal-hal yang spesifik
   per-halaman, seperti efek bintang di hero.
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── TWINKLING STARS (hanya di halaman yang punya #stars) ── */
    const starsEl = document.getElementById('stars');

    if (starsEl) {
        for (let i = 0; i < 80; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.style.cssText = [
                `left:${Math.random() * 100}%`,
                `top:${Math.random() * 100}%`,
                `width:${1 + Math.random() * 2}px`,
                `height:${1 + Math.random() * 2}px`,
                `--d:${2 + Math.random() * 4}s`,
                `--delay:-${Math.random() * 4}s`,
            ].join(';');
            starsEl.appendChild(s);
        }
    }

});