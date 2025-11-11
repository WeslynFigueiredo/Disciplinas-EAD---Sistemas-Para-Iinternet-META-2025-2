// Estado do aplicativo
let currentSlide = 1;
const totalSlides = 17;

// Respostas corretas dos quizzes
const correctAnswers = {
    1: 'B',  // Quiz 1: "Preciso de vendas amanhã" = Mídia Paga
    2: 'B',  // Quiz 2: "Validar novo produto" = Mídia Paga
    3: 'A'   // Quiz 3: "Tráfego gratuito em 6 meses" = SEO
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    updateNavigation();
    console.log('🎓 Módulo 5 - Growth Marketing e Canais de Aquisição carregado!');
    console.log('📊 Conteúdo estratégico e prático');
    console.log('📍 Total de slides: 20');
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
        // Quiz 1: Preciso de vendas amanhã
        if (isCorrect) {
            feedbackElement.innerHTML = '✓ <strong>Correto!</strong> <strong>Mídia Paga</strong> é a resposta. Você consegue resultados em 24-48 horas. SEO leva meses. Para necessidade imediata, Mídia Paga é ESSENCIAL.';
            feedbackElement.className = 'quiz-feedback show correct';

            buttons.forEach(btn => {
                if (btn.textContent.includes(answer)) {
                    btn.style.background = 'rgba(16, 185, 129, 0.3)';
                    btn.style.borderColor = '#10b981';
                }
            });
        } else {
            feedbackElement.innerHTML = `✗ <strong>Incorreto.</strong> A resposta é <strong>${correctAnswers[questionNumber] === 'B' ? 'Mídia Paga' : 'SEO'}</strong>. Para resultados imediatos, você PRECISA de Mídia Paga. SEO é estratégia de longo prazo.`;
            feedbackElement.className = 'quiz-feedback show incorrect';

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
    } else if (questionNumber === 2) {
        // Quiz 2: Validar novo produto
        if (isCorrect) {
            feedbackElement.innerHTML = '✓ <strong>Correto!</strong> <strong>Mídia Paga</strong> é perfeito para validação. Você testa rápido, segmenta público, e descobre em 1 semana se o produto tem demanda. Depois pode investir em SEO.';
            feedbackElement.className = 'quiz-feedback show correct';

            buttons.forEach(btn => {
                if (btn.textContent.includes(answer)) {
                    btn.style.background = 'rgba(16, 185, 129, 0.3)';
                    btn.style.borderColor = '#10b981';
                }
            });
        } else {
            feedbackElement.innerHTML = `✗ <strong>Incorreto.</strong> A resposta é <strong>${correctAnswers[questionNumber] === 'B' ? 'Mídia Paga' : 'SEO'}</strong>. Para validação rápida, Mídia Paga é ESSENCIAL. SEO não é uma ferramenta de validação, é ferramenta de crescimento a longo prazo.`;
            feedbackElement.className = 'quiz-feedback show incorrect';

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
    } else if (questionNumber === 3) {
        // Quiz 3: Tráfego gratuito em 6 meses
        if (isCorrect) {
            feedbackElement.innerHTML = '✓ <strong>Correto!</strong> <strong>SEO</strong> é a resposta. Em 6 meses de SEO, você consegue tráfego orgânico crescente. Mídia Paga gera tráfego só enquanto paga.';
            feedbackElement.className = 'quiz-feedback show correct';

            buttons.forEach(btn => {
                if (btn.textContent.includes(answer)) {
                    btn.style.background = 'rgba(16, 185, 129, 0.3)';
                    btn.style.borderColor = '#10b981';
                }
            });
        } else {
            feedbackElement.innerHTML = `✗ <strong>Incorreto.</strong> A resposta é <strong>${correctAnswers[questionNumber] === 'A' ? 'SEO' : 'Mídia Paga'}</strong>. SEO é investimento em ativo (constrói tráfego permanente). Mídia Paga é gasto contínuo (sem gasto, sem tráfego).`;
            feedbackElement.className = 'quiz-feedback show incorrect';

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