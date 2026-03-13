/* ════════════════════════════════════
       BLOG DATA — static articles
       ════════════════════════════════════ */
const ARTICLES = [
    {
        id: 1,
        featured: true,
        title: "10 Amalan Sunnah di Bulan Ramadhan yang Sering Terlupakan",
        excerpt: "Selain ibadah wajib seperti puasa, sholat tarawih, dan tadarus Al-Qur'an, ada banyak amalan sunnah di bulan Ramadhan yang pahalanya berlipat ganda namun sering kita lewatkan dalam kesibukan sehari-hari.",
        category: "tips-ibadah",
        categoryLabel: "Tips Ibadah",
        date: "10 Maret 2026",
        readTime: "6 menit",
        author: "Ustaz Fauzan",
        authorEmoji: "👨‍🏫",
        emoji: "✨",
        tags: ["amalan sunnah", "Ramadhan", "ibadah"],
        views: 4820,
    },
    {
        id: 2,
        featured: false,
        title: "Panduan Lengkap Puasa untuk Pemula: Niat, Sahur, dan Buka Puasa",
        excerpt: "Bagi yang baru pertama kali berpuasa atau ingin memperbaiki kualitas ibadahnya, panduan lengkap ini akan membantu dari niat yang benar hingga adab berbuka puasa sesuai sunnah.",
        category: "puasa",
        categoryLabel: "Panduan Puasa",
        date: "8 Maret 2026",
        readTime: "8 menit",
        author: "Tim Redaksi",
        authorEmoji: "📝",
        emoji: "🌙",
        tags: ["puasa", "niat", "sahur"],
        views: 3610,
    },
    {
        id: 3,
        featured: false,
        title: "Doa-Doa Mustajab di Bulan Ramadhan yang Perlu Kamu Hafal",
        excerpt: "Ramadhan adalah bulan dikabulkannya doa. Pelajari doa-doa yang dianjurkan dibaca setiap hari, terutama saat sahur, berbuka, dan sepertiga malam terakhir.",
        category: "doa-zikir",
        categoryLabel: "Doa & Zikir",
        date: "7 Maret 2026",
        readTime: "5 menit",
        author: "Ustazah Rahma",
        authorEmoji: "🤲",
        emoji: "🤲",
        tags: ["doa", "mustajab", "Ramadhan"],
        views: 5200,
    },
    {
        id: 4,
        featured: false,
        title: "Keutamaan 10 Hari Terakhir Ramadhan: Maksimalkan Lailatul Qadar",
        excerpt: "Sepuluh hari terakhir Ramadhan adalah puncak kemuliaan bulan suci ini. Di dalamnya tersimpan satu malam yang lebih baik dari seribu bulan. Inilah cara terbaik memanfaatkannya.",
        category: "lailatul-qadar",
        categoryLabel: "Lailatul Qadar",
        date: "6 Maret 2026",
        readTime: "7 menit",
        author: "Ustaz Fauzan",
        authorEmoji: "👨‍🏫",
        emoji: "⭐",
        tags: ["lailatul qadar", "10 hari terakhir", "itikaf"],
        views: 6100,
    },
    {
        id: 5,
        featured: false,
        title: "Cara Menghitung Zakat Fitrah dan Zakat Mal dengan Benar",
        excerpt: "Zakat adalah salah satu rukun Islam yang wajib ditunaikan. Ketahui cara menghitung zakat fitrah berdasarkan harga beras, dan zakat maal sesuai nisab dan haul.",
        category: "zakat",
        categoryLabel: "Zakat & Sedekah",
        date: "5 Maret 2026",
        readTime: "9 menit",
        author: "Tim Redaksi",
        authorEmoji: "📝",
        emoji: "🧮",
        tags: ["zakat fitrah", "zakat maal", "nisab"],
        views: 2980,
    },
    {
        id: 6,
        featured: false,
        title: "Mengapa Ramadhan Disebut Bulan Penuh Berkah? Ini Penjelasannya",
        excerpt: "Ada banyak dalil dari Al-Qur'an dan Hadits yang menjelaskan keistimewaan Ramadhan. Pahami dengan lebih dalam mengapa bulan ini begitu istimewa di sisi Allah SWT.",
        category: "keutamaan",
        categoryLabel: "Keutamaan Ramadhan",
        date: "4 Maret 2026",
        readTime: "5 menit",
        author: "Ustazah Rahma",
        authorEmoji: "🤲",
        emoji: "🌟",
        tags: ["keutamaan", "dalil", "Al-Qur'an"],
        views: 3340,
    },
    {
        id: 7,
        featured: false,
        title: "Tips Produktif Selama Ramadhan: Ibadah Maksimal, Kerja Tetap Optimal",
        excerpt: "Banyak orang khawatir produktivitas menurun saat Ramadhan. Padahal dengan manajemen waktu yang tepat, kamu bisa tetap produktif bekerja sekaligus meningkatkan kualitas ibadah.",
        category: "tips-ibadah",
        categoryLabel: "Tips Ibadah",
        date: "3 Maret 2026",
        readTime: "6 menit",
        author: "Tim Redaksi",
        authorEmoji: "📝",
        emoji: "⚡",
        tags: ["produktif", "manajemen waktu", "tips"],
        views: 4100,
    },
    {
        id: 8,
        featured: false,
        title: "Zikir Pagi dan Petang di Bulan Ramadhan: Lengkap dengan Artinya",
        excerpt: "Membaca zikir pagi dan petang adalah amalan yang dianjurkan setiap hari, dan pahalanya semakin berlipat di bulan Ramadhan. Berikut panduan lengkap beserta tulisan Arab dan artinya.",
        category: "doa-zikir",
        categoryLabel: "Doa & Zikir",
        date: "2 Maret 2026",
        readTime: "10 menit",
        author: "Ustaz Fauzan",
        authorEmoji: "👨‍🏫",
        emoji: "📿",
        tags: ["zikir", "pagi petang", "amalan harian"],
        views: 3750,
    },
    {
        id: 9,
        featured: false,
        title: "Hukum dan Tata Cara I'tikaf di 10 Hari Terakhir Ramadhan",
        excerpt: "I'tikaf adalah berdiam diri di masjid dengan tujuan ibadah dan mendekatkan diri kepada Allah. Pahami hukum, syarat, dan tata cara i'tikaf yang benar agar ibadahmu sah.",
        category: "lailatul-qadar",
        categoryLabel: "Lailatul Qadar",
        date: "1 Maret 2026",
        readTime: "7 menit",
        author: "Ustazah Rahma",
        authorEmoji: "🤲",
        emoji: "🕌",
        tags: ["itikaf", "masjid", "ibadah"],
        views: 2450,
    },
    {
        id: 10,
        featured: false,
        title: "Sedekah di Bulan Ramadhan: Keutamaan dan Cara Terbaik Melakukannya",
        excerpt: "Rasulullah SAW adalah orang yang paling dermawan, dan beliau semakin dermawan di bulan Ramadhan. Ketahui keutamaan sedekah di bulan suci dan cara paling afdal menunaikannya.",
        category: "zakat",
        categoryLabel: "Zakat & Sedekah",
        date: "28 Februari 2026",
        readTime: "5 menit",
        author: "Tim Redaksi",
        authorEmoji: "📝",
        emoji: "💚",
        tags: ["sedekah", "dermawan", "pahala"],
        views: 3120,
    },
    {
        id: 11,
        featured: false,
        title: "Menjaga Lisan Saat Puasa: Larangan yang Harus Dihindari",
        excerpt: "Puasa bukan hanya menahan lapar dan dahaga, tetapi juga menjaga seluruh anggota tubuh dari perbuatan yang merusak pahala. Berikut hal-hal yang wajib dijauhi selama berpuasa.",
        category: "puasa",
        categoryLabel: "Panduan Puasa",
        date: "27 Februari 2026",
        readTime: "4 menit",
        author: "Ustaz Fauzan",
        authorEmoji: "👨‍🏫",
        emoji: "🤐",
        tags: ["lisan", "akhlak", "adab puasa"],
        views: 2870,
    },
    {
        id: 12,
        featured: false,
        title: "Fadhilah Membaca Al-Qur'an di Bulan Ramadhan: Target dan Strategi",
        excerpt: "Ramadhan adalah bulan Al-Qur'an. Banyak ulama menargetkan khatam Al-Qur'an minimal sekali selama Ramadhan. Berikut strategi realistis agar target kamu tercapai.",
        category: "keutamaan",
        categoryLabel: "Keutamaan Ramadhan",
        date: "26 Februari 2026",
        readTime: "6 menit",
        author: "Ustazah Rahma",
        authorEmoji: "🤲",
        emoji: "📖",
        tags: ["Al-Qur'an", "khatam", "tadarus"],
        views: 5580,
    },
];

