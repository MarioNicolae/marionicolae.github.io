
// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height (80px)
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.style.color = '');
                if (navLink) {
                    navLink.style.color = '#2563eb';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    function revealElements() {
        const reveals = document.querySelectorAll('.project-card, .skill-category, .award-card, .cert-card, .timeline-item, .highlight-item');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Element is in viewport
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('reveal', 'active');
            }
        });
    }
    
    // Initial check for elements in view
    revealElements();
    
    // Check on scroll
    window.addEventListener('scroll', revealElements);
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
    
    // ===================================
    // TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
    // ===================================
    // Uncomment this if you want a typing animation effect
    /*
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < text.length) {
            heroSubtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after page loads
    setTimeout(typeWriter, 500);
    */
    
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
    }
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(function() {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cLooking at the code? I like your curiosity!', 'font-size: 14px; color: #7c3aed;');
    console.log('%cFeel free to reach out: mario.nicolae2004@gmail.com', 'font-size: 12px; color: #666;');
    
});


// Debounce function to limit scroll event firing
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll event handlers are already defined above
}, 10));
