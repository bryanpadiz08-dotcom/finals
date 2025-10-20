// JavaScript for Bryan Padiz Portfolio

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileMenuOverlay');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');

function openMobileMenu() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('open');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
}

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileMenu();
    }
});

// Close menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
        closeMobileMenu();
    }
});

// Smooth scrolling with offset for header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('open')) {
                closeMobileMenu();
            }
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Call updateActiveNavLink on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    
    // Ensure first section is visible on load
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Modal functionality
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');

function openModal(id) {
    const projectData = {
        'calculator': {
            title: 'Modern Calculator',
            text: 'A fully functional calculator with advanced features including memory operations, keyboard support, and theme switching. Built with vanilla JavaScript for optimal performance.',
            details: [
                'Basic arithmetic operations (+, -, ×, ÷)',
                'Memory functions (MC, MR, M+, M-)',
                'Keyboard support for all operations',
                'Dark/Light theme toggle',
                'Responsive design for all devices',
                'Error handling and input validation',
                'Real-time operation display',
                'Backspace and clear entry functionality'
            ]
        },
        'timer': {
            title: 'Countdown Timer',
            text: 'A fully functional countdown timer with customizable time settings, progress visualization, and audio alerts. Perfect for productivity, cooking, workouts, or any timed activity.',
            details: [
                'Customizable hours, minutes, and seconds',
                'Real-time progress bar visualization',
                'Start, pause, and reset functionality',
                'Audio alert when timer completes',
                'Dark/Light theme toggle',
                'Responsive design for all devices',
                'Visual pulse animation on completion'
            ]
        },
        // Lab Activities Data
        'lab1': {
            title: 'Activity 1: HTML & CSS Fundamentals',
            text: 'This activity covers the basics of HTML structure and CSS styling. Learn how to create semantic HTML markup and apply CSS for beautiful, responsive layouts.',
            details: [
                'HTML5 semantic elements and structure',
                'CSS selectors and specificity',
                'Box model and positioning',
                'Typography and color theory',
                'Basic layout techniques with Flexbox',
                'Responsive design principles'
            ]
        },
        'lab2': {
            title: 'Activity 2: Responsive Web Design',
            text: 'Master responsive design techniques using media queries and flexible layouts. Create websites that look great on all devices from mobile to desktop.',
            details: [
                'Media queries for different screen sizes',
                'Mobile-first design approach',
                'Flexible grid systems',
                'Responsive images and media',
                'Viewport meta tag configuration',
                'Testing across multiple devices'
            ]
        },
        'lab3': {
            title: 'Activity 3: JavaScript DOM Manipulation',
            text: 'Learn how to interact with the Document Object Model using JavaScript. Create dynamic, interactive web pages that respond to user actions.',
            details: [
                'DOM selection and traversal',
                'Event handling and listeners',
                'Element creation and manipulation',
                'Dynamic content updates',
                'Form handling and validation',
                'Browser storage APIs'
            ]
        },
        'lab4': {
            title: 'Activity 4: Form Validation & Processing',
            text: 'Implement robust form validation and learn how to process user input effectively. Ensure data integrity and provide helpful user feedback.',
            details: [
                'HTML5 form validation attributes',
                'JavaScript validation techniques',
                'Regular expressions for pattern matching',
                'Error message display and styling',
                'Form submission handling',
                'Data sanitization and security'
            ]
        },
        'lab5': {
            title: 'Activity 5: API Integration',
            text: 'Connect your web applications to external data sources using APIs. Learn how to fetch, process, and display data from various web services.',
            details: [
                'HTTP requests and responses',
                'Fetch API and async/await',
                'RESTful API principles',
                'JSON data parsing',
                'Error handling for network requests',
                'Loading states and user feedback'
            ]
        },
        'lab6': {
            title: 'Activity 6: CSS Animations & Transitions',
            text: 'Bring your websites to life with smooth animations and transitions. Learn advanced CSS techniques for creating engaging user experiences.',
            details: [
                'CSS transitions and timing functions',
                'Keyframe animations',
                'Transform properties (scale, rotate, translate)',
                'Animation performance optimization',
                'Accessibility considerations for animations',
                'Cross-browser compatibility'
            ]
        }
    };
    
    const item = projectData[id] || {title: 'Details', text: 'No details available.'};
    document.getElementById('modalTitle').textContent = item.title;
    
    let html = '<div class="modal-text">' + (item.text || '') + '</div>';
    
    if (item.details && Array.isArray(item.details)) {
        html += '<div style="margin-top: 16px;">';
        html += '<h4 style="color: var(--accent); margin-bottom: 8px;">' + (id.startsWith('lab') ? 'Learning Objectives:' : 'Key Features:') + '</h4>';
        html += '<ul style="color: var(--muted); padding-left: 20px;">';
        item.details.forEach(detail => {
            html += '<li style="margin-bottom: 6px;">' + detail + '</li>';
        });
        html += '</ul>';
        html += '</div>';
    }
    
    modalContent.innerHTML = html;
    
    modalBackdrop.style.display = 'flex';
    modalBackdrop.setAttribute('aria-hidden', 'false');
    
    // Add close button to modal if not already present
    const modal = modalBackdrop.querySelector('.modal');
    if (!modal.querySelector('.close-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close modal');
        closeBtn.onclick = closeModal;
        modal.appendChild(closeBtn);
    }
    
    requestAnimationFrame(() => requestAnimationFrame(() => modalBackdrop.classList.add('open')));
}

function closeModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    
    // Remove close button
    const closeBtn = modalBackdrop.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.remove();
    }
    
    setTimeout(() => {
        modalBackdrop.style.display = 'none';
        modalContent.innerHTML = '';
    }, 320);
}

// Close modal when clicking backdrop
modalBackdrop.addEventListener('click', function(e) {
    if (e.target === modalBackdrop) closeModal();
});

// Contact form validation
function submitContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const err = document.getElementById('formError');
    err.style.display = 'none';

    if (!name || !email || !message) {
        err.textContent = 'Please complete all required fields before sending.';
        err.style.display = 'block';
        return false;
    }
    
    // Simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        err.textContent = 'Please enter a valid email address.';
        err.style.display = 'block';
        return false;
    }

    // For this placeholder we won't actually send the message
    err.style.display = 'block';
    err.style.color = '#2a9d8f';
    err.textContent = 'Thank you for your message! I will get back to you soon.';
    
    // Reset after a short pause
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        err.style.display = 'none';
        err.style.color = '';
    }, 3000);
    return false;
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Resume Modal Functionality
function openResumeModal() {
    const resumeModal = document.createElement('div');
    resumeModal.className = 'modal-backdrop';
    resumeModal.innerHTML = `
        <div class="modal resume-modal">
            <div class="resume-modal-header">
                <h3>My Resume</h3>
                <button class="close-btn" onclick="closeResumeModal()">×</button>
            </div>
            <div class="resume-pdf-container">
                <iframe 
                    src="bryan pogi.pdf" 
                    class="resume-pdf-viewer" 
                    title="Bryan Padiz Resume"
                    onerror="showResumeFallback()"
                >
                </iframe>
            </div>
            <div class="resume-modal-actions">
                <a class="btn secondary" href="bryan pogi.pdf" download="Bryan_Padiz_Resume.pdf">
                    📥 Download PDF
                </a>
                <button class="btn" onclick="printResume()">🖨️ Print</button>
                <button class="btn" onclick="closeResumeModal()" style="margin-left: auto;">Close</button>
            </div>
            <div class="resume-fallback" id="resumeFallback" style="display: none;">
                <div class="placeholder-icon">📄</div>
                <h4>Resume Preview Not Available</h4>
                <p class="muted">Your browser doesn't support PDF preview. Please download the resume to view it.</p>
                <a class="btn" href="bryan pogi.pdf" download="Bryan_Padiz_Resume.pdf" style="margin-top: 15px;">
                    Download Resume PDF
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(resumeModal);
    
    // Show modal
    requestAnimationFrame(() => {
        resumeModal.style.display = 'flex';
        resumeModal.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => resumeModal.classList.add('open'));
    });
}

function closeResumeModal() {
    const resumeModal = document.querySelector('.modal-backdrop');
    if (resumeModal) {
        resumeModal.classList.remove('open');
        resumeModal.setAttribute('aria-hidden', 'true');
        
        setTimeout(() => {
            resumeModal.remove();
        }, 320);
    }
}

function showResumeFallback() {
    const fallback = document.getElementById('resumeFallback');
    const pdfViewer = document.querySelector('.resume-pdf-viewer');
    if (fallback && pdfViewer) {
        pdfViewer.style.display = 'none';
        fallback.style.display = 'block';
    }
}

function printResume() {
    const pdfWindow = window.open('bryan pogi.pdf', '_blank');
    if (pdfWindow) {
        pdfWindow.onload = function() {
            pdfWindow.print();
        };
    }
}

// Close resume modal when clicking backdrop
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        const resumeModal = document.querySelector('.modal-backdrop');
        if (resumeModal && resumeModal.querySelector('.resume-modal')) {
            closeResumeModal();
        }
    }
});

// Calculator functionality
function openCalculator() {
    const calculatorModal = document.createElement('div');
    calculatorModal.className = 'modal-backdrop';
    calculatorModal.innerHTML = `
        <div class="modal calculator-modal">
            <div class="calculator-container" id="calculatorContainer">
                <div class="calculator-content">
                    <div class="calc-header">
                        <div class="calc-title">Modern Calculator</div>
                        <button class="calc-theme-toggle" onclick="toggleCalculatorTheme()">🌙 Dark</button>
                    </div>
                    <div class="calc-screen">
                        <div class="calc-operation" id="calcOperation"></div>
                        <div class="calc-result" id="calcResult">0</div>
                    </div>
                    <div class="calc-buttons-grid">
                        <button class="calc-button memory" onclick="calculatorMemoryClear()">MC</button>
                        <button class="calc-button memory" onclick="calculatorMemoryRecall()">MR</button>
                        <button class="calc-button memory" onclick="calculatorMemoryAdd()">M+</button>
                        <button class="calc-button memory" onclick="calculatorMemorySubtract()">M-</button>
                        
                        <button class="calc-button clear" onclick="calculatorClear()">C</button>
                        <button class="calc-button clear" onclick="calculatorClearEntry()">CE</button>
                        <button class="calc-button clear" onclick="calculatorBackspace()">⌫</button>
                        <button class="calc-button operator" onclick="calculatorInputOperator('/')">÷</button>
                        
                        <button class="calc-button" onclick="calculatorInput('7')">7</button>
                        <button class="calc-button" onclick="calculatorInput('8')">8</button>
                        <button class="calc-button" onclick="calculatorInput('9')">9</button>
                        <button class="calc-button operator" onclick="calculatorInputOperator('*')">×</button>
                        
                        <button class="calc-button" onclick="calculatorInput('4')">4</button>
                        <button class="calc-button" onclick="calculatorInput('5')">5</button>
                        <button class="calc-button" onclick="calculatorInput('6')">6</button>
                        <button class="calc-button operator" onclick="calculatorInputOperator('-')">-</button>
                        
                        <button class="calc-button" onclick="calculatorInput('1')">1</button>
                        <button class="calc-button" onclick="calculatorInput('2')">2</button>
                        <button class="calc-button" onclick="calculatorInput('3')">3</button>
                        <button class="calc-button operator" onclick="calculatorInputOperator('+')">+</button>
                        
                        <button class="calc-button zero" onclick="calculatorInput('0')">0</button>
                        <button class="calc-button" onclick="calculatorInput('.')">.</button>
                        <button class="calc-button equals" onclick="calculatorCalculate()">=</button>
                    </div>
                    <div class="calculator-instructions">
                        <h4>Keyboard Shortcuts</h4>
                        <ul>
                            <li>Numbers: 0-9</li>
                            <li>Operators: +, -, *, /</li>
                            <li>Enter or =: Calculate</li>
                            <li>Escape: Clear</li>
                            <li>Backspace: Delete last digit</li>
                            <li>Memory Clear: MC - Clear memory</li>
                            <li>Memory Recall: MR - Recall from memory</li>
                            <li>Memory Add: M+ - Add to memory</li>
                            <li>Memory Subtract: M- - Subtract from memory</li>
                            <li>Clear Entry: CE - Clear current entry</li>
                            <li>Theme Toggle: Switch between dark and light modes</li>
                        </ul>
                        <h4>Advanced Features</h4>
                        <ul>
                            <li>Keyboard support for all operations</li>
                            <li>Memory functions for complex calculations</li>
                            <li>Error handling for invalid operations</li>
                            <li>Responsive design for all screen sizes</li>
                            <li>Real-time operation display</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button class="close-btn" onclick="closeCalculator()">×</button>
        </div>
    `;
    
    document.body.appendChild(calculatorModal);
    
    // Initialize calculator state
    window.calculatorState = {
        currentInput: '0',
        previousInput: '',
        operator: '',
        waitingForNewInput: false,
        memory: 0,
        operationDisplay: ''
    };
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleCalculatorKeyboard);
    
    // Show modal
    requestAnimationFrame(() => {
        calculatorModal.style.display = 'flex';
        calculatorModal.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => calculatorModal.classList.add('open'));
    });
}

function closeCalculator() {
    const calculatorModal = document.querySelector('.modal-backdrop');
    if (calculatorModal) {
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleCalculatorKeyboard);
        
        calculatorModal.classList.remove('open');
        calculatorModal.setAttribute('aria-hidden', 'true');
        
        setTimeout(() => {
            calculatorModal.remove();
        }, 320);
    }
}

function toggleCalculatorTheme() {
    const container = document.getElementById('calculatorContainer');
    const toggleBtn = document.querySelector('.calc-theme-toggle');
    
    if (container.classList.contains('light')) {
        container.classList.remove('light');
        toggleBtn.textContent = '🌙 Dark';
    } else {
        container.classList.add('light');
        toggleBtn.textContent = '☀️ Light';
    }
}

// Calculator logic
function calculatorInput(value) {
    const state = window.calculatorState;
    
    if (state.waitingForNewInput) {
        state.currentInput = value;
        state.waitingForNewInput = false;
    } else {
        state.currentInput = state.currentInput === '0' ? value : state.currentInput + value;
    }
    
    updateCalculatorDisplay();
}

function calculatorInputOperator(nextOperator) {
    const state = window.calculatorState;
    const inputValue = parseFloat(state.currentInput);
    
    if (state.operator && !state.waitingForNewInput) {
        calculatorCalculate();
    }
    
    state.previousInput = state.currentInput;
    state.waitingForNewInput = true;
    state.operator = nextOperator;
    state.operationDisplay = `${state.previousInput} ${getOperatorSymbol(state.operator)}`;
    updateCalculatorDisplay();
}

function calculatorCalculate() {
    const state = window.calculatorState;
    const currentValue = parseFloat(state.currentInput);
    const previousValue = parseFloat(state.previousInput);
    
    if (state.operator && state.previousInput !== '') {
        let result;
        
        switch (state.operator) {
            case '+':
                result = previousValue + currentValue;
                break;
            case '-':
                result = previousValue - currentValue;
                break;
            case '*':
                result = previousValue * currentValue;
                break;
            case '/':
                result = currentValue !== 0 ? previousValue / currentValue : 'Error';
                break;
            default:
                return;
        }
        
        if (result === 'Error') {
            state.currentInput = 'Error';
            state.operationDisplay = 'Division by zero';
        } else {
            state.currentInput = String(result);
            state.operationDisplay = `${previousValue} ${getOperatorSymbol(state.operator)} ${currentValue} =`;
        }
        
        state.operator = '';
        state.waitingForNewInput = true;
        
        updateCalculatorDisplay();
    }
}

function calculatorClear() {
    window.calculatorState = {
        currentInput: '0',
        previousInput: '',
        operator: '',
        waitingForNewInput: false,
        memory: window.calculatorState.memory,
        operationDisplay: ''
    };
    updateCalculatorDisplay();
}

function calculatorClearEntry() {
    window.calculatorState.currentInput = '0';
    updateCalculatorDisplay();
}

function calculatorBackspace() {
    const state = window.calculatorState;
    if (state.currentInput.length > 1 && state.currentInput !== '0') {
        state.currentInput = state.currentInput.slice(0, -1);
    } else {
        state.currentInput = '0';
    }
    updateCalculatorDisplay();
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '×';
        case '/': return '÷';
        default: return operator;
    }
}

function updateCalculatorDisplay() {
    const state = window.calculatorState;
    const calcResult = document.getElementById('calcResult');
    const calcOperation = document.getElementById('calcOperation');
    
    if (calcResult && calcOperation) {
        calcResult.textContent = state.currentInput;
        calcOperation.textContent = state.operationDisplay;
    }
}

// Memory functions
function calculatorMemoryClear() {
    window.calculatorState.memory = 0;
}

function calculatorMemoryRecall() {
    window.calculatorState.currentInput = String(window.calculatorState.memory);
    window.calculatorState.waitingForNewInput = false;
    updateCalculatorDisplay();
}

function calculatorMemoryAdd() {
    window.calculatorState.memory += parseFloat(window.calculatorState.currentInput);
}

function calculatorMemorySubtract() {
    window.calculatorState.memory -= parseFloat(window.calculatorState.currentInput);
}

// Keyboard support
function handleCalculatorKeyboard(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        calculatorInput(key);
    } else if (key === '.') {
        calculatorInput('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
        calculatorInputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculatorCalculate();
    } else if (key === 'Escape') {
        calculatorClear();
    } else if (key === 'Backspace') {
        calculatorBackspace();
    }
}

// Timer functionality
function openTimer() {
    const timerModal = document.createElement('div');
    timerModal.className = 'modal-backdrop';
    timerModal.innerHTML = `
        <div class="modal timer-modal">
            <div class="timer-container" id="timerContainer">
                <div class="timer-header">
                    <div class="timer-title">Countdown Timer</div>
                    <button class="timer-theme-toggle" onclick="toggleTimerTheme()">🌙 Dark</button>
                </div>
                <div class="timer-display">
                    <div class="timer-time" id="timerDisplay">00:15:00</div>
                    <div class="timer-label-large" id="timerStatus">Ready to start</div>
                    <div class="timer-progress-full">
                        <div class="timer-progress-bar-full" id="timerProgressBar"></div>
                    </div>
                </div>
                <div class="timer-inputs">
                    <div class="timer-input-group-full">
                        <div class="timer-input-label">Hours</div>
                        <input type="number" class="timer-input" id="timerHours" min="0" max="23" value="0">
                    </div>
                    <div class="timer-input-group-full">
                        <div class="timer-input-label">Minutes</div>
                        <input type="number" class="timer-input" id="timerMinutes" min="0" max="59" value="15">
                    </div>
                    <div class="timer-input-group-full">
                        <div class="timer-input-label">Seconds</div>
                        <input type="number" class="timer-input" id="timerSeconds" min="0" max="59" value="0">
                    </div>
                </div>
                <div class="timer-controls">
                    <button class="timer-control-btn start" id="timerStartBtn">Start</button>
                    <button class="timer-control-btn pause" id="timerPauseBtn" disabled>Pause</button>
                    <button class="timer-control-btn reset" id="timerResetBtn">Reset</button>
                </div>
                <div class="timer-sound-toggle">
                    <input type="checkbox" id="timerSoundToggle" checked>
                    <label for="timerSoundToggle">Enable sound alert</label>
                </div>
            </div>
            <button class="close-btn" onclick="closeTimer()">×</button>
        </div>
    `;
    
    document.body.appendChild(timerModal);
    
    // Initialize timer state
    window.timerState = {
        totalSeconds: 900, // 15 minutes default
        remainingSeconds: 900,
        isRunning: false,
        intervalId: null,
        soundEnabled: true
    };
    
    // Add event listeners
    document.getElementById('timerStartBtn').addEventListener('click', startTimer);
    document.getElementById('timerPauseBtn').addEventListener('click', pauseTimer);
    document.getElementById('timerResetBtn').addEventListener('click', resetTimer);
    document.getElementById('timerSoundToggle').addEventListener('change', toggleTimerSound);
    
    // Input change listeners
    document.getElementById('timerHours').addEventListener('change', updateTimerFromInputs);
    document.getElementById('timerMinutes').addEventListener('change', updateTimerFromInputs);
    document.getElementById('timerSeconds').addEventListener('change', updateTimerFromInputs);
    
    // Show modal
    requestAnimationFrame(() => {
        timerModal.style.display = 'flex';
        timerModal.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => timerModal.classList.add('open'));
    });
}

function closeTimer() {
    const timerModal = document.querySelector('.modal-backdrop');
    if (timerModal) {
        // Stop timer if running
        if (window.timerState.isRunning) {
            pauseTimer();
        }
        
        timerModal.classList.remove('open');
        timerModal.setAttribute('aria-hidden', 'true');
        
        setTimeout(() => {
            timerModal.remove();
        }, 320);
    }
}

function toggleTimerTheme() {
    const container = document.getElementById('timerContainer');
    const toggleBtn = document.querySelector('.timer-theme-toggle');
    
    if (container.classList.contains('light')) {
        container.classList.remove('light');
        toggleBtn.textContent = '🌙 Dark';
    } else {
        container.classList.add('light');
        toggleBtn.textContent = '☀️ Light';
    }
}

function toggleTimerSound() {
    window.timerState.soundEnabled = document.getElementById('timerSoundToggle').checked;
}

function updateTimerFromInputs() {
    if (window.timerState.isRunning) return;
    
    const hours = parseInt(document.getElementById('timerHours').value) || 0;
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    
    window.timerState.totalSeconds = hours * 3600 + minutes * 60 + seconds;
    window.timerState.remainingSeconds = window.timerState.totalSeconds;
    
    updateTimerDisplay();
    updateProgressBar();
}

function updateTimerDisplay() {
    const hours = Math.floor(window.timerState.remainingSeconds / 3600);
    const minutes = Math.floor((window.timerState.remainingSeconds % 3600) / 60);
    const seconds = window.timerState.remainingSeconds % 60;
    
    document.getElementById('timerDisplay').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    const progress = window.timerState.totalSeconds > 0 ? 
        (1 - window.timerState.remainingSeconds / window.timerState.totalSeconds) * 100 : 0;
    document.getElementById('timerProgressBar').style.width = `${progress}%`;
}

function startTimer() {
    if (window.timerState.remainingSeconds <= 0) return;
    
    window.timerState.isRunning = true;
    document.getElementById('timerStartBtn').disabled = true;
    document.getElementById('timerPauseBtn').disabled = false;
    document.getElementById('timerStatus').textContent = 'Running...';
    
    window.timerState.intervalId = setInterval(() => {
        window.timerState.remainingSeconds--;
        
        updateTimerDisplay();
        updateProgressBar();
        
        if (window.timerState.remainingSeconds <= 0) {
            timerComplete();
        }
    }, 1000);
}

function pauseTimer() {
    window.timerState.isRunning = false;
    document.getElementById('timerStartBtn').disabled = false;
    document.getElementById('timerPauseBtn').disabled = true;
    document.getElementById('timerStatus').textContent = 'Paused';
    
    if (window.timerState.intervalId) {
        clearInterval(window.timerState.intervalId);
        window.timerState.intervalId = null;
    }
}

function resetTimer() {
    pauseTimer();
    window.timerState.remainingSeconds = window.timerState.totalSeconds;
    updateTimerDisplay();
    updateProgressBar();
    document.getElementById('timerStatus').textContent = 'Ready to start';
}

function timerComplete() {
    pauseTimer();
    document.getElementById('timerStatus').textContent = 'Time\'s up!';
    
    if (window.timerState.soundEnabled) {
        // Create a simple beep sound
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 1);
    }
    
    // Visual alert
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.style.animation = 'pulse 0.5s infinite';
    setTimeout(() => {
        timerDisplay.style.animation = '';
    }, 3000);
}

// Add pulse animation for timer completion
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Modal buttons
    document.querySelectorAll('[data-modal]').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // Close modal button
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Resume button
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', openResumeModal);
    }
    
    // Calculator button
    const openCalculatorBtn = document.getElementById('openCalculatorBtn');
    if (openCalculatorBtn) {
        openCalculatorBtn.addEventListener('click', openCalculator);
    }
    
    // Timer button
    const openTimerBtn = document.getElementById('openTimerBtn');
    if (openTimerBtn) {
        openTimerBtn.addEventListener('click', openTimer);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContact);
    }
});