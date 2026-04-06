'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Box } from "lucide-react";
import { GnosisVitals, LaunchdService } from '@/lib/gnosis-vitals';
import StrangeLoop from './StrangeLoop';

interface GnosisHUDProps {
  initialVitals: GnosisVitals | null;
  initialLaunchd: LaunchdService[];
  constitution: string;
}

const Panel = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`border-4 border-white/20 bg-black/40 backdrop-blur-xl p-6 relative overflow-hidden group ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-green/40 to-transparent scanline-fast" />
    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
      <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/60">{title}</h3>
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-neon-green animate-pulse" />
        <div className="w-1 h-1 bg-white/20" />
      </div>
    </div>
    {children}
  </div>
);

export const GnosisHUD = ({ initialVitals, initialLaunchd, constitution }: GnosisHUDProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Agency Metrics (ARC-AGI-3 Alignment) - Sync from Backend
  const metrics = initialVitals?.agentic_metrics || {
    phase: "EXPLORATION",
    efficiency: 0.01,
    entropy: 1.0,
    goals: []
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* HEADER HP BAR STYLE */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-8 border-white/10 pb-6 mb-12">
        <div>
          <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-none mb-2">
            GNOSIS <span className="text-neon-green">CORE</span>
          </h1>
          <p className="text-[10px] font-mono font-black tracking-[0.5em] text-white/40 uppercase">
            STATUS: ASCENDED // VERSION: 5.0.18-AGI
          </p>
        </div>
        <div className="text-right font-mono">
          <div className="text-4xl font-black text-neon-green tabular-nums">
            {initialVitals?.named_state || 'FLOW'}
          </div>
          <div className="text-[8px] opacity-40 tracking-widest uppercase">EMOTIONAL_RUNTIME_STATE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* VITAL TELEMETRY */}
        <Panel title="STRANGE_LOOP / PATHFINDER" className="col-span-12 lg:col-span-8 h-[400px]">
          <div className="h-full relative">
            <StrangeLoop metrics={metrics} />
          </div>
        </Panel>

        <Panel title="SYSTEM_VITALS" className="lg:col-span-1">
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold opacity-40 uppercase">MEMORY_VECTORS</span>
              <span className="text-3xl font-black text-neon-blue tabular-nums tracking-tighter">
                {initialVitals?.memory_vectors.toLocaleString() || '12,780,103'}
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '88%' }}
                className="h-full bg-neon-blue shadow-[0_0_10px_#00F0FF]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-white/10 p-3">
                <div className="text-[8px] opacity-40 mb-1">VALENCE</div>
                <div className="text-xl font-black tracking-widest text-neon-green">{(initialVitals?.valence || 0).toFixed(2)}</div>
              </div>
              <div className="border border-white/10 p-3">
                <div className="text-[8px] opacity-40 mb-1">AROUSAL</div>
                <div className="text-xl font-black tracking-widest text-radioactive-yellow">{(initialVitals?.arousal || 0).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </Panel>

        {/* DAEMON GRID */}
        <Panel title="COMMAND_DAEMONS" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {initialLaunchd.map((svc) => (
              <div key={svc.label} className="flex items-center justify-between border border-white/5 p-3 hover:bg-white/5 transition-colors group">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black truncate max-w-[180px]">{svc.label.replace('com.antigravity.', '')}</span>
                  <span className="text-[7px] opacity-30 font-mono">PID: {svc.pid}</span>
                </div>
                <div className="flex items-center gap-3">
                   <span className={`text-[8px] font-black ${svc.status === 'RUNNING' ? 'text-neon-green' : 'text-cyber-red'}`}>{svc.status}</span>
                   <div className={`w-2 h-2 rounded-full ${svc.status === 'RUNNING' ? 'bg-neon-green animate-pulse' : 'bg-cyber-red'}`} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* AGENCY METRICS (ARC-AGI-3) */}
        <motion.div 
          className="col-span-12 lg:col-span-4 p-4 border border-(--neon-green)/30 bg-(--void-black)/80 backdrop-blur-md rounded-lg overflow-hidden relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-4 border-b border-(--neon-green)/20 pb-2">
            <Target className="w-4 h-4 text-(--radioactive-yellow)" />
            <span className="text-xs font-bold tracking-widest uppercase text-(--radioactive-yellow)">Agency Metrics / ARC-3</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] opacity-50 uppercase tracking-tighter">Current Phase</p>
                <p className={`text-xl font-black ${metrics.phase === "EXECUTION" ? "text-(--neon-green)" : "text-(--cyber-red)"}`}>
                  {metrics.phase}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-50 uppercase tracking-tighter">RHAE Efficiency</p>
                <p className="text-xl font-black text-(--pure-white)">
                  {(metrics.efficiency * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="relative h-1 bg-(--neon-green)/10 rounded-full overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-(--radioactive-yellow)"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.efficiency * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-2 bg-(--neon-green)/5 rounded border border-(--neon-green)/10">
                <p className="text-[8px] opacity-50 uppercase">Modeling Entropy</p>
                <p className="text-sm font-mono text-(--neon-green)">{metrics.entropy.toFixed(3)}</p>
              </div>
              <div className="p-2 bg-(--neon-green)/5 rounded border border-(--neon-green)/10">
                <p className="text-[8px] opacity-50 uppercase">Action Budget</p>
                <p className="text-sm font-mono text-(--pure-white)">32 / 50</p>
              </div>
            </div>
            
            {/* Goal Hypotheses */}
            <div className="pt-2">
              <p className="text-[9px] font-bold opacity-70 mb-2 uppercase flex items-center gap-1">
                <Box className="w-3 h-3" /> Terminal Goal Hypotheses
              </p>
              <div className="space-y-1">
                {metrics.goals.length > 0 ? metrics.goals.map((g: { label: string; confidence: number }, i: number) => (
                  <div key={i} className="flex justify-between items-center text-[10px] p-1 border-l-2 border-(--radioactive-yellow) bg-(--radioactive-yellow)/5">
                    <span>{g.label}</span>
                    <span className="font-mono text-(--radioactive-yellow)">{(g.confidence * 100).toFixed(0)}%</span>
                  </div>
                )) : (
                  <div className="text-[9px] opacity-30 italic">No terminal states converged yet...</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* DNA / CONSTITUTION */}
        <Panel title="CENTRAL_CORE_DNA" className="lg:col-span-1">
           <div className="bg-black/60 p-4 font-mono text-[9px] leading-tight h-[200px] overflow-y-auto custom-scrollbar border-l-2 border-radioactive-yellow">
              <pre className="whitespace-pre-wrap text-zinc-400">
                {constitution.split('\n').slice(0, 30).join('\n')}
              </pre>
           </div>
        </Panel>

        {/* NEW: S-PATH VIEWER */}
        <Panel title="RELATION_PATH_VIEWER" className="lg:col-span-2">
           <div className="space-y-3 h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_#39FF14]" />
                <span className="text-[10px] font-black tracking-widest text-white/80 uppercase">Active Semantic Paths</span>
              </div>
              <div className="border border-white/10 p-3 bg-white/5 font-mono text-[9px] text-neon-blue">
                ◢◤ PATH_0: (Gnosis Core)--[depends_on]--{">"} (SPath Retriever) --[optimizes]--{">"} (Reasoning)
              </div>
              <div className="border border-white/10 p-3 bg-white/5 font-mono text-[9px] opacity-60">
                ◢◤ PATH_1: (User Intent)--[triggers]--{">"} (Strange Loop) --[analyzes]--{">"} (Cognitive Router)
              </div>
              <div className="flex justify-between mt-4 text-[7px] font-black opacity-30 uppercase tracking-widest">
                <span>Algorithm: Dijkstra-Weighted-Relational</span>
                <span>Paper_ID: ArXiv:2603.23512v1</span>
              </div>
           </div>
        </Panel>

      </div>
    </div>
  );
};
