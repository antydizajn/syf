"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { ItemData } from "@/lib/files";


export function HomeAesthetic({ items, totalSize }: { items: ItemData[]; totalSize: string }) {
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Avoid synchronous setState in useEffect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const sortedItems = [...items].sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  const PAGINATION_SIZE = 30;
  const totalPages = Math.ceil(sortedItems.length / PAGINATION_SIZE);
  const paginatedItems = sortedItems.slice(page * PAGINATION_SIZE, (page + 1) * PAGINATION_SIZE);

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-160px)]">
      {/* RESTORED HEADER STYLE FROM SCREENSHOT */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b-8 border-black pb-8 pt-4 relative bg-white -mx-4 px-4 md:-mx-10 md:px-10"
      >
        <div className="absolute top-4 right-4 md:right-10 text-right text-black opacity-80 text-[10px] hidden md:block uppercase font-bold tracking-widest leading-tight">
          [ SYSTEM_VERSION: V2.0 ]<br/>
          [ TOTAL_CAPACITY: {totalSize} ]<br/>
          [ NODE_COUNT: {items.length} ]
        </div>
        
        <h1 className="font-black text-4xl md:text-7xl leading-[0.85] tracking-tighter uppercase mb-6 text-black border-b-4 border-black pb-2">
          SYF.ANTYDIZAJN.PL
        </h1>

        <div className="flex flex-col gap-2 mb-6">
          <div className="bg-black text-white px-4 py-2 text-6xl md:text-[9.5rem] font-black uppercase tracking-tighter w-fit leading-none">
            PUBLICZNY
          </div>
          <div className="bg-black text-white px-4 py-2 text-5xl md:text-[7.8rem] font-black uppercase tracking-tighter w-fit leading-none">
            DUMP PLIKÓW
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="fixed inset-0 top-[64px] bg-white z-999 p-8 flex flex-col gap-4 border-t-8 border-black animate-in slide-in-from-top duration-300">
            {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
              <Link 
                key={btn}
                href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-black tracking-tighter uppercase border-b-4 border-black pb-2"
              >
                [ {btn} ]
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 overflow-x-auto">
          <div className="bg-black text-white px-4 py-1 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            WRZUCASZ .MD → DOSTĘPNE POD /NAZWA
          </div>
          
          <nav className="flex flex-wrap gap-2">
            {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
              <Link 
                key={btn}
                href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
                className="border-2 border-black px-4 py-1 font-black text-[10px] uppercase hover:bg-black hover:text-white transition-all block"
              >
                [ {btn} ]
              </Link>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Grid Explorer */}
      <div className="flex-1 min-h-0 flex flex-col gap-6">
        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-zinc-500 uppercase border-b border-white/5 pb-2">
          <span>{"//"} DIRECTORY_LISTING_ROOT (PAGE_{page + 1})</span>
          <span>SYF_V5_STABLE</span>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {paginatedItems.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
            >
              <Link 
                href={`/${item.slug}`}
                className="hud-glass p-4 group hover:bg-white hover:text-black transition-all relative overflow-hidden flex flex-col justify-between h-32"
              >
                <div className="scanlines absolute inset-0 opacity-5 pointer-events-none" />
                <div className="dither-grid absolute inset-0 text-white pointer-events-none opacity-[0.05]" />
                
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black opacity-30 uppercase tracking-widest group-hover:opacity-100">
                    {item.type === 'folder' ? 'DIR' : 'FILE'}
                  </span>
                  <span className="text-[9px] font-bold opacity-30 group-hover:opacity-100">
                    {item.size}
                  </span>
                </div>
                
                <h3 className="text-xl font-black tracking-tighter uppercase leading-none wrap-break-word line-clamp-2">
                  {item.type === 'folder' ? item.name : item.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination HUD */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto pt-12 flex items-center justify-center gap-4"
          >
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="border border-white/20 px-6 py-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-10 hover:border-white transition-colors"
            >
              PREV_SECTOR
            </button>
            <div className="bg-white/5 border border-white/10 text-white px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
              SECTOR_{page + 1}/{totalPages}
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="border border-white/20 px-6 py-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-10 hover:border-white transition-colors"
            >
              NEXT_SECTOR
            </button>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
