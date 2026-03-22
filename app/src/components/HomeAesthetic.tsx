"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { ItemData } from "@/lib/files";

export function HomeAesthetic({ items, totalSize }: { items: ItemData[]; totalSize: string }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log("%c [SYF_V5] SYSTEM_CORE: ONLINE. GNOZA_SHIELD: ACTIVE. ", "background: #000; color: #39FF14; font-weight: bold; border: 1px solid #39FF14; padding: 4px;");
  }, []);

  const sortedItems = [...items].sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  const PAGINATION_SIZE = 30;
  const totalPages = Math.ceil(sortedItems.length / PAGINATION_SIZE);
  const paginatedItems = sortedItems.slice(page * PAGINATION_SIZE, (page + 1) * PAGINATION_SIZE);

  return (
    <div className="flex flex-col min-h-screen font-mono">
      {/* SHARP & IMPACTFUL HEADER */}
      <header className="mb-24 pt-4 relative">
        <div className="absolute top-0 right-0 text-right text-white/50 text-[9px] hidden md:block uppercase font-bold tracking-[0.3em] leading-tight">
          [ SYSTEM: SYF_V5.0 ]<br/>
          [ LOAD: {totalSize} ]<br/>
          [ ITEMS_COUNT: {items.length} ]
        </div>

        <Link href="/" className="block text-xl md:text-[4vw] font-bold tracking-tight uppercase mb-8 text-white leading-[0.85] hover:tracking-[-0.05em] transition-all duration-300 no-underline">
          SYF.ANTYDIZAJN.PL
        </Link>

        <div className="flex flex-col gap-1 mb-6">
          <div className="bg-black text-white px-6 py-2 text-4xl md:text-8xl font-bold uppercase tracking-tighter w-fit leading-none">
            PUBLICZNY
          </div>
          <div className="bg-black text-white px-6 py-2 text-3xl md:text-7xl font-bold uppercase tracking-tighter w-fit leading-none">
            DUMP PLIKÓW
          </div>
        </div>

        <div className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white uppercase mb-16 bg-black px-4 py-2 w-fit">
          WRZUCASZ .MD <span className="text-white/60">→</span> DOSTĘPNE POD /NAZWA
        </div>

        <nav className="flex w-full gap-1 flex-wrap">
          {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
            <Link 
              key={btn}
              href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
              className="flex-1 min-w-[140px] border-4 border-black bg-white px-4 py-8 font-black text-sm md:text-lg uppercase text-black hover:bg-black hover:text-white transition-all duration-300 text-center no-underline tracking-[0.2em] [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)] drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:drop-shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:z-20"
            >
              {btn}
            </Link>
          ))}
        </nav>
      </header>

      {/* GRID SYSTEM */}
      <div className="flex flex-col gap-6 mb-16">
        <div className="flex justify-between items-center text-[10px] font-black tracking-[0.4em] text-white/80 uppercase border-b-2 border-white/20 pb-4 mb-4">
          <span>{"//"} SECTOR_{page + 1}_INDEX</span>
          <span>SYF_OS_V5</span>
        </div>

        {/* TOP PAGINATION HUD (LEGACY STYLE) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-4 p-2 bg-white border-4 border-black mb-12">
            <button 
              onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'instant' }); }}
              disabled={page === 0}
              className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest disabled:opacity-20 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
            >
              [ PREV_SECTOR ]
            </button>
            <div className="text-black text-[10px] font-black uppercase tracking-[0.4em] hidden md:block border-x-2 border-black/20 px-10">
              SECTOR_{String(page + 1).padStart(2, '0')} {" // "} {String(totalPages).padStart(2, '0')}
            </div>
            <button 
              onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'instant' }); }}
              disabled={page === totalPages - 1}
              className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest disabled:opacity-20 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
            >
              [ NEXT_SECTOR ]
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {paginatedItems.map((item, i) => {
            const globalIndex = page * PAGINATION_SIZE + i + 1;
            const isFolder = item.type === 'folder';
            
            return (
              <div key={item.slug} className="group bg-black">
                <Link 
                  href={`/${item.slug}`}
                  className={`relative flex flex-col h-full min-h-[220px] transition-all duration-150 p-10 no-underline hover:bg-white/3`}
                >
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-[10px] font-bold opacity-20">
                      [{globalIndex.toString().padStart(3, '0')}]
                    </span>
                    <span className={`text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest border border-white/20 text-white/40 group-hover:text-white group-hover:border-white transition-colors`}>
                      {isFolder ? 'DIR' : 'FILE'}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold tracking-tight uppercase leading-[1.1] break-all text-white group-hover:text-white">
                      {isFolder ? `${item.name}/` : item.name.toUpperCase()}
                    </h3>
 
                    {item.preview && !isFolder && (
                      <p className="mt-8 text-[11px] text-white/40 group-hover:text-white/60 line-clamp-3 leading-relaxed font-normal">
                        {item.preview}
                      </p>
                    )}
                  </div>
 
                  <div className="mt-12 flex items-center justify-between text-[9px] font-bold tracking-widest text-white/30 uppercase">
                    <div className="flex gap-12">
                      <div className="flex flex-col">
                        <span className="mb-2 text-[7px] text-white/20">DATA</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-2 text-[7px] text-white/20">ROZMIAR</span>
                        <span>{isFolder ? `${item.itemCount}_OBJ` : item.size}</span>
                      </div>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">READ →</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* BOTTOM PAGINATION HUD (LEGACY STYLE) */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <button 
              onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'instant' }); }}
              disabled={page === 0}
              className="bg-black text-white px-10 py-5 text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
            >
              PREV_SECTOR
            </button>
            <div className="bg-white border-4 border-black text-black px-12 py-5 text-sm font-black uppercase tracking-[0.4em] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </div>
            <button 
              onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'instant' }); }}
              disabled={page === totalPages - 1}
              className="bg-black text-white px-10 py-5 text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
            >
              NEXT_SECTOR
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
