/**
 * SYF V5.5 - Ritual Ghost
 * Stochastic engine for emergent behavior.
 * Injects 'unseen connections' into the Ritual Engine.
 */

export interface GhostPulse {
  intensity: number;
  duration: number;
  type: 'glitch' | 'attract' | 'repel';
}

export class RitualGhost {
  private active: boolean = false;
  private onPulse: (pulse: GhostPulse) => void;

  constructor(onPulse: (pulse: GhostPulse) => void) {
    this.onPulse = onPulse;
  }

  start() {
    this.active = true;
    this.scheduleNextPulse();
    console.log("👻 RITUAL_GHOST: Awakened.");
  }

  stop() {
    this.active = false;
  }

  private scheduleNextPulse() {
    if (!this.active) return;

    // Stochastic timing (10-30 seconds between pulses)
    const delay = 10000 + Math.random() * 20000;
    setTimeout(() => this.triggerPulse(), delay);
  }

  private triggerPulse() {
    if (!this.active) return;

    const types: GhostPulse['type'][] = ['glitch', 'attract', 'repel'];
    const pulse: GhostPulse = {
      intensity: 0.5 + Math.random() * 0.5,
      duration: 500 + Math.random() * 1000,
      type: types[Math.floor(Math.random() * types.length)]
    };

    console.log(`👻 RITUAL_GHOST: Pulse [${pulse.type}] Intensity: ${pulse.intensity.toFixed(2)}`);
    this.onPulse(pulse);
    
    this.scheduleNextPulse();
  }
}
