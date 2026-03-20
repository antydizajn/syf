"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";

const VestigeMinimal = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black overflow-hidden flex items-center justify-center">
      {/* Background Starfield / Dust */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random()
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
          />
        ))}
      </div>

      <main className="relative z-10 w-full max-w-6xl p-12 flex flex-col items-center">
         {/* Ultra-Thin Line Art Reticle */}
         <div className="relative w-64 h-64 mb-16">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border border-white/5 rounded-full"
            />
            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
               className="absolute inset-[10%] border border-white/5 rounded-full border-dashed"
            />
            
            {/* Center Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-8 h-[0.5px] bg-white/20" />
               <div className="h-8 w-[0.5px] bg-white/20 absolute" />
            </div>

            {/* Floating Markers */}
            {[0, 90, 180, 270].map((deg, i) => (
              <motion.div
                key={i}
                initial={{ rotate: deg }}
                animate={{ rotate: deg + 10 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-[-20%] flex items-start justify-center"
              >
                <div className="w-[1px] h-4 bg-white/40" />
              </motion.div>
            ))}
         </div>

         <div className="text-center space-y-2">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              className="text-2xl font-extralight tracking-[2.5em] translate-x-[1.25em]"
            >
              VESTIGE
            </motion.h1>
            <p className="text-[9px] uppercase tracking-[1em] opacity-30">
              HUD_REDUCTION_PROTOCOL_03
            </p>
         </div>

         {/* Minimal Corner Data */}
         <div className="absolute top-12 left-12 space-y-8">
            <div className="overflow-hidden">
               <motion.div 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 className="text-[8px] font-mono tracking-[0.4em] opacity-20 border-l border-white/20 pl-4"
               >
                 STREAMING_RAW_VOID
               </motion.div>
            </div>
         </div>

         <div className="absolute bottom-12 right-12 space-y-4 text-right">
             <div className="text-[10px] font-light tracking-[0.8em] opacity-10">
                STABILITY_99.9%
             </div>
             <div className="flex gap-2 justify-end">
                {[...Array(4)].map((_, i) => (
                   <motion.div 
                     key={i}
                     animate={{ opacity: [0.1, 0.4, 0.1] }}
                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                     className="w-1 h-1 bg-white rounded-full"
                   />
                ))}
             </div>
         </div>
      </main>

      <ScanlineOverlay opacity={0.02} />
    </div>
  );
};

export default VestigeMinimal;
