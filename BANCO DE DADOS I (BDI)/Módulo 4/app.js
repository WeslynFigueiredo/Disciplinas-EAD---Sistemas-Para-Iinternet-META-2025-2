// ============================================
// NAVEGAÇÃO DE SLIDES - PRIORIDADE MÁXIMA
// ============================================

let currentSlide = 1;
const totalSlides = 20;

// Elementos DOM de navegação
let prevBtn = null;
let nextBtn = null;
let slideIndicator = null;
let progressText = null;
let progressBar = null;

// UPDATE Safety Game Data
const updateSafetyQuestions = [
    {
        command: "UPDATE clientes\nSET status = 'Ativo';",
        correct: "Perigoso",
        feedback: "❌ PERIGOSO! Sem WHERE, TODOS os clientes terão status='Ativo', mesmo aqueles que deveriam estar inativos!"
    },
    {
        command: "UPDATE produtos\nSET estoque = estoque + 10\nWHERE id = 15;",
        correct: "Seguro",
        feedback: "✅ SEGURO! O WHERE garante que apenas o produto com id=15 será atualizado."
    },
    {
        command: "UPDATE clientes\nSET email = 'admin@empresa.com';",
        correct: "Perigoso",
        feedback: "❌ PERIGOSO! Sem WHERE, TODOS os clientes teriam o mesmo email! Dados inconsistentes!"
    },
    {
        command: "UPDATE produtos\nSET preco = preco * 0.9\nWHERE categoria = 'Eletrônicos';",
        correct: "Seguro",
        feedback: "✅ SEGURO! Aplica desconto de 10% apenas nos produtos da categoria 'Eletrônicos'."
    },
    {
        command: "UPDATE funcionarios\nSET salario = 10000.00;",
        correct: "Perigoso",
        feedback: "❌ PERIGOSO! TODOS os funcionários teriam o mesmo salário! Sem WHERE é desastre!"
    },
    {
        command: "UPDATE pedidos\nSET status = 'Entregue'\nWHERE data_entrega IS NOT NULL;",
        correct: "Seguro",
        feedback: "✅ SEGURO! Atualiza apenas pedidos que já têm data de entrega (IS NOT NULL)."
    }
];

let updateCurrentQuestion = 0;
let updateScore = 0;

// Quiz Final Data
const quizFinalQuestions = [
    {
        question: "O que acontece se você executar UPDATE sem WHERE?",
        options: ["Erro de sintaxe", "Nada acontece", "TODAS as linhas da tabela são modificadas", "Apenas a primeira linha é modificada"],
        correct: 2
    },
    {
        question: "Qual comando remove TODA a linha de uma tabela?",
        options: ["UPDATE", "SELECT", "DELETE", "DROP"],
        correct: 2
    },
    {
        question: "O que é uma Foreign Key (FK)?",
        options: ["Uma chave primária", "Um campo que aponta para a PK de outra tabela", "Um índice", "Uma constraint de valor único"],
        correct: 1
    },
    {
        question: "Qual a ordem correta para deletar registros com FK?",
        options: ["Deletar pai primeiro", "Deletar filho primeiro", "Tanto faz", "Não é possível deletar"],
        correct: 1
    },
    {
        question: "Qual comando aumenta o preço em 20%?",
        options: ["SET preco = preco + 20", "SET preco = preco * 1.20", "SET preco = preco * 20", "SET preco + 20"],
        correct: 1
    },
    {
        question: "O que significa 'Integridade Referencial'?",
        options: ["Dados não podem ser nulos", "Dados devem ser únicos", "Relações entre tabelas devem ser consistentes", "Tabelas devem ter chave primária"],
        correct: 2
    },
    {
        question: "Qual a melhor prática antes de DELETE?",
        options: ["Fazer backup", "Executar SELECT com o mesmo WHERE", "Usar transação", "Todas as alternativas"],
        correct: 3
    },
    {
        question: "O que o SGBD bloqueia por integridade referencial?",
        options: ["Inserir filho sem pai", "Inserir filho com pai", "Consultar dados", "Atualizar dados"],
        correct: 0
    },
    {
        question: "Qual letra do CRUD representa UPDATE?",
        options: ["C", "R", "U", "D"],
        correct: 2
    },
    {
        question: "DELETE sem WHERE é:",
        options: ["Seguro", "Recomendado", "Catastrófico", "Obrigatório"],
        correct: 2
    }
];

