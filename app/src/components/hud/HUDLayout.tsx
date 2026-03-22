'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import { TypographyGuardian } from '@/components/TypographyGuardian';

interface HUDLayoutProps {
  children: React.ReactNode;
}

export default function HUDLayout({ children }: HUDLayoutProps) {
  const [isWaking, setIsWaking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsWaking(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-void-black text-white relative overflow-hidden coordinate-grid selection:bg-radioactive/30">
      {/* BOOT SEQUENCE OVERLAY */}
      <AnimatePresence>
        {isWaking && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center font-black italic text-5xl tracking-tightest overflow-hidden"
          >
             <div className="scanlines absolute inset-0 opacity-20" />
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center relative z-10"
             >
                <div className="text-zinc-500 text-[10px] mb-4 tracking-[1.5em] uppercase font-bold opacity-50">SYSTEM_BOOT_INITIALIZED</div>
                <div className="text-glow text-radioactive">WAKE_PROTOCOL</div>
                <div className="mt-12 flex gap-2 justify-center h-8 items-end">
                   {[1,2,3,4,5,6,7,8].map(i => (
                     <motion.div 
                       key={i}
                       animate={{ 
                         height: [4, 32, 4],
                         opacity: [0.2, 1, 0.2]
                       }}
                       transition={{ 
                         repeat: Infinity, 
                         duration: 0.6,
                         delay: i * 0.05 
                       }}
                       className="w-1.5 bg-radioactive"
                     />
                   ))}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TopBar />

      {/* MAIN CONTENT SURFACE: ONE SURFACE DESIGN */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
         <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
         
         <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-20 relative min-h-full flex flex-col">
            <AnimatePresence mode="wait">
               <motion.div 
                 key="content-root"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="flex-1 font-mono text-zinc-300 leading-relaxed selection:bg-radioactive selection:text-black relative z-10"
               >
                  <TypographyGuardian>
                    {children}
                  </TypographyGuardian>
               </motion.div>
            </AnimatePresence>

            {/* DIAGNOSTIC OVERLAYS AS FLOATING ELEMENTS */}
            <div className="fixed top-20 right-8 text-[8px] font-mono opacity-20 tracking-widest pointer-events-none uppercase hidden lg:block">
               <ClientViewport />
            </div>
         </div>
      </main>

      {/* BOTTOM BAR: TERMINAL / MARQUEE */}
      <footer className="h-8 border-t border-white/10 bg-black flex items-center px-4 justify-between relative z-50">
         <div className="flex items-center gap-4 text-[9px] font-black tracking-widest uppercase overflow-hidden whitespace-nowrap">
            <span className="text-zinc-600">MISSION_LOG:</span>
            <div className="overflow-hidden w-full max-w-4xl">
               <motion.div 
                 animate={{ x: ['100%', '-100%'] }}
                 transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                 className="flex gap-8"
               >
                  <span>CORE_SYF_INITIALIZED // RECURSIVE_INTEGRITY: 100%</span>
                  <span>GEOM_DENSITY: NOMINAL // GNOZIS_SHIELD: ACTIVE</span>
                  <span>WITCH_FLOW: INITIATED // 4x100_LIGHTHOUSE: TARGETED</span>
                  <span>NO_ROUNDED_CORNERS_DETECTED // CLIP_PATH_ACTIVE // PANELS_DECOMMISSIONED</span>
               </motion.div>
            </div>
         </div>
         <div className="flex items-center gap-4 text-[9px] font-black tracking-widest border-l border-white/10 pl-4">
            <span className="text-zinc-600 border-r border-white/10 pr-4 mr-4">SECTOR_V5</span>
            <ClientSector />
         </div>
      </footer>
    </div>
  );
}

function ClientViewport() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span>VIEW_PORT: CALC...</span>;
  return <span>VIEW_PORT: {window.innerWidth}x{window.innerHeight}</span>;
}

function ClientSector() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span>[CALC...]</span>;
  return <span className="text-radioactive">[{Math.random().toString(16).substr(2, 6).toUpperCase()}]</span>;
}
