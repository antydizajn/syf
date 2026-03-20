'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const TerminalWindow: React.FC<{ children: React.ReactNode; title?: string; className?: string }> = ({ 
  children, 
  title = 'TERMINAL_01',
  className = ''
}) => {
  return (
    <div className={`border border-white/20 bg-[#050505] shadow-2xl overflow-hidden flex flex-col h-full w-full ${className}`}>
      <div className="bg-white/10 px-4 py-1 flex justify-between items-center border-b border-white/10 flex-shrink-0">
        <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">{title}</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed text-white/80 overflow-y-auto flex-grow custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
