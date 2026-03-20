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
    <section className="file-list-grid">
      {items.map((item, index) => {
        const displayIndex = String(startIndex + index + 1).padStart(3, '0');
        const isFolder = item.type === 'folder';
        
        return (
          <motion.article 
            key={item.slug}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`file-item ${isFolder ? 'type-folder' : 'type-file'}`}
          >
            <Link href={`/${item.slug}`} className="file-item-link">
              <div className="file-item-inner">
                <div className="file-item-index">{displayIndex}</div>
                
                <div className="file-item-main">
                  <div className="file-item-header">
                    <h2 className="file-item-title">
                      {isFolder ? `${item.name}/` : item.slug.split('/').pop()}
                    </h2>
                    <span className="file-item-type-label">
                      {isFolder ? 'DIR_NODE' : 'DATA_BLOB'}
                    </span>
                  </div>
                  {!isFolder && item.preview && (
                    <p className="file-item-preview">
                      {item.preview}
                    </p>
                  )}
                </div>

                <div className="file-item-meta">
                  <span>{item.modifiedDate}</span>
                  <span>{isFolder ? `${item.itemCount} UNTS` : item.size}</span>
                </div>

                <div className="file-item-arrow">
                  {isFolder ? '→' : '↳'}
                </div>

                {/* Decorative scanning line */}
                <div className="file-item-scanline" />
              </div>
            </Link>
          </motion.article>
        );
      })}
    </section>
  );
}
