'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const NeuralMatrixGrid: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{ x: number, y: number } | null>(null);

  const gridSize = 15;
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <div className="relative w-full h-full min-h-[500px] perspective-2000 flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm border border-white/5 rounded-sm">
      {/* Scanline Overlay within component */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_4px,3px_100%]" />
      
      <motion.div 
        style={{ rotateX: 35, rotateZ: -5 }}
        animate={{ 
          rotateY: hoveredCell ? (hoveredCell.x - gridSize/2) * 0.5 : 0,
          rotateX: hoveredCell ? 35 + (hoveredCell.y - gridSize/2) * -0.5 : 35
        }}
        className="grid grid-cols-15 gap-1 p-12 bg-neon-green/[0.01] border border-neon-green/10 rounded-sm relative z-10"
      >
        {cells.map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;
          const isAdjacent = hoveredCell && (Math.abs(hoveredCell.x - x) <= 1 && Math.abs(hoveredCell.y - y) <= 1);
          
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredCell({ x, y })}
              onMouseLeave={() => setHoveredCell(null)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: isHovered ? 1 : isAdjacent ? 0.3 : 0.05,
                backgroundColor: isHovered 
                  ? 'var(--neon-green)' 
                  : isAdjacent 
                  ? 'rgba(57, 255, 20, 0.4)' 
                  : 'rgba(57, 255, 20, 0.1)',
                boxShadow: isHovered 
                  ? '0 0 30px var(--neon-green), inset 0 0 10px rgba(0,0,0,0.5)' 
                  : isAdjacent
                  ? '0 0 10px rgba(57, 255, 20, 0.2)'
                  : '0 0 0px transparent'
              }}
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-crosshair border border-white/5 relative group"
            >
               {isHovered && (
                 <div className="absolute inset-0 flex items-center justify-center text-[8px] text-black font-black pointer-events-none">
                   {x}:{y}
                 </div>
               )}
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Denser HUD overlays */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-tighter text-neon-green/40 space-y-2 z-30 uppercase backdrop-blur-md p-2 bg-black/20 border-l border-neon-green/20">
        <div className="flex justify-between gap-8"><span>MATRIX_INIT</span> <span className="text-neon-green">DONE</span></div>
        <div className="flex justify-between gap-8"><span>CORE_STABILITY</span> <span className="text-white/60">99.982%</span></div>
        <div className="flex justify-between gap-8"><span>ACTIVE_RESONANCE</span> <span className="text-neon-green/80 animate-pulse">{hoveredCell ? '1.0' : '0.0'} UNIT</span></div>
        <div className="w-full h-1 bg-white/5 relative overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-neon-green/30" 
          />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-tighter text-cyber-red/40 text-right space-y-2 z-30 uppercase backdrop-blur-md p-2 bg-black/20 border-r border-cyber-red/20">
        <div className="flex justify-between gap-8"><span>FRAGMENT_ID</span> <span className="text-white/40">{hoveredCell ? `0x${(hoveredCell.x * 16 + hoveredCell.y).toString(16).toUpperCase()}` : '0x00'}</span></div>
        <div className="flex justify-between gap-8"><span>LATENCY</span> <span className="text-cyber-red/60 animate-flicker">{(Math.random() * 4 + 2).toFixed(2)}MS</span></div>
        <div className="h-4 w-32 border border-white/5 flex items-end gap-0.5 p-0.5">
           {Array.from({ length: 12 }).map((_, i) => (
             <motion.div 
               key={i} 
               animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
               transition={{ duration: 0.2, repeat: Infinity }}
               className="flex-grow bg-cyber-red/20" 
             />
           ))}
        </div>
      </div>
    </div>
  );
};
