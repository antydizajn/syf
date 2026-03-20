"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScanlineOverlay } from "@/components/hud/ScanlineOverlay";

import { RGBShift } from "@/components/hud/RGBShift";

const PhosphorGhost = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#080500] text-[#FFCC00] font-mono selection:bg-[#FFCC00] selection:text-black overflow-hidden flex items-center justify-center p-12">
      <RGBShift intensity={1.5} className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-center">
      {/* Heavy CRT Effects Layer */}
      <ScanlineOverlay />
      
      {/* Decaying Phosphor Glow Base */}
      <div className="fixed inset-0 pointer-events-none radial-ghost-glow opacity-30" />

        {/* The Ghosting Visuals */}
        <div className="relative w-full h-[60vh] flex items-center justify-center group">
           {/* Temporal Smear Layers */}
           {[...Array(6)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ 
                 x: [100, -100, 100],
                 opacity: [0.1 / (i + 1), 0.3 / (i + 1), 0.1 / (i + 1)],
                 filter: `blur(${i * 2}px)`
               }}
               transition={{ 
                 duration: 1 + i * 0.1, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="absolute text-[25vw] font-black italic tracking-tighter mix-blend-screen select-none pointer-events-none"
             >
                GHOST
             </motion.div>
           ))}

           {/* Sharp Core Layer */}
           <h1 className="text-[25vw] font-black italic tracking-tighter mix-blend-screen glow-text-amber relative z-10">
              GHOST
           </h1>

           {/* Technical Overlays (Decaying) */}
           <div className="absolute inset-0 flex flex-col items-start justify-end p-24">
              <div className="text-[10px] font-bold uppercase tracking-[1em] mb-4 bg-[#FFCC00] text-black px-2 py-1">
                 SIGNAL_DECAY_PROTOCOL
              </div>
              <div className="space-y-1">
                 {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.1 + i * 0.05, repeat: Infinity }}
                      className="text-[12px] tabular-nums"
                    >
                       &gt;&gt; PTR_ADDR: 0x{Math.random().toString(16).substring(2, 6).toUpperCase()} // DATA_LEAK
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>

        {/* Global Metadata Layer */}
        <div className="absolute top-12 left-12 grid grid-cols-2 gap-8 items-start">
           <div className="space-y-4">
              <div className="text-4xl font-black tabular-nums tracking-tighter underline decoration-2 underline-offset-4">034_SYF</div>
              <div className="text-[10px] opacity-40 uppercase tracking-[0.5em] font-bold">Temporal_Decay_v5.0.1</div>
           </div>
        </div>

        <div className="absolute bottom-12 right-12 text-right space-y-8">
           <div className="flex gap-4 items-end justify-end">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`w-8 h-8 border border-[#FFCC00] flex items-center justify-center p-1 opacity-${Math.max(10, 100 - i * 10)}`}>
                   <div className="w-full h-full bg-[#FFCC00]/20" />
                </div>
              ))}
           </div>
           <div className="text-xs font-black italic opacity-40 tracking-widest uppercase">
              10_ATOMOWKA_DENSITY_SYSTEM
           </div>
        </div>
      </RGBShift>

      <style jsx global>{`
        .radial-ghost-glow {
          background: radial-gradient(circle at center, #FFCC00 0%, transparent 70%);
        }
        .glow-text-amber {
          text-shadow: 0 0 30px #FFCC00;
        }
      `}</style>
    </div>
  );
};

export default PhosphorGhost;
