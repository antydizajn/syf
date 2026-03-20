'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DownloadBarProps {
  slug: string;
}

type Format = 'md' | 'html' | 'txt' | 'docx';

export default function DownloadBar({ slug }: DownloadBarProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState<Format | null>(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://syf.antydizajn.pl/${slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = async (format: Format) => {
    if (format === 'docx') setLoading(format);
    const url = `/api/download/${slug}?format=${format}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (format === 'docx') setTimeout(() => setLoading(null), 3000);
  };

  return (
    <div className="bg-black text-white p-4 font-mono sticky top-[64px] z-[990] border-b-4 border-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0px_4px_20px_rgba(0,0,0,0.5)]">
      <Link href="/" className="font-black hover:underline uppercase text-xs flex items-center gap-2">
        <span className="text-xl">←</span> WRÓĆ_DO_LISTY
      </Link>

      <div className="flex items-center gap-6">
        <span className="text-[10px] font-black opacity-50 uppercase tracking-widest">POBIERZ_WORM:</span>
        <div className="flex gap-1">
          {(['md', 'html', 'txt', 'docx'] as Format[]).map((format) => (
            <button
              key={format}
              onClick={() => handleDownload(format)}
              className="border border-white/20 px-3 py-1 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all disabled:opacity-30"
              disabled={loading === format}
            >
              {loading === format ? '...' : format}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleCopyLink}
        className="border-2 border-white px-4 py-1 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all"
      >
        {copied ? '[✓_SKOPIOWANO]' : '[COPY_LINK]'}
      </button>
    </div>
  );
}
