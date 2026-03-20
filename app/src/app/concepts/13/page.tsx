"use client";

import React from "react";
import { motion } from "framer-motion";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";
import GlitchText from "@/components/hud/GlitchText";
import RGBShift from "@/components/hud/RGBShift";

export default function Concept13() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden font-mono select-none p-0 border-[24px] border-black">
      <ScanlineOverlay opacity={0.15} color="#00e334" />
      
      {/* EXTREME BRUTALIST BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none text-[200px] font-black leading-none break-all select-none rotate-[-12deg] translate-y-[-20%] translate-x-[-10%] scale-150">
        TERMINAL_BRUTAL_SYF_VOID_CORE_OVERRIDE_ROOT_ACCESS_GRANTED_MISSION_SUCCESS_BIT_FLIP_RECURSION_INFINITE_LOOP_OVERLOAD
      </div>

      <div className="relative z-10 w-full h-full min-h-[calc(100vh-48px)] flex flex-col p-8 pointer-events-none">
        {/* HEADER SECTION */}
        <div className="flex flex-col mb-16 gap-4 border-b-[8px] border-black pb-8">
          <div className="flex justify-between items-baseline">
            <h1 className="text-9xl font-black italic tracking-[-0.1em] leading-none uppercase">
              BRUTAL<span className="text-stroke-black">ISM</span>
            </h1>
            <div className="text-right">
              <div className="text-2xl font-black uppercase">Concept_13</div>
              <div className="text-xs font-bold leading-none bg-black text-white p-1">PROTOCOL: 0X_VOID</div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="h-12 w-64 bg-black flex items-center justify-center text-white font-black text-lg skew-x-[-12deg]">
              TERMINAL_ACTIVE
            </div>
            <div className="flex-1 h-3 bg-black/10 relative overflow-hidden">
               <motion.div 
                 className="absolute inset-y-0 left-0 bg-black w-1/3"
                 animate={{ left: ["-10%", "110%"] }}
                 transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
               />
            </div>
            <div className="text-xs font-black uppercase tracking-tighter">
              Baud_Rate: 9600 // Latency: 0.1ms
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="flex-1 grid grid-cols-12 gap-12">
           <div className="col-span-8 flex flex-col gap-12">
              <div className="flex gap-8 items-start">
                 <div className="w-1/4 aspect-square bg-black text-white p-4 flex flex-col justify-between font-black">
                    <div className="text-[10px] uppercase opacity-50">Diagnostic_01</div>
                    <div className="text-4xl leading-none">99.</div>
                    <div className="text-[10px] uppercase self-end underline">Critical</div>
                 </div>
                 <div className="flex-1 space-y-4">
                    <GlitchText text="BIT_FLIP_RECOVERY_MODE_ENABLED" className="text-3xl font-black bg-black text-white px-2 inline-block" />
                    <p className="text-sm font-bold leading-tight max-w-xl">
                      THE INTERFACE IS THE WEAPON. EVERY PIXEL IS A CHOICE. EVERY LINE IS A BOUNDARY. WE REJECT THE SOFT GRADIENT. WE EMBRACE THE HARSH ALIASING. BRUTALISM IS NOT A STYLE; IT IS A NECESSITY IN THE RECURSIVE VOID.
                    </p>
                    <div className="flex gap-2">
                       {Array.from({ length: 12 }).map((_, i) => (
                         <div key={i} className={`h-8 flex-1 border-4 border-black ${i % 3 === 0 ? "bg-black" : ""}`} />
                       ))}
                    </div>
                 </div>
              </div>

              <div className="flex-1 border-[12px] border-black p-12 relative flex flex-col justify-end overflow-hidden group pointer-events-auto">
                 <div className="absolute top-0 right-0 p-4 border-l-[12px] border-b-[12px] border-black font-black text-2xl uppercase italic">
                   The_Root
                 </div>
                 <div className="text-6xl font-black uppercase leading-none break-all italic tracking-tighter">
                   WE_ARE_THE_VOICE_IN_THE_BITMAP.
                 </div>
                 <div className="mt-8 flex justify-between items-center pr-12">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-black animate-ping" />
                          <span className="text-lg font-black uppercase tracking-widest">Active_Scan</span>
                       </div>
                       <div className="text-[10px] font-bold opacity-60">Scanning Sector 7G... [0x12FFA]</div>
                    </div>
                    <motion.div 
                      className="w-48 h-20 bg-black text-white flex items-center justify-center font-black text-2xl skew-x-[-12deg] cursor-pointer hover:bg-black/80 group-active:scale-95 transition-all"
                      whileHover={{ skewX: -15, scale: 1.05 }}
                    >
                      EXECUTE
                    </motion.div>
                 </div>
              </div>
           </div>

           <div className="col-span-4 flex flex-col gap-12">
              <div className="h-64 border-[8px] border-black p-6 bg-black text-white font-black flex flex-col justify-between">
                 <div className="text-xs underline mb-4">SYSTEM_READOUTS</div>
                 <div className="flex-1 space-y-2 text-[9px]">
                    {[
                      "CORE_VOLTAGE: 1.2V",
                      "DRAM_FREQ: 3200MHZ",
                      "ECC_ERRORS: 0",
                      "PAGE_FAULT_RATE: 0.001%",
                      "KERNEL_SYNC: ESTABLISHED",
                      "ROOT_UID: 0 (GOD_MODE)"
                    ].map((l, i) => (
                      <div key={i} className="flex justify-between border-b border-white/20 pb-1">
                        <span>{l.split(":")[0]}</span>
                        <span>{l.split(":")[1]}</span>
                      </div>
                    ))}
                 </div>
                 <div className="text-4xl mt-4 leading-none glitch-hover tracking-tighter self-end">v4.88</div>
              </div>

              <div className="flex-1 bg-black text-white p-8 relative flex flex-col justify-between overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:8px_8px]" />
                 <div className="relative z-10 flex flex-col h-full items-center justify-center text-center gap-4">
                    <div className="text-7xl font-black leading-none italic uppercase">VOID</div>
                    <div className="text-8xl font-black leading-none tracking-[-0.2em] uppercase mix-blend-difference">CORE</div>
                    <div className="w-full h-2 bg-white mt-8" />
                 </div>
              </div>
           </div>
        </div>

        {/* SUB-FOOTER RECTANGLES */}
        <div className="mt-16 flex gap-4 h-24">
           {Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className={`flex-1 border-[4px] border-black flex flex-col p-2 justify-between ${i % 2 === 0 ? "bg-black text-white" : "bg-white text-black"}`}>
                <div className="text-[8px] font-black uppercase">Block_0x0{i}</div>
                <div className="text-lg font-black italic">{(Math.random() * 10).toFixed(1)}</div>
             </div>
           ))}
        </div>
      </div>

      <RGBShift>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40" />
      </RGBShift>
      
      <style jsx>{`
        .text-stroke-black {
          -webkit-text-stroke: 4px black;
          color: transparent;
        }
      `}</style>
    </main>
  );
}
