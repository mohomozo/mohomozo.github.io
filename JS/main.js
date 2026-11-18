// --- 1. NAVIGATION & PANELS ---
function switchTab(tabId) {
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick').includes(tabId)) {
      link.classList.add('active');
    }
  });

  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    panel.classList.remove('active-panel');
  });

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.classList.add('active-panel');
  }

  const body = document.body;
  if (tabId === 'home') {
    body.classList.remove('view-detail');
  } else {
    body.classList.add('view-detail');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// استخراج خودکار تصویر کاور از لینک گوگل درایو
function getDriveThumbnail(url) {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000` : '';
}

// --- 2. PORTFOLIO DATA ---
const projects = [
  { id: 1, type: 'painting', title: 'کالبد پذیرش', desc: 'Painting', img: 'assets/kalbod.jpg' },

  {
    id: 2,
    type: 'animation',
    title: 'Random Things',
    desc: 'Experimental Animation (2023)',
    mediaType: 'iframe',
    aspectRatio: '16/9',
    url: 'https://drive.google.com/file/d/1tFMsgqX_5e_MynEWivfFGB3rhiW97ynd/preview',
    details: {
      year: '2023',
      badge: 'Experimental Animation',
      meta: [
        { label: 'Category', value: 'Experimental Animation' },
        { label: 'Technique', value: 'Hand-Drawn Frame-by-Frame Animation' },
        { label: 'Sound Design', value: 'Experimental Vocal Recording' }
      ],
      paragraphs: [
        'Random Things is a collection of experimental hand-drawn animation studies.',
        'The project explores spontaneous movement, visual transformation, and the possibilities of frame-by-frame drawing. Its sound design is also experimental, incorporating voice recordings created using the mouth as an unconventional sound-making instrument.',
        'Rather than following a predetermined narrative, the work develops through a series of independent visual and sonic experiments.'
      ]
    }
  },
  {
    id: 3,
    type: 'animation',
    title: 'Mindset',
    desc: 'Experimental Animation (2023)',
    mediaType: 'iframe',
    aspectRatio: '16/9',
    url: 'https://drive.google.com/file/d/1zoG3dlY9RznrLbiKu2j7BRUnW9_RnrG5/preview',
    details: {
      year: '2023',
      badge: 'Experimental Animation',
      meta: [
        { label: 'Category', value: 'Experimental Animation' },
        { label: 'Technique', value: 'Mixed Media Animation — Stop Motion & Frame-by-Frame Image Editing' },
        { label: 'Source Material', value: 'Works by Robert Smithson' }
      ],
      paragraphs: [
        'Mindset is an experimental visual study using imagery from the works of American artist Robert Smithson.',
        'By layering and superimposing the images in two opposing directions of movement, I explored the relationship between repetition, visual rhythm, and perception.',
        'Combining stop-motion elements with frame-by-frame manipulation of photographic imagery, the work attempts to construct a new visual experience through variations in timing, spacing, and directional movement.'
      ]
    }
  },
  {
    id: 4,
    type: 'animation',
    title: 'Sun',
    desc: 'Experimental Film / Animation (2023)',
    mediaType: 'iframe',
    aspectRatio: '16/9',
    url: 'https://drive.google.com/file/d/1pLBsMpOfb_UruBAgs3CZM80v6O7hRLw6/preview',
    details: {
      year: '2023',
      badge: 'Experimental Film / Animation',
      meta: [
        { label: 'Category', value: 'Experimental Film / Animation' },
        { label: 'Technique', value: 'Hand-Drawn Rotoscope on Printed Film' },
        { label: 'Materials', value: 'Printed Film & Mixed Media' }
      ],
      paragraphs: [
        'Sun is an early visual experiment developed as part of the initial explorations for <em>ANIMATORE</em>, an ongoing independent animation project featured in the WIP section.',
        'Using a rotoscoping technique, a sequence of images was manually traced and animated over printed film. The experiment explores the relationship between movement, physical materials, and the transformation of photographic imagery through a handmade process.'
      ]
    }
  },
  {
    id: 5,
    type: 'animation',
    title: 'Dream Loop',
    desc: 'Experimental Animation (2022)',
    mediaType: 'iframe',
    aspectRatio: '1/1',
    url: 'https://drive.google.com/file/d/1YAQ90R6n5OdksyU_S3G7Xj95abiRqQpB/preview',
    details: {
      year: '2022',
      badge: 'Experimental Animation',
      meta: [
        { label: 'Category', value: 'Experimental Animation' },
        { label: 'Technique', value: '2D Digital Frame-by-Frame Animation' },
        { label: 'Duration', value: '1 minute' }
      ],
      paragraphs: [
        'Dream Loop is a one-minute, non-narrative experimental animation exploring the fluid relationship between memory, desire, and identity.',
        "Within shifting dreamlike spaces, the boundaries between different figures and experiences begin to dissolve. The mother's body merges with the lover's, while the self becomes entangled in an ongoing struggle with itself. Time reverses, spaces transform, and the dream gradually decays, eventually becoming a self-contained world with its own internal logic."
      ]
    }
  },
  {
    id: 6,
    type: 'animation',
    title: 'The Dance',
    desc: 'Animation Study (2022)',
    mediaType: 'iframe',
    aspectRatio: '16/9',
    url: 'https://drive.google.com/file/d/1ndP1pEhpyB-1y8XFn2blo5g1IANHXpYt/preview',
    details: {
      year: '2022',
      badge: 'Animation Study',
      meta: [
        { label: 'Category', value: 'Animation Study' },
        { label: 'Technique', value: '2D Digital Frame-by-Frame Animation' },
        { label: 'Based on', value: 'Henri Matisse, The Dance (1910)' }
      ],
      paragraphs: [
        "The Dance is an experimental animation based on Henri Matisse's painting The Dance (1910).",
        'The project began with a question: how can a loop emerge from a static image?',
        "In Matisse's painting, the circular movement of the dancers is created through a chain of interconnected hands. I explored an alternative approach: what if the figures remained in their original positions, but instead of moving through space, continuously transformed into one another?",
        'Through frame-by-frame morphing, the figures merge and re-emerge, creating an endless cycle of transformation within the boundaries of a single painted composition.'
      ]
    }
  },
  {
    id: 7,
    type: 'animation',
    title: 'Remembering',
    desc: 'Animation Study (2023)',
    mediaType: 'iframe',
    aspectRatio: '16/9',
    url: 'https://drive.google.com/file/d/1POqQBuDXrf98p_7oLfgOyziuNwn6IeUM/preview',
    details: {
      year: '2023',
      badge: 'Animation Study',
      meta: [
        { label: 'Category', value: 'Animation Study' },
        { label: 'Technique', value: 'Stop Motion Animation' },
        { label: 'Materials', value: 'CDs, VHS Tapes & Light' }
      ],
      paragraphs: [
        'Remembering is an early stop-motion study exploring the movement of light across reflective surfaces.',
        'Using CDs and VHS tapes as visual materials, the animation captures shifting reflections, fragmented light, and changing patterns produced through their interaction with light.',
        'Conceived as an initial experiment for a potential short film, the project investigates how ordinary and discarded materials can become sources of movement and visual expression.'
      ]
    }
  }
];

const portfolioGrid = document.getElementById('portfolio-grid');

function renderPortfolio(filter = 'all') {
  if (!portfolioGrid) return;

  portfolioGrid.innerHTML = '';

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter);

  filtered.forEach(p => {
    const item = document.createElement('div');
    item.className = 'project-item';
    item.onclick = () => openLightbox(p);

    const coverSrc = p.img || (p.mediaType === 'iframe' ? getDriveThumbnail(p.url) : '');
    const playIcon = p.mediaType === 'iframe' ? '<span class="play-badge">▶</span>' : '';

    item.innerHTML = `
      <img src="${coverSrc}" alt="${p.title}" referrerpolicy="no-referrer" loading="lazy" onerror="this.style.display='none'">
      ${playIcon}
      <div class="project-overlay">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    `;
    portfolioGrid.appendChild(item);
  });
}

function filterPortfolio(type) {
  const buttons = document.querySelectorAll('.portfolio-menu button');
  buttons.forEach(btn => btn.classList.remove('active-filter'));

  const clickedBtn = document.querySelector(`.portfolio-menu button[onclick="filterPortfolio('${type}')"]`);
  if (clickedBtn) clickedBtn.classList.add('active-filter');

  renderPortfolio(type);
}

renderPortfolio('all');

// --- 3. LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lightboxInfo = document.querySelector('.lightbox-info');

function openLightbox(project) {
  const lightboxContent = document.querySelector('.lightbox-content');
  const oldMedia = document.getElementById('lightbox-media');
  if (oldMedia) oldMedia.remove();

  // تنظیم مدیا (ویدیو یا عکس)
  if (project.mediaType === 'iframe') {
    lbImg.style.display = 'none';
    lightboxContent.style.width = '92vw';
    lightboxContent.style.maxWidth = '1040px';

    const iframeHTML = `<iframe id="lightbox-media" style="width: 100%; max-height: 70vh; aspect-ratio: ${project.aspectRatio}; border: none; border-radius: 14px; margin-bottom: 20px; display: block; background: #000;" src="${project.url}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    lightboxInfo.insertAdjacentHTML('beforebegin', iframeHTML);
  } else {
    lbImg.style.display = 'block';
    lbImg.src = project.img;
    lightboxContent.style.width = '90%';
    lightboxContent.style.maxWidth = '680px';
  }

  // ساخت کارت شیشه‌ای توضیحات (مشابه W.I.P)
  if (project.details) {
    const metaHTML = project.details.meta.map(m => `
      <div class="lb-meta-item">
        <span class="lb-meta-label">${m.label}</span>
        <span class="lb-meta-value">${m.value}</span>
      </div>
    `).join('');

    const paragraphsHTML = project.details.paragraphs.map(text => `
      <p class="lb-body-text">${text}</p>
    `).join('');

    lightboxInfo.className = 'lightbox-info lb-glass-panel';
    lightboxInfo.innerHTML = `
      <div class="wip-header">
        <span class="wip-badge">${project.details.badge} • ${project.details.year}</span>
        <h3 class="lb-glass-title">${project.title}</h3>
      </div>
      <div class="lb-meta-grid">${metaHTML}</div>
      <div class="divider"></div>
      <div class="lb-paragraphs">${paragraphsHTML}</div>
    `;
  } else {
    lightboxInfo.className = 'lightbox-info';
    lightboxInfo.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
    `;
  }

  lightboxContent.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  lightbox.style.display = 'flex';
  setTimeout(() => { lightbox.classList.add('active'); }, 10);
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    lightbox.style.display = 'none';
    const media = document.getElementById('lightbox-media');
    if (media) media.remove();
  }, 250);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

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
