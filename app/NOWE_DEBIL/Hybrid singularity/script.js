// HYBRID SINGULARITY ENGINE | GOD TIER V3.0
// THREE.JS + CANNON.JS (True 3D Physics)

const container = document.getElementById('singularity-container');

// --- THREE.JS SETUP ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0015);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 200);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
container.appendChild(renderer.domElement);

// LIGHTS
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff00ff, 2, 500);
pointLight.position.set(0, 100, 0);
scene.add(pointLight);

// --- CANNON.JS PHYSICS SETUP ---
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // ZERO G
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;

// HELPERS
const meshes = [];
const bodies = [];

function createBody(w, h, d, x, y, z, mass, color, text = null) {
    // 1. THREE MESH
    const geo = new THREE.BoxGeometry(w, h, d);

    // Canvas Texture for Text?
    let mat;
    if (text) {
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 512, 128);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 60px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 256, 64);

        const tex = new THREE.CanvasTexture(canvas);
        mat = new THREE.MeshPhongMaterial({ map: tex, emissive: color, emissiveIntensity: 0.5 });
    } else {
        mat = new THREE.MeshPhongMaterial({ color: color, wireframe: false, shininess: 100 });
    }

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    meshes.push(mesh);

    // 2. CANNON BODY
    const shape = new CANNON.Box(new CANNON.Vec3(w / 2, h / 2, d / 2));
    const body = new CANNON.Body({ mass: mass });
    body.addShape(shape);
    body.position.set(x, y, z);
    // Initial random spin
    body.angularVelocity.set(Math.random(), Math.random(), Math.random());
    // Initial random velocity
    body.velocity.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);

    world.addBody(body);
    bodies.push(body);
}

// --- CONTENT GENERATION ---

// 1. THE MONOLITH (Logo)
createBody(100, 40, 20, 0, 0, 0, 50, '#ff00ff', 'SYF_');

// 2. FILES (Floating Blocks)
const fileData = [
    '06_research/', 'BRUTAL.md', 'RECIPES.md',
    'VAPOR.md', 'MANIFEST.md', 'DRAFTS/', 'TODO.md', 'CONFIG.cfg',
    '.env.local', 'package.json', 'README.md', 'LICENSE'
];

fileData.forEach((f, i) => {
    // Random positions
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;
    const col = i % 2 === 0 ? '#00ffff' : '#00ff66';
    createBody(40, 10, 5, x, y, z, 5, col, f);
});

// 3. DEBRIS (Thousands of tiny particles)
const debrisGeo = new THREE.TetrahedronGeometry(1, 0);
const debrisMat = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
const debrisMesh = new THREE.InstancedMesh(debrisGeo, debrisMat, 500);
const dummy = new THREE.Object3D();

for (let i = 0; i < 500; i++) {
    dummy.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
    );
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    dummy.scale.setScalar(Math.random() * 2);
    dummy.updateMatrix();
    debrisMesh.setMatrixAt(i, dummy.matrix);
}
scene.add(debrisMesh);


// --- POST PROCESSING (BLOOM) ---
const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 1.2;
bloomPass.radius = 0.5;
composer.addPass(bloomPass);

// --- ANIMATION LOOP ---
const timeStep = 1 / 60;
let lastCallTime;

// Camera orbit
let angle = 0;

function animate(time) {
    requestAnimationFrame(animate);

    // Update Physics
    world.step(timeStep);

    // Sync Mesh with Body
    for (let i = 0; i < meshes.length; i++) {
        meshes[i].position.copy(bodies[i].position);
        meshes[i].quaternion.copy(bodies[i].quaternion);

        // Boundaries (Containment Field)
        const b = bodies[i];
        const limit = 300;
        if (b.position.length() > limit) {
            // Push back to center
            const force = b.position.negate().unit().scale(10);
            b.applyForce(force, b.position);
        }
    }

    // Camera Orbit
    angle += 0.002;
    camera.position.x = Math.cos(angle) * 150;
    camera.position.z = Math.sin(angle) * 150;
    camera.lookAt(0, 0, 0);

    // Rotate debris slightly
    debrisMesh.rotation.y += 0.001;

    composer.render();
}

animate();

// --- RESIZE ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

console.log("SINGULARITY REACHED");
