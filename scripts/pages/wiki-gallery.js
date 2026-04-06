'use strict';

/**
 * Wiki Gallery Lightbox
 * Handles image gallery with lightbox functionality for wiki character pages
 */

(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const lightbox = document.getElementById('wikiLightbox');
        
        if (!lightbox) {
            return;
        }

        const state = {
            items: [],
            currentIndex: -1,
            lastTrigger: null,
            keyListener: null,
            render: null,
            close: null,
            showPrev: null,
            showNext: null
        };

        // Collect all gallery items
        collectGalleryItems(state);
        
        // Setup lightbox functionality
        setupLightbox(lightbox, state);
        
        // Attach click handlers to all gallery buttons
        attachGalleryHandlers(state);
    });

    /**
     * Collect all gallery items from both categories
     */
    function collectGalleryItems(state) {
        const buttons = document.querySelectorAll('.gallery-item-button');
        
        buttons.forEach((button) => {
            const img = button.querySelector('img');
            const caption = button.closest('.gallery-item').querySelector('.gallery-caption');
            
            if (!img) return;
            
            state.items.push({
                src: img.src,
                alt: img.alt,
                caption: caption ? caption.innerHTML : '',
                button: button
            });
        });
    }

    /**
     * Attach click handlers to gallery buttons
     */
    function attachGalleryHandlers(state) {
        const buttons = document.querySelectorAll('.gallery-item-button');
        
        buttons.forEach((button, index) => {
            button.addEventListener('click', (event) => {
                openLightbox(state, index, event.currentTarget);
            });
        });
    }

    /**
     * Setup lightbox controls and event handlers
     */
    function setupLightbox(lightbox, state) {
        const image = document.getElementById('lightboxImage');
        const description = document.getElementById('lightboxDescription');
        const prevButton = lightbox.querySelector('.lightbox-prev');
        const nextButton = lightbox.querySelector('.lightbox-next');
        const closeButton = lightbox.querySelector('.lightbox-close');

        if (!image || !description || !prevButton || !nextButton || !closeButton) {
            return;
        }

        state.render = () => renderLightbox(state, image, description, prevButton, nextButton);
        state.close = () => closeLightbox(lightbox, state);
        state.showPrev = () => navigateLightbox(state, -1);
        state.showNext = () => navigateLightbox(state, 1);

        prevButton.addEventListener('click', state.showPrev);
        nextButton.addEventListener('click', state.showNext);
        closeButton.addEventListener('click', state.close);

        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                state.close();
            }
        });
    }

    /**
     * Open lightbox with specific image
     */
    function openLightbox(state, index, trigger) {
        const lightbox = document.getElementById('wikiLightbox');
        if (!lightbox || typeof state.render !== 'function') {
            return;
        }

        state.currentIndex = index;
        state.lastTrigger = trigger;

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('wiki-lightbox-open');

        state.render();

        const closeButton = lightbox.querySelector('.lightbox-close');
        if (closeButton) {
            closeButton.focus();
        }

        state.keyListener = (event) => {
            if (event.key === 'Escape') {
                state.close();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                state.showPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                state.showNext();
            }
        };

        document.addEventListener('keydown', state.keyListener);
    }

    /**
     * Close lightbox
     */
    function closeLightbox(lightbox, state) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('wiki-lightbox-open');

        if (state.keyListener) {
            document.removeEventListener('keydown', state.keyListener);
            state.keyListener = null;
        }

        state.currentIndex = -1;

        if (state.lastTrigger && typeof state.lastTrigger.focus === 'function') {
            state.lastTrigger.focus();
        }
    }

    /**
     * Render current image in lightbox
     */
    function renderLightbox(state, image, description, prevButton, nextButton) {
        const item = state.items[state.currentIndex];
        if (!item) {
            return;
        }

        image.src = item.src;
        image.alt = item.alt;
        description.innerHTML = item.caption;

        if (state.items.length <= 1) {
            prevButton.disabled = true;
            nextButton.disabled = true;
        } else {
            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    }

    /**
     * Navigate to previous/next image
     */
    function navigateLightbox(state, direction) {
        if (state.currentIndex === -1 || !state.items.length) {
            return;
        }

        const total = state.items.length;
        let nextIndex = (state.currentIndex + direction) % total;
        if (nextIndex < 0) {
            nextIndex = total - 1;
        }

        state.currentIndex = nextIndex;
        if (typeof state.render === 'function') {
            state.render();
        }
    }
})();
