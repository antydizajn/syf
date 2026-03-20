"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DitherFilter } from "@/components/hud/DitherFilter";

const VoidWhite = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white overflow-hidden p-24">
      <DitherFilter />
      
      {/* 1-Bit Sharp Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('/noise.png')] mix-blend-difference" />

      {/* Background Typography: Massive and Inverted */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
         <h1 className="text-[40vw] font-black tracking-[-0.2em] leading-none">VOID</h1>
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-[75vh]">
        {/* Top Label */}
        <div className="flex items-start gap-12">
           <div className="w-16 h-1 bg-black mt-4" />
           <div className="space-y-4">
              <div className="text-9xl font-black italic tracking-tighter leading-none">ABSENCE.</div>
              <div className="text-xs font-bold uppercase tracking-[1em] opacity-40">Concept_030 // Void_White</div>
           </div>
        </div>

        {/* Hover Reveal: Vantablack Dither */}
        <motion.div 
           className="fixed pointer-events-none z-50 w-[400px] h-[400px] bg-black mix-blend-difference rounded-full blur-[40px] opacity-100"
           animate={{ 
             x: mousePos.x - 200, 
             y: mousePos.y - 200,
             scale: [1, 0.9, 1.1, 1],
           }}
           transition={{ type: "spring", damping: 10, stiffness: 50 }}
        />

        {/* Bottom Section: Radical Technicality */}
        <div className="grid grid-cols-4 gap-24 items-end">
           <div className="col-span-1 space-y-4">
              <div className="text-[8px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1 inline-block">
                 COORDINATE_SYSTEM
              </div>
              <div className="text-2xl font-black tabular-nums">
                 {mousePos.x.toString().padStart(4, '0')} // {mousePos.y.toString().padStart(4, '0')}
              </div>
           </div>

           <div className="col-span-2 flex flex-col gap-1 border-l border-black/10 pl-12 h-40 justify-center">
              <div className="text-[10px] opacity-40 uppercase tracking-[0.5em] mb-4">Void_Properties</div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                   <div className="w-4 h-4 border border-black bg-black" />
                   <div className="flex-1 h-[2px] bg-black/5 overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
                        className="h-full bg-black/20 w-1/2"
                      />
                   </div>
                   <div className="text-[8px] font-bold">VAL_{Math.random().toString(36).substring(7).toUpperCase()}</div>
                </div>
              ))}
           </div>

           <div className="col-span-1 text-right">
              <div className="text-4xl font-black italic border-b-4 border-black inline-block">NO_SIGNAL</div>
              <div className="mt-4 text-[9px] opacity-40 leading-relaxed uppercase">
                 The absence of signal is a signal in itself. 1-Bit brutality mandates 100% density in 0% space.
              </div>
           </div>
        </div>
      </main>

      {/* Vertical Borders */}
      <div className="fixed top-0 bottom-0 left-12 w-[2px] bg-black/10" />
      <div className="fixed top-0 bottom-0 right-12 w-[2px] bg-black/10" />
      
      {/* Corner Data */}
      <div className="fixed top-4 left-4 text-[8px] opacity-40 font-bold uppercase tracking-widest">SYF_V5_RND</div>
      <div className="fixed bottom-4 right-4 text-[8px] opacity-40 font-bold uppercase tracking-widest">INTENSITY: 30/10</div>
    </div>
  );
};

export default VoidWhite;
