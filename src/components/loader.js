/* =====================================================
   PORTAL RAMADHAN — loader.js
   Page loading overlay — animasi bounce mascot
   Sesuai style #pageLoader di global.css
   ===================================================== */

(function () {
    /* ── Ambil basepath dari meta tag (opsional) ── */
    const baseMeta = document.querySelector('meta[name="loader-basepath"]');
    const base = baseMeta ? baseMeta.getAttribute('content') : '';
    const basePath = base.endsWith('/') ? base : (base ? base + '/' : '');

    /* ── Inject CSS (sesuai global.css) ── */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loader-mascotBounce {
            0%, 100% { transform: translateY(0)    scaleX(1)   scaleY(1)    }
            30%       { transform: translateY(-28px) scaleX(.96) scaleY(1.04) }
            60%       { transform: translateY(-10px) scaleX(.98) scaleY(1.02) }
        }

        @keyframes loader-shadowPulse {
            0%, 100% { transform: scaleX(1);   opacity: .35 }
            30%       { transform: scaleX(.55); opacity: .15 }
            60%       { transform: scaleX(.75); opacity: .22 }
        }

        @keyframes loader-dotBounce {
            0%, 80%, 100% { transform: translateY(0) }
            40%            { transform: translateY(-8px) }
        }

        @keyframes loader-fadeIn {
            from { opacity: 0 }
            to   { opacity: 1 }
        }

        #page-loader {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: rgba(246, 243, 233, .94);
            backdrop-filter: blur(6px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0;
            animation: loader-fadeIn .2s ease both;
            transition: opacity .5s ease, visibility .5s ease;
        }

        #page-loader.hide {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        #page-loader .ldr-mascot-wrap {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: clamp(14px, 3vw, 28px);
        }

        #page-loader .ldr-mascot {
            width:  clamp(80px, 18vw, 200px);
            height: clamp(80px, 18vw, 200px);
            object-fit: contain;
            animation: loader-mascotBounce .8s cubic-bezier(.36,.07,.19,.97) infinite;
            filter: drop-shadow(0 8px 20px rgba(0,0,0,.2));
        }

        #page-loader .ldr-shadow {
            width:  clamp(50px, 12vw, 130px);
            height: clamp(8px, 1.5vw, 16px);
            background: radial-gradient(ellipse, rgba(0,0,0,.25) 0%, transparent 70%);
            border-radius: 50%;
            margin-top: -4px;
            animation: loader-shadowPulse .8s cubic-bezier(.36,.07,.19,.97) infinite;
        }

        #page-loader .ldr-text {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(12px, 2vw, 16px);
            font-weight: 600;
            color: #0F9D58;
            letter-spacing: .04em;
            margin-bottom: clamp(10px, 2vw, 18px);
        }

        #page-loader .ldr-dots {
            display: flex;
            gap: clamp(5px, 1vw, 10px);
            align-items: center;
        }

        #page-loader .ldr-dots span {
            width:  clamp(7px, 1.2vw, 12px);
            height: clamp(7px, 1.2vw, 12px);
            background: #0F9D58;
            border-radius: 50%;
            animation: loader-dotBounce .7s ease infinite;
        }

        #page-loader .ldr-dots span:nth-child(1) { animation-delay: 0s   }
        #page-loader .ldr-dots span:nth-child(2) { animation-delay: .12s }
        #page-loader .ldr-dots span:nth-child(3) { animation-delay: .24s }

        @media (min-width: 1280px) {
            #page-loader .ldr-mascot     { width: 200px; height: 200px; }
            #page-loader .ldr-shadow     { width: 130px; height: 16px;  }
            #page-loader .ldr-text       { font-size: 16px; margin-bottom: 18px; }
            #page-loader .ldr-dots       { gap: 10px; }
            #page-loader .ldr-dots span  { width: 12px; height: 12px; }
        }
    `;
    document.head.appendChild(style);

    /* ── Inject HTML Loader ── */
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
        <div class="ldr-mascot-wrap">
            <img
                class="ldr-mascot"
                src="${basePath}assets/loader/Ramadhan.webp"
                alt="Loading"
                draggable="false"
            />
            <div class="ldr-shadow"></div>
        </div>
        <p class="ldr-text">Memuat</p>
        <div class="ldr-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    document.body.insertBefore(loader, document.body.firstChild);

    /* ── Sembunyikan ketika DOM sudah ready ── */
    const hideLoader = () => {
        loader.classList.add('hide');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

})();