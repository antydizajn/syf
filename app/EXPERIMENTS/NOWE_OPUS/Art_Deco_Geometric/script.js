/**
 * ART DECO GEOMETRIC - three.js Gold Particle Fluid
 * Interactive Luxury Dust Simulation
 * GOD TIER 20/10
 */

// Three.js scene setup
let scene, camera, renderer;
let particles, particlePositions, particleVelocities;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let clock;
let attractors = [];

// Constants
const PARTICLE_COUNT = 3000;
const COLORS = {
    gold: 0xC9A962,
    goldBright: 0xFFD700,
    goldLight: 0xE8D5A3,
    goldDark: 0x8B7355
};

/**
 * Initialize Three.js scene
 */
function initScene() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer
    const canvas = document.getElementById('particle-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 1);

    clock = new THREE.Clock();

    // Create particles
    createParticles();

    // Create attractors (invisible forces)
    createAttractors();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Start animation
    animate();
}

/**
 * Create gold dust particles
 */
function createParticles() {
    const geometry = new THREE.BufferGeometry();

    particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    particleVelocities = [];
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // Random position in 3D space
        particlePositions[i3] = (Math.random() - 0.5) * 100;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 100;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 50;

        // Velocity for fluid simulation
        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1,
            z: (Math.random() - 0.5) * 0.05
        });

        // Gold color variations
        const goldVariant = Math.random();
        if (goldVariant < 0.3) {
            color.setHex(COLORS.goldBright);
        } else if (goldVariant < 0.6) {
            color.setHex(COLORS.gold);
        } else if (goldVariant < 0.85) {
            color.setHex(COLORS.goldLight);
        } else {
            color.setHex(COLORS.goldDark);
        }

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Random sizes
        sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for better particles
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            pixelRatio: { value: renderer.getPixelRatio() }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            uniform float pixelRatio;
            
            void main() {
                vColor = color;
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                
                // Size attenuation
                gl_PointSize = size * pixelRatio * (50.0 / -mvPosition.z);
                gl_PointSize = max(gl_PointSize, 1.0);
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                // Circular point
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                
                // Soft glow
                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                alpha *= 0.8;
                
                // Gold glow effect
                vec3 glow = vColor * (1.0 + (1.0 - dist * 2.0) * 0.3);
                
                gl_FragColor = vec4(glow, alpha);
            }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

/**
 * Create invisible attractors
 */
function createAttractors() {
    // Central attractor
    attractors.push({
        x: 0,
        y: 0,
        z: 0,
        strength: 0.001,
        type: 'attract'
    });

    // Corner attractors (subtle)
    const corners = [
        { x: -40, y: -30, z: 0 },
        { x: 40, y: -30, z: 0 },
        { x: -40, y: 30, z: 0 },
        { x: 40, y: 30, z: 0 }
    ];

    corners.forEach(corner => {
        attractors.push({
            ...corner,
            strength: 0.0003,
            type: 'attract'
        });
    });
}

/**
 * Update particle physics
 */
function updateParticles(time) {
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const vel = particleVelocities[i];

        // Mouse attraction
        const dx = targetMouseX - positions[i3];
        const dy = targetMouseY - positions[i3 + 1];
        const distMouse = Math.sqrt(dx * dx + dy * dy);

        if (distMouse < 30) {
            vel.x += dx * 0.001;
            vel.y += dy * 0.001;
        }

        // Attractor forces
        attractors.forEach(attractor => {
            const ax = attractor.x - positions[i3];
            const ay = attractor.y - positions[i3 + 1];
            const az = attractor.z - positions[i3 + 2];
            const dist = Math.sqrt(ax * ax + ay * ay + az * az);

            if (dist > 1) {
                const force = attractor.strength / dist;
                vel.x += ax * force;
                vel.y += ay * force;
                vel.z += az * force;
            }
        });

        // Gentle flow (fluid-like motion)
        vel.x += Math.sin(time * 0.5 + positions[i3 + 1] * 0.1) * 0.001;
        vel.y += Math.cos(time * 0.3 + positions[i3] * 0.1) * 0.001;

        // Damping
        vel.x *= 0.99;
        vel.y *= 0.99;
        vel.z *= 0.99;

        // Update positions
        positions[i3] += vel.x;
        positions[i3 + 1] += vel.y;
        positions[i3 + 2] += vel.z;

        // Boundary wrapping
        if (positions[i3] > 60) positions[i3] = -60;
        if (positions[i3] < -60) positions[i3] = 60;
        if (positions[i3 + 1] > 40) positions[i3 + 1] = -40;
        if (positions[i3 + 1] < -40) positions[i3 + 1] = 40;
        if (positions[i3 + 2] > 30) positions[i3 + 2] = -30;
        if (positions[i3 + 2] < -30) positions[i3 + 2] = 30;
    }

    particles.geometry.attributes.position.needsUpdate = true;
}