/* ── State ── */
let activeCategory = 'semua';
let searchQuery = '';
let visibleCount = 6;
const PAGE_SIZE = 3;

/* ── Tags pool ── */
const ALL_TAGS = [...new Set(ARTICLES.flatMap(a => a.tags))];

/* ════════════════════════════════════
   FILTER & SEARCH
   ════════════════════════════════════ */
function getFiltered() {
    return ARTICLES.filter(a => {
        const matchCat = activeCategory === 'semua' || a.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q
            || a.title.toLowerCase().includes(q)
            || a.excerpt.toLowerCase().includes(q)
            || a.tags.some(t => t.toLowerCase().includes(q));
        return matchCat && matchSearch;
    });
}

/* ════════════════════════════════════
   RENDER FEED
   ════════════════════════════════════ */
function renderFeed() {
    const feed = document.getElementById('articleFeed');
    const empty = document.getElementById('feedEmpty');
    const countEl = document.getElementById('feedCount');
    const loadWrap = document.getElementById('loadMoreWrap');

    const filtered = getFiltered();
    const shown = filtered.slice(0, visibleCount);

    countEl.textContent = filtered.length + ' artikel';

    if (!filtered.length) {
        feed.innerHTML = '';
        empty.classList.add('show');
        loadWrap.style.display = 'none';
        return;
    }

    empty.classList.remove('show');

    feed.innerHTML = shown.map((a, i) => {
        const isFeatured = a.featured && activeCategory === 'semua' && !searchQuery;
        return `
            <a href="#artikel-${a.id}" class="article-card ${isFeatured ? 'featured' : ''}"
               style="animation-delay:${i * 0.06}s"
               onclick="openArticle(${a.id});return false">
                ${isFeatured ? `<div class="featured-badge">⭐ Artikel Pilihan</div>` : ''}
                <div class="ac-body">
                    <div class="ac-meta">
                        <span class="ac-category">${a.categoryLabel}</span>
                        <span class="ac-date">${a.date}</span>
                        <span class="ac-read-time">${a.readTime} baca</span>
                    </div>
                    <div class="ac-title">${a.title}</div>
                    <div class="ac-excerpt">${a.excerpt}</div>
                    <div class="ac-footer">
                        <div class="ac-author">
                            <div class="ac-avatar" style="background:var(--grad)">${a.authorEmoji}</div>
                            ${a.author}
                        </div>
                        <div class="ac-cta">
                            Baca
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                                <line x1="7" y1="17" x2="17" y2="7"/>
                                <polyline points="7 7 17 7 17 17"/>
                            </svg>
                        </div>
                    </div>
                </div>
                ${!isFeatured ? `<div class="ac-thumb">${a.emoji}</div>` : ''}
            </a>`;
    }).join('');

    loadWrap.style.display = filtered.length > visibleCount ? 'block' : 'none';
}

function loadMore() {
    visibleCount += PAGE_SIZE;
    renderFeed();
}

/* ════════════════════════════════════
   RENDER SIDEBAR — POPULAR
   ════════════════════════════════════ */
function renderPopular() {
    const sorted = [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);
    document.getElementById('popularList').innerHTML = sorted.map((a, i) => `
            <a href="#artikel-${a.id}" class="popular-item" onclick="openArticle(${a.id});return false">
                <div class="popular-num ${i === 0 ? 'top' : ''}">${i + 1}</div>
                <div>
                    <div class="popular-title">${a.title}</div>
                    <div class="popular-meta">${a.views.toLocaleString('id')} views · ${a.readTime} baca</div>
                </div>
            </a>`).join('');
}

