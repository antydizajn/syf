"use client";

import React from "react";
import { motion } from "framer-motion";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import GlitchText from "@/components/hud/GlitchText";
import RGBShift from "@/components/hud/RGBShift";

const DitheredGradient = ({ className = "" }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-cyan-500/20" />
    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
  </div>
);

export default function Concept16() {
  return (
    <main className="relative min-h-screen bg-[#0a001a] text-white overflow-hidden font-mono select-none">
      <DitheredGradient className="absolute inset-0 z-0" />
      <ScanlineOverlay opacity={0.2} color="#ec4899" />
      <div className="fixed top-4 left-4 text-[10px] opacity-40 uppercase tracking-widest">
         <RGBShift>
           <span>System // ISO_CHROME_v2</span>
         </RGBShift>
      </div>

      <div className="relative z-10 p-6 h-screen flex flex-col pointer-events-none">
        {/* ISO HUD HEADER */}
        <div className="flex justify-between items-end mb-16 border-b-2 border-pink-500/50 pb-4">
           <div className="flex gap-4 items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-cyan-400 p-[2px]">
                 <div className="w-full h-full bg-[#0a001a] flex items-center justify-center font-black text-4xl italic text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-cyan-300">
                    ISO
                 </div>
              </div>
              <div className="space-y-1">
                 <GlitchText text="CHROME_v16" className="text-5xl font-black italic uppercase tracking-tighter text-pink-500" />
                 <div className="text-[10px] font-bold tracking-[0.6em] opacity-70">16-BIT_ISOMETRIC_RENDER_ENGINE</div>
              </div>
           </div>
           
           <div className="flex gap-8 items-center bg-black/40 backdrop-blur-md p-4 border border-cyan-400/30">
              <div className="text-right">
                 <div className="text-[8px] font-bold opacity-60">BIT_DEPTH</div>
                 <div className="text-2xl font-black text-cyan-400">16-BIT</div>
              </div>
              <div className="text-right">
                 <div className="text-[8px] font-bold opacity-60">DITHER_LVL</div>
                 <div className="text-2xl font-black text-pink-500">MAX</div>
              </div>
           </div>
        </div>

        {/* MAIN ISO GRID WORLD */}
        <div className="flex-1 relative flex items-center justify-center">
           <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
              <div className="grid grid-cols-6 grid-rows-6 gap-8 rotate-x-[35deg] rotate-z-[45deg] scale-110" style={{ transformStyle: "preserve-3d" }}>
                 {Array.from({ length: 36 }).map((_, i) => (
                   <motion.div 
                     key={i} 
                     className={`w-16 h-16 border-2 border-cyan-500/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] flex items-center justify-center ${i % 7 === 0 ? "border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]" : ""}`}
                     animate={{ 
                       translateZ: i % 7 === 0 ? [0, 40, 0] : 0,
                       opacity: [0.3, 0.6, 0.3]
                     }}
                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                   >
                      {i % 7 === 0 && <div className="text-[8px] font-black text-pink-500 -rotate-z-[45deg] scale-150">#0{i}</div>}
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* OVERLAY TELEMETRY */}
           <div className="absolute inset-0 z-20 flex justify-between items-center px-12 pointer-events-none">
              <div className="w-64 space-y-8">
                 <div className="bg-pink-500/10 border-l-4 border-pink-500 p-4 space-y-4">
                    <div className="text-xs font-black uppercase">Node_Statistics</div>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         ["FPS", "60.0"],
                         ["VRAM", "1.2G"],
                         ["SYNC", "ACT"],
                         ["ISO", "L1"]
                       ].map(([label, val], idx) => (
                         <div key={idx} className="flex flex-col">
                            <span className="text-[8px] opacity-60">{label}</span>
                            <span className="text-lg font-black text-pink-400">{val}</span>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="border border-cyan-400/30 p-4 bg-black/60 relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                       <div className="text-[10px] font-black uppercase">Mission_Log</div>
                       <div className="text-[9px] opacity-70 leading-tight">
                         ISO_CORE: LOADED<br/>
                         RENDER_MODE: HYBRID<br/>
                         PALETTE: NEON_VOID<br/>
                         BUFFER_STATE: 99%
                       </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-cyan-400 opacity-20" />
                 </div>
              </div>

              <div className="w-64 flex flex-col items-end gap-8">
                 <div className="w-48 h-48 relative flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-cyan-400/20 rotate-45" />
                    <div className="absolute inset-4 border-2 border-pink-500/30 -rotate-45" />
                    <motion.div 
                      className="text-4xl font-black bg-white text-black px-2 skew-x-[-12deg]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                    >
                      SYNC
                    </motion.div>
                 </div>
                 <div className="w-full h-32 bg-cyan-400/5 border border-cyan-400 flex flex-col p-4 justify-between pointer-events-auto cursor-pointer group">
                    <div className="text-[8px] font-black uppercase group-hover:text-cyan-300">Command_Queue</div>
                    <div className="flex-1 flex flex-col justify-around">
                       {["INITIALIZE", "ALLOCATE", "EXECUTE"].map((t, i) => (
                         <div key={i} className="flex justify-between items-center">
                            <span className="text-[10px] font-bold">{t}</span>
                            <div className="w-8 h-px bg-cyan-400/40" />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* HUD FOOTER BOXES */}
        <div className="mt-auto flex gap-6 h-20">
           {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className={`flex-1 border p-2 flex flex-col justify-between ${i % 2 === 0 ? "border-pink-500 bg-pink-500/5" : "border-cyan-400 bg-cyan-400/5"}`}>
                <div className="text-[8px] font-black opacity-50">REG_{i.toString(16).toUpperCase()}</div>
                <div className={`text-xl font-black italic ${i % 2 === 0 ? "text-pink-400" : "text-cyan-300"}`}>{(Math.random() * 100).toFixed(0)}</div>
                <div className="w-full h-1 bg-white/10">
                   <div className={`h-full ${i % 2 === 0 ? "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" : "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"}`} style={{ width: `${Math.random() * 100}%` }} />
                </div>
             </div>
           ))}
        </div>
      </div>
    </main>
  );
}
