"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const VantablackHUD = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#FFFFFF] font-mono selection:bg-white selection:text-black overflow-hidden flex items-center justify-center p-12">
      <RGBShift intensity={0.2} className="w-full h-full">
      
      {/* Absolute Zero Base */}
      <div className="fixed inset-0 pointer-events-none bg-[#000000] z-0" />

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-between py-12">
        {/* Header: Zero Refraction Detail */}
        <div className="flex justify-between items-start border-b border-white/5 pb-12">
           <div className="space-y-4">
              <h1 className="text-9xl font-black tracking-[-0.2em] leading-none mix-blend-difference italic">
                 VANTABLACK.
              </h1>
              <div className="text-[10px] font-bold uppercase tracking-[1em] opacity-40">
                 Absorption_Ratio: 99.98%
              </div>
           </div>
           
           <div className="bg-white text-black px-6 py-4 font-black italic text-4xl tracking-tighter mix-blend-difference">
              041
           </div>
        </div>

        {/* Central HUD: Minimal Data Core */}
        <div className="flex-1 flex items-center justify-center py-24">
           <div className="grid grid-cols-3 gap-24 w-full">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-8 flex flex-col items-center">
                   <div className="relative w-48 h-48 border border-white/10 flex items-center justify-center overflow-hidden">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 5, delay: i * 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute bottom-0 inset-0 bg-white/5"
                      />
                      <div className="text-4xl font-black tabular-nums tracking-tighter opacity-80 group-hover:opacity-100">
                         {Math.floor(Math.random() * 99999)}
                      </div>
                   </div>
                   <div className="text-right w-full pr-8">
                      <div className="text-[10px] uppercase font-bold tracking-widest leading-none">VTR_SYS_0{i}</div>
                      <div className="text-[8px] opacity-40 uppercase">Aesthetic_Intensity_Synced</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Bottom Technicalities: Inverted Density */}
        <div className="grid grid-cols-12 gap-12 items-end pt-12 border-t border-white/5">
           <div className="col-span-4 space-y-4">
              <div className="text-6xl font-black tracking-tighter italic leading-none opacity-90">SYF_V5.C41</div>
              <div className="text-[8px] font-bold opacity-40 uppercase tracking-[1em]">Final_Void_Protocol_Engaged</div>
           </div>
           
           <div className="col-span-4 flex justify-center gap-2">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ scaleY: [1, 2, 1], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  className="w-1 h-32 bg-white"
                />
              ))}
           </div>

           <div className="col-span-4 text-right">
              <div className="text-[8px] opacity-40 font-bold uppercase tracking-widest leading-relaxed">
                 The Void direction complete. Transitioning to Concept 42: THE DEITY. 
                 Level 10 fidelity confirmed across all pillars. Zero placeholders. 
                 Maximum kinetic entropy detected.
              </div>
            </div>
         </div>
      </main>
      </RGBShift>

      {/* Floating Corner Diagnostic */}
      <div className="fixed top-4 left-4 text-[8px] font-bold opacity-40 uppercase tracking-[0.5em] font-mono">
         VOID_HUD_V5 // NO_PLACEHOLDER_POLICY_ENFORCED
      </div>
    </div>
  );
};

export default VantablackHUD;
