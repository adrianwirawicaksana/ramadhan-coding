/* =====================================================
   PORTAL RAMADHAN — navbar.js
   Reusable <site-navbar> Web Component

   CARA PAKAI:
   1. Load script ini di <head> dengan defer:
      <script src="../components/navbar.js" defer></script>

   2. Tulis tag di dalam <body>:
      <site-navbar page="beranda"></site-navbar>

   NILAI ATRIBUT page (case-insensitive):
      beranda | doa | dzikir | zakat | todo | imsak

   ATRIBUT basepath (opsional):
      Halaman di sub-folder → basepath="../"
      Default: "" (root)

   CATATAN:
   Semua class responsif (md:flex, md:hidden, dll) TIDAK
   dipakai di sini karena Tailwind CDN tidak memproses
   class yang di-inject via innerHTML JavaScript.
   Sebagai gantinya dipakai class custom yang didefinisikan
   di global.css dengan @media query manual.
   ===================================================== */

class SiteNavbar extends HTMLElement {

    static get observedAttributes() {
        return ['page', 'basepath'];
    }

    connectedCallback() { this._render(); }
    attributeChangedCallback() { this._render(); }

    /* ── Helpers ── */
    get _page() {
        return (this.getAttribute('page') || 'beranda').toLowerCase();
    }

    get _base() {
        const b = this.getAttribute('basepath') || '';
        return b.endsWith('/') ? b : (b ? b + '/' : '');
    }

    _isActive(page) {
        return this._page === page
            ? 'no-underline text-xs font-bold text-[#064E2B] bg-[#0F9D58]/10 px-3 py-1.5 rounded-lg'
            : 'no-underline text-xs font-semibold text-gray-500 px-3 py-1.5 rounded-lg transition-colors nav-link-hover';
    }

    _isActiveDrawer(page) {
        return this._page === page ? 'drawer-link active' : 'drawer-link';
    }

