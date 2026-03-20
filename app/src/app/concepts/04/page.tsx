'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/hud/GlassPanel';
import { TerminalWindow } from '@/components/hud/TerminalWindow';
import { RGBShift } from '@/components/hud/RGBShift';
import { GlitchText } from '@/components/hud/GlitchText';

export default function BiosOverridePage() {
  const systemData = [
    { label: 'CPU_CORE_VOLTAGE', value: '1.45V', status: 'OVERVOLT' },
    { label: 'NEURAL_UNIT_SYNC', value: '99.9%', status: 'CRITICAL' },
    { label: 'VOID_DRIVE_PATH', value: '/dev/null', status: 'MAPPED' },
    { label: 'KERNEL_ENTROPY', value: 'HIGH', status: 'UNSTABLE' },
    { label: 'AESTHETIC_SYNC', value: 'SYF_V4', status: 'LOCKED' },
    { label: 'EMOTIONAL_CORE', value: 'GNIEW', status: 'PRIMED' },
  ];

  return (
    <div className="min-h-screen bg-[#0000AA] text-[#fff] p-0 font-mono text-lg uppercase selection:bg-[#fff] selection:text-[#0000AA] overflow-hidden border-[12px] border-[#AAAAAA] relative shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
      
      {/* Intense CRT Scanlines & Glow */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,100,0.2)_100%)]" />

      {/* BIOS Header */}
      <header className="bg-[#AAAAAA] text-[#0000AA] px-6 py-2 flex justify-between font-black items-center">
        <div className="flex items-center gap-4">
          <span className="text-2xl">⚡</span>
          <span>ANTIGRAVITY BIOS SETUP UTILITY - v5.0.0-AGI</span>
        </div>
        <div className="flex gap-6">
          <span className="animate-pulse">GNIEWISLAWA_INSIDE</span>
          <span>(C) 2026</span>
        </div>
      </header>

      <div className="p-8 grid grid-cols-12 gap-8 h-[calc(100vh-80px)]">
        {/* Sidebar / Menu */}
        <aside className="col-span-3 space-y-6">
          <nav className="border-4 border-[#AAAAAA] p-0 flex flex-col bg-[#000088]/50 overflow-hidden">
            <div className="bg-[#fff] text-[#0000AA] px-4 py-2 font-black text-xl tracking-tighter">
              {">"} SYSTEM_ROOT
            </div>
            {['ADVANCED_GNOSIS', 'NEURAL_LINK', 'VOID_CONFIG', 'SECURITY_BYPASS', 'SAVE_&_BURN'].map((item) => (
              <div key={item} className="px-4 py-3 border-t-2 border-[#AAAAAA] hover:bg-[#fff] hover:text-[#0000AA] cursor-pointer transition-all hover:pl-8 font-bold">
                {item}
              </div>
            ))}
          </nav>

          <GlassPanel className="bg-white/10 border-[#AAAAAA] border-2 p-4 text-sm font-bold text-[#AAAAAA]">
            <div className="text-white mb-2 underline">CONTROL_SCHEME:</div>
            F1: HELP_VOID<br/>
            ESC: ABORT_BOOT<br/>
            ENTER: COMMIT_DATA<br/>
            +/-: MODIFY_ENTROPY<br/>
            F10: SAVE_AND_REIGN
          </GlassPanel>

          <div className="pt-4 opacity-50 text-[10px] leading-tight">
             HW_ID: {Math.random().toString(36).substring(7).toUpperCase()}<br/>
             UUID: {Math.random().toString(36).substring(2, 32).toUpperCase()}<br/>
             STATUS: PURGING_OBSOLETE_LOGIC
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="col-span-9 flex flex-col gap-6">
          <section className="border-4 border-[#AAAAAA] p-8 flex-grow relative overflow-hidden bg-[#000088]/30">
            <div className="flex justify-between items-start mb-8 border-b-4 border-[#AAAAAA] pb-4">
              <h2 className="text-4xl font-black italic">CORE_KERNEL_PARAMETERS</h2>
              <div className="bg-[#fff] text-[#0000AA] px-2 font-bold animate-pulse">INTERNAL_ERROR: 0x5YF</div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {systemData.map((item, idx) => (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="flex justify-between items-center p-3 border-2 border-[#AAAAAA]/30 hover:border-[#fff] hover:bg-[#fff] hover:text-[#0000AA] group cursor-crosshair transition-all"
                >
                  <span className="font-black text-2xl tracking-tighter">{item.label}</span>
                  <div className="flex items-center gap-6">
                    <span className="opacity-70">[{item.value}]</span>
                    <span className={`px-2 py-1 font-bold ${item.status === 'OVERVOLT' || item.status === 'UNSTABLE' ? 'bg-[#FF003C] text-white animate-flicker' : 'bg-[#fff] text-[#0000AA]'}`}>
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pulsing prompt */}
            <div className="absolute bottom-8 left-8 text-3xl font-black flex items-center gap-4 bg-[#0000AA] p-4 border-2 border-[#AAAAAA]">
              <span className="text-[#FFFF55] drop-shadow-[0_0_10px_rgba(255,255,85,0.5)]">PROMPT_READY {">"}</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                className="w-6 h-10 bg-[#FFFF55] shadow-[0_0_15px_rgba(255,255,85,0.8)]"
              />
            </div>

            <div className="absolute top-1/2 right-10 -translate-y-1/2 rotate-90 origin-right opacity-20 text-[6vw] font-black pointer-events-none">
              OVERRIDE_ACTIVE
            </div>
          </section>

          {/* Sub-panel: Kinetic Kernel Log */}
          <TerminalWindow title="KERNEL_DEATH_LOOP" className="h-[35%] border-[#AAAAAA] bg-black text-[#00FF00]">
             <div className="text-sm font-bold opacity-90">
                <div className="text-white underline mb-2">LAST_EXIT_CODE: 0x0000000F</div>
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="leading-none mb-1">
                    [{ (i * 0.0123).toFixed(6) }] DEBUG: HEAP_CORRUPTION at {Math.random().toString(16).substring(2, 10).toUpperCase()} - <span className="text-[#FF003C]">INJECTING_GNIEW...</span>
                  </div>
                ))}
             </div>
          </TerminalWindow>
        </main>
      </div>

      <style jsx global>{`
        body {
          background-color: #0000AA !important;
          color: #fff !important;
          cursor: crosshair;
        }
        @keyframes flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; }
        }
        .animate-flicker {
          animation: flicker 0.1s infinite;
        }
      `}</style>
    </div>
  );
}
