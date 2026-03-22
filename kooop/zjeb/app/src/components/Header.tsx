'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TypographyGuardian } from './TypographyGuardian';
import { useGlitchStore } from '@/store/useGlitchStore';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isGlitching } = useGlitchStore();

  return (
    <header className="border-b-8 border-black bg-transparent sticky top-0 z-1000 p-4 md:px-10 flex justify-between items-center font-mono" role="banner">
      <Link 
        href="/" 
        className={`text-2xl font-[1000] tracking-tighter uppercase group transition-all focus-visible:ring-4 focus-visible:ring-black outline-none ${
          isGlitching ? 'chromatic-aberration animate-glitch' : ''
        }`}
        aria-label="SYF.OS Home"
      >
        <TypographyGuardian>
          SYF<span className="group-hover:translate-x-1 inline-block">.</span>OS
        </TypographyGuardian>
      </Link>
      
      <div className="flex gap-4 items-center">
        <nav className="hidden md:flex gap-1" aria-label="Main Navigation">
          <ul className="flex gap-1 list-none p-0 m-0">
            {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
              <li key={btn}>
                <Link 
                  href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
                  className="border-2 border-black px-3 py-1 font-black text-[10px] uppercase hover:bg-black hover:text-white transition-all focus-visible:bg-black focus-visible:text-white outline-none inline-block"
                  aria-label={`Przejdź do: ${btn}`}
                >
                  <TypographyGuardian>[  {btn}  ]</TypographyGuardian>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden border-2 border-black px-3 py-1 font-black text-[10px] uppercase focus-visible:bg-black focus-visible:text-white outline-none"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {menuOpen ? '[CLOSE]' : '[MENU]'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 top-[64px] bg-white z-999 p-8 flex flex-col gap-4 border-t-8 border-black animate-in slide-in-from-top duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <nav aria-label="Mobile Menu Links">
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
                <li key={btn}>
                  <Link 
                    href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-[1000] tracking-tighter uppercase border-b-4 border-black pb-2 hover:bg-black hover:text-white px-2 transition-all block focus-visible:bg-black focus-visible:text-white outline-none"
                    aria-label={`Przejdź do: ${btn}`}
                  >
                    <TypographyGuardian>
                      [  {btn}  ]
                    </TypographyGuardian>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
