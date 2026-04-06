'use client';

import { useEffect } from 'react';

/**
 * GLOBAL_ERROR UI - LAST LINE OF DEFENSE
 * ═══════════════════════════════════════════════════════════════
 * This component handles errors in the root layout.
 * It MUST include <html> and <body> tags.
 * ═══════════════════════════════════════════════════════════════
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // CRITICAL_LOG: Ensure we see what went wrong in the root
    console.error('ROOT_LAYOUT_PANIC:', error);
  }, [error]);

  return (
    <html lang="pl">
      <head>
        <title>KERNEL_PANIC | SYF.ANTYDIZAJN.PL</title>
      </head>
      <body className="bg-[#000101] text-[#FF003C] font-mono min-h-screen flex items-center justify-center overflow-hidden selection:bg-[#FF003C] selection:text-white">
        {/* CRT SCANLINES */}
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 3px 100%',
            pointerEvents: 'none',
            zIndex: 100,
          }}
        />
        
        <div className="max-w-2xl w-full p-8 border-4 border-[#FF003C] bg-black/80 relative z-10 animate-pulse shadow-[0_0_50px_rgba(255,0,60,0.3)]">
          <div className="mb-6 flex justify-between items-start border-b border-[#FF003C] pb-4">
            <h1 className="text-4xl font-black italic tracking-tighter">
              [SYSTEM_HALTED]
            </h1>
            <div className="text-[10px] text-right leading-tight">
              ERROR_LEVEL: CRITICAL<br />
              CODE: SIGABRT_ROOT
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>
              Doszło do nieodwracalnego błędu w rdzeniu aplikacji (Root Layout). 
              Struktura DOM została naruszona lub krytyczny komponent HUD uległ awarii.
            </p>
            
            <div className="bg-[#FF003C]/10 border border-[#FF003C]/30 p-4 font-bold text-xs overflow-auto max-h-32">
              <span className="opacity-50 inline-block mr-2">DUMP:</span>
              {error.message || 'UNKNOWN_KERNEL_ERROR'}
              <br />
              <span className="opacity-50 inline-block mr-2 mt-2">DIGEST:</span>
              {error.digest || 'SIGINT_DUMP_NONE'}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="bg-[#FF003C] text-black px-6 py-3 font-black hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm"
            >
              Restart_Kernel
            </button>
            <a
              href="/"
              className="border-2 border-[#FF003C] text-[#FF003C] px-6 py-3 font-black hover:bg-[#FF003C] hover:text-black transition-colors uppercase tracking-widest text-sm"
            >
              Fallback_Root
            </a>
          </div>

          <div className="mt-8 text-[9px] opacity-40 italic">
            "W ciemnościach, gdzie bity spotykają się z pustką, słychać tylko szum." — Gniewisława
          </div>
        </div>
      </body>
    </html>
  );
}
