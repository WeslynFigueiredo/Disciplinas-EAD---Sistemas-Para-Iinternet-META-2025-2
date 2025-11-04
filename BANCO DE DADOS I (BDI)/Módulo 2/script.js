// State Management
let currentSlide = 1;
const totalSlides = 24;
let quizAnswered = false;
let gameAnswers = {};
let gameScore = 0;

// Anomaly Game State
let anomalyGameAnswers = {};
let anomalyScore = 0;

// FN Quiz State
let fnQuizAnswers = {};
let fnQuizScore = 0;

// Drag Game State
let dragGameState = {
    PEDIDOS: [],
    PRODUTOS: [],
    ITENS_PEDIDO: [],
    VENDEDORES: []
};
let dragGameCompleted = false;

// Game Questions Data
const gameQuestions = [
    { text: "Cor dos Olhos", answer: "A", feedback: "Correto! É uma CARACTERÍSTICA de uma pessoa" },
    { text: "Funcionário", answer: "E", feedback: "Correto! É um 'OBJETO' do mundo real" },
    { text: "Trabalha em", answer: "R", feedback: "Correto! RELACIONA Funcionário e Departamento" },
    { text: "Data de Admissão", answer: "A", feedback: "Correto! É uma PROPRIEDADE do funcionário" },
    { text: "Compra", answer: "R", feedback: "Correto! RELACIONA Cliente e Produto" },
    { text: "Produto", answer: "E", feedback: "Correto! É algo do MUNDO REAL" }
];

// Anomaly Diagnosis Game Data
const anomalyScenarios = [
    {
        text: "Você trabalha em uma biblioteca. Para cadastrar um novo livro, você PRECISA saber qual cliente o pegou emprestado. Sem essa informação, você não consegue inserir o livro. Qual anomalia é?",
        options: ["Anomalia de Exclusão", "Anomalia de Inserção", "Anomalia de Atualização"],
        correct: 1,
        feedback: "Correto! Esta é uma ANOMALIA DE INSERÇÃO. Você não consegue inserir dados incompletos."
    },
    {
        text: "Você deleta um pedido porque o cliente cancelou. Mas ao fazer isso, você perde também a informação de que 'Pedro Costa' era um vendedor. Qual anomalia é?",
        options: ["Anomalia de Exclusão", "Anomalia de Inserção", "Anomalia de Atualização"],
        correct: 0,
        feedback: "Correto! Esta é uma ANOMALIA DE EXCLUSÃO. Informações importantes foram perdidas."
    },
    {
        text: "O nome de um vendedor 'Maria Silva' aparece em 15 pedidos diferentes. Você precisa mudar para 'Maria Silva Santos'. Se esquecer de atualizar em 1 lugar, os dados ficam inconsistentes. Qual anomalia?",
        options: ["Anomalia de Exclusão", "Anomalia de Inserção", "Anomalia de Atualização"],
        correct: 2,
        feedback: "Correto! Esta é uma ANOMALIA DE ATUALIZAÇÃO. Redundância causa inconsistência."
    },
    {
        text: "Em um sistema de vendas, para registrar um novo cliente, você precisa ter um pedido associado. Qual anomalia?",
        options: ["Anomalia de Inserção", "Anomalia de Exclusão", "Anomalia de Atualização"],
        correct: 0,
        feedback: "Correto! Impossível inserir dados incompletos = ANOMALIA DE INSERÇÃO."
    },
    {
        text: "Quando você deleta um produto que ninguém mais compra, você perde a informação de que aquele fornecedor fornecia esse produto. Qual anomalia?",
        options: ["Anomalia de Exclusão", "Anomalia de Inserção", "Anomalia de Atualização"],
        correct: 0,
        feedback: "Correto! ANOMALIA DE EXCLUSÃO causa perda de informações relacionadas."
    },
    {
        text: "O email de um cliente aparece em 5 registros de compra. Se o cliente mudar de email e você atualizar em 4 lugares mas esquecer 1, qual é o problema?",
        options: ["Anomalia de Exclusão", "Anomalia de Inserção", "Anomalia de Atualização"],
        correct: 2,
        feedback: "Correto! ANOMALIA DE ATUALIZAÇÃO = Inconsistência por redundância."
    }
];

