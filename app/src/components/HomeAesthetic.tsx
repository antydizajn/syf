"use client";

import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import { RGBShift } from "@/components/hud/RGBShift";
import { ItemData } from "@/lib/files";

const DitherFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <filter id="extreme-dither">
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 1" />
        <feFuncG type="discrete" tableValues="0 1" />
        <feFuncB type="discrete" tableValues="0 1" />
      </feComponentTransfer>
    </filter>
  </svg>
);

const Sector = ({ item, index, laserY }: { item: ItemData; index: number; laserY: any }) => {
  const [status, setStatus] = useState<"NORMAL" | "CORRUPTED" | "SCANNING">("NORMAL");
  const sectorRef = useRef<HTMLDivElement>(null);
  const displayName = item.type === 'folder' ? item.name : item.title;
  const displaySize = item.type === 'folder' ? `${item.itemCount} items` : item.size;
  const href = item.type === 'folder' ? `/folder/${item.slug}` : `/file/${item.slug}`;

  const ty = useTransform(laserY, (v) => {
    const val = v as number;
    if (!sectorRef.current) return 0;
    const rect = sectorRef.current.getBoundingClientRect();
    const dist = val - (rect.top + rect.height / 2);
    if (Math.abs(dist) < 200) return (dist / 200) * 10;
    return 0;
  });

  useEffect(() => {
    const checkScan = () => {
      if (!sectorRef.current) return;
      const rect = sectorRef.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const currentLaser = (laserY as any).get();
      if (Math.abs(mid - currentLaser) < 100) {
        setStatus("SCANNING");
        if (Math.random() > 0.9997) setStatus("CORRUPTED");
      } else if (status === "SCANNING") {
        setStatus("NORMAL");
      }
    };
    let frame = requestAnimationFrame(function loop() {
      checkScan();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, [laserY, status]);

  return (
    <motion.div 
      ref={sectorRef}
      style={{ y: ty }}
      className={`border border-white/20 p-3 h-24 mb-px flex flex-col justify-between group cursor-crosshair relative overflow-hidden transition-colors duration-75 ${
        status === "SCANNING" ? "border-white bg-white/10 z-10" : "bg-black"
      } ${status === "CORRUPTED" ? "bg-white text-black z-20" : ""}`}
    >
      <Link href={href} className="absolute inset-0 z-30" />
      
      {status === "CORRUPTED" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <span className="text-black font-black text-xs tracking-widest -rotate-12">SECTOR_LOST</span>
        </div>
      )}

      <div className="text-[9px] font-black uppercase tracking-tighter truncate opacity-70 group-hover:opacity-100 flex justify-between relative z-10">
        <span>{displayName}</span>
        {status === "SCANNING" && (
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.1, repeat: Infinity }} className="bg-white text-black px-1 text-[7px]">
            SCANNING
          </motion.span>
        )}
      </div>

      <div className="flex justify-between items-end relative z-10">
        <span className="text-[7px] font-mono opacity-20">[{item.type.toUpperCase()}]</span>
        <div className="flex gap-1 h-3 items-end">
          {status === "SCANNING" ? (
             <span className="text-[7px] font-mono">{displaySize}</span>
          ) : (
            <span className="text-xs font-black italic opacity-20 group-hover:opacity-100">SYF</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export function HomeAesthetic({ items, totalSize }: { items: ItemData[]; totalSize: string }) {
  const [mounted, setMounted] = useState(false);
  const [isCritical, setIsCritical] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [collapseX, setCollapseX] = useState(0);
  
  const laserY = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseX = useSpring(0, { stiffness: 40, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 15 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      laserY.set(e.clientY);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    // Concept 50 'Rozjeżdżanie' (Void Collapse) Timer
    const collapseInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsCollapsing(true);
        setCollapseX((Math.random() - 0.5) * 150);
        setTimeout(() => {
          setIsCollapsing(false);
          setCollapseX(0);
        }, 150 + Math.random() * 400);
      }
      
      // Concept 52 Critical State
      if (Math.random() > 0.98) {
        setIsCritical(true);
        setTimeout(() => setIsCritical(false), 500);
      }
    }, 2000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(collapseInterval);
    };
  }, [laserY, mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen ${isCritical ? 'bg-white text-black' : 'bg-black text-white'} font-mono selection:bg-white selection:text-black overflow-hidden transition-colors duration-75`}>
      <DitherFilter />
      
      <RGBShift 
        intensity={isCritical ? 30 : (isCollapsing ? 15 : 2)} 
        className="w-full h-full absolute inset-0 pointer-events-none z-50"
      >
        <motion.div 
          animate={{ x: collapseX }}
          transition={{ type: "spring", stiffness: 1000, damping: 10 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-12 h-screen"
        >
          {/* COLUMN 1: SYSTEM LOG / STATS */}
          <div className="md:col-span-1 border-r border-white/10 pr-4 space-y-4 overflow-hidden flex flex-col">
            <header className="shrink-0 space-y-2">
              <div className="bg-white text-black px-4 py-2 font-black text-2xl skew-x-[-12deg] inline-block">SYF_V5.1</div>
              <div className="text-[10px] opacity-40 leading-tight space-y-1">
                <p>MEMORY_TOTAL: {totalSize}</p>
                <p>NODE_COUNT: {items.length} UNITS</p>
                <p>POGROM_PROTOCOL: ACTIVE</p>
              </div>
            </header>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
              <div className="text-[9px] font-black opacity-20 mb-2">// RECENT_ACTIVITY</div>
              {items.slice(0, 50).map((f, i) => (
                <div key={i} className="flex justify-between text-[10px] border-b border-white/5 pb-1 hover:bg-white/10 transition-colors">
                  <span className="opacity-40">{f.type === 'folder' ? 'DIR' : 'FILE'}</span>
                  <span className="font-bold truncate max-w-[150px]">{f.type === 'folder' ? f.name : f.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2-3: MAIN FILE CONSOLE */}
          <div className="md:col-span-2 flex flex-col gap-4 relative">
             <div className="flex justify-between items-center bg-white text-black px-4 py-1">
                <span className="text-[9px] font-black italic">FILE_CONSOLE_V2</span>
                <span className="text-[9px] font-mono">$ ls -la /syf/</span>
             </div>
             
             <div className="flex-1 border-2 border-white/40 relative overflow-y-auto scrollbar-hide bg-black/40 backdrop-blur-3xl p-1">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-px">
                  {items.map((item, i) => (
                    <Sector key={i} item={item} index={i} laserY={laserY} />
                  ))}
                </div>
             </div>
          </div>

          {/* COLUMN 4: DATA METRICS & BUTTONS */}
          <div className="md:col-span-1 border-l border-white/10 pl-4 space-y-8 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-[10px] opacity-40 uppercase tracking-[0.3em]">VOID_PRESSURE</div>
                <div className="h-20 flex gap-0.5 items-end">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: isCollapsing ? [2, 80, 2] : [Math.random() * 40 + 5, 5, Math.random() * 40 + 5] }}
                      transition={{ duration: 0.1, delay: i * 0.02, repeat: Infinity }}
                      className="flex-1 bg-white"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                 <Link href="/concepts" className="block p-4 border-2 border-white font-black italic text-xl hover:bg-white hover:text-black transition-all">ALL_CONCEPTS</Link>
                 <Link href="/AI_ARTISTS_REAL_DESIGN" className="block p-4 border border-white/20 font-black italic text-sm opacity-60 hover:opacity-100 transition-opacity">AI_RESEARCH_BARE</Link>
              </div>
            </div>
            
            <footer className="text-[8px] font-mono leading-tight uppercase opacity-40">
              <div>ANTDIZAJN // RE-STYLED // {new Date().getFullYear()}</div>
              <div>SCAN_ACTIVE: {mounted.toString().toUpperCase()}</div>
            </footer>
          </div>
        </motion.div>
      </RGBShift>

      {/* GLOBAL OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[60] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.1),rgba(0,255,0,0.05),rgba(0,0,255,0.1))] bg-[length:100%_2px,8px_100%]" />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { background: #000; overflow: hidden; }
      `}</style>
    </div>
  );
}
