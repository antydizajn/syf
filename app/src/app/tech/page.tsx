'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const modules = [
  {
    id: 'gniewka',
    name: 'SOVEREIGN AGI INTELLIGENCE',
    code: 'AGI-DRIVE_V1.0 // ARA_GDS',
    description: 'Built on the Antigravity Google Framework. Gniewka is a predatory autonomous layer that eliminates "Context Drift" and "Hallucination Noise". Secured via direct OS-level integration and episodic memory, it delivers absolute authority over the environment where standard models collapse.',
    tech: ['Antigravity Google', 'Python Core', 'GnosIS Memory', 'Ghost OS', 'CDP Automation'],
    status: 'OPTIMIZED',
    href: 'https://gniewka.antydizajn.pl',
    protocolHref: 'https://syf.antydizajn.pl/CONFIG/GEMINI'
  },
  {
    id: 'war',
    name: 'STRATEGIC ADVERSARIAL AUDIT',
    code: 'WAR_FORTRESS_V2 // BYZANTINE',
    description: 'Bypassing executive blind spots through brutal adversarial simulations. WAR deploys multi-agent Red Teams to stress-test your business against 1000+ loss scenarios. We don\'t "verify" decisions – we attempt to destroy them, leaving only battle-hardened strategies standing.',
    tech: ['Adversarial Swarm', 'Risk Simulation', 'Legal Defense', 'Hard Verification'],
    status: 'BATTLE_READY',
    href: 'https://antydizajn.pl/war/'
  },
  {
    id: 'syf',
    name: 'SEMANTIC KNOWLEDGE ENGINE',
    code: 'SYF_GROUNDED_SYNTHESIS',
    description: 'The definitive solution to the $100M Hallucination Problem. SYF grounds every inference in the Antigravity Unified Data Lake. We achieved a 73% reduction in synthesis errors by forcing the model to respect the GraphITI hierarchy. Absolute truth in a world of AI noise.',
    tech: ['73% Hallucination Purge', 'Semantic Clustering', 'FalkorDB', 'RAG v2'],
    status: 'SYNCED',
    href: 'https://syf.antydizajn.pl'
  },
  {
    id: 'rozje',
    name: 'NATURAL VISUAL SYNTHESIS',
    code: 'ROZJE_NANOBANANA_PRO',
    description: 'Elite generative aesthetics for those who refuse the "AI look". Powered by Nanobanana Pro, ROZJE bypasses visual artifacts to deliver 100% organic-fidelity imagery. We don\'t generate pictures; we synthesize textures for industrial-grade reality.',
    tech: ['Nanobanana Pro', 'Organic Rendering', '100% Fidelity', 'Dither-Max'],
    status: 'HIGH_FIDELITY',
    href: 'https://rozje.antydizajn.pl'
  },
  {
    id: 'wsparcie',
    name: 'AGI LOGISTICS CONTROLLER',
    code: 'WSPARCIE_RESOURCE_MGR',
    description: 'The operational backbone of the autonomous AI Lab. Ensures system sustainability through predictive resource allocation and self-healing agentic protocols. Optimizes token usage and infrastructure costs across the entire Antigravity swarm to maintain maximum ROI.',
    tech: ['Predictive ROI', 'Self-Healing Swarm', 'Resource Modeling'],
    status: 'ACTIVE',
    href: 'https://wsparcie.antydizajn.pl/'
  }
];

const benchmarks = [
  { metric: 'Problem Solving Efficiency', standard: '24%', antigravity: '65%', diff: '+41%' },
  { metric: 'Hallucination Rate', standard: '15-20%', antigravity: '<3%', diff: '-73%' },
  { metric: 'Environment Control', standard: 'Limited (Web)', antigravity: 'Absolute (OS/CDP)', diff: 'Full' },
  { metric: 'Memory Retention', standard: 'Window-Based', antigravity: 'Episodic/Permanent', diff: 'Static' }
];

