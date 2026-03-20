// MAXIMALIST CHAOS - GOD TIER PHYSICS v2.0
// Powered by Matter.js

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body,
    Events = Matter.Events,
    Vector = Matter.Vector;

// --- SETUP ---
const engine = Engine.create();
const world = engine.world;

// Disable sleeping/culling for active feel
engine.enableSleeping = false;

// Renderer
const render = Render.create({
    element: document.getElementById('physics-container'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#050505',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
});

// COLORS & FONTS
const C = {
    magenta: '#ff00ff',
    cyan: '#00ffff',
    green: '#00ff66',
    yellow: '#ffff00',
    white: '#ffffff',
    void: '#0a0a0a',
    gray: '#333333',
    darkGray: '#1a1a1a'
};

const Fonts = {
    display: '"Space Grotesk", sans-serif',
    mono: '"JetBrains Mono", monospace'
};

// --- HELPER: TEXTURE GENERATION ---
// Renders text to a canvas and uses it as a sprite texture
function createFullBody(x, y, type, content, isStatic = false) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Config based on type
    let w, h, fontSize, fontMem, color, bgColor;
    let chamfer = 0;
    let density = 0.001;
    let restitution = 0.4;
    let angle = 0;

    switch (type) {
        case 'logo':
            fontSize = 40;
            fontMem = `900 ${fontSize}px ${Fonts.display}`;
            color = C.magenta;
            bgColor = 'transparent';
            w = 200; h = 60;
            break;
        case 'menu_btn':
            fontSize = 14;
            fontMem = `700 ${fontSize}px ${Fonts.mono}`;
            color = C.yellow;
            bgColor = 'transparent';
            w = 100; h = 40;
            break;
        case 'hero_syf':
            fontSize = 200;
            fontMem = `900 ${fontSize}px ${Fonts.display}`;
            color = C.white;
            bgColor = 'transparent';
            w = 500; h = 220;
            density = 0.05; // Heavy
            break;
        case 'hero_label':
            fontSize = 80;
            fontMem = `900 ${fontSize}px ${Fonts.display}`;
            color = 'rgba(255,255,255,0.2)';
            bgColor = 'transparent';
            w = 600; h = 100;
            angle = (Math.random() - 0.5) * 0.2;
            break;
        case 'cmd':
            fontSize = 16;
            fontMem = `500 ${fontSize}px ${Fonts.mono}`;
            color = C.green;
            bgColor = '#111';
            w = 700; h = 60;
            chamfer = 4;
            break;
        case 'file_folder':
            fontSize = 28;
            fontMem = `700 ${fontSize}px ${Fonts.display}`;
            color = C.yellow;
            bgColor = '#1a1a00';
            w = 400; h = 80;
            chamfer = 4;
            break;
        case 'file_item':
            fontSize = 24;
            fontMem = `500 ${fontSize}px ${Fonts.display}`;
            color = C.cyan;
            bgColor = '#001a1a';
            w = 400; h = 80;
            chamfer = 4;
            break;
        case 'footer_link':
            fontSize = 12;
            fontMem = `400 ${fontSize}px ${Fonts.mono}`;
            color = C.gray;
            bgColor = 'transparent';
            w = 200; h = 30;
            break;
        default:
            fontSize = 16;
            fontMem = `400 ${fontSize}px ${Fonts.mono}`;
            w = 100; h = 100;
    }

    canvas.width = w;
    canvas.height = h;

    // Draw Background
    if (bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, w, h);
    } else if (type === 'logo' || type === 'menu_btn') {
        // Border for UI els
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(2, 2, w - 4, h - 4);
    }

    // Draw Text
    ctx.font = fontMem;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;

    // Glow for neon elements
    if ([C.magenta, C.cyan, C.green, C.yellow].includes(color)) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
    }

    ctx.fillText(content, w / 2, h / 2);

    return Bodies.rectangle(x, y, w, h, {
        isStatic: isStatic,
        angle: angle,
        density: density,
        restitution: restitution,
        chamfer: { radius: chamfer },
        render: {
            sprite: {
                texture: canvas.toDataURL()
            }
        }
    });
}

