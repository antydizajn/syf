"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScanlineOverlay } from "@/components/hud/ScanlineOverlay";
import { RGBShift } from "@/components/hud/RGBShift";

const ArcadeOverload = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#100800] text-[#FF4E00] font-mono selection:bg-[#FF4E00] selection:text-black overflow-hidden flex items-center justify-center p-12">
      <ScanlineOverlay />
      <RGBShift intensity={2.5} className="w-full h-full">
      
      {/* Overload Heat Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,#FF4E00_0%,transparent_80%)] opacity-30 animate-pulse" />

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center justify-center gap-12">
        {/* The Overloaded Core (8-bit style) */}
        <div className="relative w-full border-y-[20px] border-[#FF4E00]/40 py-24 flex flex-col items-center justify-center gap-6 overflow-hidden">
           {/* Glitched Background Text */}
           <motion.div 
             animate={{ x: [-10, 10, -5, 5, 0], skewX: [0, 5, -5, 0] }}
             transition={{ duration: 0.1, repeat: Infinity }}
             className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none"
           >
              <h2 className="text-[30vw] font-black italic">OVERLOAD</h2>
           </motion.div>

           <div className="text-[12rem] font-black italic tracking-tighter leading-none glow-text-heat relative z-10">
              OVRLD_36
           </div>

           <div className="flex gap-4 z-10">
              {[...Array(16)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    height: [20, 100, 20],
                    backgroundColor: i % 2 === 0 ? "#FF4E00" : "#FFB000"
                  }}
                  transition={{ 
                    duration: 0.2, 
                    repeat: Infinity, 
                    delay: i * 0.05 
                  }}
                  className="w-4 bg-[#FF4E00]"
                />
              ))}
           </div>
        </div>

        {/* Diagnostic Grid: Chaotic Density */}
        <div className="grid grid-cols-6 gap-4 w-full">
           {[...Array(24)].map((_, i) => (
             <div key={i} className="border border-[#FF4E00]/40 p-2 flex flex-col gap-1">
                <div className="flex justify-between text-[8px] font-bold">
                   <span>MODULE_{i}</span>
                   <span className="text-[#FFB000]">ERR</span>
                </div>
                <div className="h-1 bg-[#FF4E00]/10 overflow-hidden">
                   <motion.div 
                     animate={{ width: ["0%", "100%"] }}
                     transition={{ duration: Math.random() + 0.1, repeat: Infinity }}
                     className="h-full bg-[#FF4E00]"
                   />
                </div>
                <div className="text-[8px] opacity-40">0x{Math.random().toString(16).substring(2, 6).toUpperCase()}</div>
             </div>
           ))}
        </div>

        {/* Global Metadata: Low Level */}
        <div className="absolute top-12 left-12 right-12 flex justify-between items-start font-bold">
           <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.5em] bg-[#FF4E00] text-black px-2">SYF_V5_OVERLOAD_STATE</div>
              <div className="text-[10px] opacity-60">CPU_HEAT: CRITICAL // CORE_DUMP: TRUE</div>
           </div>
           <div className="text-right space-y-4">
              <div className="text-8xl font-black italic leading-[0.6] tracking-tighter mix-blend-difference">30/10</div>
            </div>
         </div>
      </main>
      </RGBShift>

      <style jsx global>{`
        .glow-text-heat {
          text-shadow: 0 0 20px #FF4E00, 0 0 40px #FFB000;
        }
      `}</style>
    </div>
  );
};

export default ArcadeOverload;