/* ════════════════════════════════════
   RENDER SIDEBAR — TAGS
   ════════════════════════════════════ */
function renderTags() {
    document.getElementById('tagCloud').innerHTML = ALL_TAGS.map((t, i) => `
            <a href="#tag-${i}" class="tag-chip" style="animation-delay:${i * 0.04}s" onclick="doTagSearch('${t}');return false">
                # ${t}
            </a>`).join('');
}

function doTagSearch(tag) {
    activeCategory = 'semua';
    visibleCount = 6;
    document.getElementById('filterSelect').value = 'semua';
    updateActivePill();
    handleSearch(tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════
   FILTER DROPDOWN
   ════════════════════════════════════ */
const CATEGORY_LABELS = {
    'semua': 'Semua',
    'tips-ibadah': 'Tips Ibadah',
    'doa-zikir': 'Doa & Zikir',
    'keutamaan': 'Keutamaan Ramadhan',
    'puasa': 'Panduan Puasa',
    'zakat': 'Zakat & Sedekah',
    'lailatul-qadar': 'Lailatul Qadar',
};

function onFilterChange(cat) {
    activeCategory = cat;
    visibleCount = 6;
    updateActivePill();
    renderFeed();
}

function resetFilter() {
    activeCategory = 'semua';
    visibleCount = 6;
    document.getElementById('filterSelect').value = 'semua';
    updateActivePill();
    renderFeed();
}

function updateActivePill() {
    const pill = document.getElementById('filterActivePill');
    const label = document.getElementById('filterActivePillLabel');
    if (activeCategory !== 'semua') {
        label.textContent = CATEGORY_LABELS[activeCategory] || activeCategory;
        pill.classList.add('show');
    } else {
        pill.classList.remove('show');
    }
}

/* ════════════════════════════════════
   SEARCH — desktop only (no mobile duplicate)
   ════════════════════════════════════ */
function handleSearch(q) {
    searchQuery = q;
    visibleCount = 6;
    document.getElementById('searchInput').value = q;
    renderFeed();
}

document.getElementById('searchInput').addEventListener('input', e => handleSearch(e.target.value.trim()));

/* ════════════════════════════════════
   ARTICLE FULL CONTENT
   ════════════════════════════════════ */
const ARTICLE_CONTENT = {
    1: `
            <p>Bulan Ramadhan adalah ladang pahala yang luar biasa. Selain kewajiban seperti puasa, sholat tarawih, dan membaca Al-Qur'an, ada banyak amalan sunnah yang justru sering terlewat karena kita tidak mengetahuinya atau terlalu sibuk dengan rutinitas sehari-hari.</p>

            <h2>1. Memperbanyak Sedekah</h2>
            <p>Rasulullah SAW adalah orang yang paling dermawan, dan kedermawanan beliau semakin bertambah di bulan Ramadhan. Sedekah di bulan Ramadhan memiliki pahala yang berlipat ganda dibanding bulan-bulan lainnya.</p>
            <blockquote>
                "Rasulullah SAW adalah orang yang paling dermawan. Dan beliau semakin dermawan di bulan Ramadhan ketika Jibril menemuinya."
                <cite>HR. Bukhari & Muslim</cite>
            </blockquote>

            <h2>2. Menjaga Sholat Tahajud</h2>
            <p>Qiyamul lail atau sholat malam di bulan Ramadhan memiliki keutamaan yang sangat besar. Bahkan Rasulullah menjanjikan ampunan bagi siapa saja yang mendirikannya dengan penuh keimanan dan harapan pahala.</p>

            <h2>3. Memperbanyak Istighfar</h2>
            <p>Sepertiga malam terakhir adalah waktu paling mustajab untuk berdoa dan beristighfar. Manfaatkan waktu ini sebaik-baiknya, terutama antara sahur dan waktu subuh tiba.</p>
            <div class="modal-tip">
                <strong>💡 Tips Praktis</strong>
                Pasang alarm 30 menit sebelum imsak. Gunakan waktu itu untuk tahajud dua rakaat, kemudian istighfar dan doa sebelum sahur.
            </div>

            <h2>4. Membaca Sholawat</h2>
            <p>Memperbanyak sholawat kepada Nabi Muhammad SAW adalah amalan ringan namun berpahala besar. Bisa dilakukan kapan saja — saat berjalan, memasak sahur, atau menunggu waktu berbuka.</p>

            <h2>5. Menjaga Wudhu Sepanjang Hari</h2>
            <p>Salah satu amalan yang sering terlupakan adalah menjaga kesucian wudhu sepanjang hari. Orang yang senantiasa dalam keadaan berwudhu mendapat keistimewaan tersendiri di sisi Allah.</p>

            <h2>6–10. Amalan Lainnya</h2>
            <ol>
                <li><strong>I'tikaf</strong> — Berdiam diri di masjid untuk ibadah, minimal di 10 hari terakhir.</li>
                <li><strong>Tadarus berjamaah</strong> — Membaca Al-Qur'an bersama keluarga setiap malam.</li>
                <li><strong>Memberi makan orang berbuka</strong> — Pahalanya setara pahala orang yang berpuasa.</li>
                <li><strong>Menjaga hubungan silaturahmi</strong> — Ramadhan adalah waktu terbaik mempererat ikatan.</li>
                <li><strong>Mengurangi tidur siang yang berlebihan</strong> — Gunakan waktu siang untuk dzikir dan tadarus.</li>
            </ol>

            <blockquote>
                "Barang siapa yang memberi makan orang yang berpuasa untuk berbuka, maka baginya pahala seperti orang yang berpuasa itu tanpa mengurangi pahalanya sedikit pun."
                <cite>HR. Tirmidzi</cite>
            </blockquote>
            <p>Semoga kita semua bisa mengisi Ramadhan ini dengan amalan yang berkualitas, bukan sekadar kuantitas. Mulailah dari satu amalan sunnah, konsistenkan, kemudian tambah secara bertahap.</p>`,

    2: `
            <p>Puasa Ramadhan adalah salah satu rukun Islam yang wajib ditunaikan oleh setiap muslim yang baligh, berakal, dan mampu. Bagi yang baru pertama kali berpuasa atau ingin meningkatkan kualitas ibadahnya, panduan ini hadir sebagai teman perjalanan spiritual Anda.</p>

            <h2>Niat Puasa Ramadhan</h2>
            <p>Niat adalah syarat sahnya puasa. Niat puasa Ramadhan harus dilakukan setiap malam sebelum fajar tiba — boleh dalam hati, namun lebih afdal dilafazkan dengan lisan.</p>
            <blockquote>
                نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى
                <cite>Nawaitu shauma ghadin 'an adā'i fardhi syahri Ramadhāna hādzihis-sanati lillāhi ta'ālā.</cite>
            </blockquote>

            <h2>Panduan Sahur</h2>
            <p>Sahur adalah sunnah yang sangat dianjurkan. Rasulullah bersabda bahwa pada sahur terdapat keberkahan. Waktu sahur adalah antara tengah malam hingga sebelum waktu imsak.</p>
            <div class="modal-tip">
                <strong>⏰ Waktu Terbaik Sahur</strong>
                Sunnah sahur adalah mendekatkan waktunya dengan imsak. Hindari sahur terlalu awal karena justru mengurangi keberkahan dan membuat lebih cepat lapar.
            </div>

            <h2>Hal yang Membatalkan Puasa</h2>
            <ol>
                <li><strong>Makan dan minum dengan sengaja</strong> — Meskipun hanya setetes.</li>
                <li><strong>Muntah dengan sengaja</strong> — Jika tidak disengaja, puasa tidak batal.</li>
                <li><strong>Hubungan suami istri di siang hari</strong> — Wajib qadha dan kaffarah.</li>
                <li><strong>Keluarnya haid atau nifas</strong> — Wajib qadha setelah Ramadhan.</li>
                <li><strong>Gila atau pingsan sepanjang hari</strong> — Batalkan dan wajib qadha.</li>
            </ol>

            <h2>Adab Berbuka Puasa</h2>
            <p>Berbuka puasa adalah momen yang sangat dinantikan. Sunnah berbuka adalah dengan kurma segar (ruthab), atau kurma kering (tamr), atau air putih jika tidak ada kurma. Bacalah doa berbuka sebelum makan.</p>
            <blockquote>
                ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّه
                <cite>Dzahabad-dzama'u wabtallatil-'uruqu wa tsabatal-ajru insyā'allāh. (HR. Abu Dawud)</cite>
            </blockquote>
            <p>Jangan langsung makan besar saat berbuka. Mulailah dengan yang manis-manis ringan, kemudian sholat Maghrib, baru kemudian makan malam. Ini lebih sehat untuk lambung dan lebih sesuai sunnah.</p>`,

    3: `
            <p>Ramadhan dikenal sebagai bulan dikabulkannya doa. Ada beberapa waktu di bulan Ramadhan yang secara khusus disebutkan sebagai waktu mustajab — saat pintu langit terbuka lebar dan Allah lebih dekat kepada hamba-Nya.</p>

            <h2>Waktu-Waktu Mustajab di Ramadhan</h2>
            <ul>
                <li>Saat sahur (sepertiga malam terakhir)</li>
                <li>Saat berbuka puasa (sebelum makan)</li>
                <li>Di antara adzan dan iqamah</li>
                <li>Saat sujud dalam sholat</li>
                <li>Malam Lailatul Qadar (salah satu dari 10 malam terakhir)</li>
            </ul>

            <h2>Doa Berbuka Puasa</h2>
            <blockquote>
                اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ
                <cite>Allāhumma laka shumtu wa bika āmantu wa 'alā rizqika afthartu. (Ya Allah, untuk-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka.)</cite>
            </blockquote>

            <h2>Doa Sahur & Sepertiga Malam</h2>
            <p>Waktu sahur adalah golden hour untuk berdoa. Para ulama menganjurkan untuk memperbanyak istighfar dan memanjatkan doa-doa hajat di waktu ini, karena Allah turun ke langit dunia dan berfirman: "Siapa yang berdoa kepada-Ku, akan Aku kabulkan."</p>
            <blockquote>
                رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                <cite>Rabbanā ātinā fid-dunyā hasanatan wa fil-ākhirati hasanatan wa qinā 'adzāban-nār. (QS. Al-Baqarah: 201)</cite>
            </blockquote>

            <h2>Doa Malam Lailatul Qadar</h2>
            <p>Ini adalah doa yang diajarkan langsung oleh Rasulullah kepada Aisyah ra. ketika beliau bertanya amalan apa yang paling afdal jika bertemu Lailatul Qadar.</p>
            <blockquote>
                اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
                <cite>Allāhumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'annī. (Ya Allah, sesungguhnya Engkau Maha Pemaaf, mencintai pemaafan, maka maafkanlah aku.) — HR. Tirmidzi</cite>
            </blockquote>
            <div class="modal-tip">
                <strong>📿 Tips Konsistensi</strong>
                Tulis doa-doa favorit di catatan HP kamu. Di momen mustajab, cukup buka catatan dan baca dengan penuh penghayatan. Tidak perlu hafal semua — yang penting khusyuk.
            </div>`,

    4: `
            <p>Di antara 30 malam Ramadhan, ada sepuluh malam terakhir yang memiliki kedudukan paling mulia. Rasulullah SAW secara khusus meningkatkan ibadahnya pada malam-malam ini dan membangunkan keluarganya untuk beribadah bersama.</p>

            <h2>Keistimewaan 10 Hari Terakhir</h2>
            <p>Salah satu malam di antara 10 malam terakhir ini adalah Lailatul Qadar — malam yang lebih baik dari seribu bulan (sekitar 83 tahun). Beribadah dengan ikhlas di malam Lailatul Qadar sama pahalanya dengan beribadah selama 83 tahun lebih.</p>
            <blockquote>
                لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ
                <cite>"Malam Qadar lebih baik dari seribu bulan." (QS. Al-Qadar: 3)</cite>
            </blockquote>

            <h2>Tanda-Tanda Lailatul Qadar</h2>
            <p>Para ulama menyebutkan beberapa tanda malam Lailatul Qadar berdasarkan hadits-hadits shahih:</p>
            <ul>
                <li>Malam yang tenang, tidak terlalu panas dan tidak terlalu dingin</li>
                <li>Langit cerah tanpa bintang yang terlihat mencolok</li>
                <li>Matahari terbit di pagi harinya tanpa sinar yang menyilaukan</li>
                <li>Hati terasa tenang, damai, dan rindu beribadah</li>
            </ul>

            <h2>Amalan di 10 Hari Terakhir</h2>
            <ol>
                <li><strong>I'tikaf di masjid</strong> — Ini adalah sunnah Nabi yang paling utama di 10 hari terakhir.</li>
                <li><strong>Qiyamul lail</strong> — Perbanyak sholat malam, minimal 8 rakaat + witir.</li>
                <li><strong>Membaca doa Lailatul Qadar</strong> — Baca setiap malam tanpa tahu mana yang tepat.</li>
                <li><strong>Tadarus Al-Qur'an lebih banyak</strong> — Targetkan minimal 1 juz per malam.</li>
                <li><strong>Sedekah dan infak</strong> — Siapkan amplop sedekah untuk diserahkan setiap malam.</li>
            </ol>
            <div class="modal-tip">
                <strong>🌙 Strategi Praktis</strong>
                Jika tidak bisa i'tikaf penuh, cobalah i'tikaf parsial: datang ke masjid setelah Isya dan tarawih, lanjut tahajud berjamaah, kemudian pulang saat subuh. Ulangi setiap malam ganjil (21, 23, 25, 27, 29 Ramadhan).
            </div>`,

    5: `
            <p>Zakat adalah rukun Islam keempat yang wajib ditunaikan oleh setiap muslim yang mampu. Di bulan Ramadhan, kewajiban ini menjadi lebih terasa karena semangat berbagi yang mengalir deras di hati setiap orang yang berpuasa.</p>

            <h2>Jenis-Jenis Zakat</h2>
            <h3>1. Zakat Fitrah</h3>
            <p>Zakat fitrah wajib dikeluarkan oleh setiap muslim, termasuk bayi yang baru lahir sebelum sholat Idul Fitri. Besarannya adalah 1 sha' (sekitar 2,5–3,5 kg) makanan pokok, atau senilai harganya dalam rupiah.</p>
            <blockquote>
                Contoh: Jika harga beras Rp 15.000/kg, maka zakat fitrah per jiwa = 2,5 kg × Rp 15.000 = Rp 37.500.
                <cite>Disesuaikan dengan harga beras di daerah masing-masing.</cite>
            </blockquote>

            <h3>2. Zakat Maal (Harta)</h3>
            <p>Zakat maal wajib dikeluarkan jika harta mencapai nisab (setara 85 gram emas) dan telah melewati haul (satu tahun hijriah). Besaran zakatnya adalah 2,5% dari total harta.</p>
            <div class="modal-tip">
                <strong>🧮 Cara Hitung Zakat Maal</strong>
                Total harta (tabungan + emas + investasi) − hutang jangka pendek = harta bersih. Jika harta bersih ≥ nisab dan sudah setahun, keluarkan 2,5%.
            </div>

            <h3>3. Zakat Penghasilan</h3>
            <p>Zakat profesi dikeluarkan dari penghasilan bersih setiap bulan jika mencapai nisab. Nisabnya adalah setara 520 kg beras atau sekitar 85 gram emas per tahun. Besarannya 2,5%.</p>

            <h2>Kepada Siapa Zakat Diberikan?</h2>
            <p>Al-Qur'an menyebut 8 golongan (asnaf) yang berhak menerima zakat: fakir, miskin, amil, muallaf, riqab (memerdekakan budak), gharim (terlilit hutang), fi sabilillah, dan ibnu sabil (musafir yang kehabisan bekal).</p>
            <blockquote>
                "Sesungguhnya zakat-zakat itu hanyalah untuk orang-orang fakir, orang miskin, pengurus-pengurus zakat, para muallaf..."
                <cite>QS. At-Taubah: 60</cite>
            </blockquote>`,

    6: `
            <p>Setiap tahun umat Islam di seluruh dunia menyambut Ramadhan dengan penuh suka cita dan kerinduan. Tapi pernahkah Anda bertanya — mengapa bulan ini begitu istimewa? Apa yang membedakan Ramadhan dari bulan-bulan lainnya dalam perspektif Al-Qur'an dan Hadits?</p>

            <h2>Ramadhan dalam Al-Qur'an</h2>
            <p>Ramadhan adalah satu-satunya bulan yang disebutkan namanya secara eksplisit di dalam Al-Qur'an. Allah SWT berfirman dalam Surah Al-Baqarah ayat 185 yang menjelaskan bahwa Al-Qur'an diturunkan di bulan Ramadhan sebagai petunjuk bagi manusia.</p>
            <blockquote>
                شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ
                <cite>"Bulan Ramadhan adalah bulan yang di dalamnya diturunkan Al-Qur'an sebagai petunjuk bagi manusia." (QS. Al-Baqarah: 185)</cite>
            </blockquote>

            <h2>Pintu Surga Dibuka, Neraka Ditutup</h2>
            <p>Salah satu keistimewaan Ramadhan yang paling masyhur adalah hadits tentang dibukanya pintu-pintu surga dan ditutupnya pintu-pintu neraka, serta dibelenggunya setan-setan.</p>
            <blockquote>
                "Apabila datang bulan Ramadhan, pintu-pintu surga dibuka, pintu-pintu neraka ditutup, dan setan-setan dibelenggu."
                <cite>HR. Bukhari & Muslim</cite>
            </blockquote>

            <h2>Bulan Pengampunan</h2>
            <p>Ramadhan adalah bulan di mana Allah menurunkan rahmat dan ampunan-Nya secara berlimpah. Rasulullah SAW menyebutkan bahwa siapa yang berpuasa dengan iman dan harapan pahala, maka diampuni dosa-dosanya yang telah lalu.</p>

            <h2>Mengapa Kita Harus Bersyukur?</h2>
            <ul>
                <li>Masih diberi umur untuk bertemu Ramadhan</li>
                <li>Masih memiliki kesehatan untuk berpuasa</li>
                <li>Masih ada keluarga yang bisa sahur dan buka bersama</li>
                <li>Masih bisa mendengar adzan dan pergi ke masjid</li>
            </ul>
            <div class="modal-tip">
                <strong>🌟 Refleksi</strong>
                Jadikan setiap hari Ramadhan sebagai hari yang tidak ingin kamu sia-siakan. Bayangkan jika ini adalah Ramadhan terakhirmu — apa yang akan kamu ubah?
            </div>`,

    7: `
            <p>Banyak karyawan dan pengusaha khawatir bahwa Ramadhan akan menurunkan produktivitas kerja mereka. Kenyataannya, dengan manajemen waktu yang tepat, Ramadhan justru bisa menjadi bulan paling produktif dalam setahun — baik secara duniawi maupun ukhrawi.</p>

            <h2>Mengubah Mindset tentang Ramadhan</h2>
            <p>Langkah pertama adalah mengubah cara pandang. Ramadhan bukan beban — ini adalah privilege. Lebih dari 1,8 miliar Muslim di dunia mengalami transformasi spiritual yang mendalam di bulan ini. Jadikan itu motivasi, bukan alasan untuk melambat.</p>

            <h2>Manajemen Waktu Ramadhan</h2>
            <h3>Pagi Hari (Subuh–Dzuhur)</h3>
            <p>Ini adalah waktu paling produktif. Otak segar setelah sahur, udara masih sejuk, dan gangguan minimal. Gunakan untuk pekerjaan yang membutuhkan konsentrasi tinggi atau deep work.</p>

            <h3>Siang Hari (Dzuhur–Ashar)</h3>
            <p>Energi mulai turun. Ideal untuk tugas-tugas rutin, rapat, atau pekerjaan administratif. Hindari keputusan besar di jam ini. Jika memungkinkan, istirahat pendek 15–20 menit setelah Dzuhur.</p>

            <h3>Sore Hari (Ashar–Maghrib)</h3>
            <p>Waktu menjelang buka puasa. Ideal untuk mempersiapkan berbuka, membaca, atau pekerjaan kreatif ringan. Jangan lupa sisakan waktu untuk doa — ini waktu mustajab.</p>
            <blockquote>
                "Ada tiga orang yang doanya tidak ditolak: orang yang berpuasa hingga berbuka, pemimpin yang adil, dan doa orang yang terzalimi."
                <cite>HR. Tirmidzi</cite>
            </blockquote>

            <h2>Tips Menjaga Energi</h2>
            <ol>
                <li><strong>Sahur dengan gizi seimbang</strong> — Protein, karbohidrat kompleks, dan serat.</li>
                <li><strong>Hindari begadang</strong> — Tidur setelah tarawih, bangun untuk tahajud dan sahur.</li>
                <li><strong>Kurangi kafein</strong> — Kopi saat sahur boleh, tapi jangan berlebihan.</li>
                <li><strong>Niat yang kuat</strong> — Produktif sebagai ibadah, bukan sekadar kewajiban.</li>
            </ol>
            <div class="modal-tip">
                <strong>⚡ Formula Produktif Ramadhan</strong>
                Subuh + Tadarus (30 menit) → Deep Work (3–4 jam) → Dzuhur + Istirahat → Pekerjaan Rutin → Ashar → Persiapan Buka → Maghrib + Makan → Isya + Tarawih → Tidur. Total ibadah + kerja = hari yang sempurna.
            </div>`,

    8: `
            <p>Zikir pagi dan petang adalah amalan yang sangat dianjurkan setiap hari, dan pahalanya berlipat ganda di bulan Ramadhan. Para ulama menyebut amalan ini sebagai "penjaga hati" yang menjaga seseorang tetap terhubung dengan Allah sepanjang hari.</p>

            <h2>Waktu Membaca Zikir</h2>
            <p>Zikir pagi (Adzkar al-Sabah) dibaca setelah sholat Subuh hingga sebelum matahari terbit penuh. Zikir petang (Adzkar al-Masa') dibaca setelah sholat Ashar hingga sebelum Maghrib. Di bulan Ramadhan, ini juga bisa dibaca saat menunggu waktu sahur atau menjelang buka.</p>

            <h2>Zikir Wajib: Tasbih, Tahmid, Takbir</h2>
            <blockquote>
                سُبْحَانَ اللهِ (33×) — الْحَمْدُ لِلَّهِ (33×) — اللهُ أَكْبَرُ (33×)
                <cite>Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x) — Dibaca setelah setiap sholat fardhu.</cite>
            </blockquote>

            <h2>Sayyidul Istighfar</h2>
            <blockquote>
                اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...
                <cite>Allāhumma anta rabbī, lā ilāha illā anta, khalaqtanī wa anā 'abduka... — "Penghulu istighfar" yang jika dibaca pagi hari dengan keyakinan, maka jika meninggal hari itu ia masuk surga. (HR. Bukhari)</cite>
            </blockquote>

            <h2>Ayat Kursi — Perlindungan Sepanjang Hari</h2>
            <p>Membaca Ayat Kursi setelah setiap sholat fardhu adalah amalan yang sangat dianjurkan. Rasulullah bersabda, siapa yang membacanya setelah setiap sholat, tidak ada yang menghalanginya masuk surga kecuali kematian.</p>

            <h2>Manfaat Rutin Zikir Harian</h2>
            <ul>
                <li>Hati menjadi tenang dan damai</li>
                <li>Terhindar dari was-was dan gangguan setan</li>
                <li>Mendapat perlindungan Allah sepanjang hari</li>
                <li>Pahala yang terus mengalir meski sedang sibuk bekerja</li>
            </ul>
            <div class="modal-tip">
                <strong>📿 Cara Konsisten Zikir</strong>
                Simpan buku zikir kecil atau aplikasi zikir di HP. Bacalah segera setelah sholat sebelum melakukan hal lain. Konsistensi 10 menit setiap hari jauh lebih baik dari 1 jam sekali seminggu.
            </div>`,

    9: `
            <p>I'tikaf adalah salah satu ibadah yang paling dicintai Rasulullah SAW di bulan Ramadhan, khususnya di 10 hari terakhir. Meskipun terlihat "ekstrem" bagi sebagian orang, i'tikaf sebenarnya bisa dilakukan siapa saja dengan persiapan yang tepat.</p>

            <h2>Pengertian I'tikaf</h2>
            <p>Secara bahasa, i'tikaf berarti menetap atau berdiam. Secara syariat, i'tikaf adalah berdiam diri di masjid dengan niat mendekatkan diri kepada Allah SWT. I'tikaf hukumnya sunnah muakkad, terutama di 10 malam terakhir Ramadhan.</p>

            <h2>Syarat Sah I'tikaf</h2>
            <ol>
                <li><strong>Muslim</strong> — I'tikaf hanya sah bagi seorang muslim.</li>
                <li><strong>Berakal</strong> — Tidak sah jika dilakukan oleh orang gila.</li>
                <li><strong>Bersih dari hadats besar</strong> — Junub, haid, dan nifas membatalkan i'tikaf.</li>
                <li><strong>Di masjid</strong> — Minimal masjid yang digunakan untuk sholat berjamaah.</li>
                <li><strong>Niat</strong> — Diniatkan sebagai i'tikaf untuk mendekatkan diri kepada Allah.</li>
            </ol>
            <blockquote>
                "Rasulullah SAW beri'tikaf pada 10 hari terakhir Ramadhan hingga beliau wafat. Kemudian para istri beliau pun beri'tikaf setelah itu."
                <cite>HR. Bukhari & Muslim</cite>
            </blockquote>

            <h2>Hal yang Membatalkan I'tikaf</h2>
            <ul>
                <li>Keluar masjid tanpa keperluan syar'i atau darurat</li>
                <li>Hubungan suami istri</li>
                <li>Haid atau nifas bagi wanita</li>
                <li>Murtad (naudzubillah)</li>
            </ul>

            <h2>Tips I'tikaf untuk Pemula</h2>
            <div class="modal-tip">
                <strong>🕌 Mulai dari yang Kecil</strong>
                Tidak harus full 10 hari. Cobalah i'tikaf satu malam terlebih dahulu — dari Isya hingga Subuh. Bawa Al-Qur'an, sajadah nyaman, air minum, dan snack ringan untuk sahur. Fokus pada dzikir, tadarus, dan doa.
            </div>`,

    10: `
            <p>Sedekah di bulan Ramadhan memiliki keutamaan yang berlipat ganda. Rasulullah SAW — yang dikenal sebagai orang paling dermawan — menjadi semakin dermawan ketika Ramadhan tiba, seperti angin yang bertiup kencang menyebarkan kebaikan ke mana-mana.</p>

            <h2>Keutamaan Sedekah di Ramadhan</h2>
            <blockquote>
                "Sebaik-baik sedekah adalah sedekah di bulan Ramadhan."
                <cite>HR. Tirmidzi</cite>
            </blockquote>
            <p>Para ulama menjelaskan bahwa pahala sedekah di Ramadhan berlipat ganda karena dua alasan utama: pertama, keberkahan waktu (Ramadhan adalah bulan mulia), dan kedua, kondisi hati yang lebih ikhlas karena sedang berpuasa.</p>

            <h2>Bentuk-Bentuk Sedekah Terbaik</h2>
            <ol>
                <li><strong>Memberi makan orang berbuka</strong> — Pahalanya setara pahala orang yang berpuasa.</li>
                <li><strong>Sedekah kepada keluarga</strong> — Sedekah kepada keluarga yang membutuhkan lebih utama.</li>
                <li><strong>Infak di jalan ilmu</strong> — Mendukung pesantren, masjid, atau program belajar agama.</li>
                <li><strong>Sedekah jariyah</strong> — Wakaf yang pahalanya terus mengalir setelah meninggal.</li>
            </ol>

            <h2>Sedekah yang Sering Terlupakan</h2>
            <ul>
                <li>Senyum kepada sesama</li>
                <li>Membantu tetangga menyiapkan sahur/buka</li>
                <li>Mendoakan kebaikan untuk orang lain</li>
                <li>Berbagi ilmu dan nasihat yang bermanfaat</li>
            </ul>
            <blockquote>
                "Setiap kebaikan adalah sedekah."
                <cite>HR. Bukhari</cite>
            </blockquote>
            <div class="modal-tip">
                <strong>💚 Tantangan 30 Hari</strong>
                Siapkan amplop atau celengan khusus Ramadhan. Setiap hari masukkan nominal yang kamu mampu — mulai dari Rp 5.000. Di akhir Ramadhan, sedekahkan semuanya. Konsistensi kecil mengalahkan nominal besar yang tidak rutin.
            </div>`,

    11: `
            <p>Puasa bukan hanya tentang menahan lapar dan dahaga dari fajar hingga maghrib. Rasulullah SAW mengingatkan bahwa ada puasa yang lebih dalam — yaitu puasa seluruh anggota tubuh, terutama lisan. Banyak orang yang berpuasa namun pahalanya terkikis karena tidak menjaga lisannya.</p>

            <h2>Hadits Peringatan Keras</h2>
            <blockquote>
                "Barang siapa tidak meninggalkan perkataan dusta dan perbuatan buruk, maka Allah tidak butuh dengan puasanya dari makan dan minum."
                <cite>HR. Bukhari</cite>
            </blockquote>

            <h2>Larangan yang Harus Dihindari</h2>
            <h3>1. Berbohong</h3>
            <p>Dusta dalam bentuk apapun — termasuk bohong "putih" — mengurangi pahala puasa. Di era media sosial, ini mencakup menyebarkan berita yang belum diverifikasi.</p>

            <h3>2. Ghibah (Membicarakan Keburukan Orang Lain)</h3>
            <p>Para ulama menyebut ghibah sebagai "pembatal" pahala puasa meskipun tidak membatalkan puasa secara hukum. Hindari gosip, baik lisan maupun di grup WhatsApp.</p>

            <h3>3. Namimah (Mengadu Domba)</h3>
            <p>Menyampaikan ucapan seseorang kepada orang lain dengan tujuan merusak hubungan adalah dosa besar yang sangat dilarang, terlebih di bulan suci.</p>

            <h3>4. Berkata Kasar dan Marah-marah</h3>
            <blockquote>
                "Puasa adalah perisai. Maka jika seseorang sedang berpuasa, janganlah berkata kotor dan janganlah bertindak bodoh."
                <cite>HR. Bukhari & Muslim</cite>
            </blockquote>

            <h2>Cara Menjaga Lisan</h2>
            <ol>
                <li>Setiap kali ingin berkata negatif, ganti dengan tasbih atau istighfar.</li>
                <li>Kurangi waktu di media sosial yang memancing emosi.</li>
                <li>Perbanyak bacaan Al-Qur'an — mulut yang sibuk membaca tidak sempat berkata sia-sia.</li>
                <li>Praktikkan diam (shamtu) sebagai ibadah — diam lebih baik dari kata-kata yang tidak bermanfaat.</li>
            </ol>
            <div class="modal-tip">
                <strong>🤐 Tantangan 1 Hari</strong>
                Coba satu hari penuh hanya berkata hal yang benar-benar penting dan bermanfaat. Catat berapa kali kamu hampir berkata sia-sia. Ini akan membuka mata tentang betapa seringnya lisan kita tidak terjaga.
            </div>`,

    12: `
            <p>Ramadhan disebut syahrul Quran — bulan Al-Qur'an. Bukan tanpa alasan: Al-Qur'an pertama kali diturunkan di bulan ini, dan Rasulullah SAW secara khusus muraja'ah (mengulang) Al-Qur'an bersama Jibril setiap Ramadhan.</p>

            <h2>Mengapa Khatam Al-Qur'an di Ramadhan?</h2>
            <p>Para sahabat dan ulama salaf menjadikan khatam Al-Qur'an sebagai target minimal mereka setiap Ramadhan. Imam Syafi'i bahkan dikisahkan khatam Al-Qur'an sebanyak 60 kali dalam satu bulan Ramadhan.</p>
            <blockquote>
                "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya."
                <cite>HR. Bukhari</cite>
            </blockquote>

            <h2>Strategi Khatam 1x dalam 30 Hari</h2>
            <p>Al-Qur'an terdiri dari 30 juz. Jika kamu menargetkan khatam sekali, cukup baca 1 juz per hari. 1 juz = sekitar 20 halaman = 4–5 lembar (8–10 halaman bolak-balik).</p>
            <div class="modal-tip">
                <strong>📖 Rumus 1 Juz Per Hari</strong>
                Setelah Subuh 4–5 halaman → Setelah Dzuhur 4–5 halaman → Setelah Ashar 4–5 halaman → Setelah Tarawih 4–5 halaman = 1 juz selesai tanpa terasa berat.
            </div>

            <h2>Strategi Khatam 2x atau Lebih</h2>
            <ol>
                <li><strong>2x khatam</strong> — 2 juz per hari, tambahkan sesi tadarus setelah Maghrib.</li>
                <li><strong>3x khatam</strong> — 3 juz per hari, butuh sekitar 1,5–2 jam total membaca per hari.</li>
                <li><strong>Metode Imam</strong> — Gabungkan tadarus dengan mendengarkan murattal saat memasak atau berkendara.</li>
            </ol>

            <h2>Tips agar Konsisten</h2>
            <ul>
                <li>Tandai progress harian di mushaf atau aplikasi</li>
                <li>Ajak pasangan atau anak untuk tadarus bersama</li>
                <li>Jangan skip — jika terlewat, kejar di hari berikutnya</li>
                <li>Pahami terjemahan minimal 1 ayat per hari sebagai bonus</li>
            </ul>
            <blockquote>
                "Bacalah Al-Qur'an, karena sesungguhnya ia akan datang pada hari kiamat sebagai pemberi syafa'at bagi para pembacanya."
                <cite>HR. Muslim</cite>
            </blockquote>`,
};

/* ════════════════════════════════════
   MODAL — OPEN / CLOSE
   ════════════════════════════════════ */
let modalOpen = false;

function openArticle(id) {
    const article = ARTICLES.find(a => a.id === id);
    if (!article) return;

    const content = ARTICLE_CONTENT[id] || '<p>Konten artikel sedang disiapkan.</p>';

    // Populate header
    document.getElementById('modalCategory').textContent = article.categoryLabel;
    document.getElementById('modalReadTime').textContent = '⏱ ' + article.readTime + ' baca';

    // Populate hero
    document.getElementById('modalEmoji').textContent = article.emoji;
    document.getElementById('modalTitle').textContent = article.title;
    document.getElementById('modalAuthorAvatar').textContent = article.authorEmoji;
    document.getElementById('modalAuthorName').textContent = article.author;
    document.getElementById('modalDate').textContent = article.date;

    // Populate content
    document.getElementById('modalContent').innerHTML = content;

    // Related articles — same category, exclude current
    const related = ARTICLES
        .filter(a => a.category === article.category && a.id !== id)
        .slice(0, 3);
    document.getElementById('modalRelated').innerHTML = related.length
        ? related.map(r => `
                <a class="modal-related-item" onclick="openArticle(${r.id});return false" href="#">
                    <span class="modal-related-emoji">${r.emoji}</span>
                    <span class="modal-related-title">${r.title}</span>
                </a>`).join('')
        : '<div style="font-size:12px;color:var(--text-light)">Belum ada artikel terkait.</div>';

    // Reset scroll & progress
    const bodyEl = document.getElementById('modalBodyEl');
    bodyEl.scrollTop = 0;
    document.getElementById('modalProgress').style.width = '0%';

    // Open
    document.getElementById('modalOverlay').classList.add('open');
    const modal = document.getElementById('articleModal');
    modal.classList.remove('closing');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalOpen = true;
}

function closeModal() {
    if (!modalOpen) return;
    const modal = document.getElementById('articleModal');
    modal.classList.add('closing');
    modal.classList.remove('open');
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    modalOpen = false;
}

// ESC key to close
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOpen) closeModal();
});

// Reading progress bar
document.getElementById('modalBodyEl').addEventListener('scroll', function () {
    const el = this;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
    document.getElementById('modalProgress').style.width = pct + '%';
}, { passive: true });
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('totalCount').textContent = ARTICLES.length + ' Artikel';
    renderFeed();
    renderPopular();
    renderTags();
});