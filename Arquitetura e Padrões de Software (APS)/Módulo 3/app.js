// State management using JavaScript variables (no localStorage)
let currentSlideIndex = 1;
const totalSlides = 25;

// Activity scores
let activityScores = {
  activity1: null, // What are patterns quiz
  activity2: 0,    // Mini-classifier (3 scenarios)
  activity3: null, // Factory Method code
  activity4: null  // Singleton code
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
        // Map TOC cards to starting slides for Module 3
        const startingSlides = [3, 5, 8, 11];
        goToSlide(startingSlides[index]);
    });
});

// Initialize the presentation
init();

// ========================================
// INTERACTIVE ACTIVITIES - MODULE 3
// ========================================

// Activity #1: What are Design Patterns quiz
function initActivity1() {
  const options = document.querySelectorAll('[data-activity="1"]');
  
  options.forEach(option => {
    option.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      const isCorrect = this.dataset.correct === 'true';
      const feedbackBox = document.getElementById('activity1-feedback');
      
      // Disable all options
      options.forEach(opt => opt.classList.add('disabled'));
      
      // Mark selected
      if (isCorrect) {
        this.classList.add('correct');
        activityScores.activity1 = 1;
        feedbackBox.className = 'feedback-box success';
        feedbackBox.innerHTML = '🎯 CORRETO! Padrões são MODELOS, não código pronto. Você implementa o padrão adaptando à sua linguagem e contexto. É como uma receita de bolo: você ainda precisa "cozinhar"!';
      } else {
        this.classList.add('incorrect');
        activityScores.activity1 = 0;
        feedbackBox.className = 'feedback-box error';
        feedbackBox.innerHTML = '❌ Não é bem assim! Lembre-se da analogia da RECEITA vs BOLO PRONTO. Padrões são RECEITAS (modelos), não código pronto. Revise o slide 4!';
      }
      
      feedbackBox.style.display = 'block';
      updateScoreDisplay();
    });
  });
}

// Activity #2: Mini-Classifier (3 scenarios)
function initActivity2() {
  const classifierButtons = document.querySelectorAll('.classifier-btn');
  let scenariosAnswered = {1: false, 2: false, 3: false};
  let scenariosCorrect = {1: false, 2: false, 3: false};
  
  const explanations = {
    1: {
      correct: '✅ Trata da CRIAÇÃO controlada de objetos (Singleton)',
      incorrect: '❌ Este é um problema de CRIAÇÃO de objetos. Singleton garante uma única instância.'
    },
    2: {
      correct: '✅ Trata da COMPOSIÇÃO/ESTRUTURA (Adapter)',
      incorrect: '❌ Este é um problema ESTRUTURAL. Adapter faz interfaces diferentes trabalharem juntas.'
    },
    3: {
      correct: '✅ Trata da COMUNICAÇÃO entre objetos (Observer)',
      incorrect: '❌ Este é um problema COMPORTAMENTAL. Observer lida com notificação de múltiplos objetos.'
    }
  };
  
  classifierButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      const scenario = this.dataset.scenario;
      const isCorrect = this.dataset.correct === 'true';
      const feedbackBox = document.getElementById(`scenario${scenario}-feedback`);
      
      // Disable buttons for this scenario
      const siblingButtons = this.closest('.classifier-options').querySelectorAll('.classifier-btn');
      siblingButtons.forEach(btn => btn.classList.add('disabled'));
      
      // Mark answer
      if (isCorrect) {
        this.classList.add('selected-correct');
        scenariosCorrect[scenario] = true;
        feedbackBox.className = 'scenario-feedback correct';
        feedbackBox.innerHTML = explanations[scenario].correct;
      } else {
        this.classList.add('selected-incorrect');
        scenariosCorrect[scenario] = false;
        feedbackBox.className = 'scenario-feedback incorrect';
        feedbackBox.innerHTML = explanations[scenario].incorrect;
      }
      
      scenariosAnswered[scenario] = true;
      feedbackBox.style.display = 'block';
      
      // Check if all scenarios answered
      if (scenariosAnswered[1] && scenariosAnswered[2] && scenariosAnswered[3]) {
        const correctCount = Object.values(scenariosCorrect).filter(v => v).length;
        activityScores.activity2 = correctCount;
        updateScoreDisplay();
      }
    });
  });
}

