// تابع رندر کردن کارت‌های پورتفولیو
function renderPortfolioContent() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    if (!window.myProjects) {
        console.error("Data.js is not loaded properly!");
        return;
    }

    grid.innerHTML = '';
    window.myProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400'">
            <div class="card-overlay"><span>${project.title}</span></div>
        `;
        card.onclick = () => window.openLightbox(project);
        grid.appendChild(card);
    });
}

// تابع تغییر پنل‌ها
window.showPanel = function(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        if (id === 'portfolio' || id === 'home') renderPortfolioContent();
    }

    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.style.filter = (id === 'home' || !id) ? "blur(0px)" : "blur(20px) brightness(0.4)";
    }
    window.location.hash = id;
};

// تابع لایت‌باکس با پشتیبانی از استیتمنت کامل
window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    if (!lightbox || !container) return;

    container.innerHTML = '';

    // ۱. ویدیو
    if (project.videoUrl) {
        container.innerHTML += `
            <div class="floating-media" style="padding:56.25% 0 0 0;position:relative; margin-bottom:30px;">
                <iframe src="${project.videoUrl}?autoplay=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
            </div>`;
    }

    // ۲. استیتمنت کامل (با فرمت HTML)
    container.innerHTML += `
        <div class="lightbox-info" style="margin-bottom:50px;">
            <h2 style="color:var(--accent); font-family:'Syncopate';">${project.title}</h2>
            <div style="color:rgba(255,255,255,0.8); line-height:1.8; font-size:1.1rem; text-align:justify;">
                ${project.concept}
            </div>
        </div>
    `;

    // ۳. گالری تصاویر
    if (project.gallery) {
        project.gallery.forEach((imgUrl, index) => {
            container.innerHTML += `<img src="${imgUrl}" class="floating-media" style="margin-top:20px;">`;
            if (index === 0 && project.detailsInfo) {
                container.innerHTML += `<p style="text-align:center; opacity:0.6; margin-bottom:60px; color:#fff; font-size:0.9rem;">${project.detailsInfo}</p>`;
            }
        });
    }

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
};

// اجرای اولیه بعد از لود شدن کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    window.showPanel(hash || 'home');
});
