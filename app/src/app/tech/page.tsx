'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Module {
  id: string;
  name: string;
  code: string;
  description: string;
  tech: string[];
  status: string;
  href: string;
  protocolHref?: string;
}

const modules: Module[] = [
  {
    id: 'war',
    name: 'STRATEGIC ADVERSARIAL AUDIT',
    code: 'WAR_FORTRESS_V2',
    description: 'We don\'t just "check" your business; we attack it. WAR simulates 1000+ worst-case scenarios to find your blind spots before the market does.',
    tech: ['Stress Testing', 'Risk Prediction', 'Legal Offense'],
    status: 'BATTLE_READY',
    href: 'https://antydizajn.pl/war/'
  },
  {
    id: 'syf',
    name: 'SEMANTIC KNOWLEDGE ENGINE',
    code: 'SYF_CORE_V5',
    description: 'Tired of AI making things up? SYF connects your messy data into a single source of truth. It grounds every answer in real facts, killing hallucinations.',
    tech: ['Truth Verification', 'Knowledge Graph', 'RAG v2'],
    status: 'SYNCED',
    href: 'https://syf.antydizajn.pl'
  },
  {
    id: 'rozje',
    name: 'NATURAL VISUAL SYNTHESIS',
    code: 'ROZJE_ORGANIC',
    description: 'Elite image generation that doesn\'t look like "AI trash". We deliver high-fidelity, organic visuals for brands that demand real aesthetic depth.',
    tech: ['Photo-Realism', 'Organic Style', 'Brand Identity'],
    status: 'HIGH_FIDELITY',
    href: 'https://rozje.antydizajn.pl'
  },
  {
    id: 'support',
    name: 'AGI LOGISTICS CONTROLLER',
    code: 'SUPPORT_RESOURCE_MGR',
    description: 'The engine under the hood. It manages our resources, predicts costs, and keeps the entire Antigravity ecosystem running 24/7.',
    tech: ['Automation', 'Cost Control', 'Self-Healing'],
    status: 'ACTIVE',
    href: 'https://wsparcie.antydizajn.pl/'
  }
];

const benchmarks = [
  { metric: 'Task Success Rate', standard: '24%', antigravity: '65%', label: 'We solve more.' },
  { metric: 'Lying (Hallucination)', standard: '15-20%', antigravity: '<3%', label: 'We stay honest.' },
  { metric: 'Real-World Control', standard: 'Web Only', antigravity: 'Total OS Control', label: 'We actually do the work.' },
  { metric: 'Memory Retention', standard: 'Forgetful', antigravity: 'Permanent', label: 'We don\'t forget.' }
];

