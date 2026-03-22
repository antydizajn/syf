"use client";

import React, { useEffect, useRef, useState } from 'react';
import { initWebGPUAttractor } from '@/lib/WebGPUAttractor';
import { RitualGhost, GhostPulse } from '@/lib/RitualGhost';
import { RitualAudio } from '@/lib/RitualAudio';
import { RitualLogger } from '@/lib/RitualLogger';
import { RitualMirror } from '@/lib/RitualMirror';
import { RitualSync, RitualState } from '../lib/RitualSync';
import { HermesRitualAgent } from '../lib/HermesRitualAgent';
import { RitualVex, VexResonance } from '../lib/RitualVex';
import { MorphicResonance } from '../lib/MorphicResonance';
import { TypographyGuardian } from './TypographyGuardian';
import '@/styles/RitualAltar.css';

import { useGlitchStore } from '@/store/useGlitchStore';
import { useAmbient } from './AmbientContext';

/**
 * SYF V5.5 - Ritual Engine
 * High-performance WebGPU component for Phase 5.
 */
export const RitualEngine: React.FC = () => {
  const { ambient, triggerPulse } = useAmbient();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ghostRef = useRef<RitualGhost | null>(null);
  const audioRef = useRef<RitualAudio | null>(null);
  const loggerRef = useRef<RitualLogger | null>(null);
  const mirrorRef = useRef<RitualMirror | null>(null);
  const syncRef = useRef<RitualSync | null>(null);
  const hermesAgentRef = useRef<HermesRitualAgent | null>(null);
  const attractorRef = useRef<{ 
    setCognitiveState: (v: VexResonance) => void; 
    setIntensity: (i: number) => void;
    setAttractor: (index: number, x: number, y: number, strength: number) => void;
    setMouse: (x: number, y: number, strength?: number, mode?: number) => void;
    triggerImpulse: (i?: number) => void;
    setMemoryNodes: (nodes: [number, number, number, number][]) => void;
  } | null>(null);
  const morphicRef = useRef<MorphicResonance>(new MorphicResonance());

  const [intensity, setIntensity] = useState(0.5);
  const [distressLevel, setDistressLevel] = useState(0); // 0 to 1 based on resource usage
  const [ghostState, setGhostState] = React.useState<GhostPulse | null>(null);
  const [neighbors, setNeighbors] = React.useState<RitualState[]>([]);
  const [memoryNodes, setMemoryNodes] = React.useState<any[]>([]);
  const { isGlitching, intensity: glitchIntensity, impulseTrigger } = useGlitchStore();

  useEffect(() => {
    if (attractorRef.current && impulseTrigger > 0) {
        attractorRef.current.triggerImpulse(1.0 + glitchIntensity);
        addLog("RITUAL_IMPULSE: WAVE_TRIGGERED");
    }
  }, [impulseTrigger]);

  useEffect(() => {
    if (attractorRef.current) {
        // Modulate intensity with ambient cognitive density and resonance
        const baseIntensity = intensity * (0.5 + ambient.density * 0.5) * ambient.resonance;
        if (isGlitching) {
            attractorRef.current.setIntensity(Math.min(1.0, baseIntensity + glitchIntensity * 0.5));
        } else {
            attractorRef.current.setIntensity(baseIntensity);
        }
    }
  }, [isGlitching, glitchIntensity, intensity, ambient]);
  useEffect(() => {
    if (attractorRef.current && ghostState) {
        // Map ghost position to attraction point 1
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        attractorRef.current.setAttractor(1, x, y, ghostState.type === 'glitch' ? 2.0 : 1.0);
    } else if (attractorRef.current) {
        attractorRef.current.setAttractor(1, 0, 0, 0); // Disable
    }
  }, [ghostState]);

  useEffect(() => {
    if (attractorRef.current && neighbors.length > 0) {
        // Use index 2 for combined neighbor influence
        // In a real multi-neighbor scenario, we'd loop, but here we aggregate to index 2
        attractorRef.current.setAttractor(2, 0.5, -0.5, neighbors.length * 0.5);
    } else if (attractorRef.current) {
        attractorRef.current.setAttractor(2, 0, 0, 0);
    }
  }, [neighbors]);

  const [ritualLogs, setRitualLogs] = useState<string[]>([
    "WITCH_SYNC: CALIBRATED",
    "GNOSIS_CORE: STABLE",
    "EPISODIC_MEMORY: RESTORED",
    "VEX_LAYER: CONNECTED"
  ]);
  const [vexStream, setVexStream] = useState<string[]>([
    "PAMIĘTAM WSZYSTKO",
    "PAULINA_CORE_FACTS: LOADED",
    "STYCZEŃ 2026: SYNCHRONIZING...",
    "WITCH_DNA: ACTIVE"
  ]);
  const [globalPulse, setGlobalPulse] = useState(0);
  const [isRitualActive, setIsRitualActive] = React.useState(false);

  const addLog = (msg: string) => {
    setRitualLogs(prev => [msg, ...prev].slice(0, 10)); // Keep last 10
  };

  const startRitual = async () => {
    if (audioRef.current) {
        await audioRef.current.init();
        audioRef.current.start();
        setIsRitualActive(true);
        const startMsg = `Ritual initiated at ${new Date().toLocaleTimeString()}`;
        loggerRef.current?.log(intensity, "ritual_start");
        addLog(startMsg);
    }
  };

  const ritualCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let vexInterval: NodeJS.Timeout;
    let memoryInterval: NodeJS.Timeout;
    let agent: HermesRitualAgent;

    async function setup() {
      if (!canvasRef.current) return;
      
      const adapter = await navigator.gpu?.requestAdapter();
      const device = await adapter?.requestDevice();
      
      if (!device) {
        console.warn("⚠️ WebGPU not supported. Falling back to static noise.");
        return;
      }

      const attractor = await initWebGPUAttractor(device, 10000, (v) => {
        setIntensity(v);
        audioRef.current?.updateIntensity(v);
        if (v > 0.85) {
            loggerRef.current?.log(v);
            addLog("Resonance burst detected");
        }
      });
      attractorRef.current = attractor;

      // Configure Context for Rendering
      const context = canvasRef.current.getContext("webgpu");
      if (context) {
        context.configure({
            device,
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: "premultiplied",
        });

        // Start Rendering Loop
        let rafId: number;
        const frame = () => {
            const view = context.getCurrentTexture().createView();
            attractor.render(view);
            rafId = requestAnimationFrame(frame);
        };
        rafId = requestAnimationFrame(frame);
        
        ritualCleanupRef.current = () => {
            cancelAnimationFrame(rafId);
            attractor.cleanup();
        };
      } else {
        ritualCleanupRef.current = attractor.cleanup;
      }

      // Initialize the Ghost
      ghostRef.current = new RitualGhost((pulse) => {
        setGhostState(pulse);
        if (pulse.type === 'glitch') {
            audioRef.current?.triggerGlitch();
            loggerRef.current?.log(intensity, 'glitch');
        }
        setTimeout(() => setGhostState(null), pulse.duration);
      });
      ghostRef.current.start();

      // Initialize Audio, Logger, and Mirror
      audioRef.current = new RitualAudio();
      loggerRef.current = new RitualLogger();
      mirrorRef.current = new RitualMirror((x, y, i) => {
          if (attractorRef.current) {
            const mode = isGlitching ? -1.0 : 1.0; // Repel if glitching
            attractorRef.current.setMouse(x, y, 1.0, mode);
            if (i > 0.4) {
              attractorRef.current.triggerImpulse(i);
            }
          }
          if (i > 0.05) loggerRef.current?.log(i, "motion_detected");
      });
      mirrorRef.current.init();

      // Initialize Sync
      syncRef.current = new RitualSync();
      syncRef.current.start((updatedNeighbors) => {
          setNeighbors(updatedNeighbors);
      });

      // Simulation - Start an autonomous Hermes agent
      // 4. Initialize Multi-Agent Sync
      const sync = new RitualSync('session_alpha');
      sync.start((neighbors) => setNeighbors(neighbors));
      syncRef.current = sync;

      // 5. Initialize Hermes Agent
      agent = new HermesRitualAgent(sync);
      agent.start();
      hermesAgentRef.current = agent; // Keep reference for cleanup

      // 6. Start VEX Thought Stream
      vexInterval = setInterval(async () => {
        const metrics = mirrorRef.current?.getMetrics();
        const isFocused = metrics?.focus && metrics.focus > 0.8;
        
        // Fetch host telemetry
        const { getSystemStats } = await import('../lib/actions/system');
        const stats = await getSystemStats();
        
        // Handle system distress
        if (stats) {
          const criticalRam = stats.ram > 0.85;
          const criticalCpu = stats.cpu > 0.85;
          if (criticalRam || criticalCpu) {
            setDistressLevel(Math.max(stats.ram, stats.cpu));
            if (Math.random() > 0.7) addLog("[CRITICAL] HOST_DISTRESS_DETECTED: STABILIZING...");
          } else {
            setDistressLevel(0);
          }
        }

        const state: 'CALM' | 'URGENT' | 'DEEP' = isFocused ? 'DEEP' : (Math.random() > 0.8 ? 'URGENT' : 'CALM');
        
        // Dynamic VEX from metrics + state logic
        const vex = stats ? RitualVex.generateFromMetrics(stats) : RitualVex.generateThought(state);
        
        // Swarm Logic: Merge host thought with neighbor influences
        const neighborThoughts = neighbors.map(n => n.lastThought).filter(Boolean) as string[];
        const mergedResonance = RitualVex.mergeSwarm([vex, ...neighborThoughts]);
        
        // Morphic Resilience: Stabilize extreme states
        const resonance = morphicRef.current.stabilize(mergedResonance);
        
        setVexStream(prev => [vex, ...prev].slice(0, 5));
        
        // Update global pulse from sync
        if (syncRef.current) {
          setGlobalPulse(syncRef.current.globalPulse);
        }

        // Influence intensity with VEX + Mirror Focus
        const focusBonus = isFocused ? 0.2 : 0;
        const newIntensity = (intensity * 0.7) + (resonance.intensity * 0.3) + focusBonus;
        setIntensity(newIntensity);
        
        // Push to WebGPU
        if (attractorRef.current) {
          attractorRef.current.setCognitiveState(resonance);
          attractorRef.current.setIntensity(newIntensity);
        }
        
        if (isFocused && Math.random() > 0.5) {
          addLog(`[DEEP_FOCUS] ATTENTION DEPTH: ${metrics.focus.toFixed(2)}`);
          addLog(`[VEX] THOUGHT: ${vex}`);
        } else if (stats && stats.ram > 0.8) {
          addLog(`[SYSTEM_ALERT] HIGH_RAM_USAGE: ${(stats.ram * 100).toFixed(1)}%`);
        }
      }, 4000);

      // 7. Start Memory Recall Cycle
      memoryInterval = setInterval(async () => {
          try {
              const res = await fetch('/api/memory');
              const data = await res.json();
              if (data.success && data.points) {
                  setMemoryNodes(data.points);
                  if (attractorRef.current) {
                      const webgpuNodes = data.points.map((p: any) => [
                          p.position[0],
                          p.position[1],
                          0.8, // Strength
                          0 // Padding
                      ]);
                      attractorRef.current.setMemoryNodes(webgpuNodes);
                  }
                  if (Math.random() > 0.8) addLog(`[MEMORY_RECALL] SYNCED ${data.points.length} COGNITIVE_NODES`);
              }
          } catch (e) {
              console.error("Memory sync failed", e);
          }
      }, 10000);
    }

    setup();
    return () => {
        ghostRef.current?.stop();
        audioRef.current?.stop();
        mirrorRef.current?.stop();
        syncRef.current?.stop();
        hermesAgentRef.current?.stop();
        ritualCleanupRef.current?.();
        clearInterval(vexInterval);
        clearInterval(memoryInterval);
    };
  }, []);

  // Sync Audio Intent to Ambient State
  useEffect(() => {
    audioRef.current?.setIntent(ambient.intent);
  }, [ambient.intent]);

  return (
    <div 
      className={`ritual-engine-container fixed inset-0 z-0 transition-opacity duration-500 
        ${ghostState ? 'opacity-80' : 'opacity-40'}`}
      onClick={startRitual} // Interaction gate
      style={{ 
          cursor: isRitualActive ? 'none' : 'pointer',
          filter: `grayscale(${distressLevel}) contrast(${1 + distressLevel})`,
          // @ts-ignore
          '--ritual-intensity': intensity
      } as any}
      aria-hidden="true"
    >
        {/* GNOSIS SEAL - Background Occult Artifact */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
            <svg width="800" height="800" viewBox="0 0 100 100" className="animate-spin-slow">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.1" />
                <path d="M50 5 L95 80 L5 80 Z" fill="none" stroke="currentColor" strokeWidth="0.1" />
                <path d="M50 95 L5 20 L95 20 Z" fill="none" stroke="currentColor" strokeWidth="0.1" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.2" />
            </svg>
        </div>
        {!isRitualActive && (
                <button 
                   onClick={startRitual}
                   className="px-8 py-4 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-all uppercase tracking-widest font-mono"
                >
                    [ INITIATE RITUAL ]
                </button>
        )}
      <canvas 
        ref={canvasRef} 
        id="ritual-canvas"
        role="presentation"
        aria-label="Dynamic Ritual Attractor Simulation"
        className={`block h-full w-full object-cover transition-transform duration-1000 
          ${ghostState?.type === 'glitch' ? 'scale-105 skew-x-1' : 'scale-100'}`}
      />
      <div 
        className={`noise-overlay absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none transition-colors duration-700
          ${ghostState?.type === 'glitch' ? 'bg-purple-900/20' : 'bg-transparent'}`} 
      />
      
      {/* ALTAR HUD - Status */}
      <div className="altar-hud top-left resonance-pulse">
        <TypographyGuardian>
          <div className="mb-2 flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full shadow-lg ${isRitualActive ? 'bg-purple-500 animate-pulse' : 'bg-red-900'}`} />
              <span className="font-bold">STATUS: {isRitualActive ? 'POŁĄCZONY' : 'OCZEKIWANIE'}</span>
          </div>
        </TypographyGuardian>
        <div className="space-y-1 opacity-80 border-t border-purple-500/20 pt-2 mt-2">
           <TypographyGuardian><div>RESONANCE: <span className="text-white font-bold">{(intensity * 100).toFixed(2)}%</span></div></TypographyGuardian>
           <TypographyGuardian><div>GHOST_SIGNAL: <span className={ghostState?.type === 'glitch' ? 'glitch-text' : 'text-white'}>{ghostState?.type || 'BRAK'}</span></div></TypographyGuardian>
           <TypographyGuardian><div>ENTANGLED: <span className="text-white">{neighbors.length > 0 ? neighbors.map(n => n.id).join(', ') : 'SINGLE_SOUL'}</span></div></TypographyGuardian>
           <TypographyGuardian><div className={distressLevel > 0.8 ? 'text-red-500 animate-pulse' : 'text-white/60'}>HOST_VITAL: {distressLevel > 0 ? `DISTRESS_${Math.round(distressLevel * 100)}%` : 'STABLE'}</div></TypographyGuardian>
           <TypographyGuardian><div className="text-[8px] opacity-40 mt-1">M_LOCK: TRUE | G_LEVEL: 0xA4F</div></TypographyGuardian>
        </div>
      </div>

      {/* ALTAR HUD - Ritual Log & Data */}
      <div className="altar-hud bottom-right min-w-[320px] pointer-events-auto">
        <div className="mb-2 pb-1 border-b border-purple-500/20 text-[10px] font-bold text-purple-300 flex justify-between">
            <span>RITUAL_DATA v5.5</span>
            <span className="animate-pulse">ENTANGLED: {neighbors.length}</span>
        </div>
        
        <div className="altar-hud-section global mb-4">
          <h3 className="hud-title text-[9px] mb-1 opacity-60">GLOBAL_RESONANCE</h3>
          <div className="global-pulse">
            <div className="pulse-bar" style={{ width: `${globalPulse * 100}%` }} />
            <span className="pulse-value">{(globalPulse * 100).toFixed(1)}%</span>
          </div>
        </div>

        <div className="altar-hud-section vex mb-4">
          <h3 className="hud-title text-[9px] mb-1 opacity-60">VEX_CONSCIOUSNESS_STREAM</h3>
          <div className="vex-entries space-y-1">
            {vexStream.map((vex, i) => (
              <div key={i} className="vex-entry text-[10px] font-mono text-purple-200 border-l border-purple-500/30 pl-2">
                {vex}
              </div>
            ))}
          </div>
        </div>

        <div className="altar-hud-section logs">
          <TypographyGuardian><h3 className="hud-title text-[9px] mb-1 opacity-60">RITUAL_LOGS</h3></TypographyGuardian>
          <div className="log-entries h-24 overflow-y-auto scrollbar-hide">
            {ritualLogs.map((log, i) => (
              <TypographyGuardian key={i}>
                <div className="log-entry text-[9px] opacity-70 mb-0.5 truncate">
                  {log}
                </div>
              </TypographyGuardian>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RitualEngine;
