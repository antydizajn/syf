// --- DATA ---
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

### Key concepts:
- **Cancellation of the future**: Culture has stopped moving forward. We are stuck in a loop of recycling the past.
- **Slow cancellation**: No big bang, just a gradual erosion of newness.

> "The 21st century is just the 20th century on loop."

Vaporwave is the soundtrack to this realization.`
    },
    {
        name: "JAPANESE_DREAM.md",
        content: `# リサフランク420 / 現代のコンピュ

## MACINTOSH PLUS

The album that started it all. Floral Shoppe (2011).

### Tracklist:
1.  **boot**
2.  **リサフランク420 / 現代のコンピュ** (Lisa Frank 420 / Modern Computing)
3.  **花の専門店** (Floral Shoppe)
4.  **ライブラリ** (Library)
`
    },
    {
        name: "SYF_MANIFEST.md",
        content: `# SYF MANIFEST

## 1. NIE DLA KAŻDEGO
Jeśli to czytasz, to znaczy że szukasz czegoś więcej niż Bootstrap i Tailwind. Szukasz brudu. Szukasz prawdy.

## 2. ANTYDIZAJN
To nie jest brak designu. To jest design, który ma w dupie konwenanse.
- Zamiast czytelności - emocja.
- Zamiast UX - doświadczenie (często bolesne).
- Zamiast konwersji - selekcja.

## 3. PRAWDA > PIĘKNO
Piękno kłamie. Brzydota jest szczera.
`
    }
];

// --- 3D SCENE SETUP ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050014, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
rgbShift.uniforms['amount'].value = 0.002;
composer.addPass(rgbShift);

// BACKGROUND OBJECTS
// Grid
const gridPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300, 50, 50),
    new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, transparent: true, opacity: 0.2 })
);
gridPlane.rotation.x = -Math.PI / 2;
gridPlane.position.y = -10;
scene.add(gridPlane);

// Sun (Simplified for perf)
const sun = new THREE.Mesh(
    new THREE.CircleGeometry(30, 32),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }) // Simple placeholder style
);
sun.position.set(0, 20, -100);
scene.add(sun);


// --- UI LOGIC ---
const fileListContainer = document.getElementById('file-list-container');
let activeFileIndex = -1;

// Generate sidebar items
files.forEach((file, idx) => {
    const btn = document.createElement('button');
    btn.className = 'file-btn';
    btn.innerHTML = `<span class="file-icon">💾</span> ${file.name}`;
    btn.onclick = () => loadFile(idx);
    fileListContainer.appendChild(btn);
});

function loadFile(idx) {
    activeFileIndex = idx;

    // Update UI Active State
    document.querySelectorAll('.file-btn').forEach((b, i) => {
        if (i === idx) b.classList.add('active');
        else b.classList.remove('active');
    });

    // Show Content Window
    const viewer = document.getElementById('main-viewer');
    const title = document.getElementById('viewer-filename');
    const content = document.getElementById('viewer-content');

    title.innerText = files[idx].name;
    content.innerHTML = marked.parse(files[idx].content);
    viewer.classList.add('open');

    // Trigger 3D Glitch
    rgbShift.uniforms['amount'].value = 0.02;
    setTimeout(() => { rgbShift.uniforms['amount'].value = 0.002; }, 200);
}

window.closeViewer = function () {
    document.getElementById('main-viewer').classList.remove('open');
    document.querySelectorAll('.file-btn').forEach(b => b.classList.remove('active'));
    activeFileIndex = -1;
}


// --- ANIMATION ---
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Slow Grid Movement
    const positions = gridPlane.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        positions.setZ(i, Math.sin(x * 0.1 + time) * 2 + Math.cos(y * 0.1 + time) * 2);
    }
    positions.needsUpdate = true;

    // Camera Idle Sway (Very subtle now)
    camera.position.x = Math.sin(time * 0.5) * 5;
    camera.position.y = 10 + Math.cos(time * 0.3) * 2;
    camera.lookAt(0, 5, -50);

    composer.render();
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
