'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import { TypographyGuardian } from '@/components/TypographyGuardian';
import { initConsoleFlex } from '@/lib/consoleFlex';
import { initTypographyGuardian } from '@/lib/typographyGuardian';

interface HUDLayoutProps {
  children: React.ReactNode;
}

export default function HUDLayout({ children }: HUDLayoutProps) {
  useEffect(() => {
    // CRITICAL: CONSOLE_FLEX - ZAKAZ USUWANIA (USER RULES)
    initConsoleFlex();
    initTypographyGuardian();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-void-black text-white relative overflow-hidden coordinate-grid selection:bg-radioactive/30">
      
      {/* MAIN CONTENT SURFACE: ONE SURFACE DESIGN */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
         <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
         
         <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-20 relative min-h-full flex flex-col">
            <AnimatePresence>
               <motion.div 
                 key="content-root"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.1, ease: 'linear' }}
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

         <Footer />
      </main>
    </div>
  );
}

function ClientViewport() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span>VIEW_PORT: CALC...</span>;
  return <span>VIEW_PORT: {window.innerWidth}x{window.innerHeight}</span>;
}
