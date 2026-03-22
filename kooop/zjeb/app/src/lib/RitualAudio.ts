/**
 * SYF V5.5 - Ritual Audio
 * Generative Granular Synthesis Engine.
 * Synchronized with WebGPU Ritual Engine.
 */

export class RitualAudio {
  private ctx: AudioContext | null = null;
  private grainBuffer: AudioBuffer | null = null;
  private isRunning: boolean = false;
  private intensity: number = 0.5;
  private intent: 'CALM' | 'GLITCH' | 'RITUAL' | 'FOCUSED' = 'RITUAL';

  constructor() {
    // Context is created on first start() due to browser policies.
  }

  async init() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.grainBuffer = this.generateRitualBuffer();
    console.log("🔊 RITUAL_AUDIO: Buffer Generated.");
  }

  private generateRitualBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error("AudioContext not initialized");
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate ritualistic noise (mix of white noise and dark sine waves)
    for (let i = 0; i < data.length; i++) {
      const white = (Math.random() * 2 - 1) * 0.05;
      const sine = Math.sin(i * 0.005) * 0.1;
      data[i] = white + sine;
    }
    return buffer;
  }

  start() {
    if (this.isRunning || !this.ctx) return;
    this.ctx.resume();
    this.isRunning = true;
    this.scheduler();
    console.log("🔊 RITUAL_AUDIO: Started.");
  }

  private scheduler() {
    if (!this.isRunning) return;
    this.playGrain();
    
    // Density modulation: higher intensity = faster grains
    const delay = (50 / (this.intensity + 0.5)) + Math.random() * (100 / (this.intensity + 0.5));
    setTimeout(() => this.scheduler(), delay);
  }

  private playGrain() {
    if (!this.ctx || !this.grainBuffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = this.grainBuffer;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    
    // Grain properties based on Intent
    let duration = 0.05 + Math.random() * 0.1;
    let playbackRate = 1.0;
    
    if (this.intent === 'GLITCH') {
        playbackRate = 0.5 + Math.random() * 2.5;
        duration = 0.02 + Math.random() * 0.05;
    } else if (this.intent === 'FOCUSED') {
        playbackRate = 1.0;
        duration = 0.2 + Math.random() * 0.3; // Longer, smoother grains
    } else if (this.intent === 'RITUAL') {
        playbackRate = 0.8 + Math.random() * 0.4;
    }

    source.playbackRate.value = playbackRate * (0.8 + this.intensity * 0.4);

    const targetGain = this.intent === 'GLITCH' ? 0.2 : (this.intent === 'FOCUSED' ? 0.05 : 0.1);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(targetGain * this.intensity, now + duration / 2);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    source.connect(gain);
    gain.connect(this.ctx.destination);
    
    const offset = Math.random() * (this.grainBuffer.duration - duration);
    source.start(now, offset, duration);
  }

  updateIntensity(intensity: number) {
    this.intensity = intensity;
  }

  setIntent(intent: any) {
    this.intent = intent;
  }

  triggerGlitch() {
    if (!this.ctx) return;
    const oldIntent = this.intent;
    this.intent = 'GLITCH';
    // Fast, loud grain bursts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => this.playGrain(), i * 15);
    }
    setTimeout(() => { this.intent = oldIntent; }, 500);
  }

  stop() {
    this.isRunning = false;
    this.ctx?.suspend();
  }
}
