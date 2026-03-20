"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const EventHorizon = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#FFFFFF] font-mono selection:bg-[#FFFFFF] selection:text-black overflow-hidden flex items-center justify-center p-24">
      <RGBShift intensity={0.8} className="w-full h-full">
      
      {/* Vantablack Void Base */}
      <div className="fixed inset-0 pointer-events-none radial-event-glow opacity-50" />

      <main className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center">
        {/* The Singularity: Central Visual */}
        <div className="relative w-[30vw] h-[30vw] flex items-center justify-center">
           {/* Accretion Disk */}
           <motion.div 
             animate={{ rotate: 360, scale: [1, 1.1, 1] }}
             transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
             className="absolute inset-[-40%] border-[20px] border-[#0066FF] rounded-full blur-[60px] opacity-20"
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute inset-[-10%] border-2 border-white/10 rounded-full border-dashed"
           />

           {/* The Core: Perfect Black Hole */}
           <motion.div 
             animate={{ scale: [1, 1.02, 1] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-full h-full bg-[#000000] border-2 border-white/20 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.05)] flex items-center justify-center z-10 overflow-hidden"
           >
              {/* Event Horizon Distortion Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/20 to-transparent" />
              <div className="text-[10vw] font-black italic tracking-tighter mix-blend-difference">
                 ZERO
              </div>
           </motion.div>

           {/* Time Dilation Readouts */}
           {[0, 90, 180, 270].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ 
                  transform: `rotate(${deg}deg) translate(22vw) rotate(-${deg}deg)` 
                }}
              >
                  <div className="flex flex-col gap-2 p-6 border border-white/10 bg-black/40 backdrop-blur-xl">
                     <div className="text-4xl font-black tabular-nums tracking-tighter">
                        +{Math.ceil(Math.random() * 100)}ms
                     </div>
                     <div className="text-[9px] font-bold tracking-widest bg-white text-black px-2 self-start uppercase">
                        Dilation_Factor_{i}
                     </div>
                  </div>
              </motion.div>
           ))}
        </div>

        {/* Global Metadata Hud */}
        <div className="absolute top-12 left-12 space-y-8">
           <div className="space-y-2">
              <h1 className="text-7xl font-black tracking-tighter leading-none italic">
                 EVENT_HORIZON
              </h1>
              <div className="text-xs font-bold uppercase tracking-[0.5em] opacity-40">
                 Singularity_Detection_Active
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-[2px] bg-white/20 overflow-hidden">
                   <motion.div 
                     animate={{ x: ["-100%", "100%"] }}
                     transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                     className="h-full bg-white/60 w-1/2"
                   />
                </div>
              ))}
           </div>
        </div>

        {/* Bottom Metrics: Pure Technicality */}
        <div className="absolute bottom-12 right-12 text-right flex flex-col items-end gap-12">
           <div className="space-y-4">
              <div className="text-[10px] opacity-40 uppercase tracking-[1em]">Core_Grav_Sensors</div>
              <div className="flex gap-1 items-end">
                 {[...Array(20)].map((_, i) => (
                   <motion.div 
                     key={i}
                     animate={{ height: [4, 40, 4] }}
                     transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                     className="w-1 bg-white/40"
                   />
                 ))}
              </div>
           </div>

           <div className="flex gap-4 items-baseline">
              <div className="text-6xl font-black tabular-nums tracking-tighter">30/10</div>
              <div className="text-[10px] font-bold tracking-widest bg-white text-black px-4 py-1 italic uppercase">
                 SYF_V5 // THE_VOID
            </div>
            </div>
         </div>
      </main>
      </RGBShift>

      <style jsx global>{`
        .radial-event-glow {
          background: radial-gradient(circle at center, #0066FF 0%, #000000 70%);
        }
      `}</style>
    </div>
  );
};

export default EventHorizon;
