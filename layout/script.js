/**
 * SYF.ANTYDIZAJN.PL - Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
    initSortDropdown();
    initFileHoverEffects();
    initGlitchEffect();
    initCursorGlow();
});

/**
 * SORT DROPDOWN
 */
function initSortDropdown() {
    const dropdown = document.querySelector('.sort-dropdown');
    const button = dropdown?.querySelector('.sort-button');
    const options = dropdown?.querySelectorAll('.sort-option');
    
    if (!dropdown || !button) return;
    
    // Toggle dropdown
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
    
    // Select option
    options?.forEach(option => {
        option.addEventListener('click', () => {
            // Update active state
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update button text
            const buttonText = button.querySelector('span:nth-child(2)');
            if (buttonText) {
                buttonText.textContent = option.textContent.toUpperCase();
            }
            
            // Close dropdown
            dropdown.classList.remove('open');
            
            // Trigger sort (placeholder for actual sorting logic)
            handleSort(option.textContent.toLowerCase());
        });
    });
    
    // Close on outside click
    document.addEventListener('click', () => {
        dropdown.classList.remove('open');
    });
}

/**
 * Handle sorting (placeholder)
 */
function handleSort(sortType) {
    console.log(`Sorting by: ${sortType}`);
    // In Next.js this would update URL params and re-fetch
}

/**
 * FILE HOVER EFFECTS
 */
function initFileHoverEffects() {
    const fileItems = document.querySelectorAll('.file-item');
    
    fileItems.forEach((item, index) => {
        // Stagger animation on load
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 50));
        
        // Mouse move effect - glow follows cursor
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * GLITCH EFFECT for title
 */
function initGlitchEffect() {
    const titleLine2 = document.querySelector('.title-line-2');
    if (!titleLine2) return;
    
    const originalText = titleLine2.textContent;
    const glitchChars = '!@#$%^&*()_+[]{}|;:,.<>?/\\~`';
    
    // Random glitch every few seconds
    setInterval(() => {
        if (Math.random() > 0.7) {
            glitchText(titleLine2, originalText, glitchChars);
        }
    }, 3000);
}

function glitchText(element, originalText, glitchChars) {
    let iterations = 0;
    const maxIterations = 8;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, i) => {
                if (Math.random() > 0.7) {
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                return char;
            })
            .join('');
        
        iterations++;
        
        if (iterations >= maxIterations) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, 50);
}

/**
 * CURSOR GLOW EFFECT
 */
function initCursorGlow() {
    // Create cursor glow element
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);
    
    // Track mouse movement
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    // Smooth follow animation
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

/**
 * KEYBOARD NAVIGATION
 */
document.addEventListener('keydown', (e) => {
    const fileItems = document.querySelectorAll('.file-item');
    const currentFocus = document.activeElement;
    
    // j/k for navigation (vim style)
    if (e.key === 'j' || e.key === 'k') {
        const links = Array.from(document.querySelectorAll('.file-link'));
        const currentIndex = links.indexOf(currentFocus);
        
        let nextIndex;
        if (e.key === 'j') {
            nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
        }
        
        links[nextIndex]?.focus();
        e.preventDefault();
    }
    
    // / to focus search (if implemented)
    if (e.key === '/') {
        const search = document.querySelector('.search-input');
        if (search) {
            search.focus();
            e.preventDefault();
        }
    }
});

/**
 * INTERSECTION OBSERVER for scroll animations
 */
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.file-item, .page-title-section').forEach(el => {
        observer.observe(el);
    });
};

// Run after initial load animations
setTimeout(observeElements, 1000);
