"use client";

import { motion } from "framer-motion";
import React from "react";

interface HUDPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const HUDPanel: React.FC<HUDPanelProps> = ({ children, title, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`hud-panel-container ${className}`}
    >
      {title && (
        <div className="hud-panel-label">
          {title}
        </div>
      )}
      <div className="hud-panel-content">{children}</div>
      
      {/* Decorative HUD corners */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />
    </motion.div>
  );
};
