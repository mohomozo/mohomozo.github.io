// فیلتر فعلی
window.currentFilter = 'all';

// رندر پورتفولیو
function renderPortfolioContent() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !window.myProjects) return;

    grid.innerHTML = '';

    window.myProjects
        .filter(p => p.category !== 'wip')   // WIP جدا می‌آید
        .filter(p => window.currentFilter === 'all' || p.category === window.currentFilter)
        .forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}"
                    onerror="this.src='https://via.placeholder.com/400x400/333/999?text=Image+Not+Found'">
                <div class="card-overlay">
                    <span>${project.title}</span>
                    <p>${project.concept || ''}</p>
                </div>
            `;
            card.onclick = () => openLightbox(project);
            grid.appendChild(card);
        });
}

// رندر WIP
function renderWip() {
    const grid = document.getElementById('wip-grid');
    if (!grid || !window.myProjects) return;

    grid.innerHTML = '';
    window.myProjects
        .filter(p => p.category === 'wip')
        .forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}"
                    onerror="this.src='https://via.placeholder.com/400x400/333/999?text=Image+Not+Found'">
                <div class="card-overlay">
                    <span>${project.title}</span>
                    <p>${project.concept || ''}</p>
                </div>
            `;
            card.onclick = () => openLightbox(project);
            grid.appendChild(card);
        });
}

// فیلتر پورتفولیو
window.filterPortfolio = function(category) {
    window.currentFilter = category;
    const buttons = document.querySelectorAll('.portfolio-menu button');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderPortfolioContent();
};

// باز کردن لایت‌باکس
window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    if (!lightbox || !container) return;

    container.innerHTML = '';

    // نوع: پروژه طولانی (شهنامه)
    if (project.type === 'full-project' && project.content) {
        project.content.forEach(item => {
            if (item.type === 'video') {
                container.innerHTML += `
                    <div class="floating-media" style="padding:56.25% 0 0 0; position:relative;">
                        <iframe src="${item.url}" style="position:absolute;top:0;left:0;width:100%;height:100%;"
                            frameborder="0" allowfullscreen></iframe>
                    </div>`;
            } else if (item.type === 'image') {
                container.innerHTML += `
                    <div style="margin-bottom: 40px; text-align: center;">
                        <img src="${item.url}" class="floating-media" style="width:100%;" 
                             onerror="this.style.display='none'">
                        ${item.caption ? `<p style="color:rgba(255,255,255,0.6); font-size:0.8rem; margin-top:10px;">${item.caption}</p>` : ''}
                    </div>`;
            } else if (item.type === 'text') {
                container.innerHTML += item.value;
            } else if (item.type === 'spacer') {
                container.innerHTML += `<div style="height:${item.height}; width:100%;"></div>`;
            }
        });
    }
    // نوع: گالری تصویرسازی کتاب
    else if (project.type === 'gallery' && project.gallery) {
        container.innerHTML += `
            <div class="lightbox-info">
                <h3>${project.title}</h3>
                <p>${project.fullConcept || project.concept || ''}</p>
            </div>`;
        project.gallery.forEach(img => {
            container.innerHTML += `
                <div style="margin-bottom: 40px; text-align: center;">
                    <img src="${img.image}" class="floating-media" style="width:100%;">
                    <p style="color:rgba(255,255,255,0.6); font-size:0.85rem; margin-top:10px;">${img.caption}</p>
                </div>`;
        });
    }
    // نوع: ویدیو ساده + متن
    else if (project.type === 'simple' || project.type === 'simple-with-video' || project.type === 'featured-wip') {
        if (project.videoUrl) {
            container.innerHTML += `
                <div class="floating-media" style="padding:56.25% 0 0 0; position:relative;">
                    <iframe src="${project.videoUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;"
                        frameborder="0" allowfullscreen></iframe>
                </div>`;
        }
        container.innerHTML += `
            <div class="lightbox-info">
                <h3>${project.title}</h3>
                <p>${project.fullConcept || project.concept || ''}</p>
                <div style="margin-top:20px; color:rgba(255,255,255,0.5); font-size:0.85rem;">
                    ${project.material ? `<p><strong>MAT:</strong> ${project.material}</p>` : ''}
                    ${project.dimensions ? `<p><strong>DIM:</strong> ${project.dimensions}</p>` : ''}
                    ${project.year ? `<p><strong>YEAR:</strong> ${project.year}</p>` : ''}
                </div>
            </div>`;
    }
    // نوع: تک تصویر + متن (نقاشی‌ها و تصویرسازی‌های تکی)
    else if (project.type === 'single') {
        container.innerHTML += `
            <div style="margin-bottom: 40px; text-align: center;">
                <img src="${project.image}" class="floating-media" style="width:100%;">
            </div>
            <div class="lightbox-info">
                <h3>${project.title}</h3>
                <p>${project.fullConcept || project.concept || ''}</p>
                <div style="margin-top:20px; color:rgba(255,255,255,0.5); font-size:0.85rem;">
                    ${project.material ? `<p><strong>MAT:</strong> ${project.material}</p>` : ''}
                    ${project.dimensions ? `<p><strong>DIM:</strong> ${project.dimensions}</p>` : ''}
                    ${project.year ? `<p><strong>YEAR:</strong> ${project.year}</p>` : ''}
                </div>
            </div>`;
    }

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    lightbox.scrollTop = 0;
};

// بستن لایت‌باکس
window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// مدیریت صفحات
window.showPanel = function(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id || 'home');
    if (target) {
        target.classList.add('active');
        if (id === 'portfolio') renderPortfolioContent();
        if (id === 'work') renderWip();
    }

    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.style.filter = (id === 'home' || !id) ? 'blur(0px)' : 'blur(20px) brightness(0.4)';
    }
};

// شروع
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    window.showPanel(hash || 'home');
});
