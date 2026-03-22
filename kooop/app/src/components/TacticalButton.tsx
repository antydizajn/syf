"use client";

import { motion } from "framer-motion";
import React from "react";

interface TacticalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "cyan" | "magenta" | "orange";
}

export const TacticalButton: React.FC<TacticalButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "cyan" 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`tactical-btn variant-${variant} ${className}`}
    >
      <div className="tactical-btn-inner">
        {children}
      </div>
    </motion.button>
  );
};
