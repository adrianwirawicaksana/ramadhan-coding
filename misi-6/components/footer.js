/* =====================================================
   PORTAL RAMADHAN — footer.js
   Reusable <site-footer> Web Component

   CARA PAKAI:
   1. Load script ini di <head> dengan defer:
      <script src="../components/footer.js" defer></script>

   2. Tulis tag sebelum </body>:
      <site-footer></site-footer>

   ATRIBUT OPSIONAL:
   - quote   : kutipan hadith / quote sesuai tema halaman
   - source  : sumber hadith (misal: "HR. Bukhari & Muslim")
   - year    : ganti tahun copyright (default: tahun saat ini)
   - variant : "minimal" untuk footer lebih ringkas
   ===================================================== */

class SiteFooter extends HTMLElement {

    static get observedAttributes() {
        return ['quote', 'source', 'year', 'variant'];
    }

    connectedCallback() { this._render(); }
    attributeChangedCallback() { this._render(); }

    get _quote() {
        return this.getAttribute('quote') ||
            'Semoga ibadah kita diterima Allah SWT';
    }

    get _source() {
        return this.getAttribute('source') || '';
    }

    get _year() {
        return this.getAttribute('year') || new Date().getFullYear();
    }

    get _variant() {
        return (this.getAttribute('variant') || 'default').toLowerCase();
    }

    _sourceHTML() {
        if (!this._source) return '';
        return `<p style="font-family:'Poppins',sans-serif; font-size:0.7rem; font-weight:700; color:#0F9D58; letter-spacing:0.06em; margin-top:4px;">
                    &mdash; ${this._source}
                </p>`;
    }

    _render() {
        if (this._variant === 'minimal') {
            this._renderMinimal();
        } else {
            this._renderDefault();
        }
    }

    _renderDefault() {
        this.innerHTML = /* html */`
            <footer style="border-top:1px solid rgba(15,157,88,0.2); background:#F6F3E9;">
                <div style="max-width:1100px; margin:0 auto; padding:32px 24px; text-align:center;">

                    <p style="font-family:'Poppins',sans-serif; font-size:0.95rem; color:#3a3a2e; letter-spacing:0.01em; line-height:1.8; max-width:520px; margin:0 auto 6px; font-style:italic; opacity:0.88;">
                        &ldquo;${this._quote}&rdquo;
                    </p>
                    ${this._sourceHTML()}

                    <div style="width:36px; height:2px; background:rgba(15,157,88,0.35); border-radius:99px; margin:16px auto;"></div>

                    <p style="font-family:'Poppins',sans-serif; font-size:0.68rem; color:#7a7a6a; letter-spacing:0.06em; font-weight:500; text-transform:uppercase;">
                        &copy; ${this._year} Portal Ramadhan 1447 H &bull; Dibuat untuk RCC Front-end Misi 6
                    </p>

                </div>
            </footer>
        `;
    }

    _renderMinimal() {
        this.innerHTML = /* html */`
            <footer style="border-top:1px solid rgba(15,157,88,0.2); background:#F6F3E9;">
                <div style="max-width:1100px; margin:0 auto; padding:20px 24px; text-align:center;">
                    <p style="font-family:'Poppins',sans-serif; font-size:0.95rem; color:#3a3a2e; letter-spacing:0.01em; line-height:1.75; max-width:480px; margin:0 auto 6px; font-style:italic; opacity:0.85;">
                        &ldquo;${this._quote}&rdquo;
                    </p>
                    ${this._sourceHTML()}
                    <p style="font-family:'Poppins',sans-serif; font-size:0.68rem; color:#7a7a6a; letter-spacing:0.06em; font-weight:500; text-transform:uppercase; margin-top:12px;">
                        &copy; ${this._year} Portal Ramadhan 1447 H &bull; Dibuat dengan &#x2764;&#xFE0F;
                    </p>
                </div>
            </footer>
        `;
    }
}

/* Register custom element */
customElements.define('site-footer', SiteFooter);