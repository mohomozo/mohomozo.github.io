document.addEventListener('DOMContentLoaded', () => {

  // Carousel functionality
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach(carousel => {
    let index = 0;
    const items = carousel.querySelectorAll('.carousel-item');
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');

    function showItem(i){
      items.forEach((item, idx) => {
        item.style.display = idx === i ? 'block' : 'none';
      });
    }

    showItem(index);

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % items.length;
      showItem(index);
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + items.length) % items.length;
      showItem(index);
    });
  });

  // Optional: show Investor Panel on key press (for testing)
  // Press 'I' to toggle investor panel visibility
  document.addEventListener('keydown', e => {
    if(e.key.toLowerCase() === 'i'){
      const panel = document.getElementById('investor-panel');
      panel.classList.toggle('hidden');
    }
  });

});
