/* =====================================================
   PORTAL RAMADHAN — navbar.js  (v2 – Sidebar Edition)
   Reusable <site-navbar> Web Component

   CARA PAKAI:
   1. Load script ini di <head> dengan defer:
      <script src="../components/navbar.js" defer></script>

   2. Tulis tag di dalam <body>:
      <site-navbar page="beranda"></site-navbar>

   NILAI ATRIBUT page (case-insensitive):
      beranda | doa | dzikir | zakat | todo | imsak | quran | blog

   ATRIBUT basepath (opsional):
      Halaman di sub-folder → basepath="../"
      Default: "" (root)

   PERUBAHAN v2:
   - Mobile & Tablet → SIDEBAR dari KIRI (full-height, slide dari kiri)
   - Desktop ≥ 1024px → Tetap navbar top horizontal
   - Styling sidebar sama persis dengan drawer lama (v1)
   ===================================================== */

class SiteNavbar extends HTMLElement {

    static get observedAttributes() {
        return ['page', 'basepath'];
    }

    connectedCallback() {
        this._injectStyles();
        this._render();
    }
    attributeChangedCallback() { this._render(); }

    /* ── Helpers ── */
    get _page() {
        return (this.getAttribute('page') || 'beranda').toLowerCase();
    }

    get _base() {
        const b = this.getAttribute('basepath') || '';
        return b.endsWith('/') ? b : (b ? b + '/' : '');
    }

    get _pageTitle() {
        const titles = {
            beranda: 'Portal Ramadhan',
            doa: 'Doa Ramadhan',
            dzikir: 'Hitung Dzikir',
            zakat: 'Kalkulator Zakat',
            todo: 'Ramadhan To-Do',
            imsak: 'Jadwal Imsak',
            quran: 'Al-Quran',
            blog: 'Blog Ramadhan',
        };
        return titles[this._page] || 'Portal Ramadhan';
    }

    _isActive(page) {
        return this._page === page ? 'nav-link nav-link-active' : 'nav-link';
    }

    _isActiveDrawer(page) {
        return this._page === page ? 'drawer-link active' : 'drawer-link';
    }

    /* ── Inject CSS ── */
    _injectStyles() {
        if (document.getElementById('site-navbar-styles')) return;
        const style = document.createElement('style');
        style.id = 'site-navbar-styles';
        style.textContent = `
            .nav-inner {
                padding: 0 16px;
                height: 60px;
            }

            .nav-brand-icon {
                width: 40px;
                height: 40px;
            }

            .nav-brand-name {
                font-size: 15px;
            }

            /* ── Nav link base ── */
            .nav-link {
                display: inline-block;
                text-decoration: none;
                font-size: 11px;
                font-weight: 600;
                color: #6B7280;
                padding: 6px 8px;
                border-radius: 8px;
                transition: color .15s, background .15s;
                white-space: nowrap;
            }
            .nav-link:hover {
                color: #064E2B;
                background: rgba(15,157,88,0.08);
            }
            .nav-link-active {
                font-weight: 700;
                color: #064E2B !important;
                background: rgba(15,157,88,0.10) !important;
            }

            /* ── Mobile: sembunyikan desktop elemen ── */
            .nav-desktop-links { display: none; }
            .nav-desktop-cta   { display: none; }
            .nav-hamburger     { display: flex; }

            /* ── Desktop ≥ 1024px ── */
            @media (min-width: 1024px) {
                .nav-inner          { padding: 0 24px; height: 64px; }
                .nav-brand-name     { font-size: 16px; }
                .nav-desktop-cta    { display: flex; }
                .nav-hamburger      { display: none; }
                .nav-desktop-links  { display: flex; gap: 1px; }
                .nav-link-sm        { display: inline-block; }
            }

            /* ── Wide ≥ 1200px ── */
            @media (min-width: 1200px) {
                .nav-inner  { padding: 0 32px; }
                .nav-link   { font-size: 12px; padding: 7px 11px; }
            }

            /* ══════════════════════
               SIDEBAR
               Dari KIRI — styling identik drawer lama
            ══════════════════════ */
            .drawer-overlay {
                display: none;
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,.45);
                backdrop-filter: blur(3px);
                z-index: 99;
                animation: drawerFadeIn .2s ease;
            }
            .drawer-overlay.open { display: block; }

            @keyframes drawerFadeIn {
                from { opacity: 0; }
                to   { opacity: 1; }
            }

            .drawer {
                position: fixed;
                top: 0; left: 0; bottom: 0;         /* ← KIRI */
                width: min(300px, 85vw);
                background: #fff;
                z-index: 100;
                display: flex;
                flex-direction: column;
                transform: translateX(-100%);         /* ← slide masuk dari kiri */
                transition: transform .28s cubic-bezier(.4,0,.2,1);
                box-shadow: 6px 0 28px rgba(0,0,0,.13);
                border-radius: 0;
            }
            .drawer.open { transform: translateX(0); }

            .drawer-link {
                display: flex;
                align-items: center;
                gap: 11px;
                padding: 10px 12px;
                border-radius: 10px;
                text-decoration: none;
                font-size: 13px;
                font-weight: 500;
                color: #374151;
                transition: background .15s, color .15s;
            }
            .drawer-link:hover {
                background: rgba(15,157,88,.07);
                color: #064E2B;
            }
            .drawer-link.active {
                background: rgba(15,157,88,.10);
                color: #064E2B;
                font-weight: 700;
            }
            .drawer-icon {
                width: 32px;
                height: 32px;
                border-radius: 8px;
                background: rgba(15,157,88,.08);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 15px;
                flex-shrink: 0;
            }
            .drawer-link.active .drawer-icon {
                background: rgba(15,157,88,.18);
            }
            .drawer-section-label {
                font-size: 9px;
                font-weight: 700;
                letter-spacing: .1em;
                text-transform: uppercase;
                color: #9CA3AF;
                padding: 12px 12px 4px;
            }

            /* ── Sidebar sembunyi di desktop ── */
            @media (min-width: 1024px) {
                .drawer-overlay { display: none !important; }
                .drawer         { display: none !important; }
            }
        `;
        document.head.appendChild(style);
    }

