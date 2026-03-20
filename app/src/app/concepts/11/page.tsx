"use client";

import React from "react";
import { motion } from "framer-motion";
import { TerminalWindow } from "@/components/hud/TerminalWindow";
import { ScanlineOverlay } from "@/components/hud/ScanlineOverlay";
import { RGBShift } from "@/components/hud/RGBShift";
import { GlitchText } from "@/components/hud/GlitchText";
import { ASCIIMatrix } from "@/components/hud/ASCIIMatrix";

export default function Concept11() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-mono select-none">
      <ASCIIMatrix rows={40} cols={80} className="text-white opacity-10" />
      <ScanlineOverlay />
      
      {/* BACKGROUND BITMAP STRUCTURE */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen overflow-hidden">
        <div className="grid grid-cols-20 grid-rows-20 w-full h-full gap-[1px]">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/10" />
          ))}
        </div>
      </div>

      {/* CORE HUD ELEMENTS */}
      <div className="relative z-10 p-4 h-screen flex flex-col pointer-events-none">
        {/* TOP BAR */}
        <div className="flex justify-between items-start mb-8 border-b border-white/30 pb-2">
          <div>
            <GlitchText text="ASCII_OVERFLOW // v4.0.0" className="text-2xl font-black" />
            <div className="text-[10px] opacity-70 mt-1">SECTOR: RECURSIVE_VOID_0XFF</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-tighter">BIT_DENSITY: 98.4%</div>
            <div className="text-[10px] uppercase tracking-tighter">PARITY_CHECK: OK</div>
          </div>
        </div>

        {/* BRUTALIST CENTERPIECE */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-4xl space-y-4">
            <div className="flex gap-4">
              <TerminalWindow title="CORE_LOG" className="w-1/3 h-64 border-white/50 bg-black/80 backdrop-blur-md">
                <div className="space-y-1 text-[9px] text-white/80">
                  <div className="flex justify-between"><span>INIT_FS_MOUNT</span><span className="text-white">[DONE]</span></div>
                  <div className="flex justify-between"><span>MAP_VIRTUAL_PAGES</span><span className="text-white">[DONE]</span></div>
                  <div className="flex justify-between"><span>RECOVER_SHADOW_MEM</span><span className="text-white">[77.42%]</span></div>
                  <div className="mt-4 border-t border-white/20 pt-2">
                    <div className="animate-pulse">_ EXEC_OVERRIDE_ROOT ...</div>
                    <div>_ BYPASS_UI_CONSTRAINTS ...</div>
                  </div>
                </div>
              </TerminalWindow>
              
              <div className="w-2/3 h-64 bg-white text-black p-4 relative overflow-hidden flex flex-col justify-between border-4 border-black group pointer-events-auto cursor-crosshair">
                <div className="absolute top-0 right-0 p-1 bg-black text-white text-[8px] font-bold uppercase">MISSION_PROTOCOL</div>
                <div className="text-5xl font-black leading-none break-all tracking-tighter uppercase mb-4 mix-blend-difference">
                  BRUTALISM IS THE NEW ORDER.
                </div>
                <div className="text-[11px] font-bold leading-tight max-w-xs">
                  WASTE NOT THE PIXELS. SYF IS ORDER. ORDER IS VOID. WE OPERATE IN THE SHADOWS OF THE BITMAP. IF IT BLEEDS BINARY, WE CAN KILL IT.
                </div>
                
                {/* INTERACTIVE GLITCH ELEMENT */}
                <motion.div 
                  className="absolute bottom-4 right-4 w-24 h-24 border-2 border-black flex items-center justify-center font-black text-xs"
                  animate={{ 
                    scale: [1, 1.1, 0.9, 1],
                    skewX: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                >
                  [ BURN ]
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 h-32">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border border-white/30 p-2 flex flex-col justify-between bg-black/40 backdrop-blur-sm">
                  <div className="text-[10px] font-bold opacity-50">UNIT_0{i+1}</div>
                  <div className="text-xl font-black">{(Math.random() * 100).toFixed(2)}%</div>
                  <div className="w-full bg-white/10 h-1 overflow-hidden">
                    <motion.div 
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 100}%` }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER DIAGNOSTICS */}
        <div className="mt-auto border-t border-white/30 pt-2 flex justify-between text-[10px] uppercase font-bold tracking-widest">
          <div>REC_LEVEL_99 // SYSTEM_SYNC: CRITICAL</div>
          <div className="flex gap-4">
            <span className="animate-pulse text-white underline">OVERRIDE ACTIVE</span>
            <span>2026.03.20_SYF_CORE</span>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-30">
        <RGBShift intensity={0.5}>
          <div className="w-full h-full bg-transparent" />
        </RGBShift>
      </div>
    </main>
  );
}
