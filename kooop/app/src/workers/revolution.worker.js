// @ts-nocheck
const SHADER_SOURCE = 
"struct Uniforms {\n" +
"    time: f32,\n" +
"    width: f32,\n" +
"    height: f32,\n" +
"    mouse_x: f32,\n" +
"    mouse_y: f32,\n" +
"    intensity: f32,\n" +
"    padding1: f32,\n" +
"    padding2: f32,\n" +
"};\n" +
"\n" +
"struct ComputeBuffer {\n" +
"    data: array<f32, 1024>,\n" +
"};\n" +
"\n" +
"@group(0) @binding(0) var<uniform> ubo: Uniforms;\n" +
"@group(0) @binding(1) var<storage, read_write> computeData: ComputeBuffer;\n" +
"\n" +
"fn hash(n: f32) -> f32 {\n" +
"    return fract(sin(n) * 43758.5453123);\n" +
"}\n" +
"\n" +
"// --- COMPUTE SHADER ---\n" +
"@compute @workgroup_size(64)\n" +
"fn cs_main(@builtin(global_invocation_id) id: vec3<u32>) {\n" +
"    let idx = id.x;\n" +
"    if (idx >= 1024u) { return; }\n" +
"    \n" +
"    let v = f32(idx) / 1024.0;\n" +
"    let t = ubo.time * 0.5;\n" +
"    \n" +
"    // Simple physics simulation on GPU\n" +
"    let base = sin(v * 6.28 + t) * cos(v * 3.14 - t * 0.5);\n" +
"    let noise = hash(v + t * 0.01) * 0.1;\n" +
"    \n" +
"    computeData.data[idx] = base + noise;\n" +
"}\n" +
"\n" +
"// --- RENDER SHADERS ---\n" +
"fn hash3(p: vec2<f32>) -> vec3<f32> {\n" +
"    let q = vec3<f32>(\n" +
"        dot(p, vec2<f32>(127.1, 311.7)),\n" +
"        dot(p, vec2<f32>(269.5, 183.3)),\n" +
"        dot(p, vec2<f32>(419.2, 371.9))\n" +
"    );\n" +
"    return fract(sin(q) * 43758.5453);\n" +
"}\n" +
"\n" +
"fn noise(p: vec2<f32>) -> f32 {\n" +
"    let i = floor(p);\n" +
"    let f = fract(p);\n" +
"    let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);\n" +
"    \n" +
"    let h00 = hash3(i + vec2<f32>(0.0, 0.0)).xy;\n" +
"    let h10 = hash3(i + vec2<f32>(1.0, 0.0)).xy;\n" +
"    let h01 = hash3(i + vec2<f32>(0.0, 1.0)).xy;\n" +
"    let h11 = hash3(i + vec2<f32>(1.0, 1.0)).xy;\n" +
"    \n" +
"    return mix(\n" +
"        mix(dot(h00, f - vec2<f32>(0.0, 0.0)), dot(h10, f - vec2<f32>(1.0, 0.0)), u.x),\n" +
"        mix(dot(h01, f - vec2<f32>(0.0, 1.0)), dot(h11, f - vec2<f32>(1.0, 1.0)), u.x),\n" +
"        u.y\n" +
"    );\n" +
"}\n" +
"\n" +
"fn fbm(p: vec2<f32>, octaves: i32) -> f32 {\n" +
"    var value = 0.0;\n" +
"    var amplitude = 1.0;\n" +
"    var frequency = 0.25;\n" +
"    for (var i = 0 ; i < 6 ; i = i + 1) {\n" +
"        if (i >= octaves) { break; }\n" +
"        value = value + amplitude * noise(p * frequency);\n" +
"        amplitude = amplitude * 0.52;\n" +
"        frequency = frequency * 1.13;\n" +
"    }\n" +
"    return value;\n" +
"}\n" +
"\n" +
"fn voronoi(p: vec2<f32>) -> f32 {\n" +
"    let n = floor(p);\n" +
"    let f = fract(p);\n" +
"    var md = 50.0;\n" +
"    for (var i = -1 ; i <= 1 ; i = i + 1) {\n" +
"        for (var j = -1 ; j <= 1 ; j = j + 1) {\n" +
"            let g = vec2<f32>(f32(i), f32(j));\n" +
"            var o = hash3(n + g).xy;\n" +
"            o = 0.5 + 0.41 * sin(ubo.time * 1.5 + 6.28 * o);\n" +
"            let r = g + o - f;\n" +
"            let d = dot(r, r);\n" +
"            md = min(md, d);\n" +
"        }\n" +
"    }\n" +
"    return sqrt(md);\n" +
"}\n" +
"\n" +
"fn plasma(p: vec2<f32>, time: f32) -> f32 {\n" +
"    let a = sin(p.x * 8.0 + time * 2.0);\n" +
"    let b = sin(p.y * 8.0 + time * 1.7);\n" +
"    let c = sin((p.x + p.y) * 6.0 + time * 1.3);\n" +
"    let d = sin(sqrt(p.x * p.x + p.y * p.y) * 8.0 + time * 2.3);\n" +
"    return (a + b + c + d) * 0.5;\n" +
"}\n" +
"\n" +
"fn curl(p: vec2<f32>, time: f32) -> vec2<f32> {\n" +
"    let eps = 0.5;\n" +
"    let n1 = fbm(p + vec2<f32>(eps, 0.0), 6);\n" +
"    let n2 = fbm(p - vec2<f32>(eps, 0.0), 6);\n" +
"    let n3 = fbm(p + vec2<f32>(0.0, eps), 6);\n" +
"    let n4 = fbm(p - vec2<f32>(0.0, eps), 6);\n" +
"    return vec2<f32>((n3 - n4) / (2.0 * eps), (n2 - n1) / (2.0 * eps));\n" +
"}\n" +
"\n" +
"fn grain(uv: vec2<f32>, time: f32) -> f32 {\n" +
"    let seed = uv * time;\n" +
"    return fract(sin(dot(seed, vec2<f32>(12.9898, 78.233))) * 43758.5453);\n" +
"}\n" +
"\n" +
"@vertex\n" +
"fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {\n" +
"    var pos = array<vec2<f32>, 4>(\n" +
"        vec2<f32>(-1.0, -1.0),\n" +
"        vec2<f32>(1.0, -1.0),\n" +
"        vec2<f32>(-1.0, 1.0),\n" +
"        vec2<f32>(1.0, 1.0)\n" +
"    );\n" +
"    return vec4<f32>(pos[vertexIndex], 0.0, 1.0);\n" +
"}\n" +
"\n" +
"@fragment\n" +
"fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {\n" +
"    let resolution = vec2<f32>(ubo.width, ubo.height);\n" +
"    let uv = pos.xy / resolution;\n" +
"    var st = (uv - 0.5) * 2.0;\n" +
"    st.x = st.x * (resolution.x / resolution.y);\n" +
"    \n" +
"    let time = ubo.time * 0.25;\n" +
"    \n" +
"    // Sample from compute data for extra 'chaos'\n" +
"    let dataIdx = u32(uv.x * 1023.0);\n" +
"    let gpuPhysics = computeData.data[dataIdx];\n" +
"    \n" +
"    let curlForce = curl(st * 2.0 + gpuPhysics * 0.1, time) * 0.6;\n" +
"    let flowField = st + curlForce;\n" +
"    \n" +
"    let dist1 = fbm(flowField * 1.5 + time * 1.2, 8) * 0.4;\n" +
"    let dist2 = fbm(flowField * 2.3 - time * 0.8, 6) * 0.3;\n" +
"    let dist3 = fbm(flowField * 3.1 + time * 1.8, 4) * 0.2;\n" +
"    let dist4 = fbm(flowField * 4.7 - time * 1.1, 3) * 0.15;\n" +
"    \n" +
"    var cells = voronoi(flowField * 2.5 + time * 0.5);\n" +
"    cells = smoothstep(0.1, 0.7, cells);\n" +
"    \n" +
"    let plasmaEffect = plasma(flowField + vec2<f32>(dist1, dist2), time * 1.5) * 0.2;\n" +
"    let totalDist = dist1 + dist2 + dist3 + dist4 + plasmaEffect;\n" +
"    \n" +
"    var streak1 = sin((st.x + totalDist) * 15.0 + time * 3.0) * 0.5 + 0.5;\n" +
"    var streak2 = sin((st.x + totalDist * 0.7) * 25.0 - time * 2.0) * 0.5 + 0.5;\n" +
"    var streak3 = sin((st.x + totalDist * 1.3) * 35.0 + time * 4.0) * 0.5 + 0.5;\n" +
"    \n" +
"    streak1 = smoothstep(0.3, 0.7, streak1);\n" +
"    streak2 = smoothstep(0.2, 0.8, streak2);\n" +
"    streak3 = smoothstep(0.4, 0.6, streak3);\n" +
"    \n" +
"    let combinedStreaks = streak1 * 0.6 + streak2 * 0.4 + streak3 * 0.5;\n" +
"    \n" +
"    var shape1 = 1.0 - abs(st.x + totalDist * 0.6);\n" +
"    var shape2 = 1.0 - abs(st.x + totalDist * 0.4 + sin(st.y * 3.0 + time) * 0.15);\n" +
"    var shape3 = 1.0 - abs(st.x + totalDist * 0.8 + cos(st.y * 2.0 - time) * 0.1);\n" +
"    \n" +
"    shape1 = smoothstep(0.0, 1.0, shape1);\n" +
"    shape2 = smoothstep(0.1, 0.9, shape2);\n" +
"    shape3 = smoothstep(0.2, 0.8, shape3);\n" +
"    \n" +
"    let finalShape = max(shape1 * 0.8, max(shape2 * 0.6, shape3 * 0.4));\n" +
"    \n" +
"    let color1 = vec3<f32>(1.0, 0.1, 0.6);\n" +
"    let color2 = vec3<f32>(1.0, 0.3, 0.1);\n" +
"    let color3 = vec3<f32>(0.9, 0.1, 1.0);\n" +
"    let color4 = vec3<f32>(0.1, 0.5, 1.0);\n" +
"    let color5 = vec3<f32>(0.1, 1.0, 0.9);\n" +
"    let color6 = vec3<f32>(0.3, 0.1, 0.9);\n" +
"    let color7 = vec3<f32>(1.0, 0.8, 0.1);\n" +
"    \n" +
"    let gradient = 1.0 - uv.y;\n" +
"    let colorNoise = fbm(flowField * 3.0 + time * 0.5, 4) * 0.5 + 0.5;\n" +
"    let colorShift = sin(time * 1.5 + st.y * 2.0) * 0.5 + 0.5;\n" +
"    \n" +
"    var finalColor = mix(color6, color7, smoothstep(0.0, 0.15, gradient));\n" +
"    finalColor = mix(finalColor, color5, smoothstep(0.15, 0.3, gradient));\n" +
"    finalColor = mix(finalColor, color4, smoothstep(0.3, 0.5, gradient));\n" +
"    finalColor = mix(finalColor, color3, smoothstep(0.5, 0.7, gradient));\n" +
"    finalColor = mix(finalColor, color2, smoothstep(0.7, 0.85, gradient));\n" +
"    finalColor = mix(finalColor, color1, smoothstep(0.85, 1.0, gradient));\n" +
"    \n" +
"    finalColor = mix(finalColor, color1, colorNoise * 0.82);\n" +
"    finalColor = mix(finalColor, color5, colorShift * 0.5);\n" +
"    \n" +
"    let aberration = curlForce * 0.02;\n" +
"    var aberrationColor = finalColor;\n" +
"    aberrationColor.r = mix(finalColor.r, color1.r, length(aberration) * 2.0);\n" +
"    aberrationColor.b = mix(finalColor.b, color4.b, length(aberration) * 1.5);\n" +
"    aberrationColor.g = mix(finalColor.g, color5.g, length(aberration) * 1.2);\n" +
"    \n" +
"    let pulse1 = sin(time * 3.0 + st.y * 6.0) * 0.5 + 0.5;\n" +
"    let pulse2 = sin(time * 4.5 - st.y * 8.0) * 0.5 + 0.5;\n" +
"    let energyPulse = smoothstep(0.3, 0.7, pulse1 * pulse2);\n" +
"    \n" +
"    var intensity = finalShape * combinedStreaks * (1.0 + energyPulse * 0.4);\n" +
"    intensity = intensity * (1.0 + cells * 0.2);\n" +
"    intensity = intensity * ubo.intensity;\n" +
"    \n" +
"    var mouse_pos = vec2<f32>(ubo.mouse_x, ubo.mouse_y) / resolution;\n" +
"    mouse_pos = (mouse_pos - 0.5) * 2.0;\n" +
"    mouse_pos.x = mouse_pos.x * (resolution.x / resolution.y);\n" +
"    \n" +
"    var mouseInfluence = 1.0 - length(st - mouse_pos) * 0.6;\n" +
"    mouseInfluence = max(0.0, mouseInfluence);\n" +
"    mouseInfluence = smoothstep(0.0, 1.0, mouseInfluence);\n" +
"    \n" +
"    intensity = intensity + mouseInfluence * 0.6;\n" +
"    aberrationColor = mix(aberrationColor, color1, 0.3);\n" +
"    \n" +
"    var result = aberrationColor * intensity;\n" +
"    let bloom = smoothstep(0.4, 1.0, intensity) * 0.54;\n" +
"    result = result + bloom * finalColor;\n" +
"    \n" +
"    result = pow(result, vec3<f32>(0.85));\n" +
"    result = mix(result, result * result, 0.2);\n" +
"    \n" +
"    var vignette = 1.0 - length(uv - 0.5) * 0.85;\n" +
"    vignette = smoothstep(0.2, 1.0, vignette);\n" +
"    \n" +
"    let bgColor = vec3<f32>(0.02, 0.01, 0.12) + finalColor * 0.03;\n" +
"    result = mix(bgColor, result, smoothstep(0.0, 0.4, intensity));\n" +
"    result = result * vignette;\n" +
"    \n" +
"    result = mix(vec3<f32>(dot(result, vec3<f32>(0.299, 0.587, 0.114))), result, 1.3);\n" +
"    \n" +
"    let grainAmount = 0.11;\n" +
"    let grainValue = grain(uv, time * 0.5) * 2.0 - 1.0;\n" +
"    result = result + grainValue * grainAmount;\n" +
"    \n" +
"    let scanline = sin(uv.y * ubo.height * 2.0) * 0.04;\n" +
"    result = result + scanline;\n" +
"    \n" +
"    return vec4<f32>(result, 1.0);\n" +
"}\n";

