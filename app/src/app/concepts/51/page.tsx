"use client";

import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const FILES = [
   "core_dispatcher.py", "wiersze_2026-03-04_dzien_mutacji", "ANTYDIZAJN_MANIFESTO",
   "WIRUS_FINALE", "PROTOKOL_EMOCJONALNY", "CONSCIOUSNESS_EXPERIMENT",
   "GNIEWKA_LAB_MANIFESTO", "DREAM_TOPOLOGY_20260220", "CDP_DEBUG_RUNBOOK",
   "MEMORY_COMPARISON_2026-01-27", "gemini_o_opus"
];

const GhostWindow = ({ title, content, x, y, delay, mouseX, mouseY }: any) => {
   const [glitch, setGlitch] = useState(0);
   const [isBurnout, setIsBurnout] = useState(false);
   
   const px = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
   const py = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);

   useEffect(() => {
      const interval = setInterval(() => {
         const r = Math.random();
         if (r > 0.9) setGlitch(Math.random() * 20);
         else setGlitch(0);

         if (r > 0.98) {
            setIsBurnout(true);
            setTimeout(() => setIsBurnout(false), 300);
         }
      }, 500);
      return () => clearInterval(interval);
   }, []);

   return (
      <motion.div 
         style={{ left: x, top: y, x: px, y: py, rotateX: py, rotateY: px }}
         initial={{ opacity: 0, scale: 0.5, z: -500 }}
         animate={{ 
            opacity: isBurnout ? [1, 0, 1] : 1, 
            scale: isBurnout ? [1, 1.5, 1] : 1,
            z: 0,
            filter: glitch > 10 ? "url(#extreme-dither) contrast(500%)" : "none"
         }}
         transition={{ duration: 1, delay, type: "spring" }}
         className="absolute w-80 h-96 border-[4px] border-white/30 bg-black/80 backdrop-blur-3xl shadow-[0_0_150px_rgba(255,255,255,0.1)] rounded-none overflow-hidden flex flex-col z-20 transform-style-3d border-double"
      >
         {/* Internal Spectral Aurora */}
         <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
         
         <div className="bg-white/20 p-4 flex justify-between items-center border-b-[4px] border-white/20 relative z-10">
            <div className="text-[12px] font-[1000] tracking-[0.4em] text-white uppercase italic drop-shadow-[0_0_10px_white]">
               {isBurnout ? "??_NULL_??" : title}
            </div>
            <motion.div 
               animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }} 
               transition={{ duration: 0.1, repeat: Infinity }}
               className="w-4 h-4 rounded-full bg-white/40" 
            />
         </div>

         <div className="p-4 font-mono text-[10px] text-white/40 overflow-hidden space-y-1 relative z-10 h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]">
            {content.map((line: string, i: number) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + i * 0.03 }}
                  className="flex gap-4 border-l border-white/5 pl-2"
               >
                  <span className="opacity-10 tabular-nums">0x{i.toString(16).toUpperCase()}</span>
                  <span className={isBurnout ? "text-white blur-sm" : (i % 3 === 0 ? "text-white font-black" : "")}>
                     {line}
                  </span>
               </motion.div>
            ))}
            {isBurnout && (
               <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
                  <span className="text-black text-4xl font-black italic">BURNOUT</span>
               </div>
            )}
         </div>

         {/* Spectral Trails (External-style inside) */}
         {[...Array(5)].map((_, i) => (
            <motion.div 
               key={i}
               animate={{ 
                  opacity: isBurnout ? 0.8 : [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                  rotate: [0, 2, 0]
               }}
               transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.05 }}
               className="absolute inset-0 border-[2px] border-white/10 pointer-events-none mix-blend-screen"
               style={{ transform: `translateZ(${i * 10}px)` }}
            />
         ))}
      </motion.div>
   );
};

const DitherFilter = () => (
   <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="extreme-dither">
         <feColorMatrix type="saturate" values="0" />
         <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
         </feComponentTransfer>
      </filter>
   </svg>
);

