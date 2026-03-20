// DATA
const files = [
    {
        name: "VAPORWAVE_COMPLETE.md",
        content: `# VAPORWAVE ESTETYKA I FILOZOFIA

## 1. WSTĘP - CZYM JEST VAPORWAVE?

**Vaporwave** to nie tylko gatunek muzyczny, to **mikro-kultura internetowa** i estetyka, która wyrosła z fascynacji i ironicznej krytyki konsumpcjonizmu lat 80. i 90. To "duchowa muzyka korporacji", "wspomnienie z przyszłości, która nigdy nie nadeszła" (lost futures).

To **hauntology** (widmologia) w praktyce cyfrowej – tęsknota za światem, który był obiecywany w reklamach, ale nigdy się nie zmaterializował.

### KLUCZOWE POJĘCIA:
- **Hauntology:** Przeszłość nawiedzająca teraźniejszość. Poczucie utraconego czasu.
- **Lost Futures:** Przyszłość optymizmu technologicznego, która się nie wydarzyła.
- **Consumer Capitalism:** Ironizacja centrów handlowych, windy, reklam.
- **Digital Decay:** Glitche, szumy, degradacja cyfrowa (JPEG artifacts).

---

## 2. FILARY WIZUALNE

### A. KOLORYSTYKA (NEON & PASTEL)
- **Pink:** #FF71CE (Hot Pink)
- **Cyan:** #01CDFE (Electric Blue)
- **Purple:** #B967FF (Neon Purple)
- **Yellow:** #FFFB96 (Pale Yellow)
- **Tło:** Czerń, ciemny fiolet, gradienty zachodu słońca (sunset grids).

### B. IKONOGRAFIA
1.  **Rzeźby antyczne:** (Helios, David) – symbol "wysokiej kultury" zderzony z kiczem. Często zglitchowane lub w okularach VR.
2.  **Technologia 80s/90s:** Windows 95/98 UI, dyskietki, CD, stare komputery (Macintosh Plus), Gameboy.
3.  **Tropikalny kicz:** Palmy, delfiny, woda, zachody słońca.
4.  **Japońskie znaki:** (Kanji) – np. リサフランク420 / 現代のコンピュー (Modern Computing). Fetyszyzacja egzotyki.
5.  **Architektura:** Centra handlowe (Dead Malls), marmurowe posadzki, szachownice.

### C. UI ELEMENTS
- Siatki perspektywiczne (Grid floor).
- Okna systemowe Windows 95.
- Scanlines (linie z monitorów CRT).
- Aberracja chromatyczna (rozjechane kolory RGB).
- Glitch art (błędy kompresji).
`
    },
    {
        name: "GHOSTS_OF_MY_LIFE.md",
        content: `# Mark Fisher - Ghosts of My Life

## Hauntology
The future is not what it used to be. We are haunted by the futures that failed to happen.

`
    },
    {
        name: "SYF_MANIFEST.md",
        content: `# SYF MANIFEST

## 1. NIE DLA KAŻDEGO
Jeśli to czytasz, to znaczy że szukasz czegoś więcej niż Bootstrap i Tailwind. Szukasz brudu. Szukasz prawdy.
`
    }
];

// 3D SCENE CONFIG
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030014, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
rgbShift.uniforms['amount'].value = 0.001;
composer.addPass(rgbShift);

// --- OBJECTS ---

// 1. NEON GRID
const gridHelper = new THREE.GridHelper(200, 50, 0xff00ff, 0xff00ff);
scene.add(gridHelper);

// 2. MOVING TERRAIN (Wireframe)
const planeGeo = new THREE.PlaneGeometry(200, 200, 40, 40);
const planeMat = new THREE.MeshBasicMaterial({ color: 0x05D9E8, wireframe: true, transparent: true, opacity: 0.3 });
const terrain = new THREE.Mesh(planeGeo, planeMat);
terrain.rotation.x = -Math.PI / 2;
terrain.position.y = -2;
scene.add(terrain);

// 3. RETRO SUN
const sunGeo = new THREE.CircleGeometry(15, 32);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xFF2A6D });
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.position.set(0, 10, -50);
scene.add(sun);

// Sun Glow
const glowGeo = new THREE.CircleGeometry(16, 32);
const glowMat = new THREE.MeshBasicMaterial({ color: 0xFF2A6D, transparent: true, opacity: 0.3 });
const glow = new THREE.Mesh(glowGeo, glowMat);
glow.position.set(0, 10, -51);
scene.add(glow);

// --- UI LOGIC ---

const fileListEl = document.getElementById('file-list');
const windowEl = document.getElementById('content-window');
const titleEl = document.getElementById('win-title');
const bodyEl = document.getElementById('win-body');

// Init List
files.forEach((file, i) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `<span class="icon">💾</span> <span class="fname">${file.name}</span>`;
    item.onclick = () => openFile(i);
    fileListEl.appendChild(item);
});

function openFile(index) {
    const f = files[index];
    titleEl.innerText = f.name.toUpperCase();
    bodyEl.innerHTML = marked.parse(f.content);
    windowEl.classList.add('open');

    // Highlight list item
    document.querySelectorAll('.file-item').forEach((el, i) => {
        if (i === index) el.classList.add('active');
        else el.classList.remove('active');
    });

    // Intense Glitch
    rgbShift.uniforms['amount'].value = 0.02;
    setTimeout(() => { rgbShift.uniforms['amount'].value = 0.001; }, 300);
}

window.closeFile = function () {
    windowEl.classList.remove('open');
    document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
}

// --- ANIMATION ---
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Move Terrain
    const pos = terrain.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i); // This is Z in plane space (depth)
        const z = Math.sin(x * 0.1 + time) * 2 + Math.cos(y * 0.1 + time) * 2;
        pos.setZ(i, z);
    }
    pos.needsUpdate = true;

    // Pulse Sun
    const scale = 1 + Math.sin(time * 2) * 0.05;
    sun.scale.set(scale, scale, 1);

    // Camera float
    camera.position.x = Math.sin(time * 0.2) * 5;
    camera.lookAt(0, 5, -20);

    composer.render();
}
animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
