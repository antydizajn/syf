'use client';

import { useEffect, useState } from 'react';

/**
 * A11yGuardian - Usługa dostępności dla SYF.OS
 * Ogłasza zmiany stanu (np. zmiana sektora, ładowanie) dla czytników ekranu.
 */
export function A11yGuardian({ announcement }: { announcement: string }) {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (announcement) {
      setMsg(announcement);
    }
  }, [announcement]);

  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true" 
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0',
      }}
    >
      {msg}
    </div>
  );
}
