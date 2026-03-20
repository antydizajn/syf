"use client";

import React, { useEffect } from "react";
import { initConsoleFlex } from "@/lib/consoleFlex";
import { initTypographyGuardian } from "@/lib/typographyGuardian";

export const ScanlineOverlay: React.FC = () => {
  useEffect(() => {
    initConsoleFlex();
    initTypographyGuardian();
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] opacity-10"
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.4) 2px)",
        backgroundSize: "100% 3px",
      }}
      aria-hidden="true"
    />
  );
};
