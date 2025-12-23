// تغییر پنل‌ها (SPA)
function showPanel(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
    }

    const heroTitle = document.getElementById('heroTitle');
    const heroVideo = document.getElementById('heroVideo');

    // افکت‌های بصری هیرو
    if (id === 'home') {
        heroTitle.innerText = "MOHOMOZO";
        heroVideo.style.filter = "blur(0px) brightness(1)";
    } else {
        heroTitle.innerText = id.toUpperCase();
        heroVideo.style.filter = "blur(15px) brightness(0.4)";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// نمایش دسته‌بندی‌های پورتفولیو
function showPortfolio(id) {
    document.querySelectorAll('.portfolio-section').forEach(s => s.style.display = 'none');
    const section = document.getElementById(id);
    if (section) {
        section.style.display = 'grid';
        
        // انیمیشن ورود کارت‌ها
        const cards = section.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        });
    }
}

// توابع Lightbox (بزرگ‌نمایی عکس)
function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// بستن Lightbox با دکمه Esc
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});