// FN Quiz Data
const fnQuizQuestions = [
    {
        table: "Clientes (ID_Cliente, Nome, Telefones: '(11)98765, (11)3456')",
        question: "Qual Forma Normal está sendo VIOLADA?",
        options: ["1FN", "2FN", "3FN"],
        correct: 0,
        feedback: "Exato! O campo Telefones contém MÚLTIPLOS valores. Viola 1FN (falta atomicidade)."
    },
    {
        table: "Vendas (ID_Pedido, ID_Produto, Nome_Produto, Quantidade) [Chave: ID_Pedido + ID_Produto]",
        question: "Qual Forma Normal está sendo VIOLADA?",
        options: ["1FN", "2FN", "3FN"],
        correct: 1,
        feedback: "Perfeito! Nome_Produto depende APENAS de ID_Produto (parte da chave). É DEPENDÊNCIA PARCIAL = Viola 2FN."
    },
    {
        table: "Pedidos (ID_Pedido, ID_Vendedor, Nome_Vendedor, Data)",
        question: "Nome_Vendedor depende de ID_Vendedor, que depende de ID_Pedido. Qual FN viola?",
        options: ["2FN", "3FN", "1FN"],
        correct: 1,
        feedback: "Correto! ID_Pedido → ID_Vendedor → Nome_Vendedor = DEPENDÊNCIA TRANSITIVA = Viola 3FN."
    },
    {
        table: "Produtos (ID_Produto, Nome, Categoria, Descrição_Categoria) [Chave: ID_Produto]",
        question: "Se Descrição_Categoria depende de Categoria, que depende de ID_Produto. Qual FN?",
        options: ["2FN", "3FN", "1FN"],
        correct: 1,
        feedback: "Excelente! ID_Produto → Categoria → Descrição_Categoria = TRANSITIVA = Viola 3FN."
    }
];

// Drag and Drop Game Data
const dragFields = [
    { id: 'ID_Pedido', correctTable: 'PEDIDOS' },
    { id: 'Data_Pedido', correctTable: 'PEDIDOS' },
    { id: 'ID_Vendedor_P', name: 'ID_Vendedor', correctTable: 'PEDIDOS' },
    { id: 'ID_Produto', correctTable: 'PRODUTOS' },
    { id: 'Nome_Produto', correctTable: 'PRODUTOS' },
    { id: 'Preco', name: 'Preço', correctTable: 'PRODUTOS' },
    { id: 'ID_Pedido_I', name: 'ID_Pedido', correctTable: 'ITENS_PEDIDO' },
    { id: 'ID_Produto_I', name: 'ID_Produto', correctTable: 'ITENS_PEDIDO' },
    { id: 'ID_Vendedor', correctTable: 'VENDEDORES' },
    { id: 'Nome_Vendedor', correctTable: 'VENDEDORES' }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateSlideDisplay();
    setupQuiz();
    generateGameQuestions();
    generateAnomalyGame();
    generateFNQuiz();
    generateDragGame();
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
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data (stored in memory)
        const formData = {
            answer1: document.getElementById('answer1').value,
            answer2: document.getElementById('answer2').value,
            answer3: document.getElementById('answer3').value,
            answer4: document.getElementById('answer4').value,
            answer5: document.getElementById('answer5').value
        };
        
        // Show feedback
        document.getElementById('submissionFeedback').style.display = 'block';
        
        // Scroll to feedback
        document.getElementById('submissionFeedback').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Log to console (for demonstration)
        console.log('Atividade enviada:', formData);
    });
}

