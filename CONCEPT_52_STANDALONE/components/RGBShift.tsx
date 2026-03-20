'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';

export const RGBShift: React.FC<{ children: React.ReactNode; active?: boolean; intensity?: number; className?: string }> = ({ 
  children, 
  active = true, 
  intensity = 1,
  className = ''
}) => {
  const controls = useAnimation();

  React.useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        controls.start({
          x: [0, (Math.random() * 10 - 5) * intensity, 0],
          y: [0, (Math.random() * 6 - 3) * intensity, 0],
          transition: { duration: 0.1 }
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [active, controls, intensity]);

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div animate={controls} className="relative z-10">{children}</motion.div>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden text-inherit">
          <motion.div 
            animate={{ x: [-1 * intensity, 1 * intensity, -1 * intensity], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 z-0 text-red-500/50 mix-blend-screen translate-x-1"
          >
            {children}
          </motion.div>
          <motion.div 
            animate={{ x: [1 * intensity, -1 * intensity, 1 * intensity], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 z-0 text-cyan-500/50 mix-blend-screen -translate-x-1"
          >
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RGBShift;