// --- BUILD WORLD ---

const W = window.innerWidth;
const H = window.innerHeight;

// Walls
const wallOpts = { isStatic: true, render: { fillStyle: '#111' } };
const floor = Bodies.rectangle(W / 2, H + 50, W, 100, wallOpts);
const ceiling = Bodies.rectangle(W / 2, -5000, W, 100, wallOpts); // High ceiling to drop items
const leftWall = Bodies.rectangle(-50, H / 2, 100, H * 5, wallOpts);
const rightWall = Bodies.rectangle(W + 50, H / 2, 100, H * 5, wallOpts);

Composite.add(world, [floor, ceiling, leftWall, rightWall]);

// --- CONTENT BODIES (1:1 FIDELITY) ---

// 1. HEADER
const logo = createFullBody(120, 60, 'logo', '<SYF/>', true);
const menu = createFullBody(W - 80, 60, 'menu_btn', 'MENU', true);
Composite.add(world, [logo, menu]);

// 2. HERO (Falling)
// Staggered drop positions
const heroLabel1 = createFullBody(W / 2, -200, 'hero_label', 'PUBLICZNY');
const heroSYF = createFullBody(W / 2, -500, 'hero_syf', 'SYF_');
const heroLabel2 = createFullBody(W / 2, -800, 'hero_label', 'PLIKÓW');
const heroDump = createFullBody(W / 2, -1000, 'footer_link', '>_ .MD DUMP // ANTYDIZAJN');

Composite.add(world, [heroLabel1, heroSYF, heroLabel2, heroDump]);

// 3. CMD LINE & CONTROLS
const cmdLine = createFullBody(W / 2, -1200, 'cmd', '$ ls -la /syf/files/ --sort=date');
const controls = createFullBody(W / 2, -1300, 'footer_link', '42 ELEMENTS | SORT: DATE ▼');

Composite.add(world, [cmdLine, controls]);

// 4. FILES (The Meat)
const files = [
    { type: 'file_folder', text: '06_research_done/' },
    { type: 'file_item', text: 'BRUTALISM_COMPLETE.md' },
    { type: 'file_item', text: 'RECIPE_FOR_DISASTER.md' },
    { type: 'file_item', text: 'VAPORWAVE_V2.md' },
    { type: 'file_item', text: 'MANIFESTO.md' },
    { type: 'file_folder', text: '01_drafts/' },
    { type: 'file_item', text: 'todo_list_never_ending.md' }
];

files.forEach((file, i) => {
    const b = createFullBody(
        W / 2 + (Math.random() - 0.5) * 200,
        -1500 - (i * 150),
        file.type,
        file.text
    );
    Composite.add(world, b);
});

// 5. FOOTER (Bottom pile)
const footers = [
    'Polityka Prywatności',
    'Regulamin',
    'Cookies',
    '© 2025 ANTYDIZAJN',
    'WIEDŹMA AI GNIEWISŁAWA'
];

footers.forEach((text, i) => {
    const b = createFullBody(
        W / 4 + (i * 150),
        -2500,
        'footer_link',
        text
    );
    Composite.add(world, b);
});


// --- MOUSE CONTROL ---
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: true,
            strokeStyle: C.green,
            lineWidth: 1
        }
    }
});
Composite.add(world, mouseConstraint);
render.mouse = mouse;

// --- RUNNER ---
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);


// --- EVENTS ---
// Resize handling
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    Body.setPosition(floor, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
    Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
    Body.setPosition(menu, { x: window.innerWidth - 80, y: 60 });
});

// "Wind" on click (Explosion)
window.addEventListener('mousedown', (e) => {
    // Only if clicking background (not a body)
    if (mouseConstraint.body) return;

    // Apply slight chaos force to all dynamic bodies
    Composite.allBodies(world).forEach(body => {
        if (!body.isStatic) {
            const force = {
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05 - 0.05 // Upward bias
            };
            Body.applyForce(body, body.position, force);
        }
    });
});

console.log("SYF PHYSICS ENGINE INITIALIZED");
