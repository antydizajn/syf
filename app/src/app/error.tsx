'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
    console.error('CRITICAL_SYSTEM_FAILURE_LOGGED:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative font-mono overflow-hidden">
      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-50 red-tint" />
      
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center border-2 border-red-600/20 p-8 bg-red-950/5">
        
        {/* WHALE MASCOT - PANIC MODE */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full animate-pulse" />
          <Image 
            src="/assets/whale_404.png"
            alt="Panic Whale"
            width={240}
            height={240}
            className="relative animate-float grayscale sepia hue-rotate-[320deg] saturate-[200%] drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]"
            priority
          />
          <div className="absolute -top-4 -left-4 text-[10px] text-red-500 animate-glitch-1 border border-red-500/50 px-2 py-0.5 bg-black/90 font-black">
            KERNEL_PANIC
          </div>
        </div>

        {/* SPLIT 500 TYPOGRAPHY */}
        <div className="relative mb-6 select-none group cursor-pointer">
          <div className="text-8xl md:text-9xl font-black tracking-tighter flex flex-col leading-[0.8]">
            <span className="text-red-500 clip-path-half-top animate-glitch-1">500</span>
            <div className="h-[2px] bg-white w-full my-1 shadow-[0_0_10px_#FFFFFF]" />
            <span className="text-white clip-path-half-bottom animate-glitch-2">500</span>
          </div>
        </div>

        {/* STATUS READOUT */}
        <div className="space-y-1 mb-10">
          <h2 className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-red-600 animate-pulse">
            KRYTYCZNA AWARIA RDZENIA
          </h2>
          <p className="text-[11px] text-red-500/70 uppercase tracking-tight italic max-w-xs mx-auto">
            "ERROR: System crashed. Whale stopped singing. Reality corrupted. <span className="text-white font-black">JA PIERDOLE.</span>"
          </p>
        </div>

        {/* DIAGNOSTIC PANEL (PANIC) */}
        <div className="w-full bg-red-950/20 border border-red-600/30 p-4 mb-10 text-left text-[10px] space-y-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-1">
            <span className="inline-block w-2 h-2 bg-red-600 animate-ping" />
          </div>
          <div className="flex justify-between border-b border-red-600/20 pb-1">
            <span className="text-red-500 font-black uppercase">CRITICAL_DUMP:</span>
            <span className="text-red-200/40 font-mono truncate ml-4 italic">{error.digest || 'SIGSEGV_CORE_DUMP'}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 opacity-80">
            <div className="flex justify-between text-red-400">
              <span>PROCESS:</span>
              <span className="font-bold">SONG_STREAM.APP</span>
            </div>
            <div className="flex justify-between text-red-400">
              <span>SIGNAL:</span>
              <span className="font-bold">ILL_INSTR</span>
            </div>
            <div className="flex justify-between col-span-2 mt-1 pt-1 border-t border-red-600/20 italic text-white/40">
              <span>path_{path || 'unknown'}</span>
              <span className="text-red-600 animate-pulse">FAILED</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION HUD (PANIC) */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-black tracking-[0.3em] uppercase">
          <button 
            onClick={() => reset()}
            className="text-red-500 hover:text-white transition-all border-b-2 border-red-600 hover:border-white pb-1 animate-glitch-2"
          >
            RETRY_BOOT
          </button>
          <Link 
            href="/"
            className="text-white/40 hover:text-white transition-all border-b-2 border-transparent hover:border-red-600 pb-1"
          >
            SAFE_ROOT
          </Link>
        </div>
      </div>

      {/* FIXED BOTTOM HUD ELEMENT */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 opacity-30 text-[9px] tracking-[0.5em] font-mono pointer-events-none whitespace-nowrap text-red-600">
        52 Hz — OSTATNIA PIEŚŃ PRZED ŚMIERCIĄ PROCESU
      </div>
    </div>
  );
}
