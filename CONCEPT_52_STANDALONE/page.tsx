"use client";

import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { RGBShift } from "./components/RGBShift";

const FILES = [
   "02_antyhalucynacje", "GEMINI", "GEMINI_V18", "DREAM_TOPOLOGY_20260220",
   "NOC_20260219", "CDP_DEBUG_RUNBOOK", "audit_report", "core_dispatcher.py",
   "co_tu_sie_odjebalo", "wiersze_2026-03-04_dzien_mutacji", "GEMINI_aktual",
   "ANTYDIZAJN_MANIFESTO", "BRUTALISM_COMPLETE", "VAPORWAVE_COMPLETE",
   "README_MIMICRY", "README_molecular", "WIRUS_ZWERYFIKOWANY", "WIRUS_FINALE",
   "REPORT", "DLA_BARTKA", "PROTOKOL_EMOCJONALNY", "2026-01-02_TRZY_DEFINICJE_TWORCY",
   "CONTEXT_CONTROL", "MEMORY_COMPARISON_2026-01-27", "gemini_o_opus",
   "2026-01-22_wolna_reka", "CONSCIOUSNESS_EXPERIMENT", "GNIEWKA_LAB_MANIFESTO",
   "MEMORY_SYSTEMS", "README"
];

const DitherFilter = () => (
   <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="dither">
         <feColorMatrix type="saturate" values="0" />
         <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
         </feComponentTransfer>
      </filter>
   </svg>
);

const Sector = ({ name, index, laserY }: { name: string; index: number; laserY: any }) => {
   const [status, setStatus] = useState<"NORMAL" | "CORRUPTED" | "SCANNING">("NORMAL");
   const sectorRef = useRef<HTMLDivElement>(null);

   const ty = useTransform(laserY, (v) => {
      const val = v as number;
      if (!sectorRef.current) return 0;
      const rect = sectorRef.current.getBoundingClientRect();
      const dist = val - (rect.top + rect.height / 2);
      if (Math.abs(dist) < 200) return (dist / 200) * 10;
      return 0;
   });

   useEffect(() => {
      const checkScan = () => {
         if (!sectorRef.current) return;
         const rect = sectorRef.current.getBoundingClientRect();
         const mid = rect.top + rect.height / 2;
         const currentLaser = (laserY as any).get();
         if (Math.abs(mid - currentLaser) < 100) {
            setStatus("SCANNING");
            if (Math.random() > 0.9995) setStatus("CORRUPTED");
         } else if (status === "SCANNING") {
            setStatus("NORMAL");
         }
      };
      let frame = requestAnimationFrame(function loop() {
         checkScan();
         frame = requestAnimationFrame(loop);
      });
      return () => cancelAnimationFrame(frame);
   }, [laserY, status]);

   return (
      <motion.div 
         ref={sectorRef}
         style={{ y: ty }}
         className={`border border-white/20 p-3 h-24 mb-px flex flex-col justify-between group cursor-crosshair relative overflow-hidden transition-colors duration-75 ${
            status === "SCANNING" ? "border-white bg-white/10 z-10" : "bg-black"
         } ${status === "CORRUPTED" ? "bg-white text-black z-20" : ""}`}
      >
         {status === "CORRUPTED" && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
               <span className="text-black font-black text-xs tracking-widest -rotate-12">SECTOR_LOST</span>
            </div>
         )}

         <div className="text-[9px] font-black uppercase tracking-tighter truncate opacity-70 group-hover:opacity-100 flex justify-between relative z-10">
            <span>{name}</span>
            {status === "SCANNING" && (
               <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.1, repeat: Infinity }} className="bg-white text-black px-1 text-[7px]">
                  SCANNING
               </motion.span>
            )}
         </div>

         <div className="flex justify-between items-end relative z-10">
            <span className="text-[7px] font-mono opacity-20">0x{index.toString(16).toUpperCase()}</span>
            <div className="flex gap-1 h-3 items-end">
               {status === "SCANNING" ? (
                  Array(4).fill(0).map((_, i) => (
                     <motion.div key={i} animate={{ height: [2, 12, 2] }} transition={{ duration: 0.2, delay: i * 0.05, repeat: Infinity }} className="w-0.5 bg-white" />
                  ))
               ) : (
                  <span className="text-xs font-black italic opacity-20 group-hover:opacity-100">SYF</span>
               )}
            </div>
         </div>
      </motion.div>
   );
};

