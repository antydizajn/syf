/**
 * BRUTALIST RAW - Canvas Destruction Engine
 * Burn, Decay, Glitch Effects
 * GOD TIER 20/10
 */

// Global state
let canvas, ctx;
let particles = [];
let burnPoints = [];
let destructionLevel = 0;

/**
 * Initialize destruction canvas
 */
function initCanvas() {
    canvas = document.getElementById('destruction-canvas');
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation loop
    animate();
}

/**
 * Resize canvas to window
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2;
}

/**
 * Particle class for burn/decay effects
 */
class BurnParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = -Math.random() * 3 - 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * 10 + 5;
        this.color = this.getFireColor();
    }

    getFireColor() {
        const colors = [
            '#ff0000',
            '#ff3300',
            '#ff6600',
            '#ff9900',
            '#ffcc00',
            '#ffff00'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life -= this.decay;
        this.size *= 0.98;
    }

    draw(ctx) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

/**
 * Create burn effect at position
 */
function createBurn(x, y, intensity = 50) {
    for (let i = 0; i < intensity; i++) {
        particles.push(new BurnParticle(
            x + (Math.random() - 0.5) * 50,
            y + (Math.random() - 0.5) * 50
        ));
    }

    // Add burn mark
    burnPoints.push({
        x: x,
        y: y,
        size: 20 + Math.random() * 30,
        opacity: 0.8
    });

    destructionLevel += 0.1;
}

/**
 * Glitch effect
 */
function triggerGlitch(duration = 300) {
    isGlitching = true;

    const glitchLayer = document.querySelector('.glitch-layer');
    glitchLayer.classList.add('active');

    // Glitch file items
    document.querySelectorAll('.file-item').forEach((item, i) => {
        setTimeout(() => {
            item.classList.add('glitching');
            setTimeout(() => item.classList.remove('glitching'), 150);
        }, i * 50);
    });

    // Screen tear effect
    createScreenTear();

    setTimeout(() => {
        isGlitching = false;
        glitchLayer.classList.remove('active');
    }, duration);
}

/**
 * Create screen tear effect
 */
function createScreenTear() {
    const tearHeight = 10 + Math.random() * 50;
    const tearY = Math.random() * canvas.height;
    const tearOffset = (Math.random() - 0.5) * 30;

    // Draw tear on next frame
    requestAnimationFrame(() => {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, tearY, canvas.width, tearHeight);

        // Shift effect
        const imageData = ctx.getImageData(0, tearY, canvas.width, tearHeight);
        ctx.putImageData(imageData, tearOffset, tearY);
        ctx.restore();
    });
}

/**
 * Burn whole screen effect
 */
function burnScreen() {
    // Create burn particles across screen
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createBurn(x, y, 30);
    }

    // Flash effect
    ctx.save();
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Add to destruction level
    destructionLevel += 0.5;

    // Trigger glitch too
    triggerGlitch(500);
}

/**
 * Reset all effects
 */
function resetDestruction() {
    particles = [];
    burnPoints = [];
    destructionLevel = 0;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset hero
    const hero = document.querySelector('.hero-destroy-zone');
    if (hero) {
        hero.classList.remove('destroyed');
    }

    // Reset letters
    document.querySelectorAll('.hero-letter').forEach(letter => {
        letter.classList.remove('burning');
    });
}

/**
 * Animation loop
 */
function animate() {
    // Partial clear for trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw burn marks
    burnPoints.forEach(point => {
        ctx.save();
        ctx.globalAlpha = point.opacity * 0.5;
        ctx.fillStyle = '#1a0000';
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Fade burn marks slowly
        point.opacity *= 0.999;
    });

    // Remove faded burn marks
    burnPoints = burnPoints.filter(p => p.opacity > 0.01);

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });

    // Remove dead particles
    particles = particles.filter(p => p.life > 0);

    // Random ambient destruction if level is high
    if (destructionLevel > 2 && Math.random() < 0.02) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createBurn(x, y, 10);
    }

    // Random glitch if destruction is high
    if (destructionLevel > 3 && Math.random() < 0.005) {
        triggerGlitch(100);
    }

    requestAnimationFrame(animate);
}

/**
 * Menu functionality
 */
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            triggerGlitch(200);
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Hero destruction interaction
 */
function initHeroDestruction() {
    const heroZone = document.querySelector('.hero-destroy-zone');
    const letters = document.querySelectorAll('.hero-letter[data-burn]');

    if (heroZone) {
        heroZone.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY + window.scrollY;

            createBurn(x, y, 80);
            heroZone.classList.add('destroyed');

            // Burn letters
            letters.forEach((letter, i) => {
                setTimeout(() => {
                    letter.classList.add('burning');
                }, i * 100);
            });
        });
    }

    // Individual letter burning
    letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
            const rect = letter.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2 + window.scrollY;

            createBurn(x, y, 20);
            letter.classList.add('burning');
        });

        letter.addEventListener('mouseleave', () => {
            letter.classList.remove('burning');
        });
    });
}

/**
 * File item glitch on hover
 */
function initFileGlitch() {
    const fileItems = document.querySelectorAll('.file-item[data-glitch]');

    fileItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (Math.random() < 0.3) {
                item.classList.add('glitching');
                setTimeout(() => item.classList.remove('glitching'), 150);
            }
        });
    });
}

/**
 * Click anywhere to burn
 */
function initClickBurn() {
    document.addEventListener('click', (e) => {
        // Don't burn on buttons or links
        if (e.target.closest('button, a')) return;

        const x = e.clientX;
        const y = e.clientY + window.scrollY;

        createBurn(x, y, 40);
    });
}

/**
 * Control buttons
 */
function initControls() {
    const burnBtn = document.getElementById('burnBtn');
    const glitchBtn = document.getElementById('glitchBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (burnBtn) {
        burnBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            burnScreen();
        });
    }

    if (glitchBtn) {
        glitchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerGlitch(500);

            // Intense glitch
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createScreenTear(), i * 50);
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetDestruction();
        });
    }
}

/**
 * Scroll-triggered destruction
 */
function initScrollDestruction() {
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const delta = Math.abs(scrollY - lastScrollY);

        // Create particles on fast scroll
        if (delta > 50) {
            const x = Math.random() * canvas.width;
            const y = scrollY + Math.random() * window.innerHeight;
            createBurn(x, y, Math.floor(delta / 10));
        }

        lastScrollY = scrollY;
    });
}

/**
 * Initialize everything
 */
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initMenu();
    initHeroDestruction();
    initFileGlitch();
    initClickBurn();
    initControls();
    initScrollDestruction();

    console.log('%c🔥 BRUTALIST RAW ACTIVATED 🔥', 'font-size: 24px; color: #ff0000; background: #000; padding: 10px;');
    console.log('%cDESTROY EVERYTHING.', 'font-size: 14px; color: #ffffff;');

    // Initial dramatic effect
    setTimeout(() => {
        triggerGlitch(300);
    }, 500);
});
