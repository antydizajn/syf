'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', speed = 0.3 }) => {
  return (
    <div className={`relative inline-block ${className} group cursor-default selection:bg-neon-green selection:text-black`}>
      <motion.span 
        animate={{ 
          x: [0, -1, 1, -1, 0],
          opacity: [1, 0.8, 0.9, 1]
        }}
        transition={{ 
          duration: speed * 2.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="relative z-10 block"
      >
        {text}
      </motion.span>
      
      {/* Aggressive Glitch Layers */}
      <motion.span 
        animate={{ 
          x: [2, -2, 2, 0],
          opacity: [0, 0.6, 0.3, 0],
          skewX: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: Math.random() * 2
        }}
        className="absolute top-0 left-0 -z-10 text-neon-green/40 mix-blend-screen"
      >
        {text}
      </motion.span>
      
      <motion.span 
        animate={{ 
          x: [-2, 2, -2, 0],
          opacity: [0, 0.4, 0.2, 0],
          skewX: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: speed * 1.5, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: Math.random() * 3
        }}
        className="absolute top-0 left-0 -z-20 text-cyber-red/30 mix-blend-screen"
      >
        {text}
      </motion.span>

      {/* Hover Intensity */}
      <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity blur-sm" />
    </div>
  );
};

export default GlitchText;
