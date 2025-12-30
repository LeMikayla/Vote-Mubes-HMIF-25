/* ============================================
   VARIABLES & RESET
   ============================================ */
:root {
    --primary-color: #4361ee;
    --primary-dark: #3a56d4;
    --secondary-color: #7209b7;
    --success-color: #4cc9f0;
    --danger-color: #f72585;
    --warning-color: #ff9e00;
    --light-color: #f8f9fa;
    --dark-color: #212529;
    --gray-color: #6c757d;
    --gray-light: #e9ecef;
    --border-radius: 12px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --box-shadow-hover: 0 6px 12px rgba(0, 0, 0, 0.15);
    --transition: all 0.3s ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--dark-color);
    min-height: 100vh;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* ============================================
   TYPOGRAPHY
   ============================================ */
h1, h2, h3, h4 {
    color: var(--dark-color);
    font-weight: 600;
    margin-bottom: 1rem;
}

h1 {
    font-size: 2.5rem;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

h2 {
    font-size: 1.8rem;
    color: var(--primary-color);
}

h3 {
    font-size: 1.4rem;
}

p {
    margin-bottom: 1rem;
    color: var(--gray-color);
}

/* ============================================
   CARD & LAYOUT
   ============================================ */
.card {
    background: white;
    border-radius: var(--border-radius);
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
}

.card:hover {
    box-shadow: var(--box-shadow-hover);
}

.hidden {
    display: none !important;
}

/* ============================================
   HEADER
   ============================================ */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    background: white;
    padding: 20px 30px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo i {
    font-size: 2.5rem;
    color: var(--primary-color);
}

.time-info {
    text-align: right;
}

#current-time {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 5px;
}

.status-open {
    background: #d4edda;
    color: #155724;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
}

.status-closed {
    background: #f8d7da;
    color: #721c24;
}

/* ============================================
   BUTTONS
   ============================================ */
.btn-primary, .btn-secondary, .btn-success, .btn-small {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-primary {
    background: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

.btn-secondary {
    background: var(--gray-light);
    color: var(--dark-color);
}

.btn-secondary:hover {
    background: #dde1e7;
}

.btn-success {
    background: var(--success-color);
    color: white;
}

.btn-success:hover {
    background: #3ab5d9;
    transform: translateY(-2px);
}

.btn-small {
    padding: 8px 16px;
    font-size: 0.9rem;
}

/* ============================================
   INPUT & FORMS
   ============================================ */
.input-group {
    display: flex;
    gap: 10px;
    margin: 20px 0;
}

input[type="text"] {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid var(--gray-light);
    border-radius: 8px;
    font-size: 1rem;
    transition: var(--transition);
}

input[type="text"]:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 12px 20px;
    border-radius: 8px;
    margin: 15px 0;
    display: none;
}

/* ============================================
   CANDIDATES GRID
   ============================================ */
.candidates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    margin: 30px 0;
}

.candidate-card {
    background: white;
    border: 2px solid var(--gray-light);
    border-radius: var(--border-radius);
    padding: 25px;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.candidate-card:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
}

.candidate-card.selected {
    border-color: var(--success-color);
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.candidate-card.selected::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: var(--success-color);
}

.candidate-number {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--primary-color);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
}

.candidate-info h3 {
    margin-top: 10px;
    color: var(--dark-color);
}

.candidate-class {
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 15px;
}

.candidate-vision {
    color: var(--gray-color);
    font-size: 0.95rem;
    margin-bottom: 20px;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.select-btn {
    width: 100%;
    padding: 10px;
    background: var(--gray-light);
    color: var(--dark-color);
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
}

.select-btn:hover {
    background: var(--primary-color);
    color: white;
}

/* ============================================
   RESULTS SECTION
   ============================================ */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 25px 0;
}

.stat-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: var(--box-shadow);
    border-left: 4px solid var(--primary-color);
}

.stat-icon {
    background: var(--primary-color);
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--dark-color);
    line-height: 1;
}

.stat-label {
    color: var(--gray-color);
    font-size: 0.9rem;
}

#results-chart {
    margin: 30px 0;
    min-height: 300px;
    position: relative;
}

.chart-bar {
    background: var(--primary-color);
    height: 40px;
    margin-bottom: 15px;
    border-radius: 20px;
    position: relative;
    transition: var(--transition);
    overflow: hidden;
}

.chart-bar:hover {
    transform: translateX(5px);
}

.chart-label {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-weight: 600;
    z-index: 1;
}

.chart-percentage {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-weight: 600;
    z-index: 1;
}

.chart-bar-fill {
    background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
    height: 100%;
    border-radius: 20px;
    position: relative;
    min-width: 60px;
}

/* ============================================
   MODAL
   ============================================ */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 40px;
    border-radius: var(--border-radius);
    max-width: 500px;
    width: 90%;
    text-align: center;
    animation: modalAppear 0.3s ease;
}

@keyframes modalAppear {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}

.modal-icon.success {
    color: var(--success-color);
}

.modal-details {
    background: var(--gray-light);
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    text-align: left;
}

/* ============================================
   FOOTER
   ============================================ */
footer {
    background: white;
    border-radius: var(--border-radius);
    padding: 40px;
    margin-top: 30px;
    box-shadow: var(--box-shadow);
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
}

.footer-section h4 {
    color: var(--primary-color);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.footer-section p {
    margin-bottom: 8px;
    color: var(--gray-color);
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid var(--gray-light);
    color: var(--gray-color);
}

/* ============================================
   LOADING & ANIMATIONS
   ============================================ */
#loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 5px solid var(--gray-light);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading {
    text-align: center;
    padding: 40px;
    color: var(--gray-color);
}

.loading i {
    margin-right: 10px;
    color: var(--primary-color);
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    header {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }
    
    .time-info {
        text-align: center;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    .input-group {
        flex-direction: column;
    }
    
    .candidates-grid {
        grid-template-columns: 1fr;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .card {
        padding: 20px;
    }
    
    .modal-content {
        padding: 20px;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 1.8rem;
    }
    
    .btn-primary, .btn-secondary {
        width: 100%;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
    }
}