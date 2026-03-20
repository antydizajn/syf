"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";

const SignalTrace = () => {
  const [mounted, setMounted] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState("0x000000");

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setEncryptionKey(`0x${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase()}`);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#050f05] text-[#00e334] font-mono selection:bg-[#00e334] selection:text-[#050f05] overflow-hidden flex flex-col p-12">
      <main className="relative z-10 w-full flex-1 flex flex-col gap-8">
        {/* Spectral Analyzer Top Bar */}
        <div className="h-64 border border-[#00e334]/20 bg-black/40 relative overflow-hidden flex items-end px-4 pb-4">
           <div className="absolute top-4 left-4 text-[10px] opacity-60 flex gap-12">
              <div>SIGNAL_TRACE // SECTOR_G</div>
              <div>SPECTRAL_LOCK: 4.88 GHz</div>
           </div>
           
           <div className="flex-1 flex items-end gap-[2px] h-full pt-16">
              {[...Array(120)].map((_, i) => (
                 <motion.div 
                    key={i}
                    animate={{ 
                      height: [`${Math.random() * 20}%`, `${Math.random() * 90}%`, `${Math.random() * 20}%`],
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.005 }}
                    className="flex-1 bg-[#00e334]/60"
                 />
              ))}
           </div>
        </div>

        <div className="grid grid-cols-12 gap-8 flex-1">
          {/* Key Decryption Panel */}
          <div className="col-span-4 border border-[#00e334]/30 p-6 flex flex-col justify-between bg-black/20">
             <div className="space-y-4">
               <div className="text-xs opacity-40 tracking-[0.5em] uppercase">Encryption_Crack_Loop</div>
               <div className="text-4xl font-black tabular-nums tracking-tighter">
                  {encryptionKey}
               </div>
               <div className="h-1 w-full bg-[#00e334]/10 overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/4 bg-[#00e334]" 
                  />
               </div>
             </div>

             <div className="space-y-2 opacity-60 text-[10px]">
                <div>ALGORITHM: OMEGA_CIPHER_v4</div>
                <div>STATE: BRUTE_FORCE_ACTIVE</div>
                <div>TIME_ELAPSED: 00:04:12:88</div>
             </div>
          </div>

          {/* Waveform Distortion Center */}
          <div className="col-span-8 border border-[#00e334]/30 bg-black/20 p-8 relative overflow-hidden group">
             <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="w-[150%] h-[150%] border-4 border-dashed border-[#00e334] rounded-full"
                />
             </div>

             <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                   <div className="text-5xl font-black italic mix-blend-difference tracking-tighter">SIG_DISTORT_X</div>
                   <div className="w-32 border border-[#00e334] p-2 text-center text-[10px] font-bold">ALPHA_SECURE</div>
                </div>

                {/* Animated Waveform SVG */}
                <div className="h-48 w-full border-y border-[#00e334]/10 flex items-center">
                   <svg viewBox="0 0 1000 100" className="w-full h-24 stroke-[#00e334] fill-none stroke-[2]">
                      <motion.path 
                        animate={{ 
                          d: [
                            "M0 50 Q 100 0, 200 50 T 400 50 T 600 50 T 800 50 T 1000 50",
                            "M0 50 Q 100 100, 200 50 T 400 50 T 600 50 T 800 50 T 1000 50"
                          ] 
                        }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="opacity-40"
                      />
                      <motion.path 
                        animate={{ 
                          d: [
                            "M0 50 Q 50 20, 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50 T 450 50 T 500 50 T 550 50 T 600 50 T 650 50 T 700 50 T 750 50 T 800 50 T 850 50 T 900 50 T 950 50 T 1000 50",
                            "M0 50 Q 50 80, 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50 T 450 50 T 500 50 T 550 50 T 600 50 T 650 50 T 700 50 T 750 50 T 800 50 T 850 50 T 900 50 T 950 50 T 1000 50"
                          ] 
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="opacity-80"
                      />
                   </svg>
                </div>

                <div className="grid grid-cols-4 gap-4">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="text-center font-mono text-[9px] border border-[#00e334]/40 py-2">
                        BAND_{i+1}_LINK_OK
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Extreme Low-Alpha Overlays */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-tr from-[#00e334]/5 to-transparent z-40" />
      <ScanlineOverlay opacity={0.15} color="#00e334" />
      
      {/* HUD Corner Readouts */}
      <div className="fixed bottom-4 left-4 text-[8px] opacity-40 tracking-widest uppercase">
         PROTOCOL: OMEGA_TRACE_V4 // SYF_SYSTEM_KERNEL
      </div>
    </div>
  );
};

export default SignalTrace;
