"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const DecayCore = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white p-12 overflow-hidden flex flex-col justify-between">
         
         {/* Ghost Trails Layer */}
         <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
            <motion.div 
               animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-black rounded-full blur-[120px]"
            />
         </div>

         <RGBShift intensity={1.4} className="w-full h-full relative z-10">
            
            {/* Top Navigation: Brutalist */}
            <header className="flex justify-between items-start border-b-[20px] border-black pb-8">
               <div className="space-y-1">
                  <div className="text-8xl font-black italic tracking-tighter leading-none">047</div>
                  <div className="text-xs font-bold uppercase tracking-[1em] opacity-30">Decay_Core_v5</div>
               </div>
               <div className="text-right space-y-4">
                  <div className="bg-black text-white px-6 py-2 text-2xl font-black italic skew-x-[-15deg]">STATUS: CRITICAL</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Flux_Stability: 0.0003%</div>
               </div>
            </header>

            {/* Main Core Area: Event Horizon + Ghost */}
            <main className="flex-grow flex items-center justify-center relative">
               <div className="relative w-[35vw] h-[35vw] max-w-[450px] max-h-[450px]">
                  
                  {/* The Singularity */}
                  <div className="absolute inset-0 bg-black rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.4)]">
                     <motion.div 
                        animate={{ scale: [1, 1.1, 0.95, 1], rotate: [0, 90, -90, 0] }}
                        transition={{ duration: 0.15, repeat: Infinity }}
                        className="text-white text-9xl font-black italic tracking-tighter select-none z-10"
                     >
                        SYF
                     </motion.div>
                  </div>

                  {/* Orbits: Ghost Trails */}
                  {[...Array(12)].map((_, i) => (
                     <div 
                        key={i}
                        className="absolute inset-[-15%] pointer-events-none"
                        style={{ transform: `rotate(${i * 30}deg)` }}
                     >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                           <motion.circle
                              cx="50"
                              cy="50"
                              r="48"
                              fill="none"
                              stroke="black"
                              strokeWidth="0.2"
                              strokeOpacity="0.1"
                              strokeDasharray="2 4"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
                              style={{ originX: "50px", originY: "50px" }}
                           />
                        </svg>
                     </div>
                  ))}

                  {/* ASCII Particle Streams */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                     <div className="text-[8px] font-bold whitespace-pre">
                        {`
   .   . ( ) .
  ( ) .   .   ( )
 .   ( ) .   .
                        `}
                     </div>
                  </div>
               </div>

               {/* Side Information Panels: Grid Supremacy */}
               <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4 text-right">
                  {[...Array(4)].map((_, i) => (
                     <div key={i} className="border-r-[12px] border-black pr-6 py-2">
                        <div className="text-[10px] uppercase font-bold opacity-30">Channel_{i}</div>
                        <div className="text-2xl font-black italic">{(Math.random() * 10).toFixed(4)}</div>
                     </div>
                  ))}
               </div>
            </main>

            {/* Footer Metrics: 1-Bit */}
            <footer className="grid grid-cols-12 gap-12 items-end pt-12 border-t-[12px] border-black">
               <div className="col-span-4 text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">
                  Memory_Leak_Detected // Bit_Flip_Active
               </div>
               <div className="col-span-4 flex justify-center">
                  <div className="flex gap-1">
                     {[...Array(24)].map((_, i) => (
                        <motion.div 
                           key={i}
                           animate={{ height: [4, 16, 4] }}
                           transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
                           className="w-1 bg-black"
                        />
                     ))}
                  </div>
               </div>
               <div className="col-span-4 text-right">
                  <div className="text-4xl font-black italic italic tracking-tighter">30/10</div>
               </div>
            </footer>

         </RGBShift>

         <style jsx global>{`
            body { 
               background: white; 
               margin: 0;
            }
         `}</style>
      </div>
   );
};

export default DecayCore;
