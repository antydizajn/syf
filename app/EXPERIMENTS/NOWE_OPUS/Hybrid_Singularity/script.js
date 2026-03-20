/**
 * HYBRID SINGULARITY - three.js 3D + matter.js 2D Physics
 * PASSIVE ART - Self-Sustaining Chaotic System
 * Neon Blocks Colliding in Zero-G
 * GOD TIER 20/10 - THE ULTIMATE
 */

// ========================================
// THREE.JS 3D SCENE - Background
// ========================================
let scene3D, camera3D, renderer3D;
let cubes = [];
let clock;

// ========================================
// MATTER.JS 2D PHYSICS - Overlay
// ========================================
const { Engine, Render, Runner, Bodies, Body, Composite, Events, Vector } = Matter;
let engine2D, render2D, runner2D, world2D;
let blocks = [];

// Colors
const NEON_COLORS = [
    0x00ffff, // cyan
    0xff00ff, // magenta
    0xff0066, // pink
    0x0066ff, // blue
    0x9900ff, // purple
    0x00ff66, // green
];

const NEON_COLORS_HEX = [
    '#00ffff',
    '#ff00ff',
    '#ff0066',
    '#0066ff',
    '#9900ff',
    '#00ff66',
];

/**
 * Initialize Three.js 3D background
 */
function init3DScene() {
    const canvas = document.getElementById('singularity-canvas');

    scene3D = new THREE.Scene();
    scene3D.fog = new THREE.FogExp2(0x000000, 0.015);

    camera3D = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera3D.position.z = 100;

    renderer3D = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer3D.setSize(window.innerWidth, window.innerHeight);
    renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer3D.setClearColor(0x000000, 1);

    clock = new THREE.Clock();

    // Create floating cubes in 3D space
    create3DCubes(50);

    // Create starfield
    createStarfield();

    // Create central vortex
    createVortex();
}

/**
 * Create floating 3D cubes
 */
function create3DCubes(count) {
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 5 + 2;
        const geometry = new THREE.BoxGeometry(size, size, size);

        const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];

        // Wireframe material for neon look
        const material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        const cube = new THREE.Mesh(geometry, material);

        // Random position in 3D space
        cube.position.x = (Math.random() - 0.5) * 200;
        cube.position.y = (Math.random() - 0.5) * 200;
        cube.position.z = (Math.random() - 0.5) * 200;

        // Random rotation speeds
        cube.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            driftSpeed: {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.3
            },
            originalColor: color
        };

        cubes.push(cube);
        scene3D.add(cube);
    }
}

/**
 * Create starfield
 */
function createStarfield() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 3000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.6
    });

    const stars = new THREE.Points(geometry, material);
    scene3D.add(stars);
}

/**
 * Create central vortex effect
 */
function createVortex() {
    const geometry = new THREE.TorusGeometry(30, 0.5, 16, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });

    const torus1 = new THREE.Mesh(geometry, material);
    scene3D.add(torus1);

    const material2 = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.2,
        wireframe: true
    });

    const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(40, 0.3, 16, 100),
        material2
    );
    torus2.rotation.x = Math.PI / 4;
    scene3D.add(torus2);

    const torus3 = new THREE.Mesh(
        new THREE.TorusGeometry(50, 0.2, 16, 100),
        new THREE.MeshBasicMaterial({
            color: 0x9900ff,
            transparent: true,
            opacity: 0.15,
            wireframe: true
        })
    );
    torus3.rotation.x = -Math.PI / 4;
    torus3.rotation.y = Math.PI / 4;
    scene3D.add(torus3);

    window.vortexRings = [torus1, torus2, torus3];
}

/**
 * Initialize Matter.js 2D physics overlay
 */
function init2DPhysics() {
    const canvas = document.getElementById('physics-overlay');

    // Create engine with zero gravity
    engine2D = Engine.create({
        gravity: { x: 0, y: 0, scale: 0 }
    });
    world2D = engine2D.world;

    // Create renderer
    render2D = Render.create({
        canvas: canvas,
        engine: engine2D,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio || 1
        }
    });

    // Create boundaries (invisible walls)
    const wallThickness = 50;
    const walls = [
        Bodies.rectangle(window.innerWidth / 2, -wallThickness / 2, window.innerWidth, wallThickness, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + wallThickness / 2, window.innerWidth, wallThickness, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(-wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(window.innerWidth + wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true, render: { visible: false } })
    ];
    Composite.add(world2D, walls);

    // Create neon blocks
    create2DBlocks(20);

    // Start physics
    runner2D = Runner.create();
    Runner.run(runner2D, engine2D);
    Render.run(render2D);

    // Collision glow effect
    Events.on(engine2D, 'collisionStart', handleCollision);

    // Periodic chaos injection
    setInterval(injectChaos, 5000);
}

/**
 * Create 2D neon blocks
 */