// Activity #3: Factory Method code identification
function initActivity3_old() {
  const draggableCards = document.querySelectorAll('.drag-card');
  const dropZones = document.querySelectorAll('.drop-zone');
  let draggedElement = null;
  
  // Shuffle cards initially
  const container = document.getElementById('draggable-cards');
  const cards = Array.from(draggableCards);
  cards.sort(() => Math.random() - 0.5);
  cards.forEach(card => container.appendChild(card));
  
  draggableCards.forEach(card => {
    card.addEventListener('dragstart', function() {
      draggedElement = this;
      this.classList.add('dragging');
    });
    
    card.addEventListener('dragend', function() {
      this.classList.remove('dragging');
    });
  });
  
  dropZones.forEach(zone => {
    zone.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.classList.add('drag-over');
    });
    
    zone.addEventListener('dragleave', function() {
      this.classList.remove('drag-over');
    });
    
    zone.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('drag-over');
      
      // Remove existing card if any
      const existingCard = this.querySelector('.drag-card');
      if (existingCard) {
        container.appendChild(existingCard);
      }
      
      // Add new card
      this.appendChild(draggedElement);
      this.classList.add('filled');
    });
  });
  
  // Verify button
  document.getElementById('verify-activity2').addEventListener('click', function() {
    let correct = true;
    dropZones.forEach(zone => {
      const card = zone.querySelector('.drag-card');
      if (!card || card.dataset.correctPosition !== zone.dataset.position) {
        correct = false;
      }
    });
    
    const feedbackBox = document.getElementById('activity2-feedback');
    
    if (correct) {
      activityScores.activity2 = 1;
      feedbackBox.className = 'feedback-box success';
      feedbackBox.innerHTML = '🎉 PERFEITO! Você entendeu o modelo Request/Response! Cliente → Requisição → Servidor processa → Resposta → Cliente. Essa é a base de TODA aplicação web!';
    } else {
      activityScores.activity2 = 0;
      feedbackBox.className = 'feedback-box error';
      feedbackBox.innerHTML = '🤔 Quase lá! Lembre-se: Cliente sempre INICIA (requisição), Servidor sempre PROCESSA (no meio), Cliente sempre FINALIZA (recebe resposta). Tente novamente!';
    }
    
    feedbackBox.style.display = 'block';
    updateScoreDisplay();
  });
  
  // Reset button
  document.getElementById('reset-activity2').addEventListener('click', function() {
    draggableCards.forEach(card => container.appendChild(card));
    dropZones.forEach(zone => zone.classList.remove('filled'));
    document.getElementById('activity2-feedback').style.display = 'none';
    
    // Shuffle again
    const cards = Array.from(draggableCards);
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => container.appendChild(card));
  });
}

// Activity #3: Factory Method code quiz
function initActivity3() {
  const options = document.querySelectorAll('[data-activity="3"]');
  
  options.forEach(option => {
    option.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      const isCorrect = this.dataset.correct === 'true';
      const feedbackBox = document.getElementById('activity3-feedback');
      
      // Disable all options
      options.forEach(opt => opt.classList.add('disabled'));
      
      // Mark selected
      if (isCorrect) {
        this.classList.add('correct');
        activityScores.activity3 = 1;
        feedbackBox.className = 'feedback-box success';
        feedbackBox.innerHTML = '✅ PERFEITO! Esta é a estrutura correta do Factory Method. O método createNotification() é abstrato e as subclasses decidem qual notificação criar!';
      } else {
        this.classList.add('incorrect');
        activityScores.activity3 = 0;
        feedbackBox.className = 'feedback-box error';
        feedbackBox.innerHTML = '❌ Opção A usa if/else diretamente (não é Factory Method). Opção C não usa herança nem delega às subclasses. Revise o slide 14!';
      }
      
      feedbackBox.style.display = 'block';
      updateScoreDisplay();
    });
  });
}

