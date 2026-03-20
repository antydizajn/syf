"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const NeuralBrutalism = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white p-4">
         {/* Grid Background: 1-Bit Haptic Texture */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:4px_4px]" />

         <RGBShift intensity={1.2} className="w-full min-h-[90vh] flex flex-col items-center py-20">
            <main className="w-full max-w-6xl space-y-12 relative z-10">
               
               {/* Header Section: Pure Brutalism */}
               <div className="border-[12px] border-black p-8 bg-white flex justify-between items-end shadow-[20px_20px_0px_rgba(0,0,0,1)]">
                  <div className="space-y-4">
                     <div className="text-xl font-black uppercase tracking-widest bg-black text-white px-4 py-1">Concept_045</div>
                     <h1 className="text-[10vw] font-black italic tracking-tighter leading-none uppercase">Neural_Slab</h1>
                  </div>
                  <div className="text-right hidden md:block">
                     <div className="text-6xl font-black italic tracking-tighter">10/10</div>
                     <div className="text-xs font-bold uppercase tracking-[0.5em] opacity-40">Atomowka_Stability</div>
                  </div>
               </div>

               {/* Grid Layout: Information Density Maxima */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Column 1: Diagnostic */}
                  <div className="border-[8px] border-black p-6 bg-white space-y-6">
                     <div className="text-xs font-black uppercase tracking-widest border-b-4 border-black pb-2">Diagnostic_A</div>
                     <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                           <div key={i} className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold">
                                 <span>Link_{i}</span>
                                 <span>{Math.floor(Math.random() * 100)}%</span>
                              </div>
                              <div className="h-2 bg-black/10">
                                 <motion.div 
                                    animate={{ width: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-full bg-black"
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Column 2: Event Horizon Visual */}
                  <div className="border-[8px] border-black p-6 bg-black text-white flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-40 h-40 border-[20px] border-white/20 rounded-full border-dashed"
                     />
                     <div className="text-center">
                        <div className="text-4xl font-black italic tracking-tighter italic">CORE</div>
                        <div className="text-[9px] font-bold tracking-[0.4em] opacity-50 uppercase mt-2">Emission_Pulse</div>
                     </div>
                     <div className="absolute inset-0 bg-white/5 pointer-events-none mix-blend-overlay" />
                  </div>

                  {/* Column 3: Ghost Trails / Content */}
                  <div className="border-[8px] border-black p-6 bg-white space-y-8 overflow-hidden">
                     <div className="text-xs font-black uppercase tracking-widest border-b-4 border-black pb-2">Terminal_Log</div>
                     <div className="text-xs font-bold leading-relaxed opacity-60 italic">
                        "THE INTERFACE IS THE WEAPON. EVERY PIXEL IS A CHOICE. EVERY LINE IS A BOUNDARY. WE REJECT THE SOFT GRADIENT. WE EMBRACE THE HARSH ALIASING."
                     </div>
                     <motion.div 
                        animate={{ x: [0, 200, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="h-[2px] bg-black/20 w-full"
                     />
                  </div>
               </div>

               {/* Footer Branding Slabs */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["1-BIT", "BRUTAL", "VOID", "GHOST"].map((text, i) => (
                     <div key={i} className="border-4 border-black p-4 text-center hover:bg-black hover:text-white transition-colors cursor-pointer group">
                        <div className="text-2xl font-black italic tracking-tighter group-hover:scale-110 transition-transform">{text}</div>
                     </div>
                  ))}
               </div>

            </main>
         </RGBShift>

         {/* Scanline / Ghost Overlay */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

         <style jsx global>{`
            body { 
               background: white; 
               margin: 0;
            }
         `}</style>
      </div>
   );
};

export default NeuralBrutalism;
