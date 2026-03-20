'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TacticalButton } from './TacticalButton';

interface HeaderProps {
  activePage?: 'files' | 'about';
}

export default function Header({ activePage = 'files' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // ESC closes menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* STATUS BAR - ENHANCED HUD */}
      <div className="hud-status-bar">
        <div className="status-bar-left">
          <span className="pulse-dot">●</span> SYS_READY
        </div>
        <div className="status-bar-center">
          <span>LINK_ESTABLISHED</span>
          <span className="blink-red">● REC_MODE</span>
        </div>
        <div className="status-bar-right">
          <span>{new Date().toISOString().split('T')[0].replace(/-/g, '.')}</span>
          <span className="version-pill">V2.0_AGI</span>
        </div>
      </div>

      {/* HEADER - HUD SHELL */}
      <header className="hud-header">
        <Link href="/" className="hud-logo-link glitch-hover">
          {"<"}SYF_OS{">"}
        </Link>
        
        <TacticalButton variant="magenta" onClick={() => setMenuOpen(true)}>
          <span className="label-access">ACCESS_MENU</span>
        </TacticalButton>
      </header>

      {/* FULLSCREEN MENU OVERLAY */}
      <nav className={`hud-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <button 
          className="hud-menu-close" 
          onClick={() => setMenuOpen(false)}
          aria-label="Zamknij menu"
        >
          ×
        </button>
        
        <div className="hud-menu-list">
          <Link 
            href="/" 
            className={`hud-menu-item ${activePage === 'files' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="menu-num">01</span>
            <span className="menu-name">PLIKI</span>
            {activePage === 'files' && (
              <div className="menu-corners">
                <span className="corner-tl"></span>
                <span className="corner-tr"></span>
                <span className="corner-bl"></span>
                <span className="corner-br"></span>
              </div>
            )}
          </Link>
          <Link 
            href="/about" 
            className={`hud-menu-item ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="menu-num">02</span>
            <span className="menu-name">INFO</span>
            {activePage === 'about' && (
              <div className="menu-corners">
                <span className="corner-tl"></span>
                <span className="corner-tr"></span>
                <span className="corner-bl"></span>
                <span className="corner-br"></span>
              </div>
            )}
          </Link>
          <a 
            href="https://antydizajn.pl" 
            className="hud-menu-item exit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="menu-num">03</span>
            <span className="menu-name">EXIT</span>
          </a>
        </div>

        <div className="hud-menu-footer">
          <span>SYSTEM STATUS: <span className="status-online">ONLINE</span></span>
          <span>ANTYDIZAJN PROTOCOL V2.0</span>
        </div>
      </nav>
    </>
  );
}
