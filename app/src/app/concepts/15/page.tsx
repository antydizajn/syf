"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import RGBShift from "@/components/hud/RGBShift";
import GlitchText from "@/components/hud/GlitchText";

const PersistenceTrail = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <motion.div 
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-cyan-900/10 blur-3xl"
      />
    </div>
  );
};

const WireframeGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <div className="w-full h-full bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
    </div>
  );
};

export default function Concept15() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-[#050505] text-cyan-400 overflow-hidden font-mono select-none">
      <PersistenceTrail />
      <WireframeGrid />
      <ScanlineOverlay opacity={0.2} color="#00ffff" />
      
      <div className="relative z-10 p-4 h-screen flex flex-col border-[2px] border-cyan-400/30 m-2 pointer-events-none">
        {/* CRT HEADER */}
        <div className="flex justify-between items-start mb-12 bg-cyan-400/5 p-4 border-b border-cyan-400/50">
           <div className="flex gap-6 items-center">
              <div className="w-16 h-16 border-2 border-cyan-400 flex items-center justify-center font-black text-2xl animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                 V
              </div>
              <div>
                 <GlitchText text="VECTOR_STRIKE" className="text-4xl font-black italic tracking-tighter text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                 <div className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-70">Phosphor_Persistence: 92%</div>
              </div>
           </div>
           <div className="text-right">
              <div className="relative">
                <RGBShift>
                  <div className="text-2xl font-black tracking-[-0.1em]">SCORE // 004880</div>
                </RGBShift>
              </div>
              <div className="text-[10px] uppercase font-bold text-cyan-400/60">INSERT_COIN_TO_CONTINUE</div>
           </div>
        </div>

        {/* CENTRAL COMBAT HUD */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
           {/* VECTOR RETICLES */}
           <div className="relative w-[500px] h-[500px] border-4 border-cyan-400/20 rounded-full flex items-center justify-center origin-center">
              <motion.div 
                className="absolute inset-0 border-[0.5px] border-cyan-400/50 rounded-full"
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-cyan-400/40" />
              <div className="absolute left-1/2 top-0 w-[0.5px] h-full bg-cyan-400/40" />
              
              {/* CENTRAL TARGET */}
              <div className="relative w-32 h-32 border-2 border-cyan-400 flex items-center justify-center group pointer-events-auto cursor-crosshair">
                 <motion.div 
                   className="absolute inset-[-10px] border-[0.5px] border-cyan-400/80 skew-x-[15deg]"
                   animate={{ skewX: [-15, 15, -15], rotate: [0, 90, 180, 270, 360] }}
                   transition={{ duration: 4, repeat: Infinity }}
                 />
                 <div className="text-xl font-black animate-pulse">LOCK</div>
              </div>

              {/* FLOATING TELEMETRY */}
              <div className="absolute -top-12 -right-24 bg-cyan-400/10 p-2 border border-cyan-400/40 backdrop-blur-sm text-[10px] space-y-1">
                 <div className="text-cyan-300 font-black">X_POS: 412.00</div>
                 <div className="text-cyan-300 font-black">Y_POS: -98.42</div>
                 <div className="text-cyan-300 font-black">Z_POS: 11.009</div>
                 <div className="h-px bg-cyan-400/30 w-full my-1" />
                 <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className={`w-1 h-3 ${i < 7 ? "bg-cyan-400" : "bg-cyan-400/20"}`} />
                    ))}
                 </div>
              </div>
           </div>
           
           {/* VECTOR SHIP PREVIEW */}
           <motion.div 
             className="absolute bottom-20 left-20 w-48 h-32 border-2 border-cyan-400/50 flex items-center justify-center p-4 bg-cyan-400/5"
             whileHover={{ scale: 1.1, skewY: -5 }}
           >
              <div className="relative w-full h-full flex items-center justify-center">
                 <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-cyan-400" />
                 <div className="absolute -bottom-4 text-[9px] font-black uppercase text-center w-full">Vessel_State: NOMINAL</div>
              </div>
           </motion.div>
        </div>

        {/* BOTTOM TERMINAL LOGS */}
        <div className="mt-auto grid grid-cols-4 gap-4 bg-cyan-400/5 p-4 border-t border-cyan-400/50">
           {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="space-y-2">
                <div className="text-[10px] font-black underline uppercase text-cyan-200">Aux_Feed_0{i+1}</div>
                <div className="text-[9px] opacity-60 h-12 overflow-hidden overflow-y-auto leading-none">
                   [SYS_LOG] VECTOR_STRIKE initiated...<br />
                   [TRACE] Sector_{i*10 + 20} scanned...<br />
                   [WARN] Low phosphor levels detected in quadrant B7...
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="fixed top-4 left-4 text-[10px] opacity-40 uppercase tracking-widest">
         <RGBShift>
           <span>System // Vector_Kernel_v4</span>
         </RGBShift>
      </div>
    </main>
  );
}