function create2DBlocks(count) {
    for (let i = 0; i < count; i++) {
        const size = 30 + Math.random() * 50;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const color = NEON_COLORS_HEX[Math.floor(Math.random() * NEON_COLORS_HEX.length)];

        const block = Bodies.rectangle(x, y, size, size, {
            restitution: 1, // Perfect bounce
            friction: 0,
            frictionAir: 0,
            render: {
                fillStyle: 'transparent',
                strokeStyle: color,
                lineWidth: 2
            },
            label: 'neon-block'
        });

        // Give initial velocity
        Body.setVelocity(block, {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
        });

        // Give initial rotation
        Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.1);

        blocks.push(block);
        Composite.add(world2D, block);
    }
}

/**
 * Handle collisions - visual effects
 */
function handleCollision(event) {
    event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;

        // Flash on collision
        if (bodyA.label === 'neon-block') {
            flashBlock(bodyA);
        }
        if (bodyB.label === 'neon-block') {
            flashBlock(bodyB);
        }

        // Create collision particle
        if (pair.collision.supports[0]) {
            createCollisionEffect(pair.collision.supports[0]);
        }
    });
}

/**
 * Flash block on collision
 */
function flashBlock(block) {
    const originalColor = block.render.strokeStyle;
    block.render.strokeStyle = '#ffffff';
    block.render.lineWidth = 4;

    setTimeout(() => {
        block.render.strokeStyle = originalColor;
        block.render.lineWidth = 2;
    }, 100);
}

/**
 * Create collision particle effect
 */
function createCollisionEffect(position) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${position.x}px;
        top: ${position.y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 5;
        animation: collision-burst 0.3s ease-out forwards;
    `;
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 300);
}

/**
 * Inject periodic chaos
 */
function injectChaos() {
    blocks.forEach(block => {
        // Random impulse
        Body.applyForce(block, block.position, {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005
        });

        // Ensure minimum velocity
        const speed = Vector.magnitude(block.velocity);
        if (speed < 2) {
            Body.setVelocity(block, {
                x: block.velocity.x * 2 + (Math.random() - 0.5) * 5,
                y: block.velocity.y * 2 + (Math.random() - 0.5) * 5
            });
        }

        // Random color change occasionally
        if (Math.random() < 0.1) {
            block.render.strokeStyle = NEON_COLORS_HEX[Math.floor(Math.random() * NEON_COLORS_HEX.length)];
        }
    });
}

/**
 * Animation loop for 3D scene
 */
function animate3D() {
    requestAnimationFrame(animate3D);

    const time = clock.getElapsedTime();

    // Animate cubes
    cubes.forEach((cube, i) => {
        // Rotation
        cube.rotation.x += cube.userData.rotationSpeed.x;
        cube.rotation.y += cube.userData.rotationSpeed.y;
        cube.rotation.z += cube.userData.rotationSpeed.z;

        // Drift
        cube.position.x += cube.userData.driftSpeed.x * 0.1;
        cube.position.y += cube.userData.driftSpeed.y * 0.1;
        cube.position.z += cube.userData.driftSpeed.z * 0.1;

        // Boundary wrap
        if (cube.position.x > 100) cube.position.x = -100;
        if (cube.position.x < -100) cube.position.x = 100;
        if (cube.position.y > 100) cube.position.y = -100;
        if (cube.position.y < -100) cube.position.y = 100;
        if (cube.position.z > 100) cube.position.z = -100;
        if (cube.position.z < -100) cube.position.z = 100;

        // Pulse opacity
        cube.material.opacity = 0.4 + Math.sin(time * 2 + i) * 0.2;
    });

    // Animate vortex rings
    if (window.vortexRings) {
        window.vortexRings[0].rotation.z = time * 0.5;
        window.vortexRings[1].rotation.z = -time * 0.3;
        window.vortexRings[1].rotation.x = Math.PI / 4 + Math.sin(time * 0.2) * 0.2;
        window.vortexRings[2].rotation.z = time * 0.2;
        window.vortexRings[2].rotation.y = Math.PI / 4 + Math.cos(time * 0.15) * 0.3;
    }

    // Camera drift
    camera3D.position.x = Math.sin(time * 0.1) * 10;
    camera3D.position.y = Math.cos(time * 0.15) * 10;
    camera3D.lookAt(0, 0, 0);

    renderer3D.render(scene3D, camera3D);
}

/**
 * Handle window resize
 */
function handleResize() {
    // 3D
    camera3D.aspect = window.innerWidth / window.innerHeight;
    camera3D.updateProjectionMatrix();
    renderer3D.setSize(window.innerWidth, window.innerHeight);

    // 2D
    render2D.canvas.width = window.innerWidth;
    render2D.canvas.height = window.innerHeight;
    render2D.options.width = window.innerWidth;
    render2D.options.height = window.innerHeight;
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
 * Add dynamic CSS
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes collision-burst {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize everything
 */
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    init3DScene();
    init2DPhysics();
    initMenu();
    animate3D();

    window.addEventListener('resize', handleResize);

    console.log('%c◈ THE SINGULARITY ACTIVATED ◈', 'font-size: 20px; background: linear-gradient(90deg, #00ffff, #ff00ff); -webkit-background-clip: text; color: transparent; padding: 10px;');
    console.log('%cPassive Art. Observe the chaos. Do not interfere.', 'font-size: 14px; color: #888899;');
});
