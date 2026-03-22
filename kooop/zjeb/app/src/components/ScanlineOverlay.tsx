"use client";

import React, { useEffect } from "react";
import { initConsoleFlex } from "@/lib/consoleFlex";
import { initTypographyGuardian } from "@/lib/typographyGuardian";
import { useGlitchStore } from "@/store/useGlitchStore";

export const ScanlineOverlay: React.FC = () => {
  const { isGlitching, intensity } = useGlitchStore();

  useEffect(() => {
    initConsoleFlex();
    initTypographyGuardian();
  }, []);

  return (
    <>
      <svg className="fixed inset-0 pointer-events-none opacity-0" aria-hidden="true">
        <filter id="crt-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency={isGlitching ? 0.05 * intensity : 0.001} 
            numOctaves="1" 
            result="noise" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={isGlitching ? 20 * intensity : 0} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      <div 
        className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isGlitching ? 'opacity-30' : 'opacity-10'}`}
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.4) 2px)",
          backgroundSize: "100% 3px",
        }}
        aria-hidden="true"
      />
      
      {/* Moving scanline beam */}
      <div 
        className="fixed inset-x-0 h-[100px] bg-white/5 pointer-events-none z-[9998] mix-blend-overlay"
        style={{
          animation: "scanline 8s linear infinite",
          top: "-100px"
        }}
      />
    </>
  );
};
