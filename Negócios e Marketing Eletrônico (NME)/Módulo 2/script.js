let currentSlide = 1;
const totalSlides = 15;
let personaQuizAnswered = false; // Variável não utilizada no HTML fornecido, mas mantida para consistência.
let contentQuizAnswered = false;

function updateSlideDisplay() {
    // Hide all slides
    for (let i = 1; i <= totalSlides; i++) {
        const slide = document.getElementById('slide' + i);
        if (slide) {
            slide.classList.remove('active');
        }
    }

    // Show current slide
    const currentSlideElement = document.getElementById('slide' + currentSlide);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }

    // Update navigation
    document.getElementById('slideCounter').textContent = `Slide ${currentSlide} de ${totalSlides}`;
    document.getElementById('progressIndicator').textContent = `Slide ${currentSlide} de ${totalSlides}`;
    
    // Update progress bar
    const progressPercent = (currentSlide / totalSlides) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progressPercent + '%';
    }

    // Update button states
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlideDisplay();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlideDisplay();
    }
}

function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        updateSlideDisplay();
    }
}

// Nota: A função checkPersonaQuiz não é chamada em nenhum botão do HTML fornecido, 
// mas é mantida aqui para a lógica completa.
function checkPersonaQuiz(selectedAnswer, button) {
    if (personaQuizAnswered) return;
    
    const feedback = document.getElementById('feedbackPersona');
    const allButtons = button.parentElement.querySelectorAll('.quiz-option');

    // Disable all buttons
    allButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
    });

    // Show feedback
    feedback.classList.add('show');

    if (selectedAnswer === 'B') {
        button.classList.add('correct');
        feedback.textContent = '✓ Correto! A opção B tem especificidade e humanização - um nome, idade, profissão e comportamentos específicos. Isso é uma PERSONA!';
        feedback.classList.add('correct');
        feedback.style.background = '#c6f6d5';
        feedback.style.color = '#22543d';
        feedback.style.padding = '15px';
        feedback.style.borderRadius = 'var(--radius-base)';
    } else {
        button.classList.add('incorrect');
        feedback.textContent = '✗ Incorreto. A resposta correta é B - tem especificidade e humanização!';
        feedback.classList.add('incorrect');
        feedback.style.background = '#fed7d7';
        feedback.style.color = '#742a2a';
        feedback.style.padding = '15px';
        feedback.style.borderRadius = 'var(--radius-base)';
        
        // Show correct answer
        allButtons.forEach(btn => {
            if (btn.textContent.includes('Carlos')) {
                btn.classList.add('correct');
            }
        });
    }

    personaQuizAnswered = true;
}

function checkContentQuiz(selectedAnswer, button) {
    if (contentQuizAnswered) return;
    
    const feedback = document.getElementById('feedbackContent');
    const allButtons = button.parentElement.querySelectorAll('.quiz-option');

    // Disable all buttons
    allButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
    });

    // Show feedback
    feedback.classList.add('show');

    if (selectedAnswer === 'C') {
        button.classList.add('correct');
        feedback.textContent = '✓ Correto! Na Decisão, o cliente quer PROVAS de que sua solução funciona - depoimentos, cases e resultados reais são essenciais!';
        feedback.classList.add('correct');
        feedback.style.background = '#c6f6d5';
        feedback.style.color = '#22543d';
        feedback.style.padding = '15px';
        feedback.style.borderRadius = 'var(--radius-base)';
        feedback.style.fontWeight = '500';
    } else {
        button.classList.add('incorrect');
        let correctExplanation = '';
        if (selectedAnswer === 'A') {
            correctExplanation = 'Post sobre tendências é para DESCOBERTA.';
        } else if (selectedAnswer === 'B') {
            correctExplanation = 'Infográfico "O que é" é para DESCOBERTA.';
        } else if (selectedAnswer === 'D') {
            correctExplanation = 'E-book completo é para RECONHECIMENTO.';
        }
        feedback.textContent = '✗ Incorreto. ' + correctExplanation + ' A resposta correta é C - Depoimento em vídeo!';
        feedback.classList.add('incorrect');
        feedback.style.background = '#fed7d7';
        feedback.style.color = '#742a2a';
        feedback.style.padding = '15px';
        feedback.style.borderRadius = 'var(--radius-base)';
        feedback.style.fontWeight = '500';
        
        // Show correct answer
        allButtons.forEach(btn => {
            if (btn.textContent.includes('Depoimento')) {
                btn.classList.add('correct');
            }
        });
    }

    contentQuizAnswered = true;
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
});

// Initialize
// Garante que o script seja executado após o carregamento do DOM
document.addEventListener('DOMContentLoaded', updateSlideDisplay);