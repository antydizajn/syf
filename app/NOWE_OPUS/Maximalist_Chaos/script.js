/**
 * MAXIMALIST CHAOS - matter.js Physics Engine
 * Interactive Gravity Box - Throwable Elements
 * GOD TIER 20/10
 */

// Matter.js module aliases
const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Vector } = Matter;
const MatterBody = Matter.Body;

// Global state
let engine, render, runner, world;
let gravityEnabled = true;
let physicsBodies = [];
let mouseConstraint;

// Colors for physics bodies
const CHAOS_COLORS = [
    '#ff0033', // red
    '#ff00ff', // magenta
    '#00ffff', // cyan
    '#ffff00', // yellow
    '#00ff66', // green
    '#ff6600', // orange
    '#9900ff', // purple
];

/**
 * Initialize the physics world
 */
function initPhysics() {
    // Create engine
    engine = Engine.create({
        gravity: { x: 0, y: 0.5, scale: 0.001 }
    });
    world = engine.world;

    // Get canvas
    const canvas = document.getElementById('physics-world');
    const width = window.innerWidth;
    const height = window.innerHeight * 2; // Extra height for scrolling

    // Create renderer
    render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio || 1
        }
    });

    // Create boundaries (walls)
    const wallThickness = 100;
    const walls = [
        // Bottom
        Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, {
            isStatic: true,
            render: { visible: false },
            label: 'wall-bottom'
        }),
        // Left
        Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
            isStatic: true,
            render: { visible: false },
            label: 'wall-left'
        }),
        // Right
        Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
            isStatic: true,
            render: { visible: false },
            label: 'wall-right'
        }),
        // Top (optional - can remove for objects to fly off)
        Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, {
            isStatic: true,
            render: { visible: false },
            label: 'wall-top'
        })
    ];
    Composite.add(world, walls);

    // Add mouse control
    const mouse = Mouse.create(canvas);
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: true,
                lineWidth: 2,
                strokeStyle: '#ff00ff'
            }
        }
    });
    Composite.add(world, mouseConstraint);

    // Keep mouse in sync with rendering
    render.mouse = mouse;

    // Create floating chaos bodies in background
    createChaosParticles(30);

    // Run the engine and renderer
    runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Collision effects
    Events.on(engine, 'collisionStart', handleCollision);
}

/**
 * Create floating chaos particles
 */
function createChaosParticles(count) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 1.5;
        const size = 20 + Math.random() * 60;
        const shape = Math.random();

        let body;
        const color = CHAOS_COLORS[Math.floor(Math.random() * CHAOS_COLORS.length)];

        const options = {
            restitution: 0.8,
            friction: 0.1,
            frictionAir: 0.01,
            render: {
                fillStyle: color,
                strokeStyle: '#ffffff',
                lineWidth: 2,
                opacity: 0.7
            },
            label: 'chaos-particle'
        };

        if (shape < 0.33) {
            // Circle
            body = Bodies.circle(x, y, size / 2, options);
        } else if (shape < 0.66) {
            // Rectangle
            body = Bodies.rectangle(x, y, size, size * 0.6, options);
        } else {
            // Polygon
            const sides = 3 + Math.floor(Math.random() * 5);
            body = Bodies.polygon(x, y, sides, size / 2, options);
        }

        // Give initial random velocity
        MatterBody.setVelocity(body, {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        });

        // Give initial rotation
        MatterBody.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

        physicsBodies.push(body);
        Composite.add(world, body);
    }
}

/**
 * Handle collision effects
 */
function handleCollision(event) {
    const pairs = event.pairs;

    pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;

        // Calculate collision intensity
        const relativeVelocity = Vector.sub(bodyA.velocity, bodyB.velocity);
        const speed = Vector.magnitude(relativeVelocity);

        if (speed > 3) {
            // Flash effect on high-speed collision
            createCollisionFlash(pair.collision.supports[0] || bodyA.position);

            // Change color randomly on strong impact
            if (speed > 8) {
                const newColor = CHAOS_COLORS[Math.floor(Math.random() * CHAOS_COLORS.length)];
                if (bodyA.label === 'chaos-particle') {
                    bodyA.render.fillStyle = newColor;
                }
                if (bodyB.label === 'chaos-particle') {
                    bodyB.render.fillStyle = newColor;
                }
            }
        }
    });
}

/**
 * Create visual flash on collision
 */
