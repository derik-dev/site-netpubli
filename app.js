/**
 * GabrielWebd Landing Page - Core Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initSmoothScroll();
    initPortfolioFilter();
    initActiveNavLinks();
    initStickyHeader();
});

/**
 * 1. Scroll Reveal Animations
 * Uses IntersectionObserver to add 'reveal-visible' class when elements enter viewport.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * 2. Smooth Scrolling
 * Handles smooth scroll for all internal links.
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.site-header').offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 3. Portfolio Filtering
 * Filters work cards based on category buttons.
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const workCards = document.querySelectorAll('.work-card');

    if (!filterButtons.length || !workCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('is-active'));
            button.classList.add('is-active');

            const filterValue = button.getAttribute('data-filter');

            workCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    // Trigger a small reveal animation when reappearing
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

/**
 * 4. Active Navigation Link Highlighting
 * Updates the 'is-active' class on nav links as user scrolls through sections.
 */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.site-header').offsetHeight || 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - headerHeight - 20)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('is-active');
            }
        });
    });
}

/**
 * 5. Sticky Header Effect
 * Adds 'is-scrolled' class to header when page is scrolled down.
 */
function initStickyHeader() {
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });
}
