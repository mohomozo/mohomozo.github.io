window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    if (!lightbox || !container) return;

    container.innerHTML = '';

    if (project.isFullProject && project.content) {
        project.content.forEach(item => {
            if (item.type === 'video') {
                container.innerHTML += `
                    <div class="floating-media" style="padding:56.25% 0 0 0; position:relative; margin-bottom:50px; background:#000;">
                        <iframe src="${item.url}?autoplay=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
                    </div>`;
            } else if (item.type === 'image') {
                container.innerHTML += `
                    <div style="margin-bottom: 60px; text-align: center;">
                        <img src="${item.url}" class="floating-media" style="margin-bottom:15px; width:100%; display:block;">
                        ${item.caption ? `<p style="color:rgba(255,255,255,0.5); font-size:0.8rem; letter-spacing:1px;">${item.caption}</p>` : ''}
                    </div>`;
            } else if (item.type === 'text') {
                container.innerHTML += item.value;
            } else if (item.type === 'spacer') {
                container.innerHTML += `<div style="height:${item.height};"></div>`;
            }
        });
    } else {
        // برای کارهای تکی قدیمی
        if (project.videoUrl) {
            container.innerHTML += `<div class="floating-media" style="padding:56.25% 0 0 0; position:relative;"><iframe src="${project.videoUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe></div>`;
        }
        container.innerHTML += `<div class="lightbox-info"><h3>${project.title}</h3><p>${project.concept || ''}</p></div>`;
    }

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    lightbox.scrollTop = 0;
};
