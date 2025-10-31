// ============================================
// DEALVAULT - SCRIPT PRINCIPAL
// Version Finale - Optimisée
// ============================================

// Citations pour footer
const quotes = [
    { 
        text: "Your network is your net worth.", 
        author: "Porter Gale", 
        fr: "Votre réseau détermine votre valeur." 
    },
    { 
        text: "The only way to do great work is to love what you do.", 
        author: "Steve Jobs", 
        fr: "La seule façon de faire du bon travail est d'aimer ce que vous faites." 
    },
    { 
        text: "Don't watch the clock; do what it does. Keep going.", 
        author: "Sam Levenson", 
        fr: "Ne regardez pas l'horloge ; faites comme elle. Continuez d'avancer." 
    },
    { 
        text: "Success is not final, failure is not fatal.", 
        author: "Winston Churchill", 
        fr: "Le succès n'est pas définitif, l'échec n'est pas fatal." 
    },
    { 
        text: "The best time to plant a tree was 20 years ago. The second best time is now.", 
        author: "Proverbe chinois", 
        fr: "Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant." 
    },
    { 
        text: "The way to get started is to quit talking and begin doing.", 
        author: "Walt Disney", 
        fr: "Pour commencer, arrêtez de parler et commencez à agir." 
    }
];

// ============================================
// INITIALISATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    
    try {
        console.log("🚀 DealVault - Initialisation...");
        
        // 1. Icônes Lucide
        initLucideIcons();
        
        // 2. Theme toggle
        initThemeToggle();

        // 3. Barre beta
        initBetaBanner();
        
        // 🔥 RE-INITIALISE LES ICÔNES
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);

        // 4. Pilier romain navigation
        initRomanPillarNavigation();
        
        // 5. Header scroll behavior
        initHeaderScrollBehavior();
        
        // 6. Menu mobile
        initMobileMenu();
        
        // 7. Smooth scroll (avec offsets corrects)
        initSmoothScroll();
        
        // 8. FAQ accordéon
        initFAQAccordion();
        
        // 9. Citations aléatoires
        initRandomQuote();
        
        // 10. Analytics (optionnel)
        initAnalyticsTracking();
        
        // 11. Boutons "Voir plus" pricing
        initShowMoreButtons();

        console.log("✅ DealVault chargé !");
        
    } catch (error) {
        console.error("❌ Erreur:", error);
    }
});

// ============================================
// 1. ICÔNES LUCIDE
// ============================================

let iconsInitialized = false;

function initLucideIcons() {
    if (typeof lucide !== 'undefined' && !iconsInitialized) {
        lucide.createIcons();
        iconsInitialized = true;
        console.log("✅ Icônes Lucide chargées");
    }
}

// ============================================
// 2. THEME TOGGLE (DARK/LIGHT MODE)
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const heroSection = document.querySelector('.hero');
    
    // Charge la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i data-lucide="sun" class="theme-icon"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    
    // Toggle au clic
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Remplace complètement l'icône
        themeToggle.innerHTML = isLight 
            ? '<i data-lucide="sun" class="theme-icon"></i>'
            : '<i data-lucide="moon" class="theme-icon"></i>';
        
        // Recrée les icônes
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Gestion transition texte hero en mode clair
        if (isLight && heroSection) {
            heroSection.classList.remove('hero-transition-dark');
            setTimeout(() => {
                if (document.body.classList.contains('light-mode')) {
                    heroSection.classList.add('hero-transition-dark');
                }
            }, 3000);
        } else if (heroSection) {
            heroSection.classList.remove('hero-transition-dark');
        }
    });
    
    console.log("✅ Theme toggle initialisé");
}