// Global state
let device;
let context;
let renderPipeline;
let computePipeline;
let uniformBuffer;
let computeBuffer;
let bindGroup;
let renderPassDescriptor;

const UNIFORM_SIZE = 32; // 8 * f32
const COMPUTE_SIZE = 1024 * 4; // 1024 * f32

async function initWebGPU(canvas, initialWidth, initialHeight) {
    if (!navigator.gpu) {
        throw new Error("WebGPU not supported");
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) throw new Error("No GPUAdapter found");

    device = await adapter.requestDevice();
    context = canvas.getContext("webgpu");

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device,
        format: presentationFormat,
        alphaMode: "premultiplied",
    });

    const shaderModule = device.createShaderModule({ code: SHADER_SOURCE });

    uniformBuffer = device.createBuffer({
        size: UNIFORM_SIZE,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    computeBuffer = device.createBuffer({
        size: COMPUTE_SIZE,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const bindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
                buffer: { type: "uniform" },
            },
            {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
                buffer: { type: "storage" },
            },
        ],
    });

    bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
            { binding: 0, resource: { buffer: uniformBuffer } },
            { binding: 1, resource: { buffer: computeBuffer } },
        ],
    });

    computePipeline = device.createComputePipeline({
        layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
        compute: { module: shaderModule, entryPoint: "cs_main" },
    });

    renderPipeline = device.createRenderPipeline({
        layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
        vertex: { module: shaderModule, entryPoint: "vs_main" },
        fragment: {
            module: shaderModule,
            entryPoint: "fs_main",
            targets: [{ format: presentationFormat }],
        },
        primitive: { topology: "triangle-strip" },
    });

    renderPassDescriptor = {
        colorAttachments: [{
            view: undefined,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: "clear",
            storeOp: "store",
        }],
    };

    let startTime = performance.now();
    let mouse = { x: 0, y: 0 };
    let intensity = 1.0;
    let width = initialWidth;
    let height = initialHeight;

    canvas.width = width;
    canvas.height = height;

    self.onmessage = (e) => {
        if (e.data.type === "resize") {
            width = e.data.width; height = e.data.height;
            canvas.width = width; canvas.height = height;
        } else if (e.data.type === "mouse") {
            mouse.x = e.data.x; mouse.y = e.data.y;
        } else if (e.data.type === "intensity") {
            intensity = e.data.intensity;
        }
    };

    function render() {
        const time = (performance.now() - startTime) * 0.001;
        const uniformData = new Float32Array([time, width, height, mouse.x, mouse.y, intensity, 0, 0]);
        device.queue.writeBuffer(uniformBuffer, 0, uniformData);

        const commandEncoder = device.createCommandEncoder();
        
        // 1. Compute Pass
        const computePass = commandEncoder.beginComputePass();
        computePass.setPipeline(computePipeline);
        computePass.setBindGroup(0, bindGroup);
        computePass.dispatchWorkgroups(16); // 16 * 64 = 1024
        computePass.end();

        // 2. Render Pass
        const currentTexture = context.getCurrentTexture();
        renderPassDescriptor.colorAttachments[0].view = currentTexture.createView();
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.setPipeline(renderPipeline);
        renderPass.setBindGroup(0, bindGroup);
        renderPass.draw(4);
        renderPass.end();

        device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(render);
    }

    render();
}

self.onmessage = (e) => {
    if (e.data.type === "init") {
        initWebGPU(e.data.canvas, e.data.width, e.data.height).catch(err => {
            console.error("Worker WebGPU Init Error:", err);
            self.postMessage({ type: "error", message: err.message });
        });
    }
};
