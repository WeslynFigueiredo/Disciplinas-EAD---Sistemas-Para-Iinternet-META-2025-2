// Estado do aplicativo
let currentSlide = 1;
const totalSlides = 15;

// Respostas corretas dos quizzes
const correctAnswers = {
    1: 'A'  // Quiz 1: 40/2000 = 2%
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    updateNavigation();
    console.log('🎓 Módulo 4 - Métricas, KPIs e ROI carregado!');
    console.log('📊 Fórmulas matemáticas renderizadas com MathJax');
    console.log('📍 Total de slides: 18');
});

// Navegação entre slides
function changeSlide(direction) {
    const newSlide = currentSlide + direction;

    if (newSlide >= 1 && newSlide <= totalSlides) {
        // Esconder slide atual
        document.getElementById(`slide-${currentSlide}`).classList.remove('active');

        // Mostrar novo slide
        currentSlide = newSlide;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');

        // Atualizar navegação
        updateNavigation();

        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-render MathJax no novo slide (importante!)
        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise();
        }
    }
}

// Mostrar slide específico
function showSlide(slideNumber) {
    // Esconder todos os slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    // Mostrar slide específico
    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        currentSlide = slideNumber;
        updateNavigation();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-render MathJax
        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise();
        }
    }
}

// Atualizar indicadores de navegação
function updateNavigation() {
    const indicators = document.querySelectorAll('.slide-indicator');
    indicators.forEach(indicator => {
        indicator.textContent = `${currentSlide} / ${totalSlides}`;
    });

    // Atualizar estado dos botões
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.textContent.includes('Anterior')) {
            btn.disabled = currentSlide === 1;
        }
        if (btn.textContent.includes('Próximo')) {
            btn.disabled = currentSlide === totalSlides;
        }
    });
}

// Sistema de Quiz
function checkQuiz(questionNumber, answer) {
    const feedbackElement = document.getElementById(`quiz-${questionNumber}`);
    const buttons = document.querySelectorAll(`button[onclick*="checkQuiz(${questionNumber}"]`);

    // Desabilitar todos os botões
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });

    // Verificar resposta
    const isCorrect = answer === correctAnswers[questionNumber];

    if (questionNumber === 1) {
        // Quiz 1: Taxa de Conversão
        if (isCorrect) {
            feedbackElement.innerHTML = '✓ <strong>Correto!</strong> A Taxa de Conversão é calculada como: 40 vendas / 2.000 cliques × 100% = <strong>2%</strong>. Isso significa que de cada 100 cliques, 2 pessoas compraram.';
            feedbackElement.className = 'quiz-feedback show correct';

            // Destacar botão correto
            buttons.forEach(btn => {
                if (btn.textContent.includes(answer)) {
                    btn.style.background = 'rgba(16, 185, 129, 0.3)';
                    btn.style.borderColor = '#10b981';
                }
            });
        } else {
            feedbackElement.innerHTML = `✗ <strong>Incorreto.</strong> A resposta certa é <strong>${correctAnswers[questionNumber]}</strong>. Cálculo: 40 ÷ 2.000 = 0,02 = 2%. Use a fórmula: (Conversões / Oportunidades) × 100%.`;
            feedbackElement.className = 'quiz-feedback show incorrect';

            // Destacar botão incorreto e mostrar o correto
            buttons.forEach(btn => {
                if (btn.textContent.includes(answer)) {
                    btn.style.background = 'rgba(239, 68, 68, 0.3)';
                    btn.style.borderColor = '#ef4444';
                }
                if (btn.textContent.includes(correctAnswers[questionNumber])) {
                    btn.style.background = 'rgba(16, 185, 129, 0.3)';
                    btn.style.borderColor = '#10b981';
                }
            });
        }
    }

    // Animação de feedback
    feedbackElement.style.animation = 'fadeIn 0.4s ease-in-out';
}

// Navegação por teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (event.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Animação suave dos cards do sumário
const summaryCards = document.querySelectorAll('.summary-card');
summaryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Highlight de fórmulas ao passar o mouse (opcional, melhora UX)
document.addEventListener('DOMContentLoaded', function() {
    const formulas = document.querySelectorAll('.formula-display, .calculation');
    formulas.forEach(formula => {
        formula.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        formula.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});