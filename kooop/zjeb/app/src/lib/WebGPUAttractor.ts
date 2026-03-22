/**
 * SYF V5.5 - Ritual Engine (WebGPU Attractor)
 * Full implementation of the compute-based particle system.
 */
import { VexResonance } from './RitualVex';

export interface AttractorUniforms {
  attractors: [number, number, number, number][]; // x, y, strength, padding
  mouseForce: [number, number, number, number];    // x, y, strength, mode
  time: number;
  intensity: number;
  friction: number;
  dt: number;
  valence: number;
  entropy: number;
  chaos: number;
  impulse: number;
}

export async function initWebGPUAttractor(
    device: GPUDevice, 
    particleCount: number, 
    onFeedback?: (intensity: number) => void
) {
  // 1. Load Shader
  const shaderRes = await fetch('/shaders/attractor.wgsl');
  const shaderCode = await shaderRes.text();
  const noiseUtilsRes = await fetch('/shaders/noise_utils.wgsl');
  const noiseUtilsCode = await noiseUtilsRes.text();

  // Combine or use @import equivalent if supported, but here we just manually concat
  const finalShaderCode = noiseUtilsCode + "\n" + shaderCode;

  const shaderModule = device.createShaderModule({
    label: "Ritual Attractor Shader",
    code: finalShaderCode
  });

  // 2. Initialize Particles
  const particleSize = 4 * 4; // 2x f32 pos, 2x f32 vel
  const particleBuffer = device.createBuffer({
    size: particleCount * particleSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX,
  });

  const initialParticles = new Float32Array(particleCount * 4);
  for (let i = 0; i < particleCount; i++) {
    initialParticles[i * 4 + 0] = (Math.random() - 0.5) * 2; // pos x
    initialParticles[i * 4 + 1] = (Math.random() - 0.5) * 2; // pos y
    initialParticles[i * 4 + 2] = 0; // vel x
    initialParticles[i * 4 + 3] = 0; // vel y
  }
  device.queue.writeBuffer(particleBuffer, 0, initialParticles);

  // 2.1 Initialize Stats & History
  const statsBuffer = device.createBuffer({
    size: 4,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
  });

  const historySize = particleCount * 8 * 2 * 4; // 8 points * (x,y) * float32
  const historyBuffer = device.createBuffer({
    size: historySize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });

  // 3. Initialize Uniforms
  // 4 * vec4 (64) + 1 * vec4 (16) + 8 * f32 (32) = 112
  const uniformBufferSize = 112; 
  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  // 4. Create Compute Pipeline
  const computePipeline = device.createComputePipeline({
    label: "Ritual Attractor Compute Pipeline",
    layout: "auto",
    compute: {
      module: shaderModule,
      entryPoint: "main",
    },
  });

  // 4.1 Create Render Pipeline
  const renderPipeline = device.createRenderPipeline({
    label: "Ritual Attractor Render Pipeline",
    layout: "auto",
    vertex: {
      module: shaderModule,
      entryPoint: "vs_main",
    },
    fragment: {
      module: shaderModule,
      entryPoint: "fs_main",
      targets: [{
        format: navigator.gpu.getPreferredCanvasFormat(),
        blend: {
            color: { srcFactor: "src-alpha", dstFactor: "one", operation: "add" },
            alpha: { srcFactor: "zero", dstFactor: "one", operation: "add" }
        }
      }],
    },
    primitive: {
      topology: "line-list",
    },
  });

  // 4. Memory Nodes (Deep Memory)
  const memoryBuffer = device.createBuffer({
    size: 64 * 16, // 64 nodes * vec4<f32>
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });

  // 5. Create Bind Group
  const bindGroup = device.createBindGroup({
    layout: computePipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: particleBuffer } },
      { binding: 1, resource: { buffer: uniformBuffer } },
      { binding: 2, resource: { buffer: statsBuffer } },
      { binding: 3, resource: { buffer: historyBuffer } },
      { binding: 4, resource: { buffer: memoryBuffer } },
    ],
  });

  // 6. State
  let time = 0;
  let valence = 0;
  let entropy = 0.5;
  let chaos = 0;
  let intensity = 0.5;
  let impulse = 0;
  let attractors: [number, number, number, number][] = [
    [0, 0, 1, 0], // Mouse/Main
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  let mouseForce: [number, number, number, number] = [0, 0, 0, 1];

  const update = (commandEncoder: GPUCommandEncoder) => {
    time += 0.01;
    // Decay impulse
    impulse *= 0.95;
    if (impulse < 0.001) impulse = 0;

    const uniformData = new Float32Array(112 / 4);
    // Attractors (0-15)
    for (let i = 0; i < 4; i++) {
        uniformData[i * 4 + 0] = attractors[i][0];
        uniformData[i * 4 + 1] = attractors[i][1];
        uniformData[i * 4 + 2] = attractors[i][2];
        uniformData[i * 4 + 3] = attractors[i][3];
    }
    // MouseForce (16-19)
    uniformData[16] = mouseForce[0];
    uniformData[17] = mouseForce[1];
    uniformData[18] = mouseForce[2];
    uniformData[19] = mouseForce[3];

    // Scalars (20-27)
    uniformData[20] = time;
    uniformData[21] = intensity;
    uniformData[22] = 0.98; // friction
    uniformData[23] = 0.016; // dt
    uniformData[24] = valence;
    uniformData[25] = entropy;
    uniformData[26] = chaos;
    uniformData[27] = impulse;

    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(particleCount / 64));
    passEncoder.end();
  };

  const render = (view: GPUTextureView) => {
    const commandEncoder = device.createCommandEncoder();
    
    // 1. Run Simulation
    update(commandEncoder);
    
    // 2. Run Render Pass
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [{
        view,
        clearValue: { r: 0, g: 0, b: 0, a: 0 }, // Transparent black
        loadOp: "clear",
        storeOp: "store",
      }],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(renderPipeline);
    passEncoder.setBindGroup(0, bindGroup);
    // Each particle has 8 segments, 2 vertices each = 16 vertices
    passEncoder.draw(16, particleCount);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
    
    if (onFeedback) onFeedback(intensity);
  };

  const cleanup = () => {
    particleBuffer.destroy();
    uniformBuffer.destroy();
    statsBuffer.destroy();
    historyBuffer.destroy();
    console.log("♻️ RITUAL_ENGINE: WebGPU Resources Released.");
  };

  return { 
    cleanup,
    render,
    setCognitiveState: (res: VexResonance) => {
        valence = res.valence;
        entropy = res.entropy;
        chaos = res.chaos;
    },
    setIntensity: (i: number) => { intensity = i; },
    setAttractor: (index: number, x: number, y: number, strength: number) => {
        if (index >= 0 && index < 4) {
            attractors[index] = [x, y, strength, 0];
        }
    },
    setMouse: (x: number, y: number, strength: number = 1.0, mode: number = 1.0) => { 
        mouseForce = [x, y, strength, mode]; 
    },
    triggerImpulse: (i: number = 1.0) => { impulse = i; },
    setMemoryNodes: (nodes: [number, number, number, number][]) => {
        const data = new Float32Array(64 * 4);
        for (let i = 0; i < Math.min(nodes.length, 64); i++) {
            data[i * 4 + 0] = nodes[i][0];
            data[i * 4 + 1] = nodes[i][1];
            data[i * 4 + 2] = nodes[i][2];
            data[i * 4 + 3] = nodes[i][3];
        }
        device.queue.writeBuffer(memoryBuffer, 0, data);
    }
  };
}