// ============================================
// 3. BARRE ANNONCE BETA
// ============================================
function initBetaBanner() {
    const betaBanner = document.getElementById('beta-banner');
    const closeBtn = document.getElementById('close-beta-banner');
    
    if (!betaBanner || !closeBtn) {
        console.log("⚠️ Barre beta non trouvée");
        return;
    }
    
    // ✅ TOUJOURS AFFICHER (ignore localStorage pour test)
    document.body.classList.add('has-beta-banner');
    betaBanner.classList.remove('hidden');
    
    // Fermer la barre au clic
    closeBtn.addEventListener('click', () => {
        betaBanner.classList.add('hidden');
        document.body.classList.remove('has-beta-banner');
        
        // ❌ COMMENTÉ POUR TEST - Ne sauvegarde plus dans localStorage
        // localStorage.setItem('beta-banner-closed', 'true');
        
        // Track analytics
        trackEvent('Beta Banner', 'Close', 'User dismissed');
        
        console.log("✅ Barre beta fermée (mais réapparaîtra au refresh)");
    });
    
    console.log("✅ Barre beta initialisée et affichée");
}

// ============================================
// 4. PILIER ROMAIN NAVIGATION
// ============================================
function initRomanPillarNavigation() {
    const pillarNavItems = document.querySelectorAll('.pillar-nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    if (pillarNavItems.length === 0 || sections.length === 0) {
        return;
    }
    
    function updatePillarActive() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        pillarNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updatePillarActive();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updatePillarActive();
    
    console.log("✅ Navigation pilier activée");
}

// ============================================
// 5. HEADER SCROLL BEHAVIOR
// ============================================
function initHeaderScrollBehavior() {
    let lastScroll = window.scrollY;
    const header = document.querySelector('header');
    const romanPillar = document.querySelector('.roman-pillar');
    
    if (!header) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.scrollY;
                
                // Hide/show header
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                    if (romanPillar) {
                        romanPillar.classList.remove('header-visible');
                        romanPillar.classList.add('header-hidden');
                    }
                } else if (currentScroll < lastScroll) {
                    header.style.transform = 'translateY(0)';
                    if (romanPillar) {
                        romanPillar.classList.remove('header-hidden');
                        romanPillar.classList.add('header-visible');
                    }
                }
                
                // Reset pillar au top
                if (currentScroll <= 50 && romanPillar) {
                    romanPillar.classList.remove('header-hidden', 'header-visible');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log("✅ Header scroll activé");
}

// ============================================
// 6. MENU MOBILE
// ============================================
function initMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Ouvrir menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu?.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Fermer menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            closeMenu();
        });
    }
    
    // Fermer au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Fermer au clic outside
    if (navMenu) {
        navMenu.addEventListener('click', (e) => {
            if (e.target === navMenu) {
                closeMenu();
            }
        });
    }
    
    function closeMenu() {
        navMenu?.classList.remove('show-menu');
        document.body.style.overflow = '';
    }
    
    console.log("✅ Menu mobile configuré");
}

// ============================================
// 7. SMOOTH SCROLL (OFFSETS CORRECTS)
// ============================================
function initSmoothScroll() {
    const scrollButtons = document.querySelectorAll('.cta-scroll, .pillar-nav-item, .popup-cta-scroll');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            
            // Ne pas traiter les liens externes ou vers des pages
            if (!href || !href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Offsets personnalisés par section (header = 70px) ne jamais changer les lignes headeroffset
                let headerOffset = -100;
                
                if (targetId === '#pricing') {
                    headerOffset = 240;
                } else if (targetId === '#product-demo') {
                    headerOffset = 180;
                } else if (targetId === '#why-different') {
                    headerOffset = 40;
                } else if (targetId === '#features') {
                    headerOffset = 145;
                } else if (targetId === '#testimonials') {
                    headerOffset = -30;
                } else if (targetId === '#faq') {
                    headerOffset = 10;
                } else if (targetId === '#hero') {
                    headerOffset = -100; // Top de la page
                }
                
                const targetPosition = targetSection.offsetTop + headerOffset;
                
                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: 'smooth' 
                });
                
                // Cache le header pour certaines sections
                if (targetId === '#product-demo' || targetId === '#features' || targetId === '#pricing' || targetId === '#why-different') {
                    setTimeout(() => {
                        const header = document.querySelector('header');
                        if (header) {
                            header.style.transform = 'translateY(-100%)';
                        }
                        const romanPillar = document.querySelector('.roman-pillar');
                        if (romanPillar) {
                            romanPillar.classList.remove('header-visible');
                            romanPillar.classList.add('header-hidden');
                        }
                    }, 800);
                }
                
                // Track analytics
                trackEvent('Navigation', 'Smooth Scroll', targetId);
            }
        });
    });
    
    console.log("✅ Smooth scroll configuré");
}

