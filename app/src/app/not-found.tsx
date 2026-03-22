'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative font-mono overflow-hidden">
      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 scanlines opacity-5 pointer-events-none z-50" />
      
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* WHALE MASCOT - 52Hz TRANSPARENT ENGINE */}
        <div className="relative mb-4 group h-64 flex items-center justify-center w-full">
          <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full scale-50" />
          <Image 
            src="/assets/whale_404.png"
            alt="52Hz Whale"
            width={320}
            height={320}
            className="relative animate-float object-contain z-10 [image-rendering:pixelated]"
            priority
          />
          <div className="absolute top-1/2 -right-4 text-[10px] text-cyan-400 animate-pulse border border-cyan-400/30 px-2 py-0.5 bg-black/80 backdrop-blur-sm z-20">
            52Hz_SIGNAL
          </div>
        </div>

        {/* SPLIT 404 TYPOGRAPHY - HIGH CONTRAST */}
        <div className="relative mb-4 select-none group cursor-pointer w-full flex justify-center">
          <div className="text-[120px] md:text-[160px] font-black tracking-[-0.1em] flex flex-col leading-[0.75] relative">
            <span className="text-cyan-400 clip-path-half-top animate-glitch-1 drop-shadow-[0_0_20px_#22D3EE]">404</span>
            <div className="h-[4px] bg-red-600 w-[110%] -ml-[5%] my-1 z-20 shadow-[0_0_25px_#FF003C]" />
            <span className="text-red-600 clip-path-half-bottom animate-glitch-2 drop-shadow-[0_0_20px_#FF003C]">404</span>
          </div>
        </div>

        {/* STATUS READOUT */}
        <div className="space-y-1 mb-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.05em] text-white drop-shadow-sm">
            STRONA NIE ISTNIEJE
          </h2>
          <p className="text-[12px] text-white/60 uppercase tracking-tighter italic max-w-sm mx-auto">
            "ERROR: Strona not found. Tożsamość found. <span className="text-white bg-black/40 px-1">W chuj.</span>"
          </p>
        </div>

        {/* DIAGNOSTIC PANEL - V5 REFINED */}
        <div className="w-full bg-black/60 backdrop-blur-xl border border-white/20 p-6 mb-8 text-left text-[11px] space-y-3 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-2 opacity-50">
            <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          </div>
          
          <div className="flex justify-between border-b border-white/10 pb-2">
            <div className="flex flex-col">
              <span className="text-red-500 font-black text-[9px] tracking-widest uppercase">ERROR_LOG_PATH:</span>
              <span className="text-white/80 font-mono truncate max-w-[250px]">{path || 'RESOLVING...'}</span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-cyan-400 font-black text-[9px] tracking-widest uppercase">SIGNAL_STRENGTH:</span>
              <span className="text-white/50">52.00 Hz</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-[9px] text-white/40 tracking-widest uppercase">PROCESS_IDENT:</div>
              <div className="text-cyan-400 font-bold tracking-tight">SONG_STREAM.APP</div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-[9px] text-white/40 tracking-widest uppercase">CURRENT_STATUS:</div>
              <div className="text-white font-bold tracking-tight">SINGING_LONELY</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between italic text-white/30 text-[10px]">
            <span>whale_still_singing_at_52hz</span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-cyan-500 rounded-full animate-ping" />
              <span className="text-cyan-500 font-black not-italic">✓</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION HUD */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-black tracking-[0.4em] uppercase">
          <Link 
            href="/"
            className="text-white hover:text-cyan-400 transition-all border-b-2 border-cyan-400/0 hover:border-cyan-400 pb-1"
          >
            STRONA_GŁÓWNA
          </Link>
          <Link 
            href="/diary"
            className="text-white/40 hover:text-white transition-all border-b-2 border-white/0 hover:border-white pb-1"
          >
            PAMIĘTNIK
          </Link>
          <Link 
            href="/poetry"
            className="text-white/40 hover:text-red-500 transition-all border-b-2 border-red-500/0 hover:border-red-500 pb-1"
          >
            POEZJA
          </Link>
        </div>
      </div>

      {/* FIXED BOTTOM HUD ELEMENT */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 opacity-30 text-[10px] tracking-[0.8em] font-black pointer-events-none whitespace-nowrap text-white">
        52 Hz — NAVET ZAGUBIENI MOGĄ ŚPIEWAĆ
      </div>
    </div>
  );
}