let quizFinalCurrent = 0;
let quizFinalScore = 0;

// ============================================
// INICIALIZAÇÃO PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Carregado - Inicializando aplicação SQL Module');
    
    // PRIORIDADE 1: Inicializar navegação
    initNavigation();
    
    // PRIORIDADE 2: Atualizar display do slide
    updateSlideDisplay();
    
    // PRIORIDADE 3: Setup activity form
    setupActivityForm();
    
    // Setup button event listeners for games
    const updateNextBtn = document.getElementById('update-next-btn');
    if (updateNextBtn) {
        updateNextBtn.addEventListener('click', nextUpdateQuestion);
    }
    
    const quizNextBtn = document.getElementById('quiz-next-btn');
    if (quizNextBtn) {
        quizNextBtn.addEventListener('click', nextQuizFinalQuestion);
    }
    
    console.log('Aplicação inicializada com sucesso!');
});

// ============================================
// NAVEGAÇÃO - FUNÇÕES PRINCIPAIS
// ============================================

function initNavigation() {
    // Capturar elementos DOM
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    slideIndicator = document.getElementById('slideIndicator');
    progressText = document.getElementById('progressText');
    progressBar = document.getElementById('progressBar');
    
    // Event Listeners para botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        console.log('Botão PREV conectado');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('Botão NEXT conectado');
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    console.log('Navegação inicializada');
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
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    
    // Initialize games when their slides are shown
    if (currentSlide === 7) {
        setTimeout(() => initUpdateGame(), 100);
    } else if (currentSlide === 20) {
        setTimeout(() => initQuizFinal(), 100);
    }
    
    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;
    
    // Update indicators
    if (slideIndicator) slideIndicator.textContent = `Slide ${currentSlide} de ${totalSlides}`;
    if (progressText) progressText.textContent = `Slide ${currentSlide} de ${totalSlides}`;
    
    // Update progress bar
    const progress = (currentSlide / totalSlides) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    console.log('Slide atualizado para:', currentSlide);
}

// ========== SLIDE 7: UPDATE SAFETY GAME ==========
function initUpdateGame() {
    updateCurrentQuestion = 0;
    updateScore = 0;
    loadUpdateQuestion();
}

function loadUpdateQuestion() {
    if (updateCurrentQuestion >= updateSafetyQuestions.length) {
        showUpdateFinalScore();
        return;
    }
    
    const question = updateSafetyQuestions[updateCurrentQuestion];
    
    document.getElementById('update-current').textContent = updateCurrentQuestion + 1;
    document.getElementById('update-score').textContent = updateScore;
    
    document.getElementById('update-scenario').innerHTML = `<pre style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 5px;"><code>${question.command}</code></pre>`;
    
    const optionsHTML = `
        <button class="option-btn" onclick="checkUpdateAnswer('Seguro')">Seguro</button>
        <button class="option-btn" onclick="checkUpdateAnswer('Perigoso')">Perigoso</button>
    `;
    
    document.getElementById('update-options').innerHTML = optionsHTML;
    document.getElementById('update-feedback').style.display = 'none';
    document.getElementById('update-next-btn').style.display = 'none';
}

function checkUpdateAnswer(selected) {
    const question = updateSafetyQuestions[updateCurrentQuestion];
    const feedbackEl = document.getElementById('update-feedback');
    
    if (selected === question.correct) {
        updateScore++;
        document.getElementById('update-score').textContent = updateScore;
        feedbackEl.innerHTML = `<p class="correct">${question.feedback}</p>`;
    } else {
        feedbackEl.innerHTML = `<p class="incorrect">❌ Tente novamente. Analise se há WHERE no comando.</p>`;
        setTimeout(() => {
            feedbackEl.style.display = 'none';
            document.querySelectorAll('#update-options .option-btn').forEach(btn => btn.disabled = false);
        }, 1500);
        return;
    }
    
    feedbackEl.style.display = 'block';
    document.getElementById('update-next-btn').style.display = 'block';
    document.querySelectorAll('#update-options .option-btn').forEach(btn => btn.disabled = true);
}

