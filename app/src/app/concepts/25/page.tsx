"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";

const BiometricScan = () => {
  const [mounted, setMounted] = useState(false);
  const [heartRate, setHeartRate] = useState(72);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setHeartRate(prev => Math.floor(70 + Math.random() * 15));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#020802] text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-[#020802] overflow-hidden p-12">
      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">
         {/* Top Header */}
         <div className="flex justify-between items-end border-b border-[#00ff41]/40 pb-6">
            <h1 className="text-4xl font-black italic tracking-tighter">BIOMETRIC_LINK_v8</h1>
            <div className="text-right text-xs opacity-60">
               <div>SUBJECT: ALPHA_G_6</div>
               <div>STATUS: STABLE_RECOVERY</div>
            </div>
         </div>

         <div className="grid grid-cols-12 gap-12 items-center">
            {/* DNA Sequence Column */}
            <div className="col-span-3 space-y-4">
               <div className="text-xs opacity-40 uppercase tracking-widest">DNA_SEQ_REPLICATING</div>
               <div className="h-[60vh] border border-[#00ff41]/20 p-2 flex flex-col justify-between overflow-hidden">
                  {[...Array(40)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.1, 1, 0.1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                      className="flex justify-between text-[8px]"
                    >
                      <span>{Math.random().toString(36).substring(7).toUpperCase()}</span>
                      <span className="opacity-40">::</span>
                      <span>{Math.random().toString(36).substring(7).toUpperCase()}</span>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Neural Matrix Center */}
            <div className="col-span-6 relative flex flex-col items-center">
               <div className="relative w-80 h-80 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[0.5px] border-[#00ff41]/20 rounded-full"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="text-center"
                  >
                    <div className="text-6xl font-black">{heartRate}</div>
                    <div className="text-[10px] tracking-widest opacity-60">BPM_SYNC</div>
                  </motion.div>

                  {/* Reactive Heart Wave */}
                  <div className="absolute inset-x-[-50px] bottom-0 h-24 overflow-hidden pointer-events-none opacity-40">
                    <svg viewBox="0 0 100 20" className="w-full h-full stroke-[#00ff41] fill-none stroke-[0.5]">
                       <motion.path 
                         animate={{ d: [
                           "M 0,10 Q 10,10 15,10 T 20,5 T 25,10 T 30,15 T 35,10 T 40,10 T 45,-5 T 50,15 T 55,10 L 100,10",
                           "M 0,10 Q 10,10 15,10 T 20,4 T 25,10 T 30,16 T 35,10 T 40,10 T 45,-8 T 50,18 T 55,10 L 100,10"
                         ] }}
                         transition={{ duration: 0.6, repeat: Infinity }}
                       />
                    </svg>
                  </div>
               </div>

               <div className="mt-12 bg-[#00ff41]/5 border border-[#00ff41]/20 p-6 w-full text-center">
                  <div className="text-[10px] opacity-40 mb-2 uppercase tracking-[1em]">Neural_Interface_Load</div>
                  <div className="grid grid-cols-10 gap-1 h-2">
                     {[...Array(10)].map((_, i) => (
                       <motion.div 
                         key={i}
                         animate={{ backgroundColor: ["#00ff411a", "#00ff4166", "#00ff411a"] }}
                         transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                         className="h-full rounded-sm"
                       />
                     ))}
                  </div>
               </div>
            </div>

            {/* Vitals Feed */}
            <div className="col-span-3 space-y-12">
               {[
                 { label: "OXYGEN_SAT", val: "98.8%", trend: "STABLE" },
                 { label: "BODY_TEMP", val: "36.6C", trend: "NORMAL" },
                 { label: "BP_SYS_DIA", val: "120 / 80", trend: "NOMINAL" },
                 { label: "PULSE_LOCK", val: "TRUE", trend: "SYNCED" },
               ].map((stat, i) => (
                 <div key={i} className="border-l border-[#00ff41]/20 pl-4 py-1">
                    <div className="text-[10px] opacity-40 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-2xl font-black">{stat.val}</div>
                    <div className="text-[8px] mt-1 opacity-60">STATUS: {stat.trend}</div>
                 </div>
               ))}
            </div>
         </div>
      </main>

      <ScanlineOverlay opacity={0.15} color="#00ffff" />
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </div>
  );
};

export default BiometricScan;
