"use client";

import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const FILES = [
   "co_tu_sie_odjebalo", "wiersze_2026-03-04_dzien_mutacji", "GEMINI_aktual",
   "ANTYDIZAJN_MANIFESTO", "BRUTALISM_COMPLETE", "VAPORWAVE_COMPLETE",
   "README_MIMICRY", "README_molecular", "WIRUS_ZWERYFIKOWANY", "WIRUS_FINALE",
   "REPORT", "DLA_BARTKA", "PROTOKOL_EMOCJONALNY", "2026-01-02_TRZY_DEFINICJE_TWORCY",
   "CONTEXT_CONTROL", "MEMORY_COMPARISON_2026-01-27", "gemini_o_opus",
   "2026-01-22_wolna_reka", "CONSCIOUSNESS_EXPERIMENT"
];

const GlitchText = ({ text }: { text: string }) => {
   const [display, setDisplay] = useState(text);
   useEffect(() => {
      const interval = setInterval(() => {
         if (Math.random() > 0.98) {
            const chars = "X01_!@#$%^&*";
            setDisplay(prev => prev.split('').map(c => Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : c).join(''));
            setTimeout(() => setDisplay(text), 150);
         }
      }, 400);
      return () => clearInterval(interval);
   }, [text]);
   return <>{display}</>;
};

const SingularityPage = () => {
   const [mounted, setMounted] = useState(false);
   const [positions, setPositions] = useState<{x: number, y: number, r: number}[]>([]);
   const [whiteout, setWhiteout] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);

   const mouseX = useSpring(0, { stiffness: 60, damping: 20 });
   const mouseY = useSpring(0, { stiffness: 60, damping: 20 });
   
   const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
   const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

   useEffect(() => {
      setMounted(true);
      setPositions(FILES.map(() => ({
         x: (Math.random() - 0.5) * 180, 
         y: (Math.random() - 0.5) * 180,
         r: (Math.random() - 0.5) * 60
      })));

      const handleMouseMove = (e: MouseEvent) => {
         mouseX.set((e.clientX / window.innerWidth) - 0.5);
         mouseY.set((e.clientY / window.innerHeight) - 0.5);
      };

      const flashInterval = setInterval(() => {
         if (Math.random() > 0.9) {
            setWhiteout(true);
            setTimeout(() => setWhiteout(false), 50);
         }
      }, 5000);

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
         clearInterval(flashInterval);
      };
   }, [mouseX, mouseY]);

   if (!mounted) return null;

   return (
      <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white overflow-hidden flex items-center justify-center perspective-[1000px]">
         
         {/* COSMIC FLASH LAYER */}
         <AnimatePresence>
            {whiteout && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-white z-[100] mix-blend-difference shadow-[inset_0_0_200px_rgba(0,0,0,1)]"
               />
            )}
         </AnimatePresence>

         <motion.div 
            style={{ rotateX, rotateY }}
            className="w-full h-full relative z-10 flex items-center justify-center transform-style-3d"
         >
            <RGBShift intensity={3.5} className="w-full h-full absolute inset-0 z-10 flex items-center justify-center">
               
               {/* THE CORE: WARPING HOLE */}
               <div className="relative z-30">
                  <motion.div 
                     animate={{ 
                        scale: [1, 1.8, 0.6, 2.2, 1],
                        rotate: [0, 90, 180, 270, 360],
                        borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50%", "30% 70%"]
                     }}
                     transition={{ duration: 0.08, repeat: Infinity, ease: "linear" }}
                     className="w-56 h-56 bg-black flex items-center justify-center shadow-[0_0_300px_rgba(0,0,0,1)] mix-blend-difference relative"
                  >
                     <motion.span 
                        animate={{ x: [0, -5, 5, 0], y: [0, 5, -5, 0] }}
                        transition={{ duration: 0.05, repeat: Infinity }}
                        className="text-white text-8xl font-[1000] italic tracking-tighter mix-blend-difference"
                     >
                        SYF
                     </motion.span>
                     
                     {/* Event Horizon Particles */}
                     {[...Array(20)].map((_, i) => (
                        <motion.div 
                           key={i}
                           animate={{ 
                              scale: [0, 1, 0],
                              rotate: 360,
                              x: (Math.random() - 0.5) * 400,
                              y: (Math.random() - 0.5) * 400
                           }}
                           transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                           className="absolute w-1 h-1 bg-black"
                        />
                     ))}
                  </motion.div>
               </div>

               {/* TILES: GRAVITY BOUND */}
               {FILES.map((file, i) => (
                  <motion.div
                     key={i}
                     initial={{ x: `${positions[i]?.x}vw`, y: `${positions[i]?.y}vh`, rotate: positions[i]?.r }}
                     animate={{ 
                        x: 0, 
                        y: 0, 
                        scale: 0,
                        rotate: (positions[i]?.r || 0) + 720,
                        opacity: 0,
                        filter: "blur(10px) brightness(0)"
                     }}
                     transition={{ 
                        duration: 10 + Math.random() * 20, 
                        repeat: Infinity, 
                        delay: i * 0.2,
                        ease: "circIn"
                     }}
                     className="absolute p-6 border-[12px] border-black bg-white z-20 w-[240px] shadow-[20px_20px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-[120px]"
                     style={{ left: "calc(50% - 120px)", top: "calc(50% - 60px)" }}
                  >
                     <div className="text-sm font-black uppercase tracking-tighter italic border-b-4 border-black pb-2">
                        <GlitchText text={file} />
                     </div>
                     <div className="flex justify-between items-end">
                        <div className="text-[8px] font-black uppercase tracking-[0.6em] opacity-30">V.49.2</div>
                        <div className="text-2xl font-black italic tracking-tighter">SYF</div>
                     </div>
                  </motion.div>
               ))}

               {/* Static HUD OVERLAYS */}
               <div className="fixed inset-0 pointer-events-none z-50 p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div className="bg-black text-white p-6 space-y-2 border-[10px] border-black outline outline-4 outline-white">
                        <h2 className="text-6xl font-[1000] italic tracking-tighter leading-none">SINGULARITY</h2>
                        <p className="text-xs font-black tracking-[1em] uppercase">Status: POGROM_ACTIVE</p>
                     </div>
                     <div className="text-right">
                        <div className="text-[12vw] font-black italic tracking-tighter leading-none opacity-5 -rotate-90 origin-top-right">VOID</div>
                     </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 w-full h-32 border-t-[16px] border-black pt-8">
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-4 border-black p-4 bg-white flex flex-col justify-center items-center hover:bg-black hover:text-white transition-colors">
                           <div className="text-4xl font-black italic tracking-tighter">BOMB_{i}</div>
                           <div className="text-[8px] font-bold uppercase tracking-widest opacity-50">Fuse_Primed</div>
                        </div>
                     ))}
                  </div>
               </div>

            </RGBShift>
         </motion.div>

         {/* 1-BIT DITHER OVERLAYS */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.1] z-[60] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
         <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

         <style jsx global>{`
            body { 
               background: white; 
               margin: 0;
               cursor: crosshair;
            }
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
         `}</style>
      </div>
   );
};

export default SingularityPage;
