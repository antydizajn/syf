'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DiagnosticPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleColor?: string;
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ title, children, className = '', titleColor }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`hud-panel-container ${className}`}
    >
      <div className="hud-panel-label" style={{ color: titleColor }}>{title}</div>
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />
      <div className="hud-panel-content">
        {children}
      </div>
    </motion.div>
  );
};
