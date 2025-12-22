// JS/main.js

// تغییر پنل اصلی (Home / About / Portfolio / Work)
function showPanel(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});

  const heroVideo = document.getElementById('heroVideo');
  const heroContent = document.getElementById('heroContent');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroImage = document.getElementById('heroImage');

  if(id === 'portfolio'){
    heroVideo.style.display='none';
    heroContent.style.display='block';
    heroTitle.innerText = 'Portfolio';
    heroSubtitle.innerText = 'Explore artworks by category';
    heroImage.src = 'images/placeholder.png'; // جای تصویر Portfolio
  } else if(id === 'work'){
    heroVideo.style.display='none';
    heroContent.style.display='block';
    heroTitle.innerText = 'Work In Progress';
    heroSubtitle.innerText = 'Ongoing projects, pitch deck and demos';
    heroImage.src = 'images/placeholder.png'; // جای تصویر / دمو ویدیو
  } else {
    heroVideo.style.display='block';
    heroContent.style.display='none';
  }
}

// نمایش زیر-بخش‌های Portfolio (Painting / Illustration / Video / Animation)
function showPortfolio(id){
  document.querySelectorAll('.portfolio-section').forEach(s=>s.style.display='none');
  const section = document.getElementById(id);
  section.style.display='flex';

  // بازنشانی انیمیشن کارت‌ها
  section.querySelectorAll('.project-card').forEach(card=>{
    card.style.animation='none';
    card.offsetHeight; // trigger reflow
    card.style.animation='';
  });
}

// اضافه کردن افکت کلیک روی کارت‌ها (اختیاری)
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    // می‌توان Lightbox / Modal یا لینک به پروژه اضافه کرد
    console.log('Project clicked:', card.querySelector('h3')?.innerText);
  });
});
