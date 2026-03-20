"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScanlineOverlay } from "@/components/hud/ScanlineOverlay";
import { RGBShift } from "@/components/hud/RGBShift";

const PlasmaFlare = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#050200] text-[#FFB000] font-mono selection:bg-[#FFB000] selection:text-black overflow-hidden flex items-center justify-center p-12">
      {/* CRT Effects Layer */}
      <ScanlineOverlay />
      <RGBShift intensity={2} className="w-full h-full">
      
      {/* Radioactive Amber Glow Base */}
      <div className="fixed inset-0 pointer-events-none radial-amber-glow opacity-30" />

      {/* Background Grid (Phosphor Style) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[size:30px_30px] bg-[linear-gradient(to_right,#FFB000_1px,transparent_1px),linear-gradient(to_bottom,#FFB000_1px,transparent_1px)]" />

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-between py-12">
        {/* Header: High-Tech 80s */}
        <div className="flex justify-between items-start border-b-2 border-[#FFB000]/50 pb-8">
           <div className="space-y-2">
              <h1 className="text-8xl font-black tracking-tighter glow-text-amber italic">
                 PLASMA_FLARE
              </h1>
              <div className="flex gap-4 items-center">
                 <div className="px-3 py-1 bg-[#FFB000] text-black text-[10px] font-bold uppercase tracking-widest leading-none">
                    SECTOR_VII // RETRO_HIGHTECH
                 </div>
                 <div className="text-[10px] opacity-60 uppercase tracking-[0.3em]">
                    Phosphor_Decay: 88ms
                 </div>
              </div>
           </div>
           <div className="text-right">
              <div className="text-5xl font-black tabular-nums tracking-tighter">032</div>
              <div className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Concept_ID</div>
           </div>
        </div>

        {/* Central Visual: Floating Plasma Orb */}
        <div className="relative flex-1 flex items-center justify-center py-24">
           {/* Glow Rings */}
           {[...Array(5)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.1, 0.3, 0.1],
                 rotate: i % 2 === 0 ? 360 : -360
               }}
               transition={{ 
                 duration: 4 + i * 2, 
                 repeat: Infinity, 
                 ease: "linear" 
               }}
               className="absolute border border-[#FFB000] rounded-full blur-[2px]"
               style={{ width: `${(i + 1) * 15}%`, height: `${(i + 1) * 15}%` }}
             />
           ))}

           {/* Main Core */}
           <motion.div 
             animate={{ scale: [1, 1.05, 1], rotate: 45 }}
             transition={{ duration: 0.05, repeat: Infinity }}
             className="w-48 h-48 border-8 border-[#FFB000] shadow-[0_0_40px_#FFB000] flex items-center justify-center bg-black/40 backdrop-blur-sm relative"
           >
              <div className="text-4xl font-black tracking-widest">HV_PWR</div>
              
              {/* Internal Diagnostic Lines */}
              <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-20">
                 {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[2px] w-full bg-[#FFB000]" />
                 ))}
              </div>
           </motion.div>
        </div>

        {/* Bottom HUD Elements */}
        <div className="grid grid-cols-12 gap-8 items-end border-t border-[#FFB000]/20 pt-8">
           <div className="col-span-3 space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-[1em] mb-4">Reactor_Feed</div>
              <div className="space-y-1">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="flex justify-between text-[10px] font-mono">
                      <span className="opacity-40 uppercase">Line_{i.toString().padStart(2, '0')}</span>
                      <motion.span 
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: Math.random() + 0.5, repeat: Infinity }}
                        className="font-bold underline"
                      >
                         ACTIVE_FLUX
                      </motion.span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="col-span-6 flex flex-col items-center gap-6">
              <div className="w-full h-8 border border-[#FFB000] p-1 overflow-hidden">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="h-full bg-[#FFB000] w-1/4 blur-[2px]"
                 />
              </div>
              <div className="text-[9px] tracking-[2em] font-bold ml-8">SYNC_PROC_LOCK</div>
           </div>

           <div className="col-span-3 text-right">
              <div className="bg-[#FFB000] text-black px-4 py-4 text-xs font-black uppercase tracking-tighter italic">
                 SYF_V5 // 10_ATOMOWOWKA_STRIKE
              </div>
              <div className="mt-4 flex justify-end gap-1">
                 {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2 h-4 bg-[#FFB000]/20" />
                 ))}
              </div>
           </div>
        </div>
      </main>
      </RGBShift>

      <style jsx global>{`
        .radial-amber-glow {
          background: radial-gradient(circle at center, #FFB000 0%, transparent 70%);
        }
        .glow-text-amber {
          text-shadow: 0 0 20px #FFB000;
        }
      `}</style>
    </div>
  );
};

export default PlasmaFlare;