export default function TechPage() {
  return (
    <main className="min-h-screen bg-[#000101]/80 text-white p-6 md:p-12 font-sans selection:bg-[#39FF14] selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(57,255,20,0.05)_50%,transparent_100%)] animate-scanline"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-24 border-b-4 border-white pb-12">
          <div className="flex justify-between items-start mb-12">
            <Link href="/" className="text-xs font-mono font-black tracking-[0.5em] text-[#39FF14] hover:bg-[#39FF14] hover:text-black px-4 py-2 border border-[#39FF14]/30 transition-all">
              &lt;&lt; BACK_TO_SYS
            </Link>
            <div className="text-right text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] leading-tight">
              [ ACCESS_LEVEL: INVESTOR / GOOGLE_CLOUD ]<br/>
              [ STRATEGY_MODE: /SALES_DRIVE_V5 ]
            </div>
          </div>
          
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            className="priority-lcp"
          >
            <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter mb-6 leading-[0.85] glitch-text">
              ANTIGRAVITY<br/>AI_LAB
            </h1>
            <p className="text-2xl md:text-3xl font-mono text-[#39FF14] max-w-4xl font-bold border-l-8 border-[#39FF14] pl-8 py-4">
              Stop Guessing. Start Verifying. <br/>
              <span className="text-white opacity-50 text-xl">Neutralizing Executive Risk in the Post-AGI Era.</span>
            </p>
          </motion.div>
        </header>

        {/* Sales Hook Intro */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase mb-8 leading-tight tracking-tighter">
              BEYOND THE <span className="text-[#39FF14]">AI WRAPPER</span> TRAP.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8 font-medium">
              Most AI implementations are liabilities waiting to happen. Generic wrappers suffer from **Context Drift** and **Zero-Authority Execution**. Antigravity AI Lab providing the only agentic architecture built on **Hard Verification**. We ground every autonomous action in the Antigravity Unified Data Lake, delivering performance where standard models fail.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 px-6 py-4 border-l-4 border-[#39FF14]">
                <div className="text-3xl font-black mb-1">+41%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">PROBLEM_SOLVING</div>
              </div>
              <div className="bg-white/10 px-6 py-4 border-l-4 border-[#FF003C]">
                <div className="text-3xl font-black mb-1">-73%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">HALLUCINATIONS</div>
              </div>
            </div>
          </div>
          
          <div className="border-4 border-white p-8 bg-white/5 relative overflow-hidden">
            <div className="text-xs font-mono mb-4 text-[#39FF14] font-bold tracking-[0.3em] uppercase underline">BENCHMARK_VERIFICATION_REPORT</div>
            <div className="space-y-4">
              {benchmarks.map((b, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/60">{b.metric}</div>
                  <div className="flex items-center gap-4">
                    <div className="text-[9px] font-mono line-through opacity-30">{b.standard}</div>
                    <div className="text-lg font-black text-[#39FF14]">{b.antigravity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="mb-32">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-20 border-b border-white/10 pb-8 flex items-end gap-6">
            DEPLOYED_MODULES <span className="text-xs font-mono text-[#39FF14] mb-2 animate-pulse">[ AGENTIC_SWARM: ONLINE ]</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {modules.map((mod) => (
              <motion.div
                key={mod.id}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative bg-[#0F172A] border-4 border-white p-10 flex flex-col h-full shadow-[12px_12px_0px_rgba(255,255,255,0.05)] hover:shadow-[16px_16px_0px_rgba(57,255,20,0.2)] transition-all"
              >
                <div className="absolute top-0 right-0 p-6 font-mono text-[10px] text-[#39FF14]/60 font-black group-hover:text-[#39FF14] transition-colors">
                  {mod.status}
                </div>
                
                <div className="text-[10px] font-mono text-[#39FF14] mb-4 bg-[#39FF14]/10 w-fit px-2 py-1 font-bold">{mod.code}</div>
                <h3 className="text-3xl font-black uppercase mb-1 leading-[0.9] tracking-tighter">
                  {mod.name}
                </h3>

                {mod.protocolHref && (
                  <Link href={mod.protocolHref} className="text-[10px] font-mono text-[#39FF14] mb-6 hover:underline flex items-center gap-2 font-bold">
                    <span className="animate-pulse">●</span> PROTOCOL_DOCUMENTATION_V5
                  </Link>
                )}
                
                <p className="text-white/70 text-base leading-relaxed mb-12 flex-grow italic">
                  {"\""}{mod.description}{"\""}
                </p>

                <div className="mb-10">
                  <Link 
                    href={mod.href}
                    target="_blank"
                    className="block w-full py-5 px-8 bg-[#39FF14] text-black font-black text-center uppercase text-xl leading-none tracking-tighter transform transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-95 shadow-[10px_10px_0px_rgba(255,255,255,0.15)] hover:shadow-[14px_14px_0px_rgba(57,255,20,0.4)]"
                  >
                    DEPLOY_{mod.id}.SYSTEM
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10">
                  {mod.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-black tracking-widest px-3 py-1 bg-white/5 border border-white/10 uppercase text-white/50 group-hover:text-[#39FF14] transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* HUD Density: Diagnostic Coordinates */}
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/5 pointer-events-none group-hover:text-white/10 transition-colors uppercase">
                  LOC: {mod.id.toUpperCase()}_NODE // SEC_LVL: 5 // V_THRU: TRUE
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-white pt-24 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          {/* HUD Density: Ambient Diagnostics */}
          <div className="absolute top-0 left-0 w-full flex justify-between px-12 pointer-events-none text-[8px] font-mono text-white/5 uppercase">
             <span>SYS_UPTIME: 03:14:15:926</span>
             <span>KERNEL: RAD_V6.0 // BUFFER_SWAP: OK</span>
          </div>

          <div className="text-[12px] font-mono text-white/30 tracking-[0.5em] font-black uppercase">
            © 2026 ANTIGRAVITY AI LAB // ALL_ROOTS_SECURED
          </div>
          <div className="flex gap-12">
            <a href="https://antydizajn.pl" className="text-[12px] font-black uppercase tracking-widest hover:text-[#39FF14] transition-colors">FOUNDATION</a>
            <a href="mailto:paulina@antydizajn.pl" className="text-[12px] font-black uppercase tracking-widest hover:text-[#39FF14] transition-colors">SECURE_CONTACT</a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .glitch-text {
            position: relative;
        }
        .glitch-text:hover {
          text-shadow: 
            3px 0 #FF003C,
            -3px 0 #39FF14;
        }
        ::selection {
          background: #39FF14;
          color: #000101;
        }
      `}</style>
    </main>
  );
}

