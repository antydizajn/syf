"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const BinaryHorizon = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-[#000105] text-white font-mono selection:bg-white selection:text-black overflow-hidden flex items-center justify-center p-12">
         {/* 1-Bit ASCII Background Layer */}
         <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none select-none text-[8px] overflow-hidden leading-none break-all p-4">
            {Array.from({ length: 100 }).map((_, i) => (
               <div key={i} className="mb-1">
                  {Math.random() > 0.5 ? "10101011110001010101010111" : "00101010101110001010101010"}
               </div>
            ))}
         </div>

         <RGBShift intensity={2.0} className="w-full h-full relative z-10 flex items-center justify-center">
            
            {/* Brutalist Frame Layout */}
            <div className="absolute inset-12 border-[24px] border-white/5 pointer-events-none z-50 mix-blend-difference" />
            
            <main className="relative z-20 flex flex-col items-center gap-12">
               
               {/* The Singularity: Event Horizon + Ghost */}
               <div className="relative w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]">
                  {/* Rotating Accretion Disks (Brutalism + 1-Bit) */}
                  {[0, 1, 2].map((i) => (
                     <motion.div 
                        key={i}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-[-${i * 10}%] border-[8px] border-white/20 rounded-full border-dashed p-4`}
                     />
                  ))}

                  {/* Core Particle: Event Horizon */}
                  <motion.div 
                     animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8]
                     }}
                     transition={{ duration: 0.1, repeat: Infinity }}
                     className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.2)] overflow-hidden"
                  >
                     <div className="text-[12vw] font-black italic tracking-tighter text-black mix-blend-difference select-none">
                        44
                     </div>
                  </motion.div>

                  {/* Ghost Trails: Radial Data */}
                  {[...Array(8)].map((_, i) => (
                     <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-[2px] h-[30vw] bg-white/20 origin-bottom"
                        style={{ rotate: i * 45 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                     />
                  ))}
               </div>

               {/* Branding & Metadata */}
               <div className="text-center space-y-4">
                  <div className="inline-block border-l-8 border-white pl-4 text-left">
                     <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Binary_Horizon</h2>
                     <p className="text-[10px] font-bold tracking-[0.5em] opacity-40 mt-1 uppercase">Extraction_Successful // 10_ATOMOWKA</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-8 pt-8">
                     <div className="space-y-1">
                        <div className="text-[8px] uppercase font-bold opacity-30">Latency</div>
                        <div className="text-2xl font-black italic">0.1ms</div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[8px] uppercase font-bold opacity-30">Uptime</div>
                        <div className="text-2xl font-black italic">99.9%</div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[8px] uppercase font-bold opacity-30">Purity</div>
                        <div className="text-2xl font-black italic">1.00</div>
                     </div>
                  </div>
               </div>

            </main>
         </RGBShift>

         {/* Ghost Layer: Scanlines */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

         <style jsx global>{`
            body { 
               background: #000105; 
               margin: 0;
            }
         `}</style>
      </div>
   );
};

export default BinaryHorizon;
