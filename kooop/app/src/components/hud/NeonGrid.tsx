'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const NeonGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none perspective-[1000px] overflow-hidden">
      <motion.div 
        animate={{ translateY: ['0%', '20%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rotate-x-[60deg] origin-center scale-[2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 0, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};
