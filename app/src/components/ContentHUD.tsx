'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

// Uwaga: To jest komponent kliencki, więc dane pobieramy przez propsy przekazane z wrapper'a serwerowego 
// lub używamy 'use' jeśli to Next.js 15+. 

export interface PageProps {
  file?: any;
  items?: any[];
  breadcrumb: any[];
  slug: string;
  isFolder: boolean;
  folderName?: string;
}

export default function CatchAllContent({ file, items, breadcrumb, slug, isFolder, folderName }: PageProps) {
  if (isFolder) {
    return (
      <div className="max-w-7xl mx-auto">
        <motion.nav 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 mb-8"
        >
          <Link href="/" className="hover:text-white transition-colors">ROOT</Link>
          {breadcrumb.map((item: any) => (
            <React.Fragment key={item.href}>
              <span>/</span>
              <Link href={item.href} className="hover:text-white transition-colors">{item.title}</Link>
            </React.Fragment>
          ))}
        </motion.nav>

        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-4">
            {folderName}/
          </h1>
          <div className="bg-white text-black px-4 py-1 inline-block text-xs font-black uppercase tracking-tighter">
            {items?.length || 0}_NODES // DIRECTORY_STREAM
          </div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {items?.map((item: any) => (
            <Link 
              key={item.slug} 
              href={`/${item.slug}`}
              className="hud-glass p-6 group hover:bg-white hover:text-black transition-all relative overflow-hidden"
            >
              <div className="scanlines absolute inset-0 opacity-5 pointer-events-none" />
              <div className="flex flex-col h-full justify-between gap-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-black opacity-50 uppercase tracking-widest block">
                    {item.type === 'folder' ? 'DIRECTORY' : 'FILE_DATA'}
                  </span>
                  <h3 className="text-2xl font-black tracking-tighter uppercase leading-none wrap-break-word">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black opacity-50 group-hover:opacity-100 uppercase">
                  <span>{item.size}</span>
                  <span className="group-hover:translate-x-1 transition-transform">POŁĄCZ →</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    );
  }

  if (!file) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-6"
      >
        <nav className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          <Link href="/" className="hover:text-white transition-colors">ROOT</Link>
          {breadcrumb.map((item: any) => (
            <React.Fragment key={item.href}>
              <span>/</span>
              <Link href={item.href} className="hover:text-white transition-colors">{item.title}</Link>
            </React.Fragment>
          ))}
        </nav>

        <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.85] wrap-break-word uppercase">
          {file.title}
        </h1>

        <div className="flex flex-wrap gap-8 text-[10px] font-bold tracking-widest border-y border-white/10 py-6 uppercase opacity-60">
          <div className="space-y-1">
            <div className="text-zinc-500">MODIFIED</div>
            <div>{file.modifiedDate}</div>
          </div>
          <div className="space-y-1">
            <div className="text-zinc-500">CREATED</div>
            <div>{file.date}</div>
          </div>
          <div className="space-y-1">
            <div className="text-zinc-500">PAYLOAD_SIZE</div>
            <div>{file.size}</div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-16"
      >
        <Link 
          href="/" 
          className="group flex items-center gap-3 text-[10px] font-bold tracking-widest hover:text-white transition-colors"
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">←</span>
          POWROT_DO_GŁÓWNEGO_RDZENIA
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">EXPORT_DATA:</span>
          <div className="flex gap-2">
            {['MD', 'HTML', 'TXT', 'DOCX'].map((ext) => (
              <a
                key={ext}
                href={`/api/download/${slug}?format=${ext.toLowerCase()}`}
                className="px-3 py-1.5 text-[9px] font-bold border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all"
              >
                {ext}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.article 
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hud-glass p-10 sm:p-16 relative group"
      >
        <div className="scanlines absolute inset-0 opacity-5 pointer-events-none" />
        <div className="dither-grid absolute inset-0 text-white pointer-events-none opacity-[0.02]" />
        
        <div className="relative z-10 prose prose-invert prose-zinc max-w-none 
          prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
          prose-p:leading-relaxed prose-p:text-zinc-300 prose-p:text-lg
          prose-a:text-white prose-a:underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all
          prose-strong:text-white prose-strong:font-black
          prose-code:text-white prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-white/5 prose-pre:backdrop-blur-sm"
        >
          {file.content ? (
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <div className="relative w-full aspect-video my-8 border border-white/5 overflow-hidden">
                    <Image
                      src={(props.src as string) || ''}
                      alt={props.alt || ''}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  </div>
                ),
              }}
            >
              {file.content}
            </ReactMarkdown>
          ) : (
            <div className="text-center py-32 text-zinc-700 font-bold tracking-[0.2em] italic uppercase">
              [ NO_PAYLOAD_DETECTED ]
            </div>
          )}
        </div>
      </motion.article>
    </div>
  );
}
