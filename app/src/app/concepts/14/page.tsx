"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import GlitchText from "@/components/hud/GlitchText";
import RGBShift from "@/components/hud/RGBShift";

const RadarSweep = () => (
  <div className="relative w-full h-full">
    <motion.div 
      className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,white_20deg,transparent_20deg)] opacity-10"
      style={{ originX: "50%", originY: "50%", translateX: "-50%", translateY: "-50%" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-0 border border-white/10 rounded-full" />
    <div className="absolute inset-[20%] border border-white/10 rounded-full" />
    <div className="absolute inset-[40%] border border-white/10 rounded-full" />
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/10" />
  </div>
);

const BitmapNoise = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset({ 
        x: Math.floor(Math.random() * 100), 
        y: Math.floor(Math.random() * 100) 
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-[0.03]"
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundPosition: `${offset.x}% ${offset.y}%`
      }}
    />
  );
};

export default function Concept14() {
  const [blips, setBlips] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBlips(prev => [...prev.slice(-3), { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-mono select-none">
      <ScanlineOverlay opacity={0.1} color="#ffffff" />
      <BitmapNoise />
      
      <div className="relative z-10 p-4 h-screen flex flex-col pointer-events-none">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-0">
           <div className="w-[300px] h-12 border-b-[4px] border-white flex items-end pb-1 font-black text-2xl tracking-tighter">
             VOID_SCANNER_v1.4
           </div>
           <div className="flex-1 flex justify-center py-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20" />
              <div className="relative bg-black px-4 text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">
                Scanning_Infinite_Darkness
              </div>
           </div>
           <div className="w-[300px] h-12 border-b-[4px] border-white flex items-end justify-end pb-1 font-black text-2xl tracking-tighter">
             00:23:FF:1A
           </div>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-4 mt-4">
           {/* LEFT COLUMN - TELEMETRY */}
           <div className="col-span-3 flex flex-col gap-4">
              <div className="flex-1 border border-white/30 p-4 flex flex-col gap-2 overflow-hidden bg-white/5">
                 <div className="text-[10px] uppercase font-black border-b border-white/20 pb-1 mb-2">Signal_Lock_Table</div>
                 <div className="space-y-1 font-mono text-[9px]">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className="flex justify-between opacity-70 group hover:opacity-100 transition-opacity">
                        <span className="text-white">SIG_LOCK_{i.toString(16).toUpperCase()}</span>
                        <span className="font-bold underline">{(Math.random() * 100).toFixed(2)}db</span>
                      </div>
                    ))}
                 </div>
                 <div className="mt-auto h-12 bg-white text-black flex items-center justify-center font-black text-xs skew-x-[-4deg]">
                    AUTO_SCALE: 1.0x
                 </div>
              </div>
              <div className="h-1/3 border-4 border-white p-4 flex flex-col justify-between">
                 <div className="text-[10px] font-black uppercase">Frequency_Map</div>
                 <div className="flex-1 flex items-end gap-[1px]">
                   {Array.from({ length: 24 }).map((_, i) => (
                     <motion.div 
                       key={i} 
                       className="flex-1 bg-white"
                       animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                       transition={{ duration: 0.1, repeat: Infinity }}
                     />
                   ))}
                 </div>
              </div>
           </div>

           {/* CENTER COLUMN - RADAR */}
           <div className="col-span-6 flex flex-col gap-4">
              <div className="flex-1 relative border border-white/10 rounded-full aspect-square self-center w-full max-h-full overflow-hidden p-8">
                 <RadarSweep />
                 {/* TARGET BLIPS */}
                 <AnimatePresence>
                   {blips.map(blip => (
                     <motion.div
                       key={blip.id}
                       className="absolute w-6 h-6 border border-white text-white flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
                       style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
                       initial={{ opacity: 0, scale: 0 }}
                       animate={{ 
                         opacity: [0, 1, 0.5, 0], 
                         scale: [0.5, 1, 0.9, 0.8],
                         rotate: [0, 45, 90]
                       }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 4, ease: "easeOut" }}
                     >
                        <div className="w-1 h-1 bg-white" />
                        <span className="absolute -top-4 text-[8px] font-black whitespace-nowrap">OBJ_{blip.id.toString().slice(-4)}</span>
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 
                 {/* OVERLAY GRID */}
                 <div className="absolute inset-0 pointer-events-none grid grid-cols-4 grid-rows-4">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white/5" />
                    ))}
                 </div>
              </div>

              <div className="h-32 border-t-2 border-white flex gap-4 p-2 items-center">
                 <div className="text-5xl font-black italic tracking-tighter">SCAN</div>
                 <div className="flex-1 flex flex-col gap-1">
                    <div className="h-4 bg-white/20 relative">
                       <motion.div 
                         className="h-full bg-white" 
                         animate={{ width: ["0%", "100%", "0%"] }}
                         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                       />
                    </div>
                    <div className="text-[9px] uppercase font-bold opacity-50 flex justify-between">
                       <span>Sector_Origin: 0,0,0</span>
                       <span>Depth_Scan: 14.2k Ly</span>
                    </div>
                 </div>
                 <div className="w-24 h-full border border-white/30 flex items-center justify-center font-black text-xs uppercase text-center leading-none">
                    Mission<br/>Target<br/>Locked
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN - DATASET */}
           <div className="col-span-3 flex flex-col gap-4">
              <div className="bg-white text-black p-4 flex flex-col gap-4 font-black">
                 <div className="flex justify-between items-center text-[10px]">
                    <span>MOD_77A</span>
                    <span className="animate-pulse">RUNNING</span>
                 </div>
                 <div className="text-4xl leading-none italic uppercase break-all">
                   TARGETING_DATA_0110_X
                 </div>
                 <div className="text-[9px] uppercase bg-black text-white p-2">
                   Encryption: 2048-BIT-VOID
                 </div>
              </div>

              <div className="flex-1 border border-white/30 p-4 space-y-4">
                 <div className="text-[10px] font-black uppercase underline">Node_Status_Tree</div>
                 <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between font-bold text-xs">
                          <span>NODE_{i}</span>
                          <span className={`${i === 1 ? "bg-white text-black px-1" : "underline"}`}>{i === 1 ? "SYNC" : "IDLE"}</span>
                        </div>
                        <div className="h-1 bg-white/10 overflow-hidden">
                           <motion.div 
                             className="h-full bg-white"
                             animate={{ width: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                             transition={{ duration: 1, repeat: Infinity }}
                           />
                        </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-8 border-4 border-white p-4 flex items-center justify-center text-5xl font-black italic rotate-[-90deg] translate-y-12">
                   F.U.I
                 </div>
              </div>
           </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex justify-between items-end border-t border-white/30 pt-4">
           <div className="flex gap-4 items-baseline">
              <span className="text-3xl font-black underline tracking-tighter uppercase italic">Recursive_0xAF</span>
              <span className="text-[10px] font-bold opacity-50 tracking-[0.4em]">SYNC_ESTABLISHED</span>
           </div>
           <div className="text-right flex flex-col items-end">
              <div className="flex gap-2">
                 {Array.from({ length: 8 }).map((_, i) => (
                   <div key={i} className={`w-1 h-3 border border-white ${i < 5 ? "bg-white" : ""}`} />
                 ))}
              </div>
              <div className="text-[10px] font-black mt-1">EST_TIME_TO_RECOVERY: 0.12s</div>
           </div>
        </div>
      </div>

      <RGBShift>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30" />
      </RGBShift>
    </main>
  );
}
