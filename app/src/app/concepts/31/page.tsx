"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DitherFilter } from "@/components/hud/DitherFilter";

const LinearScan = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white overflow-hidden p-24">
      <DitherFilter />
      
      {/* 1-Bit Sharp Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[url('/noise.png')] mix-blend-multiply brightness-75 contrast-150" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
         {/* Massive Scan Region */}
         <div className="relative w-full border-y-8 border-black py-24 group overflow-hidden">
            {/* The Scanning Bar */}
            <motion.div 
               animate={{ y: ["-100%", "100%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-x-0 h-40 bg-black mix-blend-difference z-20 flex flex-col justify-between"
            >
               <div className="h-1 bg-white" />
               <div className="flex justify-between px-12 text-white text-[8px] font-bold uppercase tracking-[2em]">
                  SCANNING_SYNC_LOCAL
               </div>
               <div className="h-1 bg-white" />
            </motion.div>

            {/* Content Revealed by Scan (via mix-blend-difference) */}
            <div className="flex flex-col items-center gap-8 py-12">
               <div className="text-[12rem] font-black leading-none tracking-tighter mix-blend-difference">
                  LINEAR.
               </div>
               <div className="flex gap-24">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 items-center">
                       <div className="text-6xl font-black tabular-nums">{Math.floor(Math.random() * 9999)}</div>
                       <div className="text-[10px] opacity-40 uppercase tracking-widest font-bold">BLOCK_{i.toString().padStart(2, '0')}</div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Grid Data Sub-layer */}
         <div className="mt-24 grid grid-cols-6 gap-8 w-full border-t border-black/10 pt-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                 <div className="text-[8px] font-bold bg-black text-white p-1 inline-block uppercase">DTA_{i}</div>
                 <div className="space-y-1">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-1 bg-black/5 relative overflow-hidden">
                         <motion.div 
                           initial={{ x: "-100%" }}
                           animate={{ x: "0%" }}
                           transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                           className="absolute inset-0 bg-black/20 w-1/3"
                         />
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </main>

      {/* Footer Branding */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end border-t border-black pt-8">
         <div className="space-y-1">
            <div className="text-4xl font-black italic">CONCEPT_31</div>
            <div className="text-[8px] opacity-40 uppercase">Direction: 1-Bit Brutalism // End of Cycle</div>
         </div>
         <div className="text-right space-y-2">
            <div className="flex gap-2 justify-end">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="w-4 h-4 bg-black" />
               ))}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.5em]">SYF_V5_PROTO</div>
         </div>
      </div>
    </div>
  );
};

export default LinearScan;
