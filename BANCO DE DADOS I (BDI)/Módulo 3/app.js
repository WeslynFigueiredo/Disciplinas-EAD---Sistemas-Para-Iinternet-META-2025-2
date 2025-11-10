// ============================================
// NAVEGAÇÃO DE SLIDES - PRIORIDADE MÁXIMA
// ============================================

let currentSlide = 1;
const totalSlides = 18;

// Elementos DOM de navegação
let prevBtn = null;
let nextBtn = null;
let slideIndicator = null;
let progressText = null;
let progressBar = null;

// DDL/DML Game Data
const ddlDmlQuestions = [
    {
        command: "ALTER TABLE",
        correct: "DDL",
        feedback: "Correto! ALTER TABLE modifica a ESTRUTURA da tabela. É DDL."
    },
    {
        command: "SELECT",
        correct: "DML",
        feedback: "Correto! SELECT consulta DADOS. É DML."
    },
    {
        command: "INSERT INTO",
        correct: "DML",
        feedback: "Correto! INSERT adiciona DADOS na tabela. É DML."
    },
    {
        command: "DROP TABLE",
        correct: "DDL",
        feedback: "Correto! DROP TABLE remove a ESTRUTURA da tabela. É DDL."
    },
    {
        command: "UPDATE",
        correct: "DML",
        feedback: "Correto! UPDATE modifica DADOS existentes. É DML."
    },
    {
        command: "CREATE TABLE",
        correct: "DDL",
        feedback: "Correto! CREATE TABLE cria a ESTRUTURA da tabela. É DDL."
    },
    {
        command: "DELETE",
        correct: "DML",
        feedback: "Correto! DELETE remove DADOS da tabela. É DML."
    },
    {
        command: "CREATE INDEX",
        correct: "DDL",
        feedback: "Correto! CREATE INDEX cria uma ESTRUTURA de índice. É DDL."
    }
];

let ddlCurrentQuestion = 0;
let ddlScore = 0;

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
    const ddlNextBtn = document.getElementById('ddl-next-btn');
    if (ddlNextBtn) {
        ddlNextBtn.addEventListener('click', nextDdlQuestion);
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
    if (currentSlide === 5) {
        setTimeout(() => initDdlDmlGame(), 100);
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

// ========== SLIDE 5: DDL/DML GAME ==========
function initDdlDmlGame() {
    ddlCurrentQuestion = 0;
    ddlScore = 0;
    loadDdlQuestion();
}

function loadDdlQuestion() {
    if (ddlCurrentQuestion >= ddlDmlQuestions.length) {
        showDdlFinalScore();
        return;
    }
    
    const question = ddlDmlQuestions[ddlCurrentQuestion];
    
    document.getElementById('ddl-current').textContent = ddlCurrentQuestion + 1;
    document.getElementById('ddl-score').textContent = ddlScore;
    
    document.getElementById('ddl-scenario').innerHTML = `<p style="font-size: 1.3rem; font-weight: 600; color: #ffd700;">Comando: <code style="background: rgba(244, 180, 26, 0.2); padding: 0.5rem 1rem; border-radius: 5px;">${question.command}</code></p>`;
    
    const optionsHTML = `
        <button class="option-btn" onclick="checkDdlAnswer('DDL')">DDL</button>
        <button class="option-btn" onclick="checkDdlAnswer('DML')">DML</button>
    `;
    
    document.getElementById('ddl-options').innerHTML = optionsHTML;
    document.getElementById('ddl-feedback').style.display = 'none';
    document.getElementById('ddl-next-btn').style.display = 'none';
}

function checkDdlAnswer(selected) {
    const question = ddlDmlQuestions[ddlCurrentQuestion];
    const feedbackEl = document.getElementById('ddl-feedback');
    
    if (selected === question.correct) {
        ddlScore++;
        document.getElementById('ddl-score').textContent = ddlScore;
        feedbackEl.innerHTML = `<p class="correct">✅ ${question.feedback}</p>`;
    } else {
        feedbackEl.innerHTML = `<p class="incorrect">❌ Incorreto. A resposta correta era: ${question.correct}</p>`;
    }
    
    feedbackEl.style.display = 'block';
    document.getElementById('ddl-next-btn').style.display = 'block';
    
    // Disable all buttons
    document.querySelectorAll('#ddl-options .option-btn').forEach(btn => btn.disabled = true);
}

function nextDdlQuestion() {
    ddlCurrentQuestion++;
    loadDdlQuestion();
}

function showDdlFinalScore() {
    const finalEl = document.getElementById('ddl-final');
    const percentage = Math.round((ddlScore / ddlDmlQuestions.length) * 100);
    
    finalEl.innerHTML = `
        <h3>🎉 Jogo Completo!</h3>
        <p class="big-score">Você acertou ${ddlScore} de ${ddlDmlQuestions.length} questões</p>
        <p>Sua pontuação: ${percentage}%</p>
        ${percentage >= 75 ? '<p class="excellent">Excelente! Você entende DDL e DML!</p>' : ''}
    `;
    
    document.getElementById('ddl-scenario').style.display = 'none';
    document.getElementById('ddl-options').style.display = 'none';
    document.getElementById('ddl-feedback').style.display = 'none';
    document.getElementById('ddl-next-btn').style.display = 'none';
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