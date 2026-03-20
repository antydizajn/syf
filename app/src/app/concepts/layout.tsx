'use client';

import React from 'react';
import { ScanlineOverlay } from '@/components/hud/ScanlineOverlay';

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-neon-green selection:text-black overflow-hidden font-mono">
      {/* Noise / Grain Overlay - THE SOUL OF THE HUD */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" aria-hidden="true" />
      
      {/* Dynamic Glow Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-red/5 pointer-events-none" aria-hidden="true" />
      
      {/* SCANLINES */}
      <ScanlineOverlay />
      
      <main id="main-content" className="relative z-10 w-full h-screen overflow-hidden">
        {children}
      </main>
      
      {/* HUD VIGNETTE */}
      <div className="fixed inset-0 pointer-events-none z-40 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" aria-hidden="true" />
    </div>
  );
}
