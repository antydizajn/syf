"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DitherFilter } from "@/components/hud/DitherFilter";

const RedactedLogs = () => {
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const newLine = `[${new Date().toISOString().split('T')[1].slice(0, 8)}] ${Math.random().toString(36).substring(7).toUpperCase()} // ${Math.random() > 0.5 ? "REDACTED" : "STABLE_LINK"}`;
      setLogs(prev => [newLine, ...prev].slice(0, 50));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white overflow-hidden p-12">
      <DitherFilter />
      
      {/* 1-Bit Overlay (Noise) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-multiply" />

      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-[85vh]">
        {/* Header: Editorial Style */}
        <div className="flex justify-between items-baseline border-b-4 border-black pb-8">
           <div className="space-y-2">
              <h1 className="text-[12rem] font-black tracking-tighter leading-[0.8] mix-blend-difference">
                 REDACTED
              </h1>
              <div className="flex gap-4 items-center">
                 <div className="px-4 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest">
                    Pillar_05 // SYF_V5
                 </div>
                 <div className="text-[10px] opacity-40 uppercase tracking-[0.5em]">
                    Direction: 1-Bit Brutalism
                 </div>
              </div>
           </div>
           
           <div className="text-right space-y-1">
              <div className="text-4xl font-black italic">30/10</div>
              <div className="text-[8px] opacity-40 uppercase">Aesthetic_Intensity_Level</div>
           </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-12 gap-12 mt-12 flex-1 overflow-hidden">
           {/* Left Sidebar: Diagnostic Coordinates */}
           <div className="col-span-3 border-r border-black/10 pr-8 space-y-12">
              <div className="space-y-4">
                 <div className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1 inline-block">
                    CORE_LOCATOR
                 </div>
                 <div className="text-4xl font-black tabular-nums tracking-tighter">
                    52.2297<br/>21.0122
                 </div>
              </div>

              <div className="space-y-2">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="flex justify-between text-[10px] border-b border-black/10 pb-1">
                      <span className="opacity-40 uppercase">Index_{i.toString().padStart(2, '0')}</span>
                      <span className="font-bold">OK_STABLE</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Center Column: Rapid Log Feed */}
           <div className="col-span-6 border-x border-black/10 px-8 relative">
              <div className="text-[10px] opacity-40 mb-4 uppercase tracking-[1em]">Log_Stream_v1.0.8</div>
              <div className="h-full overflow-hidden flex flex-col gap-1">
                 {logs.map((log, i) => (
                   <motion.div 
                     key={log + i}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     className={`text-[9px] font-mono p-1 ${i === 0 ? "bg-black text-white font-bold" : "text-black"}`}
                   >
                      {log}
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* Right Column: Visual Art Pieces */}
           <div className="col-span-3 pl-8 flex flex-col gap-12">
              <div className="aspect-square border-2 border-black relative overflow-hidden flex items-center justify-center p-4">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="w-full h-full border border-black rounded-sm relative"
                 >
                    <div className="absolute inset-0 border border-black rotate-45 scale-75" />
                    <div className="absolute inset-0 border border-black -rotate-45 scale-50" />
                 </motion.div>
                 <div className="absolute bottom-2 right-2 text-[8px] font-bold">FIG_01: ENTROPY</div>
              </div>

              <div className="space-y-6">
                 <div className="text-xs font-bold border-b-2 border-black pb-2">SYSTEM_INTEGRITY</div>
                 <div className="space-y-4">
                    {[
                      { label: "Gnosis", val: 94 },
                      { label: "Neural", val: 12 },
                      { label: "Spectral", val: 88 },
                    ].map((s, i) => (
                      <div key={i} className="space-y-1">
                         <div className="flex justify-between text-[9px]">
                            <span>{s.label}</span>
                            <span>{s.val}%</span>
                         </div>
                         <div className="h-1 bg-black/10 w-full">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${s.val}%` }}
                              className="h-full bg-black"
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Floating Meta */}
      <div className="fixed bottom-12 left-12 transform -rotate-90 origin-left text-[8px] opacity-20 tracking-[1em] uppercase">
         SYF_PROTOCOL // NO_PLACEHOLDERS_DETECTED
      </div>
    </div>
  );
};

export default RedactedLogs;
