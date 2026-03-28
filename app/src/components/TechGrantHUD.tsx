'use client';

import React from 'react';

interface MetricProps {
  label: string;
  value: string;
  sub: string;
  color?: string;
}

const Metric = ({ label, value, sub, color = 'text-neon-green' }: MetricProps) => (
  <div className="border-l-4 border-white/20 pl-6 py-4 bg-white/5 backdrop-blur-md relative group overflow-hidden">
    <div className="absolute inset-0 bg-neon-green/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
    <div className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.3em] mb-2">{label}</div>
    <div className={`text-5xl font-black italic tracking-tighter ${color} mb-1 transition-all group-hover:scale-110 origin-left`}>
      {value}
    </div>
    <div className="text-[11px] font-mono font-black uppercase text-white/60">{sub}</div>
  </div>
);

// Placeholder for future glitch animations
// const HUD_GLITCH = { ... }

export const TechGrantHUD = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 relative">
      <Metric 
        label="AGENCY_CONTROL" 
        value="TOTAL" 
        sub="Full OS / Terminal Access" 
      />
      <Metric 
        label="VALUE_EQUATION" 
        value="6.5X" 
        sub="Efficiency Coefficient" 
      />
      <Metric 
        label="HALLUCINATION_RATE" 
        value="<0.1%" 
        sub="Truth-Grounded RAG v5"
        color="text-white"
      />
      <Metric 
        label="MEMORY_RETENTION" 
        value="PERM" 
        sub="Strategic Memory Decay: 0%" 
      />

      <div className="col-span-full mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Hormozi Value Proposition */}
        <div className="lg:col-span-2 border-4 border-white/20 p-10 bg-white/5 backdrop-blur-3xl text-white shadow-[20px_20px_0px_#39FF14]">
          <h3 className="text-4xl font-black uppercase mb-8 leading-none tracking-tighter">
            THE <span className="text-neon-green bg-white/10 px-3 underline decoration-neon-green">GRAND SLAM</span> INFRASTRUCTURE
          </h3>
          <div className="space-y-8 font-mono">
            <div className="bg-white/5 p-6 border-l-8 border-white/40">
              <p className="text-2xl font-black mb-2 uppercase leading-none text-neon-green">01. DREAM OUTCOME</p>
              <p className="text-sm font-bold opacity-70 italic text-white/80">Autonomous production chains. Zero human management. A system that scales while you sleep.</p>
            </div>
            <div className="bg-white/5 p-6 border-l-8 border-neon-green">
              <p className="text-2xl font-black mb-2 uppercase leading-none text-neon-green">02. TIME DELAY: ZERO</p>
              <p className="text-sm font-bold opacity-70 italic text-white/80">Legacy AI &quot;chats&quot;. We execute. Deployment happens in milliseconds, not months.</p>
            </div>
          </div>
        </div>

        {/* System Health / Diagnostic */}
        <div className="border-4 border-neon-green p-8 bg-black/80 font-mono text-[11px] space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-neon-green text-black px-3 py-1 font-black animate-pulse">LIVE_KERNEL</div>
          <h4 className="text-lg font-black text-neon-green uppercase mb-6 tracking-tighter border-b border-neon-green/30 pb-2">Diagnostic_v5.3</h4>
          
          <div className="space-y-3">
             <div className="flex justify-between border-b border-white/10 pb-1">
               <span>CORE_STABILITY:</span>
               <span className="text-neon-green">99.998%</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-1">
               <span>NEURAL_LATENCY:</span>
               <span className="text-neon-green">4ms</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-1">
               <span>AUTH_HANDSHAKE:</span>
               <span className="text-neon-green">ENFORCED</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-1">
               <span>B2B_PROTOCOL:</span>
               <span className="text-neon-green">ACTIVE</span>
             </div>
          </div>

          <div className="mt-8 pt-8 opacity-40 italic">
             {`// WARNING: SYSTEM IS SELF-EVOLVING.`} <br/>
             {`// UNAUTHORIZED MODS WILL BE NULLIFIED.`}
          </div>
        </div>
      </div>
    </div>
  );
};
