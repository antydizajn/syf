"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DitherFilter } from "@/components/hud/DitherFilter";

const GrainCore = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white overflow-hidden flex items-center justify-center">
      <DitherFilter />
      
      {/* 1-Bit Noise (Base) */}
      <div className="fixed inset-0 pointer-events-none bg-[url('/noise.png')] opacity-10 mix-blend-multiply brightness-50 contrast-[200%]" />

      {/* Main Core: The Dithered Mass */}
      <div className="relative w-[30vw] h-[30vw]">
         {/* Orbitals */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="absolute inset-[-10%] border-[4px] border-black rounded-full border-dashed opacity-20"
         />
         <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
           className="absolute inset-[-20%] border border-black rounded-full opacity-10"
         />

         {/* Central Sphere: The Grain Core */}
         <motion.div 
           animate={{ 
             scale: [1, 1.05, 1],
             rotate: [0, 5, -5, 0]
           }}
           transition={{ 
             duration: 0.1, 
             repeat: Infinity,
             scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
           }}
           className="w-full h-full bg-black rounded-full shadow-[0_0_100px_rgba(0,0,0,0.1)] flex items-center justify-center relative overflow-hidden"
         >
            {/* Inner Glitch Surface */}
            <div className="absolute inset-0 bg-[size:4px_4px] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] opacity-40 mix-blend-difference" />
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-20 bg-white/20 skew-x-12"
            />
            
            <div className="text-white text-9xl font-black italic tracking-tighter mix-blend-difference z-10">CORE</div>
         </motion.div>

         {/* Dynamic Telemetry callouts */}
         {[
           { angle: 0, text: "X: 42.09", sub: "STABLE" },
           { angle: 120, text: "Y: 11.23", sub: "SYNCING" },
           { angle: 240, text: "Z: 99.11", sub: "OVERFLOW" }
         ].map((t, i) => (
            <motion.div
               key={i}
               className="absolute"
               style={{ 
                 top: "50%", 
                 left: "50%", 
                 transform: `rotate(${t.angle}deg) translate(20vw) rotate(-${t.angle}deg)` 
               }}
            >
               <div className="flex flex-col gap-2 p-4 border-l-4 border-black bg-white shadow-xl">
                  <div className="text-2xl font-black tabular-nums">{t.text}</div>
                  <div className="text-[9px] font-bold tracking-widest bg-black text-white px-1 self-start uppercase">
                     {t.sub}
                  </div>
               </div>
            </motion.div>
         ))}
      </div>

      {/* Editorial Navigation */}
      <div className="absolute top-12 left-12 right-12 flex justify-between items-start">
         <div className="space-y-4">
            <div className="text-4xl font-black leading-none border-b-8 border-black pb-2">
               GRAIN_CORE.029
            </div>
            <div className="text-[10px] space-y-1">
               <div className="flex gap-2"><span className="opacity-40 uppercase">Class:</span> <b>VOID_ENTITY</b></div>
               <div className="flex gap-2"><span className="opacity-40 uppercase">Status:</span> <b>CRITICAL_THINKING</b></div>
            </div>
         </div>

         <div className="flex gap-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`w-1 h-32 bg-black opacity-${Math.max(5, (20 - i) * 5)}`} />
            ))}
         </div>
      </div>

      <div className="absolute bottom-12 left-12 flex gap-8 items-end">
         <div className="text-[12rem] font-black leading-[0.7] opacity-5 tracking-tighter select-none">
            30/10
         </div>
         <div className="bg-black text-white p-4 font-bold text-xs uppercase tracking-[1em]">
            SYSTEM_ACTIVE
         </div>
      </div>
    </div>
  );
};

export default GrainCore;
