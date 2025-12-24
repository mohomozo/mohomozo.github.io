// تابع لود کردن کارت‌ها
function renderPortfolioContent() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !window.myProjects) return;

    grid.innerHTML = '';
    window.myProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="card-overlay"><span>${project.title}</span></div>
        `;
        card.onclick = () => window.openLightbox(project);
        grid.appendChild(card);
    });
}

// تابع تغییر پنل
window.showPanel = function(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        if (id === 'portfolio' || id === 'home') {
            renderPortfolioContent();
        }
    }

    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.style.filter = (id === 'home' || !id) ? "blur(0px)" : "blur(20px) brightness(0.4)";
    }
    window.location.hash = id;
};

// تابع لایت‌باکس
window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    if (!lightbox || !container) return;

    container.innerHTML = '';

    if (project.videoUrl) {
        container.innerHTML += `
            <div class="floating-media" style="padding:56.25% 0 0 0;position:relative;">
                <iframe src="${project.videoUrl}?autoplay=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
            </div>`;
    }

    container.innerHTML += `<div class="lightbox-info"><h3>${project.title}</h3><p>${project.concept}</p></div>`;

    if (project.gallery) {
        project.gallery.forEach((imgUrl, index) => {
            container.innerHTML += `<img src="${imgUrl}" class="floating-media" onerror="this.style.display='none'">`;
            if (index === 0 && project.detailsInfo) {
                container.innerHTML += `<p style="text-align:center; opacity:0.6; margin-bottom:40px; color:#fff;">${project.detailsInfo}</p>`;
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

// اجرای اولیه
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolioContent();
    const hash = window.location.hash.replace('#', '');
    window.showPanel(hash || 'home');
});
