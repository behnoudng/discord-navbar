// Function to toggle navbar visibility
function toggleNavbar() {
    // Discord's sidebar class
    const navbar = document.querySelector('[class*="sidebar"]');
    if (navbar) {
        navbar.style.display = navbar.style.display === 'none' ? '' : 'none';
    }
}

// Add custom button to Discord navbar
function addToggleButton() {
    // Discord's toolbar class
    const toolbar = document.querySelector('[class*="toolbar"]');
    if (!toolbar) return;

    // Check if button already exists
    if (toolbar.querySelector('.navbar-toggle-btn')) return;

    const button = document.createElement('button');
    button.className = 'navbar-toggle-btn';
    button.innerHTML = '≡';
    button.style.cssText = `
        background: none;
        border: none;
        color: var(--interactive-normal);
        font-size: 20px;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        transition: background-color 0.2s;
    `;
    button.title = 'Toggle Navbar';
    button.onclick = toggleNavbar;
    
    // Add hover effect
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = 'var(--background-modifier-hover)';
    });
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = 'transparent';
    });

    toolbar.appendChild(button);
}

// Function to initialize the extension
function initialize() {
    // Try to add button immediately
    addToggleButton();

    // Also set up an observer to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                addToggleButton();
                break;
            }
        }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
}

// Wait for Discord to fully load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}