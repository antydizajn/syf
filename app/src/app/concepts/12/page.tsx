"use client";

import React from "react";
import { motion } from "framer-motion";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import GlitchText from "@/components/hud/GlitchText";
import RGBShift from "@/components/hud/RGBShift";

const HalftoneBox = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:4px_4px]" />
    <div className="absolute inset-0 border border-white/20" />
    {children}
  </div>
);

export default function Concept12() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-mono select-none">
      <ScanlineOverlay opacity={0.15} color="#00e334" />
      
      {/* DEEP RECURSION BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 scale-110">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-white/40 opacity-20"
            initial={{ scale: 1 + i * 0.1, opacity: 0 }}
            animate={{ 
              scale: [1 + i * 0.1, 2 + i * 0.1],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 h-screen flex flex-col pointer-events-none">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-1">
            <GlitchText text="RECURSIVE_DITHER" className="text-4xl font-black italic tracking-tighter" />
            <div className="h-1 bg-white w-full" />
            <div className="text-[10px] tracking-[0.5em] font-bold">ALPHA_STATE://STABLE</div>
          </div>
          <div className="flex gap-1 text-[8px] font-bold">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`w-3 h-3 border border-white ${i % 3 === 0 ? "bg-white" : ""}`} />
            ))}
          </div>
        </div>

        {/* MAIN RECURSIVE LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-3 flex flex-col gap-6">
            <HalftoneBox className="flex-1 bg-white text-black p-4 flex flex-col justify-between group pointer-events-auto cursor-wait">
              <div className="text-[9px] font-black uppercase">Data_Stream_01</div>
              <div className="flex-1 flex items-center justify-center font-black text-3xl">
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                >
                  88:88
                </motion.span>
              </div>
              <div className="text-[8px] uppercase tracking-widest leading-none">
                Fractal redundancy check... [OK]
              </div>
            </HalftoneBox>
            <div className="h-48 border-2 border-dashed border-white/30 p-2 overflow-hidden bg-black/80">
              <div className="text-[8px] opacity-50 mb-2">TELEMETRY_DITHER_MAP</div>
              <div className="space-y-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex gap-1">
                    <div className="text-[7px] w-6 opacity-40">0x0{i}</div>
                    <div className="flex-1 flex gap-px">
                      {Array.from({ length: 20 }).map((_, j) => (
                        <div key={j} className={`h-1 flex-1 ${Math.random() > 0.7 ? "bg-white" : "bg-white/10"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-6 border-4 border-white bg-black p-8 relative overflow-hidden flex flex-col group pointer-events-auto">
             <div className="absolute top-0 left-0 w-full h-1 bg-white/20 overflow-hidden">
               <motion.div 
                 className="h-full bg-white w-20"
                 animate={{ left: ["-20%", "120%"] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 style={{ position: 'absolute' }}
               />
             </div>
             
             <div className="flex-1 flex flex-col justify-center gap-8">
               <div className="text-8xl font-black leading-[0.8] tracking-tighter uppercase italic break-all">
                 VOID_CORE_EXTRACT.
               </div>
               <div className="h-px bg-white/40 w-1/2" />
               <div className="flex gap-4">
                 <div className="text-sm font-bold max-w-[200px]">
                   DEEP BUFFERING INITIATED. RECURSIVE VOID ACCESSED. 1-BIT DITHERING ACTIVE.
                 </div>
                 <div className="flex-1 border-l border-white/20 pl-4 text-[9px] opacity-60 italic">
                   "If the bitmap fails to render, the reality bit-flips. There is no recovery once the halftone patterns align."
                 </div>
               </div>
             </div>

             <div className="flex justify-between items-end mt-8">
               <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black">404</span>
                 <span className="text-[10px] uppercase font-bold tracking-tighter">Errors_Found</span>
               </div>
               <div className="w-24 h-24 border border-white/20 relative group-hover:border-white transition-colors duration-200 cursor-pointer">
                  <div className="absolute inset-1 border border-white/10" />
                  <div className="absolute inset-2 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase">Manual_Override</div>
               </div>
             </div>
          </div>

          <div className="col-span-3 flex flex-col gap-6">
            <div className="h-32 border border-white/20 p-4 space-y-4">
               <div className="flex justify-between items-center text-[10px] font-black">
                 <span>BUFF_99</span>
                 <span className="bg-white text-black px-1">ACTIVE</span>
               </div>
               <div className="w-full h-px bg-white/20" />
               <div className="grid grid-cols-4 gap-2">
                 {Array.from({ length: 8 }).map((_, i) => (
                   <div key={i} className="aspect-square border border-white/10 bg-white/5" />
                 ))}
               </div>
            </div>
            <HalftoneBox className="flex-1 bg-white text-black relative flex flex-col">
               <div className="absolute inset-0 flex flex-col p-4">
                  <div className="text-xs font-black uppercase border-b border-black mb-2">Recursive_Module_Load</div>
                  <div className="flex-1 flex flex-col justify-around">
                     {["SCANNER", "BUFFER", "DITHER", "PARITY"].map((t, i) => (
                       <div key={i} className="flex justify-between items-center">
                         <span className="text-[10px] font-bold">{t}</span>
                         <span className="text-[10px] font-black underline">0X0{i*4}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </HalftoneBox>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 flex justify-between items-center text-[11px] font-bold">
          <div className="flex gap-8">
            <span className="tracking-[0.3em]">RECURSION_LEVEL: 05</span>
            <span className="opacity-50 tracking-[0.3em]">FRAG_STATE: 91%</span>
          </div>
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span>X_AXIS_LOCKED</span>
          </div>
        </div>
      </div>

      <RGBShift>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 translate-x-[2px]" />
      </RGBShift>
    </main>
  );
}
