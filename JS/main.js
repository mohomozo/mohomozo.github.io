// تابع اصلی برای تغییر صفحات
window.showPanel = function(id) {
    console.log("Changing to panel:", id); // برای تست در کنسول
    
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
    } else {
        // اگر پنل پیدا نشد (مثلاً هوم)، برو روی پنل پیش‌فرض
        const homePanel = document.getElementById('home');
        if(homePanel) homePanel.classList.add('active');
    }

    // مدیریت افکت ویدیو هیرو
    const heroVideo = document.getElementById('heroVideo');
    if (id === 'home' || !id) {
        if(heroVideo) heroVideo.style.filter = "blur(0px) brightness(1)";
    } else {
        if(heroVideo) heroVideo.style.filter = "blur(20px) brightness(0.4)";
    }

    // لود کردن محتوا
    window.renderPortfolioContent();
};

// رندر کردن گالری
window.renderPortfolioContent = function() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const wipGrid = document.getElementById('wip-grid');

    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';
        // فیلتر کردن کارهای غیر از WIP
        const mainWorks = myProjects.filter(p => p.category !== 'work');
        mainWorks.forEach(project => {
            portfolioGrid.appendChild(createCard(project));
        });
    }

    if (wipGrid) {
        wipGrid.innerHTML = '';
        const wipWorks = myProjects.filter(p => p.category === 'work');
        wipWorks.forEach(project => {
            wipGrid.appendChild(createCard(project));
        });
    }
};

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

// لایت‌باکس با استایل درخواستی شما
window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media-container');
    
    if(!lightbox) return;
    mediaContainer.innerHTML = '';

    // ۱. ویدیو
    if (project.videoUrl) {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'floating-media';
        videoDiv.innerHTML = `
            <div style="padding:56.25% 0 0 0;position:relative;">
                <iframe src="${project.videoUrl}?autoplay=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
            </div>`;
        mediaContainer.appendChild(videoDiv);
    }

    // ۲. استیتمنت و متن
    const infoDiv = document.createElement('div');
    infoDiv.className = 'lightbox-info';
    infoDiv.innerHTML = `<h3>${project.title}</h3>` + (project.concept || '');
    mediaContainer.appendChild(infoDiv);

    // ۳. تصاویر گالری و جزئیات
    if (project.gallery) {
        project.gallery.forEach((imgUrl, index) => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.className = 'floating-media';
            mediaContainer.appendChild(img);

            if(index === 0 && project.detailsInfo) {
                const p = document.createElement('p');
                p.style.cssText = "text-align:center; opacity:0.6; margin-bottom:40px;";
                p.innerText = project.detailsInfo;
                mediaContainer.appendChild(p);
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

// لود اولیه
window.onload = () => {
    const hash = window.location.hash.replace('#', '');
    window.showPanel(hash || 'home');
};
