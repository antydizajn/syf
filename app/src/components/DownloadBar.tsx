'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DownloadBarProps {
  slug: string;
}

// PDF wyłączony - nie działa na shared hostingu
type Format = 'md' | 'html' | 'txt' | 'docx';

const FORMAT_ICONS: Record<Format, string> = {
  md: '📝',
  html: '🌐',
  txt: '📄',
  docx: '📘',
};

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
    if (format === 'docx') {
      setLoading(format);
    }
    
    const url = `/api/download/${slug}?format=${format}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (format === 'docx') {
      setTimeout(() => setLoading(null), 3000);
    }
  };

  return (
    <div className="download-bar">
      <div className="download-bar-content">
        <Link href="/" className="back-link">
          <span className="back-arrow">←</span>
          <span>WRÓĆ DO LISTY</span>
        </Link>

        <div className="download-bar-center">
          <span className="download-label">POBIERZ JAKO:</span>
          <div className="download-buttons">
            {(['md', 'html', 'txt', 'docx'] as Format[]).map((format) => (
              <button
                key={format}
                className={`download-btn ${loading === format ? 'loading' : ''}`}
                onClick={() => handleDownload(format)}
                title={`Pobierz jako ${format.toUpperCase()}`}
                disabled={loading === format}
              >
                <span className="btn-icon">
                  {loading === format ? '⏳' : FORMAT_ICONS[format]}
                </span>
                <span>{format.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          className={`copy-link-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopyLink}
          title="Kopiuj link"
          aria-label="Kopiuj link do schowka"
        >
          {copied ? '✓' : '🔗'}
        </button>
      </div>
    </div>
  );
}