    /* ── Render ── */
    _render() {
        const b = this._base;

        const links = [
            { id: 'beranda', label: 'Beranda', href: `${b}index.html`, sm: false },
            { id: 'doa', label: 'Doa', href: `${b}pages/doa.html`, sm: false },
            { id: 'dzikir', label: 'Dzikir', href: `${b}pages/dzikir.html`, sm: false },
            { id: 'zakat', label: 'Zakat', href: `${b}pages/zakat.html`, sm: false },
            { id: 'todo', label: 'To-Do', href: `${b}pages/todo.html`, sm: true },
            { id: 'imsak', label: 'Imsak', href: `${b}pages/imsak.html`, sm: true },
            { id: 'quran', label: 'Al-Quran', href: `${b}pages/quran.html`, sm: true },
            { id: 'blog', label: 'Blog', href: `${b}pages/blog.html`, sm: true },
        ];

        const drawerLinks = [
            { id: 'beranda', icon: '&#x1F3E0;', label: 'Beranda', href: `${b}index.html` },
            { id: 'doa', icon: '&#x1F932;', label: 'Doa Ramadhan', href: `${b}pages/doa.html` },
            { id: 'dzikir', icon: '&#x1F4FF;', label: 'Hitung Dzikir', href: `${b}pages/dzikir.html` },
            { id: 'zakat', icon: '&#x1F9EE;', label: 'Kalkulator Zakat', href: `${b}pages/zakat.html` },
            { id: 'todo', icon: '&#x2705;', label: 'Ramadhan To-Do', href: `${b}pages/todo.html` },
            { id: 'imsak', icon: '&#x1F554;', label: 'Jadwal Imsak', href: `${b}pages/imsak.html` },
            { id: 'quran', icon: '&#x1F4D6;', label: 'Al-Quran', href: `${b}pages/quran.html` },
            { id: 'blog', icon: '&#x270D;&#xFE0F;', label: 'Blog Ramadhan', href: `${b}pages/blog.html` },
        ];

        const desktopLinks = links.map(({ id, label, href, sm }) => `
            <li style="list-style:none;margin:0;padding:0">
                <a href="${href}" class="${this._isActive(id)}${sm ? ' nav-link-sm' : ''}">${label}</a>
            </li>
        `).join('');

        const drawerLinkHTML = drawerLinks.map(({ id, icon, label, href }) => `
            <a href="${href}" class="${this._isActiveDrawer(id)}">
                <div class="drawer-icon">${icon}</div>${label}
            </a>
        `).join('');

        this.innerHTML = /* html */`
            <header class="fixed top-0 left-0 right-0 z-[100] bg-[#F6F3E9]/90 backdrop-blur-md border-b border-[#0F9D58]/20" style="font-family:'Poppins',sans-serif">
                <nav class="max-w-[1200px] mx-auto nav-inner flex items-center justify-between gap-3">

                    <!-- Brand -->
                    <a href="${b}index.html" class="flex items-center gap-2 no-underline flex-shrink-0">
                        <div class="nav-brand-icon rounded-[10px] bg-[#0F9D58]/10 border border-[#0F9D58]/25 flex items-center justify-center">
                            <img src="${b}assets/navbar/Bulan-ramadhan.svg" alt="Icon" width="26" height="26" />
                        </div>
                        <div>
                            <div class="nav-brand-name font-bold text-[#064E2B] leading-tight">${this._pageTitle}</div>
                            <div style="font-size:10px;font-weight:600;color:#0F9D58;margin-top:1px">1447 H &bull; Panduan Lengkap</div>
                        </div>
                    </a>

                    <!-- Desktop links -->
                    <ul class="nav-desktop-links list-none m-0 p-0 flex-1 justify-center">
                        ${desktopLinks}
                    </ul>

                    <!-- Desktop CTA -->
                    <a href="${b}pages/doa.html"
                       class="nav-desktop-cta items-center gap-1.5 px-4 py-[9px] bg-[#0F9D58] text-white text-[11px] font-bold no-underline rounded-lg flex-shrink-0 shadow-[0_3px_14px_rgba(15,157,88,0.35)] hover:opacity-90 transition-all duration-150 whitespace-nowrap">
                        Mulai Sekarang
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                        </svg>
                    </a>

                    <!-- Hamburger -->
                    <button id="hamburger"
                            class="nav-hamburger flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1 flex-shrink-0"
                            aria-label="Buka menu" aria-expanded="false" aria-controls="mobileMenu">
                        <span class="block w-[22px] h-[2.5px] bg-[#064E2B] rounded-full"></span>
                        <span class="block w-[22px] h-[2.5px] bg-[#064E2B] rounded-full"></span>
                        <span class="block w-[22px] h-[2.5px] bg-[#064E2B] rounded-full"></span>
                    </button>
                </nav>
            </header>

            <!-- OVERLAY -->
            <div class="drawer-overlay" id="drawerOverlay"></div>

            <!-- SIDEBAR (kiri, styling drawer lama) -->
            <div class="drawer" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menu navigasi" style="font-family:'Poppins',sans-serif">

                <!-- Header -->
                <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 16px 14px;border-bottom:1px solid rgba(15,157,88,.12);background:#fff;flex-shrink:0">
                    <a href="${b}index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none">
                        <div style="width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#FEF9C3,#D9F99D,#A7F3D0);border:1px solid rgba(15,157,88,.18);flex-shrink:0">
                            <img src="${b}assets/navbar/Bulan-ramadhan.svg" alt="Icon" width="22" height="22" />
                        </div>
                        <div>
                            <div style="font-size:15px;font-weight:700;color:#064E2B;line-height:1.2">${this._pageTitle}</div>
                            <div style="font-size:10px;font-weight:600;color:#0F9D58">1447 H &bull; Panduan Lengkap</div>
                        </div>
                    </a>
                    <button id="mobileClose"
                            style="width:32px;height:32px;border-radius:8px;background:#E6F9F0;border:1px solid rgba(15,157,88,.18);color:#064E2B;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0"
                            aria-label="Tutup menu">
                        &#x2715;
                    </button>
                </div>

                <!-- Links -->
                <div style="flex:1;display:flex;flex-direction:column;gap:2px;padding:8px;overflow-y:auto">
                    <p class="drawer-section-label">Menu Utama</p>
                    ${drawerLinkHTML}
                </div>

                <!-- CTA Footer -->
                <div style="padding:12px 12px 16px;border-top:1px solid rgba(15,157,88,.12);flex-shrink:0">
                    <a href="${b}pages/doa.html"
                       style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px;background:#0F9D58;color:white;font-size:13px;font-weight:700;text-decoration:none;border-radius:10px;box-shadow:0 3px 14px rgba(15,157,88,.3)">
                        Mulai Sekarang
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;

        this._initDrawer();
    }

    /* ── Logic ── */
    _initDrawer() {
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('drawerOverlay');
        const hamburger = document.getElementById('hamburger');
        const closeBtn = document.getElementById('mobileClose');

        if (!menu || !overlay) return;

        const open = () => {
            menu.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            hamburger?.setAttribute('aria-expanded', 'true');
        };

        const close = () => {
            menu.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            hamburger?.setAttribute('aria-expanded', 'false');
        };

        hamburger?.addEventListener('click', open);
        closeBtn?.addEventListener('click', close);
        overlay.addEventListener('click', close);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

        // Swipe kiri untuk tutup sidebar
        let touchStartX = 0;
        menu.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        menu.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (dx < -60) close();
        }, { passive: true });
    }
}

customElements.define('site-navbar', SiteNavbar);