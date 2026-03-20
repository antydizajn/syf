"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";

const MoebiusGrid = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#fff] font-sans selection:bg-[#fff] selection:text-[#000] overflow-hidden flex items-center justify-center">
      {/* Endless Topology Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] z-10" />
        <motion.div 
          animate={{
            rotateX: [60, 70, 60],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-[200vw] h-[200vw] absolute top-[-50vw] left-[-50vw] opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            perspective: '1000px',
          }}
        />
      </div>

      {/* Impossible Central Element */}
      <main className="relative z-20 flex flex-col items-center">
        <div className="relative w-96 h-96 mb-12">
           {/* Triangle Loop (Escher-ish) */}
           {[0, 120, 240].map((rotate, i) => (
             <motion.div
               key={i}
               initial={{ rotate }}
               animate={{ rotate: rotate + 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 flex items-center justify-center"
             >
                <div className="w-1 h-64 bg-gradient-to-b from-white/80 to-transparent blur-[0.5px]" 
                     style={{ transform: `translateX(32px) translateY(-32px) rotate(30deg)` }} />
             </motion.div>
           ))}

           <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <h1 className="text-4xl font-extralight tracking-[1.5em] translate-x-[0.75em]">
                  SYF
                </h1>
                <div className="h-px w-48 bg-white/20 my-4" />
                <p className="text-[10px] uppercase tracking-[2em] translate-x-[1em] opacity-40">
                  TOPOLOGY_VOID
                </p>
              </motion.div>
           </div>
        </div>

        {/* Diagnostic Rings */}
        <div className="grid grid-cols-2 gap-24 font-mono text-[9px] uppercase tracking-[0.3em] opacity-40">
          <div className="space-y-4">
             <div className="flex border-l border-white/20 pl-4 py-1">
                <span className="opacity-40 mr-4">CURVATURE:</span>
                <span className="text-white/80">INFINITE</span>
             </div>
             <div className="flex border-l border-white/20 pl-4 py-1">
                <span className="opacity-40 mr-4">DIMENSION:</span>
                <span className="text-white/80">3.5D+</span>
             </div>
          </div>
          <div className="space-y-4">
             <div className="flex border-r border-white/20 pr-4 py-1 justify-end text-right">
                <span className="text-white/80 mr-4">RECURSIVE</span>
                <span className="opacity-40">PROCESS:</span>
             </div>
             <div className="flex border-r border-white/20 pr-4 py-1 justify-end text-right">
                <span className="text-white/80 mr-4">NORM-ZERO</span>
                <span className="opacity-40">STATE:</span>
             </div>
          </div>
        </div>
      </main>

      {/* Perspective Warp Elements */}
      <div className="fixed inset-0 pointer-events-none z-10 ring-[100px] ring-black/80 blur-[80px]" />
      
      {/* Corner Readouts */}
      <div className="fixed top-8 left-8 text-[8px] font-mono opacity-20 flex gap-12">
        <div className="flex flex-col gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-1">
               {[...Array(20)].map((_, j) => (
                 <motion.div 
                   key={j}
                   animate={{ opacity: [0.1, 0.8, 0.1] }}
                   transition={{ duration: 2, repeat: Infinity, delay: (i + j) * 0.1 }}
                   className="w-1 h-1 bg-white" 
                 />
               ))}
            </div>
          ))}
        </div>
      </div>

      <ScanlineOverlay opacity={0.03} />
    </div>
  );
};

export default MoebiusGrid;
