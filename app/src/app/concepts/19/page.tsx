"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";

const OpticalFlow = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-[#000] text-[#fff] font-sans selection:bg-[#fff] selection:text-[#000] overflow-x-hidden">
      {/* Liquid Background Warp */}
      <motion.div 
        style={{ scale: backgroundScale }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black blur-[120px]" />
        <motion.div 
          animate={{
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] bg-blue-500/10 blur-[100px]"
        />
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative text-center">
            <motion.h1 
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "0.2em", opacity: 1 }}
              transition={{ duration: 2, ease: "circOut" }}
              className="text-7xl md:text-9xl font-thin tracking-[0.2em] mix-blend-difference"
            >
              VOID
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.4 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-4 text-sm uppercase tracking-[1.5em] font-light"
            >
              Optical_Flow_State
            </motion.p>

            {/* Kinetic Markers */}
            <div className="absolute -inset-20 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute -inset-40 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>
      </motion.div>

      {/* Narrative Sections */}
      <div className="relative z-20 space-y-[100vh]">
        {[
          { title: "PERCEPTION", desc: "The boundary between reality and signal." },
          { title: "ENTROPY", desc: "Order dissipates into the void." },
          { title: "FLUIDITY", desc: "Interface as liquid architecture." },
        ].map((section, i) => (
          <section key={i} className="h-screen flex items-center justify-center px-8">
            <div className="max-w-xl text-center space-y-6">
              <h2 className="text-4xl font-extralight tracking-widest text-white/80">{section.title}</h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
              <p className="text-white/40 font-light leading-relaxed tracking-wider italic">
                {section.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Minimal HUD Overlays */}
      <div className="fixed top-12 left-12 z-50 mix-blend-difference opacity-50">
        <div className="text-[10px] font-mono tracking-tighter space-y-1">
          <div>FLOW_0.98.2</div>
          <div>DEPTH_LOCK: ACTIVE</div>
          <div className="flex gap-1 pt-2">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: [2, 8, 2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-0.5 bg-white"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 right-12 z-50 text-[10px] font-mono tracking-[0.5em] opacity-30 mix-blend-difference">
        SYF_SYSTEM_CORE // v4.0.0
      </div>

      <ScanlineOverlay opacity={0.05} />
    </div>
  );
};

export default OpticalFlow;
