'use client';
import Link from 'next/link';
import { ItemData } from '@/lib/files';
import { motion } from 'framer-motion';

interface FileListProps {
  items: ItemData[];
  startIndex?: number;
}

export default function FileList({ items, startIndex = 0 }: FileListProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-1">
      {items.map((item, index) => {
        const displayIndex = String(startIndex + index + 1).padStart(3, '0');
        const isFolder = item.type === 'folder';
        const displayName = isFolder ? item.name : item.title;
        
        return (
          <motion.div 
            key={item.slug}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.01 }}
            className="group border-b border-black/10 py-2 flex items-center gap-4 hover:bg-black hover:text-white px-2 transition-colors cursor-crosshair relative"
          >
            <span className="text-[10px] font-black opacity-20 group-hover:opacity-100 min-w-[2.5rem]">
              {displayIndex}
            </span>
            <span className={`text-sm font-black uppercase tracking-tighter truncate flex-1 ${isFolder ? 'underline decoration-4 underline-offset-4' : ''}`}>
              {displayName}
            </span>
            <span className="text-[9px] opacity-20 font-bold shrink-0">
              {isFolder ? 'DIR' : item.size}
            </span>
            <Link href={`/${item.slug}`} className="absolute inset-0 z-10" />
            
            {/* 1-BIT DECORATION */}
            <div className="absolute left-0 bottom-0 w-full h-[0.5px] bg-black/5" />
          </motion.div>
        );
      })}
    </section>
  );
}
