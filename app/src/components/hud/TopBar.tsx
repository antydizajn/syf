'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TopBar() {
  const [time, setTime] = useState('');
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pl-PL', { hour12: false }));
      setMemory(Math.floor(Math.random() * (98 - 74) + 74));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 w-full flex items-center justify-between px-6 border-b border-white/10 bg-black/40 backdrop-blur-md relative z-50">
      <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">SYSTEM:</span>
          <span className="text-white">SYF_V5.0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">STATUS:</span>
          <span className="text-radioactive animate-pulse">STABLE_FLOW</span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 h-full flex items-center">
        <div className="hud-panel px-8 py-1 flex items-center gap-4 text-xs font-black tracking-widest text-white">
           <span className="opacity-50 text-[10px]">TIME_SYNC:</span>
           <span suppressHydrationWarning>{time || 'CALCULATING...'}</span>
        </div>
      </div>

      <div className="flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase">
        <div className="flex flex-col items-end">
          <span className="text-zinc-500 text-[8px]">MEMORY_LOAD</span>
          <div className="flex items-center gap-2">
             <div className="w-20 h-1 bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: `${memory}%` }}
                  className="absolute inset-0 bg-radioactive shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                />
             </div>
             <span>{memory}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-6 h-6">
          <span className="text-zinc-500">NETWORK:</span>
          <span className="text-white">ENCRYPTED_VPN</span>
        </div>
      </div>
    </div>
  );
}
