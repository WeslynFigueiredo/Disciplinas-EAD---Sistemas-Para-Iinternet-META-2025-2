// State management using JavaScript variables (no localStorage)
let currentSlideIndex = 1;
const totalSlides = 28;

// DOM Elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');

// Initialize
function init() {
    totalSlidesSpan.textContent = totalSlides;
    updateSlide();
    updateNavigationButtons();
}

// Update slide display
function updateSlide() {
    slides.forEach((slide, index) => {
        if (index + 1 === currentSlideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    currentSlideSpan.textContent = currentSlideIndex;
    updateNavigationButtons();
}

// Update navigation button states
function updateNavigationButtons() {
    prevBtn.disabled = currentSlideIndex === 1;
    nextBtn.disabled = currentSlideIndex === totalSlides;
}

// Navigate to specific slide
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlideIndex = slideNumber;
        updateSlide();
    }
}

// Navigate to next slide
function nextSlide() {
    if (currentSlideIndex < totalSlides) {
        currentSlideIndex++;
        updateSlide();
    }
}

// Navigate to previous slide
function prevSlide() {
    if (currentSlideIndex > 1) {
        currentSlideIndex--;
        updateSlide();
    }
}

// Event Listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'Home') {
        goToSlide(1);
    } else if (e.key === 'End') {
        goToSlide(totalSlides);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const presentationContainer = document.querySelector('.presentation-container');

presentationContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

presentationContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to next slide
            nextSlide();
        } else {
            // Swiped right - go to previous slide
            prevSlide();
        }
    }
}

// Make TOC cards clickable (navigate to specific sections)
const tocCards = document.querySelectorAll('.toc-card');
tocCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Map TOC cards to starting slides
        const startingSlides = [3, 4, 5, 11, 14, 18, 21, 24];
        goToSlide(startingSlides[index]);
    });
});

// Initialize the presentation
init();
