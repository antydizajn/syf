// BRUTALIST DECAY ENGINE v2.0

const canvas = document.getElementById('decay-canvas');
const ctx = canvas.getContext('2d');

let W, H;

function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
}
resize();
window.addEventListener('resize', resize);

// STATE
let isMouseDown = false;
let decayLevel = 0;

window.addEventListener('mousedown', () => isMouseDown = true);
window.addEventListener('mouseup', () => isMouseDown = false);

// MOUSE DESTRUCTION
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // 1. Invert colors on trail (Difference Mode)
    const size = 60 + Math.random() * 40;

    // Choose destruction mode
    const mode = Math.random();

    if (mode > 0.7) {
        // PIXEL SCRAMBLE
        const sliceH = 10 + Math.random() * 30;
        const offset = (Math.random() - 0.5) * 50;
        // Copy canvas part and move it? 
        // Simpler: Draw raw noise
        ctx.fillStyle = Math.random() > 0.5 ? '#ffff00' : '#000';
        ctx.fillRect(x - size / 2, y - size / 2, size, size / 4);
    } else {
        // SCRATCH
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1 + Math.random() * 3;
        ctx.beginPath();
        ctx.moveTo(x - size, y - size);
        ctx.lineTo(x + size, y + size);
        ctx.stroke();
    }

    // Interactive hover destruction over links
    const target = e.target;
    if (target.tagName === 'A' || target.closest('.file-row')) {
        // BURN
        ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
        ctx.globalCompositeOperation = 'difference';
        ctx.fillRect(x - 100, y - 10, 200, 20);
        ctx.globalCompositeOperation = 'source-over';
    }
});

// PASSIVE DECAY LOOP
function decayLoop() {
    requestAnimationFrame(decayLoop);

    // Random screen tearing
    if (Math.random() > 0.98) {
        const y = Math.random() * H;
        const h = Math.random() * 100;
        const offset = (Math.random() - 0.5) * 20;

        // This is canvas only, real screen tearing requires dom manipulation or screenshotting
        // We simulate it by drawing black bars
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, y, W, 2);
    }

    // Click = EXPLODE
    if (isMouseDown) {
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * W;
            const y = Math.random() * H;
            const s = Math.random() * 50;
            ctx.fillStyle = Math.random() > 0.5 ? '#ffff00' : '#000';
            ctx.fillRect(x, y, s, s);
        }
    }
}

decayLoop();

console.log("BRUTAL ENGINE ONLINE");
