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
      <div className="flex-1 min-h-0 flex flex-col gap-6 px-4 md:px-0 mt-8">
        <div className="flex justify-between items-center text-[10px] font-black tracking-[0.3em] text-black/40 uppercase border-b-2 border-black/10 pb-2">
          <span>{"//"} DIRECTORY_EXPLORER_V2.0 (PAGE_{page + 1})</span>
          <span>SYF_SYSTEM_OS</span>
        </div>

        {/* Top Pagination HUD */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between gap-4 p-2 bg-white/30 backdrop-blur-sm border-2 border-black"
          >
            <button 
              onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === 0}
              className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors"
            >
              PREV_SECTOR
            </button>
            <div className="text-black px-4 py-2 text-xs font-black uppercase tracking-[0.3em] hidden md:block">
              SECTOR_{page + 1} / {totalPages}
            </div>
            <button 
              onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === totalPages - 1}
              className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors"
            >
              NEXT_SECTOR
            </button>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ... (items remain same) */}
          {paginatedItems.map((item, i) => {
            const globalIndex = page * PAGINATION_SIZE + i + 1;
            const isFolder = item.type === 'folder';
            
            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="h-full"
              >
                <Link 
                  href={`/${item.slug}`}
                  className={`group relative flex flex-col h-full min-h-[220px] transition-all duration-300 border-2 border-black overflow-hidden backdrop-blur-sm ${
                    isFolder 
                      ? "bg-black text-white hover:bg-zinc-900" 
                      : "bg-[#fdfdfd]/80 text-black hover:bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
                  }`}
                >
                  {/* Visual Polish Elements */}
                  <div className={`scanlines absolute inset-0 pointer-events-none opacity-[0.03] ${isFolder ? 'invert' : ''}`} />
                  
                  {/* Header Row */}
                  <div className={`flex justify-between items-start p-4 border-b ${isFolder ? 'border-white/10' : 'border-black/5'}`}>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black tracking-widest opacity-50">
                        NO_{globalIndex.toString().padStart(3, '0')}
                      </span>
                      <span className="text-[10px] font-mono opacity-50 mt-1">
                        {item.date}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter ${
                        isFolder ? 'bg-white text-black' : 'bg-black text-white'
                      }`}>
                        {isFolder ? 'FOLDER' : 'FILE_MD'}
                      </span>
                      {isFolder && item.itemCount !== undefined && (
                        <div className="text-[10px] font-bold mt-1 opacity-60">
                          [ {item.itemCount}_OBJECTS ]
                        </div>
                      )}
                      {!isFolder && (
                        <div className="text-[10px] font-bold mt-1 opacity-60 uppercase">
                          SIZE: {item.size}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <h3 className={`text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] mb-4 wrap-break-word transition-transform duration-300 group-hover:scale-[1.02] origin-left ${
                      isFolder ? 'text-white' : 'text-black'
                    }`}>
                      {isFolder ? item.name : item.title}
                    </h3>
                    
                    {!isFolder && item.preview && (
                      <p className="text-xs font-medium leading-relaxed opacity-60 line-clamp-3 md:line-clamp-4">
                        {item.preview}
                      </p>
                    )}
                  </div>

                  {/* Footer Decoration */}
                  <div className={`h-1 w-full ${isFolder ? 'bg-white/20' : 'bg-black/5'}`} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Pagination HUD */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex items-center justify-center gap-6"
          >
            <button 
              onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === 0}
              className="bg-black text-white px-10 py-4 text-sm font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              PREV_SECTOR
            </button>
            <div className="bg-white border-4 border-black text-black px-12 py-4 text-sm font-black uppercase tracking-[0.4em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {page + 1} / {totalPages}
            </div>
            <button 
              onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === totalPages - 1}
              className="bg-black text-white px-10 py-4 text-sm font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
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
