"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const VoidParticle = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#000105] text-[#0066FF] font-mono selection:bg-[#0066FF] selection:text-white overflow-hidden flex items-center justify-center p-12">
      <RGBShift intensity={0.5} className="w-full h-full">
      
      {/* Deep Blue Mist / Void Aura */}
      <div className="fixed inset-0 pointer-events-none radial-void-glow opacity-40 mix-blend-screen" />

      {/* Floating Particles: The Core Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         {[...Array(50)].map((_, i) => (
           <motion.div 
             key={i}
             initial={{ 
               x: `${Math.random() * 100}vw`, 
               y: `${Math.random() * 100}vh`,
               opacity: Math.random() * 0.5,
               scale: Math.random() * 2
             }}
             animate={{ 
               y: ["0vh", "100vh"],
               x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`]
             }}
             transition={{ 
               duration: Math.random() * 20 + 10, 
               repeat: Infinity, 
               ease: "linear",
               delay: Math.random() * -20 
             }}
             className="absolute w-1 h-1 bg-[#0066FF] rounded-full blur-[1px]"
           />
         ))}
      </div>

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-between py-24">
        {/* Header: Cryptic Minimalist */}
        <div className="flex border-l-4 border-[#0066FF] pl-12 py-4">
           <div className="space-y-4">
              <h1 className="text-9xl font-black tracking-[-0.1em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#0066FF] to-transparent">
                 VOID_PRTCL.
              </h1>
              <div className="text-[10px] font-bold uppercase tracking-[1em] opacity-40">
                 SYSTEM_PHASE_0 // DARKNESS_DENSITY
              </div>
           </div>
        </div>

        {/* Central HUD: Floating Metric Panel */}
        <div className="flex justify-center py-24">
           <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-[30rem] border border-[#0066FF]/20 bg-[#000105]/80 backdrop-blur-xl p-8 space-y-8 relative overflow-hidden group shadow-[0_0_100px_rgba(0,102,255,0.05)]"
           >
              {/* Scanline Detail */}
              <div className="absolute inset-0 bg-[size:4px_4px] bg-[linear-gradient(to_bottom,transparent_3px,#0066FF_3px)] opacity-5" />

              <div className="flex justify-between items-start border-b border-[#0066FF]/10 pb-4">
                 <div className="text-[10px] font-black uppercase text-[#0066FF]">Metric_Feed.037</div>
                 <div className="text-[8px] opacity-40 uppercase">0xAB_VOID</div>
              </div>

              <div className="space-y-6">
                 {[
                   { label: "Drift_Rate", val: "0.082s" },
                   { label: "Void_Density", val: "99.9%" },
                   { label: "Photon_Flux", val: "N/A" }
                 ].map((m, i) => (
                   <div key={i} className="flex justify-between items-baseline">
                      <span className="text-[10px] opacity-40 uppercase tracking-widest">{m.label}</span>
                      <motion.span 
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.1 }}
                        className="text-4xl font-black tabular-nums tracking-tighter"
                      >
                         {m.val}
                      </motion.span>
                   </div>
                 ))}
              </div>

              {/* Progress Detail */}
              <div className="h-1 bg-[#0066FF]/5 w-full relative overflow-hidden">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-[#0066FF] w-1/4 shadow-[0_0_10px_#0066FF]"
                 />
              </div>
           </motion.div>
        </div>

        {/* Bottom Metadata Layer */}
        <div className="grid grid-cols-12 gap-12 items-end">
           <div className="col-span-4 text-xs font-black italic tracking-[0.2em] opacity-40">
              Absence of light is the maximum resolution.
           </div>
           
           <div className="col-span-4 flex justify-center">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-8 h-8 border border-[#0066FF]/20 flex items-center justify-center m-1`}>
                   <div className="w-1/2 h-1/2 bg-[#0066FF]/20" />
                </div>
              ))}
           </div>

           <div className="col-span-4 text-right">
              <div className="bg-[#0066FF] text-[#000105] px-6 py-4 inline-block font-black text-xl italic tracking-tighter mix-blend-difference">
                 SYF_V5 // 10_ATOMOWKA
              </div>
            </div>
         </div>
      </main>
      </RGBShift>

      <style jsx global>{`
        .radial-void-glow {
          background: radial-gradient(circle at center, #0066FF 0%, transparent 80%);
        }
      `}</style>
    </div>
  );
};

export default VoidParticle;