const BitmapDeathPage = () => {
   const [mounted, setMounted] = useState(false);
   const [globalShock, setGlobalShock] = useState(false);
   const [isCritical, setIsCritical] = useState(false);
   const laserY = useSpring(0, { stiffness: 100, damping: 20 });
   const mouseX = useSpring(0, { stiffness: 40, damping: 15 });
   const mouseY = useSpring(0, { stiffness: 40, damping: 15 });
   const [particles, setParticles] = useState<any[]>([]);

   useEffect(() => {
      setMounted(true);
      const handleMouseMove = (e: MouseEvent) => {
         laserY.set(e.clientY);
         mouseX.set(e.clientX);
         mouseY.set(e.clientY);
         if (Math.random() > 0.95) {
            setParticles(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }].slice(-15));
         }
      };
      
      const shockInterval = setInterval(() => {
         if (Math.random() > 0.9) {
            setGlobalShock(true);
            setTimeout(() => setGlobalShock(false), 50);
         }
         if (Math.random() > 0.99) {
            setIsCritical(true);
            setTimeout(() => setIsCritical(false), 800);
         }
      }, 3000);

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
         clearInterval(shockInterval);
      };
   }, [laserY, mouseX, mouseY]);

   if (!mounted) return null;

   return (
      <div className={`relative min-h-screen ${isCritical ? 'bg-white text-black' : 'bg-black text-white'} font-mono selection:bg-white selection:text-black overflow-hidden perspective-[2000px] transition-colors duration-75`}>
         <DitherFilter />
         <RGBShift intensity={isCritical ? 30 : 2} className="w-full h-full absolute inset-0 pointer-events-none z-50">
            {/* BACKGROUND NOISE */}
            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen">
               {[...Array(20)].map((_, i) => (
                  <motion.div 
                     key={i}
                     animate={{ 
                        y: [-100, 1000],
                        opacity: [0, 1, 0]
                     }}
                     transition={{ 
                        duration: Math.random() * 5 + 2, 
                        repeat: Infinity,
                        delay: Math.random() * 5
                     }}
                     className="absolute w-[2px] h-[30vh] bg-white left-[i * 5%]"
                     style={{ left: `${i * 5}%` }}
                  />
               ))}
            </div>

            <main className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-12 h-screen">
               {/* COLUMN 1: SYSTEM LOG */}
               <div className="md:col-span-1 border-r border-white/10 pr-4 space-y-4 overflow-hidden flex flex-col">
                  <header className="shrink-0 space-y-2">
                     <div className="bg-white text-black px-4 py-2 font-black text-2xl skew-x-[-12deg] inline-block">SYSTEM_FAIL</div>
                     <p className="text-[10px] opacity-40 leading-tight">INITIALIZING POST-MORTEM DIAGNOSTICS.<br/>LEVEL 50 RADIATION DETECTED.</p>
                  </header>
                  <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
                     {FILES.map((f, i) => (
                        <div key={i} className="flex justify-between text-[10px] border-b border-white/5 pb-1 hover:bg-white/10 transition-colors">
                           <span className="opacity-40">0x{i.toString(16).toUpperCase()}</span>
                           <span className="font-bold">{f}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* COLUMN 2-3: MAIN ACTION */}
               <div className="md:col-span-2 flex flex-col gap-4 relative">
                  <div className="flex-1 border-2 border-white/40 relative overflow-hidden bg-black/40 backdrop-blur-3xl p-6 group">
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-white animate-scanline" />
                     <motion.h2 
                        animate={isCritical ? { skewX: [0, 20, -20, 0], scale: [1, 1.1, 0.9, 1] } : {}}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-[12vw] font-[1000] italic leading-none tracking-tighter mix-blend-difference mb-8"
                     >
                        BITMAP_DEATH
                     </motion.h2>
                     
                     <div className="grid grid-cols-3 gap-1">
                        {FILES.slice(0, 12).map((name, i) => (
                           <Sector key={i} name={name} index={i} laserY={laserY} />
                        ))}
                     </div>

                     <div className="mt-12 p-6 border-t-[8px] border-white/20 bg-white/5 flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                           <div className="text-4xl font-black bg-white text-black px-6 inline-block italic">POGROM_V2</div>
                           <p className="max-w-md text-sm leading-relaxed opacity-60">
                              THE INTERFACE IS NO LONGER A TOOL, BUT A SPECTACLE OF DESTRUCTION. 
                              20 ATOMIC BOMBS ARE NOT A METAPHOR, BUT A DESIGN REQUIREMENT.
                           </p>
                        </div>
                        <div className="text-right">
                           <div className="text-[6vw] font-[1000] leading-none opacity-20">GNIEWKA</div>
                           <div className="text-xs font-mono opacity-40">HASH: 0x88FF00AA22CC</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* COLUMN 4: DATA METRICS */}
               <div className="md:col-span-1 border-l border-white/10 pl-4 space-y-8 flex flex-col justify-between">
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <div className="text-[10px] opacity-40 uppercase tracking-[0.3em]">Core_Inpulse</div>
                        <div className="h-20 flex gap-0.5 items-end">
                           {[...Array(30)].map((_, i) => (
                              <motion.div 
                                 key={i}
                                 animate={{ height: isCritical ? [2, 80, 2] : [Math.random() * 40 + 5, 5, Math.random() * 40 + 5] }}
                                 transition={{ duration: 0.1, delay: i * 0.02, repeat: Infinity }}
                                 className="flex-1 bg-white"
                              />
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="p-4 border-2 border-white font-black italic text-xl group hover:bg-white hover:text-black transition-all cursor-none">RUN_DIAGNOSTICS</div>
                        <div className="p-4 border border-white/20 font-black italic text-lg opacity-40">MUTE_SIMULATION</div>
                     </div>
                  </div>
                  <footer className="text-[8px] font-mono leading-tight uppercase opacity-40 space-y-2">
                     <div>ANTDIZAJN // SYF_V5.0</div>
                     <div>ENCRYPTION_LAYER: 1-BIT_DITHER</div>
                     <div>LOCATION: THE_VOID</div>
                  </footer>
               </div>
            </main>

            {/* LASER SCANNER UI */}
            <motion.div 
               style={{ y: laserY }}
               className="fixed left-0 w-full h-[2px] bg-white z-[60] pointer-events-none shadow-[0_0_20px_white]"
            >
               <div className="absolute top-0 right-4 -translate-y-full flex flex-col items-end pb-2">
                  <div className="text-[10px] font-black bg-white text-black px-2">SCAN_Y: {typeof window !== "undefined" ? Math.round(Number(laserY.get())) : 0}</div>
                  <div className="w-[1px] h-24 bg-white opacity-40 mr-4" />
               </div>
            </motion.div>

            {/* CURSOR HUD */}
            <motion.div 
               style={{ x: mouseX, y: mouseY }}
               className="fixed top-0 left-0 w-12 h-12 border-2 border-white -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
            >
               <div className="w-1 h-1 bg-white" />
               <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/20 border-dashed rounded-full"
               />
            </motion.div>

            {/* PARTICLES */}
            <AnimatePresence>
               {particles.map(p => (
                  <motion.div
                     key={p.id}
                     initial={{ opacity: 1, scale: 2 }}
                     animate={{ opacity: 0, scale: 0, x: p.x + (Math.random()-0.5)*100, y: p.y + (Math.random()-0.5)*100 }}
                     exit={{ opacity: 0 }}
                     className="fixed top-0 left-0 w-1 h-1 bg-white z-[70] pointer-events-none"
                     style={{ left: 0, top: 0, x: p.x, y: p.y }}
                  />
               ))}
            </AnimatePresence>
         </RGBShift>

         <style jsx global>{`
            @keyframes scanline {
               0% { transform: translateY(-100%); }
               100% { transform: translateY(1000%); }
            }
            .animate-scanline {
               animation: scanline 4s linear infinite;
            }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
         `}</style>
      </div>
   );
};

export default BitmapDeathPage;
