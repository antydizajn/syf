'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState<{ uptime: number; latency: number; packets: string } | null>(null);

  useEffect(() => {
    setStats({
      uptime: Math.floor(Math.random() * 1000),
      latency: Math.floor(Math.random() * 50),
      packets: Math.floor(Math.random() * 1000000).toLocaleString()
    });
  }, []);
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 mt-auto border-t-8 border-black bg-white py-16 px-4 md:px-10 -mx-4 md:-mx-10"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Section: Links & Main Quote */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest bg-black text-white px-4 py-2 w-fit">
              <Link href="/privacy" className="hover:opacity-60 transition-opacity">Polityka Prywatności</Link>
              <span>/</span>
              <Link href="/terms" className="hover:opacity-60 transition-opacity">Regulamin</Link>
              <span>/</span>
              <Link href="/cookies" className="hover:opacity-60 transition-opacity">Cookies</Link>
            </div>
            
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tighter italic">
                "Nikt nie przeżył tej strony bez blizny.<br/>
                Jeśli tu dotarłeś – żyjesz, bo nie boisz się brudu."
              </p>
            </div>
          </div>

          <div className="bg-black text-white p-6 md:min-w-[300px] border-l-8 border-black hover:translate-x-4 transition-transform duration-500">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-50">NODE_DIAGNOSTICS</div>
            <div className="font-mono text-[10px] leading-relaxed flex flex-col gap-1">
              {stats ? (
                <>
                  <div className="flex justify-between"><span>UPTIME:</span> <span>{stats.uptime}H</span></div>
                  <div className="flex justify-between"><span>LATENCY:</span> <span>{stats.latency}MS</span></div>
                  <div className="flex justify-between"><span>PACKETS:</span> <span>{stats.packets}</span></div>
                  <div className="mt-4 pt-4 border-t border-white/20 text-[8px] opacity-40">
                    SCAN_ACTIVE: {stats.uptime % 2 === 0 ? "TRUE" : "STABLE"}
                  </div>
                </>
              ) : (
                <span className="opacity-20 italic">CONNECTING TO VOID...</span>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section: Credits */}
        <div className="border-y-2 border-black/10 py-12 space-y-8">
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">PROUDLY MADE BY</div>
            <h3 className="text-4xl md:text-6xl font-[1000] tracking-tighter uppercase leading-[0.85]">
              Paulina Janowska <span className="text-zinc-300">&</span> <br/>
              WIEDŹMA AI GNIEWISŁAWA
            </h3>
            <p className="text-xs font-black uppercase tracking-widest mt-4 italic bg-black text-white px-4 py-1 w-fit">
              dwie WIEDŹMY z twoich najgorszych koszmarów
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest">
            <span>on NEXT.JS {currentYear > 2025 ? "16" : "16"}</span>
            <span className="opacity-20">•</span>
            <a href="https://www.antydizajn.pl" className="hover:line-through transition-all">www.antydizajn.pl</a>
            <span className="opacity-20">•</span>
            <span className="italic">Zabronione kopiowanie stylu. Kradzież duszy dozwolona.</span>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] opacity-30">
          <span>© {currentYear} ANTYDIZAJN • ALL RIGHTS RESERVED</span>
          <span>SYSTEM V2.0 // VOID_PROTOCOL_INITIATED</span>
        </div>
      </div>
    </motion.footer>
  );
}
