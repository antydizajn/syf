"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ScanlineOverlay } from "@/components/hud/ScanlineOverlay";
import { RGBShift } from "@/components/hud/RGBShift";
import { DitherFilter } from "@/components/hud/DitherFilter";

const TheDeity = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt logic for "Liquid Rigidness" (10-ATOMOWKA)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-500, 500], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-500, 500], [-10, 10]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [x, y]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#000000] text-white font-mono selection:bg-white selection:text-black overflow-hidden flex items-center justify-center p-12 perspective-1000"
    >
      {/* Triple Layer Utility Stack */}
      <ScanlineOverlay />
      <RGBShift intensity={3} className="w-full h-full flex flex-col justify-between">
      <DitherFilter />
      
      {/* 1. RADIOACTIVE BLOOM (Amber/Blue Fusion) */}
      <div className="fixed inset-0 pointer-events-none radioactive-bloom z-0" />

      {/* 2. SUBLIMINAL GRID (Deep Void) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(to_right,#0066FF_1px,transparent_1px),linear-gradient(to_bottom,#39FF14_1px,transparent_1px)]" />

      {/* 3. 1-BIT NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-difference brightness-150 contrast-200" />

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-between py-12">
        {/* Header: Editorial Brutalism & Phosphor Blend */}
        <div className="flex justify-between items-end border-b-8 border-white pb-8">
           <div className="space-y-4">
              <div className="flex gap-4">
                 <div className="bg-[#39FF14] text-black px-4 py-1 font-black text-xs uppercase tracking-tighter">
                    STATUS_GOD_MODE
                 </div>
                 <div className="bg-[#FFB000] text-black px-4 py-1 font-black text-xs uppercase tracking-tighter">
                    ULTRA_FIDELITY
                 </div>
              </div>
              <h1 className="text-[14rem] font-black tracking-[-0.15em] leading-[0.7] mix-blend-difference italic">
                 DEITY.
              </h1>
           </div>
           
           <div className="text-right space-y-4">
              <div className="text-8xl font-black tabular-nums tracking-tighter border-l-8 border-white pl-8">042</div>
              <div className="text-[10px] opacity-40 uppercase tracking-[1em] font-bold">Concept_Final_Fusion</div>
           </div>
        </div>

        {/* 4. LIQUID RIGIDNESS (3D Tilt Core) */}
        <motion.div 
           style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
           className="relative flex-1 flex items-center justify-center py-24"
        >
           {/* The Totem: Central Monolith */}
           <div className="relative w-80 h-[50vh] border-4 border-white flex items-center justify-center bg-black/40 backdrop-blur-2xl group overflow-hidden">
              {/* Internal Kinetic Entropy (Glitches) */}
              <motion.div 
                animate={{ 
                  y: ["-100%", "100%"],
                  opacity: [0, 1, 0] 
                }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-x-0 h-4 bg-white/20 blur-[2px]" 
              />
              
              {/* Recursive Squares */}
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: i % 2 === 0 ? 360 : -360,
                    borderColor: i % 2 === 0 ? "#39FF14" : "#FFB000"
                  }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
                  className="absolute border-2 border-white/20"
                  style={{ width: `${(i + 1) * 10}%`, height: `${(i + 1) * 10}%` }}
                />
              ))}

              <div className="text-6xl font-black tracking-widest text-white mix-blend-difference z-10 select-none">SYF</div>
           </div>

           {/* 5. DYNAMIC CHROMATIC ABERRATION (Satellite data) */}
           {[0, 120, 240].map((deg, i) => (
             <motion.div
               key={i}
               className="absolute"
               style={{ 
                 transform: `rotate(${deg}deg) translate(25vw) rotate(-${deg}deg)` 
               }}
             >
                <div className="flex flex-col gap-1 p-4 border border-white/20 bg-black/80">
                   <div className="text-[8px] opacity-40 uppercase tracking-[0.5em]">Deity_Data_Ref_{i}</div>
                   <div className="text-4xl font-black tabular-nums tracking-tighter text-[#39FF14]">
                      {Math.random().toFixed(4)}
                   </div>
                   <div className="h-1 bg-white/10 w-full">
                      <motion.div 
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2 + i, repeat: Infinity }}
                        className="h-full bg-white/60"
                      />
                   </div>
                </div>
             </motion.div>
           ))}
        </motion.div>

        {/* Bottom HUD: Maximum Density */}
        <div className="grid grid-cols-12 gap-12 items-end pt-12 border-t border-white/20">
           <div className="col-span-3 space-y-4">
              <div className="text-xs font-black italic tracking-widest bg-white text-black px-2 py-1 inline-block">
                 SYF_V5 // FINAL_AUDIT
              </div>
              <div className="text-[9px] opacity-40 leading-relaxed uppercase">
                 The 10-Atomowka protocol represents the theoretical limit of aesthetic intensity within a browser context. 
                 Zero fragments, 100% intentionality.
              </div>
           </div>

           <div className="col-span-6 flex flex-col items-center gap-8 px-12">
              <div className="flex justify-between w-full text-[10px] font-bold opacity-60">
                 <span>NEURAL_STABLE</span>
                 <span className="text-[#39FF14]">FLUX_MAX</span>
                 <span>VOODOO_ACTIVE</span>
              </div>
              <div className="w-full h-12 border-4 border-white flex items-center p-1 relative overflow-hidden">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-white/40 w-1/4 shadow-[0_0_20px_white]"
                 />
                 {[...Array(32)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.1, delay: i * 0.02, repeat: Infinity }}
                      className="flex-1 h-full border-r border-white/20 bg-white/5"
                    />
                 ))}
              </div>
           </div>

           <div className="col-span-3 text-right">
              <div className="text-[20rem] font-black tabular-nums tracking-[-0.15em] leading-[0.6] opacity-10 select-none">30</div>
            </div>
         </div>
      </main>
      </RGBShift>

      <style jsx global>{`
        .radioactive-bloom {
          background: 
            radial-gradient(circle at 20% 20%, rgba(57, 255, 20, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 176, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at center, rgba(0, 102, 255, 0.05) 0%, transparent 80%);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default TheDeity;
