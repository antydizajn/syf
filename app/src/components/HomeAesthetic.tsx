"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { ItemData } from "@/lib/files";


const PAGE_SIZE = 30;

export function HomeAesthetic({ items, totalSize }: { items: ItemData[]; totalSize: string }) {
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [collapseX, setCollapseX] = useState(0);
  const laserY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const handleMouseMove = (e: MouseEvent) => {
      laserY.set(e.clientY);
    };

    const collapseInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setCollapseX((Math.random() - 0.5) * 40);
        setTimeout(() => {
          setCollapseX(0);
        }, 100 + Math.random() * 200);
      }
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(collapseInterval);
      clearTimeout(timer);
    };
  }, [laserY]);

  if (!mounted) return null;

  // Sorting: Folders first, then by name
  const sortedItems = [...items].sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    const nameA = a.type === 'folder' ? a.name : a.title;
    const nameB = b.type === 'folder' ? b.name : b.title;
    return (nameA || "").localeCompare(nameB || "");
  });

  const totalPages = Math.ceil(sortedItems.length / PAGE_SIZE);
  const paginatedItems = sortedItems.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-10 font-mono selection:bg-black selection:text-white overflow-hidden relative">
      <motion.div
        animate={{ x: collapseX }}
        className="max-w-7xl mx-auto flex flex-col min-h-screen relative z-10"
      >
        {/* HEADER: CONCEPT 03 STYLE */}
        <header className="border-b-12 border-black pb-8 mb-12 relative shrink-0">
          <div className="absolute top-0 right-0 text-right opacity-80 text-[12px] hidden md:block uppercase font-bold antialiased leading-tight">
            [ SYSTEM_VERSION: V2.0 ]<br/>
            [ TOTAL_CAPACITY: {totalSize} ]<br/>
            [ NODE_COUNT: {items.length} ]
          </div>
          
          <h1 className="font-[1000] leading-[0.85] tracking-tighter uppercase mb-6 flex flex-col items-start">
            <span className="text-[min(7.8vw,100px)] whitespace-nowrap block border-b-4 border-black pb-2 mb-2 w-full">
              SYF.ANTYDIZAJN.PL
            </span>
            <div className="flex flex-col items-start gap-1">
              <span className="bg-black text-white px-4 py-1 text-[9.5vw] md:text-[9.8vw] transform -skew-x-2 block leading-[0.9] w-fit">
                PUBLICZNY
              </span>
              <span className="bg-black text-white px-4 py-1 text-[7.8vw] md:text-[8vw] transform -skew-x-2 block leading-[0.9] w-fit">
                DUMP PLIKÓW
              </span>
            </div>
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="bg-black text-white px-6 py-2 text-xl font-black italic tracking-widest uppercase mb-2 whitespace-nowrap">
              Wrzucasz .md → dostępne pod /NAZWA
            </div>
            
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full md:w-auto">
              {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
                <Link 
                  key={btn}
                  href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
                  className="border-4 border-black px-4 py-2 font-black text-sm uppercase hover:bg-black hover:text-white transition-all active:translate-y-1 block text-center"
                >
                  [  {btn}  ]
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT: FILE EXPLORER */}
        <div className="flex-1 min-h-0 flex flex-col gap-8">
           <div className="flex justify-between items-center border-b-4 border-black pb-2 opacity-50 text-xs font-black italic">
              <span>$ ls -la /root/syf/ --page {page + 1}</span>
              <span>INDEX_OF_BLOOD_AND_INK</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-1 overflow-y-auto pr-4 scrollbar-hide">
              {paginatedItems.map((item, i) => {
                const displayName = item.type === 'folder' ? item.name : item.title;
                const href = `/${item.slug}`;
                const globalIndex = page * PAGE_SIZE + i + 1;
                
                return (
                  <motion.div 
                    key={item.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.01 }}
                    className="group border-b border-black/10 py-2 flex items-center gap-4 hover:bg-black hover:text-white px-2 transition-colors cursor-crosshair relative"
                  >
                    <span className="text-[10px] font-black opacity-20 group-hover:opacity-100 min-w-10">
                      {globalIndex.toString().padStart(3, '0')}
                    </span>
                    <span className={`text-sm font-black uppercase tracking-tighter truncate flex-1 ${item.type === 'folder' ? 'underline decoration-4 underline-offset-4' : ''}`}>
                       {displayName}
                    </span>
                    <span className="text-[9px] opacity-20 font-bold shrink-0">
                      {item.type === 'folder' ? 'DIR' : item.size}
                    </span>
                    <Link href={href} className="absolute inset-0 z-10" />
                  </motion.div>
                );
              })}
           </div>

           {/* PAGINATION */}
           {totalPages > 1 && (
             <div className="mt-auto py-8 flex items-center justify-center gap-4 font-black">
                <button 
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="border-4 border-black px-4 py-2 disabled:opacity-10 hover:bg-black hover:text-white"
                >
                  {`<< PREV`}
                </button>
                <div className="bg-black text-white px-4 py-2">
                    PAGE {page + 1} / {totalPages}
                </div>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="border-4 border-black px-4 py-2 disabled:opacity-10 hover:bg-black hover:text-white"
                >
                  {`NEXT >>`}
                </button>
             </div>
           )}
        </div>
      </motion.div>

      {/* SCANLINE INDICATOR */}
      <motion.div 
        style={{ y: laserY }}
        className="fixed left-0 w-full h-px bg-black/10 z-60 pointer-events-none"
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
