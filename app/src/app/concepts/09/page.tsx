'use client';

import React from 'react';
import { TerminalWindow } from '@/components/hud/TerminalWindow';
import { motion } from 'framer-motion';

export default function MinimalTerminalPage() {
  return (
    <div className="h-full flex flex-col p-6 sm:p-10 gap-6 sm:gap-10">
      {/* Stealth Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-6 sm:pb-10 gap-4 flex-shrink-0">
        <div className="space-y-2 sm:space-y-4">
           <h1 className="text-2xl sm:text-4xl font-light tracking-tighter leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
             MINIMAL_TERMINAL
           </h1>
           <div className="text-[8px] sm:text-[10px] tracking-[0.5em] text-white/40 uppercase font-bold">
             Version: 4.0.0_STABLE // Auth: Janowska, P.
           </div>
        </div>
        <div className="flex gap-8 sm:gap-20 text-right w-full sm:w-auto justify-between sm:justify-end">
           <div className="space-y-1">
              <div className="text-[8px] sm:text-[10px] text-white/40 mb-1 sm:mb-2 uppercase">Network_Load</div>
              <div className="text-lg sm:text-xl font-light text-neon-blue">0.05ms</div>
           </div>
           <div className="space-y-1">
              <div className="text-[8px] sm:text-[10px] text-white/40 mb-1 sm:mb-2 uppercase">System_Integrity</div>
              <div className="text-lg sm:text-xl font-light text-neon-green">100%</div>
           </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-10 overflow-hidden flex-grow">
        <div className="lg:col-span-1 flex flex-col gap-6 sm:gap-10 overflow-hidden">
           <div className="flex-shrink-0">
             <TerminalWindow title="CORE_READOUT">
                <div className="space-y-3 sm:space-y-4">
                   {[
                      { l: 'CPU', v: '04%', c: 'text-neon-blue' },
                      { l: 'GPU', v: '12%', c: 'text-white' },
                      { l: 'MEM', v: '3.2GB', c: 'text-white' },
                      { l: 'TMP', v: '32°C', c: 'text-neon-yellow' },
                   ].map((d) => (
                      <div key={d.l} className="flex justify-between items-center text-[10px] sm:text-xs">
                         <span className="opacity-40 uppercase font-bold">{d.l}</span>
                         <span className={`font-bold ${d.c}`}>{d.v}</span>
                      </div>
                   ))}
                   <div className="h-0.5 sm:h-1 bg-white/5 w-full mt-4 sm:mt-6 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="h-full bg-white shadow-[0_0_10px_white]" />
                   </div>
                </div>
             </TerminalWindow>
           </div>
           
           <div className="border border-white/10 p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white/[0.02] flex-grow">
              <div className="text-[8px] sm:text-[10px] text-white/40 tracking-widest italic uppercase font-black"># Security Protocol</div>
              <p className="text-[10px] sm:text-xs leading-relaxed opacity-60 font-medium">
                End-to-end encryption is active. Signal purity confirmed. <span className="text-neon-blue">VOID_SYNC</span> initialized.
              </p>
              <motion.div 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
                className="w-full py-2 border border-white/20 flex items-center justify-center text-[8px] sm:text-[10px] font-black tracking-widest transition-all cursor-pointer uppercase"
              >
                Regenerate_Protocol
              </motion.div>
           </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6 sm:gap-10 overflow-hidden">
           <div className="flex-grow overflow-hidden">
             <TerminalWindow title="SYS_LOG">
                <div className="space-y-1 sm:space-y-2 opacity-80 text-[10px] sm:text-xs">
                   <div className="flex gap-2">
                     <span className="opacity-30 tracking-tighter">[13:45:12]</span>
                     <span>Initializing Antigravity core... <span className="text-neon-green font-bold underline">OK</span></span>
                   </div>
                   <div className="flex gap-2">
                     <span className="opacity-30 tracking-tighter">[13:45:13]</span>
                     <span>Loading design tokens: <span className="text-neon-blue">[STEALTH, MINIMAL, PHANTOM]</span></span>
                   </div>
                   <div className="flex gap-2">
                     <span className="opacity-30 tracking-tighter">[13:45:14]</span>
                     <span>Establishing neural bridge... <span className="text-neon-blue font-bold tracking-widest">CONNECTED</span></span>
                   </div>
                   <div className="flex gap-2">
                     <span className="opacity-30 tracking-tighter">[13:45:15]</span>
                     <span className="text-neon-yellow">Warning: Aesthetic dominance approaching threshold.</span>
                   </div>
                   <div className="flex gap-2">
                     <span className="opacity-30 tracking-tighter">[13:45:16]</span>
                     <span>Rectifying alignment in sector 7G... <span className="text-white font-bold underline">DONE</span></span>
                   </div>
                   
                   <div className="pt-4 border-t border-white/5 mt-4 opacity-40 italic grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="truncate">0x{Math.random().toString(16).substring(2, 8).toUpperCase()} ... VOID_PACKET</div>
                      ))}
                   </div>
                   
                   <div className="flex gap-2 items-center mt-6">
                      <span className="text-white/40 selection:bg-neon-green">{">"}</span>
                      <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-2 h-4 bg-white shadow-[0_0_10px_white]" />
                   </div>
                </div>
             </TerminalWindow>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 flex-shrink-0 border-t border-white/10 pt-6">
              <div className="flex flex-col gap-2 sm:gap-4">
                 <div className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.4em] uppercase font-black italic">Diagnostic_Frequencies</div>
                 <div className="h-12 sm:h-20 flex items-end gap-0.5 sm:gap-1 pb-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: '10%' }}
                        animate={{ height: `${20 + Math.random() * 80}%` }}
                        transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                        className="bg-white/10 w-full hover:bg-neon-blue transition-colors" 
                      />
                    ))}
                 </div>
              </div>
              <div className="flex flex-col justify-center gap-2 sm:gap-4 text-right">
                 <div className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.4em] uppercase font-black italic">System_Uptime</div>
                 <div className="text-3xl sm:text-5xl font-extralight tracking-tighter text-white/90">
                   14d <span className="opacity-30">:</span> 03h <span className="opacity-30">:</span> 22m
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Stealth Footer */}
      <footer className="pt-4 sm:pt-6 border-t border-white/5 flex justify-between items-center text-[8px] sm:text-[10px] text-white/20 uppercase tracking-[0.4em] flex-shrink-0">
        <span className="hover:text-white transition-colors cursor-default select-none">Antydizajn // SYF_V4</span>
        <span className="text-white/40 font-black animate-pulse">Ready to expand</span>
        <span className="hover:text-white transition-colors cursor-default select-none">Void-01</span>
      </footer>

      <style jsx global>{`
        body {
          background-color: #050505 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
