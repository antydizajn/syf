'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-8 border-black bg-white/50 backdrop-blur-xl sticky top-0 z-1000 p-4 md:px-10 flex justify-between items-center font-mono">
      <Link href="/" className="text-2xl font-[1000] tracking-tighter uppercase group transition-all">
        SYF<span className="group-hover:translate-x-1 inline-block">.</span>OS
      </Link>
      
      <div className="flex gap-4 items-center">
        <nav className="hidden md:flex gap-1">
          {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
            <Link 
              key={btn}
              href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
              className="border-2 border-black px-3 py-1 font-black text-[10px] uppercase hover:bg-black hover:text-white transition-all"
            >
              [  {btn}  ]
            </Link>
          ))}
        </nav>
        
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden border-2 border-black px-3 py-1 font-black text-[10px] uppercase"
        >
          {menuOpen ? '[CLOSE]' : '[MENU]'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 top-[64px] bg-white z-999 p-8 flex flex-col gap-4 border-t-8 border-black animate-in slide-in-from-top duration-300">
           {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
            <Link 
              key={btn}
              href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-[1000] tracking-tighter uppercase border-b-4 border-black pb-2 hover:bg-black hover:text-white px-2 transition-all"
            >
              [  {btn}  ]
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
