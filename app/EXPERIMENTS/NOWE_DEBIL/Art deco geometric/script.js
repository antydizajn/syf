// ART DECO - GOLDEN FLUID

const container = document.getElementById('deco-container');

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 1000;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// PARTICLES
const particleCount = 3000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const scales = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Spiral distribution
    const r = Math.random() * 2000;
    const theta = Math.random() * Math.PI * 2 * 5; // 5 turns

    positions[i3] = r * Math.cos(theta); // x
    positions[i3 + 1] = (Math.random() - 0.5) * 1000; // y (height)
    positions[i3 + 2] = r * Math.sin(theta); // z

    scales[i] = Math.random();
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

// TEXTURE (Procedural circle)
const canvas = document.createElement('canvas');
canvas.width = 32; canvas.height = 32;
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.arc(16, 16, 14, 0, Math.PI * 2);
ctx.fillStyle = '#ffffff';
ctx.fill();
const texture = new THREE.CanvasTexture(canvas);

// MATERIAL
const material = new THREE.PointsMaterial({
    size: 6,
    color: 0xd4af37, // Gold
    map: texture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// INTERACTION
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 2;
    mouseY = (e.clientY - window.innerHeight / 2) * 2;
});

// ANIMATION
const clock = new THREE.Clock();

function animate() {
    const elapsed = clock.getElapsedTime();

    // Rotate system
    particles.rotation.y = elapsed * 0.05 + (mouseX * 0.0001);
    particles.rotation.x = mouseY * 0.0001;

    // Pulse effect
    const scale = 1 + Math.sin(elapsed) * 0.05;
    particles.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// RESIZE
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log("DEC0 GOLD ONLINE");
