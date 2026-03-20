"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DitherFilter } from "@/components/hud/DitherFilter";

const BitmapVortex = () => {
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white overflow-hidden flex items-center justify-center p-24">
      <DitherFilter />
      
      {/* 1-Bit Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('/noise.png')] mix-blend-multiply brightness-75 contrast-150" />

      {/* Background Grid (Dithered) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" />

      <main className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Massive Vortex Reticle */}
        <div className="relative w-[35vw] h-[35vw] flex items-center justify-center">
           {[...Array(12)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ 
                 rotate: i % 2 === 0 ? 360 : -360,
                 scale: [1, 1.05, 1],
                 opacity: [0.1, 0.4, 0.1]
               }}
               transition={{ 
                 rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                 scale: { duration: 2, repeat: Infinity, delay: i * 0.1 },
                 opacity: { duration: 3, repeat: Infinity, delay: i * 0.2 }
               }}
               className={`absolute border border-black rounded-full`}
               style={{ 
                 width: `${(i + 1) * 8}%`, 
                 height: `${(i + 1) * 8}%`,
                 borderStyle: i % 3 === 0 ? "solid" : i % 3 === 1 ? "dashed" : "dotted"
               }}
             />
           ))}

           {/* Inner Core: Mathematical Dither */}
           <div className="w-1/4 h-1/4 relative border-4 border-black flex items-center justify-center bg-black overflow-hidden group">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="text-white text-6xl font-black italic tracking-tighter mix-blend-difference"
              >
                 VRTX
              </motion.div>
              
              {/* Glitch Overlay within core */}
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-x-0 h-2 bg-white/20 blur-[1px]" 
              />
           </div>

           {/* Rotating Data Markers */}
           {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <motion.div
                key={deg}
                initial={{ rotate: deg }}
                className="absolute inset-0 flex items-start justify-center"
              >
                  <div className="mt-[-40px] flex flex-col items-center gap-1">
                     <div className="w-1 h-8 bg-black" />
                     <div className="text-[8px] font-bold tracking-widest bg-black text-white px-1">
                        ANG: {deg}
                     </div>
                  </div>
              </motion.div>
           ))}
        </div>

        {/* Global Metadata Layer */}
        <div className="absolute top-0 right-0 p-12 text-right space-y-4">
           <div className="text-8xl font-black tracking-[-0.1em] opacity-10">028_SYF</div>
           <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em]">
              PROCEDURAL_DITHER_VORTEX_LOCK
           </div>
        </div>

        <div className="absolute bottom-0 left-0 p-12 space-y-8">
           <div className="flex gap-12 items-end">
              <div className="space-y-1">
                 <div className="text-[8px] opacity-40 uppercase">Vortex_Integrity</div>
                 <div className="h-1 w-64 bg-black/10">
                    <motion.div 
                      animate={{ width: ["100%", "40%", "100%"] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="h-full bg-black" 
                    />
                 </div>
              </div>
              <div className="text-4xl font-black tabular-nums tracking-tighter">
                 {rotation.toString().padStart(3, '0')}&deg;
              </div>
           </div>
        </div>
      </main>

      {/* Floating 1-Bit Geometric Tags */}
      <div className="fixed top-12 left-12 grid grid-cols-2 gap-2">
         {[...Array(4)].map((_, i) => (
           <div key={i} className="w-8 h-8 border-2 border-black flex items-center justify-center p-1">
              <div className={`w-full h-full bg-black ${i % 2 === 0 ? "scale-50" : "scale-100 opacity-20"}`} />
           </div>
         ))}
      </div>
    </div>
  );
};

export default BitmapVortex;
