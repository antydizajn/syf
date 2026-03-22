'use client';

import React from 'react';

interface TickerProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const Ticker: React.FC<TickerProps> = ({ items, speed = 20, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap bg-black border-y border-white/5 py-1.5 relative group ${className}`}>
      {/* Decorative corners */}
      <div className="absolute inset-y-0 left-0 w-2 bg-neon-green/20 group-hover:bg-neon-green transition-colors" />
      <div className="absolute inset-y-0 right-0 w-2 bg-neon-green/20 group-hover:bg-neon-green transition-colors" />
      
      <div 
        className={`inline-block flex gap-12 items-center min-w-full`}
        style={{ 
          animation: `marquee-${direction} ${speed}s linear infinite`,
          display: 'flex'
        }}
      >
        {items.concat(items).concat(items).map((item, i) => (
          <div key={i} className="flex items-center gap-4 group/item">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold group-hover/item:text-neon-green transition-colors cursor-default">
              {item}
            </span>
            <div className="w-1.5 h-1.5 bg-white/10 rotate-45 group-hover/item:bg-neon-green group-hover/item:shadow-[0_0_8px_var(--neon-green)]" />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
