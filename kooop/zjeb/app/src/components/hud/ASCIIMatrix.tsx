'use client';

import React, { useEffect, useRef } from "react";

export const ASCIIMatrix: React.FC<{ rows?: number; cols?: number; className?: string }> = ({ 
  rows = 40, 
  cols = 80, 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = "ABCDEF0123456789$@#%&*+=-";
    const fontSize = 8;
    const charWidth = 6;
    const lineHeight = 10;

    // Set canvas dimensions
    canvas.width = cols * charWidth;
    canvas.height = rows * lineHeight;

    const matrix = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.05 + 0.01
      }))
    );

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const item = matrix[r][c];
          
          // Randomly change character occasionally
          if (Math.random() > 0.98) {
            item.char = chars[Math.floor(Math.random() * chars.length)];
          }

          // Pulse opacity
          item.opacity += item.speed;
          if (item.opacity > 0.8 || item.opacity < 0.1) {
            item.speed = -item.speed;
          }

          ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.1, Math.min(0.8, item.opacity))})`;
          ctx.fillText(item.char, c * charWidth, (r + 1) * lineHeight - 2);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [rows, cols]);

  return (
    <div 
      className={`overflow-hidden select-none pointer-events-none ${className}`}
      data-no-typo="true"
    >
      <canvas 
        ref={canvasRef}
        className="block"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

export default ASCIIMatrix;
