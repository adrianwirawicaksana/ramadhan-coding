/* ===================================================
   PORTAL RAMADHAN 1447 H — main.js
   Catatan: Logika drawer (hamburger/mobile menu)
   sudah dipindah ke components/navbar.js.
   File ini hanya menangani efek halaman seperti:
   - twinkling stars
   - hover tilt portal card
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── TWINKLING STARS ── */
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

    /* ── HOVER TILT CARD ── */
    if (window.matchMedia('(hover: hover)').matches) {

        document.querySelectorAll('.portal-card').forEach(card => {

            card.addEventListener('mousemove', e => {

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);

                card.classList.add('is-hovered');

                card.style.transform =
                    `perspective(900px)
                     rotateX(${-dy * 9}deg)
                     rotateY(${dx * 7}deg)
                     translateZ(14px)
                     translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('is-hovered');
                card.style.transform = '';
            });

        });

    }

});