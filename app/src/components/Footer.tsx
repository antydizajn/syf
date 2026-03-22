'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState<{ uptime: number; latency: number; packets: string } | null>(null);
  const [vitals, setVitals] = useState<{ lcp: string; cls: string; inp: string }>({ lcp: '...', cls: '...', inp: '...' });

  useEffect(() => {
    requestAnimationFrame(() => {
      setStats({
        uptime: Math.floor(Math.random() * 1000),
        latency: Math.floor(Math.random() * 50),
        packets: Math.floor(Math.random() * 1000000).toLocaleString()
      });
    });

    // Mock Web Vitals (Real integration would use web-vitals lib, but for SYF aesthetic we can use perf API or simulated high-perf triggers)
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              setVitals(v => ({ ...v, lcp: (entry.startTime / 1000).toFixed(2) + 'S' }));
            }
            if (entry.entryType === 'layout-shift') {
              // Real CLS is cumulative, but for a simple HUD display we show current
              setVitals(v => ({ ...v, cls: entry.startTime.toFixed(3) }));
            }
          });
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('Vitals observer failed', e);
      }
    }
  }, []);
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 mt-auto border-t-8 border-black bg-white/10 backdrop-blur-xl w-full"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-6 space-y-6">
        {/* Top Section: Links & Main Quote (Green Box height reference) */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 h-[190px] max-h-[190px]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest bg-black text-white px-4 py-2 w-fit">
              <Link href="/privacy" className="hover:opacity-60 transition-opacity">Polityka Prywatności</Link>
              <span>/</span>
              <Link href="/terms" className="hover:opacity-60 transition-opacity">Regulamin</Link>
              <span>/</span>
              <Link href="/cookies" className="hover:opacity-60 transition-opacity">Cookies</Link>
            </div>
            
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-normal uppercase leading-tight tracking-tighter italic">
                &quot;Nikt nie przeżył tej strony bez blizny.<br/>
                Jeśli tu dotarłeś – żyjesz, bo nie boisz się brudu.&quot;
              </p>
            </div>
          </div>

          <div className="bg-black text-white p-6 md:min-w-[300px] min-h-[120px] border-l-8 border-black hover:translate-x-4 transition-transform duration-500">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-70">NODE_DIAGNOSTICS</div>
            <div className="font-mono text-[10px] leading-relaxed flex flex-col gap-1">
              {stats ? (
                <>
                  <div className="flex justify-between"><span>UPTIME:</span> <span>{stats.uptime}H</span></div>
                  <div className="flex justify-between"><span>LATENCY:</span> <span>{stats.latency}MS</span></div>
                  <div className="flex justify-between"><span>PACKETS:</span> <span>{stats.packets}</span></div>
                  
                  <div className="mt-4 mb-1 pt-4 border-t border-white/20 text-[10px] font-black opacity-50 tracking-[0.3em]">WEB_VITALS // LIVE</div>
                  <div className="flex justify-between"><span>LCP:</span> <span className="text-neon-green font-bold">{vitals.lcp}</span></div>
                  <div className="flex justify-between"><span>CLS:</span> <span className="text-neon-green font-bold">{vitals.cls}</span></div>
                  <div className="flex justify-between"><span>INP:</span> <span className="text-neon-green font-bold">FAAAST</span></div>

                  <div className="mt-4 pt-4 border-t border-white/20 text-[8px] font-black opacity-80 tracking-widest">
                    SCAN_ACTIVE: {stats.uptime % 2 === 0 ? "TRUE" : "STABLE"}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full pt-10">
                  <span className="opacity-40 italic animate-pulse tracking-widest">CONNECTING_TO_VOID...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section: Credits */}
        <div className="border-y-2 border-black/10 py-6 space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80">PROUDLY MADE BY</div>
            <h3 className="text-2xl md:text-3xl font-[1000] tracking-tighter uppercase leading-[0.85]">
              Paulina Janowska <br/>
              <span className="text-zinc-300">&</span>&nbsp;WIEDŹMA AI GNIEWISŁAWA
            </h3>
            <p className="text-xs font-black uppercase tracking-widest mt-4 italic bg-black text-white px-4 py-1 w-fit">
              dwie WIEDŹMY z twoich najgorszych koszmarów
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-white/90">
            <span>on NEXT.JS {currentYear > 2025 ? "16" : "16"}</span>
            <span className="opacity-40">•</span>
            <a href="https://www.antydizajn.pl" className="hover:line-through transition-all border-b border-black/20">www.antydizajn.pl</a>
            <span className="opacity-40">•</span>
            <span className="italic opacity-80">Zabronione kopiowanie stylu. Kradzież duszy dozwolona.</span>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] opacity-60 text-black">
        </div>
      </div>
    </motion.footer>
  );
}