/**
 * Handle window resize
 */
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (particles && particles.material.uniforms) {
        particles.material.uniforms.pixelRatio.value = renderer.getPixelRatio();
    }
}

/**
 * Handle mouse movement
 */
function handleMouseMove(event) {
    // Convert to 3D coordinates
    targetMouseX = (event.clientX / window.innerWidth - 0.5) * 80;
    targetMouseY = -(event.clientY / window.innerHeight - 0.5) * 60;
}

/**
 * Handle click - create burst effect
 */
function handleClick(event) {
    const clickX = (event.clientX / window.innerWidth - 0.5) * 80;
    const clickY = -(event.clientY / window.innerHeight - 0.5) * 60;

    // Push particles away from click
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const dx = positions[i3] - clickX;
        const dy = positions[i3 + 1] - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 25) {
            const force = (25 - dist) * 0.05;
            particleVelocities[i].x += (dx / dist) * force;
            particleVelocities[i].y += (dy / dist) * force;
        }
    }
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Smooth mouse tracking
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;

    // Update particles
    updateParticles(time);

    // Update shader uniforms
    if (particles && particles.material.uniforms) {
        particles.material.uniforms.time.value = time;
    }

    // Subtle camera movement
    camera.position.x = Math.sin(time * 0.1) * 2;
    camera.position.y = Math.cos(time * 0.15) * 2;
    camera.lookAt(0, 0, 0);

    // Subtle rotation
    particles.rotation.z = Math.sin(time * 0.1) * 0.02;

    renderer.render(scene, camera);
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
 * Hero letter hover effects
 */
function initHeroEffects() {
    const letters = document.querySelectorAll('.hero-letter');

    letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
            // Create temporary strong attractor at letter position
            const rect = letter.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth * 80 - 40;
            const y = -(rect.top + rect.height / 2) / window.innerHeight * 60 + 30;

            attractors.push({
                x: x,
                y: y,
                z: 0,
                strength: 0.02,
                type: 'attract',
                temporary: true
            });
        });

        letter.addEventListener('mouseleave', () => {
            // Remove temporary attractors
            attractors = attractors.filter(a => !a.temporary);
        });
    });
}

/**
 * File item hover effects
 */
function initFileEffects() {
    const fileItems = document.querySelectorAll('.file-item');

    fileItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const rect = item.getBoundingClientRect();
            const y = -(rect.top + rect.height / 2) / window.innerHeight * 60 + 30;

            // Create horizontal attractor line
            for (let x = -40; x <= 40; x += 20) {
                attractors.push({
                    x: x,
                    y: y,
                    z: 5,
                    strength: 0.003,
                    type: 'attract',
                    temporary: true
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            attractors = attractors.filter(a => !a.temporary);
        });
    });
}

/**
 * Initialize everything
 */
document.addEventListener('DOMContentLoaded', () => {
    initScene();
    initMenu();
    initHeroEffects();
    initFileEffects();

    console.log('%c◆ ART DECO GEOMETRIC ACTIVATED ◆', 'font-size: 20px; color: #C9A962; background: #0a0a0a; padding: 10px;');
    console.log('%cLuxury in every particle.', 'font-size: 14px; color: #E8D5A3;');
});
