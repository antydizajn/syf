'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Node = ({ x, y, label, color }: { x: number, y: number, label: string, color: string }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
    <circle cx={x} cy={y} r="40" fill="black" stroke={color} strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
    <text x={x} y={y + 55} textAnchor="middle" fill={color} className="text-[10px] font-black uppercase tracking-widest leading-none">
      {label}
    </text>
  </motion.g>
);

const Path = ({ d, color }: { d: string, color: string }) => (
  <motion.path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth="1"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.4 }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  />
);

export default function StrangeLoop({ nodes = [], metrics = { goals: [] } }: { nodes?: any[], metrics?: any }) {
  return (
    <div className="w-full h-[400px] bg-black/20 border-4 border-white/5 flex items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      
      <svg width="600" height="400" viewBox="0 0 600 400" className="relative z-10 w-full h-full max-w-2xl">
        {/* LINKS */}
        <Path d="M150 200 Q300 50 450 200" color="#39FF14" /> {/* Emotion to Gnosis */}
        <Path d="M450 200 Q300 350 150 200" color="#00F0FF" /> {/* Gnosis to Memory */}
        <Path d="M300 350 Q100 200 300 50" color="#CCFF00" /> {/* Feedback Loop */}
        
        {/* NODES */}
        <Node x={150} y={200} label="MEMORY_CORE" color="#00F0FF" />
        <Node x={450} y={200} label="GNOSIS_DEFENSE" color="#FF003C" />
        <Node x={300} y={80} label="EMOTIONAL_ENGINE" color="#39FF14" />
        <Node x={300} y={320} label="ACTUATION_OS" color="#CCFF00" />
        
        {/* GOAL NODES */}
        {nodes.map((node: any) => (
          <motion.div
            key={node.id}
            className={`absolute w-4 h-4 rounded-full border-2 ${
              node.type === "goal" 
                ? "bg-[var(--radioactive-yellow)] border-[var(--radioactive-yellow)] shadow-[0_0_15px_var(--radioactive-yellow)]" 
                : "bg-[var(--neon-green)] border-[var(--neon-green)]"
            }`}
            style={{ x: node.x, y: node.y }}
            animate={node.type === "goal" ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}}
            transition={node.type === "goal" ? { repeat: Infinity, duration: 2 } : {}}
          />
        ))}

        {/* SEMANTIC PULSE - S-PATH VIZ */}
        <motion.circle
          r="6"
          fill="none"
          stroke="#39FF14"
          strokeWidth="1"
          animate={{
            scale: [1, 2.5],
            opacity: [0.8, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          cx="300"
          cy="200"
        />

        {/* PARTICLES */}
        <motion.circle
          r="4"
          fill="#39FF14"
          animate={{
            cx: [150, 300, 450, 300, 150],
            cy: [200, 80, 200, 320, 200],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="shadow-[0_0_15px_#39FF14]"
        />
      </svg>
      
      <div className="absolute bottom-4 left-4 text-[8px] font-mono opacity-40 uppercase tracking-[0.4em]">
        ARCH: RECURSIVE_TRAVERSAL_PROTOCOL_V5.3
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="space-y-1">
          {metrics.goals.length > 0 ? metrics.goals.map((g: { label: string; confidence: number }, i: number) => (
            <div key={i} className="flex justify-between items-center text-[10px] p-1 border-l-2 border-[var(--radioactive-yellow)] bg-[var(--radioactive-yellow)]/5">
              <span>{g.label}</span>
              <span className="font-mono text-[var(--radioactive-yellow)]">{(g.confidence * 100).toFixed(0)}%</span>
            </div>
          )) : (
            <div className="border border-white/10 p-3 bg-white/5 font-mono text-[9px] text-neon-blue">
              ◢◤ PATH_0: (Gnosis Core)--[depends_on]--{'>'} (SPath Retriever) --[optimizes]--{'>'} (Reasoning)
            </div>
          )}
        </div>
        <div className="border border-white/10 p-3 bg-white/5 font-mono text-[9px] opacity-60">
          ◢◤ PATH_1: (User Intent)--[triggers]--{'>'} (Strange Loop) --[analyzes]--{'>'} (Cognitive Router)
        </div>
      </div>
    </div>
  );
}
