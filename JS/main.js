// Canvas Background Animation
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function animate() {
  ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        setTimeout(() => item.classList.add('visible'), 100);
      } else {
        item.classList.remove('visible');
        setTimeout(() => item.style.display = 'none', 500);
      }
    });
  });
});

// Scroll Animations
window.addEventListener('scroll', () => {
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      item.classList.add('visible');
    }
  });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 15, 26, 0.95)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.1)';
  }
});
