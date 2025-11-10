// State management using JavaScript variables (no localStorage)
let currentSlideIndex = 1;
const totalSlides = 22;

// Activity scores
let activityScores = {
  myth: null,
  srpQuiz: null
};

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
        // Map TOC cards to starting slides for Module 5
        const startingSlides = [3, 6, 10, 20];
        goToSlide(startingSlides[index]);
    });
});

// Initialize the presentation
init();

// ========================================
// INTERACTIVE ACTIVITIES - MODULE 5
// ========================================

// Activity: Myth vs Truth about Technical Debt
function initMythActivity() {
  const options = document.querySelectorAll('[data-activity="myth"]');
  
  options.forEach(option => {
    option.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      const isCorrect = this.dataset.correct === 'true';
      const feedbackBox = document.getElementById('myth-feedback');
      
      // Disable all options
      options.forEach(opt => opt.classList.add('disabled'));
      
      // Mark selected
      if (isCorrect) {
        this.classList.add('correct');
        activityScores.myth = 1;
        feedbackBox.className = 'feedback-box success';
        feedbackBox.innerHTML = '✅ <strong>MITO!</strong> Dívida Técnica pode ser <strong>ESTRATÉGICA</strong> quando é <strong>DELIBERADA e PRUDENTE</strong>.<br><br><strong>Exemplo:</strong> Entregar MVP rápido para validar ideia com clientes, sabendo que refatorará depois.<br><br><strong>O importante é:</strong><br>(1) Saber que está criando dívida<br>(2) Ter plano para pagar depois<br>(3) Não deixar acumular demais<br><br>Dívida Técnica vira problema quando é <strong>INADVERTIDA</strong> (não sabe que existe) ou <strong>IMPRUDENTE</strong> (ignora propositalmente).';
      } else {
        this.classList.add('incorrect');
        activityScores.myth = 0;
        feedbackBox.className = 'feedback-box error';
        feedbackBox.innerHTML = '❌ Não é bem assim! Dívida Técnica <strong>DELIBERADA e PRUDENTE</strong> pode ser estratégica. Às vezes vale a pena entregar rápido e refatorar depois, <strong>DESDE QUE</strong> você saiba o que está fazendo e tenha plano para melhorar o código. O problema é a dívida <strong>IMPRUDENTE</strong> ou não reconhecida.';
      }
      
      feedbackBox.style.display = 'block';
    });
  });
}

// Activity: SRP Violation Quiz
function initSRPQuizActivity() {
  const options = document.querySelectorAll('[data-activity="srp-quiz"]');
  
  options.forEach(option => {
    option.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      const isCorrect = this.dataset.correct === 'true';
      const feedbackBox = document.getElementById('srp-quiz-feedback');
      
      // Disable all options
      options.forEach(opt => opt.classList.add('disabled'));
      
      // Mark selected
      if (isCorrect) {
        this.classList.add('correct');
        activityScores.srpQuiz = 1;
        feedbackBox.className = 'feedback-box success';
        feedbackBox.innerHTML = '✅ <strong>CORRETO!</strong> A classe Produto tem <strong>3 RESPONSABILIDADES</strong>:<br><br>1. <strong>Dados do produto</strong> (nome, preço) - ✅ OK<br>2. <strong>Cálculo de desconto</strong> - ✅ OK (lógica de negócio do produto)<br>3. <strong>Persistência</strong> (salvarNoBanco) - ❌ <strong>VIOLAÇÃO!</strong><br>4. <strong>Email</strong> (enviarEmailPromocao) - ❌ <strong>VIOLAÇÃO!</strong><br><br>Persistência deveria estar em <code>ProdutoRepository</code>. Email deveria estar em <code>EmailService</code>.';
      } else {
        this.classList.add('incorrect');
        activityScores.srpQuiz = 0;
        feedbackBox.className = 'feedback-box error';
        feedbackBox.innerHTML = '❌ Na verdade, <strong>VIOLA SIM!</strong> Veja: <code>salvarNoBanco()</code> e <code>enviarEmailPromocao()</code> são responsabilidades que <strong>NÃO pertencem</strong> a Produto. Persistência deveria estar em <code>ProdutoRepository</code>. Email deveria estar em <code>EmailService</code>.';
      }
      
      feedbackBox.style.display = 'block';
    });
  });
}

// Initialize activities when DOM is ready
setTimeout(() => {
  initMythActivity();
  initSRPQuizActivity();
}, 100);