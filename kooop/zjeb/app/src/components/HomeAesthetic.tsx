"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Link from 'next/link';
import { ItemData } from "@/lib/files";
import { TypographyGuardian } from './TypographyGuardian';
import { ConsoleLogFlex } from './ConsoleLogFlex';
import { A11yGuardian } from "./A11yGuardian";
import { useGlitchStore } from "@/store/useGlitchStore";
import { gsap } from "gsap";

import { useAmbient } from "./AmbientContext";

export function HomeAesthetic({ items, totalSize }: { items: ItemData[]; totalSize: string }) {
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const { triggerGlitch, resetGlitch, isGlitching } = useGlitchStore();
  const { ambient } = useAmbient();

  useEffect(() => {
    // Avoid synchronous setState in useEffect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, isFolder: boolean) => {
    const card = e.currentTarget;
    triggerGlitch(isFolder ? 0.8 : 0.4);
    
    gsap.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    resetGlitch();
    
    gsap.to(card, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [items]);

  const PAGINATION_SIZE = 30;
  const totalPages = useMemo(() => Math.ceil(sortedItems.length / PAGINATION_SIZE), [sortedItems.length]);
  const paginatedItems = useMemo(() => sortedItems.slice(page * PAGINATION_SIZE, (page + 1) * PAGINATION_SIZE), [sortedItems, page]);

  if (!mounted) return null;

  return (
    <main className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-160px)] perspective-1000 crt-distortion" role="main" aria-label="System Explorer Main Content">
      <ConsoleLogFlex />
      {/* RESTORED HEADER STYLE FROM SCREENSHOT */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b-8 border-black pb-8 pt-4 relative bg-transparent -mx-4 px-4 md:-mx-10 md:px-10"
      >
        <div className="absolute top-4 right-4 md:right-10 text-right text-white opacity-80 text-[10px] hidden md:block uppercase font-bold tracking-widest leading-tight">
          [ SYSTEM_VERSION: V2.0 ]<br/>
          [ TOTAL_CAPACITY: {totalSize} ]<br/>
          [ NODE_COUNT: {items.length} ]
        </div>
        
      <TypographyGuardian>
        <h1 
          className="font-black text-4xl md:text-7xl leading-[0.85] tracking-tighter uppercase mb-6 text-white border-b-4 border-black pb-2 relative group overflow-hidden"
          style={{ opacity: 0.8 + ambient.density * 0.2 }}
        >
          <span className="relative z-10">SYF.ANTYDIZAJN.PL</span>
          <span 
            className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[0.1s] skew-x-12 pointer-events-none" 
            style={{ opacity: ambient.resonance }}
          />
          <span className="absolute inset-0 text-[#39FF14] opacity-0 group-hover:opacity-50 group-hover:animate-glitch-1 pointer-events-none">SYF.ANTYDIZAJN.PL</span>
          <span className="absolute inset-0 text-[#FF003C] opacity-0 group-hover:opacity-50 group-hover:animate-glitch-2 pointer-events-none">SYF.ANTYDIZAJN.PL</span>
        </h1>

        <div className="flex flex-col gap-2 mb-6">
          <div className="bg-black text-white px-4 py-2 text-6xl md:text-[9.5rem] font-black uppercase tracking-tighter w-fit leading-none relative group overflow-hidden">
            <span className="relative z-10">PUBLICZNY</span>
            <div className="absolute inset-0 bg-[#CCFF00]/10 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none" />
          </div>
          <div className="bg-black text-white px-4 py-2 text-5xl md:text-[7.8rem] font-black uppercase tracking-tighter w-fit leading-none">
            DUMP PLIKÓW
          </div>
        </div>
      </TypographyGuardian>

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
        </div>

        {/* Full-width HUD Navigation */}
        <nav className="flex w-full gap-2 mt-8">
          {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
            <Link 
              key={btn}
              href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
              className="flex-1 border-2 border-black bg-white/40 backdrop-blur-md px-4 py-3 font-black text-[11px] md:text-sm uppercase hover:bg-black hover:text-white transition-all text-center group relative overflow-hidden"
              style={{ 
                borderColor: `rgba(0,0,0,${0.2 + ambient.density * 0.8})`,
                boxShadow: ambient.intent === 'GLITCH' ? '0 0 20px rgba(57, 255, 20, 0.2)' : 'none'
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">{"["}</span>
              <span className="relative z-10 mx-2">{btn}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">{"]"}</span>
            </Link>
          ))}
        </nav>
      </motion.header>

      {/* Grid Explorer */}
      <div className="flex flex-col gap-6 px-4 md:px-0 mt-8 mb-12">
        <div className="flex justify-between items-center text-[10px] font-black tracking-[0.3em] text-black/40 uppercase border-b-2 border-black/10 pb-2">
          <span>{"//"} DIRECTORY_EXPLORER_V2.0 (PAGE_{page + 1})</span>
          <span>SYF_SYSTEM_OS</span>
        </div>

        {/* Top Pagination HUD */}
        {totalPages > 1 && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between gap-4 p-2 bg-white/30 backdrop-blur-sm border-2 border-black"
            aria-label="Pagination Top"
          >
            <button 
              onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === 0}
              className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors focus-visible:ring-4 focus-visible:ring-black outline-none"
              aria-label="Previous Sector"
            >
              PREV_SECTOR
            </button>
            <div className="text-black px-4 py-2 text-xs font-black uppercase tracking-[0.3em] hidden md:block" aria-current="page">
              SECTOR_{page + 1} / {totalPages}
            </div>
            <button 
              onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === totalPages - 1}
              className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors focus-visible:ring-4 focus-visible:ring-black outline-none"
              aria-label="Next Sector"
            >
              NEXT_SECTOR
            </button>
          </motion.nav>
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
                  onMouseEnter={(e) => handleMouseEnter(e, isFolder)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className={`group relative flex flex-col h-full min-h-[220px] transition-all duration-300 border-2 border-black overflow-hidden backdrop-blur-sm focus-visible:ring-4 focus-visible:ring-black outline-none transform-gpu ${
                    isFolder 
                      ? "bg-black text-white hover:bg-zinc-900" 
                      : "bg-[#fdfdfd]/80 text-black hover:bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                  aria-label={`${isFolder ? 'Folder' : 'Plik'}: ${isFolder ? item.name : item.title}. ${isFolder ? `Zawiera ${item.itemCount} obiektów` : `Rozmiar: ${item.size}`}. Kliknij aby otworzyć.`}
                >

                  {/* Visual Polish Elements */}
                  <div className={`scanlines absolute inset-0 pointer-events-none opacity-[0.03] ${isFolder ? 'invert' : ''}`} />
                  <div className="absolute inset-0 bg-[url('/grit.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
                  
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
                    <TypographyGuardian>
                      <h2 className={`text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] mb-4 wrap-break-word transition-transform duration-300 group-hover:scale-[1.02] origin-left ${
                        isFolder ? 'text-white' : 'text-black'
                      } ${isGlitching ? 'chromatic-aberration animate-glitch' : ''}`}>
                        {isFolder ? item.name : item.title}
                      </h2>
                    </TypographyGuardian>
                    
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
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-6"
            aria-label="Pagination Bottom"
          >
            <button 
              onClick={() => { 
                setPage(p => Math.max(0, p - 1)); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setAnnouncement(`Przełączono na Sektor ${page}`);
              }}
              disabled={page === 0}
              className="bg-black text-white px-10 py-4 text-sm font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] focus-visible:ring-4 focus-visible:ring-black outline-none"
              aria-label="Previous Sector"
            >
              PREV_SECTOR
            </button>
            <div className="bg-white border-4 border-black text-black px-12 py-4 text-sm font-black uppercase tracking-[0.4em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" aria-current="page">
              {page + 1} / {totalPages}
            </div>
            <button 
              onClick={() => { 
                setPage(p => Math.min(totalPages - 1, p + 1)); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setAnnouncement(`Przełączono na Sektor ${page + 2}`);
              }}
              disabled={page === totalPages - 1}
              className="bg-black text-white px-10 py-4 text-sm font-black uppercase tracking-widest disabled:opacity-20 hover:bg-zinc-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] focus-visible:ring-4 focus-visible:ring-black outline-none"
              aria-label="Next Sector"
            >
              NEXT_SECTOR
            </button>
          </motion.nav>
        )}
      </div>

      <A11yGuardian announcement={announcement} />

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
