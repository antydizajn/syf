'use client';

import React from 'react';

export const ScanlineOverlay: React.FC<{ opacity?: number; color?: string }> = ({ 
  opacity = 0.1, 
  color = "rgba(18,16,16,0)" 
}) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden"
      style={{ opacity }}
    >
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" 
      />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(32,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_20vh] animate-scanline" />
    </div>
  );
};

export default ScanlineOverlay;
