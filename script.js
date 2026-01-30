// ===== ATTENDRE QUE LA PAGE SOIT CHARGÉE =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU MOBILE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // ===== ANIMATION DES COMPTEURS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && !animated) {
            animated = true;
            statNumbers.forEach(function(stat) {
                const target = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 40);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ===== ANIMATION DES BARRES DE PROGRESSION =====
    const skillCards = document.querySelectorAll('.skill-card');
    const animatedSkills = new Set();

    function animateSkills() {
        skillCards.forEach(function(card) {
            if (animatedSkills.has(card)) return;

            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

            if (isVisible) {
                animatedSkills.add(card);
                const progressBar = card.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    setTimeout(function() {
                        progressBar.style.width = progress + '%';
                    }, 200);
                }
            }
        });
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // ===== FORMULAIRE DE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Afficher un message de succès
            alert('Message envoyé avec succès ! Je vous répondrai bientôt.');
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }

    // ===== DÉFILEMENT FLUIDE =====
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== BOUTON RETOUR EN HAUT =====
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb, #0ea5e9);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(37, 99, 235, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== CURSEUR ROBOT 🤖 =====
    if (window.innerWidth > 768) {
        const robotCursor = document.createElement('div');
        robotCursor.textContent = '🤖';
        robotCursor.style.cssText = `
            position: fixed;
            font-size: 30px;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(robotCursor);

        document.addEventListener('mousemove', function(e) {
            robotCursor.style.left = e.clientX + 'px';
            robotCursor.style.top = e.clientY + 'px';
        });

        // Agrandir sur les éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .skill-card');
        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                robotCursor.style.fontSize = '45px';
            });
            el.addEventListener('mouseleave', function() {
                robotCursor.style.fontSize = '30px';
            });
        });
    }

    // ===== ANIMATION D'ENTRÉE =====
    const elements = document.querySelectorAll('.skill-card, .timeline-item, .contact-item');
    const animatedElements = new Set();

    function animateOnScroll() {
        elements.forEach(function(el) {
            if (animatedElements.has(el)) return;

            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;

            if (isVisible) {
                animatedElements.add(el);
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                
                setTimeout(function() {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ===== ÉCRAN DE CHARGEMENT =====
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f172a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 4px solid rgba(37, 99, 235, 0.3);
        border-top-color: #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    preloader.appendChild(spinner);
    document.body.insertBefore(preloader, document.body.firstChild);

    setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.remove();
        }, 500);
    }, 1000);

    // Message console
    console.log('%c👋 Bienvenue sur mon portfolio!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
    console.log('%cSULAIMANU ADAMU BELLO', 'font-size: 14px; color: #64748b;');
});