function createCollisionFlash(position) {
    const flash = document.createElement('div');
    flash.className = 'collision-flash';
    flash.style.cssText = `
        position: fixed;
        left: ${position.x}px;
        top: ${position.y}px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,0,255,0.8) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1000;
        animation: flash-out 0.3s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 300);
}

/**
 * Handle window resize
 */
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight * 2;

    render.canvas.width = width;
    render.canvas.height = height;
    render.options.width = width;
    render.options.height = height;
}

/**
 * Toggle gravity
 */
function toggleGravity() {
    gravityEnabled = !gravityEnabled;
    engine.gravity.y = gravityEnabled ? 0.5 : 0;

    const btn = document.getElementById('gravityToggle');
    btn.textContent = gravityEnabled ? '⬇ GRAVITY' : '⬆ ZERO-G';
    btn.style.borderColor = gravityEnabled ? '#ff00ff' : '#00ffff';
    btn.style.color = gravityEnabled ? '#ff00ff' : '#00ffff';

    if (!gravityEnabled) {
        // Give all bodies a small random push in zero-g
        physicsBodies.forEach(body => {
            MatterBody.applyForce(body, body.position, {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            });
        });
    }
}

/**
 * Add chaos - explode everything
 */
function addChaos() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    physicsBodies.forEach(body => {
        const dx = body.position.x - centerX;
        const dy = body.position.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        // Apply explosive force
        MatterBody.applyForce(body, body.position, {
            x: (dx / distance) * 0.5,
            y: (dy / distance) * 0.5
        });

        // Add rotation
        MatterBody.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);

        // Change colors
        body.render.fillStyle = CHAOS_COLORS[Math.floor(Math.random() * CHAOS_COLORS.length)];
    });

    // Add more particles
    createChaosParticles(10);

    // Screen flash
    document.body.style.boxShadow = 'inset 0 0 100px rgba(255,0,255,0.5)';
    setTimeout(() => {
        document.body.style.boxShadow = 'none';
    }, 100);
}

/**
 * Reset the physics world
 */
function resetWorld() {
    // Remove all chaos particles
    physicsBodies.forEach(body => {
        Composite.remove(world, body);
    });
    physicsBodies = [];

    // Re-create particles
    createChaosParticles(30);

    // Reset gravity
    gravityEnabled = true;
    engine.gravity.y = 0.5;

    const btn = document.getElementById('gravityToggle');
    btn.textContent = '⬇ GRAVITY';
    btn.style.borderColor = '#ff00ff';
    btn.style.color = '#ff00ff';
}

/**
 * Menu functionality
 */
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');

    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Interactive hero letters
 */
function initHeroInteraction() {
    const letters = document.querySelectorAll('.hero-letter:not(.underscore)');

    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            // Create a physics body at letter position
            const rect = letter.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2 + window.scrollY;

            const size = 40 + Math.random() * 40;
            const color = CHAOS_COLORS[Math.floor(Math.random() * CHAOS_COLORS.length)];

            const body = Bodies.circle(x, y, size, {
                restitution: 0.9,
                friction: 0.05,
                render: {
                    fillStyle: color,
                    strokeStyle: '#ffffff',
                    lineWidth: 2
                },
                label: 'chaos-particle'
            });

            // Explosive velocity
            MatterBody.setVelocity(body, {
                x: (Math.random() - 0.5) * 20,
                y: -10 - Math.random() * 10
            });

            physicsBodies.push(body);
            Composite.add(world, body);

            // Flash the letter
            letter.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                letter.style.transform = '';
            }, 100);
        });
    });
}

/**
 * Make file items draggable
 */
function initFileDrag() {
    const fileItems = document.querySelectorAll('.file-item');

    fileItems.forEach(item => {
        item.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left click only
                item.style.transform = 'scale(0.95) rotate(2deg)';
            }
        });

        item.addEventListener('mouseup', () => {
            item.style.transform = '';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
}

/**
 * Add CSS for collision flash animation
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash-out {
            0% {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize everything
 */
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    initPhysics();
    initMenu();
    initHeroInteraction();
    initFileDrag();

    // Gravity controls
    document.getElementById('gravityToggle').addEventListener('click', toggleGravity);
    document.getElementById('chaosBtn').addEventListener('click', addChaos);
    document.getElementById('resetBtn').addEventListener('click', resetWorld);

    console.log('%c🔥 MAXIMALIST CHAOS ACTIVATED 🔥', 'font-size: 24px; color: #ff00ff; text-shadow: 0 0 10px #ff00ff;');
    console.log('%cThrow everything. Break nothing. Embrace the chaos.', 'font-size: 14px; color: #00ffff;');
});

/**
 * Parallax scroll effect for physics bodies
 */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    physicsBodies.forEach((body, i) => {
        // Subtle floating effect based on scroll
        const factor = (i % 3 + 1) * 0.1;
        MatterBody.applyForce(body, body.position, {
            x: Math.sin(scrollY * 0.01 + i) * 0.0005 * factor,
            y: 0
        });
    });
});
