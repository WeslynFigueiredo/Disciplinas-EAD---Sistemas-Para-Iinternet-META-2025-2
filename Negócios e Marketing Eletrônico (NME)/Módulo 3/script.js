// Estado do aplicativo
let currentSlide = 1;
const totalSlides = 20;

// Respostas corretas dos quizzes
const correctAnswers = {
    1: 'A',  // Quiz 1: "o que é SEO?" = Topo (descoberta)
    2: 'B'   // Quiz 2: Comparativo de cursos = Meio (consideração)
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    updateNavigation();
    console.log('🎓 Módulo 3 - Marketing de Conteúdo e Funil de Vendas carregado!');
    console.log('📚 Use as setas ou teclas do teclado para navegar');
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
        // Quiz 1: "o que é SEO?"
        if (isCorrect) {
            feedbackElement.innerHTML = '✓ <strong>Correto!</strong> A pessoa está apenas descobrindo o que é SEO, não tem intenção de compra ainda. Está no <strong>Topo do Funil</strong> (fase de aprendizado).';
            feedbackElement.className = 'quiz-feedback show correct';

            // Destacar botão correto
            buttons.forEach(btn => {
                if (btn.textContent.includes(answer)) {
                    btn.style.background = 'rgba(16, 185, 129, 0.3)';
                    btn.style.borderColor = '#10b981';
                }
            });
        } else {
            feedbackElement.innerHTML = `✗ <strong>Incorreto.</strong> A resposta certa é <strong>${correctAnswers[questionNumber]}</strong>. Quando alguém pesquisa "o que é SEO?", está apenas começando a aprender. Não está comparando soluções (Meio) nem decidindo comprar (Fundo). Está no <strong>Topo do Funil</strong>.`;
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
    } else if (questionNumber === 2) {
        // Quiz 2: Comparativo de cursos
        if (isCorrect) {
            feedbackElement.innerHTML = '✓ <strong>Correto!</strong> Um comparativo "5 Melhores Cursos Python 2024" é para quem já reconheceu que precisa aprender Python e está <strong>comparando opções</strong> (soluções). Isso é <strong>Meio do Funil</strong>.';
            feedbackElement.className = 'quiz-feedback show correct';

            // Destacar botão correto
            buttons.forEach(btn => {
                if (btn.textContent.includes(answer)) {
                    btn.style.background = 'rgba(16, 185, 129, 0.3)';
                    btn.style.borderColor = '#10b981';
                }
            });
        } else {
            feedbackElement.innerHTML = `✗ <strong>Incorreto.</strong> A resposta certa é <strong>${correctAnswers[questionNumber]}</strong>. Comparativos são para quem já sabe que tem um problema e está <strong>pesquisando soluções</strong>. Não é Topo (ainda não sabe do problema) nem Fundo (já decidiu qual curso). É <strong>Meio do Funil</strong>.`;
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