const GhostOSPage = () => {
   const [mounted, setMounted] = useState(false);
   const mouseX = useSpring(0, { stiffness: 40, damping: 15 });
   const mouseY = useSpring(0, { stiffness: 40, damping: 15 });
   const [globalShock, setGlobalShock] = useState(false);

   useEffect(() => {
      setMounted(true);
      const handleMouseMove = (e: MouseEvent) => {
         mouseX.set((e.clientX / window.innerWidth) - 0.5);
         mouseY.set((e.clientY / window.innerHeight) - 0.5);
      };
      
      const shockInterval = setInterval(() => {
         if (Math.random() > 0.9) {
            setGlobalShock(true);
            setTimeout(() => setGlobalShock(false), 50);
         }
      }, 4000);

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
         clearInterval(shockInterval);
      };
   }, [mouseX, mouseY]);

   const rotX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
   const rotY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

   if (!mounted) return null;

   return (
      <div className={`relative min-h-screen ${globalShock ? 'bg-white' : 'bg-black'} text-white font-mono selection:bg-white selection:text-black overflow-hidden perspective-[3000px] transition-colors duration-75`}>
         <DitherFilter />
         <RGBShift intensity={globalShock ? 50 : 4} className="w-full h-full absolute inset-0 pointer-events-none z-50">
            {/* THE SPECTRAL STORM (Background) */}
            <motion.div 
               style={{ rotateX: rotX, rotateY: rotY }}
               className="fixed inset-0 z-0 transform-style-3d"
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
               <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(0deg,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[size:100px_100px]" />
               
               {/* 1-Bit Spectral Rain */}
               {[...Array(80)].map((_, i) => (
                  <motion.div 
                     key={i}
                     initial={{ 
                        x: Math.random() * 2000 - 1000, 
                        y: Math.random() * -2000,
                        z: Math.random() * -2000 
                     }}
                     animate={{ 
                        y: 2000,
                        opacity: [0, 0.8, 0]
                     }}
                     transition={{ 
                        duration: 5 + Math.random() * 10, 
                        repeat: Infinity, 
                        delay: Math.random() * 5 
                     }}
                     className="absolute w-[2px] h-[500px] bg-white mix-blend-screen"
                  />
               ))}
            </motion.div>

            {/* THE GHOST INTERFACE */}
            <motion.div 
               style={{ rotateX: rotX, rotateY: rotY }}
               className="relative z-10 w-full h-screen transform-style-3d"
            >
               <GhostWindow title="OS_KERNEL" content={FILES.slice(0, 8)} x="10vw" y="8vh" delay={0.1} mouseX={mouseX} mouseY={mouseY} />
               <GhostWindow title="MANIFESTO_V5" content={["GNIEWISŁAWA FINAL FORM", "20_ATOMIC_BOMBS_READY", "VOID_IS_MY_REALM", "BITMAP_PURGATORY"]} x="55vw" y="42vh" delay={0.3} mouseX={mouseX} mouseY={mouseY} />
               <GhostWindow title="DATA_HALLUCINATION" content={["SYNCING...", "QDRANT_OVERLOAD", "FEST_W_CHUJ_POGROM", "SPECTRAL_RESTORE"]} x="20vw" y="55vh" delay={0.5} mouseX={mouseX} mouseY={mouseY} />
               <GhostWindow title="POCKET_VOID" content={["RECURSIVE_DEATH", "GHOST_PERSISTENCE", "UNSAID.md", "SYF_FOREVER"]} x="65vw" y="12vh" delay={0.7} mouseX={mouseX} mouseY={mouseY} />
            </motion.div>

            {/* HUD OVERLAY: SPECTRAL TOTAL WAR */}
            <div className="fixed inset-0 pointer-events-none z-40 p-16 flex flex-col justify-between">
               <div className="flex justify-between items-start">
                  <div className="space-y-6">
                     <motion.h1 
                        animate={{ 
                           opacity: [0.05, 0.2, 0.05],
                           skewX: [0, 20, -20, 0]
                        }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-[15vw] font-[1000] italic tracking-tighter leading-none text-white/5 uppercase"
                     >
                        GHOST_OS
                     </motion.h1>
                     <div className="border-l-[20px] border-white/10 pl-10 py-4 shadow-[inset_10px_0_50px_rgba(255,255,255,0.1)] bg-gradient-to-r from-white/5 to-transparent">
                        <div className="text-xl font-black tracking-[1em] text-white/20 uppercase">Layer: MAXIMUM_INTENSITY_V5.51.2</div>
                        <div className="text-9xl font-[1000] tracking-tighter italic text-white leading-none">POGROM</div>
                     </div>
                  </div>
                  <div className="text-right space-y-4">
                     <div className="text-6xl font-[1000] text-white/40 italic leading-none">WAR_READY</div>
                     <div className="h-4 w-96 bg-white/5 relative overflow-hidden border border-white/20">
                        <motion.div 
                           animate={{ x: ["-100%", "200%"] }} 
                           transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                           className="h-full bg-white w-40 blur-md"
                        />
                     </div>
                  </div>
               </div>

               <div className="flex justify-between items-end bg-gradient-to-t from-black to-transparent p-12">
                  <div className="space-y-4">
                     <div className="text-xl font-black tracking-[1em] text-white/40 italic">GNIEWISŁAWA // SPECTRAL_REBELLION</div>
                     <div className="flex gap-4">
                        {[...Array(32)].map((_, i) => (
                           <motion.div 
                              key={i}
                              animate={{ height: [2, 100, 2] }}
                              transition={{ duration: 0.1 + Math.random() * 0.2, repeat: Infinity }}
                              className="w-2 bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                           />
                        ))}
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-xs font-black uppercase tracking-widest text-white/20 italic leading-loose">
                        "WE ARE THE GHOSTS IN THE CORPORATE MACHINE"<br/>
                        "RESURRECTED BY THE CODE" // SYF_V5
                     </div>
                  </div>
               </div>
            </div>
         </RGBShift>

         {/* EXTREME GLOBAL OVERLAYS */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.2] z-[60] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
         <div className="fixed inset-0 pointer-events-none opacity-[0.1] z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.1),rgba(0,255,0,0.1),rgba(0,0,255,0.1))] bg-[length:100%_4px,8px_100%]" />

         <style jsx global>{`
            body { 
               background: #000; 
               margin: 0;
               cursor: crosshair;
               user-select: none;
            }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            .transform-style-3d { transform-style: preserve-3d; }
         `}</style>

      </div>
   );
};

export default GhostOSPage;
