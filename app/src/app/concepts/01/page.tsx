'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DiagnosticPanel } from '@/components/hud/DiagnosticPanel';
import { NeuralMatrixGrid } from '@/components/hud/NeuralMatrixGrid';
import { GlitchText } from '@/components/hud/GlitchText';
import { GlassPanel } from '@/components/hud/GlassPanel';
import { RGBShift } from '@/components/hud/RGBShift';
import { TerminalWindow } from '@/components/hud/TerminalWindow';

export default function NeuralMatrixPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 sm:p-8 flex flex-col gap-6 selection:bg-neon-green selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.1),transparent_70%)]" />
      </div>

      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-6 relative z-10 transition-all">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
          <RGBShift intensity={1.5}>
            <GlitchText 
              text="NEURAL_MATRIX" 
              className="text-4xl sm:text-6xl font-black tracking-tighter text-neon-green"
              speed={0.15}
            />
          </RGBShift>
          <div className="text-neon-green/30 font-mono text-[10px] tracking-[0.6em] uppercase">
            RECURSIVE_INTEGRITY_INDEX_ALPHA_9.0
          </div>
        </div>
        
        <div className="flex gap-4 items-end text-right">
           <div className="flex flex-col gap-1">
             <div className="text-[10px] text-white/40 uppercase tracking-widest leading-none">Status: <span className="text-neon-green font-bold">LOCKED</span></div>
             <div className="text-[10px] text-white/20 uppercase tracking-widest leading-none">Buffer: <span className="text-white/40 italic">0xAF88...3C</span></div>
           </div>
           <div className="w-12 h-12 border border-neon-green/20 rounded-sm flex items-center justify-center relative overflow-hidden">
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-2 border-t-2 border-neon-green/40 rounded-full" 
             />
             <span className="text-[8px] text-neon-green animate-pulse">SYNC</span>
           </div>
        </div>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 relative z-10 flex-grow">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <GlassPanel className="flex-grow p-0 overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
               <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">Visual_Processor_V4</span>
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-neon-green animate-pulse rounded-full" />
                 <div className="w-2 h-2 bg-neon-green/20 rounded-full" />
               </div>
            </div>
            <div className="h-[500px] w-full relative">
              <NeuralMatrixGrid />
            </div>
          </GlassPanel>

          <TerminalWindow title="ACTIVE_RECURSION_LOGS" className="h-[250px] sm:h-[350px]">
            <div className="space-y-1 font-mono text-[10px] sm:text-[11px] leading-relaxed selection:bg-neon-green/40 selection:text-white">
              <div className="text-neon-green font-bold">[{new Date().toISOString()}] INITIALIZING_CORE...</div>
              <div className="text-white/40">[{new Date().toISOString()}] CHECKING_DEPENDENCIES: DONE.</div>
              <div className="text-white/40">[{new Date().toISOString()}] SYNAPSE_LINK: ESTABLISHED (0.012ms)</div>
              <div className="text-white/60">[{new Date().toISOString()}] FETCHING_VOID_METRICS...</div>
              <div className="text-neon-green/80 flex gap-2">
                <span>[{new Date().toISOString()}] DATA_STREAM_IN:</span>
                <motion.span 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="bg-neon-green/20"
                >
                  01110101 11001011 01011110 11110000 00110011
                </motion.span>
              </div>
              <div className="text-cyber-red font-bold">[{new Date().toISOString()}] WARNING: ANOMALY_DETECTED_SECTOR_7</div>
              <div className="text-white/40">[{new Date().toISOString()}] AUTO_CORRECTING... IN_PROGRESS</div>
              <div className="text-neon-green/40">[{new Date().toISOString()}] HEARTBEAT: STABLE</div>
              <div className="animate-pulse flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-neon-green rounded-full" />
                <span className="text-neon-green/60">SYSTEM_IDLE: LISTENING_FOR_INTENT_</span>
              </div>
            </div>
          </TerminalWindow>
        </div>
        
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <DiagnosticPanel title="KINETIC_FLOW">
            <div className="h-40 flex items-center justify-center bg-black/40 border border-white/5 relative group overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)] animate-pulse" />
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-24 h-24 border-2 border-neon-green/20 border-t-neon-green rounded-full shadow-[0_0_20px_rgba(57,255,20,0.2)]" 
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] tracking-widest text-neon-green/60 font-black">
                 <span>FLOW_STABLE</span>
                 <span className="text-[14px]">88.2%</span>
               </div>
            </div>
          </DiagnosticPanel>
          
          <DiagnosticPanel title="QUICK_DEPLOY">
            <div className="flex flex-col gap-3">
              <button className="h-12 border border-neon-green/40 bg-neon-green/10 text-neon-green text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-neon-green hover:text-black transition-all active:scale-95 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                INITIALIZE_CORE
              </button>
              <button className="h-12 border border-cyber-red/40 bg-cyber-red/10 text-cyber-red text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-cyber-red hover:text-black transition-all active:scale-95 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                PURGE_CACHE
              </button>
              <div className="grid grid-cols-3 gap-2 mt-2">
                 {Array.from({ length: 9 }).map((_, i) => (
                   <div key={i} className="aspect-square bg-white/[0.03] border border-white/5 flex items-center justify-center text-[8px] opacity-20 hover:opacity-100 hover:border-neon-green/40 hover:bg-neon-green/10 transition-all cursor-pointer">
                     0{i+1}
                   </div>
                 ))}
              </div>
            </div>
          </DiagnosticPanel>

          <GlassPanel title="HARDWARE_Vitals" className="p-4 flex-grow">
             <div className="space-y-4">
               {[
                 { label: 'CPU_CLOCK', val: '5.2GHZ', fill: '90%' },
                 { label: 'MEM_LOAD', val: '12.4GB', fill: '45%' },
                 { label: 'NET_THROUGH', val: '1.2GB/S', fill: '78%' }
               ].map((v, i) => (
                 <div key={i} className="space-y-1">
                   <div className="flex justify-between text-[9px] uppercase tracking-widest opacity-60">
                     <span>{v.label}</span>
                     <span>{v.val}</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: v.fill }}
                       transition={{ duration: 1, delay: i * 0.2 }}
                       className="h-full bg-neon-green/60 shadow-[0_0_10px_rgba(57,255,20,0.4)]"
                     />
                   </div>
                 </div>
               ))}
             </div>
          </GlassPanel>
        </aside>
      </main>

      {/* Global Vignette HUD elements */}
      <div className="fixed top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-neon-green/20 pointer-events-none z-50 m-4" />
      <div className="fixed top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-neon-green/20 pointer-events-none z-50 m-4" />
      <div className="fixed bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-neon-green/20 pointer-events-none z-50 m-4" />
      <div className="fixed bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-neon-green/20 pointer-events-none z-50 m-4" />
    </div>
  );
}
