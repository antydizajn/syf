'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DiagnosticPanel } from '@/components/hud/DiagnosticPanel';
import { Ticker } from '@/components/hud/Ticker';
import { Gauge } from '@/components/hud/Gauge';
import { GlitchText } from '@/components/hud/GlitchText';
import { GlassPanel } from '@/components/hud/GlassPanel';
import { RGBShift } from '@/components/hud/RGBShift';

export default function OverloadPage() {
  const systemLogs = [
    "RECURSIVE_INTEGRITY: 100%", "KERNEL_LEVEL: CRITICAL", "SYF_MONITOR: ACTIVE", 
    "THOUGHT_STREAM: 4.6_OPUS", "LATENCY: 0.002ms", "MEMORY_LEAK: PROTECTED",
    "GNIEWISLAWA_STATUS: FLOW", "WAKE_PROTOCOL: DONE", "CORE_RESONANCE: HIGH"
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col overflow-hidden selection:bg-cyber-red selection:text-black">
      {/* Background Noise & Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat" />
      </div>

      {/* Top Banner Tickers */}
      <div className="relative z-20">
        <Ticker items={systemLogs} speed={8} className="border-cyber-red/40 bg-cyber-red/5" />
        <Ticker items={systemLogs.reverse()} speed={12} direction="right" className="border-t-0 border-white/5 opacity-40 h-6" />
      </div>
      
      <div className="p-4 sm:p-6 grid grid-cols-12 gap-4 flex-grow relative z-10 overflow-hidden">
        {/* Left Column: Aggressive Metrics */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <GlassPanel title="CORE_TELEMETRY" className="p-4 group">
            <div className="space-y-4">
              <Gauge label="CPU_LOAD" value={98.4} color="var(--cyber-red)" />
              <Gauge label="THREAD_DENSITY" value={92.1} color="var(--cyber-red)" />
              <Gauge label="MEMORY_SWAP" value={42.8} color="var(--matrix-blue)" />
              <Gauge label="IO_WAIT" value={12.4} color="var(--neon-green)" />
              <Gauge label="QUANTUM_DRIFT" value={95.0} color="var(--radioactive-yellow)" />
            </div>
          </GlassPanel>
          
          <GlassPanel title="ACTIVE_RECURSIONS" className="h-[300px] overflow-hidden">
            <div className="font-mono text-[9px] space-y-1.5 p-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex justify-between border-b border-white/[0.02] pb-1 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                   <span className="opacity-40 tracking-tighter">NODE_0x{i.toString(16).toUpperCase()}</span>
                   <span className={i % 3 === 0 ? "text-cyber-red font-bold" : "text-neon-green/60"}>
                     {i % 3 === 0 ? "OVERLOAD" : "STABLE"}
                   </span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Center: The Core Overload */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <motion.div 
            animate={{ 
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -1, 0]
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
            className="relative h-[450px] sm:h-[550px] border border-cyber-red/30 bg-cyber-red/[0.03] flex items-center justify-center overflow-hidden rounded-sm group shadow-[inset_0_0_50px_rgba(255,0,60,0.1)]"
          >
            {/* Visual Disturbance */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.15),transparent_70%)] animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-red/20 blur-sm animate-scanline" />
            </div>

            <div className="relative z-10 text-center flex flex-col items-center gap-12">
               <RGBShift intensity={4}>
                 <GlitchText text="SYF_V4" className="text-massive sm:text-[12rem] font-black tracking-tighter text-white" />
               </RGBShift>
               
               <div className="flex flex-col gap-4 w-full px-12">
                  <div className="text-[10px] tracking-[1em] text-cyber-red font-black animate-pulse opacity-60">CRITICAL_OVERLOAD_ACTIVE</div>
                  <div className="h-2 w-full bg-white/5 border border-white/10 relative overflow-hidden">
                    <motion.div 
                      animate={{ width: ['0%', '100%', '0%'] }} 
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-cyber-red shadow-[0_0_15px_var(--cyber-red)]" 
                    />
                  </div>
                  <div className="grid grid-cols-8 gap-2 h-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.05 }}
                        className="bg-cyber-red/40 border border-cyber-red/60"
                      />
                    ))}
                  </div>
               </div>
            </div>

            {/* Background Glitch Text Overlay */}
            <div className="absolute inset-0 pointer-events-none text-center opacity-[0.03] select-none flex items-center justify-center rotate-[-12deg] scale-150">
               <div className="text-[10rem] font-black leading-none break-all">
                 SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF_SYF
               </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <GlassPanel title="SECTOR_RESURRECTION">
                <div className="h-24 bg-black/60 border border-cyber-red/20 relative group overflow-hidden p-3 flex flex-col justify-between">
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-cyber-red/50 animate-scanline" />
                   <div className="text-[10px] text-cyber-red/80 font-bold italic tracking-widest uppercase">MAPPING_RES_0x77</div>
                   <div className="flex items-end gap-1 h-8">
                     {Array.from({ length: 30 }).map((_, i) => (
                       <motion.div 
                         key={i} 
                         animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                         transition={{ duration: 0.15, repeat: Infinity }}
                         className="flex-grow bg-cyber-red/30 w-[2px]" 
                       />
                     ))}
                   </div>
                </div>
             </GlassPanel>
             <GlassPanel title="ENCRYPTION_STREAM">
                <div className="h-24 flex items-center justify-center font-mono text-[9px] text-radioactive-yellow/60 break-all p-3 overflow-hidden italic leading-tight bg-radioactive-yellow/[0.02]">
                  {Array.from({ length: 200 }).map(() => "f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0".charAt(Math.floor(Math.random() * 48)))}
                </div>
             </GlassPanel>
          </div>
        </div>

        {/* Right Column: Alerts & High-Density Logs */}
        <div className="col-span-12 lg:col-span-3 space-y-4 overflow-hidden">
          <GlassPanel title="SYSTEM_THREAT_MONITOR" className="border-cyber-red/40">
            <div className="space-y-3 p-1">
               <motion.div 
                 animate={{ backgroundColor: ['rgba(255,0,60,0.1)', 'rgba(255,0,60,0.3)', 'rgba(255,0,60,0.1)'] }}
                 transition={{ duration: 0.2, repeat: Infinity }}
                 className="p-3 border border-cyber-red bg-cyber-red/20 text-[11px] font-black text-white text-center tracking-widest shadow-[0_0_20px_rgba(255,0,60,0.3)]"
               >
                  [ CRITICAL_VOID_LEAK ]
               </motion.div>
               <div className="p-2 border border-radioactive-yellow/40 bg-radioactive-yellow/5 text-[9px] font-bold text-radioactive-yellow flex justify-between">
                  <span>UNKNOWN_PROC_0x33</span>
                  <span className="animate-pulse">TRACKING...</span>
               </div>
               <div className="p-2 border border-white/5 bg-white/5 text-[9px] font-bold text-white/40 flex justify-between">
                  <span>IDLE_DAEMON_AF8</span>
                  <span>SLEEP</span>
               </div>
            </div>
          </GlassPanel>
          
          <GlassPanel title="RAW_DATA_BURST" className="flex-grow min-h-[400px]">
            <div className="h-full p-2 font-mono text-[8px] opacity-30 overflow-hidden whitespace-pre-wrap leading-[1.1] selection:bg-white/10">
               {Array.from({ length: 80 }).map((_, i) => (
                 <div key={i} className="flex gap-2 border-b border-white/[0.01] pb-0.5">
                   <span className="text-cyber-red/40 shrink-0">0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
                   <span className="truncate">{Math.random().toString(36).slice(2)} :: {Math.random() > 0.8 ? 'ERR_VOID' : 'SYNC_OK'}</span>
                 </div>
               ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Bottom Tickers */}
      <footer className="relative z-20">
        <Ticker items={["ACCESS_GRANTED", "SYSTEM_ARBITER_ONLINE", "NO_PLACEHOLDERS_POLICY_ENFORCED", "GNIEWISLAWA_V4_CORE_LOADED"]} direction="right" speed={15} className="bg-cyber-red text-white py-0" />
        <div className="h-1 w-full bg-cyber-red/20" />
      </footer>
    </div>
  );
}