// Activity #4: Singleton code identification
function initActivity4_old() {
  document.getElementById('verify-activity3').addEventListener('click', function() {
    const services = document.querySelectorAll('.selectable-service');
    let correct = true;
    let correctCount = 0;
    let totalEssential = 0;
    
    services.forEach(service => {
      const checkbox = service.querySelector('.service-checkbox');
      const isEssential = service.dataset.essential === 'true';
      const isChecked = checkbox.checked;
      
      if (isEssential) totalEssential++;
      
      if (isEssential && isChecked) {
        correctCount++;
      } else if (!isEssential && isChecked) {
        correct = false;
      } else if (isEssential && !isChecked) {
        correct = false;
      }
    });
    
    const feedbackBox = document.getElementById('activity3-feedback');
    
    // Allow partial credit if only Analytics is wrong
    if (correctCount >= 5 && !document.getElementById('service7').checked) {
      activityScores.activity3 = 1;
      feedbackBox.className = 'feedback-box success';
      feedbackBox.innerHTML = '🎯 EXCELENTE! Você entendeu a DECOMPOSIÇÃO em microsserviços! Cada serviço tem UMA responsabilidade específica. Note que "Análise de Dados" é útil mas não ESSENCIAL para funcionamento básico. E-commerce não tem relação com chat!';
    } else {
      activityScores.activity3 = 0;
      feedbackBox.className = 'feedback-box error';
      feedbackBox.innerHTML = '💡 Pense no MÍNIMO necessário para um chat funcionar: autenticação, enviar/receber mensagens, guardar histórico, notificar usuários, ver quem está online, enviar arquivos. Evite serviços que não fazem parte do domínio "Chat"!';
    }
    
    feedbackBox.style.display = 'block';
    updateScoreDisplay();
  });
}

// Activity #4: Singleton code quiz
function initActivity4() {
  const options = document.querySelectorAll('[data-activity="4"]');
  
  options.forEach(option => {
    option.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      const isCorrect = this.dataset.correct === 'true';
      const feedbackBox = document.getElementById('activity4-feedback');
      
      // Disable all options
      options.forEach(opt => opt.classList.add('disabled'));
      
      // Mark selected
      if (isCorrect) {
        this.classList.add('correct');
        activityScores.activity4 = 1;
        feedbackBox.className = 'feedback-box success';
        feedbackBox.innerHTML = '✅ CORRETO! Construtor PRIVADO, instância estática, método getInstance() que retorna sempre a MESMA instância. Perfeito!';
      } else {
        this.classList.add('incorrect');
        activityScores.activity4 = 0;
        feedbackBox.className = 'feedback-box error';
        feedbackBox.innerHTML = '❌ Código A permite criar múltiplas instâncias. Código C não tem construtor privado (permite \'new Logger()\').  Revise o slide 19!';
      }
      
      feedbackBox.style.display = 'block';
      updateScoreDisplay();
    });
  });
}

// Show example button for Activity 3 (final)
function initShowExampleButton() {
  const showExampleBtn = document.getElementById('show-example-btn');
  if (showExampleBtn) {
    showExampleBtn.addEventListener('click', function() {
      goToSlide(24); // Go to resolution slide
    });
  }
}

// Remove old activity functions
function initActivity5_old() {
  const simulatorButtons = document.querySelectorAll('.btn-simulator');
  
  simulatorButtons.forEach(button => {
    button.addEventListener('click', function() {
      const option = this.closest('.simulator-option');
      const result = option.querySelector('.simulator-result');
      const optionType = option.dataset.option;
      
      // Hide all results first
      document.querySelectorAll('.simulator-result').forEach(r => r.style.display = 'none');
      
      // Show this result
      result.style.display = 'block';
      
      // Update score
      if (optionType === 'microservices') {
        activityScores.activity4 = 1;
      } else {
        activityScores.activity4 = 0;
      }
      
      updateScoreDisplay();
    });
  });
}

