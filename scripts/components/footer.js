/**
 * Footer Component - Generate site footer with social links
 * Usage: createFooter() - returns footer element
 * Or: insertFooter(targetSelector) - inserts footer into specified element
 */

// Social links data
const socialLinks = [
    {
        name: 'Bluesky',
        url: 'https://bsky.app/profile/did:plc:5wrgei5ivhztbc5xzjjqramm',
        className: 'bluesky',
        svgFile: 'bluesky.svg'
    },
    {
        name: 'DeviantArt',
        url: 'https://www.deviantart.com/WolnoArt',
        className: 'deviantart',
        svgFile: 'deviantart.svg'
    },
    {
        name: 'Newgrounds',
        url: 'https://wolnoart.newgrounds.com',
        className: 'newgrounds',
        svgFile: 'newgrounds.svg'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/WolnoArt',
        className: 'instagram',
        svgFile: 'instagram.svg'
    },
    {
        name: 'Discord',
        url: 'https://discord.com/invite/9RR3SwenqV',
        className: 'discord',
        svgFile: 'discord.svg'
    },
    {
        name: 'X (Twitter)',
        url: 'https://x.com/WolnoArt',
        className: 'x',
        svgFile: 'x.svg'
    }
];

// Detect if we're in a subfolder or root for SVG paths
function getSvgBasePath() {
    const path = window.location.pathname;
    
    // Count how many levels deep we are
    if (path.includes('/pages/wiki/characters/') || path.includes('/pages/wiki/comics/')) {
        return '../../../assets/svg/';
    } else if (path.includes('/pages/auth/')) {
        return '../../assets/svg/';
    } else if (path.includes('/pages/')) {
        return '../assets/svg/';
    }
    
    return './assets/svg/';
}

/**
 * Create a social link element
 * @param {Object} link - Link object with url, className, name, and svgFile
 * @returns {HTMLElement} - Anchor element
 */
function createSocialLink(link) {
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.className = `social-link ${link.className}`;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.setAttribute('aria-label', `Follow me on ${link.name}`);
    
    // Use embedded SVG data instead of fetch for compatibility
    const svgContent = getSvgContent(link.className);
    
    anchor.innerHTML = `
        ${svgContent}
        <span class="sr-only">${link.name}</span>
    `;
    
    return anchor;
}