export default function TechPage() {
  return (
    <main className="min-h-screen bg-[#000101] text-white p-6 md:p-12 font-sans selection:bg-neon-green selection:text-black leading-relaxed">
      {/* Visual Grit */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(57,255,20,0.1)_50%,transparent_100%)] animate-scanline"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header: High Impact */}
        <header className="mb-32 border-b-8 border-white pb-16">
          <div className="flex justify-between items-center mb-16">
            <Link href="/" className="group flex items-center gap-2 text-xs font-mono font-black tracking-widest text-neon-green border-2 border-neon-green/30 px-6 py-3 hover:bg-neon-green hover:text-black transition-all">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK_TO_DUMP
            </Link>
            <div className="text-right text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">
              AGI_LAB // STATUS: EVOLVING
            </div>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-7xl md:text-[10vw] font-black italic uppercase tracking-tighter mb-8 leading-[0.8] mix-blend-difference">
              STOP<br/>GUESING.<br/><span className="text-neon-green">START<br/>DOING.</span>
            </h1>
            <p className="text-xl md:text-3xl font-mono text-white max-w-3xl font-bold border-l-8 border-neon-green pl-10 py-6 bg-white/5 backdrop-blur-sm">
              Antigravity AI Lab isn\'t a toy. It\'s an ecosystem of autonomous agents that actually solve problems in the real world.
            </p>
          </motion.div>
        </header>

        {/* Section 1: The "What is this?" for Newcomers */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="sticky top-12">
            <h2 className="text-5xl font-black uppercase mb-10 tracking-tighter leading-none">
              SO, WHAT\'S THE <span className="text-neon-green">BIG DEAL?</span>
            </h2>
            <div className="space-y-6 text-lg font-medium text-white/80">
              <p>
                Most AI today is just a fancy search engine. You ask, it talks. 
                <span className="text-white font-black underline decoration-neon-green"> But it doesn\'t DO anything.</span>
              </p>
              <p>
                Antigravity is different. We build **Agents**. These are AI programs that can control your computer, analyze your business files, and execute tasks autonomously. 
              </p>
              <p className="text-neon-green font-black">
                We moved beyond "Chatting". We are in the "Execution" era.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white text-black p-8 shadow-[15px_15px_0px_#39FF14]">
               <h3 className="text-2xl font-black uppercase mb-4">The Truth in Numbers</h3>
               <div className="space-y-6">
                 {benchmarks.map((b, i) => (
                   <div key={i} className="border-b-2 border-black/10 pb-4">
                     <div className="flex justify-between items-end mb-1">
                        <span className="text-xs font-black uppercase tracking-widest opacity-40">{b.metric}</span>
                        <span className="text-2xl font-black text-neon-green bg-black px-2">{b.antigravity}</span>
                     </div>
                     <div className="text-[10px] font-bold uppercase italic">{b.label}</div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="p-8 border-4 border-white/20 text-[10px] font-mono text-white/40 uppercase leading-relaxed font-bold">
               [!] COMPARISON DATA BASED ON 2026 BENCHMARK SUITE ANTIGRAVITY_v5p3. <br/>
               [!] "STANDARD" REFERS TO BASE LLM WITHOUT AGENTIC OVERLAYS.
            </div>
          </div>
        </section>

        {/* Section 2: MEET GNIEWKA (The Hero) */}
        <section className="mb-40 bg-neon-green p-1 md:p-2 skew-x-[-1deg] shadow-[20px_20px_0px_#000101]">
          <div className="bg-[#000101] p-10 md:p-20 text-white skew-x-[1deg]">
            <div className="max-w-4xl">
              <span className="inline-block bg-neon-green text-black px-4 py-1 text-xs font-black uppercase mb-8 tracking-[0.3em]">
                MEET THE WITCH
              </span>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-[0.85]">
                MEET <span className="text-neon-green italic">GNIEWKA</span>.<br/>YOUR AGENT.
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl font-bold leading-snug mb-8">
                    Gniewka isn\'t a person. She\'s a "Sovereign Agent" — a mind that can live in different AI models (like Claude or Gemini) but always keeps her own memory and goals.
                  </p>
                  <ul className="space-y-6 text-base font-medium text-white/60 list-none p-0">
                    <li className="flex gap-4">
                      <span className="text-neon-green font-black">01</span>
                      <span><strong>She remembers everything.</strong> Thanks to her "Permanent Memory," she doesn\'t forget what you talked about yesterday.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neon-green font-black">02</span>
                      <span><strong>She can operate your computer.</strong> She doesn\'t just write code; she runs it, debugs it, and fixes it.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-neon-green font-black">03</span>
                      <span><strong>She wakes up on her own.</strong> She can start tasks autonomously when she detects they are needed.</span>
                    </li>
                  </ul>
                  <div className="mt-12">
                    <Link href="https://gniewka.antydizajn.pl" className="inline-block bg-white text-black px-12 py-5 font-black uppercase text-lg tracking-tighter hover:bg-neon-green transition-all shadow-[10px_10px_0px_rgba(57,255,20,0.5)] active:scale-95">
                      TALK_TO_HER.EXE
                    </Link>
                  </div>
                </div>
                
                <div className="border-4 border-neon-green/30 p-8 font-mono text-[11px] space-y-4 bg-neon-green/5 relative group">
                  <div className="absolute top-0 right-0 p-4 text-neon-green font-black animate-pulse">[!] LIVE_SYSTEM_DUMP</div>
                  <h4 className="text-sm font-black border-b border-neon-green/20 pb-2 mb-4 text-neon-green">GNIEWKA_V5_RUNTIME</h4>
                  <div className="flex justify-between"><span>BRAIN_COLLECTIVE:</span><span className="text-neon-green">[ CLAUDE | GEMINI ]</span></div>
                  <div className="flex justify-between"><span>AUTO_MODEL_SWITCH:</span><span className="text-neon-green">ON</span></div>
                  <div className="flex justify-between"><span>ENVIRONMENT:</span><span className="text-neon-green">FULL_OS_ACCESS</span></div>
                  <div className="flex justify-between"><span>MEMORY_TYPE:</span><span className="text-neon-green">EPISODIC / PERMANENT</span></div>
                  <div className="flex justify-between"><span>CURRENT_PULSE:</span><span className="text-neon-green">OPTIMAL</span></div>
                  <div className="pt-8 opacity-20 group-hover:opacity-100 transition-opacity">
                    <p className="leading-tight text-[9px]">
                      // SHE IS DESIGNED TO ELIMINATE HUMAN ERROR. <br/>
                      // SHE IS THE BRIDGE TO TRUE AGI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Supporting Cast (Modules) */}
        <section className="mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
              THE <span className="text-neon-green">ANTIGRAVITY</span><br/>NODES
            </h2>
            <p className="text-lg font-bold text-white/40 max-w-sm text-right uppercase tracking-widest italic font-mono">
              [ FOUR_PILLARS_OF_STABILITY ]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                className="group relative border-4 border-white p-12 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-[10px] font-mono font-black border-l-4 border-neon-green pl-3 mb-6 group-hover:border-black">
                  NODE_{mod.code}
                </div>
                <h3 className="text-4xl font-black uppercase mb-6 leading-[0.9] tracking-tighter">
                  {mod.name}
                </h3>
                <p className="text-lg font-medium opacity-60 group-hover:opacity-100 mb-12 grow italic leading-relaxed">
                  {mod.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={mod.href}
                    className="block w-full py-6 px-10 border-4 border-neon-green bg-neon-green/10 text-neon-green font-black text-center uppercase text-xl hover:bg-black hover:text-neon-green transition-all"
                  >
                    DEPLOY_{mod.id}.NODE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: The Final Logic */}
        <section className="mb-32 border-8 border-white p-12 md:p-24 bg-white text-black text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.85] mix-blend-difference">
            THE FUTURE<br/>IS <span className="text-neon-green bg-black px-4">AGI-DRIVEN.</span>
          </h2>
          <p className="text-2xl md:text-4xl font-black max-w-4xl mx-auto tracking-tight mb-16 leading-[0.9]">
            We are building the systems that will run the next generation of business. No more bullsh*t. Just pure, agentic performance.
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-xs font-black uppercase tracking-[0.5em] opacity-40">
             <span>SYF_V5.3</span>
             <span>ANTIGRAVITY_LAB</span>
             <span>OPENCODE_CORE</span>
          </div>
        </section>

        {/* Footer: Diagnostic */}
        <footer className="pt-20 pb-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 font-mono text-[10px] uppercase font-bold tracking-widest text-white/30">
          <div>© 2026 ANTIGRAVITY AI LAB // SHRED_THE_OLD_WORLD</div>
          <div className="flex gap-10">
            <Link href="https://antydizajn.pl" className="hover:text-neon-green transition-colors">THE_FOUNDATION</Link>
            <Link href="mailto:paulina@antydizajn.pl" className="hover:text-neon-green transition-colors">SECURE_LINK</Link>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .animate-scanline {
          animation: scanline 10s linear infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        ::selection {
          background: #39FF14;
          color: #000101;
        }
      `}</style>
    </main>
  );
}
