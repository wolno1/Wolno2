/**
 * Automatic Image Carousel Component
 * Rotates through portfolio images automatically
 */

class AutoCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        this.track = this.container?.querySelector('.carousel-track');
        this.indicatorsContainer = this.container?.querySelector('.carousel-indicators');
        this.slides = this.container?.querySelectorAll('.carousel-slide');
        this.indicators = null;
        
        // Configuration
        this.options = {
            autoRotate: true,
            rotationSpeed: 4000, // 4 seconds
            transitionDuration: 800,
            pauseOnHover: true,
            ...options
        };
        
        // State
        this.currentSlide = 0;
        this.totalSlides = this.slides?.length || 0;
        this.isPlaying = this.options.autoRotate;
        this.intervalId = null;
        
        // Initialize if container exists
        if (this.container && this.totalSlides > 0) {
            this.buildIndicators();
            this.init();
        }
    }
    
    init() {
        this.setupEventListeners();
        this.updateCarousel(0, false); // Start at first slide without animation
        
        if (this.options.autoRotate) {
            this.startAutoRotation();
        }
        
        console.log('🎠 Carousel initialized with', this.totalSlides, 'slides');
    }
    
    setupEventListeners() {
        // Indicator click events
        this.indicators?.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Pause on hover if enabled
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => {
                this.pauseAutoRotation();
            });
            
            this.container.addEventListener('mouseleave', () => {
                if (this.options.autoRotate) {
                    this.startAutoRotation();
                }
            });
        }
        
        // Handle visibility change (pause when tab is inactive)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoRotation();
            } else if (this.options.autoRotate) {
                this.startAutoRotation();
            }
        });
        
        // Handle image load errors
        this.slides?.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('error', () => {
                    console.warn(`Failed to load carousel image ${index + 1}`);
                    this.handleImageError(slide, index);
                });
                
                img.addEventListener('load', () => {
                    slide.classList.remove('loading');
                });
            }
        });
    }
    
    startAutoRotation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, this.options.rotationSpeed);
        
        this.isPlaying = true;
    }
    
    pauseAutoRotation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isPlaying = false;
    }
    
    goToSlide(slideIndex, animate = true) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) {
            return;
        }
        
        this.currentSlide = slideIndex;
        this.updateCarousel(slideIndex, animate);
        
        // Reset auto-rotation timer
        if (this.options.autoRotate && this.isPlaying) {
            this.startAutoRotation();
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    updateCarousel(slideIndex, animate = true) {
        if (!this.track) return;
        
        // Calculate transform percentage
        const translateX = -(slideIndex * 100);
        
        // Apply transform with or without transition
        if (!animate) {
            this.track.style.transition = 'none';
        } else {
            this.track.style.transition = `transform ${this.options.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        }
        
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Force repaint if no animation
        if (!animate) {
            this.track.offsetHeight;
            this.track.style.transition = '';
        }
        
        // Update indicators
        this.updateIndicators(slideIndex);
    }
    
    updateIndicators(activeIndex) {
        this.indicators?.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
            indicator.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
        });
    }
    
    handleImageError(slide, index) {
        const img = slide.querySelector('img');
        if (img) {
            // Create fallback element
            const fallback = document.createElement('div');
            fallback.className = 'carousel-slide-fallback';
            fallback.innerHTML = `
                <div class="fallback-content">
                    <span class="fallback-icon">🎨</span>
                    <span class="fallback-text">Image ${index + 1}</span>
                </div>
            `;
            
            // Replace image with fallback
            slide.replaceChild(fallback, img);
            slide.classList.add('has-fallback');
        }
    }
    
    buildIndicators() {
        if (!this.indicatorsContainer) {
            return;
        }

        this.indicatorsContainer.innerHTML = '';

        const indicators = [];
        for (let index = 0; index < this.totalSlides; index += 1) {
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `View slide ${index + 1}`);
            indicator.dataset.slide = String(index);
            this.indicatorsContainer.appendChild(indicator);
            indicators.push(indicator);
        }

        this.indicators = indicators;
    }

    destroy() {
        this.pauseAutoRotation();
        // Remove event listeners if needed
        console.log('🎠 Carousel destroyed');
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main portfolio carousel
    const portfolioCarousel = new AutoCarousel('.carousel-container', {
        autoRotate: true,
        rotationSpeed: 4000,
        pauseOnHover: true
    });
    
    // Store carousel instance globally for potential access
    window.portfolioCarousel = portfolioCarousel;
});