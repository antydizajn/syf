"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const CrypticGrid = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#000105] text-[#00E0FF] font-mono selection:bg-[#00E0FF] selection:text-black overflow-hidden flex items-center justify-center p-24">
      <RGBShift intensity={0.4} className="w-full h-full">
      
      {/* Background Matrix: Cryptic Symbols */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none select-none flex flex-wrap gap-12 p-12 overflow-hidden">
         {[...Array(200)].map((_, i) => (
           <span key={i} className="text-xl font-bold tracking-widest">{Math.random() > 0.5 ? "X" : "0"}</span>
         ))}
      </div>

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-between py-12">
        {/* Header: Sparse Grid Definition */}
        <div className="flex justify-between items-start border-b border-[#00E0FF]/20 pb-12">
           <div className="space-y-4">
              <h1 className="text-9xl font-black tracking-[-0.1em] leading-none italic text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-transparent">
                 CRYPTIC.
              </h1>
              <div className="flex gap-4">
                 <div className="text-[10px] font-bold bg-[#00E0FF]/10 text-[#00E0FF] px-3 py-1 border border-[#00E0FF]/20">
                    SECTOR_VOID // SYNCED
                 </div>
              </div>
           </div>
           
           <div className="text-right">
              <div className="text-4xl font-black tabular-nums tracking-tighter mix-blend-difference">039_XF</div>
              <div className="text-[8px] opacity-40 uppercase tracking-[0.5em] mt-2">Grid_Coordinate_Locked</div>
           </div>
        </div>

        {/* The Grid: Central Technical Visual */}
        <div className="relative flex-1 flex items-center justify-center py-24">
           {/* Multi-layered Sparse Grid */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <div className="w-[80vw] h-[1px] bg-[#00E0FF]" />
              <div className="h-[80vh] w-[1px] bg-[#00E0FF]" />
           </div>

           <div className="relative w-full h-[40vh] border-y border-[#00E0FF]/10 flex items-center justify-around">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4 items-center group">
                   <div className="text-4xl font-black tabular-nums tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
                      {Math.random().toFixed(4)}
                   </div>
                   <div className="w-8 h-8 border border-[#00E0FF]/40 relative flex items-center justify-center">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0.5, 1, 0] }}
                        transition={{ duration: 0.1, delay: i * 0.2, repeat: Infinity }}
                        className="w-2 h-2 bg-[#00E0FF]" 
                      />
                   </div>
                   <div className="text-[8px] font-bold opacity-40 uppercase tracking-[0.5em]">VAL_0{i}</div>
                </div>
              ))}
           </div>
        </div>

        {/* Global Footer Meta */}
        <div className="grid grid-cols-4 gap-12 items-end pt-12 border-t border-[#00E0FF]/20">
           <div className="col-span-1 space-y-4">
              <div className="text-[10px] uppercase font-bold text-[#00E0FF] tracking-widest leading-none">
                 Grid_Aesthetics // V5
              </div>
              <div className="text-3xl font-black leading-[0.8] tabular-nums">30/10</div>
           </div>
           
           <div className="col-span-2 flex flex-col items-center">
              <div className="w-full flex justify-between px-1 text-[8px] opacity-40 uppercase font-bold mb-1 tracking-widest">
                 <span>Latency_Correction</span>
                 <span>Stable</span>
              </div>
              <div className="h-1 bg-[#00E0FF]/5 w-full relative overflow-hidden">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-[#00E0FF] w-1/3 blur-[1px]"
                 />
              </div>
           </div>

           <div className="col-span-1 text-right">
              <div className="bg-[#00E0FF] text-black px-4 py-3 font-black text-xs italic tracking-tighter uppercase inline-block">
                 VOID_HUD_PROTO
            </div>
            </div>
         </div>
      </main>
      </RGBShift>

      <style jsx global>{`
        body { background: #000105; }
      `}</style>
    </div>
  );
};

export default CrypticGrid;
