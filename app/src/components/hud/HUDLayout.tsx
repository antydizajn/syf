import React from 'react';
import Footer from '@/components/Footer';
import { HUDDecorations } from '@/components/hud/HUDDecorations';

interface HUDLayoutProps {
  children: React.ReactNode;
}

export default function HUDLayout({ children }: HUDLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col text-white relative overflow-hidden coordinate-grid selection:bg-radioactive/30">
      <HUDDecorations />
      
      {/* MAIN CONTENT SURFACE: ONE SURFACE DESIGN */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
         <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
         
         <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-20 relative min-h-full flex flex-col">
             <div className="flex-1 font-mono text-zinc-300 leading-relaxed selection:bg-radioactive selection:text-black relative z-10">
                {children}
             </div>
         </div>

         <Footer />
      </main>
    </div>
  );
}
