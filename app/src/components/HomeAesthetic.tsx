"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { ItemData } from "@/lib/files";
import { orphansGuard } from "@/lib/typography";

export function HomeAesthetic({ items, totalSize }: { items: ItemData[]; totalSize: string }) {
  const [page, setPage] = useState(0);

  const PAGINATION_SIZE = 30;
  const totalPages = Math.ceil(items.length / PAGINATION_SIZE);
  const paginatedItems = items.slice(page * PAGINATION_SIZE, (page + 1) * PAGINATION_SIZE);

  return (
    <div className="flex flex-col min-h-screen font-mono">

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
              aria-label="PREV_SECTOR: Poprzedni sektor"
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
              aria-label="NEXT_SECTOR: Następny sektor"
              className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest disabled:opacity-20 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
            >
              [ NEXT_SECTOR ]
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedItems.map((item, i) => {
            const globalIndex = page * PAGINATION_SIZE + i + 1;
            const indexStr = globalIndex.toString().padStart(3, '0');
            const isFolder = item.type === 'folder';
            
            return (
              <div key={item.slug} className="group relative">
                <Link 
                  href={`/${item.slug}`}
                  className={`relative flex flex-col h-full min-h-[110px] transition-all duration-300 p-6 no-underline border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 ${isFolder ? 'bg-black/80 text-white' : 'bg-white/80 text-black'}`}
                >
                  {/* GIANT BACKGROUND INDEX (MOVES WITH LINK) */}
                  <div 
                    aria-hidden="true"
                    className={`absolute right-5 bottom-0 text-[110px] leading-none font-black select-none pointer-events-none z-0 overflow-hidden ${isFolder ? 'text-white/20' : 'text-black/10'}`}
                  >
                    {indexStr}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black tracking-tight uppercase leading-none break-all">
                        {isFolder ? `${item.name}/` : orphansGuard(item.name).toUpperCase()}
                      </h3>
                      <span className={`text-[8px] font-black px-2 py-0.5 uppercase tracking-widest border border-current opacity-40 group-hover:opacity-100 transition-opacity`}>
                        {isFolder ? 'DIR' : 'FILE'}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      {item.preview && !isFolder && (
                        <p className="text-[10px] opacity-60 group-hover:opacity-100 line-clamp-1 leading-tight font-medium">
                          {orphansGuard(item.preview)}
                        </p>
                      )}
                    </div>
   
                    <div className="mt-4 flex items-center justify-between text-[8px] font-black tracking-widest opacity-40 uppercase">
                      <div className="flex gap-6">
                        <div className="flex flex-col">
                          <span className="text-[7px] opacity-50">DATA</span>
                          <span>{item.date}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[7px] opacity-50">SIZE</span>
                          <span>{isFolder ? `${item.itemCount}_OBJ` : item.size}</span>
                        </div>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">READ_LOG →</span>
                    </div>
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
              aria-label="PREV_SECTOR: Poprzedni sektor"
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
              aria-label="NEXT_SECTOR: Następny sektor"
              className="bg-black text-white px-10 py-5 text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
            >
              NEXT_SECTOR
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
