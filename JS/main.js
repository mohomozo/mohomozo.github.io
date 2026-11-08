// --- 1. NAVIGATION & PANELS ---
function switchTab(tabId) {
  // الف) آپدیت کلاس اکتیو منو
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('onclick').includes(tabId)) {
      link.classList.add('active');
    }
  });

  // ب) نمایش پنل مربوطه
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

  // ج) مدیریت ویدیو بک‌گراند
  const body = document.body;
  if (tabId === 'home') {
    body.classList.remove('view-detail'); // ویدیو واضح
  } else {
    body.classList.add('view-detail'); // ویدیو تار و محو
  }
}

// --- 2. PORTFOLIO DATA & GENERATION ---
// اینجا پروژه‌های شما قرار دارند
const projects = [
  // یک نمونه برای نقاشی (بعداً عکس‌های خودت رو جایگزین این کن)
  { id: 1, type: 'painting', title: 'کالبد پذیرش', img: 'assets/kalbod.jpg', desc: 'Painting' },
  
  // انیمیشن‌های شما (لینک‌های گوگل درایو)
  { id: 2, type: 'animation', title: 'Random things', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1tFMsgqX_5e_MynEWivfFGB3rhiW97ynd/preview' },
  { id: 3, type: 'animation', title: 'mindset', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1zoG3dlY9RznrLbiKu2j7BRUnW9_RnrG5/preview' },
  { id: 4, type: 'animation', title: 'sun', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1pLBsMpOfb_UruBAgs3CZM80v6O7hRLw6/preview' },
  { id: 5, type: 'animation', title: 'Dream loop', desc: 'Animation (2022)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1YAQ90R6n5OdksyU_S3G7Xj95abiRqQpB/preview' },
  { id: 6, type: 'animation', title: 'The Dance', desc: 'Animation (2021)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1ndP1pEhpyB-1y8XFn2blo5g1IANHXpYt/preview' },
  { id: 7, type: 'animation', title: 'Remembering', desc: 'Animation (2023)', mediaType: 'iframe', aspectRatio: '16/9', url: 'https://drive.google.com/file/d/1POqQBuDXrf98p_7oLfgOyziuNwn6IeUM/preview' }
];

const portfolioGrid = document.getElementById('portfolio-grid');

function renderPortfolio(filter = 'all') {
  if(!portfolioGrid) return;
  
  portfolioGrid.innerHTML = ''; // پاک کردن قبلی‌ها

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  filtered.forEach(p => {
    const item = document.createElement('div');
    item.className = 'project-item';
    item.style.position = 'relative';
    item.style.marginBottom = '20px';

    if (p.mediaType === 'iframe') {
      // کدهای نمایش ویدیوهای گوگل درایو
      item.innerHTML = `
        <iframe style="aspect-ratio: ${p.aspectRatio}; width: 100%; border: none; border-radius: 8px;" src="${p.url}" allow="autoplay; fullscreen"></iframe>
        <div class="project-overlay" style="pointer-events: none;">
          <h3 style="font-family: 'Syncopate'; font-size: 0.9rem; margin-bottom:0.5rem">${p.title}</h3>
          <p style="font-size: 0.7rem; opacity:0.8">${p.desc}</p>
        </div>
      `;
    } else {
      // کدهای نمایش عکس‌ها
      item.onclick = () => openLightbox(p);
      item.innerHTML = `
        <img src="${p.img}" alt="${p.title}" style="width: 100%; border-radius: 8px;">
        <div class="project-overlay">
          <h3 style="font-family: 'Syncopate'; font-size: 0.9rem; margin-bottom:0.5rem">${p.title}</h3>
          <p style="font-size: 0.7rem; opacity:0.8">${p.desc}</p>
        </div>
      `;
    }
    
    portfolioGrid.appendChild(item);
  });
}

function filterPortfolio(type) {
  // آپدیت دکمه‌های فیلتر
  const buttons = document.querySelectorAll('.portfolio-menu button');
  buttons.forEach(btn => btn.classList.remove('active-filter'));
  
  const clickedBtn = document.querySelector(`.portfolio-menu button[onclick="filterPortfolio('${type}')"]`);
  if(clickedBtn) clickedBtn.classList.add('active-filter');

  renderPortfolio(type);
}

// Render Initial Projects
renderPortfolio('all');


// --- 3. LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbTitle = document.getElementById('lightbox-title');
const lbDesc = document.getElementById('lightbox-desc');

function openLightbox(project) {
  lbImg.src = project.img;
  lbTitle.innerText = project.title;
  lbDesc.innerText = project.desc;
  
  lightbox.style.display = 'flex';
  setTimeout(() => { lightbox.classList.add('active'); }, 10);
}

function closeLightbox() {
  lightbox.classList.remove('active');
  setTimeout(() => { lightbox.style.display = 'none'; }, 300);
}


// --- 4. DOT SHADER (Mouse Effect) ---
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
