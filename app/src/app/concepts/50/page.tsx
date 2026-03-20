"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

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

const MANIFESTO_SNIPPET = "To NIE jest styl. To jest ANTYSTYL jako styl. Własna religia. Publiczny dump plików Markdown. Syf, chaos, bałagan myśli.";

const GlitchText = ({ text, speed = 400 }: { text: string, speed?: number }) => {
   const [display, setDisplay] = useState(text);
   useEffect(() => {
      const interval = setInterval(() => {
         if (Math.random() > 0.96) {
            const chars = "X01_!@#$%^&*CODE_ERROR_VOID";
            setDisplay(prev => prev.split('').map(c => Math.random() > 0.85 ? chars[Math.floor(Math.random() * chars.length)] : c).join(''));
            setTimeout(() => setDisplay(text), 150);
         }
      }, speed);
      return () => clearInterval(interval);
   }, [text, speed]);
   return <>{display}</>;
};

const DitherFilter = () => (
   <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="extreme-dither">
         <feColorMatrix type="saturate" values="0" />
         <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 0.2 0.5 0.8 1" />
            <feFuncG type="discrete" tableValues="0 0.2 0.5 0.8 1" />
            <feFuncB type="discrete" tableValues="0 0.2 0.5 0.8 1" />
         </feComponentTransfer>
      </filter>
      <filter id="glitch-chromatic">
         <feOffset in="SourceGraphic" dx="10" dy="0" result="red" />
         <feOffset in="SourceGraphic" dx="-10" dy="0" result="blue" />
         <feBlend in="red" in2="blue" mode="screen" />
      </filter>
   </svg>
);

