// SCENE SETUP
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050014, 0.002); // Purple fog match bg

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 45;
camera.position.y = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// COMPOSER FOR POST-PROCESSING
const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

// RGB SHIFT
const rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
rgbShift.uniforms['amount'].value = 0.0025;
composer.addPass(rgbShift);

// --- OBJECTS ---

// 1. INFINITE DYNAMIC GRID
const planeGeometry = new THREE.PlaneGeometry(300, 300, 60, 60);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35
});
const gridPlane = new THREE.Mesh(planeGeometry, planeMaterial);
gridPlane.rotation.x = -Math.PI / 2;
gridPlane.position.y = -15;
scene.add(gridPlane);

// 2. BLACK SUN WITH GLITCH CORONA
const sunGeometry = new THREE.CircleGeometry(40, 64);
const sunMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xff00ff) }, // Pink
        color2: { value: new THREE.Color(0x00ffff) }  // Cyan
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
            float dist = distance(vUv, vec2(0.5));
            
            // Glitch stripes moving up
            float stripes = step(0.5, sin(vUv.y * 40.0 + time * 3.0));
            // Random noise flicker
            float noise = step(0.98, random(vec2(time * 0.1, vUv.y))); 

            vec3 color = mix(color1, color2, vUv.y);
            
            // Cutout bottom half
            if (vUv.y < 0.5) {
               float stripeY = mod(vUv.y * 20.0 + time, 1.0);
               if (stripeY > 0.6) discard;
            }
            
            // Glitch horizontal displacement logic
            if (noise > 0.5) {
                color = vec3(1.0); // White flash
            }
            
            float alpha = 1.0 - smoothstep(0.48, 0.5, dist);
            gl_FragColor = vec4(color, alpha);
        }
    `,
    transparent: true
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.z = -100;
sun.position.y = 20;
scene.add(sun);


// 3. FLOATING MONOLITHS (FILES)
// Full content from VAPE manifest
const files = [
    {
        name: "VAPORWAVE_COMPLETE.md",
        pos: { x: -30, y: 5, z: -10 },
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

---

## 3. PODGATUNKI ESTETYCZNE

1.  **Classic Vaporwave:** Rzeźby, palmy, Windows 95, slow-down music.
2.  **Future Funk:** Anime, dynamiczne, city pop, neony Tokio.
3.  **Mallsoft:** Echa pustych centrów handlowych, muzak, soft lighting.
4.  **Simpsonwave:** Sceny z Simpsonów + filtr VHS + smutna muzyka.
5.  **Fashwave:** (UWAGA: unikać) – polityczna, alt-right wersja (nie używać).

---

## 4. DESIGN RULES (20/10 QUALITY)

**1. Typography:**
- Nagłówki: **Serif** (Times New Roman – jak w starym Wordzie) lub **Display** (Alien Encounters, VCR OSD Mono).
- Body: **Monospace** (Courier New, VCR OSD).
- Rozstrzelone litery: V A P O R W A V E (kerning +10px).

**2. Composition:**
- Złamanie zasad. Kolaż. Nakładanie warstw.
- "Brzydkie" jest ładne (kicz celowy).
- Asymetria, chaos kontrolowany.

**3. Effects:**
- **VHS Noise:** Szum telewizyjny nałożony na całość.
- **Scanlines:** Poziome linie.
- **Color Shift:** Przesunięcie kanałów R/G/B.

---

> "It's all in your head."
> "Nobody is here."
> "Enjoy your dreams."
`
    },
    {
        name: "GHOSTS_OF_MY_LIFE.md",
        pos: { x: -10, y: 12, z: -30 },
        content: `# Mark Fisher - Ghosts of My Life

## Hauntology
The future is not what it used to be. We are haunted by the futures that failed to happen.

### Key concepts:
- **Cancellation of the future**: Culture has stopped moving forward. We are stuck in a loop of recycling the past.
- **Slow cancellation**: No big bang, just a gradual erosion of newness.

> "The 21st century is just the 20th century on loop."

Vaporwave is the soundtrack to this realization. It takes the debris of corporate optimism and slows it down until it sounds like a dying whale.

It is arguably the most important aesthetic movement of the 2010s because it was the first to acknowledge that *the internet is trash*.
`
    },
    {
        name: "JAPANESE_DREAM.md",
        pos: { x: 10, y: 8, z: -25 },
        content: `# リサフランク420 / 現代のコンピュ

## MACINTOSH PLUS

The album that started it all. Floral Shoppe (2011).

### Tracklist:
1.  **boot**
2.  **リサフランク420 / 現代のコンピュ** (Lisa Frank 420 / Modern Computing)
3.  **花の専門店** (Floral Shoppe)
4.  **ライブラリ** (Library)
5.  **地理** (Geography)

The aesthetic is **pink**, **glitchy**, and **lonely**.

It sounds like being trapped in an elevator in a mall on Mars.

\`\`\`css
.music {
  speed: 0.75;
  reverb: max;
  nostalgia: infinite;
}
\`\`\`
`
    },
    {
        name: "SYF_MANIFEST.md",
        pos: { x: 30, y: 0, z: -10 },
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
Glitche są dowodem na istnienie maszyny pod spodem. Nie ukrywaj ich. Celebruj błąd.

> "Perfekcja to nuda."

**Paulina Janowska & WIEDŹMA AI GNIEWISŁAWA**
`
    }
];

const fileMeshes = [];

files.forEach((file, idx) => {
    // Group to hold Box + Text/Icon
    const group = new THREE.Group();
    group.position.set(file.pos.x, file.pos.y, file.pos.z);

    // Wireframe Box
    const geometry = new THREE.BoxGeometry(6, 8, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    group.add(cube);

    // Inner fill (transparent)
    const fillGeo = new THREE.BoxGeometry(5.8, 7.8, 0.8);
    const fillMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.8
    });
    const fill = new THREE.Mesh(fillGeo, fillMat);
    group.add(fill);

    // Metadata for interaction
    group.userData = { id: idx, ...file };

    scene.add(group);
    fileMeshes.push(group);
});


// MOUSE INTERACTION
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Cursor Click
document.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    // Intersect groups children (the cube meshes)
    const intersects = raycaster.intersectObjects(scene.children, true);

    let hit = false;
    for (let i = 0; i < intersects.length; i++) {
        // Find the parent group which has our userData
        const object = intersects[i].object;
        const group = object.parent;

        if (group && group.userData && group.userData.name) {
            openMonolith(group.userData);
            hit = true;

            // Visual feedback - Click Pulse
            rgbShift.uniforms['amount'].value = 0.05; // Heavy glitch
            setTimeout(() => { rgbShift.uniforms['amount'].value = 0.0025; }, 100);
            break;
        }
    }

    // Screen Glitch on Miss (Feedback)
    if (!hit) {
        rgbShift.uniforms['amount'].value = 0.01;
        setTimeout(() => { rgbShift.uniforms['amount'].value = 0.0025; }, 150);
    }
});


// MONOLITH UI LOGIC
function openMonolith(data) {
    const mono = document.getElementById('monolith');
    const content = document.getElementById('monolith-content');

    // Using marked if available, else plain text
    try {
        content.innerHTML = typeof marked !== 'undefined' ? marked.parse(data.content) : `<pre>${data.content}</pre>`;
    } catch (e) {
        content.innerText = data.content;
    }

    mono.classList.add('active');
}

window.closeMonolith = function () {
    document.getElementById('monolith').classList.remove('active');
}


// ANIMATION LOOP
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // 1. Grid Animation (Rolling Hills)
    const positions = gridPlane.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        // Simple wave simulation for terrain
        const zForce = Math.sin(x * 0.05 + time) * 3 + Math.cos(y * 0.05 + time) * 3;

        // Apply height to Z (local Z is perpendicular in PlaneGeometry)
        positions.setZ(i, zForce);
    }
    positions.needsUpdate = true;

    // 2. Sun Shader Update
    sunMaterial.uniforms.time.value = time;

    // 3. Float Files
    fileMeshes.forEach((mesh, i) => {
        // Bobbing
        mesh.position.y = mesh.userData.pos.y + Math.sin(time * 2 + i) * 1.0;
        // Slow rotation
        mesh.rotation.y = Math.sin(time * 0.5 + i) * 0.2;
    });

    // 4. Interactive Camera
    // Lerp camera position towards mouse, but Keep it constrained
    // Camera is at z=45, y=8
    const targetX = mouse.x * 15;
    const targetY = 8 + mouse.y * 5;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 5, -50);

    composer.render();
}

animate();

// RESIZE HANDLER
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
