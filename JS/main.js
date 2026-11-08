// --- 1. NAVIGATION & PANELS ---
function switchTab(tabId) {
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('onclick').includes(tabId)) {
      link.classList.add('active');
    }
  });

  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    panel.classList.remove('active-panel');
    panel.style.display = 'none';
  });
  
  const targetPanel = document.getElementById(tabId);
  if(targetPanel) {
    targetPanel.classList.add('active-panel');
    targetPanel.style.display = 'block';
  }

  const body = document.body;
  if (tabId === 'home') {
    body.classList.remove('view-detail'); 
  } else {
    body.classList.add('view-detail'); 
  }
}

// --- 2. PORTFOLIO DATA ---
const projects = [
  // کارهای نقاشی
  { id: 1, type: 'painting', title: 'کالبد پذیرش', desc: 'Painting', img: 'assets/kalbod.jpg' },
  
  // انیمیشن‌ها (بخش img را با آدرس عکس کاور مربعی خودت جایگزین کن)
  { id: 2, type: 'animation', title: 'Random things', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1tFMsgqX_5e_MynEWivfFGB3rhiW97ynd/preview', img: 'assets/cover-random.jpg' },
  { id: 3, type: 'animation', title: 'mindset', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1zoG3dlY9RznrLbiKu2j7BRUnW9_RnrG5/preview', img: 'assets/cover-mindset.jpg' },
  { id: 4, type: 'animation', title: 'sun', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1pLBsMpOfb_UruBAgs3CZM80v6O7hRLw6/preview', img: 'assets/cover-sun.jpg' },
  { id: 5, type: 'animation', title: 'Dream loop', desc: 'Animation (2022)', mediaType: 'iframe', aspectRatio: '1/1', url: 'https://drive.google.com/file/d/1YAQ90R6n5OdksyU_S3G7Xj95abiRqQpB/preview', img: 'assets/cover-dream.jpg' },
  { id: 6, type: 'animation', title: 'The Dance', desc: 'Animation (2021)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1ndP1pEhpyB-1y8XFn2blo5g1IANHXpYt/preview', img: 'assets/cover-dance.jpg' },
  { id: 7, type: 'animation', title: 'Remembering', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1POqQBuDXrf98p_7oLfgOyziuNwn6IeUM/preview', img: 'assets/cover-remember.jpg' }
];

const portfolioGrid = document.getElementById('portfolio-grid');

function renderPortfolio(filter = 'all') {
  if(!portfolioGrid) return;
  
  portfolioGrid.innerHTML = ''; 

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  filtered.forEach(p => {
    const item = document.createElement('div');
    item.className = 'project-item';
    item.style.position = 'relative';
    item.style.marginBottom = '20px';
    item.style.cursor = 'pointer';
    item.onclick = () => openLightbox(p);
    
    // کادر مربعی یکدست برای همه کارها در گالری با استفاده از عکس کاور
    // اگر عکسی لود نشد، یک پس‌زمینه خاکستری نشان می‌دهد
    item.innerHTML = `
      <div style="width: 100%; aspect-ratio: 1/1; overflow: hidden; border-radius: 8px; background: #333;">
        <img src="${p.img}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">
      </div>
      <div class="project-overlay" style="pointer-events: none;">
        <h3 style="font-family: 'Syncopate'; font-size: 0.9rem; margin-bottom:0.5rem">${p.title}</h3>
        <p style="font-size: 0.7rem; opacity:0.8">${p.desc}</p>
      </div>
    `;
    portfolioGrid.appendChild(item);
  });
}

function filterPortfolio(type) {
  const buttons = document.querySelectorAll('.portfolio-menu button');
  buttons.forEach(btn => btn.classList.remove('active-filter'));
  
  const clickedBtn = document.querySelector(`.portfolio-menu button[onclick="filterPortfolio('${type}')"]`);
  if(clickedBtn) clickedBtn.classList.add('active-filter');

  renderPortfolio(type);
}

renderPortfolio('all');


// --- 3. LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbTitle = document.getElementById('lightbox-title');
const lbDesc = document.getElementById('lightbox-desc');

function openLightbox(project) {
  lbTitle.innerText = project.title;
  lbDesc.innerText = project.desc;
  
  // پیدا کردن بدنه اصلی لایت‌باکس
  const lightboxContent = document.querySelector('.lightbox-content');
  
  const oldMedia = document.getElementById('lightbox-media');
  if(oldMedia) oldMedia.remove();

  if (project.mediaType === 'iframe') {
    lbImg.style.display = 'none';
    
    // بزرگ کردن پنجره تا ۹۰ درصد عرض مانیتور برای ویدیوها
    lightboxContent.style.width = '90vw';
    lightboxContent.style.maxWidth = '1200px'; 
    
    // اضافه کردن محدودیت ارتفاع (max-height) تا از صفحه بیرون نزند
    const iframeHTML = `<iframe id="lightbox-media" style="width: 100%; max-height: 75vh; aspect-ratio: ${project.aspectRatio}; border: none; border-radius: 8px; margin-bottom: 15px;" src="${project.url}" allow="autoplay; fullscreen"></iframe>`;
    document.querySelector('.lightbox-info').insertAdjacentHTML('beforebegin', iframeHTML);
  } else {
    lbImg.style.display = 'block';
    lbImg.src = project.img;
    
    // برگرداندن سایز به حالت نرمال برای نقاشی‌ها
    lightboxContent.style.width = '90%';
    lightboxContent.style.maxWidth = '600px'; 
  }
  
  lightbox.style.display = 'flex';
  setTimeout(() => { lightbox.classList.add('active'); }, 10);
}

// --- 4. DOT SHADER ---
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let w, h;
let mouse = { x: -1000, y: -1000 };

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawDots() {
  ctx.clearRect(0, 0, w, h);
  const spacing = 30;

  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const maxDist = 200;
      const strength = Math.max(0, 1 - dist / maxDist);

      if (strength > 0) {
        ctx.beginPath();
        const size = 1 + (strength * 3); 
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${strength * 0.4})`;
        ctx.fill();
      }
    }
  }
  requestAnimationFrame(drawDots);
}
drawDots();
