import { wgslSource } from '../shaders/revolutionBgShader';

let device: GPUDevice;
let context: GPUCanvasContext;
let pipeline: GPURenderPipeline;
let uniformBuffer: GPUBuffer;
let renderPassDescriptor: GPURenderPassDescriptor;

let time = 0;
let targetIntensity = 1.0;
let currentIntensity = 1.0;
let mouseX = 0;
let mouseY = 0;
let width = 800;
let height = 600;
let animationFrameId = 0;
let canvas: OffscreenCanvas;
const uniformData = new Float32Array(8); // 8 floats = 32 bytes

self.onmessage = async (event: MessageEvent) => {
  const { type, payload } = event.data;

  if (type === 'init') {
    canvas = payload.canvas as OffscreenCanvas;
    width = payload.width || canvas.width;
    height = payload.height || canvas.height;
    
    // Explicitly set the initial dimensions if provided (defaulting to 300x150 otherwise)
    if (payload.width && payload.height) {
      canvas.width = payload.width;
      canvas.height = payload.height;
    }

    if (!navigator.gpu) {
      console.warn('WebGPU nie jest wspierane w tej przeglądarce. Tło zostanie ukryte.');
      return;
    }

    try {
      const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
      if (!adapter) {
        console.warn('Nie udało się uzyskać adaptera WebGPU.');
        return;
      }

      device = await adapter.requestDevice();
      context = canvas.getContext('webgpu') as GPUCanvasContext;

      const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      });

      const shaderModule = device.createShaderModule({
        label: 'RevolutionShader',
        code: wgslSource,
      });

      pipeline = device.createRenderPipeline({
        label: 'RevolutionPipeline',
        layout: 'auto',
        vertex: {
          module: shaderModule,
          entryPoint: 'vs_main',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fs_main',
          targets: [{ format: presentationFormat }],
        },
        primitive: {
          topology: 'triangle-strip',
        },
      });

      uniformBuffer = device.createBuffer({
        size: 32, // 8 floats
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: uniformBuffer } },
        ],
      });

      renderPassDescriptor = {
        colorAttachments: [
          {
            view: undefined as any,
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
      };

      const startTime = performance.now();

      const render = () => {
        time = (performance.now() - startTime) * 0.001;

        // Smoothly interpolate intensity (GSAP equivalent inside worker)
        currentIntensity += (targetIntensity - currentIntensity) * 0.1;

        uniformData[0] = time;
        uniformData[1] = currentIntensity;
        uniformData[2] = mouseX;
        uniformData[3] = mouseY;
        uniformData[4] = width;
        uniformData[5] = height;
        uniformData[6] = 0; // padding
        uniformData[7] = 0; // padding

        device.queue.writeBuffer(uniformBuffer, 0, uniformData.buffer);

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();
        
        const colorAttachment = renderPassDescriptor.colorAttachments as GPURenderPassColorAttachment[];
        colorAttachment[0].view = textureView;

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.setBindGroup(0, bindGroup);
        passEncoder.draw(4);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    } catch (e) {
      console.error('Wystąpił błąd inicjalizacji WebGPU:', e);
    }
  } else if (type === 'resize') {
    width = payload.width;
    height = payload.height;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
  } else if (type === 'mousemove') {
    mouseX = payload.x;
    mouseY = payload.y;
    targetIntensity = 1.15;
    
    // Auto-decay back to 1.0 after brief moment
    setTimeout(() => {
      targetIntensity = 1.0;
    }, 300);
  } else if (type === 'cleanup') {
    cancelAnimationFrame(animationFrameId);
  }
};