// ============================================
// 8. FAQ ACCORDÉON
// ============================================
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fermer toutes les autres FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                
                // Track analytics
                const questionText = question.querySelector('span')?.textContent || 'Unknown';
                trackEvent('FAQ', 'Question Opened', questionText);
            }
            
            // Refresh Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
    
    console.log("✅ FAQ accordéon configuré");
}

// ============================================
// 9. CITATIONS ALÉATOIRES
// ============================================
function initRandomQuote() {
    const quoteElement = document.getElementById('citation-text');
    const authorElement = document.getElementById('citation-author');
    
    if (!quoteElement || !authorElement) {
        return;
    }
    
    // Sélection aléatoire
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Affichage initial
    quoteElement.textContent = `"${randomQuote.text}"`;
    authorElement.textContent = `— ${randomQuote.author}`;
    
    // Interaction : clic pour basculer EN/FR
    if (randomQuote.fr) {
        quoteElement.style.cursor = 'pointer';
        quoteElement.title = 'Cliquez pour voir la traduction française';
        
        let isEnglish = true;
        
        quoteElement.addEventListener('click', () => {
            if (isEnglish) {
                quoteElement.textContent = `"${randomQuote.fr}"`;
                quoteElement.style.opacity = '0.7';
            } else {
                quoteElement.textContent = `"${randomQuote.text}"`;
                quoteElement.style.opacity = '1';
            }
            isEnglish = !isEnglish;
            
            // Track
            trackEvent('Footer', 'Quote Translate', randomQuote.author);
        });
    }
    
    console.log("✅ Citation chargée:", randomQuote.author);
}

// ============================================
// 10. ANALYTICS TRACKING
// ============================================
function initAnalyticsTracking() {
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const ctaText = button.textContent.trim();
            const ctaLocation = button.closest('section')?.id || 'unknown';
            trackEvent('CTA', 'Click', `${ctaLocation} - ${ctaText}`);
        });
    });
    
    // Track pricing card hovers
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        let hoverTimer;
        card.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                const planName = card.querySelector('h3')?.textContent || 'Unknown';
                trackEvent('Pricing', 'Card Hover 3s+', planName);
            }, 3000);
        });
        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
        });
    });
    
    // Track scroll depth
    trackScrollDepth();
    
    console.log("✅ Analytics configuré");
}

// ============================================
// HELPER: TRACK EVENT
// ============================================
function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Plausible Analytics
    if (typeof plausible !== 'undefined') {
        plausible('event', {
            name: `${category}: ${action}`,
            props: { label: label }
        });
    }
    
    // Console log
    console.log(`📊 Event: ${category} | ${action} | ${label}`);
}

// ============================================
// HELPER: SCROLL DEPTH TRACKING
// ============================================
function trackScrollDepth() {
    const depthMarkers = [25, 50, 75, 100];
    const trackedMarkers = new Set();
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );
                
                depthMarkers.forEach(marker => {
                    if (scrollPercent >= marker && !trackedMarkers.has(marker)) {
                        trackedMarkers.add(marker);
                        trackEvent('Scroll Depth', `${marker}%`, window.location.pathname);
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}



// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PRELOAD SIGNUP PAGE
// ============================================
const mainCTA = document.querySelector('a[href="signup.html"]');
if (mainCTA) {
    mainCTA.addEventListener('mouseenter', () => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'signup.html';
        document.head.appendChild(link);
    }, { once: true });
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('❌ Erreur globale:', e.error);
});

// ============================================
// EXPORTS
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        initLucideIcons
    };
}