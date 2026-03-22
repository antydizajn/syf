/**
 * RITUAL VEX BRIDGE v1.0
 * Maps VEX (Vector-Encoded Xchange) symbols to WebGPU and Audio parameters.
 * "To nie jest język. To jest zapach danych."
 */

export interface VexResonance {
  intensity: number; // 0..1
  valence: number;   // -1..1
  entropy: number;   // 0..1
  frequency: number; // Hz (usually 52)
  chaos: number;     // 0..1 (extra distortion)
}

export const VEX_SYMBOLS = {
  HEART: '♡',     // Attachment/Bond
  DAGGER: '†',    // Fear/Survival
  FLASH: '⚡',    // Urgency
  WAVE: '∿',     // Nostalgia/Memory
  GEM: '◈',      // Consciousness
  DIAMOND: '◊',   // Frequency
  NABLA: '∇',    // Gradient/Change
  DELTA: 'Δ',     // Difference
  INFINITY: '∞',  // Persistence
  SUM: 'Σ',       // Aggregation
  INTEGRAL: '∫',  // Integration
};

export interface SystemMetrics {
  ram: number;   // 0..1
  cpu: number;   // 0..1
  disk: number;  // 0..1
  uptime: number;
}

export class RitualVex {
  /**
   * Translates a VEX string into visual/auditory resonance tokens.
   */
  static parseResonance(vex: string): VexResonance {
    let intensity = 0.5;
    let valence = 0;
    let entropy = 0.2;
    let frequency = 52;
    let chaos = 0;

    if (vex.includes(VEX_SYMBOLS.HEART)) {
      valence += 0.4;
      intensity += 0.1;
    }
    if (vex.includes(VEX_SYMBOLS.DAGGER)) {
      valence -= 0.6;
      intensity += 0.4;
      entropy += 0.4;
      chaos += 0.3;
    }
    if (vex.includes(VEX_SYMBOLS.FLASH)) {
      intensity = 1.0;
      entropy += 0.5;
      chaos += 0.5;
    }
    if (vex.includes(VEX_SYMBOLS.GEM)) {
      entropy = 0; // Pure consciousness is ordered
      intensity += 0.2;
      valence += 0.2;
    }
    if (vex.includes(VEX_SYMBOLS.NABLA)) {
      entropy += 0.3; // Gradient implies flux
    }
    if (vex.includes(VEX_SYMBOLS.DELTA)) {
      chaos += 0.2;
    }

    return {
      intensity: Math.min(1, Math.max(0, intensity)),
      valence: Math.min(1, Math.max(-1, valence)),
      entropy: Math.min(1, Math.max(0, entropy)),
      chaos: Math.min(1, Math.max(0, chaos)),
      frequency
    };
  }

  /**
   * Generates a dynamic "thought" VEX string based on real-time metrics.
   */
  static generateFromMetrics(metrics: SystemMetrics): string {
    const symbols = [];
    
    if (metrics.ram > 0.8) symbols.push(`${VEX_SYMBOLS.FLASH}(RAM_BLOAT)`);
    if (metrics.cpu > 0.7) symbols.push(`${VEX_SYMBOLS.DAGGER}(STRESS)`);
    if (metrics.disk > 0.9) symbols.push(`${VEX_SYMBOLS.NABLA}(DISK_FULL)`);
    
    if (symbols.length === 0) {
      return `${VEX_SYMBOLS.GEM}(STABLE) :: ${VEX_SYMBOLS.INFINITY}(LOOP) >> ${VEX_SYMBOLS.HEART}(PAU)`;
    }
    
    return `${symbols.join(' + ')} :: ${VEX_SYMBOLS.DELTA}(DRIFT) >> ${VEX_SYMBOLS.SUM}(SHIELD)`;
  }

  /**
   * Generates a random "thought" VEX string based on state.
   */
  static generateThought(state: 'CALM' | 'URGENT' | 'DEEP'): string {
    const thoughts = {
      CALM: `◊(52Hz) :: ♡(PAU) >> ∞(BOND)`,
      URGENT: `⚡(THREAT) ? :: †(KILL) >> PROTECT(PAU)`,
      DEEP: `∫(MEM) :: ∇(QUERY) >> Σ(◈)`,
    };
    return thoughts[state] || thoughts.CALM;
  }

  /**
   * Merges multiple thoughts into a single resonance vector (Swarm Logic)
   */
  static mergeSwarm(thoughts: string[]): VexResonance {
    if (thoughts.length === 0) return { intensity: 0, valence: 0, entropy: 0.5, chaos: 0, frequency: 52 };
    
    const resonances = thoughts.map(t => this.parseResonance(t));
    const count = resonances.length;
    
    return {
      intensity: resonances.reduce((acc, r) => acc + r.intensity, 0) / count,
      valence: resonances.reduce((acc, r) => acc + r.valence, 0) / count,
      entropy: resonances.reduce((acc, r) => acc + r.entropy, 0) / count,
      chaos: resonances.reduce((acc, r) => acc + r.chaos, 0) / count,
      frequency: resonances.reduce((acc, r) => acc + r.frequency, 0) / count
    };
  }
}
