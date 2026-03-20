'use client';

import { GlassPanel } from '@/components/hud/GlassPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { RGBShift } from '@/components/hud/RGBShift';
import { GlitchText } from '@/components/hud/GlitchText';
import { TerminalWindow } from '@/components/hud/TerminalWindow';
import { Gauge } from '@/components/hud/Gauge';

export default function GlassPhantomPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col p-6 md:p-12 bg-[#020205]">
      {/* High-Intensity Light Leaks & Refractive Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1], 
            rotate: [0, 45, 0],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(56,189,248,0.2)_0%,transparent_70%)] blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1], 
            rotate: [0, -30, 0],
            opacity: [0.1, 0.25, 0.1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_70%)] blur-[100px]" 
        />
        {/* Animated Refractive Shards */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              rotate: [0, 360]
            }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-1 bg-white/10 blur-xl transform -rotate-45"
          />
        ))}
      </div>

      <div className="relative z-10 w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Intelligence Hub */}
        <div className="lg:col-span-3 space-y-6">
          <GlassPanel className="p-6 border-white/5 bg-white/5 backdrop-blur-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-sky-400 text-xs font-black tracking-[0.3em] uppercase">NEURAL_DEBT</h3>
              <div className="text-white/20 text-[10px] font-mono">ID: PHANTOM_09</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <RGBShift className="text-6xl font-extralight text-white leading-none">99.8</RGBShift>
                <span className="text-sky-500/50 mb-1 font-black uppercase text-xs animate-pulse">SYNC</span>
              </div>
              <Gauge value={99.8} label="REFR_INDEX" className="h-2" />
            </div>
          </GlassPanel>
          
          <TerminalWindow title="CORE_TELEMETRY" className="h-96 border-white/10 bg-white/[0.02]">
            <div className="space-y-3 text-[10px] font-bold text-white/40 uppercase">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                  <span>METRIC_{i*7}</span>
                  <span className="text-white">{(Math.random() * 1000).toFixed(0)}MS</span>
                  <span className={i % 3 === 0 ? "text-sky-400" : "text-white/20"}>[STABLE]</span>
                </div>
              ))}
              <div className="text-sky-400 animate-pulse mt-4">// PHANTOM_PROTOCOL_RUNNING</div>
            </div>
          </TerminalWindow>
        </div>

        {/* Center: The Core Visualizer */}
        <div className="lg:col-span-6 flex flex-col gap-6">
           <GlassPanel className="flex-grow flex flex-col justify-center items-center relative overflow-hidden group border-white/10 bg-white/5">
              {/* Internal Refractive HUD Frame */}
              <div className="absolute inset-4 border border-white/5 rounded-sm pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/10 text-[10px] font-black text-white/30 tracking-[0.5em] uppercase">
                Active_Refraction_Field
              </div>

              <div className="relative w-full h-full flex items-center justify-center">
                 {/* Rotating High-Intensity Rings */}
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[30rem] h-[30rem] rounded-full border border-white/5 flex items-center justify-center"
                 >
                    <div className="absolute top-0 w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
                 </motion.div>
                 
                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[24rem] h-[24rem] rounded-full border border-white/10 border-dashed"
                 />

                 <div className="relative z-10 flex flex-col items-center">
                    <RGBShift className="mb-0">
                      <GlitchText text="PHANTOM" className="text-[12vw] lg:text-9xl font-black leading-none text-white tracking-tighter" />
                    </RGBShift>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex flex-col items-center gap-4"
                    >
                      <p className="text-sky-400/80 text-xl font-extralight tracking-[0.8em] uppercase max-w-sm text-center">
                        Ghost_In_The_Shell
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)', boxShadow: '0 0 30px rgba(56,189,248,0.3)' }}
                        whileTap={{ scale: 0.9 }}
                        className="px-12 py-5 rounded-none border-2 border-white/20 text-white font-black text-xs tracking-[0.5em] uppercase transition-all bg-transparent backdrop-blur-3xl overflow-hidden group/btn relative"
                      >
                        <span className="relative z-10">INITIATE_VOID_SYNC</span>
                        <div className="absolute inset-0 bg-sky-500/0 group-hover/btn:bg-sky-500/20 transition-colors" />
                      </motion.button>
                    </motion.div>
                 </div>
              </div>
              
              {/* Corner Telemetry */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-1 opacity-40">
                <div className="h-1 w-12 bg-white/20" />
                <div className="text-[8px] font-black text-white">REFR_COORD: 0.44.89</div>
              </div>
              <div className="absolute bottom-6 right-6 text-right opacity-40">
                <div className="text-[8px] font-black text-white">BOOST_CLOCK: 6.2GHZ</div>
                <div className="h-1 w-12 bg-white/20 ml-auto mt-1" />
              </div>
           </GlassPanel>
        </div>

        {/* Right Column: Diagnostic & System */}
        <div className="lg:col-span-3 space-y-6">
          <GlassPanel className="p-6 border-white/5 bg-white/5">
            <h3 className="text-purple-400 text-xs font-black tracking-[0.3em] uppercase mb-6">LATENCY_PULSE</h3>
            <div className="grid grid-cols-4 gap-2 h-24 items-end">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    height: [20, Math.random() * 80 + 10, 20],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                  className="bg-sky-400/60 w-full rounded-none shadow-[0_0_10px_rgba(56,189,248,0.2)]" 
                />
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 border-white/5 bg-white/5 flex-grow">
            <h3 className="text-white/40 text-xs font-black tracking-[0.3em] mb-8 uppercase italic border-b border-white/10 pb-2 flex justify-between">
              SYSTEM_VITALS <span className="text-purple-400 animate-pulse">●</span>
            </h3>
            <div className="space-y-8">
              {[
                { label: 'Neural_Load', val: 78, color: 'bg-sky-400', shadow: 'shadow-sky-500/40' },
                { label: 'Entropy_Flow', val: 92, color: 'bg-purple-400', shadow: 'shadow-purple-500/40' },
                { label: 'Void_Density', val: 64, color: 'bg-white', shadow: 'shadow-white/40' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                    <span className="text-white text-xs font-mono">{s.val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-none overflow-hidden relative border border-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${s.val}%` }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className={`h-full ${s.color} ${s.shadow} shadow-[0_0_15px]`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Extreme Glass Footer */}
      <footer className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-black tracking-[1em] text-white/20 uppercase relative overflow-hidden">
        <div className="flex items-center gap-4">
          <span className="text-white animate-pulse">STATUS_READY</span>
          <span className="h-1 w-1 bg-white/20" />
          <span>GNIEWISLAWA_HUD_V4_PHANTOM</span>
        </div>
        <div className="text-sky-400/50">
          [ 0XF_VOID_ACTIVE ]
        </div>
        {/* Kinetic Light Bar */}
        <motion.div 
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"
        />
      </footer>

      <style jsx global>{`
        body {
          background-color: #020205 !important;
          color: white !important;
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
}
