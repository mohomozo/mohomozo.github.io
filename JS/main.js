// ۱. سیستم ناوبری SPA
function showPanel(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    const heroTitle = document.getElementById('heroTitle');
    const heroVideo = document.getElementById('heroVideo');

    if (id === 'home' || id === '') {
        heroTitle.innerText = "MOHOMOZO";
        heroVideo.style.filter = "blur(0px) brightness(1)";
    } else {
        heroTitle.innerText = id.toUpperCase();
        heroVideo.style.filter = "blur(20px) brightness(0.4)";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
    renderPortfolioContent();
}

// ۲. رندر محتوا از فایل data.js
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
            card.onclick = () => openLightbox(project);
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
            card.onclick = () => openLightbox(project);
            wipGrid.appendChild(card);
        });
    }
}

// ۳. فیلتر کردن
function filterPortfolio(category) {
    renderPortfolioContent(category);
    document.querySelectorAll('.portfolio-menu button').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === category);
    });
}

// ۴. مدیریت لایت‌باکس اسکرولی
function openLightbox(project) {
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media-container');
    
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
    lightbox.scrollTop = 0;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox-media-container').innerHTML = '';
    document.body.style.overflow = 'auto';
}

// ۵. لود اولیه
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    showPanel(hash || 'home');
});

document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeLightbox(); });
