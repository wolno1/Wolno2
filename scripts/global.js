/**
 * Global JavaScript functions and utilities
 * Wolno Website - 2025
 */

// Global site configuration
const SiteConfig = {
    name: 'Wolno',
    version: '2.0',
    debug: true,
    animations: {
        enabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        duration: {
            fast: 150,
            normal: 300,
            slow: 500
        }
    }
};

// Utility functions
const Utils = {
    /**
     * Debounce function to limit function calls
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    /**
     * Throttle function to limit function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -threshold &&
            rect.left >= -threshold &&
            rect.bottom <= windowHeight + threshold &&
            rect.right <= windowWidth + threshold
        );
    },

    /**
     * Smooth scroll to element
     */
    scrollTo(element, offset = 0) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    /**
     * Log function that respects debug mode
     */
    log(...args) {
        if (SiteConfig.debug) {
            console.log('[Wolno]', ...args);
        }
    },

    /**
     * Get device type based on screen size
     */
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 576) return 'mobile';
        if (width < 768) return 'tablet-portrait';
        if (width < 992) return 'tablet-landscape';
        if (width < 1200) return 'desktop';
        return 'desktop-large';
    }
};

// Animation utilities
const Animations = {
    /**
     * Fade in animation for elements
     */
    fadeIn(elements, delay = 0) {
        if (!SiteConfig.animations.enabled) return;
        
        const elementList = elements.length ? elements : [elements];
        
        elementList.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, delay + (index * 100));
        });
    },

    /**
     * Intersection Observer for scroll animations
     */
    observeElements(selector, callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observerOptions = { ...defaultOptions, ...options };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target, entry);
                }
            });
        }, observerOptions);
        
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => observer.observe(element));
        
        return observer;
    }
};

// Performance monitoring
const Performance = {
    /**
     * Measure and log page load performance
     */
    measurePageLoad() {
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                Utils.log('Page load performance:', {
                    domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    loadComplete: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    totalTime: Math.round(perfData.loadEventEnd - perfData.fetchStart)
                });
            }
        });
    },

    /**
     * Monitor image loading
     */
    monitorImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        let loadedCount = 0;
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                loadedCount++;
                Utils.log(`Lazy image loaded: ${loadedCount}/${images.length}`);
            });
        });
    }
};

// Theme and accessibility utilities
const Accessibility = {
    /**
     * Set focus trap for modals
     */
    setFocusTrap(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
        
        firstElement?.focus();
    },

    /**
     * Announce content changes to screen readers
     */
    announce(message, priority = 'polite') {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = message;
        
        document.body.appendChild(announcer);
        
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }
};

// Initialize global functionality
document.addEventListener('DOMContentLoaded', () => {
    Utils.log('Site initialized:', SiteConfig);
    
    
    // Measure performance if debug mode is on
    if (SiteConfig.debug) {
        Performance.measurePageLoad();
        Performance.monitorImages();
    }
    
    // Set up fade-in animations for elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        Animations.fadeIn(fadeElements, 200);
    }
    
    // Log device type
    Utils.log('Device type:', Utils.getDeviceType());
    
    // Set up responsive behavior monitoring
    const handleResize = Utils.debounce(() => {
        Utils.log('Viewport changed:', {
            width: window.innerWidth,
            height: window.innerHeight,
            device: Utils.getDeviceType()
        });
    }, 250);
    
    window.addEventListener('resize', handleResize);
});

// Export utilities to global scope
window.SiteConfig = SiteConfig;
window.Utils = Utils;
window.Animations = Animations;
window.Performance = Performance;
window.Accessibility = Accessibility;
