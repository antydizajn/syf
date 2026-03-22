'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface ContentItem {
  slug: string;
  title: string;
  type: 'file' | 'folder';
  size?: string;
  modifiedDate?: string;
}

interface ContentHUDProps {
  file?: {
    title: string;
    content?: string;
    modifiedDate?: string;
    modifiedAt?: string;
    slug: string;
  };
  items?: ContentItem[];
  folderName?: string;
  slug?: string;
  isFolder?: boolean;
  breadcrumb?: { title: string; href: string }[];
}

const orphansGuard = (text: string) => {
  if (!text) return '';
  // ZASADA SIEROTKI (Wikipedia Standard): a, i, o, u, w, z, że, bo, czy, lecz, nad, pod, dla, przy
  return text
    .replace(/ (a|i|o|u|w|z|że|bo|czy|lecz|nad|pod|dla|przy|ale|do|po|są) /gi, ' $1\u00A0')
    .replace(/^([aiouwzAIOWUZ]|że|ŻE|bo|czy|lecz|nad|pod|dla|przy|ale|do|po|są) /gi, '$1\u00A0');
};
 
export default function ContentHUD({ file, items, folderName, slug, isFolder, breadcrumb }: ContentHUDProps) {
  const [activeTab, setActiveTab] = useState("MD");
 
  // CASE 1: DIRECTORY VIEW
  if (items && folderName) {
    return (
      <div className="space-y-12 pb-20">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-[10px] font-black tracking-[0.4em] text-white/50 uppercase border-b-2 border-white/10 pb-4 mb-4">
            <span>{"//"} SECTOR_EXPLORER_V5</span>
            <span>SYSTEM_READY</span>
          </div>

          <motion.header 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase mb-2">INDEX_HEADER</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                {folderName}<span className="opacity-20 px-2">/</span>
              </h1>
            </div>
            
            <Link 
              href="/" 
              className="bg-white text-black px-6 py-3 font-black text-[12px] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase"
            >
              [ BACK_TO_HOME ]
            </Link>
          </motion.header>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => {
            const indexStr = (idx + 1).toString().padStart(3, '0');
            const isDir = item.type === 'folder';
            
            return (
              <div key={item.slug} className="group relative">
                <Link 
                  href={`/${item.slug}`}
                  className={`relative flex flex-col h-full min-h-[110px] transition-all duration-300 p-6 no-underline border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 
                    ${isDir 
                      ? 'bg-black text-white border-[#00F0FF] hover:bg-[#00F0FF]/10' 
                      : 'bg-white text-black border-[#FF00FF] hover:bg-zinc-50'}`}
                >
                  {/* GIANT BACKGROUND INDEX */}
                  <div className={`absolute right-5 bottom-0 text-[110px] leading-none font-black select-none pointer-events-none z-0 overflow-hidden ${isDir ? 'text-[#00F0FF]/10' : 'text-[#FF00FF]/10'}`}>
                    {indexStr}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-2xl font-black tracking-tight uppercase leading-none break-all ${isDir ? 'text-[#00F0FF]' : 'text-[#FF00FF]'}`}>
                        {isDir ? `${item.title}/` : orphansGuard(item.title).toUpperCase()}
                      </h3>
                      <span className={`text-[8px] font-black px-2 py-0.5 uppercase tracking-widest border border-current opacity-40`}>
                        {isDir ? 'DIR' : 'FILE'}
                      </span>
                    </div>
                    
                    <div className="flex-1 opacity-60">
                       <span className="text-[9px] font-black tracking-widest">ID: {item.slug.substring(0, 8)}</span>
                    </div>
   
                    <div className="mt-4 flex items-center justify-between text-[8px] font-black tracking-widest opacity-60 uppercase">
                      <span>{item.size || '--'}</span>
                      <span className="group-hover:translate-x-2 transition-transform">READ_LOG [ {isDir ? 'DIR' : 'FILE'} ] →</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* BOTTOM MENU DUPLICATION */}
        <nav className="flex w-full gap-1 flex-wrap mt-20 pt-10 border-t-2 border-white/10">
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
      </div>
    );
  }
 
  // CASE 2: FILE VIEW
  if (!file) return null;
 
  const slugParts = slug?.split('/') || [];
  const folderPath = slugParts.length > 1 ? `/${slugParts.slice(0, -1).join('/')}` : '/';
 
  return (
    <motion.article 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative pb-20"
    >
      {/* HUD HEADER PANEL */}
      <div className="bg-white text-black p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="space-y-4 flex-1">
            <span className="text-[10px] font-black tracking-[0.5em] opacity-40 uppercase">DATA_STREAM_FILE</span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none wrap-break-word uppercase">
              {orphansGuard(file.title)}
            </h1>
          </div>
 
          <div className="flex flex-wrap gap-6 text-[9px] font-black tracking-[0.3em] uppercase bg-black text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col gap-1">
              <span className="opacity-40">MODIFIED</span>
              <span>{file.modifiedDate || file.modifiedAt}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-40">PAYLOAD</span>
              <span className="text-white">{file.slug.substring(0, 10)}</span>
            </div>
          </div>
        </div>
      </div>
 
      {/* CONSOLIDATED NAVIGATION & TABS BAR */}
      <div className="flex flex-wrap items-center gap-4 relative z-20">
        <Link 
          href="/" 
          className="bg-black text-white px-6 py-3 text-[10px] font-black tracking-widest transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 uppercase"
        >
          [ HOME_SECTOR ]
        </Link>
        {slugParts.length > 1 && (
          <Link 
            href={folderPath}
            className="bg-white text-black px-6 py-3 text-[10px] font-black tracking-widest transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 uppercase"
          >
            [ BACK_TO_FOLDER ]
          </Link>
        )}

        <div className="hidden md:block w-0.5 h-8 bg-white/10 mx-2" />

        <div className="flex flex-wrap gap-4">
          {["MD", "HTML", "TXT", "DUMP"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-[10px] font-black tracking-widest transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                activeTab === tab 
                  ? "bg-black text-white shadow-none translate-x-1 translate-y-1" 
                  : "bg-white text-black hover:bg-zinc-100"
              }`}
            >
              {tab}_VIEW
            </button>
          ))}
        </div>
      </div>
 
      {/* MAIN CONTENT CONTAINER WITH GLOW */}
      <div className="border-4 border-black shadow-[0_0_80px_rgba(255,0,255,0.1),8px_8px_0px_0px_rgba(0,0,0,1)] bg-white/5 backdrop-blur-sm p-1">
         <div className="bg-black/90 p-8 md:p-16 relative overflow-hidden">
            {/* AMBIENT GLOW DECOR */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF00FF]/5 blur-[120px] pointer-events-none" />
            <div className="prose prose-invert prose-zinc max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic
              prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-lg
              prose-a:text-white prose-a:underline hover:prose-a:opacity-80 transition-all
              prose-strong:text-white prose-strong:font-black
              prose-code:text-white prose-code:bg-white/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-none
              prose-pre:bg-black/90 prose-pre:border-4 prose-pre:border-black prose-pre:rounded-none
              xl:prose-xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  text: ({ ...props }) => (
                    <>{orphansGuard(String(props.children))}</>
                  ),
                  h1: ({ ...props }) => (
                    <h1 className="text-4xl font-black text-[#00F0FF] uppercase tracking-tighter mb-8 border-b-4 border-[#00F0FF]/20 pb-2" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-2xl font-bold text-[#00F0FF] uppercase tracking-tight mb-4 mt-8 border-l-4 border-[#00F0FF] pl-4" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-xl font-bold text-[#FF00FF] uppercase mb-4 mt-6" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="mb-6 leading-relaxed text-lg text-white/90" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="mb-6 space-y-2 list-none" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="flex items-start gap-2 mb-4">
                      <span className="text-[#FF00FF] font-black mt-1.5 text-xs">{" > "}</span>
                      <span {...props} />
                    </li>
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-black text-white px-1 bg-[#FF00FF]/20 border-b-2 border-[#FF00FF]" {...props} />
                  ),
                  hr: () => <hr className="my-12 border-t-4 border-white/10" />,
                }}
              >
                {file.content || ''}
              </ReactMarkdown>
            </div>
         </div>
      </div>

      {/* BOTTOM MENU DUPLICATION */}
      <nav className="flex w-full gap-1 flex-wrap mt-20 pt-10 border-t-2 border-white/10">
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
    </motion.article>
  );
}
