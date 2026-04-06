// Navigation data configuration
const navigationData = {
    logo: {
        src: 'assets/images/site/logo.png',
        alt: 'Wolno Logo',
        homeLink: true
    },
    menuItems: [
        { text: 'FAQs', href: 'pages/faqs.html', class: 'faqs-link', ariaLabel: 'Frequently Asked Questions' },
        { text: 'Events', href: 'pages/events.html', class: 'events-link', ariaLabel: 'Events and conventions' },
        { text: 'Blog', href: 'pages/blog.html', class: 'blog-link', ariaLabel: 'Blog posts and updates' },
        { text: 'Comics', href: 'pages/comics.html', class: 'comics-link', ariaLabel: 'Comics and webcomics' },
        { text: 'Characters', href: 'pages/characters.html', class: 'characters-link', ariaLabel: 'Character information' },
        { text: 'Portfolio', href: 'pages/portfolio.html', class: 'portfolio-link', ariaLabel: 'Art portfolio and gallery' },
        { text: 'About me', href: 'pages/about.html', class: 'about-link', ariaLabel: 'About the artist' },
        { text: 'Home', href: 'index.html', class: 'home-link-nav', ariaLabel: 'Homepage' }
    ]
};

// Get base path for navigation links
function getNavigationBasePath() {
    const currentPath = window.location.pathname;
    
    // Count how many levels deep we are
    if (currentPath.includes('/pages/wiki/characters/') || currentPath.includes('/pages/wiki/comics/')) {
        return '../../../';
    } else if (currentPath.includes('/pages/auth/')) {
        return '../../';
    } else if (currentPath.includes('/pages/')) {
        return '../';
    }
    
    return '';
}

// Get current active page
function getCurrentPage() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    // Remove .html extension for comparison
    return fileName.replace('.html', '');
}

// Check if a navigation item should be active
function isActivePage(href) {
    const currentPage = getCurrentPage();
    const hrefPage = href.split('/').pop().replace('.html', '');
    
    // Special case for home/index
    if (currentPage === 'index' && hrefPage === 'index') return true;
    if (currentPage === '' && hrefPage === 'index') return true;
    
    return currentPage === hrefPage;
}

// Create desktop navigation menu
function createDesktopMenu() {
    const basePath = getNavigationBasePath();
    
    return navigationData.menuItems.map(item => {
        const isActive = isActivePage(item.href);
        const activeClass = isActive ? ' active' : '';
        
        return `
        <li class="nav-item" role="none">
            <a href="${basePath}${item.href}" 
               class="nav-link ${item.class}${activeClass}" 
               role="menuitem"
               aria-label="${item.ariaLabel}"
               ${isActive ? 'aria-current="page"' : ''}>
                ${item.text}
            </a>
        </li>
    `;
    }).join('');
}

// Create mobile navigation menu
function createMobileMenu() {
    const basePath = getNavigationBasePath();
    
    return navigationData.menuItems.map(item => {
        const isActive = isActivePage(item.href);
        const activeClass = isActive ? ' active' : '';
        
        return `
        <a href="${basePath}${item.href}" 
           class="mobile-nav-item mobile-${item.class}${activeClass}"
           ${isActive ? 'aria-current="page"' : ''}>
            ${item.text}
        </a>
    `;
    }).join('');
}

// Create complete navigation HTML structure
function createNavigation() {
    const basePath = getNavigationBasePath();
    const logoSrc = basePath + navigationData.logo.src;
    const homeHref = basePath + 'index.html';
    
    return `
        <!-- ===== SITE NAVIGATION ===== -->
        <nav class="site-navigation" id="siteNavigation">
            <div class="nav-container">
                <!-- Logo -->
                <a href="${homeHref}" class="nav-logo home-link" aria-label="Wolno - Go to homepage">
                    <img src="${logoSrc}" 
                         alt="${navigationData.logo.alt}" 
                         class="nav-logo-image logo-img"
                         loading="eager">
                </a>

                <!-- Desktop Navigation Menu -->
                <ul class="nav-menu" role="menubar">
                    ${createDesktopMenu()}
                </ul>

                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" 
                        id="mobileMenuToggle" 
                        aria-label="Toggle mobile navigation menu"
                        aria-expanded="false"
                        aria-controls="mobileNavMenu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>

            <!-- Scroll Indicator -->
            <div class="nav-scroll-indicator" id="scrollIndicator"></div>
        </nav>

        <!-- Mobile Navigation Overlay -->
        <div class="mobile-nav-overlay" id="mobileNavOverlay" aria-hidden="true"></div>

        <!-- Mobile Navigation Menu -->
        <aside class="mobile-nav-menu" id="mobileNavMenu" aria-hidden="true" role="navigation" aria-label="Mobile navigation">
            <!-- Mobile Menu Header with Logo -->
            <div class="mobile-nav-header">
                <img src="${logoSrc}" 
                     alt="${navigationData.logo.alt}" 
                     class="mobile-nav-logo mobile-logo-img"
                     loading="eager">
            </div>

            <!-- Mobile Menu Items -->
            <div class="mobile-nav-items">
                ${createMobileMenu()}
            </div>
        </aside>
    `;
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileNavMenu');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const body = document.body;

    if (!mobileToggle || !mobileMenu || !mobileOverlay) return;

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        
        mobileToggle.setAttribute('aria-expanded', !isOpen);
        mobileMenu.setAttribute('aria-hidden', isOpen);
        mobileOverlay.setAttribute('aria-hidden', isOpen);
        
        if (!isOpen) {
            body.classList.add('mobile-menu-open');
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
        } else {
            body.classList.remove('mobile-menu-open');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        body.classList.remove('mobile-menu-open');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }

    // Event listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-item');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
            closeMobileMenu();
        }
    });
}

// Initialize scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;

    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollIndicator.style.width = scrollPercent + '%';
    }

    // Throttled scroll handler for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollIndicator();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    // Initial update
    updateScrollIndicator();
}

// Insert navigation into the page
function insertNavigation() {
    const navigationHTML = createNavigation();
    
    // Try to find existing navigation container or insert at beginning of body
    let container = document.querySelector('nav.site-navigation');
    
    if (container) {
        // Replace existing navigation
        container.outerHTML = navigationHTML;
    } else {
        // Insert at beginning of body
        document.body.insertAdjacentHTML('afterbegin', navigationHTML);
    }
    
    // Initialize functionality after DOM insertion
    setTimeout(() => {
        initMobileMenu();
        initScrollIndicator();
    }, 10);
}

// Make insertNavigation available globally
window.insertNavigation = insertNavigation;

// Auto-initialize if not called manually (fallback for direct script loading)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only auto-initialize if not loaded via component system
        if (!document.querySelector('[data-component="navigation"]')) {
            insertNavigation();
        }
    });
} else {
    // Only auto-initialize if not loaded via component system
    if (!document.querySelector('[data-component="navigation"]')) {
        insertNavigation();
    }
}
