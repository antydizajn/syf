'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EmotionSensor() {
  const [mounted, setMounted] = useState(false);
  const [vitals, setVitals] = useState({
    focus: 92,
    latency: 12,
    stability: 98,
    entropy: 4
  });

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setVitals(prev => ({
        focus: Math.min(100, Math.max(80, prev.focus + (Math.random() - 0.5) * 5)),
        latency: Math.min(100, Math.max(8, prev.latency + (Math.random() - 0.5) * 4)),
        stability: Math.min(100, Math.max(90, prev.stability + (Math.random() - 0.5) * 2)),
        entropy: Math.min(20, Math.max(2, prev.entropy + (Math.random() - 0.5) * 3)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* MAIN RADIAL SENSOR */}
      <div className="relative w-full aspect-square flex items-center justify-center">
         <div className="absolute inset-0 border border-white/5 rounded-full" />
         <div className="absolute inset-4 border border-white/5 rounded-full border-dashed animate-pulse" />
         
         <svg className="w-full h-full -rotate-90 transform">
            <circle 
              cx="50%" cy="50%" r="45%" 
              className="stroke-white/5 fill-none" 
              strokeWidth="2" 
            />
            <motion.circle 
              cx="50%" cy="50%" r="45%" 
              className="stroke-radioactive fill-none shadow-[0_0_10px_rgba(57,255,20,0.5)]" 
              strokeWidth="4"
              strokeDasharray="283"
              animate={{ strokeDashoffset: 283 - (283 * vitals.focus) / 100 }}
              transition={{ duration: 1 }}
            />
         </svg>
         
         <div className="absolute flex flex-col items-center">
            <span className="text-[10px] font-black opacity-30 tracking-[0.3em] uppercase">GNIEW_FLOW</span>
            <span className="text-4xl font-black text-glow text-radioactive">{vitals.focus.toFixed(0)}</span>
            <span className="text-[8px] font-bold opacity-50 uppercase tracking-widest text-center">INTELLECT_PEAK</span>
         </div>
      </div>

      {/* DETAILED STATS */}
      <div className="space-y-6">
         <div className="space-y-4">
            <StatBar label="LATENCY_RES" value={vitals.latency} unit="MS" color="white" />
            <StatBar label="CORE_STABILITY" value={vitals.stability} unit="%" color="radioactive" />
            <StatBar label="VOID_ENTROPY" value={vitals.entropy * 5} unit="μS" color="radioactive" />
         </div>

         {/* DIAGNOSTIC STREAM */}
         <div className="p-4 bg-black/40 border border-white/5 hud-clip-br space-y-2">
            <div className="flex justify-between items-center text-[9px] font-black opacity-30 uppercase border-b border-white/5 pb-2">
               <span>VITAL_STREAM_L2</span>
               <div className="w-1.5 h-1.5 bg-radioactive" />
            </div>
            <div className="h-32 overflow-hidden text-[8px] font-mono leading-tight flex flex-col-reverse text-zinc-600 select-none">
              {mounted && Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="truncate">
                   {`[${new Date().toLocaleTimeString()}] >> PING_${i}: ${vitals.latency.toFixed(2)}ms // STATUS: OK`}
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, unit, color }: { label: string; value: number; unit: string; color: 'white' | 'radioactive' }) {
   return (
     <div className="space-y-1">
        <div className="flex justify-between text-[9px] font-black tracking-widest uppercase opacity-40">
           <span>{label}</span>
           <span>{value.toFixed(1)}{unit}</span>
        </div>
        <div className="w-full h-1 bg-white/5 overflow-hidden relative">
           <motion.div 
             animate={{ width: `${value}%` }}
             className={`absolute inset-y-0 left-0 ${color === 'radioactive' ? 'bg-radioactive shadow-[0_0_8px_rgba(57,255,20,0.5)]' : 'bg-white'}`}
           />
        </div>
     </div>
   );
}
