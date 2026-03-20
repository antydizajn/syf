'use client';

import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  blur?: string;
  opacity?: string;
  title?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ 
  children, 
  className = '', 
  blur = 'backdrop-blur-2xl',
  opacity = 'bg-white/[0.03]',
  title
}) => {
  return (
    <div className={`relative overflow-hidden border border-white/10 ${opacity} ${blur} shadow-2xl ${className}`}>
      {/* INNER GLOW / REFLECTION */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none opacity-50" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {title && (
        <div className="px-4 py-1.5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{title}</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white/10" />
            <div className="w-1 h-1 bg-white/10" />
          </div>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
