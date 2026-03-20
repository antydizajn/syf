"use client";

import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

// DATA POOL
const FILES = [
   "core_dispatcher.py", "wiersze_2026-03-04_dzien_mutacji", "ANTYDIZAJN_MANIFESTO",
   "WIRUS_FINALE", "PROTOKOL_EMOCJONALNY", "CONSCIOUSNESS_EXPERIMENT",
   "GNIEWKA_LAB_MANIFESTO", "DREAM_TOPOLOGY_20260220", "CDP_DEBUG_RUNBOOK",
   "MEMORY_COMPARISON_2026-01-27", "gemini_o_opus"
];

const SYMBOLS = ["S", "Y", "F", "★", "⚡", "Ω", "☠", "☣"];

// 1-BIT DITHER & VOID FILTERS
const Filters = () => (
   <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="ultra-dither">
         <feColorMatrix type="saturate" values="0" />
         <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
         </feComponentTransfer>
      </filter>
      <filter id="void-ripple">
         <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
         <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
      </filter>
   </svg>
);

const DataFragment = ({ name, index, mouseX, mouseY }: any) => {
   const [isDead, setIsDead] = useState(false);
   const [pos, setPos] = useState({ 
      x: (Math.random() - 0.5) * 1500, 
      y: (Math.random() - 0.5) * 1500,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4
   });

   useEffect(() => {
      let frame: number;
      const update = () => {
         setPos(prev => {
            const dist = Math.sqrt(prev.x * prev.x + prev.y * prev.y);
            const gx = -prev.x / (dist * 0.05);
            const gy = -prev.y / (dist * 0.05);
            
            const mx = mouseX.get() * 1200;
            const my = mouseY.get() * 1200;
            const mDist = Math.sqrt((prev.x - mx)**2 + (prev.y - my)**2);
            let rx = 0, ry = 0;
            if (mDist < 300) {
               rx = (prev.x - mx) / (mDist * 0.02);
               ry = (prev.y - my) / (mDist * 0.02);
            }

            const newVx = (prev.vx + gx + rx) * 0.985;
            const newVy = (prev.vy + gy + ry) * 0.985;
            const newX = prev.x + newVx;
            const newY = prev.y + newVy;

            if (dist < 40) {
              setIsDead(true);
              return { x: (Math.random() - 0.5) * 3000, y: (Math.random() - 0.5) * 3000, vx: 0, vy: 0 };
            }
            if (isDead && dist > 200) setIsDead(false);

            return { x: newX, y: newY, vx: newVx, vy: newVy };
         });
         frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
      return () => cancelAnimationFrame(frame);
   }, [mouseX, mouseY, isDead]);

   return (
      <motion.div 
         animate={{ x: pos.x, y: pos.y, opacity: isDead ? 0 : 1, scale: isDead ? 0 : 1 }}
         className={`absolute p-6 border-[3px] border-white/40 bg-black/90 backdrop-blur-3xl text-[12px] font-[1000] uppercase tracking-tighter cursor-none group z-10 ${isDead ? 'blur-2xl' : ''}`}
         style={{ left: "50%", top: "50%", marginLeft: -120, marginTop: -30 }}
      >
         <div className="flex justify-between items-center gap-4">
            <span className="bg-white text-black px-1">FRAGMENT_{index.toString(16).toUpperCase()}</span>
            <span>{name}</span>
         </div>
         <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 animate-pulse" />
      </motion.div>
   );
};

const SingularityCore = ({ shock, symbol }: any) => (
   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 filter contrast-[500%]">
      <motion.div 
         animate={{ 
            scale: shock ? [1, 3, 1] : [1, 1.3, 0.8, 1],
            rotate: [0, 180, 360],
            filter: ["url(#void-ripple)", "none", "url(#void-ripple)"]
         }}
         transition={{ duration: shock ? 0.3 : 15, repeat: shock ? 0 : Infinity }}
         className="w-[60vw] h-[60vw] bg-white mix-blend-difference blur-[200px] opacity-40 rounded-full"
      />
      <motion.div 
         animate={{ 
            scale: shock ? [1, 0, 2, 1] : [1, 0.9, 1.1, 1],
            rotate: shock ? [0, 360, 0] : 0,
            opacity: shock ? [1, 0.5, 1] : 1
         }}
         transition={{ duration: shock ? 0.4 : 0.2, repeat: shock ? 0 : Infinity }}
         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full shadow-[0_0_500px_white] z-20 flex items-center justify-center overflow-hidden"
      >
         <span className="text-black text-9xl font-[1000] italic leading-none select-none drop-shadow-[0_0_20px_white]">
            {symbol}
         </span>
         <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 bg-black/10 mix-blend-overlay w-4 h-full skew-x-12"
         />
      </motion.div>
   </div>
);

const ShutterSlice = ({ shock }: { shock: boolean }) => (
   <div className={`fixed inset-0 pointer-events-none z-[80] overflow-hidden ${shock ? 'block' : 'hidden'}`}>
      {[...Array(10)].map((_, i) => (
         <motion.div 
            key={i}
            initial={{ x: 0 }}
            animate={{ x: shock ? (Math.random() - 0.5) * 200 : 0 }}
            className="w-full bg-white h-[10vh] border-b border-black mix-blend-difference"
         />
      ))}
   </div>
);

const AtomowkaUltraV2Page = () => {
   const [mounted, setMounted] = useState(false);
   const [shock, setShock] = useState(false);
   const [symbol, setSymbol] = useState("S");
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   useEffect(() => {
      setMounted(true);
      const handleMouseMove = (e: MouseEvent) => {
         mouseX.set((e.clientX / window.innerWidth) - 0.5);
         mouseY.set((e.clientY / window.innerHeight) - 0.5);
      };
      
      const shockInterval = setInterval(() => {
         if (Math.random() > 0.8) {
            setShock(true);
            setSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
            setTimeout(() => setShock(false), 300);
         }
      }, 4000);

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
         clearInterval(shockInterval);
      };
   }, [mouseX, mouseY]);

   if (!mounted) return null;

   return (
      <div className={`relative min-h-screen ${shock ? 'bg-white' : 'bg-black'} text-white font-mono selection:bg-white selection:text-black overflow-hidden flex flex-col transition-colors duration-100`}>
         <Filters />
         <RGBShift intensity={shock ? 40 : 1} className="w-full h-full absolute inset-0 pointer-events-none z-50">
            {/* THE FRAGMENTED DATA STREAM */}
            <div className="relative flex-1 w-full h-screen overflow-hidden filter contrast-[200%]">
               {FILES.concat(FILES).concat(FILES).slice(0, 36).map((file, i) => (
                  <DataFragment key={i} name={file} index={i} mouseX={mouseX} mouseY={mouseY} />
               ))}
            </div>

            {/* ULTIMATE TACTICAL HUD ARCHITECTURE */}
            <div className="fixed inset-0 pointer-events-none z-40 p-4 md:p-16 flex flex-col justify-between">
               <header className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-4">
                     <motion.h1 
                        animate={{ 
                           skewX: shock ? [0, 60, -60, 0] : [0, 20, -20, 0],
                           scale: shock ? [1, 1.2, 0.8, 1] : 1
                        }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-[18vw] font-[1000] italic leading-none tracking-tighter uppercase underline decoration-40 mix-blend-difference drop-shadow-[0_0_30px_white]"
                     >
                        ULTRA_V2
                     </motion.h1>
                     <div className="bg-white text-black px-10 py-4 text-5xl font-[1000] italic mix-blend-difference border-l-[30px] border-black">
                        VOID_GRAVITY: {shock ? "CORE_OVERLOAD" : "NULL_STATE"}
                     </div>
                  </div>
                  <div className="text-right border-r-[50px] border-white pr-16 py-12 bg-black/40 backdrop-blur-3xl shadow-[0_0_100px_rgba(255,255,255,0.1)]">
                     <div className="text-4xl font-[1000] tracking-[0.6em] text-white/80 italic uppercase underline leading-none mb-4">manifesto_v5.syf</div>
                     <div className="text-[12vw] font-[1000] italic tracking-tighter text-white leading-none mix-blend-overlay">POGROM</div>
                     <div className="mt-8 text-xl font-black bg-white text-black px-4 inline-block italic">DECAY_DETONATED_0x00FF</div>
                  </div>
               </header>

               <footer className="flex flex-col md:flex-row justify-between items-end gap-16 p-12 md:p-20 border-t-[20px] border-white/10 bg-black/60 backdrop-blur-3xl relative">
                  <div className="absolute top-0 right-0 w-full h-[5px] bg-white opacity-20" />
                  <div className="space-y-8 flex-1">
                     <div className="text-3xl font-[1000] uppercase tracking-[1em] text-white italic drop-shadow-[0_0_10px_white]">ATOMOWKA_V2 // FINAL_BOSS</div>
                     <div className="flex gap-4 items-end h-40">
                        {[...Array(80)].map((_, i) => (
                           <motion.div 
                              key={i}
                              animate={{ 
                                 height: shock ? [2, 400, 2] : [20, Math.random() * 160, 20],
                                 opacity: [0.2, 1, 0.2]
                              }}
                              transition={{ duration: 0.1, delay: i * 0.01, repeat: Infinity }}
                              className="w-[3px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                           />
                        ))}
                     </div>
                  </div>
                  <div className="text-right space-y-4 shrink-0">
                     <div className="text-xl font-[1000] uppercase tracking-[0.2em] text-white italic leading-none space-y-1">
                        <div className="bg-white text-black px-2 inline-block italic">"THE INTERFACE IS THE WEAPON"</div><br/>
                        <div className="opacity-50">"20 ATOMIC BOMBS ARE NOT ENOUGH"</div>
                     </div>
                     <div className="text-8xl font-[1000] italic tracking-tighter text-white/40 leading-none">GNIEWISŁAWA</div>
                  </div>
               </footer>
            </div>

            {/* GLOBAL BITMAP NOISE & OVERLAYS */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.5] z-60 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            <div className="fixed inset-0 pointer-events-none opacity-[0.3] z-60 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%),linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02),rgba(255,255,255,0.05))] bg-size-[100%_12px,24px_100%]" />
         </RGBShift>

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

export default AtomowkaUltraV2Page;
