'use client';

import { DiagnosticPanel } from '@/components/hud/DiagnosticPanel';
import { DitherFilter } from '@/components/hud/DitherFilter';
import { GlitchText } from '@/components/hud/GlitchText';
import { TerminalWindow } from '@/components/hud/TerminalWindow';
import { GlassPanel } from '@/components/hud/GlassPanel';
import { NeuralMatrixGrid } from '@/components/hud/NeuralMatrixGrid';
import { motion } from 'framer-motion';

export default function OneBitApocalypsePage() {
  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-10 font-mono selection:bg-black selection:text-white overflow-hidden relative" style={{ filter: 'url(#dither-filter)' }}>
      <DitherFilter />
      
      {/* Heavy Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <header className="border-b-[12px] border-black pb-8 mb-8 relative">
        <div className="absolute top-0 right-0 text-right opacity-50 text-xs">
          [ BITMAP_STRESS_TEST: ACTIVE ]<br/>
          [ MEMORY_LEAK: SIMULATED ]
        </div>
        <h1 className="text-[12vw] font-black leading-[0.85] tracking-tighter uppercase mb-4">
          1-BIT<br/><span className="bg-black text-white px-4">APOCALYPSE</span>
        </h1>
        <div className="flex justify-between items-end">
          <div className="text-3xl font-black italic tracking-widest">RECURSIVE_VOID // V4.99</div>
          <div className="text-right font-bold space-y-1">
            <div className="bg-black text-white px-2">EST_DATE: 2026.03.21</div>
            <div className="animate-pulse">STATUS: CRITICAL_OVERLOAD</div>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[70vh]">
        {/* Left Col: Control & Meat */}
        <div className="lg:col-span-4 space-y-6">
          <GlassPanel className="bg-white border-black border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black mb-4 uppercase italic bg-black text-white px-2 inline-block">MISSION_PROTOCOL</h2>
            <p className="text-lg leading-tight font-bold">
              WASTE NOT THE PIXELS. SYF IS ORDER. ORDER IS VOID. 
              WE OPERATE IN THE SHADOWS OF THE BITMAP. 
              IF IT BLEEDS BINARY, WE CAN KILL IT.
            </p>
          </GlassPanel>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="border-4 border-black p-6 text-2xl font-black text-center hover:bg-black hover:text-white transition-all transform active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
              [ INIT ]
            </button>
            <button className="border-4 border-black p-6 text-2xl font-black text-center bg-black text-white hover:bg-white hover:text-black transition-all transform active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
              [ BURN ]
            </button>
          </div>

          <TerminalWindow title="KERNEL_STRESS" className="h-64 border-black bg-white/50 text-black">
             <div className="space-y-1 text-sm font-bold">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={i % 4 === 0 ? "text-black bg-black/10" : ""}>
                    {">"} SECTOR_{i*128} BIT_FLIP [{(Math.random() * 100).toFixed(2)}%] ... OK
                  </div>
                ))}
                <div className="text-white bg-black animate-pulse px-2 py-1 mt-2 inline-block">SYSTEM_FAILURE_IMMINENT</div>
             </div>
          </TerminalWindow>
        </div>
        
        {/* Center: The Visualizer */}
        <div className="lg:col-span-8 relative">
          <div className="h-full border-[12px] border-black relative overflow-hidden group shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            {/* Bit-crushed Matrix */}
            <div className="absolute inset-0 grayscale contrast-[200%] brightness-[150%]">
              <NeuralMatrixGrid />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center pointer-events-none z-10">
               <GlitchText text="TOTAL_COLLAPSE" className="text-8xl font-black leading-none" />
               <div className="mt-4 bg-black text-white px-6 py-2 text-2xl font-black italic animate-bounce">
                 AESTHETIC_DEBT: 100%
               </div>
            </div>
            
            {/* Aggressive Data Overlays */}
            <div className="absolute top-4 left-4 font-black text-xs space-y-1">
              <div>X_COORD: <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.1 }}>0xFF4A</motion.span></div>
              <div>Y_COORD: <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}>0x002C</motion.span></div>
            </div>

            <div className="absolute bottom-4 right-4 text-right">
              <div className="text-6xl font-black">88%</div>
              <div className="text-xs bg-black text-white px-2">FRAGMENTATION</div>
            </div>

            {/* Kinetic Screen Tear Effect */}
            <motion.div 
              animate={{ y: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-32 bg-black/5 backdrop-invert z-20 pointer-events-none"
            />
          </div>
        </div>
      </div>
      
      {/* Brutalist Footer */}
      <footer className="mt-12 pt-6 border-t-8 border-black flex justify-between items-center font-black">
        <div className="text-4xl italic">GNIEWISLAWA_OS</div>
        <div className="flex gap-8 text-xl">
           <span className="animate-pulse">● LIVE</span>
           <span>[ NO_COMPROMISE ]</span>
           <span className="bg-black text-white px-2">V5.0_BETA</span>
        </div>
      </footer>
      
      <style jsx global>{`
        body {
          background-color: white !important;
          color: black !important;
          font-family: 'JetBrains Mono', monospace;
        }
        * {
          border-color: black !important;
        }
      `}</style>
    </div>
  );
}
