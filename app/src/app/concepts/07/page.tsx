'use client';

import { Reticle } from '@/components/hud/Reticle';
import { DiagnosticPanel } from '@/components/hud/DiagnosticPanel';
import { Gauge } from '@/components/hud/Gauge';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanlineOverlay } from '@/components/hud/ScanlineOverlay';
import { GlassPanel } from '@/components/hud/GlassPanel';
import { TerminalWindow } from '@/components/hud/TerminalWindow';
import { GlitchText } from '@/components/hud/GlitchText';

export default function MilitaryHudPage() {
  return (
    <div className="min-h-screen bg-[#051005] text-[#39FF14] font-mono p-4 flex flex-col items-center justify-between overflow-hidden selection:bg-[#39FF14] selection:text-black">
      <ScanlineOverlay />
      
      {/* Tactical Topography / Noise */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_90%)] pointer-events-none" />
      
      {/* High-Speed Telemetry Streams */}
      <div className="fixed left-4 top-1/4 bottom-1/4 w-12 flex flex-col gap-1 overflow-hidden opacity-30 text-[8px] font-black z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div 
            key={i}
            animate={{ y: [0, -100] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
          >
            {Math.random().toString(16).toUpperCase()}
          </motion.div>
        ))}
      </div>

      {/* Top Banner / Altitude & Speed */}
      <header className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <GlassPanel className="p-6 border-[#39FF14]/50 bg-black/40 backdrop-blur-md">
           <div className="text-xs font-black tracking-widest opacity-60 mb-2">SPEED_VECTOR // KTS</div>
           <div className="text-6xl font-black flex items-baseline gap-2 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">
              740 <span className="text-xl opacity-40">MACH_1.4</span>
           </div>
           <div className="mt-4 w-full h-1 bg-[#39FF14]/10 overflow-hidden">
              <motion.div 
                animate={{ width: ['70%', '85%', '80%'] }} 
                transition={{ duration: 0.2, repeat: Infinity }}
                className="h-full bg-[#39FF14]" 
              />
           </div>
        </GlassPanel>
        
        <div className="flex flex-col items-center gap-4">
           <motion.div 
             animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
             transition={{ duration: 0.5, repeat: Infinity }}
             className="px-8 py-2 bg-[#39FF14] text-black font-black text-xl italic skew-x-[-12deg]"
           >
              THREAT_LEVEL: OMEGA
           </motion.div>
           <div className="text-xs font-bold tracking-[0.5em] text-[#39FF14] animate-pulse">LOCK_ON_IN_PROGRESS_v4.1</div>
        </div>

        <GlassPanel className="p-6 border-[#39FF14]/50 bg-black/40 backdrop-blur-md text-right">
           <div className="text-xs font-black tracking-widest opacity-60 mb-2">ALTITUDE_MSL // FT</div>
           <div className="text-6xl font-black flex items-baseline justify-end gap-2 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">
              42,800 <span className="text-xl opacity-40">AGL</span>
           </div>
           <div className="mt-4 w-full h-1 bg-[#39FF14]/10 overflow-hidden ml-auto">
              <motion.div 
                animate={{ width: ['60%', '65%', '62%'] }} 
                transition={{ duration: 0.3, repeat: Infinity }}
                className="h-full bg-[#39FF14]" 
              />
           </div>
        </GlassPanel>
      </header>

      {/* Main Center Reticle */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow py-10 w-full">
         <div className="absolute inset-x-0 h-[2px] bg-[#39FF14]/30 shadow-[0_0_20px_#39FF14]" />
         <div className="absolute inset-y-0 w-[2px] bg-[#39FF14]/30 shadow-[0_0_20px_#39FF14]" />
         
         <div className="relative group">
            <Reticle />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-20 border border-[#39FF14]/10 rounded-full border-dashed"
            />
            <div className="absolute -top-32 -left-32 text-xs font-black space-y-1 opacity-60">
               <div>TARGET_ID: GNIEWKA_CORE</div>
               <div>DISTANCE: 12.4km</div>
               <div>VELOCITY: 1,200m/s</div>
            </div>
         </div>
         
         <div className="mt-20 grid grid-cols-2 gap-32">
            <div className="flex flex-col items-end gap-1">
               <span className="text-xs font-black opacity-30">HEADING_AZIMUTH</span>
               <span className="text-5xl font-black tracking-tighter drop-shadow-[0_0_10px_#39FF14]">284.1</span>
            </div>
            <div className="flex flex-col items-start gap-1">
               <span className="text-xs font-black opacity-30">PITCH_ATTITUDE</span>
               <span className="text-5xl font-black tracking-tighter drop-shadow-[0_0_10px_#39FF14]">+12.5°</span>
            </div>
         </div>
      </main>

      {/* Bottom Interface */}
      <footer className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 items-end relative z-10">
         <TerminalWindow title="THREAT_LIBRARY" className="h-48 border-[#39FF14] bg-black/60 backdrop-blur-xl">
            <div className="space-y-2 text-[10px] font-black uppercase text-[#39FF14]">
               <div className="flex justify-between border-b border-[#39FF14]/20 pb-1"><span>SU-57 FELON</span> <span className="text-red-500">HOSTILE</span></div>
               <div className="flex justify-between border-b border-[#39FF14]/20 pb-1"><span>F-35C LIGHTNING</span> <span className="text-blue-400">FRIENDLY</span></div>
               <div className="flex justify-between border-b border-[#39FF14]/20 pb-1"><span>S-400 BATTERY</span> <span className="text-red-600 animate-pulse">LOCKED</span></div>
               <div className="pt-2 text-[8px] opacity-40 leading-tight">
                  NEURAL_IDENT_ACTIVE... SYF_V4_OVERRIDE_RUNNING...
               </div>
            </div>
         </TerminalWindow>

         <div className="lg:col-span-2 space-y-6 bg-black/40 p-6 border-t-4 border-[#39FF14]/20 relative overflow-hidden">
            <div className="grid grid-cols-2 gap-8">
               <Gauge label="REACTOR_INTENSITY" value={92} color="#39FF14" className="h-4" />
               <Gauge label="NEURAL_LOAD" value={47} color="#ccff00" className="h-4" />
            </div>
            <div className="flex justify-between text-xs font-black tracking-[0.2em] italic">
               <GlitchText text="SYSTEM: SUPREME" className="text-white" />
               <span className="text-[#39FF14]">MISSION_TIME: 00:42:12</span>
               <span className="text-red-500">VOICE_AUTH_REQUIRED</span>
            </div>
         </div>

         <div className="h-48 border-4 border-[#39FF14] bg-[#051005] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_100%)]" />
            <div className="p-4 border-b border-[#39FF14] bg-[#39FF14] text-black font-black text-xs">RADAR_SWEEP_X8</div>
            <div className="relative h-full w-full flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-tr from-[#39FF14]/40 to-transparent origin-center rounded-full scale-150"
               />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 1, repeat: Infinity }}
                 className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_20px_red]"
               />
               <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none border border-[#39FF14]/10" />
            </div>
         </div>
      </footer>

      <style jsx global>{`
        body {
          background-color: #051005 !important;
          color: #39FF14 !important;
          cursor: crosshair;
        }
      `}</style>
    </div>
  );
}
