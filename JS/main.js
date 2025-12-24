// ۱. نمایش کاورها در صفحه اصلی
function renderPortfolioContent() {
    const grid = document.getElementById('portfolio-grid');
    // چک کردن ایمنی برای جلوگیری از قفل شدن
    if (!grid) return;
    if (!window.myProjects) {
        console.error("Data.js لود نشده است!");
        return;
    }

    grid.innerHTML = '';
    window.myProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        // اگر عکس پیدا نشد، یک کادر طوسی نشان بده که سایت خراب نشود
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" 
                 onerror="this.src='https://via.placeholder.com/400x400/333/fff?text=Image+Not+Found'">
            <div class="card-overlay"><span>${project.title}</span></div>
        `;
        card.onclick = () => window.openLightbox(project);
        grid.appendChild(card);
    });
}

// ۲. باز کردن لایت‌باکس (نمایش پروژه)
window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    
    if (!lightbox || !container) return;
    container.innerHTML = ''; // پاک کردن محتوای قبلی

    // حالت اول: پروژه طولانی و ترکیبی (مثل پایان‌نامه شما)
    if (project.isFullProject && project.content) {
        project.content.forEach(item => {
            if (item.type === 'video') {
                container.innerHTML += `
                    <div class="floating-media" style="padding:56.25% 0 0 0; position:relative; margin-bottom:40px; background:#000;">
                        <iframe src="${item.url}?rel=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
                    </div>`;
            } else if (item.type === 'image') {
                container.innerHTML += `
                    <div style="margin-bottom: 50px; text-align: center;">
                        <img src="${item.url}" class="floating-media" style="margin-bottom:10px; display:block; width:100%;" onerror="this.style.display='none'">
                        ${item.caption ? `<p style="color:rgba(255,255,255,0.6); font-size:0.8rem;">${item.caption}</p>` : ''}
                    </div>`;
            } else if (item.type === 'text') {
                container.innerHTML += item.value;
            } else if (item.type === 'spacer') {
                container.innerHTML += `<div style="height:${item.height}; width:100%;"></div>`;
            }
        });
    } 
    // حالت دوم: پروژه‌های ساده قدیمی
    else {
        if (project.videoUrl) {
            container.innerHTML += `<div class="floating-media" style="padding:56.25% 0 0 0; position:relative;"><iframe src="${project.videoUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe></div>`;
        }
        container.innerHTML += `<div class="lightbox-info"><h3>${project.title}</h3><p>${project.concept || ''}</p></div>`;
    }

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // قفل کردن اسکرول صفحه اصلی
    lightbox.scrollTop = 0;
};

// ۳. بستن لایت‌باکس
window.closeLightbox = function() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
};

// ۴. مدیریت صفحات (تب‌ها)
window.showPanel = function(id) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(id || 'home');
    if (target) {
        target.classList.add('active');
        // اگر در صفحه خانه یا پورتفولیو هستیم، پروژه‌ها را رندر کن
        if (id === 'home' || id === 'portfolio' || !id) renderPortfolioContent();
    }
    
    // تنظیم افکت بلور ویدیو پشت زمینه
    const heroVideo = document.getElementById('heroVideo');
    if(heroVideo) heroVideo.style.filter = (id === 'home' || !id) ? "blur(0px)" : "blur(20px) brightness(0.4)";
};

// ۵. شروع برنامه
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    window.showPanel(hash || 'home');
});
