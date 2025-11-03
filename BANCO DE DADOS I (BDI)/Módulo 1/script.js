// State Management
let currentSlide = 1;
const totalSlides = 17;
let quizAnswered = false;
let gameAnswers = {};
let gameScore = 0;

// Game Questions Data
const gameQuestions = [
    { text: "Cor dos Olhos", answer: "A", feedback: "Correto! É uma CARACTERÍSTICA de uma pessoa" },
    { text: "Funcionário", answer: "E", feedback: "Correto! É um 'OBJETO' do mundo real" },
    { text: "Trabalha em", answer: "R", feedback: "Correto! RELACIONA Funcionário e Departamento" },
    { text: "Data de Admissão", answer: "A", feedback: "Correto! É uma PROPRIEDADE do funcionário" },
    { text: "Compra", answer: "R", feedback: "Correto! RELACIONA Cliente e Produto" },
    { text: "Produto", answer: "E", feedback: "Correto! É algo do MUNDO REAL" }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateSlideDisplay();
    setupQuiz();
    generateGameQuestions();
    setupActivityForm();
    setupKeyboardNavigation();
});

// Slide Navigation
function changeSlide(direction) {
    const newSlide = currentSlide + direction;
    if (newSlide >= 1 && newSlide <= totalSlides) {
        currentSlide = newSlide;
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
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
    
    // Update indicators
    document.getElementById('slideIndicator').textContent = `Slide ${currentSlide} de ${totalSlides}`;
    document.getElementById('progressText').textContent = `Slide ${currentSlide} de ${totalSlides}`;
    
    // Update progress bar
    const progress = (currentSlide / totalSlides) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Keyboard Navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
}

// Quiz Setup
function setupQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            if (quizAnswered) return;
            
            // Mark as selected
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Check answer
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                document.getElementById('quizFeedback').classList.add('show');
                quizAnswered = true;
            } else {
                this.classList.add('incorrect');
                setTimeout(() => {
                    this.classList.remove('selected', 'incorrect');
                }, 1000);
            }
        });
    });
}

// Game Generation
function generateGameQuestions() {
    const container = document.getElementById('gameContainer');
    container.innerHTML = '';
    
    gameQuestions.forEach((q, index) => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <div class="game-question">${index + 1}. ${q.text}</div>
            <div class="game-buttons">
                <button class="game-btn" data-index="${index}" data-answer="E">E - Entidade</button>
                <button class="game-btn" data-index="${index}" data-answer="A">A - Atributo</button>
                <button class="game-btn" data-index="${index}" data-answer="R">R - Relacionamento</button>
            </div>
            <div class="game-feedback" id="feedback-${index}"></div>
        `;
        container.appendChild(gameItem);
    });
    
    // Setup game buttons
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.dataset.index;
            const answer = this.dataset.answer;
            const question = gameQuestions[index];
            
            // If already answered, don't allow re-answering
            if (gameAnswers[index]) return;
            
            // Mark button as selected
            const siblings = this.parentElement.querySelectorAll('.game-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            
            // Check answer
            const feedback = document.getElementById(`feedback-${index}`);
            const isCorrect = answer === question.answer;
            
            if (isCorrect) {
                feedback.textContent = '✅ ' + question.feedback;
                feedback.className = 'game-feedback correct show';
                gameAnswers[index] = true;
                gameScore++;
            } else {
                feedback.textContent = '❌ Tente novamente!';
                feedback.className = 'game-feedback incorrect show';
                setTimeout(() => {
                    feedback.classList.remove('show');
                    this.classList.remove('selected');
                }, 1500);
                return;
            }
            
            // Update score
            document.getElementById('gameScore').textContent = `Pontuação: ${gameScore}/6`;
            
            // Check if all answered
            if (gameScore === 6) {
                setTimeout(() => {
                    alert('🎉 Parabéns! Você completou o Jogo dos Componentes com 100% de acertos!');
                }, 500);
            }
        });
    });
}

// Activity Form Setup
function setupActivityForm() {
    const form = document.getElementById('activityForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data (stored in memory)
        const formData = {
            entity1: document.getElementById('entity1').value,
            attributes1: document.getElementById('attributes1').value,
            entity2: document.getElementById('entity2').value,
            attributes2: document.getElementById('attributes2').value,
            entity3: document.getElementById('entity3').value,
            attributes3: document.getElementById('attributes3').value,
            relationship: document.getElementById('relationship').value,
            justification: document.getElementById('justification').value
        };
        
        // Show feedback
        document.getElementById('submissionFeedback').style.display = 'block';
        
        // Scroll to feedback
        document.getElementById('submissionFeedback').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Log to console (for demonstration)
        console.log('Atividade enviada:', formData);
    });
}

// Helper function to show solution slide
function showSolutionSlide() {
    currentSlide = 13;
    updateSlideDisplay();
}