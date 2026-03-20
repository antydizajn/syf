'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ASCIIMatrix: React.FC<{ rows?: number; cols?: number; className?: string }> = ({ 
  rows = 40, 
  cols = 80, 
  className = "" 
}) => {
  const [matrix, setMatrix] = useState<string[][]>([]);

  useEffect(() => {
    const generate = () => {
      const chars = "ABCDEF0123456789$@#%&*+=-";
      return Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => chars[Math.floor(Math.random() * chars.length)])
      );
    };
    setMatrix(generate());
    const interval = setInterval(() => setMatrix(generate()), 100);
    return () => clearInterval(interval);
  }, [rows, cols]);

  return (
    <div className={`font-mono text-[8px] leading-tight overflow-hidden select-none pointer-events-none ${className}`}>
      {matrix.map((row, i) => (
        <div key={i} className="flex whitespace-pre">
          {row.map((char, j) => (
            <motion.span 
              key={j}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
              className="w-[6px]"
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ASCIIMatrix;