    /* ── Render ── */
    _render() {
        const b = this._base;

        const links = [
            { id: 'beranda', label: 'Beranda', href: `${b}index.html` },
            { id: 'doa', label: 'Doa', href: `${b}pages/doa.html` },
            { id: 'dzikir', label: 'Dzikir', href: `${b}pages/dzikir.html` },
            { id: 'zakat', label: 'Zakat', href: `${b}pages/zakat.html` },
            { id: 'todo', label: 'To-Do', href: `${b}pages/todo.html` },
            { id: 'imsak', label: 'Imsak', href: `${b}pages/imsak.html` },
        ];

        const drawerLinks = [
            { id: 'beranda', icon: '&#x1F3E0;', label: 'Beranda', href: `${b}index.html` },
            { id: 'doa', icon: '&#x1F932;', label: 'Doa Ramadhan', href: `${b}pages/doa.html` },
            { id: 'dzikir', icon: '&#x1F4FF;', label: 'Hitung Dzikir', href: `${b}pages/dzikir.html` },
            { id: 'zakat', icon: '&#x1F9EE;', label: 'Kalkulator Zakat', href: `${b}pages/zakat.html` },
            { id: 'todo', icon: '&#x2705;', label: 'Ramadhan To-Do', href: `${b}pages/todo.html` },
            { id: 'imsak', icon: '&#x1F554;', label: 'Jadwal Imsak', href: `${b}pages/imsak.html` },
        ];

        const desktopLinks = links.map(({ id, label, href }) => `
            <li><a href="${href}" class="${this._isActive(id)}">${label}</a></li>
        `).join('');

        const drawerLinkHTML = drawerLinks.map(({ id, icon, label, href }) => `
            <a href="${href}" class="${this._isActiveDrawer(id)}">
                <div class="drawer-icon">${icon}</div>${label}
            </a>
        `).join('');

        this.innerHTML = /* html */`
            <header class="fixed top-0 left-0 right-0 z-[100] bg-[#F6F3E9]/90 backdrop-blur-md border-b border-[#0F9D58]/20" style="font-family:'Poppins',sans-serif">
                <nav class="max-w-[1100px] mx-auto nav-inner flex items-center justify-between gap-4">

                    <!-- Brand -->
                    <a href="${b}index.html" class="flex items-center gap-2.5 no-underline flex-shrink-0">
                        <div class="nav-brand-icon rounded-[10px] bg-[#0F9D58]/10 border border-[#0F9D58]/25 flex items-center justify-center text-xl">
                            <img src="${b}assets/navbar/Bulan-ramadhan.svg" alt="Icon" width="26" height="26" />
                        </div>
                        <div>
                            <div class="nav-brand-name font-bold text-[#064E2B] leading-tight">Portal Ramadhan</div>
                            <div class="text-[9.5px] font-semibold text-[#0F9D58] mt-px">1447 H &bull; Panduan Lengkap</div>
                        </div>
                    </a>

                    <!-- Desktop links — nav-desktop-links diatur di global.css -->
                    <ul class="nav-desktop-links gap-0.5 list-none m-0 p-0">
                        ${desktopLinks}
                    </ul>

                    <!-- Desktop CTA — nav-desktop-cta diatur di global.css -->
                    <a href="${b}pages/doa.html"
                       class="nav-desktop-cta items-center gap-1.5 px-[18px] py-[9px] bg-[#0F9D58] text-white text-xs font-bold no-underline rounded-lg flex-shrink-0 shadow-[0_3px_14px_rgba(15,157,88,0.35)] hover:opacity-90 transition-all duration-150">
                        Mulai Sekarang
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                        </svg>
                    </a>

                    <!-- Hamburger — nav-hamburger diatur di global.css -->
                    <button id="hamburger"
                            class="nav-hamburger flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1"
                            aria-label="Buka menu" aria-expanded="false" aria-controls="mobileMenu">
                        <span class="block w-[22px] h-[2.5px] bg-[#064E2B] rounded-full"></span>
                        <span class="block w-[22px] h-[2.5px] bg-[#064E2B] rounded-full"></span>
                        <span class="block w-[22px] h-[2.5px] bg-[#064E2B] rounded-full"></span>
                    </button>
                </nav>
            </header>

            <!-- DRAWER OVERLAY -->
            <div class="drawer-overlay" id="drawerOverlay"></div>

            <!-- MOBILE DRAWER -->
            <div class="drawer" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menu navigasi" style="font-family:'Poppins',sans-serif">

                <div class="flex items-center justify-between px-6 py-5 border-b border-[#0F9D58]/18 bg-white flex-shrink-0">
                    <a href="${b}index.html" class="flex items-center gap-2.5 no-underline">
                        <div class="w-9 h-9 rounded-[9px] flex items-center justify-center text-[17px]"
                             style="background:linear-gradient(135deg,#FEF9C3,#D9F99D,#A7F3D0);border:1px solid rgba(15,157,88,.18)">
                              <img src="${b}assets/navbar/Bulan-ramadhan.svg" alt="Icon" width="26" height="26" />
                        </div>
                        <div>
                            <div class="text-[15px] font-bold text-[#064E2B] leading-tight">Portal Ramadhan</div>
                            <div class="text-[8.5px] font-semibold text-[#0F9D58]">1447 H &bull; Panduan Lengkap</div>
                        </div>
                    </a>
                    <button id="mobileClose"
                            class="w-[34px] h-[34px] rounded-lg bg-[#E6F9F0] border border-[#0F9D58]/18 text-[#064E2B] text-sm cursor-pointer flex items-center justify-center hover:bg-[#A7F3D0] transition-colors"
                            aria-label="Tutup menu">
                        &#x2715;
                    </button>
                </div>

                <div class="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                    <p class="text-[9.5px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-2 pb-1">Menu Utama</p>
                    ${drawerLinkHTML}
                </div>

                <div class="px-4 py-4 border-t border-[#0F9D58]/18 flex-shrink-0">
                    <a href="${b}pages/doa.html"
                       class="flex items-center justify-center gap-2 w-full py-3 bg-[#0F9D58] text-white text-[13px] font-bold no-underline rounded-[10px] shadow-[0_3px_14px_rgba(15,157,88,0.3)] hover:opacity-90 transition-opacity">
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

    /* ── Drawer logic ── */
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
    }
}

customElements.define('site-navbar', SiteNavbar);