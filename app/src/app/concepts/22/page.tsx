"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";

const ShadowMatter = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#000] text-white font-sans selection:bg-zinc-800 selection:text-white overflow-hidden cursor-none">
      {/* Dynamic Flashlight Effect */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_var(--x)_var(--y),_rgba(255,255,255,0.08)_0%,_transparent_50%)]"
        style={{ 
          // @ts-ignore
          "--x": `${mousePos.x}px`, 
          "--y": `${mousePos.y}px` 
        }}
      />

      {/* Shadow Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 2
            }}
            animate={{ 
              y: [null, "-10%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear"
            }}
            className="absolute w-64 h-64 bg-zinc-900/50 blur-[100px] rounded-full"
          />
        ))}
      </div>

      <main className="relative z-10 w-full min-h-screen flex flex-col p-12 lg:p-24 justify-between">
         {/* Top Meta */}
         <div className="flex justify-between items-start opacity-20 hover:opacity-100 transition-opacity duration-1000">
            <div className="font-mono text-[9px] tracking-[0.5em] space-y-1">
               <div>SHADOW_MATTER_HUD</div>
               <div>V4_VOID_EDITION</div>
            </div>
            <div className="text-right font-mono text-[9px] tracking-[0.5em]">
               [ SECRECY_LEVEL: REDACTED ]
            </div>
         </div>

         {/* Center Invisible Title */}
         <div className="relative flex flex-col items-center">
            <motion.h1 
               className="text-[12vw] font-black italic tracking-tighter mix-blend-difference"
               style={{ 
                 color: 'transparent',
                 WebkitTextStroke: '0.5px rgba(255,255,255,0.05)'
               }}
            >
              SYF-VOID
            </motion.h1>
            
            {/* Subtle light leak over text */}
            <motion.div 
               animate={{ x: ["-100%", "100%"] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-12 blur-sm pointer-events-none"
            />
         </div>

         {/* Bottom Data (Nearly Invisible) */}
         <div className="grid grid-cols-4 gap-8 opacity-[0.05]">
            {[
              { label: "DARKNESS", val: "99.2%" },
              { label: "MATTER", val: "NULL" },
              { label: "OBSERVER", val: "ACTIVE" },
              { label: "SIGNAL", val: "LOST" },
            ].map((d, i) => (
              <div key={i} className="space-y-2 group cursor-default">
                 <div className="text-[8px] font-mono tracking-widest">{d.label}</div>
                 <div className="text-xl font-thin tracking-tighter group-hover:opacity-100 transition-opacity">{d.val}</div>
              </div>
            ))}
         </div>
      </main>

      {/* Screen Crack / Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-screen bg-[url('/noise.png')] scale-150" />
      
      {/* Custom Cursor */}
      <motion.div 
        className="fixed w-4 h-4 border border-white/20 rounded-full z-[100] pointer-events-none mix-blend-difference"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />

      <ScanlineOverlay opacity={0.01} />
    </div>
  );
};

export default ShadowMatter;
