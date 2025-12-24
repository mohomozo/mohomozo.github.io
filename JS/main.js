window.openLightbox = function(project) {
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media-container');
    if(!lightbox || !mediaContainer) return;

    mediaContainer.innerHTML = '';

    // ۱. نمایش ویدیو (اگر وجود داشت)
    if (project.videoUrl) {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'floating-media';
        videoDiv.innerHTML = `
            <div style="padding:56.25% 0 0 0;position:relative;">
                <iframe src="${project.videoUrl}?autoplay=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
            </div>`;
        mediaContainer.appendChild(videoDiv);
    }

    // ۲. نمایش استیتمنت و متن‌های توضیحی (قبل از تصاویر)
    const conceptDiv = document.createElement('div');
    conceptDiv.className = 'lightbox-info';
    conceptDiv.innerHTML = `<h3>${project.title}</h3>` + project.concept;
    mediaContainer.appendChild(conceptDiv);

    // ۳. نمایش تصاویر گالری با فواصل نرم
    if (project.gallery) {
        project.gallery.forEach((imgUrl, index) => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.className = 'floating-media';
            img.style.marginTop = "40px";
            mediaContainer.appendChild(img);

            // اگر تصویر اول بود و اطلاعات فنی داشت، زیرش بنویس
            if(index === 0 && project.detailsInfo) {
                const infoP = document.createElement('p');
                infoP.style.cssText = "text-align:center; opacity:0.6; font-size:0.8rem; margin-top:-20px; margin-bottom:40px;";
                infoP.innerText = project.detailsInfo;
                mediaContainer.appendChild(infoP);
            }
        });
    }

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    lightbox.scrollTop = 0;
};