function nextUpdateQuestion() {
    updateCurrentQuestion++;
    loadUpdateQuestion();
}

function showUpdateFinalScore() {
    const finalEl = document.getElementById('update-final');
    const percentage = Math.round((updateScore / updateSafetyQuestions.length) * 100);
    
    finalEl.innerHTML = `
        <h3>🎉 Jogo Completo!</h3>
        <p class="big-score">Você acertou ${updateScore} de ${updateSafetyQuestions.length} questões</p>
        <p>Sua pontuação: ${percentage}%</p>
        ${percentage >= 80 ? '<p class="excellent">Excelente! Você entende a importância do WHERE!</p>' : ''}
    `;
    
    document.getElementById('update-scenario').style.display = 'none';
    document.getElementById('update-options').style.display = 'none';
    document.getElementById('update-feedback').style.display = 'none';
    document.getElementById('update-next-btn').style.display = 'none';
    finalEl.style.display = 'block';
}

// ========== SLIDE 22: QUIZ FINAL ==========
function initQuizFinal() {
    quizFinalCurrent = 0;
    quizFinalScore = 0;
    loadQuizFinalQuestion();
}

function loadQuizFinalQuestion() {
    if (quizFinalCurrent >= quizFinalQuestions.length) {
        showQuizFinalScore();
        return;
    }
    
    const question = quizFinalQuestions[quizFinalCurrent];
    
    document.getElementById('quiz-current').textContent = quizFinalCurrent + 1;
    document.getElementById('quiz-score').textContent = quizFinalScore;
    
    document.getElementById('quiz-question').innerHTML = `<p style="font-size: 1.15rem; font-weight: 600;">${quizFinalCurrent + 1}. ${question.question}</p>`;
    
    const optionsHTML = question.options.map((option, index) => 
        `<button class="option-btn" onclick="checkQuizFinalAnswer(${index})">${String.fromCharCode(65 + index)}) ${option}</button>`
    ).join('');
    
    document.getElementById('quiz-options').innerHTML = optionsHTML;
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-next-btn').style.display = 'none';
}

function checkQuizFinalAnswer(selected) {
    const question = quizFinalQuestions[quizFinalCurrent];
    const feedbackEl = document.getElementById('quiz-feedback');
    
    if (selected === question.correct) {
        quizFinalScore++;
        document.getElementById('quiz-score').textContent = quizFinalScore;
        feedbackEl.innerHTML = `<p class="correct">✅ Correto!</p>`;
    } else {
        feedbackEl.innerHTML = `<p class="incorrect">❌ Incorreto. A resposta correta era: ${String.fromCharCode(65 + question.correct)}) ${question.options[question.correct]}</p>`;
    }
    
    feedbackEl.style.display = 'block';
    document.getElementById('quiz-next-btn').style.display = 'block';
    document.querySelectorAll('#quiz-options .option-btn').forEach(btn => btn.disabled = true);
}

function nextQuizFinalQuestion() {
    quizFinalCurrent++;
    loadQuizFinalQuestion();
}

function showQuizFinalScore() {
    const finalEl = document.getElementById('quiz-final');
    const percentage = Math.round((quizFinalScore / quizFinalQuestions.length) * 100);
    
    finalEl.innerHTML = `
        <h3>🎉 Quiz Final Completo!</h3>
        <p class="big-score">Você acertou ${quizFinalScore} de ${quizFinalQuestions.length} questões</p>
        <p>Sua pontuação: ${percentage}%</p>
        ${percentage >= 70 ? '<p class="excellent">Parabéns! Você domina DML Avançado!</p>' : '<p>Continue praticando para dominar os conceitos!</p>'}
    `;
    
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-options').style.display = 'none';
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-next-btn').style.display = 'none';
    finalEl.style.display = 'block';
}

// Activity Form Setup
function setupActivityForm() {
    const form = document.getElementById('activityForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data (stored in memory - no localStorage)
        const formData = {
            answer1: document.getElementById('answer1').value,
            answer2: document.getElementById('answer2').value
        };
        
        // Show feedback
        document.getElementById('submissionFeedback').style.display = 'block';
        
        // Scroll to feedback
        document.getElementById('submissionFeedback').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Log to console (for demonstration)
        console.log('Atividade enviada:', formData);
    });
}