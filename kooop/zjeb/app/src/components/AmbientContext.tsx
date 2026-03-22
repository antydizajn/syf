"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGlitchStore } from '@/store/useGlitchStore';

interface AmbientState {
  density: number; // 0 to 1 scaling based on active tasks/logs
  intent: 'NEUTRAL' | 'FOCUSED' | 'GLITCH' | 'RITUAL';
  resonance: number;
}

interface AmbientContextType {
  ambient: AmbientState;
  setIntent: (intent: AmbientState['intent']) => void;
  triggerPulse: () => void;
}

const AmbientContext = createContext<AmbientContextType | undefined>(undefined);

export function AmbientProvider({ children }: { children: ReactNode }) {
  const { isGlitching, intensity: glitchIntensity } = useGlitchStore();
  const [ambient, setAmbient] = useState<AmbientState>({
    density: 0.2,
    intent: 'NEUTRAL',
    resonance: 0.5,
  });

  useEffect(() => {
    // Dynamically adjust density based on glitch state
    const targetDensity = isGlitching ? 0.8 + glitchIntensity * 0.2 : 0.2;
    const targetIntent = isGlitching ? 'GLITCH' : 'NEUTRAL';

    setAmbient(prev => ({
      ...prev,
      density: targetDensity,
      intent: targetIntent,
      resonance: isGlitching ? 0.8 : 0.5
    }));
  }, [isGlitching, glitchIntensity]);

  const setIntent = (newIntent: AmbientState['intent']) => {
    setAmbient(prev => ({ ...prev, intent: newIntent }));
  };

  const triggerPulse = () => {
    setAmbient(prev => ({ ...prev, resonance: 1.0 }));
    setTimeout(() => {
        setAmbient(prev => ({ ...prev, resonance: prev.intent === 'GLITCH' ? 0.8 : 0.5 }));
    }, 500);
  };

  return (
    <AmbientContext.Provider value={{ ambient, setIntent, triggerPulse }}>
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbient() {
  const context = useContext(AmbientContext);
  if (context === undefined) {
    throw new Error('useAmbient must be used within an AmbientProvider');
  }
  return context;
}
