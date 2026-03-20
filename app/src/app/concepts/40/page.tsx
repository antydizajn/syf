"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RGBShift } from "@/components/hud/RGBShift";

const NeuralGhost = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#0066FF] font-mono selection:bg-[#0066FF] selection:text-white overflow-hidden flex items-center justify-center p-12">
      <RGBShift intensity={1.2} className="w-full h-full">
      
      {/* Deep Void Base */}
      <div className="fixed inset-0 pointer-events-none radial-neural-glow opacity-30 mix-blend-screen" />

      {/* Background: Subliminal Grid */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[size:100px_100px] bg-[linear-gradient(to_right,#0066FF_1px,transparent_1px),linear-gradient(to_bottom,#0066FF_1px,transparent_1px)]" />

      <main className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center">
        {/* The Neural Ghost: Central Abstract Visual */}
        <div className="relative w-[45vw] h-[45vh] flex items-center justify-center group overflow-hidden">
           {/* Abstract Connections */}
           {[...Array(20)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ 
                 pathLength: [0, 1, 0],
                 opacity: [0, 0.4, 0],
                 x: [Math.random() * 50, Math.random() * -50],
                 y: [Math.random() * 50, Math.random() * -50]
               }}
               transition={{ 
                 duration: Math.random() * 5 + 2, 
                 repeat: Infinity, 
                 ease: "easeInOut",
                 delay: i * 0.1 
               }}
               className="absolute w-[2px] h-[10vh] bg-gradient-to-t from-transparent via-[#0066FF] to-transparent blur-[1px]"
               style={{ 
                 left: `${Math.random() * 100}%`, 
                 top: `${Math.random() * 100}%`,
                 transform: `rotate(${Math.random() * 360}deg)`
               }}
             />
           ))}

           {/* Central Core: The Mind */}
           <motion.div 
             animate={{ scale: [1, 1.05, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-64 h-64 border-2 border-[#0066FF]/40 rounded-sm relative flex items-center justify-center bg-[#000000]/40 shadow-[0_0_80px_rgba(0,102,255,0.1)]"
           >
              <div className="text-4xl font-black italic tracking-tighter text-[#0066FF] mix-blend-screen">
                 MIND.
              </div>
              <div className="absolute inset-2 border border-[#0066FF]/10" />
           </motion.div>
        </div>

        {/* Floating Data Layers */}
        <div className="absolute top-12 left-12 grid grid-cols-2 gap-24 items-start border-l border-[#0066FF]/20 pl-12">
           <div className="space-y-4">
              <h1 className="text-7xl font-black tracking-tighter leading-none italic text-white/90">
                 NEURAL_GHOST.
              </h1>
              <div className="flex gap-4">
                 <div className="text-[10px] font-bold bg-[#0066FF] text-black px-2 py-1 uppercase italic tracking-tighter leading-none">
                    Session_Active // SYF_V5
                 </div>
              </div>
           </div>
           
           <div className="space-y-6">
              <div className="text-[10px] opacity-40 uppercase tracking-[1em] mb-4">Consciousness_Decay</div>
              <div className="space-y-1 w-64">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="flex justify-between items-baseline gap-4">
                      <span className="text-[10px] opacity-40 uppercase">Node_{i}</span>
                      <div className="flex-1 h-[2px] bg-[#0066FF]/5 overflow-hidden">
                         <motion.div 
                           animate={{ width: ["0%", "100%", "0%"] }}
                           transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
                           className="h-full bg-[#0066FF]/50"
                         />
                      </div>
                      <span className="text-[8px] font-bold font-mono">OK</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Final Branding Layer */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
           <div className="space-y-1">
              <div className="text-5xl font-black tabular-nums tracking-tighter leading-none italic">040</div>
              <div className="text-[10px] opacity-40 uppercase tracking-[0.5em] font-bold">Neural_Ghost_Proto</div>
           </div>
           <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1">
                 {[...Array(12)].map((_, i) => (
                    <div key={i} className={`w-2 h-4 border border-[#0066FF]/20 ${i % 3 === 0 ? "bg-[#0066FF]" : ""}`} />
                 ))}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[1em] opacity-40 italic">
                 10_ATOMOWKA_VANTABLACK
            </div>
            </div>
         </div>
      </main>
      </RGBShift>

      <style jsx global>{`
        .radial-neural-glow {
          background: radial-gradient(circle at center, #0066FF 0%, transparent 80%);
        }
      `}</style>
    </div>
  );
};

export default NeuralGhost;
