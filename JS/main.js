// سیستم تغییر پنل (SPA)
window.showPanel = function(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
    }

    // باگ فیکس: اگر روی دکمه پورتفولیو در منو کلیک شد، همیشه All را نشان بده
    if (id === 'portfolio') {
        window.filterPortfolio('all');
    }

    const heroTitle = document.getElementById('heroTitle');
    const heroVideo = document.getElementById('heroVideo');

    if (id === 'home' || !id) {
        if(heroTitle) heroTitle.innerText = "MOHOMOZO";
        if(heroVideo) heroVideo.style.filter = "blur(0px) brightness(1)";
    } else {
        if(heroTitle) heroTitle.innerText = id.toUpperCase();
        if(heroVideo) heroVideo.style.filter = "blur(20px) brightness(0.4)";
    }

    window.location.hash = id;
    window.renderPortfolioContent();
};

// رندر کردن کارت‌های پورتفولیو
window.renderPortfolioContent = function(filter = 'all') {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const wipGrid = document.getElementById('wip-grid');

    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';
        const filtered = (filter === 'all') 
            ? myProjects.filter(p => p.category !== 'work') 
            : myProjects.filter(p => p.category === filter);

        filtered.forEach(project => {
            portfolioGrid.appendChild(createCard(project));
        });
    }

    if (wipGrid) {
        wipGrid.innerHTML = '';
        myProjects.filter(p => p.category === 'work').forEach(project => {
            wipGrid.appendChild(createCard(project));
        });
    }
};

// تابع کمکی ساخت کارت (بدون کدری و با افکت هاور)
function createCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="card-overlay"><span>${project.title}</span></div>
    `;
    card.onclick = () => window.openLightbox(project);
    return card;
}

// فیلتر کردن دسته‌بندی‌ها
window.filterPortfolio = function(category) {
    window.renderPortfolioContent(category);
    document.querySelectorAll('.portfolio-menu button').forEach(btn => {
        // فعال کردن استایل دکمه کلیک شده
        const btnText = btn.innerText.toLowerCase();
        btn.classList.toggle('active', btnText === category);
    });
};

// مدیریت لایت‌باکس (معلق، شفاف و اسکرولی)
window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media-container');
    
    if(!lightbox || !mediaContainer) return;

    mediaContainer.innerHTML = '';

    // ۱. اضافه کردن ویدیو اصلی (اگر وجود داشت)
    if (project.videoUrl) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'floating-media';
        videoWrapper.innerHTML = `
            <div style="padding:56.25% 0 0 0;position:relative;">
                <iframe src="${project.videoUrl}?autoplay=1&title=0&byline=0&portrait=0" 
                style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>`;
        mediaContainer.appendChild(videoWrapper);
    } 
    // در غیر این صورت عکس اصلی را نشان بده
    else {
        const mainImg = document.createElement('img');
        mainImg.src = project.image;
        mainImg.className = 'floating-media';
        mediaContainer.appendChild(mainImg);
    }

    // ۲. اضافه کردن گالری تصاویر (زیر ویدیو یا عکس اصلی ردیف می‌شوند)
    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(imgUrl => {
            const extraImg = document.createElement('img');
            extraImg.src = imgUrl;
            extraImg.className = 'floating-media';
            mediaContainer.appendChild(extraImg);
        });
    }

    // ۳. درج اطلاعات متنی
    document.getElementById('info-title').innerText = project.title;
    document.getElementById('info-dims').innerText = project.dimensions || '-';
    document.getElementById('info-material').innerText = project.material || '-';
    document.getElementById('info-concept').innerText = project.concept || '';

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه زیرین
    lightbox.scrollTop = 0; // شروع اسکرول لایت‌باکس از بالا
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.style.display = 'none';
        document.getElementById('lightbox-media-container').innerHTML = '';
        document.body.style.overflow = 'auto'; // برگرداندن اسکرول صفحه
    }
};

// تنظیمات لود اولیه
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    window.showPanel(hash || 'home');
});

// بستن با دکمه Esc
document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeLightbox(); });
