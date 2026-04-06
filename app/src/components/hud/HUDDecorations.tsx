'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { initConsoleFlex } from '@/lib/consoleFlex';
import { initTypographyGuardian } from '@/lib/typographyGuardian';

const RevolutionBackground = dynamic(() => import("@/components/RevolutionBackground"), {
  ssr: false,
});

export function HUDDecorations() {
  useEffect(() => {
    // CRITICAL: CONSOLE_FLEX - ZAKAZ USUWANIA (USER RULES)
    initConsoleFlex();
    initTypographyGuardian();
  }, []);

  return (
    <>
      <RevolutionBackground />
      <div className="dither-overlay" />
      {/* DIAGNOSTIC OVERLAYS AS FLOATING ELEMENTS */}
      <div className="fixed top-20 right-8 text-[8px] font-mono opacity-60 tracking-widest pointer-events-none uppercase hidden lg:block z-50">
        <ClientViewport />
      </div>
    </>
  );
}

function ClientViewport() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = `VIEW_PORT: ${window.innerWidth}x${window.innerHeight}`;
    }
  }, []);
  return <span ref={ref}>VIEW_PORT: CALC...</span>;
}
