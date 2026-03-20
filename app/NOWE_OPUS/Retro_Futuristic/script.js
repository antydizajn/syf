/**
 * RETRO-FUTURISTIC - three.js Synthwave Grid
 * Infinite Neon Grid Flyover + 3D Floating UI
 * GOD TIER 20/10
 */

// Three.js scene setup
let scene, camera, renderer, grid, stars;
let speed = 0.5;
let targetSpeed = 0.5;
let mouseX = 0, mouseY = 0;
let clock;

/**
 * Initialize Three.js scene
 */
function initScene() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0015, 0.05);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 10);
    camera.rotation.x = -0.3;

    // Create renderer
    const canvas = document.getElementById('synthwave-world');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0015, 1);

    clock = new THREE.Clock();

    // Create scene elements
    createGrid();
    createStars();
    createMountains();
    createSun();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Start animation
    animate();
}

/**
 * Create infinite neon grid
 */
function createGrid() {
    // Grid geometry
    const gridSize = 100;
    const divisions = 50;

    // Create custom grid with glow effect
    const gridHelper = new THREE.GridHelper(gridSize, divisions, 0xff2a6d, 0xff2a6d);
    gridHelper.position.y = -2;
    gridHelper.material.opacity = 0.8;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Second grid layer for depth
    const gridHelper2 = new THREE.GridHelper(gridSize * 2, divisions * 2, 0x05d9e8, 0x05d9e8);
    gridHelper2.position.y = -2.1;
    gridHelper2.material.opacity = 0.3;
    gridHelper2.material.transparent = true;
    scene.add(gridHelper2);

    grid = { main: gridHelper, secondary: gridHelper2 };

    // Create horizon line glow
    const horizonGeometry = new THREE.PlaneGeometry(200, 0.5);
    const horizonMaterial = new THREE.MeshBasicMaterial({
        color: 0xff2a6d,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });
    const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
    horizon.position.set(0, -2, -40);
    horizon.rotation.x = Math.PI / 2;
    scene.add(horizon);
}

/**
 * Create starfield
 */
function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });

    const starsVertices = [];
    for (let i = 0; i < 2000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = Math.random() * 100 + 10;
        const z = (Math.random() - 0.5) * 200;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

/**
 * Create synthwave mountains
 */
function createMountains() {
    const mountainGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    const width = 100;
    const segments = 50;
    const segmentWidth = width / segments;

    // Generate mountain vertices
    for (let i = 0; i <= segments; i++) {
        const x = (i - segments / 2) * segmentWidth;
        const height = Math.sin(i * 0.3) * 8 + Math.sin(i * 0.7) * 4 + Math.random() * 2;
        vertices.push(x, height, -50);
        vertices.push(x, -2, -50);
    }

    // Generate indices for triangle strip
    for (let i = 0; i < segments; i++) {
        const topLeft = i * 2;
        const bottomLeft = i * 2 + 1;
        const topRight = (i + 1) * 2;
        const bottomRight = (i + 1) * 2 + 1;

        indices.push(topLeft, bottomLeft, topRight);
        indices.push(bottomLeft, bottomRight, topRight);
    }

    mountainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    mountainGeometry.setIndex(indices);

    const mountainMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a0030,
        side: THREE.DoubleSide,
        wireframe: false
    });

    const mountains = new THREE.Mesh(mountainGeometry, mountainMaterial);
    scene.add(mountains);

    // Mountain wireframe outline
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff2a6d,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const wireframe = new THREE.Mesh(mountainGeometry.clone(), wireframeMaterial);
    scene.add(wireframe);
}

/**
 * Create synthwave sun
 */