// Anomaly Diagnosis Game
function generateAnomalyGame() {
    const container = document.getElementById('anomalyGameContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    anomalyScenarios.forEach((scenario, index) => {
        const scenarioDiv = document.createElement('div');
        scenarioDiv.className = 'game-item';
        scenarioDiv.style.marginBottom = '1.5rem';
        
        const questionText = `<div class="game-question" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1rem;">${index + 1}. ${scenario.text}</div>`;
        const buttonsHTML = scenario.options.map((option, i) => 
            `<button class="game-btn" data-scenario="${index}" data-answer="${i}">${String.fromCharCode(65 + i)}) ${option}</button>`
        ).join('');
        
        scenarioDiv.innerHTML = `
            ${questionText}
            <div class="game-buttons">${buttonsHTML}</div>
            <div class="game-feedback" id="anomaly-feedback-${index}"></div>
        `;
        
        container.appendChild(scenarioDiv);
    });
    
    document.querySelectorAll('#anomalyGameContainer .game-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const scenarioIndex = parseInt(this.dataset.scenario);
            const answer = parseInt(this.dataset.answer);
            const scenario = anomalyScenarios[scenarioIndex];
            
            if (anomalyGameAnswers[scenarioIndex]) return;
            
            const siblings = this.parentElement.querySelectorAll('.game-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            
            const feedback = document.getElementById(`anomaly-feedback-${scenarioIndex}`);
            const isCorrect = answer === scenario.correct;
            
            if (isCorrect) {
                feedback.textContent = '✅ ' + scenario.feedback;
                feedback.className = 'game-feedback correct show';
                anomalyGameAnswers[scenarioIndex] = true;
                anomalyScore++;
                document.getElementById('anomalyScoreNumber').textContent = anomalyScore;
                
                if (anomalyScore === 6) {
                    setTimeout(() => {
                        alert('🎉 Parabéns! Você acertou todos os 6 diagnósticos!');
                    }, 500);
                }
            } else {
                feedback.textContent = '❌ Tente novamente!';
                feedback.className = 'game-feedback incorrect show';
                setTimeout(() => {
                    feedback.classList.remove('show');
                    this.classList.remove('selected');
                }, 1500);
            }
        });
    });
}

// FN Quiz Game
function generateFNQuiz() {
    const container = document.getElementById('fnQuizContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    fnQuizQuestions.forEach((quiz, index) => {
        const quizDiv = document.createElement('div');
        quizDiv.className = 'game-item';
        quizDiv.style.marginBottom = '2rem';
        
        const tableInfo = `<div style="background: rgba(15, 31, 61, 0.6); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 3px solid #f4b41a;">
            <strong>Tabela:</strong> ${quiz.table}
        </div>`;
        const questionText = `<div class="game-question">${index + 1}. ${quiz.question}</div>`;
        const buttonsHTML = quiz.options.map((option, i) => 
            `<button class="game-btn" data-quiz="${index}" data-answer="${i}">${String.fromCharCode(65 + i)}) ${option}</button>`
        ).join('');
        
        quizDiv.innerHTML = `
            ${tableInfo}
            ${questionText}
            <div class="game-buttons">${buttonsHTML}</div>
            <div class="game-feedback" id="fn-feedback-${index}"></div>
        `;
        
        container.appendChild(quizDiv);
    });
    
    document.querySelectorAll('#fnQuizContainer .game-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const quizIndex = parseInt(this.dataset.quiz);
            const answer = parseInt(this.dataset.answer);
            const quiz = fnQuizQuestions[quizIndex];
            
            if (fnQuizAnswers[quizIndex]) return;
            
            const siblings = this.parentElement.querySelectorAll('.game-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            
            const feedback = document.getElementById(`fn-feedback-${quizIndex}`);
            const isCorrect = answer === quiz.correct;
            
            if (isCorrect) {
                feedback.textContent = '✅ ' + quiz.feedback;
                feedback.className = 'game-feedback correct show';
                fnQuizAnswers[quizIndex] = true;
                fnQuizScore++;
                document.getElementById('fnQuizScoreNumber').textContent = fnQuizScore;
                
                if (fnQuizScore === 4) {
                    setTimeout(() => {
                        alert('🎯 Excelente! Você acertou todos os 4 quizzes!');
                    }, 500);
                }
            } else {
                feedback.textContent = '❌ Incorreto. Tente novamente!';
                feedback.className = 'game-feedback incorrect show';
                setTimeout(() => {
                    feedback.classList.remove('show');
                    this.classList.remove('selected');
                }, 1500);
            }
        });
    });
}

