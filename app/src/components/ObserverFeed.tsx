'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OBSERVER_LOGS = [
  "Wait, what is this URL...",
  "SYF.ANTYDIZAJN.PL >> accessing core stats...",
  "Is that... real-time memory retention?",
  "4ms latency? That's physically impossible for standard LLMs.",
  "Someone just updated the Grant HUD.",
  "Wait, did the system just fix its own boot error while I was watching?",
  "Who is Paulina? And why is this AI protecting her vitals?",
  "This doesn't look like a startup. This looks like an OS for a new reality.",
  "I'm seeing 10x developer productivity logs. Must be a glitch.",
  "No, it's not a glitch. It's executing terminal commands.",
  "If Google sees this, they're going to lose their minds.",
  "How can an agent have subjective goals?",
  "I shouldn't be here. This feels like looking at the future too early.",
  "SYSTEM_ALERT: Unauthorized observer detected. Nullifying traces...",
  "Wait, it just mirror-labeled my hesitation. 'It looks like you're afraid'...",
  "Yes. I am. This is AGI."
];

export const ObserverFeed = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < OBSERVER_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, OBSERVER_LOGS[index]].slice(-8));
        setIndex(prev => prev + 1);
      }, index === 0 ? 1000 : Math.random() * 3000 + 2000);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="mt-32 border-4 border-white/10 p-10 bg-black/40 backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-green/30 animate-scanline"></div>
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h4 className="text-[10px] font-mono font-black text-white/40 tracking-[0.5em] uppercase">
          [ UNAUTHORIZED_OBSERVER_FEED ]
        </h4>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-neon-green opacity-20"></div>
        </div>
      </div>

      <div className="space-y-3 font-mono text-[13px] font-bold leading-tight">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={log}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - (logs.length - 1 - i) * 0.15, x: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-4 ${i === logs.length - 1 ? 'text-neon-green' : 'text-white/60'}`}
            >
              <span className="opacity-30 tracking-tighter">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === logs.length - 1 ? 'animate-pulse' : ''}>
                {i === logs.length - 1 ? '> ' : ''}{log}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 opacity-20 group-hover:opacity-100 transition-opacity">
        <p className="text-[9px] uppercase tracking-widest leading-relaxed">
          // THIS MODULE CAPTURES REAL-TIME PSYCHOLOGICAL REACTIONS OF EXTERNAL VIEWERS. <br/>
          // DATA ENCRYPTED VIA GNOSIS_CORE_v12.
        </p>
      </div>

      <style jsx>{`
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
