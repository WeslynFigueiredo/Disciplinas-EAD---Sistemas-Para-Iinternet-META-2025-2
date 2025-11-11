// Navigation for Module 5 - Transactions and ACID
let currentSlide = 1;
const totalSlides = 18;

// DOM Elements
let prevBtn = null;
let nextBtn = null;
let slideIndicator = null;
let progressText = null;
let progressBar = null;

// Game State
let gameACIDCurrent = 0;
let gameACIDScore = 0;

// Game Questions
const gameACIDQuestions = [
    {
        scenario: "Uma transação falhou no meio. Como garantir que NENHUMA operação seja mantida?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 0,
        feedback: "✅ Correto! Atomicidade garante 'tudo ou nada'. ROLLBACK desfaz todas as operações."
    },
    {
        scenario: "Após um COMMIT, houve falta de energia. Como garantir que os dados não sejam perdidos?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 3,
        feedback: "✅ Correto! Durabilidade garante que dados confirmados sejam gravados permanentemente em disco."
    },
    {
        scenario: "Duas transações tentam modificar o mesmo registro ao mesmo tempo. Como evitar conflito?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 2,
        feedback: "✅ Correto! Isolamento garante que transações simultâneas não interfiram uma na outra."
    },
    {
        scenario: "Uma transação tenta inserir um registro com chave primária duplicada. Como o sistema rejeita?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 1,
        feedback: "✅ Correto! Consistência garante que todas as regras (constraints) sejam respeitadas."
    },
    {
        scenario: "Qual propriedade garante que a exclusão de um registro seja permanente?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 3,
        feedback: "✅ Correto! Durabilidade mantém as mudanças permanentemente após COMMIT."
    },
    {
        scenario: "Uma transação com 10 operações falha na 8ª. Como garantir que as 7 primeiras sejam desfeitas?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 0,
        feedback: "✅ Correto! Atomicidade = tudo ou nada. ROLLBACK desfaz TODAS as operações."
    },
    {
        scenario: "Como garantir que um saldo nunca fique negativo (violação de check constraint)?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 1,
        feedback: "✅ Correto! Consistência valida todas as regras de negócio."
    },
    {
        scenario: "Duas pessoas agendando a mesma sala ao mesmo tempo. Como evitar conflito?",
        options: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"],
        correct: 2,
        feedback: "✅ Correto! Isolamento usa locks para que apenas UMA transação por vez modifique o registro."
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Module 5 - Transactions and ACID initialized');
    initNavigation();
    updateSlideDisplay();
    setupActivityForm();
});

function initNavigation() {
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    slideIndicator = document.getElementById('slideIndicator');
    progressText = document.getElementById('progressText');
    progressBar = document.getElementById('progressBar');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        else if (e.key === 'ArrowRight') nextSlide();
    });
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlideDisplay();
    }
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlideDisplay();
    }
}

function updateSlideDisplay() {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    
    // Initialize games when their slides are shown
    if (currentSlide === 10) {
        setTimeout(() => initGameACID(), 100);
    }
    
    // Update navigation
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;
    
    // Update indicators
    if (slideIndicator) slideIndicator.textContent = `Slide ${currentSlide} de ${totalSlides}`;
    if (progressText) progressText.textContent = `Slide ${currentSlide} de ${totalSlides}`;
    
    // Update progress bar
    const progress = (currentSlide / totalSlides) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;
    
    window.scrollTo(0, 0);
}

// Game ACID
function initGameACID() {
    gameACIDCurrent = 0;
    gameACIDScore = 0;
    loadGameACIDQuestion();
}

function loadGameACIDQuestion() {
    if (gameACIDCurrent >= gameACIDQuestions.length) {
        showGameACIDFinalScore();
        return;
    }
    
    const question = gameACIDQuestions[gameACIDCurrent];
    
    document.getElementById('game-acid-current').textContent = gameACIDCurrent + 1;
    document.getElementById('game-acid-score').textContent = gameACIDScore;
    
    document.getElementById('game-acid-scenario').innerHTML = `<p style="font-size: 1.05rem;">${question.scenario}</p>`;
    
    const optionsHTML = question.options.map((option, index) => 
        `<button class="option-btn" onclick="checkGameACIDAnswer(${index})">${option}</button>`
    ).join('');
    
    document.getElementById('game-acid-options').innerHTML = optionsHTML;
    document.getElementById('game-acid-feedback').style.display = 'none';
    document.getElementById('game-acid-next-btn').style.display = 'none';
}

function checkGameACIDAnswer(selected) {
    const question = gameACIDQuestions[gameACIDCurrent];
    const feedbackEl = document.getElementById('game-acid-feedback');
    
    if (selected === question.correct) {
        gameACIDScore++;
        document.getElementById('game-acid-score').textContent = gameACIDScore;
        feedbackEl.innerHTML = `<p class="correct">${question.feedback}</p>`;
    } else {
        feedbackEl.innerHTML = `<p class="incorrect">❌ Incorreto. A resposta correta é: ${question.options[question.correct]}</p>`;
    }
    
    feedbackEl.style.display = 'block';
    document.getElementById('game-acid-next-btn').style.display = 'block';
    document.querySelectorAll('#game-acid-options .option-btn').forEach(btn => btn.disabled = true);
}

function nextGameACIDQuestion() {
    gameACIDCurrent++;
    loadGameACIDQuestion();
}

function showGameACIDFinalScore() {
    const finalEl = document.getElementById('game-acid-final');
    const percentage = Math.round((gameACIDScore / gameACIDQuestions.length) * 100);
    
    finalEl.innerHTML = `
        <h3>🎉 Jogo Completo!</h3>
        <p class="big-score">Você acertou ${gameACIDScore} de ${gameACIDQuestions.length} questões</p>
        <p>Sua pontuação: ${percentage}%</p>
        ${percentage >= 75 ? '<p class="excellent">Excelente! Você domina as propriedades ACID!</p>' : ''}
    `;
    
    document.getElementById('game-acid-scenario').style.display = 'none';
    document.getElementById('game-acid-options').style.display = 'none';
    document.getElementById('game-acid-feedback').style.display = 'none';
    document.getElementById('game-acid-next-btn').style.display = 'none';
    finalEl.style.display = 'block';
}

// Activity Form
function setupActivityForm() {
    const form = document.getElementById('activityForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Display feedback
        document.getElementById('submissionFeedback').style.display = 'block';
        document.getElementById('submissionFeedback').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}
