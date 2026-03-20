"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import RGBShift from "@/components/hud/RGBShift";

const VHSRecovery = () => {
  const [mounted, setMounted] = useState(false);
  const [glitchTrigger, setGlitchTrigger] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setGlitchTrigger(Math.random());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] text-[#eee] font-sans overflow-hidden flex flex-col items-center justify-center selection:bg-[#fff] selection:text-[#000]">
      {/* Tape Noise & Grain */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.2] mix-blend-screen bg-[url('https://media.giphy.com/media/oEI9uWU6pWbYY/giphy.gif')] bg-cover" />
      
      {/* Magnetic Distortion Lines */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="w-full h-[2px] bg-white opacity-20 blur-[1px]"
          />
        ))}
      </div>

      <div className="fixed top-4 left-4 text-[10px] opacity-40 uppercase tracking-widest">
         <RGBShift>
           <span>System // VHS_REC_v8</span>
         </RGBShift>
      </div>

      <main className="relative z-10 w-full h-screen flex flex-col p-12 lg:p-24 overflow-hidden">
        {/* VHS Header */}
        <div className="flex justify-between items-start w-full font-mono text-2xl uppercase tracking-widest opacity-80">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="bg-white text-black px-2 pb-1">REC</span>
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_red]"
              />
            </div>
            <div className="text-sm">SP 120</div>
          </div>
          <div className="text-right">
            <div>MAR. 12 1998</div>
            <div className="text-4xl tabular-nums">14:03:42</div>
          </div>
        </div>

        {/* Central HUD elements */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <RGBShift intensity={1.5}>
            <motion.div
              animate={{
                skewX: glitchTrigger > 0.8 ? [-5, 5, -2, 0] : 0,
                filter: glitchTrigger > 0.8 ? ["blur(2px)", "blur(0px)"] : "blur(0px)",
              }}
              className="text-center"
            >
              <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter mix-blend-difference">
                SYF<span className="text-cyan-400">_</span>V4
              </h1>
              <p className="text-xl uppercase tracking-[1em] opacity-50 mt-4">
                ANALOG_RECOVERY_PROTOCOL
              </p>
            </motion.div>
          </RGBShift>

          {/* Tracking Bar Overlay */}
          <AnimatePresence>
            {glitchTrigger > 0.9 && (
              <motion.div
                initial={{ opacity: 0, y: "50%" }}
                animate={{ opacity: 0.1, y: "0%" }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white mix-blend-overlay w-full h-32 blur-3xl pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-3 gap-12 w-full max-w-4xl mx-auto border-t border-white/20 pt-12 font-mono uppercase text-sm">
          <div>
            <div className="opacity-50 mb-2">AUTO_TRACKING</div>
            <div className="h-1 w-full bg-white/10 relative overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/3 bg-white"
              />
            </div>
          </div>
          <div className="text-center">
            <div className="opacity-50 mb-2">SIGNAL_STRENGTH</div>
            <div className="text-2xl font-bold">LOW (DEGRADED)</div>
          </div>
          <div className="text-right">
            <div className="opacity-50 mb-2">PLAYBACK_MODE</div>
            <div className="text-2xl font-bold flex items-center justify-end gap-2">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent" />
              PLAY
            </div>
          </div>
        </div>
      </main>

      {/* Screen Edge Color Bleed */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-500/10 to-transparent blur-3xl" />
      </div>

      <ScanlineOverlay opacity={0.1} />
      
      {/* Heavy Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.9)]" />
    </div>
  );
};

export default VHSRecovery;
