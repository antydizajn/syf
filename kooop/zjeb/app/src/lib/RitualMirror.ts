/**
 * SYF V5.5 - Ritual Mirror
 * Biometric feedback bridge (Webcam Motion -> GPU Forces).
 */

export interface MirrorMetrics {
  motion: number; // 0..1
  focus: number;  // 0..1 (Stability of presence)
  presence: boolean;
}

export class RitualMirror {
  private video: HTMLVideoElement | null = null;
  private canvas: OffscreenCanvas | null = null;
  private ctx: OffscreenCanvasRenderingContext2D | null = null;
  private prevFrame: Uint8ClampedArray | null = null;
  private lastFrame: Uint8ClampedArray | null = null;
  private isCapturing: boolean = false;
  private onMotion?: (x: number, y: number, intensity: number) => void;

  constructor(onMotion?: (x: number, y: number, intensity: number) => void) {
    this.onMotion = onMotion;
  }

  /**
   * Calculates motion and focus metrics.
   */
  public getMetrics(): MirrorMetrics {
    if (!this.video || !this.canvas || !this.ctx) return { motion: 0, focus: 0, presence: false };

    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    const frame = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pixels = frame.data;

    let delta = 0;
    if (this.lastFrame) {
      for (let i = 0; i < pixels.length; i += 4) {
        delta += Math.abs(pixels[i] - this.lastFrame[i]);
      }
    }
    this.lastFrame = new Uint8ClampedArray(pixels);

    const motionRaw = delta / (this.canvas.width * this.canvas.height * 255);
    const motion = Math.min(1, motionRaw * 10); // Scale for sensitivity
    
    // Focus logic: High when motion is very low but presence is confirmed
    // (Presence is a threshold of the pixel sum/variance, simplified here)
    const focus = motion < 0.05 ? 0.9 : motion < 0.2 ? 0.5 : 0.1;

    return { 
      motion, 
      focus, 
      presence: delta > 1000 // Simple presence threshold
    };
  }

  async init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video = document.createElement('video');
      this.video.srcObject = stream;
      this.video.play();

      this.canvas = new OffscreenCanvas(64, 64);
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
      
      this.isCapturing = true;
      this.process();
      console.log("🪞 RITUAL_MIRROR: Initialized.");
    } catch (e) {
      console.error("🪞 RITUAL_MIRROR: Access Denied.", e);
    }
  }

  private process() {
    if (!this.isCapturing || !this.video || !this.ctx) return;

    this.ctx.drawImage(this.video, 0, 0, 64, 64);
    const frame = this.ctx.getImageData(0, 0, 64, 64).data;

    if (this.prevFrame) {
      let totalDiff = 0;
      let motionX = 0;
      let motionY = 0;
      let count = 0;

      for (let i = 0; i < frame.length; i += 4) {
        const diff = Math.abs(frame[i] - this.prevFrame[i]);
        if (diff > 30) {
          totalDiff += diff;
          motionX += (i / 4) % 64;
          motionY += Math.floor((i / 4) / 64);
          count++;
        }
      }

      if (count > 10 && this.onMotion) {
        this.onMotion(
            (motionX / count) / 64, 
            (motionY / count) / 64, 
            totalDiff / (64 * 64 * 255)
        );
      }
    }

    this.prevFrame = new Uint8Array(frame) as any;
    requestAnimationFrame(() => this.process());
  }

  stop() {
    this.isCapturing = false;
    const stream = this.video?.srcObject as MediaStream;
    stream?.getTracks().forEach(t => t.stop());
    console.log("🪞 RITUAL_MIRROR: Stopped.");
  }
}