// SVG content embedded for each platform - All normalized to 24x24 viewBox
function getSvgContent(className) {
    const svgs = {
        bluesky: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.429 1.765c2.658 1.997 5.521 6.046 6.571 8.218 1.05-2.172 3.913-6.221 6.571-8.218 1.919-1.441 5.029-2.556 5.029 0.992 0 0.709-0.406 5.952-0.644 6.803-0.828 2.959-3.846 3.714-6.530 3.257 4.692 0.799 5.886 3.444 3.308 6.089-4.896 5.024-7.036-1.260-7.585-2.871-0.1-0.295-0.148-0.433-0.148-0.316 0-0.117-0.048 0.021-0.148 0.316-0.549 1.611-2.689 7.895-7.585 2.871-2.578-2.645-1.384-5.29 3.308-6.089-2.684 0.457-5.702-0.298-6.530-3.257-0.238-0.851-0.644-6.094-0.644-6.803 0-3.548 3.110-2.433 5.029-0.992z" fill="currentColor"/>
        </svg>`,
        
        furaffinity: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.82 5.133l-0.258 1.992 2.434 0.719 0.031 2.149 2.23 0.043-0.055 2.254 2.168-0.141c0.004-0.758 0.051-5.043 0.629-7.016zM11.356 18.239c0.055-0.211 0-0.902 0-1.145l-0.047-1.461c-2.024-0.086-4.203 0.32-4.203 2.183 0 0.407 0.172 0.77 0.426 1.051h3.313c0.25-0.141 0.433-0.336 0.511-0.629zM20.391 13.067l0.051-2.246-2.203-0.043-0.035-2.422-2.527-0.863 0.34-2.359H7.180c-3.82 0-6.586 3.254-6.586 6.817v6.918h4.117c-0.027-0.25-0.035-0.504-0.023-0.754 0.149-3.668 4.199-4.297 7.242-4.207v-1.055c-0.051-0.851-0.743-1.606-2.742-1.606-1.332 0-2.914 0.172-3.938 0.543l0.269-2.387c0.98-0.274 2.082-0.543 4.453-0.543 4.574 0 5.078 2.027 5.043 4.383l-0.023 5.625h2.48v-0.004l0.094 0.004c3.305 0 6.023-2.692 6.363-5.918z" fill="currentColor"/>
        </svg>`,
        
        tumblr: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" fill="currentColor"/>
        </svg>`,
        
        deviantart: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.211 5.086l-2.695 5.133 0.281 0.375h2.414v3.281h-4.125l-0.563 1.078-2.625 4.711h-4.688v-3.258l2.695-5.133-0.281-0.375h-2.414v-3.281h4.125l0.563-1.078 2.625-4.711h4.688v3.258z" fill="currentColor"/>
        </svg>`,
        
        newgrounds: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.485 2.133a2.422 2.422 0 0 1 2.422 2.422v16.567a1.009 1.009 0 0 1-1.009 1.009h-2.22a1.009 1.009 0 0 1-1.009-1.009V7.342a1.009 1.009 0 0 0-1.009-1.009h-0.404a1.009 1.009 0 0 0-1.009 1.009v13.781A1.009 1.009 0 0 1 3.238 22.131H1.009A1.009 1.009 0 0 1 0 21.122V3.142A1.009 1.009 0 0 1 1.009 2.133h7.476zm13.095 0A2.422 2.422 0 0 1 24 4.555v4.168a0.808 0.808 0 0 1-0.808 0.808h-2.875a0.808 0.808 0 0 1-0.808-0.808v-1.787a0.606 0.606 0 0 0-0.606-0.606h-1.011a0.606 0.606 0 0 0-0.606 0.606v10.389c0 0.223 0.181 0.404 0.404 0.404h1.616c0.223 0 0.404-0.181 0.404-0.404v-1.919h-0.404a0.808 0.808 0 0 1-0.808-0.808v-2.586a0.808 0.808 0 0 1 0.808-0.808h3.838A0.808 0.808 0 0 1 24 11.947v7.774a2.422 2.422 0 0 1-2.422 2.422h-6.059a2.422 2.422 0 0 1-2.422-2.422V4.555a2.422 2.422 0 0 1 2.422-2.422h6.059z" fill="currentColor"/>
        </svg>`,
        
        instagram: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.273c2.144 0 2.402 0.012 3.246 0.047 0.773 0.035 1.195 0.164 1.477 0.27 0.375 0.141 0.633 0.316 0.914 0.598s0.457 0.539 0.598 0.914c0.106 0.281 0.234 0.703 0.27 1.477 0.035 0.844 0.047 1.102 0.047 3.246s-0.012 2.402-0.047 3.246c-0.035 0.773-0.164 1.195-0.27 1.477-0.141 0.375-0.316 0.633-0.598 0.914s-0.539 0.457-0.914 0.598c-0.281 0.106-0.703 0.234-1.477 0.27-0.844 0.035-1.102 0.047-3.246 0.047s-2.402-0.012-3.246-0.047c-0.773-0.035-1.195-0.164-1.477-0.27-0.375-0.141-0.633-0.316-0.914-0.598s-0.457-0.539-0.598-0.914c-0.106-0.281-0.234-0.703-0.27-1.477-0.035-0.844-0.047-1.102-0.047-3.246s0.012-2.402 0.047-3.246c0.035-0.773 0.164-1.195 0.27-1.477 0.141-0.375 0.316-0.633 0.598-0.914s0.539-0.457 0.914-0.598c0.281-0.106 0.703-0.234 1.477-0.27 0.844-0.035 1.102-0.047 3.246-0.047zM12 3.836c-2.18 0-2.461 0.012-3.305 0.047-0.844 0.035-1.418 0.176-1.922 0.375-0.516 0.199-0.961 0.48-1.406 0.926s-0.727 0.891-0.926 1.406c-0.199 0.504-0.34 1.078-0.375 1.922-0.035 0.844-0.047 1.125-0.047 3.305s0.012 2.461 0.047 3.305c0.035 0.844 0.176 1.418 0.375 1.922 0.199 0.516 0.48 0.961 0.926 1.406s0.891 0.727 1.406 0.926c0.504 0.199 1.078 0.34 1.922 0.375 0.844 0.035 1.125 0.047 3.305 0.047s2.461-0.012 3.305-0.047c0.844-0.035 1.418-0.176 1.922-0.375 0.516-0.199 0.961-0.48 1.406-0.926s0.727-0.891 0.926-1.406c0.199-0.504 0.34-1.078 0.375-1.922 0.035-0.844 0.047-1.125 0.047-3.305s-0.012-2.461-0.047-3.305c-0.035-0.844-0.176-1.418-0.375-1.922-0.199-0.516-0.48-0.961-0.926-1.406s-0.891-0.727-1.406-0.926c-0.504-0.199-1.078-0.34-1.922-0.375-0.844-0.035-1.125-0.047-3.305-0.047zM12 8.32c-2.027 0-3.68 1.653-3.68 3.68s1.653 3.68 3.68 3.68 3.68-1.653 3.68-3.68-1.653-3.68-3.68-3.68zM12 13.5c-0.82 0-1.5-0.68-1.5-1.5s0.68-1.5 1.5-1.5 1.5 0.68 1.5 1.5-0.68 1.5-1.5 1.5zM16.875 7.875c0 0.621-0.504 1.125-1.125 1.125s-1.125-0.504-1.125-1.125 0.504-1.125 1.125-1.125 1.125 0.504 1.125 1.125z" fill="currentColor"/>
        </svg>`,
        
        discord: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.317 4.37c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 2.88c-1.714.29-3.354.8-4.885 1.49a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 2.98.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-2.981.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" fill="currentColor"/>
        </svg>`,
        
        x: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="currentColor"/>
        </svg>`
    };
    
    return svgs[className] || `<div class="svg-placeholder">${className.charAt(0).toUpperCase()}</div>`;
}

