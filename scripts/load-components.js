/**
 * Component Loader
 * Automatically loads HTML components and JavaScript components
 */

// Detect if we're in a subfolder or root
function getBasePath() {
    const path = window.location.pathname;
    
    // Count how many levels deep we are
    if (path.includes('/pages/wiki/characters/') || path.includes('/pages/wiki/comics/')) {
        return '../../../';
    } else if (path.includes('/pages/auth/')) {
        return '../../';
    } else if (path.includes('/pages/')) {
        return '../';
    }
    
    return './';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading components...');
    
    // Load HTML components first
    loadHTMLComponents().then(() => {
        // Then load JavaScript components
        loadJavaScriptComponents();
    });
});

/**
 * Load HTML components from files
 */
async function loadHTMLComponents() {
    const basePath = getBasePath();
    const htmlComponents = [
        { selector: '[data-component="navigation"]', file: `${basePath}components/navigation.html` },
        { selector: '[data-component="paysites"]', file: `${basePath}components/paysites.html` }
    ];

    for (const component of htmlComponents) {
        try {
            const element = document.querySelector(component.selector);
            if (element) {
                const response = await fetch(component.file);
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                    console.log(`✅ Loaded HTML component: ${component.file}`);
                } else {
                    console.warn(`⚠️ Failed to load HTML component: ${component.file}`);
                }
            }
        } catch (error) {
            console.error(`❌ Error loading HTML component ${component.file}:`, error);
        }
    }
}

/**
 * Load JavaScript components
 */
function loadJavaScriptComponents() {
    const basePath = getBasePath();
    const jsComponents = [
        { selector: '[data-component="navigation"]', module: `${basePath}scripts/components/navigation.js`, init: initNavigationComponent },
        { selector: '[data-component="footer"]', module: `${basePath}scripts/components/footer.js`, init: initFooterComponent },
        { selector: '.paysite-buttons', module: `${basePath}scripts/components/paysites.js`, init: initPaysiteButtons }
    ];

    jsComponents.forEach(component => {
        const element = document.querySelector(component.selector);
        if (element) {
            loadJSModule(component.module)
                .then(() => {
                    if (component.init) {
                        component.init(element);
                    }
                    console.log(`✅ Loaded JS component: ${component.module}`);
                })
                .catch(error => {
                    console.error(`❌ Error loading JS component ${component.module}:`, error);
                });
        }
    });
}

/**
 * Dynamically load JavaScript module
 */
function loadJSModule(src) {
    return new Promise((resolve, reject) => {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Initialize footer component
 */
function initFooterComponent(element) {
    // Wait a bit for the footer script to fully load
    setTimeout(() => {
        if (typeof window.insertFooter === 'function') {
            // Clear the element and insert the footer
            element.innerHTML = '';
            window.insertFooter(element.getAttribute('data-component') === 'footer' 
                ? '[data-component="footer"]' 
                : element.tagName.toLowerCase());
        } else {
            console.error('Footer component not available');
        }
    }, 100);
}

/**
 * Initialize navigation component
 */
function initNavigationComponent(element) {
    // Wait a bit for the navigation script to fully load
    setTimeout(() => {
        if (typeof window.insertNavigation === 'function') {
            // Clear the element and insert the navigation
            element.innerHTML = '';
            window.insertNavigation();
        } else {
            console.error('Navigation component not available');
        }
    }, 100);
}

/**
 * Initialize paysite buttons component
 */
function initPaysiteButtons(element) {
    // Wait a bit for the paysites script to fully load
    setTimeout(() => {
        if (typeof window.insertPaysites === 'function') {
            // Clear the element and insert the paysites
            element.innerHTML = '';
            window.insertPaysites();
        } else {
            console.error('Paysites component not available');
        }
    }, 100);
}
