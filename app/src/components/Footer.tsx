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
      className="relative z-10 mt-auto border-t-8 border-black bg-white py-12 px-4 md:px-10 -mx-4 md:-mx-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <div className="bg-black text-white px-4 py-2 text-4xl font-black uppercase tracking-tighter w-fit">
            ANTYDIZAJN.PL
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black opacity-60">
            © {currentYear} // ALL_SYSTEMS_GO // SYF_V5.0
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-12">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">STATUS</div>
            <div className="text-xs font-black uppercase text-black">[ ONLINE_ENCRYPTED ]</div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">COGNITION</div>
            <div className="text-xs font-black uppercase text-black">GNIEWISŁAWA_AI</div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">ENVIRONMENT</div>
            <div className="text-xs font-black uppercase text-black">OS_SYF_RUNTIME</div>
          </div>
        </div>

        <div className="bg-black text-white p-4 hidden lg:block">
          <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">NODE_DIAGNOSTICS</div>
          <div className="font-mono text-[9px] leading-tight flex flex-col gap-1 min-w-[120px]">
            {stats ? (
              <>
                <span>{"> "} UPTIME: {stats.uptime}h</span>
                <span>{"> "} LATENCY: {stats.latency}ms</span>
                <span>{"> "} PACKETS: {stats.packets}</span>
              </>
            ) : (
              <span className="opacity-20">INITIALIZING...</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-4 border-t border-black/10 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] opacity-30">
        <span>SECURITY_PROTOCOL: ACTIVATED</span>
        <span>LATERAL_THINKING_REQUIRED</span>
        <span>NO_SIGNAL_FOUND</span>
      </div>
    </motion.footer>
  );
}