// Activity #5: Multi-Scenario Quiz
function initActivity5() {
  const scenarioButtons = document.querySelectorAll('.scenario-btn');
  let scenariosAnswered = {1: false, 2: false, 3: false};
  let scenariosCorrect = {1: false, 2: false, 3: false};
  
  const explanations = {
    1: {
      correct: '✅ CAMADAS! MVP precisa ser RÁPIDO. Time pequeno não precisa da complexidade de microsserviços. Comece simples!',
      incorrect: '❌ MVP deve ser simples e rápido! Microsserviços adiciona complexidade desnecessária para um time pequeno.'
    },
    2: {
      correct: '✅ MICROSSERVIÇOS! Alta escala + alta disponibilidade = necessidade de resiliência. Se um serviço cai, outros continuam.',
      incorrect: '❌ Com 10 milhões de clientes e alta disponibilidade crítica, camadas não escala bem e é frágil a falhas.'
    },
    3: {
      correct: '✅ CAMADAS! Sistema SIMPLES não justifica complexidade de microsserviços. Keep it simple!',
      incorrect: '❌ Sistema interno simples com poucos usuários não precisa da complexidade de microsserviços.'
    }
  };
  
  scenarioButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      
      const scenario = this.dataset.scenario;
      const isCorrect = this.dataset.correct === 'true';
      const feedbackBox = document.getElementById(`scenario${scenario}-feedback`);
      
      // Disable buttons for this scenario
      const siblingButtons = this.closest('.scenario-options').querySelectorAll('.scenario-btn');
      siblingButtons.forEach(btn => btn.classList.add('disabled'));
      
      // Mark answer
      if (isCorrect) {
        this.classList.add('selected-correct');
        scenariosCorrect[scenario] = true;
        feedbackBox.className = 'scenario-feedback correct';
        feedbackBox.innerHTML = explanations[scenario].correct;
      } else {
        this.classList.add('selected-incorrect');
        scenariosCorrect[scenario] = false;
        feedbackBox.className = 'scenario-feedback incorrect';
        feedbackBox.innerHTML = explanations[scenario].incorrect;
      }
      
      scenariosAnswered[scenario] = true;
      feedbackBox.style.display = 'block';
      
      // Check if all scenarios answered
      if (scenariosAnswered[1] && scenariosAnswered[2] && scenariosAnswered[3]) {
        const correctCount = Object.values(scenariosCorrect).filter(v => v).length;
        activityScores.activity5 = correctCount;
        
        const finalScoreBox = document.getElementById('final-score-box');
        const finalScoreText = document.getElementById('final-score-text');
        const finalScoreMessage = document.getElementById('final-score-message');
        
        finalScoreText.textContent = `Você acertou ${correctCount} de 3!`;
        
        if (correctCount === 3) {
          finalScoreMessage.innerHTML = '🏆 MESTRE ARQUITETO! Você domina a seleção de estilos!';
        } else if (correctCount === 2) {
          finalScoreMessage.innerHTML = '👍 BOM TRABALHO! Revise os critérios de decisão.';
        } else {
          finalScoreMessage.innerHTML = '📚 CONTINUE ESTUDANDO! Revise os slides 19-22 sobre quando usar cada estilo.';
        }
        
        finalScoreBox.style.display = 'block';
        updateScoreDisplay();
      }
    });
  });
}

// Update score display
function updateScoreDisplay() {
  let totalScore = 0;
  let completedActivities = 0;
  
  Object.values(activityScores).forEach(score => {
    if (score !== null) {
      totalScore += score;
      completedActivities++;
    }
  });
  
  const scoreDisplay = document.getElementById('score-display');
  if (scoreDisplay) {
    scoreDisplay.textContent = `${totalScore}/4`;
  }
}



// Initialize activities when DOM is ready
setTimeout(() => {
  initActivity1();
  initActivity2();
  initActivity3();
  initActivity4();
  initShowExampleButton();
}, 100);