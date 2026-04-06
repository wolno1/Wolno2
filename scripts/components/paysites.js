// Paysites data configuration
const paysitesData = [
//    {
//        name: 'patreon',
//        url: 'https://www.patreon.com/c/wolno/membership',
//        ariaLabel: 'Support on Patreon',
//        class: 'patreon-btn'
//    },
    {
        name: 'kofi',
        url: 'https://ko-fi.com/WolnoArt',
        ariaLabel: 'Buy me a coffee on Ko-fi',
        class: 'kofi-btn'
    }
];

// SVG content embedded for each paysite platform - All normalized to 24x24 viewBox
function getPaysiteSvgContent(platform) {
    const svgs = {
        patreon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.235 0v23.094H0V0h4.235zm11.178 0c4.779 0 8.588 3.871 8.588 8.648s-3.809 8.648-8.588 8.648-8.588-3.871-8.588-8.648S10.634 0 15.413 0z" fill="currentColor"/>
        </svg>`,
        
        kofi: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.579 23.88c-3.49 0-6.338-1.56-8.035-4.34C.157 17.21-.006 15.17-.006 12.65c0-1.78.535-3.32 1.55-4.55.93-1.06 2.39-1.76 3.72-1.93 1.74-.21 3.93-.26 6.16-.26 3.65 0 4.7.04 6.1.19 1.91.19 3.58.69 4.63 1.28 1.03.91 1.62 2.13 1.62 3.56v.36c0 3.06-2.06 5.74-4.89 6.29-.21.5-.48.99-.78 1.47l-.01.01c-1.01 1.54-3.57 4.17-7.94 4.17h-.72v-.01zm7.82-17.64c-1.35-.13-2.29-.17-5.98-.17-2.36 0-4.37.02-5.99.23-2.13.27-3.88 1.65-3.88 4.9 0 3.04.16 5.39 1.37 7.37 1.38 2.37 3.61 3.61 6.65 3.61h.72c3.66 0 6.2-1.94 7.53-3.64.43-.68.77-1.35.98-2.03 2.6-.23 4.63-2.32 4.63-4.87v-.36c0-2.83-1.85-4.83-4.03-5.04zm-10.89 6.37c0 1.33.79 2.46 1.89 3.07.61.34 1.38.56 2.1.69.18.03.36.04.54.04.38 0 .75-.03 1.1-.09.72-.12 1.38-.34 1.95-.67 1.2-.69 1.91-1.74 1.91-3.07 0-1.44-1.08-2.72-2.43-2.72-.91 0-1.55.41-2.02 1.04-.45-.63-1.09-1.04-2-1.04-1.61 0-2.43 1.28-2.43 2.72z" fill="currentColor"/>
        </svg>`
    };
    
    return svgs[platform] || `<div class="svg-placeholder">${platform.charAt(0).toUpperCase()}</div>`;
}

// Create paysite button
function createPaysiteButton(paysite) {
    const svgContent = getPaysiteSvgContent(paysite.name);
    
    return `
        <a href="${paysite.url}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="paysite-btn ${paysite.class}" 
           aria-label="${paysite.ariaLabel}">
            ${svgContent}
        </a>
    `;
}

// Create complete paysites HTML structure
function createPaysites() {
    const buttonsHtml = paysitesData.map(paysite => createPaysiteButton(paysite)).join('');
    
    return `
        <!-- Floating Paysite Buttons -->
        <div class="paysite-buttons">
            ${buttonsHtml}
        </div>
    `;
}

// Insert paysites into the page
function insertPaysites() {
    const paysitesHTML = createPaysites();
    
    // Try to find existing paysites container or insert at end of body
    let container = document.querySelector('.paysite-buttons');
    
    if (container) {
        // Replace existing paysites
        container.outerHTML = paysitesHTML;
    } else {
        // Insert at end of body
        document.body.insertAdjacentHTML('beforeend', paysitesHTML);
    }
}

// Make insertPaysites available globally
window.insertPaysites = insertPaysites;

// Auto-initialize if not called manually (fallback for direct script loading)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only auto-initialize if not loaded via component system
        if (!document.querySelector('[data-component="paysites"]')) {
            insertPaysites();
        }
    });
} else {
    // Only auto-initialize if not loaded via component system
    if (!document.querySelector('[data-component="paysites"]')) {
        insertPaysites();
    }
}
