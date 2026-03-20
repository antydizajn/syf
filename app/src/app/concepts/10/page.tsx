'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TheVoidPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white/50 font-mono p-4 flex flex-col justify-between overflow-hidden relative selection:bg-white/10 selection:text-white">
      {/* Central Breathing Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-[120vw] h-[120vw] rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.15)_0%,transparent_70%)] blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.08, 0.02]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute w-[100vw] h-[100vw] rounded-full bg-[radial-gradient(circle,rgba(255,0,60,0.1)_0%,transparent_60%)] blur-[150px]"
        />
      </div>

      {/* Extreme Corner Precision Telemetry */}
      <header className="flex justify-between items-start text-[10px] tracking-[0.8em] font-bold uppercase relative z-20">
        <div className="space-y-4">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-neon-green animate-pulse" />
             <span>{">"} SECTOR: VOID_00</span>
           </div>
           <div className="text-white/20 pl-4 border-l border-white/5">
             COORD: <span className="text-white/40">0.0, 0.0, 0.0</span>
           </div>
           <div className="text-[8px] tracking-[0.2em] text-white/10 pl-4">
             SIGNAL_STRENGTH: 99.9% [STABLE]
           </div>
        </div>
        <div className="text-right space-y-4">
           <div className="flex items-center justify-end gap-2 text-neon-green/80">
             <span>SYNC_STATE: BREATHING</span>
             <div className="w-1.5 h-1.5 border border-neon-green rounded-full shrink-0" />
           </div>
           <div className="text-white/20 pr-4 border-r border-white/5">
             EST_REMAIN_TIME: <span className="text-white/40">INFINITE</span>
           </div>
           <div className="text-[8px] tracking-[0.2em] text-white/10 pr-4">
             ENTROPY_LEVEL: 0.00000001
           </div>
        </div>
      </header>

      {/* Sparse Central Interaction */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 4, ease: "easeOut" }}
           className="text-center"
         >
            <h1 className="text-white text-6xl font-extralight tracking-[1.5em] uppercase mb-10 translate-x-[0.75em]">
              THE VOID
            </h1>
            <p className="max-w-xs text-sm italic tracking-widest leading-loose opacity-30">
               In the absence of everything, we find the core. Focus on the data that matters. Forget the noise.
            </p>
            <motion.div 
               whileHover={{ scale: 1.1, opacity: 1 }}
               className="mt-20 w-1 h-20 bg-gradient-to-b from-white to-transparent mx-auto opacity-20 transition-all cursor-pointer"
            />
         </motion.div>
      </main>

      {/* Bottom Technical Bar */}
      <footer className="flex justify-between items-end relative z-20">
         <div className="space-y-3">
            <div className="flex gap-4 items-center">
               <div className="w-1 h-1 bg-neon-green rounded-full animate-ping" />
               <span className="text-[10px] tracking-[0.5em] font-black uppercase text-white/40">Presence Detected</span>
            </div>
            <div className="h-[1px] w-64 bg-gradient-to-r from-neon-green/30 to-transparent" />
            <div className="text-[9px] text-white/10 italic tracking-widest font-light">
              01000111 01001110 01001001 01000101 01010111 01001011 01010011 01001100 01000001 01010111 01000001 
              <span className="ml-2 opacity-20">[SIGNATURE_ENCRYPTED]</span>
            </div>
         </div>
         
         <div className="text-right space-y-2">
            <div className="text-[10px] tracking-[0.6em] uppercase text-white/60">
              Architecture: <span className="text-neon-green/80">Quantum_v4.6.0</span>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="text-[8px] text-white/20 uppercase tracking-tighter">Diagnostic Overlay Active</div>
              <div className="text-[10px] tracking-[0.8em] uppercase text-white/20">Node_ID: #FF00X</div>
            </div>
         </div>
      </footer>

      {/* Ambient Dust Particles Placeholder */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-10">
         {Array.from({ length: 20 }).map((_, i) => (
           <motion.div 
             key={i}
             animate={{ 
               y: [Math.random() * -100, Math.random() * 100], 
               x: [Math.random() * -100, Math.random() * 100],
               opacity: [0, 1, 0] 
             }}
             transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
             className="absolute w-[1px] h-[1px] bg-white"
             style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
           />
         ))}
      </div>

      <style jsx global>{`
        body {
          background-color: #020202 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
