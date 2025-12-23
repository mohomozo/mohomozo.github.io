/**
 * Mohomozo Portfolio Engine 2024
 * Includes: SPA Routing, Dynamic Portfolio, Lightbox with Video Support
 */

// ۱. مدیریت تغییر پنل‌ها (SPA)
function showPanel(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
    }

    const heroTitle = document.getElementById('heroTitle');
    const heroVideo = document.getElementById('heroVideo');

    // افکت‌های بصری بخش هیرو (ویدیوی پس‌زمینه)
    if (id === 'home' || id === '') {
        heroTitle.innerText = "MOHOMOZO";
        heroVideo.style.filter = "blur(0px) brightness(1)";
    } else {
        // تبدیل اسم پنل به حروف بزرگ برای عنوان
        heroTitle.innerText = id.toUpperCase().replace('-', ' ');
        heroVideo.style.filter = "blur(15px) brightness(0.4)";
    }

    // اسکرول نرم به بالای صفحه و بروزرسانی آدرس (Hash)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
    
    // رندر مجدد محتوا اگر وارد پورتفولیو یا WIP شویم
    renderPortfolioContent();
}

// ۲. ساخت کارت‌های پروژه به صورت داینامیک
function createCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="card-overlay">
            <span>${project.title}</span>
        </div>
    `;
    card.onclick = () => openLightbox(project);
    return card;
}

// ۳. رندر کردن محتوای پورتفولیو و WIP
function renderPortfolioContent(filter = 'all') {
    // رندر گرید اصلی پورتفولیو
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';
        const filtered = filter === 'all' 
            ? myProjects.filter(p => p.category !== 'work') 
            : myProjects.filter(p => p.category === filter);

        filtered.forEach((project, index) => {
            const card = createCard(project);
            // انیمیشن ورود با تاخیر (Stagger)
            card.style.animationDelay = `${index * 0.1}s`;
            portfolioGrid.appendChild(card);
        });
    }

    // رندر بخش WIP (Ongoing Projects)
    const wipGrid = document.querySelector('#work .grid');
    if (wipGrid) {
        wipGrid.innerHTML = '';
        const wipProjects = myProjects.filter(p => p.category === 'work');
        wipProjects.forEach(project => {
            wipGrid.appendChild(createCard(project));
        });
    }
}

// ۴. فیلتر کردن دسته‌بندی‌ها
function filterPortfolio(category) {
    renderPortfolioContent(category);
    // استایل دکمه فعال (اختیاری)
    const buttons = document.querySelectorAll('.portfolio-menu button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === category) btn.classList.add('active');
    });
}

// ۵. مدیریت Lightbox (بزرگ‌نمایی و نمایش اطلاعات)
function openLightbox(project) {
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media-container');
    
    // پاکسازی محتوای قبلی
    mediaContainer.innerHTML = '';

    // چک کردن نوع محتوا (ویدیو یا عکس)
    if (project.videoUrl && project.videoUrl.includes('vimeo')) {
        mediaContainer.innerHTML = `
            <div style="padding:56.25% 0 0 0;position:relative;width:100%;">
                <iframe src="${project.videoUrl}?h=0&autoplay=1&title=0&byline=0&portrait=0" 
                        style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                        frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
                </iframe>
            </div>`;
    } else {
        mediaContainer.innerHTML = `<img src="${project.image}" style="max-width:100%; height:auto;">`;
    }

    // پر کردن اطلاعات متنی
    document.getElementById('info-title').innerText = project.title;
    document.getElementById('info-dims').innerText = project.dimensions || 'N/A';
    document.getElementById('info-material').innerText = project.material || 'N/A';
    document.getElementById('info-concept').innerText = project.concept || '';

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه زیر لایت‌باکس
}

function closeLightbox(event) {
    // فقط اگر روی پس‌زمینه سیاه یا دکمه ضربدر کلیک شد ببند
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.getElementById('lightbox-media-container').innerHTML = ''; // توقف پخش ویدیو
    document.body.style.overflow = 'auto';
}

// ۶. تنظیمات هنگام لود اولیه صفحه
window.addEventListener('DOMContentLoaded', () => {
    // بررسی Hash در آدرس بار (برای رفرش شدن صفحه)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        showPanel(hash);
    } else {
        renderPortfolioContent(); // لود پیش‌فرض
    }
});

// بستن لایت‌باکس با دکمه Esc
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});
