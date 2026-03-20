// RETRO-FUTURISTIC WEBGL | GOD TIER v2.0

const container = document.getElementById('canvas-container');

// SCENE
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a001a, 0.002); // Deep purple fog

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
camera.position.z = 400;
camera.position.y = 80;

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// --- ASSETS ---

// 1. GRID
const gridHelper = new THREE.GridHelper(4000, 80, 0xff00ff, 0x1a0033);
gridHelper.position.y = -100;
scene.add(gridHelper);

// 2. MIRROR FLOOR
const planeGeo = new THREE.PlaneGeometry(4000, 4000);
const planeMat = new THREE.MeshBasicMaterial({ color: 0x050011, transparent: true, opacity: 0.9 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -101;
scene.add(plane);

// 3. SUN (Procedural Shader Mesh conceptually, here simplified to Geometry for reliability)
const sunGeo = new THREE.CircleGeometry(400, 64);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.position.z = -1500;
sun.position.y = 200;
scene.add(sun);

// --- CONTENT GENERATION (Canvas Textures) ---

function createLabel(text, color, size = 100, isBold = true) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Transparent bg
    ctx.font = `${isBold ? '900' : '400'} ${size}px "Space Grotesk"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glow effect in texture
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Stroke
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(400, 100, 1);
    return sprite;
}

// HERO
const heroSYF = createLabel('SYF_', '#ff00ff', 180);
heroSYF.position.y = 100;
heroSYF.position.z = -200;
scene.add(heroSYF);

const heroLabel = createLabel('PUBLICZNY PLIKÓW', '#ffffff', 80, false);
heroLabel.position.y = 200;
heroLabel.position.z = -300;
scene.add(heroLabel);

// FILES (Deep Z-Tunnel)
const fileData = [
    { t: '06_research_done/', c: '#00ffff' },
    { t: 'BRUTALISM.md', c: '#00ff66' },
    { t: 'RECIPE_FOR_DISASTER.md', c: '#00ff66' },
    { t: 'VAPORWAVE_V2.md', c: '#00ff66' },
    { t: 'MANIFESTO.md', c: '#00ff66' },
    { t: '01_drafts/', c: '#00ffff' },
    { t: 'todo_list.md', c: '#00ff66' }
];

const filesGroup = new THREE.Group();
fileData.forEach((f, i) => {
    const label = createLabel(f.t, f.c, 60);
    // Alternate sides
    label.position.x = (i % 2 === 0 ? -150 : 150);
    // Deep Z spacing
    label.position.z = 200 - (i * 300);
    label.position.y = -20 + Math.sin(i) * 20;

    filesGroup.add(label);
});
scene.add(filesGroup);


// --- POST PROCESSING ---
const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

// Bloom
const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2.0; // STRONG GLOW
bloomPass.radius = 0.5;
composer.addPass(bloomPass);

// RGB Shift (Glitch)
const rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
rgbShift.uniforms['amount'].value = 0.002;
composer.addPass(rgbShift);


// --- ANIMATION ---
let time = 0;
let speed = 2;

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Move Grid Texture Effect
    gridHelper.position.z = (time * 100) % 100; // Infinite scroll illusion

    // Floating Hero
    heroSYF.position.y = 100 + Math.sin(time) * 10;

    // Moving Files
    filesGroup.children.forEach((child, i) => {
        child.position.z += speed;

        // Loop
        if (child.position.z > 500) {
            child.position.z = -1500; // Send back
            child.position.x = (Math.random() - 0.5) * 400; // Random x
        }
    });

    // Random Glitch
    if (Math.random() > 0.99) {
        rgbShift.uniforms['amount'].value = 0.02; // Glitch spike
    } else {
        rgbShift.uniforms['amount'].value = 0.002;
    }

    composer.render();
}

animate();

// --- EVENTS ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Speed up on click (Warp Speed)
window.addEventListener('mousedown', () => {
    speed = 10;
    camera.fov = 90;
    camera.updateProjectionMatrix();
});
window.addEventListener('mouseup', () => {
    speed = 2;
    camera.fov = 75;
    camera.updateProjectionMatrix();
});

console.log("RETRO ENGINE: SYF_SYS ONLINE");
