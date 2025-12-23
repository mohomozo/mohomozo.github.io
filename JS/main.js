function openLightbox(project) {
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media-container');
    
    mediaContainer.innerHTML = '';

    if (project.videoUrl) {
        // ایجاد امبد ویمئو با تنظیمات بهینه
        mediaContainer.innerHTML = `
            <div style="padding:56.25% 0 0 0;position:relative;">
                <iframe src="${project.videoUrl}?autoplay=1&title=0&byline=0&portrait=0" 
                style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>`;
    } else {
        mediaContainer.innerHTML = `<img src="${project.image}" style="width:100%; height:auto;">`;
    }

    document.getElementById('info-title').innerText = project.title;
    document.getElementById('info-dims').innerText = project.dimensions || '-';
    document.getElementById('info-material').innerText = project.material || '-';
    document.getElementById('info-concept').innerText = project.concept || '';

    lightbox.style.display = 'flex';
}


