'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface ContentHUDProps {
  file?: any;
  items?: any[];
  folderName?: string;
  isFolder?: boolean;
  breadcrumb?: any[];
  slug?: string;
}

const orphansGuard = (text: string) => {
  if (!text) return '';
  return text.replace(/ (\w) /g, ' $1\u00A0');
};

export default function ContentHUD({ file, items, folderName, isFolder, breadcrumb, slug }: ContentHUDProps) {
  const [activeTab, setActiveTab] = useState("MD");

  // CASE 1: DIRECTORY VIEW
  if (items && folderName) {
    return (
      <div className="space-y-12">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 border-l-4 border-radioactive pl-6"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.5em] text-radioactive opacity-50 uppercase">DIR_EXPLORER_V5</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">
              {folderName}<span className="text-radioactive/50 opacity-50 px-2">/</span>
            </h1>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, idx: number) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                href={`/${item.slug}`}
                className={`group relative flex flex-col h-full min-h-[160px] transition-all duration-300 border border-white/10 overflow-hidden backdrop-blur-xl ${item.type === 'folder' ? "bg-black" : "bg-black/40"} hover:bg-white/5 shadow-xl hover:shadow-radioactive/5 hover:-translate-y-1`}
              >
                <div className="absolute top-2 right-4 text-[8px] font-black opacity-30 text-radioactive tracking-widest uppercase">
                   NODE_0x{idx.toString(16)}
                </div>

                <div className={`scanlines absolute inset-0 pointer-events-none opacity-[0.05]`} />
                
                {/* Header Row */}
                <div className={`flex justify-between items-start p-5 border-b border-white/5 bg-white/5`}>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-radioactive opacity-50 uppercase">
                      {item.type === 'folder' ? 'DIR' : 'FILE'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-end relative z-10">
                  <h3 className="text-2xl font-black tracking-tighter uppercase leading-tight group-hover:text-radioactive transition-colors truncate">
                    {item.type === 'folder' ? `${item.title}/` : item.title}
                  </h3>
                  
                  <div className="mt-4 flex items-center justify-between text-[8px] font-black tracking-widest text-zinc-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{item.size || '--'}</span>
                    <span>INITIALIZE →</span>
                  </div>
                </div>

                <div className={`h-1 w-full bg-radioactive/0 group-hover:bg-radioactive/50 transition-all`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // CASE 2: FILE VIEW
  if (!file) return null;

  const breadcrumbs = [
    { label: "ROOT", href: "/" },
    { label: folderName?.toUpperCase() || "SYF", href: "/" },
    { label: file.title.toUpperCase(), href: `/${file.slug}` },
  ];

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative"
    >
      {/* HUD HEADER PANEL */}
      <div className="hud-panel p-8 bg-white/3 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="space-y-6 flex-1">
            <nav className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={`${crumb.href}-${idx}`}>
                  <Link href={crumb.href} className="hover:text-radioactive transition-colors">
                    {crumb.label}
                  </Link>
                  {idx < breadcrumbs.length - 1 && <span>/</span>}
                </React.Fragment>
              ))}
            </nav>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.85] wrap-break-word uppercase text-white shadow-radioactive">
              {file.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-8 text-[9px] font-black tracking-[0.3em] uppercase opacity-60 bg-black/40 p-4 border border-white/5">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500">MODIFIED</span>
              <span>{file.modifiedDate || file.modifiedAt}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500">PAYLOAD_ID</span>
              <span className="text-radioactive">{file.slug.substring(0, 10)}</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 coordinate-grid opacity-[0.02] pointer-events-none" />
      </div>

      {/* CONTENT TAB BAR */}
      <div className="flex gap-2 relative z-20">
        {["MD", "HTML", "TXT", "DUMP"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all hud-clip-tl border ${
              activeTab === tab 
                ? "bg-radioactive text-black border-radioactive" 
                : "bg-black/40 text-zinc-500 border-white/10 hover:border-white/30"
            }`}
          >
            {tab}_DATA_VIEW
          </button>
        ))}
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="hud-panel p-1 relative">
         <div className="bg-black/60 p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-radioactive/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-radioactive/30 pointer-events-none" />
            
            <div className="prose prose-invert prose-zinc max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic
              prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
              prose-a:text-radioactive prose-a:no-underline hover:prose-a:text-white transition-all
              prose-strong:text-white prose-strong:font-black
              prose-code:text-radioactive prose-code:bg-radioactive/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-none
              prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-none
              xl:prose-xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ node, ...props }) => {
                    const children = props.children;
                    const content = typeof children === 'string' 
                      ? children 
                      : Array.isArray(children) 
                        ? children.map(c => typeof c === 'string' ? c : '').join('')
                        : '';
                    return (
                      <h2 className="flex items-center gap-4 border-l-4 border-radioactive pl-6 my-12 group" {...props}>
                        <span className="text-white group-hover:text-radioactive transition-colors">
                          {orphansGuard(content)}
                        </span>
                      </h2>
                    );
                  },
                  h3: ({ node, ...props }) => {
                    const children = props.children;
                    const content = typeof children === 'string' 
                      ? children 
                      : Array.isArray(children) 
                        ? children.map(c => typeof c === 'string' ? c : '').join('')
                        : '';
                    const sectionId = content.substring(0, 4).toUpperCase().replace(/\W/g, "") || "NULL";
                    return (
                      <h3 className="relative flex items-center gap-4 my-8" {...props}>
                        <span className="text-[10px] font-black tracking-widest opacity-30 text-zinc-500 bg-white/5 px-2 py-1">
                          [ SECTION_ID: {sectionId} ]
                        </span>
                        <span className="text-xl text-radioactive">
                          {orphansGuard(content)}
                        </span>
                      </h3>
                    );
                  },
                  p: ({ node, ...props }) => (
                    <p className="mb-6 last:mb-0">
                      {orphansGuard(String(props.children))}
                    </p>
                  ),
                  li: ({ node, ...props }) => (
                    <li className="flex gap-4 mb-4 list-none group">
                       <span className="text-radioactive font-black group-hover:translate-x-1 transition-transform">{`>>`}</span>
                       <span className="flex-1">{orphansGuard(String(props.children))}</span>
                    </li>
                  ),
                }}
              >
                {file.content}
              </ReactMarkdown>
            </div>
         </div>
      </div>
    </motion.article>
  );
}
