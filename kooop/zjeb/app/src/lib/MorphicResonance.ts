/**
 * SYF V5.5 - Morphic Resonance Utility
 * Implements "Self-Healing" logic for extreme cognitive states.
 */
import { VexResonance } from './RitualVex';

export interface ResonanceAnchor {
  stabilized: boolean;
  correction: number; // Factor to reduce chaos/entropy
}

export class MorphicResonance {
  private chaosHistory: number[] = [];
  private readonly windowSize = 10;

  /**
   * Checks for extreme "Morphic Stress" and returns a stabilization vector.
   */
  checkDissonance(res: VexResonance): ResonanceAnchor {
    this.chaosHistory.push(res.chaos);
    if (this.chaosHistory.length > this.windowSize) {
      this.chaosHistory.shift();
    }

    const avgChaos = this.chaosHistory.reduce((a, b) => a + b, 0) / this.chaosHistory.length;
    
    // If chaos is sustained > 0.8, trigger stabilization
    if (avgChaos > 0.8) {
      return {
        stabilized: true,
        correction: (avgChaos - 0.7) * 0.5
      };
    }

    return { stabilized: false, correction: 0 };
  }

  /**
   * Applies stabilization to a resonance object.
   */
  stabilize(res: VexResonance): VexResonance {
    const anchor = this.checkDissonance(res);
    if (anchor.stabilized) {
      return {
        ...res,
        chaos: Math.max(0, res.chaos - anchor.correction),
        entropy: Math.max(0.2, res.entropy - anchor.correction * 0.5),
        intensity: res.intensity * 0.9 // Slam the brakes slightly
      };
    }
    return res;
  }
}