/**
 * Create the complete footer element
 * @returns {HTMLElement} - Footer element
 */
function createFooter() {
    // Create main footer element
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    
    // Create footer content container
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'footer-title';
    title.textContent = 'Connect with me';
    
    // Create navigation for social links
    const nav = document.createElement('nav');
    nav.className = 'social-links';
    nav.setAttribute('aria-label', 'Social media links');
    
    // Add all social links synchronously
    socialLinks.forEach(link => {
        nav.appendChild(createSocialLink(link));
    });
    
    // Assemble footer
    footerContent.appendChild(title);
    footerContent.appendChild(nav);
    footer.appendChild(footerContent);
    
    return footer;
}

/**
 * Insert footer into specified element
 * @param {string} targetSelector - CSS selector for target element
 * @returns {HTMLElement|null} - The created footer element or null if target not found
 */
function insertFooter(targetSelector = 'body') {
    const target = document.querySelector(targetSelector);
    if (!target) {
        console.error(`Footer target element "${targetSelector}" not found`);
        return null;
    }
    
    const footer = createFooter();
    target.appendChild(footer);
    return footer;
}

/**
 * Initialize footer when DOM is ready
 * @param {string} targetSelector - CSS selector for target element (optional)
 */
function initFooter(targetSelector = 'body') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => insertFooter(targetSelector));
    } else {
        insertFooter(targetSelector);
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createFooter, insertFooter, initFooter };
}

// Make functions available globally
window.createFooter = createFooter;
window.insertFooter = insertFooter;
window.initFooter = initFooter;
