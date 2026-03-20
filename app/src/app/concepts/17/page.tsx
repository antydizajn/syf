"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import GlitchText from "@/components/hud/GlitchText";
import RGBShift from "@/components/hud/RGBShift";

const CommodoreShell = () => {
  const [mounted, setMounted] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const lines = [
      "**** COMMODORE 64 BASIC V2 ****",
      " 64K RAM SYSTEM  38911 BASIC BYTES FREE",
      "READY.",
      "LOAD \"SYF-V4\",8,1",
      "SEARCHING FOR SYF-V4",
      "LOADING",
      "READY.",
      "RUN",
      "INITIALIZING NEURAL HUD...",
      "POKE 53280,0: POKE 53281,0",
      "ACCESSING CORE MEMORY...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setBootLog((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#352879] text-[#6c5eb5] font-mono overflow-hidden flex flex-col items-center justify-center p-8 selection:bg-[#6c5eb5] selection:text-[#352879]">
      {/* CRT Frame Effect */}
      <div className="absolute inset-0 border-[40px] border-[#000] z-50 pointer-events-none rounded-[50px] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#6c5eb5 1px, transparent 1px), linear-gradient(90deg, #6c5eb5 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <main className="relative z-10 w-full max-w-5xl bg-[#352879] p-12 shadow-[0_0_50px_rgba(108,94,181,0.3)] min-h-[80vh] flex flex-col border-4 border-[#6c5eb5]">
        <div className="mb-12 text-center">
          <GlitchText 
            text="SYF // C64_ENVIRONMENT" 
            className="text-4xl md:text-6xl font-black tracking-tighter text-[#6c5eb5]"
          />
        </div>

        <div className="flex-1 space-y-2 uppercase text-lg leading-tight">
          {bootLog.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
            >
              {line}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="inline-block w-4 h-6 bg-[#6c5eb5] ml-1 align-middle"
          />
        </div>

        {/* Telemetry Panels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 border-t-4 border-[#6c5eb5] pt-8">
          {[
            { label: "SYS_LOAD", val: "0.88" },
            { label: "MEM_FREE", val: "38911" },
            { label: "NET_STATE", val: "SYNC" },
            { label: "KERNAL", val: "V4.2" },
          ].map((stat, i) => (
            <RGBShift key={i} intensity={0.5}>
              <div className="bg-[#6c5eb5] text-[#352879] p-4 font-bold text-center">
                <div className="text-xs">{stat.label}</div>
                <div className="text-2xl">{stat.val}</div>
              </div>
            </RGBShift>
          ))}
        </div>

        {/* Radioactive Warning */}
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-4 right-4 text-[#6c5eb5] text-xs font-bold border-2 border-[#6c5eb5] px-2 py-1"
        >
          [!] RADIO-ACTIVE HUD_LINK [!]
        </motion.div>
      </main>

      {/* Screen Burn Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-b from-transparent via-white to-transparent mix-blend-overlay" />
      
      {/* Advanced Overlays */}
      <ScanlineOverlay opacity={0.15} />
      <div className="fixed inset-0 pointer-events-none bg-[url('/noise.png')] opacity-[0.05] contrast-200 brightness-150" />
    </div>
  );
};

export default CommodoreShell;
