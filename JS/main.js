// --- 1. NAVIGATION & PANELS ---
function switchTab(tabId) {
  // الف) آپدیت کلاس اکتیو منو
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.classList.remove('active');
    // چک کردن متنی یا اگر آیدی داشت
    if(link.getAttribute('onclick').includes(tabId)) {
      link.classList.add('active');
    }
  });

  // ب) نمایش پنل مربوطه
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    panel.classList.remove('active-panel');
  });
  
  const targetPanel = document.getElementById(tabId);
  if(targetPanel) {
    targetPanel.classList.add('active-panel');
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
// دیتای نمونه (می‌توانی عکس‌های خودت را جایگزین کنی)
const projects = [
  { id: 1, type: 'painting', title: 'Abstract Fear', img: 'https://source.unsplash.com/random/500x500/?abstract,art', desc: 'Oil on Canvas, 2024' },
  { id: 2, type: 'animation', title: 'Loop 01', img: 'https://source.unsplash.com/random/500x500/?digital,3d', desc: 'Blender 3D Loop' },
  { id: 3, type: 'illustration', title: 'Character Study', img: 'https://source.unsplash.com/random/500x500/?drawing', desc: 'Digital Sketch' },
  { id: 4, type: 'painting', title: 'Silence', img: 'https://source.unsplash.com/random/500x500/?paint', desc: 'Acrylic' },
  { id: 5, type: 'animation', title: 'Nightmare', img: 'https://source.unsplash.com/random/500x500/?dark,art', desc: 'Stop Motion' },
  { id: 6, type: 'illustration', title: 'Faces', img: 'https://source.unsplash.com/random/500x500/?face,art', desc: 'Charcoal' }
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
    item.onclick = () => openLightbox(p);
    item.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="project-overlay">
        <h3 style="font-family: 'Syncopate'; font-size: 0.9rem; margin-bottom:0.5rem">${p.title}</h3>
        <p style="font-size: 0.7rem; opacity:0.8">${p.type.toUpperCase()}</p>
      </div>
    `;
    portfolioGrid.appendChild(item);
  });
}

function filterPortfolio(type) {
  // آپدیت دکمه‌های فیلتر
  const buttons = document.querySelectorAll('.portfolio-menu button');
  buttons.forEach(btn => btn.classList.remove('active-filter'));
  event.target.classList.add('active-filter');

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
  const spacing = 30; // فاصله نقطه ها

  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // شعاع تاثیر موس
      const maxDist = 200;
      const strength = Math.max(0, 1 - dist / maxDist);

      if (strength > 0) {
        ctx.beginPath();
        // نقطه‌ها فقط نزدیک موس بزرگ میشن
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
