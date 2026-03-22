"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAmbient } from './AmbientContext';

/**
 * SYF V3.0 - Diagnostic HUD
 * Real-time telemetry visualization for the Ambient Intelligence system.
 */
export const DiagnosticHUD: React.FC = () => {
    const { ambient } = useAmbient();

    const intentColor = useMemo(() => {
        switch (ambient.intent) {
            case 'GLITCH': return '#FF003C';
            case 'RITUAL': return '#39FF14';
            case 'FOCUSED': return '#CCFF00';
            default: return '#FFFFFF';
        }
    }, [ambient.intent]);

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none select-none">
            {/* Resonance Meter */}
            <div className="glass-v3 p-3 w-48 flex flex-col gap-1 overflow-hidden">
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-white/50">
                    <span>Resonance Pulse</span>
                    <span>{(ambient.resonance * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div 
                        className="h-full bg-white transition-all duration-300"
                        style={{ width: `${ambient.resonance * 100}%`, backgroundColor: intentColor }}
                    />
                    {/* Ghost Pulse Overlay */}
                    <motion.div 
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent w-full"
                    />
                </div>
            </div>

            {/* Cognitive Density Dashboard */}
            <div className="glass-v3 p-3 w-48 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-white/50">
                    <span>Cognitive Density</span>
                    <span className="text-neon-green">ACTIVE</span>
                </div>
                
                {/* Visual Grid Visualization */}
                <div className="grid grid-cols-8 gap-0.5 h-6">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ 
                                opacity: i / 16 < ambient.density ? [0.4, 1, 0.4] : 0.1,
                                backgroundColor: i / 16 < ambient.density ? intentColor : 'rgba(255,255,255,0.1)'
                            }}
                            transition={{ 
                                duration: 1, 
                                repeat: Infinity, 
                                delay: i * 0.05 
                            }}
                            className="bg-white/10 w-full h-full border border-white/5"
                        />
                    ))}
                </div>

                {/* Intent Status */}
                <div className="flex items-center gap-2 mt-1">
                    <div 
                        className="w-2 h-2 rounded-full animate-pulse" 
                        style={{ backgroundColor: intentColor, boxShadow: `0 0 10px ${intentColor}` }} 
                    />
                    <span className="text-[9px] font-black tracking-tighter text-white uppercase italic">
                        Intent: {ambient.intent}
                    </span>
                </div>
            </div>

            {/* Micro Diagnostic Code */}
            <div className="text-[7px] font-mono text-white/20 whitespace-pre leading-tight">
                SYF_OS::KINETIC_LINK_ONLINE
                DENSITY::{ambient.density.toFixed(4)}
                RES_PULSE::{ambient.resonance.toFixed(4)}
                V3_AESTHETIC::GLASS_RT_ACTIVE
            </div>
        </div>
    );
};