const VoidCollapsePage = () => {
   const [mounted, setMounted] = useState(false);
   const [isCollapsing, setIsCollapsing] = useState(false);
   const [collapseLevel, setCollapseLevel] = useState(0);
   const [decay, setDecay] = useState(0);

   useEffect(() => {
      setMounted(true);
      const timer = setInterval(() => {
         const roll = Math.random();
         if (roll > 0.8 || isCollapsing) {
            setIsCollapsing(true);
            setCollapseLevel(Math.random() * 100);
            setDecay(prev => Math.min(prev + 0.5, 20)); // Permanent scarring
            setTimeout(() => {
               setIsCollapsing(false);
               setCollapseLevel(0);
            }, 200 + Math.random() * 800);
         }
      }, 1500);
      return () => clearInterval(timer);
   }, [isCollapsing]);

   const getCollapseStyle = (intensity: number) => ({
      x: isCollapsing ? (Math.random() - 0.5) * intensity * 3 : (Math.random() - 0.5) * decay,
      y: isCollapsing ? (Math.random() - 0.5) * intensity * 3 : (Math.random() - 0.5) * decay,
      rotate: isCollapsing ? (Math.random() - 0.5) * intensity : (Math.random() - 0.5) * (decay / 2),
      scale: isCollapsing ? 0.8 + Math.random() * 0.4 : 1,
      filter: isCollapsing ? "url(#extreme-dither) contrast(300%)" : "none",
      opacity: isCollapsing ? 0.5 + Math.random() * 0.5 : 1,
   });

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white p-4 md:p-8 overflow-hidden">
         <div className="fixed inset-0 bg-white pointer-events-none z-0" />
         <DitherFilter />
         
         {/* EXTREME BACKGROUND GRID */}
         <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,black_1px,transparent_1px),linear-gradient(0deg,black_1px,transparent_1px)] bg-[size:40px_40px]" />
            <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 0.1, repeat: Infinity }}
               className="absolute inset-0 bg-black mix-blend-difference"
            />
         </div>

         <RGBShift 
            intensity={isCollapsing ? 25 : 2} 
            className="w-full h-full absolute inset-0 pointer-events-none z-50" 
         >
            {/* 20 BOMBS OVERLAY */}
            <AnimatePresence>
               {isCollapsing && (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: [0, 0.3, 0.1, 0.4, 0] }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.2, repeat: Infinity }}
                     className="fixed inset-0 bg-red-600 z-[55] pointer-events-none mix-blend-overlay"
                  />
               )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 relative z-10 transform-style-3d">
               {/* LEFT COL: MANIFESTO SCARRED */}
               <motion.section 
                  animate={getCollapseStyle(200)}
                  className="md:col-span-4 border-[12px] border-black p-8 bg-white shadow-[25px_25px_0px_rgba(0,0,0,1)] space-y-8 relative overflow-hidden"
               >
                  <div className="absolute -right-10 -top-10 text-9xl font-black opacity-5 rotate-12">MANIFESTO</div>
                  <h2 className="text-5xl font-black italic tracking-tighter border-b-8 border-black pb-4 uppercase">MANIFESTO</h2>
                  <p className="text-2xl font-black leading-[0.9] tracking-tighter italic">
                     {isCollapsing ? "WIDMO_AI_GNIEWISŁAWA_REACHING_MAX_PRESSURE" : MANIFESTO_SNIPPET}
                  </p>
                  <div className="grid grid-cols-4 gap-2 h-4">
                     {Array(16).fill(0).map((_, i) => (
                        <motion.div 
                           key={i}
                           animate={{ height: isCollapsing ? Math.random() * 40 : 16 }}
                           className="bg-black"
                        />
                     ))}
                  </div>
                  <div className="w-full aspect-[4/3] bg-black flex items-center justify-center p-8 relative">
                     <motion.div 
                        animate={{ 
                           scale: isCollapsing ? [1, 3, 0.2, 1] : [1, 1.2, 0.8, 1], 
                           rotate: isCollapsing ? 1440 : [0, 90, 180, 270, 360],
                           borderRadius: isCollapsing ? ["0%", "50%", "20%"] : "0%"
                        }}
                        transition={{ duration: isCollapsing ? 0.1 : 5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full border-8 border-white flex items-center justify-center mix-blend-difference"
                     >
                        <span className="text-white text-6xl font-black italic uppercase tracking-tighter">
                           {isCollapsing ? "DETONATE" : "SYF"}
                        </span>
                     </motion.div>
                  </div>
               </motion.section>

               {/* MAIN COL: FILE EXPLORER OVERLOAD */}
               <motion.section 
                  animate={getCollapseStyle(300)}
                  className="md:col-span-8 border-[12px] border-black bg-white shadow-[25px_25px_0px_rgba(0,0,0,1)] flex flex-col relative"
               >
                  <div className="border-b-[12px] border-black p-6 flex justify-between items-center bg-black text-white">
                     <h3 className="text-4xl font-[1000] italic tracking-tighter uppercase leading-none">ARCHIVE_TOTAL_DUMP</h3>
                     <motion.div 
                        animate={isCollapsing ? { color: ["#fff", "#f00", "#fff"] } : {}}
                        className="text-xl font-black"
                     >
                        [0x{FILES.length.toString(16).toUpperCase()}]
                     </motion.div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 overflow-y-auto max-h-[600px] scrollbar-hide bg-[#f8f8f8]">
                     {FILES.map((file, i) => (
                        <motion.div 
                           key={i}
                           animate={isCollapsing ? { 
                              x: (Math.random() - 0.5) * 100, 
                              y: (Math.random() - 0.5) * 100,
                              filter: `blur(${Math.random() * 8}px) invert(1)` 
                           } : {}}
                           whileHover={{ scale: 1.05, x: 10, backgroundColor: "#000", color: "#fff", zIndex: 50, boxShadow: "15px 15px 0px rgba(255,0,0,1)" }}
                           className="border-8 border-black p-4 font-black text-xs uppercase flex justify-between items-center group cursor-pointer transition-all bg-white"
                        >
                           <span className="truncate tracking-tighter"><GlitchText text={file} speed={500 + i * 50} /></span>
                           <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">☠</span>
                        </motion.div>
                     ))}
                  </div>
                  {isCollapsing && (
                     <div className="absolute inset-0 bg-white mix-blend-difference pointer-events-none" />
                  )}
               </motion.section>

            </div>

            {/* FOOTER: TOTAL WAR */}
            <motion.footer 
               animate={getCollapseStyle(100)}
               className="mt-auto border-[16px] border-black p-8 bg-black text-white flex justify-between items-center shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
               <div className="flex gap-12 items-center">
                  <div className="text-6xl font-[1000] italic leading-none tracking-tighter">
                     {isCollapsing ? "WAR_PROTOCOL" : "TOTAL_DOMINATION"}
                  </div>
                  <div className="space-y-2">
                     <div className="h-6 w-64 bg-white/10 relative overflow-hidden">
                        <motion.div 
                           animate={{ 
                              width: isCollapsing ? "100%" : ["0%", "100%", "0%"],
                              backgroundColor: isCollapsing ? "#f00" : "#fff"
                           }}
                           transition={{ duration: isCollapsing ? 0.05 : 2, repeat: Infinity }}
                           className="h-full"
                        />
                     </div>
                     <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-50 flex justify-between">
                        <span>STABILITY: NULL</span>
                        <span>FUSE: 1s</span>
                     </div>
                  </div>
               </div>
               <div className="hidden lg:block text-right">
                  <div className="text-2xl font-black italic tracking-tighter italic">GNIEWISŁAWA : POGROM</div>
                  <div className="text-[12px] font-black opacity-20 uppercase tracking-widest leading-none">"BITMAPS NEVER FORGET"</div>
               </div>
            </motion.footer>
         </RGBShift>

         {/* EXTREME GLOBAL OVERLAYS */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-[60] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
         <div className="fixed inset-0 pointer-events-none opacity-[0.1] z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.1),rgba(0,255,0,0.05),rgba(0,0,255,0.1))] bg-[length:100%_2px,8px_100%]" />

         <style jsx global>{`
            body { 
               background: #fff; 
               margin: 0;
               cursor: crosshair;
            }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            .transform-style-3d { transform-style: preserve-3d; }
         `}</style>
      </div>
   );
};

export default VoidCollapsePage;