function createSun() {
    // Sun geometry (circle with lines)
    const sunGroup = new THREE.Group();

    // Main sun disc
    const sunGeometry = new THREE.CircleGeometry(15, 64);
    const sunMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
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
            varying vec2 vUv;
            
            void main() {
                float y = vUv.y;
                
                // Gradient from yellow to pink to purple
                vec3 yellow = vec3(1.0, 1.0, 0.0);
                vec3 orange = vec3(1.0, 0.55, 0.0);
                vec3 pink = vec3(1.0, 0.16, 0.43);
                vec3 purple = vec3(0.83, 0.0, 0.77);
                
                vec3 color;
                if (y > 0.6) {
                    color = mix(orange, yellow, (y - 0.6) / 0.4);
                } else if (y > 0.3) {
                    color = mix(pink, orange, (y - 0.3) / 0.3);
                } else {
                    color = mix(purple, pink, y / 0.3);
                }
                
                // Horizontal stripes (cutout effect)
                float stripe = 1.0;
                if (y < 0.8 && mod(y * 20.0, 2.0) < 1.0 && y < 0.5) {
                    stripe = 0.0;
                }
                
                gl_FragColor = vec4(color, stripe);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide
    });

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 15, -80);
    sunGroup.add(sun);

    // Sun glow
    const glowGeometry = new THREE.CircleGeometry(20, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff2a6d,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 15, -81);
    sunGroup.add(glow);

    scene.add(sunGroup);

    // Store sun for animation
    window.synthwaveSun = { sun, glow, material: sunMaterial };
}

/**
 * Handle window resize
 */
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Handle mouse movement for parallax
 */
function handleMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
}

/**
 * Handle scroll for speed effect
 */
function handleScroll() {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    targetSpeed = 0.3 + scrollPercent * 1.5;

    // Update speed indicator
    const speedValue = document.querySelector('.speed-value');
    if (speedValue) {
        speedValue.textContent = Math.floor(60 + scrollPercent * 80);
    }
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Smooth speed transition
    speed += (targetSpeed - speed) * 0.1;

    // Move grid forward (infinite scroll effect)
    if (grid) {
        grid.main.position.z = (grid.main.position.z + speed * delta * 10) % 2;
        grid.secondary.position.z = (grid.secondary.position.z + speed * delta * 8) % 4;
    }

    // Parallax camera movement
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
    camera.position.y += (5 - mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, -10);

    // Rotate stars slowly
    if (stars) {
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;
    }

    // Animate sun shader
    if (window.synthwaveSun) {
        window.synthwaveSun.material.uniforms.time.value = time;

        // Pulsing glow
        window.synthwaveSun.glow.material.opacity = 0.3 + Math.sin(time * 2) * 0.1;
        window.synthwaveSun.glow.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }

    renderer.render(scene, camera);
}

/**
 * Menu functionality
 */
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');

    if (menuToggle && menuOverlay && menuClose) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                menuOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Add hover effects to file items
 */
function initFileEffects() {
    const fileItems = document.querySelectorAll('.file-item');

    fileItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Boost speed on hover
            targetSpeed = 1.5;

            // Add 3D tilt effect
            item.style.transform = `translateX(10px) perspective(500px) rotateY(-2deg)`;
        });

        item.addEventListener('mouseleave', () => {
            targetSpeed = 0.5 + (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 1.5;
            item.style.transform = '';
        });
    });
}

/**
 * Initialize everything
 */
document.addEventListener('DOMContentLoaded', () => {
    initScene();
    initMenu();
    initFileEffects();

    console.log('%c🌅 RETROWAVE ACTIVATED 🌅', 'font-size: 24px; background: linear-gradient(90deg, #ff2a6d, #05d9e8); -webkit-background-clip: text; color: transparent; text-shadow: 0 0 10px #ff2a6d;');
    console.log('%cDrive into the sunset. Never look back.', 'font-size: 14px; color: #05d9e8;');
});

/**
 * Hero letter hover effects
 */
document.querySelectorAll('.hero-letter').forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        // Boost grid speed
        targetSpeed = 2;

        // Camera shake
        camera.position.x += (Math.random() - 0.5) * 0.5;
        camera.position.y += (Math.random() - 0.5) * 0.3;
    });

    letter.addEventListener('mouseleave', () => {
        targetSpeed = 0.5;
    });
});
