'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Reticle: React.FC = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center pointer-events-none">
      {/* Outer Circle */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-4 border-[#39FF14]/20 border-dashed" 
      />
      {/* Middle Segments */}
      <div className="absolute inset-10 rounded-full border-2 border-[#39FF14]/40" />
      {/* Inner Crosshair */}
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-full h-[1px] bg-[#39FF14]/40" />
         <div className="h-full w-[1px] bg-[#39FF14]/40 absolute" />
         <div className="w-10 h-10 border border-[#39FF14] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-[10px] text-[#39FF14] font-bold">LKD_ON</div>
         </div>
      </div>
      {/* Static Markers */}
      <div className="absolute top-0 left-1/2 font-bold text-[#39FF14] text-xs">000</div>
      <div className="absolute bottom-0 left-1/2 font-bold text-[#39FF14] text-xs">180</div>
      <div className="absolute left-0 top-1/2 font-bold text-[#39FF14] text-xs">270</div>
      <div className="absolute right-0 top-1/2 font-bold text-[#39FF14] text-xs">090</div>
    </div>
  );
};