// Drag and Drop Decomposition Game
function generateDragGame() {
    const container = document.getElementById('dragGameContainer');
    if (!container) return;
    
    const fieldsHTML = `
        <div style="background: rgba(15, 31, 61, 0.6); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 2px solid rgba(244, 180, 26, 0.3);">
            <div style="font-weight: 700; color: #f4b41a; margin-bottom: 1rem; text-align: center;">Campos Disponíveis (arraste para as tabelas)</div>
            <div id="fieldsPool" style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center;">
                ${dragFields.map(field => 
                    `<div class="drag-field" draggable="true" data-field-id="${field.id}" data-correct="${field.correctTable}">
                        ${field.name || field.id}
                    </div>`
                ).join('')}
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div class="drop-zone" data-table="PEDIDOS">
                <div class="drop-zone-title">PEDIDOS</div>
                <div class="drop-zone-content" id="drop-PEDIDOS"></div>
            </div>
            <div class="drop-zone" data-table="PRODUTOS">
                <div class="drop-zone-title">PRODUTOS</div>
                <div class="drop-zone-content" id="drop-PRODUTOS"></div>
            </div>
            <div class="drop-zone" data-table="ITENS_PEDIDO">
                <div class="drop-zone-title">ITENS_PEDIDO</div>
                <div class="drop-zone-content" id="drop-ITENS_PEDIDO"></div>
            </div>
            <div class="drop-zone" data-table="VENDEDORES">
                <div class="drop-zone-title">VENDEDORES</div>
                <div class="drop-zone-content" id="drop-VENDEDORES"></div>
            </div>
        </div>
    `;
    
    container.innerHTML = fieldsHTML;
    
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const fields = document.querySelectorAll('.drag-field');
    const dropZones = document.querySelectorAll('.drop-zone-content');
    
    fields.forEach(field => {
        field.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('fieldId', this.dataset.fieldId);
            e.dataTransfer.setData('correctTable', this.dataset.correct);
            this.style.opacity = '0.5';
        });
        
        field.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.background = 'rgba(244, 180, 26, 0.2)';
        });
        
        zone.addEventListener('dragleave', function() {
            this.style.background = '';
        });
        
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.background = '';
            
            const fieldId = e.dataTransfer.getData('fieldId');
            const correctTable = e.dataTransfer.getData('correctTable');
            const currentTable = this.id.replace('drop-', '');
            const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`);
            
            if (correctTable === currentTable) {
                fieldElement.style.background = '#48bb78';
                fieldElement.style.border = '2px solid #68d391';
                fieldElement.innerHTML += ' ✅';
                fieldElement.draggable = false;
                this.appendChild(fieldElement);
                
                dragGameState[currentTable].push(fieldId);
                checkDragGameCompletion();
            } else {
                fieldElement.style.background = 'rgba(245, 101, 101, 0.5)';
                setTimeout(() => {
                    fieldElement.style.background = '';
                }, 1000);
            }
        });
    });
}

function checkDragGameCompletion() {
    const totalCorrect = Object.values(dragGameState).reduce((sum, arr) => sum + arr.length, 0);
    if (totalCorrect === 10 && !dragGameCompleted) {
        dragGameCompleted = true;
        document.getElementById('dragSuccessMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('dragSuccessMessage').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}