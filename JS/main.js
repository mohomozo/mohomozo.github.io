// ۱. سیستم ناوبری SPA
function showPanel(id) {
    const panels = document.querySelectorAll('.panel');
    if (panels.length === 0) return; // جلوگیری از خطا اگر پنلی یافت نشد

    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
    } else {
        // اگر پنل پیدا نشد (مثلاً رفرش روی آدرس اشتباه)، برو به هوم
        document.getElementById('home').classList.add('active');
    }

    // آپدیت هیرو
    const heroTitle = document.getElementById('heroTitle');
    const heroVideo = document.getElementById('heroVideo');

    if (id === 'home' || !id) {
        if(heroTitle) heroTitle.innerText = "MOHOMOZO";
        if(heroVideo) heroVideo.style.filter = "blur(0px) brightness(1)";
    } else {
        if(heroTitle) heroTitle.innerText = id.toUpperCase();
        if(heroVideo) heroVideo.style.filter = "blur(20px) brightness(0.4)";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
    
    // اجرای رندر فقط اگر دیتایی وجود داشت
    if (typeof myProjects !== 'undefined') {
        renderPortfolioContent();
    }
}

// ۲. رندر محتوا (با چک کردن وجود المان‌ها)
function renderPortfolioContent(filter = 'all') {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';
        const filtered = filter === 'all' 
            ? myProjects.filter(p => p.category !== 'work') 
            : myProjects.filter(p => p.category === filter);

        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `<img src="${project.image}"><div class="card-overlay"><span>${project.title}</span></div>`;
            card.onclick = (e) => {
                e.stopPropagation();
                openLightbox(project);
            };
            portfolioGrid.appendChild(card);
        });
    }

    const wipGrid = document.getElementById('wip-grid');
    if (wipGrid) {
        wipGrid.innerHTML = '';
        myProjects.filter(p => p.category === 'work').forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `<img src="${project.image}"><div class="card-overlay"><span>${project.title}</span></div>`;
            card.onclick = (e) => {
                e.stopPropagation();
                openLightbox(project);
            };
            wipGrid.appendChild(card);
        });
    }
}

// تابع فیلتر
function filterPortfolio(category) {
    renderPortfolioContent(category);
    document.querySelectorAll('.portfolio-menu button').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === category);
    });
}

// مدیریت لایت‌باکس
function openLightbox(project) {
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media-container');
    if(!lightbox || !mediaContainer) return;

    mediaContainer.innerHTML = '';
    if (project.videoUrl) {
        mediaContainer.innerHTML = `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="${project.videoUrl}?autoplay=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>`;
    } else {
        mediaContainer.innerHTML = `<img src="${project.image}">`;
    }

    document.getElementById('info-title').innerText = project.title;
    document.getElementById('info-dims').innerText = project.dimensions || '-';
    document.getElementById('info-material').innerText = project.material || '-';
    document.getElementById('info-concept').innerText = project.concept || '';

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.style.display = 'none';
        document.getElementById('lightbox-media-container').innerHTML = '';
        document.body.style.overflow = 'auto';
    }
}

// اجرای اولیه
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    showPanel(hash || 'home');
});

document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeLightbox(); });
