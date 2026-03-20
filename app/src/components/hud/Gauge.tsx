'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  label: string;
  max?: number;
  color?: string;
  className?: string;
}

export const Gauge: React.FC<GaugeProps> = ({ value, label, max = 100, color = 'var(--matrix-blue)', className = '' }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const isCritical = percentage > 85;
  const displayValue = value.toFixed(1);
  
  return (
    <div className={`flex flex-col gap-1.5 ${className} group selection:bg-white/10`}>
      <div className="flex justify-between font-mono text-[9px] tracking-widest uppercase items-center">
        <span className="opacity-40 group-hover:opacity-100 transition-opacity">{label}</span>
        <motion.span 
          animate={isCritical ? { opacity: [1, 0.4, 1], x: [0, -1, 1, 0] } : {}}
          transition={{ duration: 0.1, repeat: Infinity }}
          className={isCritical ? 'text-cyber-red font-black' : 'opacity-60'}
        >
          {displayValue}%
        </motion.span>
      </div>
      
      <div className="h-1.5 bg-white/[0.03] border border-white/5 relative overflow-hidden rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ 
            width: `${percentage}%`,
            backgroundColor: isCritical ? 'var(--cyber-red)' : color
          }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="h-full relative overflow-hidden"
          style={{ 
            boxShadow: isCritical ? '0 0 15px var(--cyber-red)' : `0 0 8px ${color}`,
          }}
        >
          {/* Animated Glow Runner */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>

        {/* Diagnostic notches */}
        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none mix-blend-overlay">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`w-[1px] h-full ${i % 5 === 0 ? 'bg-white/40' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
      
      {isCritical && (
        <div className="text-[7px] text-cyber-red/60 font-black uppercase tracking-tighter animate-pulse text-right">
          ⚠️ LOAD_CRITICAL_OVERRIDE_ACTIVE
        </div>
      )}
    </div>
  );
};
