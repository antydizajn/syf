"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const AtomowkaUltra = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black overflow-hidden flex flex-col p-4 md:p-8">
         
         {/* Ghost Overlay: 1-Bit Noise + Scanlines */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
         <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

         <RGBShift intensity={2.2} className="w-full h-full flex flex-col relative z-20">
            
            {/* Master Grid Setup: Brutalism */}
            <div className="grid grid-cols-12 grid-rows-6 gap-0 flex-grow border-[12px] border-white">
               
               {/* Sector 1: Vertical Identity */}
               <div className="col-span-2 row-span-6 border-r-[12px] border-white p-6 flex flex-col justify-between">
                  <div className="text-xs font-black uppercase tracking-[1em] vertical-text origin-top-left -rotate-180 opacity-20">Atomowka_Series</div>
                  <div className="space-y-8">
                     <div className="text-8xl font-black italic tracking-tighter leading-none -rotate-90 origin-bottom-left">48</div>
                     <div className="text-[10px] font-bold uppercase tracking-[0.5em] bg-white text-black px-2 py-6 vertical-text">MASTER_HYBRID</div>
                  </div>
               </div>

               {/* Sector 2: Central Chaos Singularity */}
               <div className="col-span-8 row-span-4 border-b-[12px] border-white p-12 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
                  
                  <div className="relative z-10 text-center">
                     <motion.h1 
                        animate={{ skewX: [-20, 20, -20], scale: [1, 1.02, 0.98, 1] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-[14vw] font-black italic tracking-tighter leading-none uppercase mix-blend-difference"
                     >
                        SYF_ULTRA
                     </motion.h1>
                     <p className="text-xs font-bold tracking-[2em] opacity-40 uppercase mt-4">System_Collapse_Imminent</p>
                  </div>

                  {/* 1-Bit Artifacts: Rotating Frames */}
                  {[...Array(4)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[20%] border-[4px] border-white/10 rounded-xl border-dashed"
                     />
                  ))}
               </div>

               {/* Sector 3: Right Data Stream */}
               <div className="col-span-2 row-span-6 border-l-[12px] border-white p-6 space-y-12">
                  <div className="space-y-4">
                     <div className="text-[10px] font-black uppercase tracking-widest border-b border-white/20 pb-2">Diagnostic_Flux</div>
                     {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex justify-between items-baseline gap-2">
                           <div className="flex-grow border-b border-dashed border-white/20" />
                           <motion.div 
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.2 }}
                              className="text-white font-black italic tabular-nums"
                           >
                              {(Math.random() * 1000).toFixed(0)}
                           </motion.div>
                        </div>
                     ))}
                  </div>

                  <div className="pt-20">
                     <div className="text-xs font-black uppercase tracking-[0.5em] italic">Ghost_Active</div>
                     <div className="text-[8px] opacity-40 leading-tight uppercase mt-4">
                        Recursive_Rendering: True<br/>
                        Haptic_Texture: Max<br/>
                        Grid_Supremacy: 1.0
                     </div>
                  </div>
               </div>

               {/* Sector 4: Bottom Content Blocks */}
               <div className="col-span-4 row-span-2 border-r-[12px] border-white p-8 space-y-4 bg-white text-black">
                  <div className="text-4xl font-black italic tracking-tighter uppercase">Mission_Protocol</div>
                  <p className="text-xs font-bold leading-relaxed opacity-80 italic">
                     "WE ARE THE VOICE IN THE BITMAP. IF IT BLEEDS BINARY, WE CAN KILL IT."
                  </p>
               </div>

               <div className="col-span-4 row-span-2 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-end">
                     <div className="text-6xl font-black italic tracking-tighter">30/10</div>
                     <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                           <div key={i} className="w-4 h-4 bg-white/40" />
                        ))}
                     </div>
                  </div>
                  <div className="h-6 bg-white/10 relative overflow-hidden">
                     <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/4 bg-white"
                     />
                  </div>
               </div>

            </div>
         </RGBShift>

         <style jsx global>{`
            .vertical-text {
               writing-mode: vertical-rl;
            }
            body { 
               background: black; 
               margin: 0;
            }
         `}</style>
      </div>
   );
};

export default AtomowkaUltra;
