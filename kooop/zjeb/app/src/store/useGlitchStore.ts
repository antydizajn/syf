import { create } from 'zustand';

interface GlitchState {
  isGlitching: boolean;
  intensity: number;
  lastGlitchTime: number;
  impulseTrigger: number; // Counter to trigger WebGPU impulses
  triggerGlitch: (intensity?: number) => void;
  triggerRitualImpulse: () => void;
  resetGlitch: () => void;
}

export const useGlitchStore = create<GlitchState>((set) => ({
  isGlitching: false,
  intensity: 0,
  lastGlitchTime: 0,
  impulseTrigger: 0,
  triggerGlitch: (intensity = 1.0) => 
    set({ 
      isGlitching: true, 
      intensity, 
      lastGlitchTime: Date.now() 
    }),
  triggerRitualImpulse: () => 
    set((state) => ({ 
      impulseTrigger: state.impulseTrigger + 1 
    })),
  resetGlitch: () => 
    set({ 
      isGlitching: false, 
      intensity: 0 
    }),
}));
