'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FileItem {
  id: string;
  title: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

export default function FileTree({ items }: { items: FileItem[] }) {
  return (
    <div className="space-y-1">
      {items.map((item, idx) => (
        <FileNode key={item.id} item={item} depth={0} idx={idx} />
      ))}
    </div>
  );
}

function FileNode({ item, depth, idx }: { item: FileItem; depth: number; idx: number }) {
  const [isOpen, setIsOpen] = useState(depth < 1); // Open first level by default
  const isFolder = item.type === 'folder';

  return (
    <div className="select-none">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.02 + depth * 0.05 }}
      >
        {isFolder ? (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center gap-2 py-1 px-2 hover:bg-white/5 transition-colors text-[10px] font-black tracking-widest uppercase group"
          >
            <span className="text-zinc-600 group-hover:text-radioactive transition-colors">
              {isOpen ? '[-]' : '[+]'}
            </span>
            <span className="flex-1 text-left">{item.title}</span>
            <span className="text-[8px] opacity-20 font-mono">DIR_{idx}</span>
          </button>
        ) : (
          <Link 
            href={`/${item.id}`}
            className="w-full flex items-center gap-2 py-1 px-2 hover:bg-white/5 transition-colors text-[10px] font-bold tracking-wider group"
          >
            <span className="w-1.5 h-1.5 bg-white/10 group-hover:bg-radioactive transition-colors" />
            <span className="flex-1 truncate opacity-70 group-hover:opacity-100">{item.title}</span>
            <span className="text-[8px] opacity-10 font-mono">MD</span>
          </Link>
        )}
      </motion.div>

      <AnimatePresence>
        {isFolder && isOpen && item.children && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-l border-white/5 ml-3"
          >
            <div className="py-1">
              {item.children.map((child, cIdx) => (
                <FileNode key={child.id} item={child} depth={depth + 1} idx={cIdx} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
