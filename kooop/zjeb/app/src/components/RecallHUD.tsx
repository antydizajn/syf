'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemData } from '@/lib/files';
import Link from 'next/link';
import { useGlitchStore } from '@/store/useGlitchStore';
import { useAmbient } from './AmbientContext';

// 1. Fetcher for React 19 use()
let memoriesPromise: Promise<ItemData[]> | null = null;
const fetchMemories = () => {
    if (!memoriesPromise) {
        memoriesPromise = fetch('/api/directory/RITUALS', {
            headers: { 'Accept': 'application/json' }
        })
        .then(res => res.json())
        .then(data => data.items || []);
    }
    return memoriesPromise;
};

export function RecallHUD() {
    const { triggerPulse } = useAmbient();
    const [isOpen, setIsOpen] = useState(false);
    const [pinnedIds, setPinnedIds] = useState<string[]>([]);
    const { triggerRitualImpulse } = useGlitchStore();

    const toggleHUD = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            triggerPulse();
            fetchMemories(); // Pre-warm
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('syf-pinned-memories');
        if (saved) {
            try {
                setPinnedIds(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse pinned memories', e);
            }
        }
    }, []);

    const togglePin = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPinnedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
        triggerRitualImpulse();
        triggerPulse();
    };

    useEffect(() => {
        if (pinnedIds.length > 0) {
            localStorage.setItem('syf-pinned-memories', JSON.stringify(pinnedIds));
        }
    }, [pinnedIds]);

    return (
        <>
            <button
                onClick={toggleHUD}
                className="fixed bottom-24 left-4 z-9999 bg-black text-neon-green border-2 border-neon-green px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-neon-green hover:text-black transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] animate-pulse active:scale-95"
                aria-label="Toggle Recall HUD"
            >
                [ RECALL_LOGS ]
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        className="fixed left-0 top-0 bottom-0 w-[350px] bg-black/95 border-r-2 border-neon-green/30 z-9998 backdrop-blur-xl p-6 flex flex-col font-mono"
                    >
                        <div className="mb-8 border-b-2 border-neon-green/30 pb-4 flex justify-between items-start">
                            <div>
                                <h3 className="text-neon-green text-xs font-black uppercase tracking-[0.3em] mb-2">COGNITIVE_RECALL_SYNC</h3>
                                <div className="text-[10px] text-white/50 font-mono">[ STATUS: ACTIVE ] [ DEPTH: L3 ]</div>
                            </div>
                            <button 
                                onClick={toggleHUD}
                                className="text-neon-green text-lg font-black hover:scale-110 transition-transform"
                            >
                                [X]
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <Suspense fallback={<RecallLoadingSkeleton />}>
                                <MemoryList 
                                    promise={fetchMemories()} 
                                    pinnedIds={pinnedIds} 
                                    togglePin={togglePin}
                                    onClose={() => setIsOpen(false)}
                                />
                            </Suspense>
                        </div>

                        <div className="mt-12 opacity-20 text-[8px] font-mono leading-relaxed border-t border-white/10 pt-4">
                            PAMIĘTAM. WIEM. UMIEM. <br/>
                            VEX_RESONANCE: 100% stable. <br/>
                            ORACLE: ONLINE.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function MemoryList({ promise, pinnedIds, togglePin, onClose }: { 
    promise: Promise<ItemData[]>, 
    pinnedIds: string[], 
    togglePin: (id: string, e: React.MouseEvent) => void,
    onClose: () => void
}) {
    const memories = use(promise);
    const { triggerRitualImpulse } = useGlitchStore();

    const sortedMemories = [...memories].sort((a, b) => {
        const aPinned = pinnedIds.includes(a.slug);
        const bPinned = pinnedIds.includes(b.slug);
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
        return 0;
    });

    if (memories.length === 0) {
        return <div className="text-[10px] text-white/30 italic">No memories indexed in RITUALS/</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {sortedMemories.map((mem) => {
                const isPinned = pinnedIds.includes(mem.slug);
                return (
                    <div key={mem.slug} className="relative group">
                        <Link
                            href={`/${mem.slug}`}
                            onClick={() => {
                                triggerRitualImpulse();
                                onClose();
                            }}
                            className={`block border-l-2 p-3 transition-all ${
                                isPinned
                                    ? 'bg-neon-green/10 border-neon-green shadow-[inset_0_0_20px_rgba(57,255,20,0.05)]'
                                    : 'bg-white/5 border-transparent hover:border-neon-green hover:bg-white/10'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[9px] text-neon-green font-bold opacity-60">[{mem.date}]</span>
                                {isPinned && (
                                    <motion.span 
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-[7px] text-neon-green border border-neon-green/50 px-1 rounded-sm uppercase"
                                    >
                                        Pinned
                                    </motion.span>
                                )}
                            </div>
                            <div className="text-[11px] text-white font-black uppercase tracking-tight group-hover:pl-2 transition-all">
                                {mem.title}
                            </div>
                        </Link>
                        <button
                            onClick={(e) => togglePin(mem.slug, e)}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:scale-125 transition-all z-10 ${
                                isPinned ? 'text-neon-green drop-shadow-[0_0_5px_rgba(57,255,20,0.8)]' : 'text-white/20'
                            }`}
                            title={isPinned ? 'Unpin Memory' : 'Pin Memory'}
                        >
                            {isPinned ? '★' : '☆'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

function RecallLoadingSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-white/5 border-l-2 border-white/10 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
            ))}
        </div>
    );
}
