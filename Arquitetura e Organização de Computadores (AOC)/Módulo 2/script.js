// Slide navigation
let currentSlide = 1;
const totalSlides = 28;

// DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

// Initialize
function init() {
  totalSlidesEl.textContent = totalSlides;
  updateSlide();
  updateButtons();
}

// Update slide display
function updateSlide() {
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
  if (activeSlide) {
    activeSlide.classList.add('active');
  }

  currentSlideEl.textContent = currentSlide;
}

// Update button states
function updateButtons() {
  prevBtn.disabled = currentSlide === 1;
  nextBtn.disabled = currentSlide === totalSlides;
}

// Go to next slide
function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlide();
    updateButtons();
  }
}

// Go to previous slide
function prevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlide();
    updateButtons();
  }
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    prevSlide();
  }
});

// Initialize on load
init();