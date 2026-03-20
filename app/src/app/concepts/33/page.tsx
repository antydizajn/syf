"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScanlineOverlay } from "@/components/hud/ScanlineOverlay";
import { RGBShift } from "@/components/hud/RGBShift";

const VectorChase = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#000800] text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black overflow-hidden flex items-center justify-center p-12">
      {/* CRT Effects Layer */}
      <ScanlineOverlay />
      <RGBShift intensity={1.5} className="w-full h-full">
      
      {/* Hyper-Green Glow Base */}
      <div className="fixed inset-0 pointer-events-none radial-green-glow opacity-30" />

      {/* Background Matrix: Low Intensity */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[size:20px_20px] bg-[radial-gradient(circle,#00FF41_1px,transparent_1px)]" />

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-between py-12">
        {/* Header: Vector HUD Style */}
        <div className="flex justify-between items-baseline border-b-2 border-[#00FF41]/50 pb-8">
           <div className="space-y-2">
              <h1 className="text-8xl font-black tracking-tighter glow-text-green italic">
                 VECTOR_CHASE
              </h1>
              <div className="flex gap-4 items-center">
                 <div className="px-3 py-1 bg-[#00FF41] text-black text-[10px] font-bold uppercase tracking-widest leading-none">
                    SIGNAL_DETECTED // SPEED_MODE
                 </div>
                 <div className="text-[10px] opacity-60 uppercase tracking-[0.3em]">
                    Lat: 52&deg; N // Lon: 21&deg; E
                 </div>
              </div>
           </div>
           
           <div className="text-right">
              <div className="text-4xl font-black tabular-nums tracking-tighter underline decoration-4 underline-offset-8">
                 {Math.floor(Math.random() * 99999).toString().padStart(6, '0')}
              </div>
           </div>
        </div>

        {/* Central Visual: High-Speed Vector Lines */}
        <div className="relative flex-1 py-24 overflow-hidden border-x border-[#00FF41]/10">
           {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  x: ["0vw", "100vw"],
                  opacity: [0, 1, 0],
                  scaleX: [1, 2, 1]
                }}
                transition={{ 
                  duration: Math.random() * 0.5 + 0.2, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "linear"
                }}
                className="absolute h-[1px] bg-[#00FF41] shadow-[0_0_10px_#00FF41]"
                style={{ 
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200 + 50}px`
                }}
              />
           ))}

           {/* Central Target Reticle */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-96 h-96 border-2 border-[#00FF41] relative flex items-center justify-center rounded-none group"
              >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-4">
                     <div className="text-[10px] bg-[#00FF41] text-black px-2 py-1 font-bold">LOCK_ON</div>
                  </div>
                  <div className="w-1/2 h-1/2 border border-[#00FF41] opacity-50 flex items-center justify-center p-8">
                     <motion.div 
                       animate={{ opacity: [1, 0, 1] }}
                       transition={{ duration: 0.1, repeat: Infinity }}
                       className="text-4xl font-black"
                     >
                        TGT_X
                     </motion.div>
                  </div>
              </motion.div>
           </div>
        </div>

        {/* Bottom Data Grid */}
        <div className="grid grid-cols-4 gap-12 pt-12 border-t-4 border-[#00FF41]">
           {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                 <div className="text-xs font-bold uppercase tracking-widest border-l-4 border-[#00FF41] pl-2">VTR_{i.toString().padStart(2, '0')}</div>
                 <div className="text-[9px] opacity-60 leading-tight">
                    VECTOR_CHASE_ENGAGED_{i}<br/>
                    STREAM_BUFFER: 0xA{i}F2<br/>
                    DECAY_RATE: CRITICAL
                 </div>
                 <div className="h-1 bg-[#00FF41]/10 overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="h-full bg-[#00FF41] w-1/4"
                    />
                 </div>
              </div>
           ))}
        </div>
      </main>
      </RGBShift>

      {/* Floating Meta */}
      <div className="fixed top-12 left-12 transform -rotate-90 origin-left text-[8px] opacity-40 tracking-[1em] uppercase font-bold">
         PHOSPHOR_TRAILS // LEVEL_10_FIDELITY
      </div>

      <style jsx global>{`
        .radial-green-glow {
          background: radial-gradient(circle at center, #00FF41 0%, transparent 70%);
        }
        .glow-text-green {
          text-shadow: 0 0 15px #00FF41;
        }
      `}</style>
    </div>
  );
};

export default VectorChase;
