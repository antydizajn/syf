"use client";

import React from "react";

export const ScanlineOverlay: React.FC = () => {
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
