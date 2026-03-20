"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const SpectralGrid = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white overflow-hidden p-8 md:p-12">
         {/* Ghost Layer: Scanlines */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

         <RGBShift intensity={1.5} className="w-full h-full min-h-screen flex items-center justify-center">
            <main className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-0 border-[12px] border-black bg-white shadow-[20px_20px_0px_rgba(0,0,0,1)] relative z-10">
               
               {/* Left Column: Brutalist Index */}
               <div className="md:col-span-3 border-r-[12px] border-black p-6 space-y-12">
                  <div className="space-y-2">
                     <div className="text-xs font-black uppercase tracking-[0.3em] bg-black text-white px-2 py-1 inline-block">System_Status</div>
                     <div className="text-4xl font-black italic tracking-tighter uppercase leading-none">Active</div>
                  </div>

                  <div className="space-y-6">
                     {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center border-b-2 border-black/10 pb-2">
                           <span className="text-[10px] font-bold opacity-40 uppercase">Buffer_{i}</span>
                           <motion.span 
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                              className="text-xs font-black tabular-nums"
                           >
                              {Math.random().toString(16).substring(2, 8).toUpperCase()}
                           </motion.span>
                        </div>
                     ))}
                  </div>

                  <div className="pt-12 text-[8px] leading-tight font-bold uppercase opacity-30">
                     Extraction_Protocol_V5.0.1<br/>
                     Dithered_Output: Enabled<br/>
                     Ghost_Buffer: 1024KB
                  </div>
               </div>

               {/* Center Column: The Spectral Singularity */}
               <div className="md:col-span-6 p-12 flex flex-col items-center justify-center relative overflow-hidden group">
                  <motion.div 
                     animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, 0]
                     }}
                     transition={{ duration: 0.1, repeat: Infinity }}
                     className="text-[15vw] font-black italic tracking-tighter leading-none mix-blend-difference select-none"
                  >
                     SYF
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-black mix-blend-difference opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="mt-8 flex gap-4">
                     <div className="px-6 py-2 bg-black text-white font-black text-xl italic skew-x-[-12deg] hover:skew-x-0 transition-transform cursor-crosshair uppercase">
                        INIT
                     </div>
                     <div className="px-6 py-2 border-4 border-black font-black text-xl italic skew-x-[-12deg] hover:skew-x-0 transition-transform cursor-crosshair uppercase">
                        WIPE
                     </div>
                  </div>

                  {/* 1-Bit ASCII Decoration */}
                  <div className="absolute top-4 right-4 text-[10px] opacity-10 font-bold whitespace-pre">
                     {`
:::  :::
::::::::
:::  :::
                     `}
                  </div>
               </div>

               {/* Right Column: Event Metrics */}
               <div className="md:col-span-3 border-l-[12px] border-black p-6 flex flex-col justify-between bg-black text-white">
                  <div className="space-y-8">
                     <div className="text-[10px] font-bold uppercase tracking-[0.5em] border-b border-white/20 pb-4">Diagnostic_V043</div>
                     
                     <div className="space-y-2">
                        <div className="text-6xl font-black tabular-nums tracking-tighter italic">43</div>
                        <div className="h-4 bg-white/10 relative overflow-hidden">
                           <motion.div 
                              animate={{ left: ["-100%", "100%"] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute top-0 bottom-0 w-1/3 bg-white"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex gap-2">
                        {[...Array(8)].map((_, i) => (
                           <motion.div 
                              key={i}
                              animate={{ height: [10, 30, 10] }}
                              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                              className="w-2 bg-white/40"
                           />
                        ))}
                     </div>
                     <div className="text-[9px] font-black uppercase tracking-[0.2em] leading-tight">
                        Neural_Ghost_Active<br/>
                        RGB_Shift: Critical
                     </div>
                  </div>
               </div>
            </main>
         </RGBShift>

         {/* Bottom Branding */}
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-baseline gap-4 pointer-events-none mix-blend-difference z-20">
            <span className="text-8xl font-black italic tracking-tighter opacity-10">43</span>
            <span className="text-xs font-bold uppercase tracking-[1em] pb-4">10_ATOMOWKA</span>
         </div>

         <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@900&display=swap');
            body { 
               background: white; 
               margin: 0;
               -webkit-font-smoothing: none;
            }
         `}</style>
      </div>
   );
};

export default SpectralGrid;
