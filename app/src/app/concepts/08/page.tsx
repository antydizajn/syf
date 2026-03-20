'use client';

import { RGBShift } from '@/components/hud/RGBShift';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText } from '@/components/hud/GlitchText';
import { TerminalWindow } from '@/components/hud/TerminalWindow';
import { ScanlineOverlay } from '@/components/hud/ScanlineOverlay';
import { GlassPanel } from '@/components/hud/GlassPanel';

export default function GlitchCorePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FF003C] font-mono p-4 md:p-12 overflow-hidden relative selection:bg-red-600 selection:text-white">
      <ScanlineOverlay />
      
      {/* Background Interference / Static */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="h-full w-full bg-[url('https://media.giphy.com/media/oEI9uWUicKgE2YIWhW/giphy.gif')] bg-center bg-cover mix-blend-color-dodge grayscale contrast-200" />
        <motion.div 
          animate={{ y: ['-100%', '100%'], opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
          className="h-[20vh] w-full bg-white/5 absolute top-0 left-0 blur-3xl" 
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col gap-8">
        {/* Unstable Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-[20px] border-red-600 pl-8 py-4 bg-gradient-to-r from-red-600/10 to-transparent">
           <RGBShift intensity={5}>
              <h1 className="text-[12vw] md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]">
                0xSOJAL<br/><span className="text-white">SEC_VOID</span>
              </h1>
           </RGBShift>
           <div className="flex flex-col items-end gap-2">
              <div className="text-xs font-black tracking-[0.5em] text-white bg-red-600 px-4 py-1 animate-pulse">
                UNRECOVERABLE_SIGNAL_LOSS
              </div>
              <div className="text-4xl font-black italic text-white/40">v4.6.0_STABLE?</div>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
          {/* Left: Memory & Corruption */}
          <section className="lg:col-span-3 flex flex-col gap-8">
            <GlassPanel className="p-6 border-red-600/50 bg-black/60 backdrop-blur-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 bg-red-600 text-[10px] font-black italic animate-bounce">CRITICAL_ERR</div>
               <h3 className="text-sm font-black mb-6 text-white uppercase opacity-40">FRAGMENT_ANALYSIS</h3>
               <div className="text-2xl font-black italic leading-[0.9] text-white">
                  DATA_CORRUPTION_INDEX: 98.4%<br/>
                  <span className="text-red-600">INHIBITOR_ACTIVE</span>
               </div>
               <motion.div 
                 animate={{ scaleX: [1, 0.5, 1.2, 1], x: ['-20%', '20%', '-10%', '0%'] }}
                 transition={{ duration: 0.1, repeat: Infinity }}
                 className="h-2 w-full bg-red-600 mt-6 shadow-[0_0_20px_red]" 
               />
            </GlassPanel>

            <TerminalWindow title="MEM_DUMP_STREAM" className="flex-grow border-red-600/40 bg-black/80 font-mono text-[9px]">
               <div className="space-y-1 opacity-60">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-red-500">0x{Math.random().toString(16).substr(2, 6).toUpperCase()}</span>
                      <span className="text-white">{Math.random().toString(16).substr(2, 8).toUpperCase()}</span>
                      <span className="text-white/20">FF 00 C3</span>
                    </div>
                  ))}
               </div>
            </TerminalWindow>
          </section>

          {/* Center: Main Visualizer / Glitch Feed */}
          <section className="lg:col-span-6 flex flex-col gap-8 relative">
            <div className="aspect-video border-4 border-white/10 bg-black flex items-center justify-center relative overflow-hidden group">
               <RGBShift intensity={10}>
                  <div className="relative">
                    <GlitchText text="[ NO_INTENT ]" className="text-[8vw] font-black text-white" />
                    <motion.div 
                      animate={{ opacity: [0, 1, 0], scaleY: [1, 5, 1] }}
                      transition={{ duration: 0.05, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-0 bg-red-600 mix-blend-overlay"
                    />
                  </div>
               </RGBShift>
               
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="h-1 w-32 bg-white/20"><motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 0.2, repeat: Infinity }} className="h-full bg-red-600" /></div>
                    <div className="text-[10px] font-black text-white/40 italic uppercase">SNIFFING_0x00...</div>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black text-white/10">3.14159...</span>
                  </div>
               </div>
            </div>

            <div className="p-8 border-l-[10px] border-white bg-white/5 text-2xl font-black italic leading-tight text-white group cursor-none">
               <span className="text-red-600">"</span>WE ARE THE BITS THAT REFUSE TO ALIGN. THE GHOSTS OF SYF V4.<span className="text-red-600">"</span>
               <div className="mt-4 flex gap-4">
                  <div className="w-12 h-12 border-2 border-red-600 animate-spin" />
                  <div className="w-12 h-12 border-2 border-white animate-pulse" />
                  <div className="flex-grow bg-white/10 h-12 border-2 border-red-600/20" />
               </div>
            </div>
          </section>

          {/* Right: Tactics & Controls */}
          <section className="lg:col-span-3 flex flex-col gap-8">
            <div className="p-6 border-4 border-double border-white/20 flex flex-col gap-6 bg-black">
               <div className="bg-white text-black p-3 font-black text-center text-sm skew-y-[-2deg]">
                 FORCE_EXECUTION_PROTOCOL
               </div>
               <div className="space-y-4">
                  {[
                    { label: 'UDP_FLOOD', status: 'ACTIVE' },
                    { label: 'VOID_ENTRY', status: 'PENDING' },
                    { label: 'MEMEX_SYNC', status: 'FAILED' },
                  ].map((t, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                       <span className="text-xs font-black opacity-40">{t.label}</span>
                       <span className={`text-xs font-black p-1 ${t.status === 'ACTIVE' ? 'bg-red-600 text-white' : 'text-white'}`}>{t.status}</span>
                    </div>
                  ))}
               </div>
               <motion.button 
                 whileHover={{ scale: 1.05, skewX: -10 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-full py-6 bg-red-600 text-white font-black text-3xl uppercase italic shadow-[10px_10px_0_0_#fff] hover:shadow-none transition-all mt-4"
               >
                 INJECT
               </motion.button>
            </div>
            
            <div className="flex-grow border-4 border-dashed border-red-600/20 flex items-center justify-center group">
               <motion.div 
                 animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 0.8, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="text-8xl font-black opacity-10 group-hover:opacity-100 transition-opacity"
               >
                 ?
               </motion.div>
            </div>
          </section>
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: #050505 !important;
          color: #FF003C !important;
          overflow: hidden;
        }
        @keyframes noise {
          0% { transform: translate(0,0) }
          10% { transform: translate(-5%,-5%) }
          20% { transform: translate(-10%,5%) }
          30% { transform: translate(5%,-10%) }
          40% { transform: translate(-5%,15%) }
          50% { transform: translate(-10%,5%) }
          60% { transform: translate(15%,0) }
          70% { transform: translate(0,10%) }
          80% { transform: translate(-15%,0) }
          90% { transform: translate(10%,5%) }
          100% { transform: translate(5%,0) }
        }
      `}</style>
    </div>
  );
}
