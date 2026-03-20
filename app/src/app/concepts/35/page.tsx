"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScanlineOverlay } from "@/components/hud/ScanlineOverlay";

import { RGBShift } from "@/components/hud/RGBShift";

const RadarStrike = () => {
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#001000] text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black overflow-hidden flex items-center justify-center p-12">
      <RGBShift intensity={1.2} className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center">
      <ScanlineOverlay />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,#00FF41_0%,transparent_80%)] opacity-20" />

        {/* Massive Radar Centerpiece */}
        <div className="relative w-[40vw] h-[40vw] border-8 border-[#00FF41]/40 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,255,65,0.1)]">
           {/* Grid Lines */}
           <div className="absolute inset-0 rounded-full border border-[#00FF41]/20 scale-[0.75]" />
           <div className="absolute inset-0 rounded-full border border-[#00FF41]/20 scale-[0.5]" />
           <div className="absolute inset-0 rounded-full border border-[#00FF41]/20 scale-[0.25]" />
           <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#00FF41]/20" />
           <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#00FF41]/20" />

           {/* The Sweep */}
           <motion.div 
             style={{ rotate: rotation }}
             className="absolute inset-0 origin-center"
           >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2 bg-gradient-to-t from-[transparent] to-[#00FF41] shadow-[0_0_20px_#00FF41]" />
              <div className="absolute top-0 left-1/2 -translate-x-[1px] w-[60px] h-1/2 bg-gradient-to-t from-transparent to-[#00FF41]/20 origin-bottom skew-x-[15deg]" />
           </motion.div>

           {/* Detected Targets (Blips) */}
           {[
             { x: "20%", y: "30%", id: "TGT_01" },
             { x: "70%", y: "45%", id: "TGT_02" },
             { x: "40%", y: "80%", id: "TGT_03" }
           ].map((t, i) => (
             <motion.div
               key={i}
               className="absolute"
               style={{ top: t.y, left: t.x }}
               initial={{ opacity: 0 }}
               animate={{ 
                 opacity: rotation > (i * 120) && rotation < (i * 120 + 30) ? 1 : [1, 0.4, 0.6, 0.2]
               }}
               transition={{ duration: 2, repeat: Infinity }}
             >
                <div className="w-4 h-4 border border-[#00FF41] flex items-center justify-center relative">
                   <div className="w-1 h-1 bg-[#00FF41] shadow-[0_0_10px_#00FF41]" />
                   <div className="absolute -top-6 -left-2 text-[8px] font-bold bg-[#00FF41] text-black px-1 leading-none shadow-sm">
                      {t.id}
                   </div>
                </div>
             </motion.div>
           ))}

           {/* Center Point */}
           <div className="w-8 h-8 border-2 border-[#00FF41] flex items-center justify-center bg-[#001000] z-20">
              <div className="w-1 h-1 bg-[#00FF41] animate-pulse" />
           </div>
        </div>

        {/* HUD Bars: Horizontal Technicality */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t-2 border-[#00FF41]/40 pt-8">
           <div className="space-y-4">
              <div className="text-6xl font-black italic tracking-tighter leading-none glow-text-green">RADAR_STRIKE.EXE</div>
              <div className="text-[10px] font-bold tracking-[1em] opacity-40 uppercase">Aesthetic_Intensity: 25/10</div>
           </div>
           
           <div className="flex gap-12 items-end">
              <div className="text-right space-y-1">
                 <div className="text-[8px] opacity-40 uppercase">Bearing</div>
                 <div className="text-4xl font-black tabular-nums">{rotation.toString().padStart(3, '0')}&deg;</div>
              </div>
              <div className="bg-[#00FF41] text-black p-4 font-black italic text-xs uppercase tracking-tighter leading-none">
                 SYF_V5 // PHASE_B
              </div>
           </div>
        </div>

        {/* Matrix Rain Detail (Small) */}
        <div className="fixed top-12 left-12 space-y-1">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="flex gap-2 text-[8px] font-mono opacity-20">
                <span>0x{Math.random().toString(16).substring(2, 6).toUpperCase()}</span>
                <span className="font-bold underline">OK</span>
             </div>
           ))}
        </div>
      </RGBShift>

      <style jsx global>{`
        .glow-text-green {
          text-shadow: 0 0 15px #00FF41;
        }
      `}</style>
    </div>
  );
};

export default RadarStrike;
