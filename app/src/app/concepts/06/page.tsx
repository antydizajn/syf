'use client';

import { NeonGrid } from '@/components/hud/NeonGrid';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText } from '@/components/hud/GlitchText';
import { ScanlineOverlay } from '@/components/hud/ScanlineOverlay';
import { RGBShift } from '@/components/hud/RGBShift';
import { TerminalWindow } from '@/components/hud/TerminalWindow';
import { Gauge } from '@/components/hud/Gauge';

export default function RetroArcadePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white font-mono flex flex-col p-6 md:p-12 selection:bg-pink-500 selection:text-white">
      <NeonGrid />
      <ScanlineOverlay />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.1)_0%,transparent_80%)] pointer-events-none" />
      
      {/* CRT Ghosting Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.15),rgba(0,255,0,0.05),rgba(0,0,255,0.15))] bg-[length:100%_2px,3px_100%] animate-pulse" />

      <div className="relative z-10 w-full flex-grow flex flex-col gap-12">
        {/* Arcade Header */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-8 border-b-8 border-pink-500 pb-8 shadow-[0_4px_0_0_#ec4899]">
           <div className="text-center lg:text-left">
              <h1 className="text-[10vw] lg:text-8xl font-black italic tracking-tight leading-none drop-shadow-[0_0_30px_rgba(255,0,255,1)] text-white uppercase">
                RETRO<br/><span className="text-cyan-400">ARCADE</span>
              </h1>
              <div className="mt-4 flex gap-6 text-xl font-black tracking-widest text-pink-500 animate-pulse">
                <span>INSERT_COIN_V4</span>
                <span>[ 00 ]</span>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
              <div className="bg-pink-500 text-black p-4 flex flex-col items-center justify-center shadow-[4px_4px_0_0_#fff]">
                 <span className="text-xs font-black">HIGH_SCORE</span>
                 <span className="text-4xl font-black tracking-tighter">999,999</span>
              </div>
              <div className="bg-cyan-500 text-black p-4 flex flex-col items-center justify-center shadow-[4px_4px_0_0_#fff]">
                 <span className="text-xs font-black">CURRENT</span>
                 <span className="text-4xl font-black tracking-tighter">000,000</span>
              </div>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
           {/* Left: Hall of Fame */}
           <section className="lg:col-span-4 space-y-8">
              <div className="border-8 border-pink-500 p-8 bg-black/90 backdrop-blur-xl shadow-[0_0_50px_rgba(255,0,255,0.2),inset_0_0_20px_rgba(255,0,255,0.1)] relative overflow-hidden group">
                 <h2 className="text-3xl font-black text-pink-500 mb-8 uppercase italic tracking-[0.1em] border-b-4 border-pink-500 pb-2">Top Guardians</h2>
                 <div className="space-y-6 text-2xl">
                    {[
                       { name: 'PAULINA', score: '999,999', color: 'text-white' },
                       { name: 'GNIEWKA', score: '888,888', color: 'text-cyan-400' },
                       { name: 'OPUS_4.6', score: '777,777', color: 'text-pink-400' },
                       { name: 'SYF_V4_CORE', score: '666,666', color: 'text-yellow-400 animate-pulse' },
                    ].map((h, i) => (
                       <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        key={i} 
                        className="flex justify-between items-center group cursor-crosshair overflow-hidden"
                       >
                          <span className={`group-hover:translate-x-4 transition-transform font-black ${h.color}`}>
                             {i + 1}. {h.name}
                          </span>
                          <span className="font-black tabular-nums">{h.score}</span>
                       </motion.div>
                    ))}
                 </div>
                 {/* Decorative Pixels */}
                 <div className="absolute top-0 right-0 w-8 h-8 bg-pink-500/20 m-2" />
                 <div className="absolute bottom-0 left-0 w-4 h-4 bg-cyan-500/20 m-2" />
              </div>
              
              <TerminalWindow title="ACTION_LOG" className="h-64 border-cyan-500 border-4 bg-black/80">
                 <div className="space-y-1 text-xs font-black text-cyan-500/80">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i}>{">"} P1 {Math.random() > 0.5 ? 'POWERUP_GAINED' : 'SHIELDS_CRITICAL_0.4ms'}</div>
                    ))}
                    <div className="text-white bg-pink-500 px-2 mt-4 animate-bounce inline-block">PERFECT_STILL_REACHABLE</div>
                 </div>
              </TerminalWindow>
           </section>

           {/* Right: Status & Mission Control */}
           <section className="lg:col-span-8 flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                 <div className="border-8 border-cyan-500 p-8 bg-black/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.2)] flex flex-col justify-between relative group">
                    <div>
                       <h2 className="text-3xl font-black text-cyan-500 mb-8 uppercase italic tracking-[0.1em] border-b-4 border-cyan-500 pb-2">Diagnostic</h2>
                       <div className="space-y-6">
                          <div>
                            <div className="flex justify-between text-xs font-black mb-2 uppercase">Core_Intensity</div>
                            <Gauge value={94} label="AESTHETIC" className="h-4 bg-cyan-900" />
                          </div>
                          <div className="text-xl font-black space-y-2 opacity-80">
                            <div>FPS_LOCK_ACTIVE // 144</div>
                            <div>DRIVE_SATA_VOID // OK</div>
                            <div className="text-pink-500">GLITCH_DETECTED: TRUE</div>
                          </div>
                       </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, filter: 'brightness(1.5)', rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-6 bg-cyan-500 text-black font-black text-4xl uppercase italic tracking-[0.2em] shadow-[8px_8px_0_0_#ec4899] hover:shadow-none transition-all mt-8"
                    >
                      START
                    </motion.button>
                 </div>

                 <div className="border-8 border-white p-8 bg-black flex flex-col justify-center items-center gap-10 relative overflow-hidden">
                    <RGBShift>
                      <GlitchText text="GAME_OVER" className="text-7xl font-black text-white text-center" />
                    </RGBShift>
                    <div className="text-center font-black text-xl space-y-4">
                       <p className="text-pink-500 animate-pulse scale-150 tracking-widest">WANT TO CONTINUE?</p>
                       <p className="text-cyan-400">9 SECONDS LEFT</p>
                    </div>
                    {/* Animated Sprite Placeholder */}
                    <motion.div 
                      animate={{ 
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1] 
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-pink-500 to-cyan-500 shadow-[0_0_40px_white]"
                    />
                 </div>
              </div>
           </section>
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: black !important;
          color: white !important;
          font-family: 'Press Start 2P', 'JetBrains Mono', cursive, monospace;
        }
      `}</style>
    </div>
  );
}
