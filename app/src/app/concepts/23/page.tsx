"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import GlitchText from "@/components/hud/GlitchText";
import RGBShift from "@/components/hud/RGBShift";

const CommandCenter = () => {
  const [mounted, setMounted] = useState(false);
  const [threatLevel, setThreatLevel] = useState(45);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setThreatLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#050a05] text-[#4af626] font-mono selection:bg-[#4af626] selection:text-[#050a05] overflow-hidden p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#4af626 1px, transparent 1px), linear-gradient(90deg, #4af626 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <main className="relative z-10 w-full h-full border-2 border-[#4af626]/30 grid grid-cols-12 grid-rows-12 gap-2 p-2 h-[calc(100vh-2rem)]">
         {/* HEADER */}
         <div className="col-span-12 row-span-1 border border-[#4af626]/40 bg-[#4af626]/5 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-[#4af626] animate-pulse rounded-full" />
              <GlitchText text="STRAT_COM // LEVEL_04" className="text-xl font-bold tracking-widest" />
            </div>
            <div className="flex gap-8 text-xs">
              <div>GEO_COORD: 52D 22M 19S N / 21D 00M 42S E</div>
              <div>SYSTEM_TIME: {new Date().toLocaleTimeString()}</div>
            </div>
         </div>

         {/* MAIN MAP AREA */}
         <div className="col-span-8 row-span-8 border border-[#4af626]/40 relative overflow-hidden bg-black/40 group">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover" />
            
            {/* Map Overlay Reticles */}
            <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute top-1/4 left-1/3 w-32 h-32 border border-[#4af626] rounded-full flex items-center justify-center"
            >
               <div className="w-1 h-8 bg-[#4af626]" />
               <div className="w-8 h-1 bg-[#4af626] absolute" />
               <div className="absolute -top-6 text-[10px]">TGT_ALPHA</div>
            </motion.div>

            <div className="absolute bottom-4 left-4 border border-[#4af626]/60 p-2 bg-black/80 text-[10px] space-y-1">
               <div className="flex justify-between gap-4"><span>SAT_SYNC:</span> <span className="text-white">ACTIVE</span></div>
               <div className="flex justify-between gap-4"><span>LATENCY:</span> <span className="text-white">12MS</span></div>
            </div>

            {/* Scanning Line */}
            <motion.div 
               animate={{ y: ["0%", "100%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-x-0 h-px bg-[#4af626]/50 shadow-[0_0_10px_#4af626] z-20"
            />
         </div>

         {/* SIDEBAR - THREAT ANALYTICS */}
         <div className="col-span-4 row-span-8 border border-[#4af626]/40 p-4 space-y-6 bg-black/20">
            <div>
               <div className="text-xs mb-2 opacity-60">THREAT_LEVEL_INDEX</div>
               <div className="h-8 w-full border border-[#4af626]/40 relative flex items-center px-1">
                  <motion.div 
                     animate={{ width: `${threatLevel}%` }}
                     className="h-6 bg-[#4af626]/60 shadow-[0_0_10px_#4af626]"
                  />
                  <div className="absolute right-4 text-xs font-bold text-white mix-blend-difference">
                    {Math.round(threatLevel)}%
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <div className="text-xs opacity-60">ACTIVE_NODES</div>
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex justify-between items-center text-[10px] border-b border-[#4af626]/10 pb-1">
                    <span>NODE_0x{i}F92</span>
                    <span className={i === 3 ? "text-red-500 animate-pulse" : "text-[#4af626]"}>
                       {i === 3 ? "COMPROMISED" : "SECURE"}
                    </span>
                 </div>
               ))}
            </div>

            <div className="flex-1 border border-[#4af626]/20 p-2 text-[9px] font-mono leading-tight space-y-1 opacity-50">
               <div>{">"} ACCESS_LOGS_INITIALIZED</div>
               <div>{">"} DECRYPTING_SECTOR_7...</div>
               <div>{">"} HANDSHAKE_SUCCESSFUL</div>
               <div>{">"} MONITORING_TRAFFIC_01101</div>
               <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity }} className="inline-block w-2 h-3 bg-[#4af626]" />
            </div>
         </div>

         {/* BOTTOM PANELS */}
         <div className="col-span-3 row-span-3 border border-[#4af626]/40 p-3 bg-black/20">
            <div className="text-[10px] opacity-60 mb-2">NEURAL_FEED_STABILITY</div>
            <div className="flex items-end gap-1 h-20">
               {[...Array(20)].map((_, i) => (
                 <motion.div 
                    key={i}
                    animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="flex-1 bg-[#4af626]/40"
                 />
               ))}
            </div>
         </div>

         <div className="col-span-6 row-span-3 border border-[#4af626]/40 p-4 flex gap-8">
            <div className="flex-1 space-y-2">
               <div className="text-[10px] opacity-60">BIOMETRIC_LOCK</div>
               <div className="grid grid-cols-2 gap-2">
                  <div className="h-2 bg-[#4af626]/20 rounded-full overflow-hidden">
                     <motion.div animate={{ scaleX: [0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-[#4af626] origin-left" />
                  </div>
                  <div className="h-2 bg-[#4af626]/20 rounded-full overflow-hidden">
                     <motion.div animate={{ scaleX: [0.5, 0.8] }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }} className="h-full bg-[#4af626] origin-left" />
                  </div>
               </div>
            </div>
            <div className="w-32 flex flex-col justify-center text-center">
               <div className="text-2xl font-black">2.44<span className="text-[10px] font-normal">GHz</span></div>
               <div className="text-[8px] opacity-40 uppercase tracking-widest">CLOCK_SPEED</div>
       <div className="fixed bottom-4 left-4 text-[8px] opacity-40 tracking-widest uppercase">
         <RGBShift>
           <span>PROTOCOL: TAC_COM_V9 // SYF_SYSTEM_KERNEL</span>
         </RGBShift>
      </div>
         </div>
      </div>

         <div className="col-span-3 row-span-3 border border-[#4af626]/40 p-3 bg-red-900/10 flex flex-col items-center justify-center text-center">
             <motion.div 
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ duration: 1, repeat: Infinity }}
               className="text-red-500 font-bold border border-red-500 px-4 py-2"
             >
                CRITICAL_OVERLOAD
             </motion.div>
             <div className="text-[8px] mt-2 text-red-500/60 font-mono">SECTOR_05 // UNAUTHORIZED_ENTRY</div>
         </div>
      </main>

      <ScanlineOverlay opacity={0.1} color="#4af626" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-[#4af626]/5 to-transparent z-50" />
    </div>
  );
};

export default CommandCenter;
