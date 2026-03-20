"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const VoidBitmap = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] font-mono selection:bg-[#FFFFFF] selection:text-black overflow-hidden flex items-center justify-center p-8">
         
         {/* 1-Bit Dither Texture Layer */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

         <RGBShift intensity={1.8} className="w-full max-w-7xl relative z-10 flex flex-col items-center">
            <main className="w-full flex flex-col gap-12">
               
               {/* Bitmapped Header */}
               <div className="border-t-8 border-b-8 border-white py-12 flex flex-col items-center gap-4 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-1 text-xs font-black uppercase tracking-[0.5em]">
                     V046 // RADAR_LOCK
                  </div>
                  <h1 className="text-[12vw] font-black italic tracking-tighter leading-none text-outline uppercase mix-blend-difference">
                     VO_D_MAP
                  </h1>
                  <motion.div 
                     animate={{ opacity: [0.2, 1, 0.2] }}
                     transition={{ duration: 0.1, repeat: Infinity }}
                     className="text-8xl font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                  >
                     I
                  </motion.div>
               </div>

               {/* Tactical Data Grid */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-4 border-white">
                  {[...Array(4)].map((_, i) => (
                     <div key={i} className={`p-8 border-white ${i < 3 ? "md:border-r-4" : ""} ${i > 0 && i < 4 ? "border-t-4 md:border-t-0" : ""} space-y-6 hover:bg-white hover:text-black transition-colors`}>
                        <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">Sector_0{i}</div>
                        <div className="text-5xl font-black italic tracking-tighter">00{i}A</div>
                        <div className="text-xs leading-relaxed font-bold opacity-60">
                           {i % 2 === 0 ? "Target acquisition confirmed. Monitoring event horizon stability." : "Background radiation spikes detected. 1-bit parity check complete."}
                        </div>
                     </div>
                  ))}
               </div>

               {/* Central Map Visualization (1-Bit + Event Horizon) */}
               <div className="relative w-full h-[40vh] border-[12px] border-white bg-white/5 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                  
                  {/* The Ghost Radar Pulse */}
                  <motion.div 
                     animate={{ scale: [0, 2], opacity: [0.5, 0] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                     className="w-[20vw] h-[20vw] border-4 border-white rounded-full"
                  />
                  
                  <div className="text-center z-10">
                     <div className="text-9xl font-black italic tracking-tighter -skew-x-12">SCAN</div>
                  </div>

                  {/* ASCII Artifacts at edges */}
                  <div className="absolute bottom-4 left-4 text-[8px] opacity-20 font-bold leading-none">
                     {`
+-------+
|  SYF  |
+-------+
                     `}
                  </div>
               </div>

            </main>
         </RGBShift>

         {/* Ghost Layer: Scanlines */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

         <style jsx global>{`
            .text-outline {
               -webkit-text-stroke: 2px white;
               color: transparent;
            }
            body { 
               background: #050505; 
               margin: 0;
            }
         `}</style>
      </div>
   );
};

export default VoidBitmap;
