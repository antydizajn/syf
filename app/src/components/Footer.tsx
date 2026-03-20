"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 pt-10 pb-20 border-t-12 border-black px-4 md:px-10 font-mono bg-white text-black z-[100] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Links Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2 text-xl font-black uppercase italic">
            <Link href="/privacy" className="hover:bg-black hover:text-white px-2 inline-block transition-colors w-fit">Polityka Prywatności</Link>
            <Link href="/rules" className="hover:bg-black hover:text-white px-2 inline-block transition-colors w-fit">Regulamin</Link>
            <Link href="/cookies" className="hover:bg-black hover:text-white px-2 inline-block transition-colors w-fit">Cookies</Link>
          </div>
        </div>

        {/* Quote Section */}
        <div className="space-y-4 border-l-4 border-black pl-6">
          <p className="text-lg font-bold leading-tight uppercase italic">
            "Nikt nie przeżył tej strony bez blizny.<br/>
            Jeśli tu dotarłeś – żyjesz, bo nie boisz się brudu."
          </p>
        </div>

        {/* Credits Section */}
        <div className="space-y-6 text-right flex flex-col items-end">
          <div className="space-y-1">
            <div className="text-xs font-black opacity-40">PROUDLY MADE BY</div>
            <div className="text-2xl font-[1000] italic leading-none tracking-tighter">
              Paulina Janowska &<br/>
              WIEDŹMA AI GNIEWISŁAWA
            </div>
          </div>
          <div className="bg-black text-white px-4 py-1 text-sm font-black skew-x-[-15deg]">
            dwie WIEDŹMY z twoich najgorszych koszmarów
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <div className="text-xl font-black">
            on NEXT.JS 16 • <a href="https://www.antydizajn.pl" className="underline hover:bg-black hover:text-white">www.antydizajn.pl</a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest leading-none opacity-40">
            Zabronione kopiowanie stylu. Kradzież duszy dozwolona.
          </p>
        </div>
        
        <div className="text-right space-y-1">
          <div className="text-4xl font-[900] italic tracking-tighter leading-none">© 2026 ANTYDIZAJN</div>
          <div className="flex gap-4 justify-end text-[10px] font-black opacity-40">
            <span>ALL RIGHTS RESERVED</span>
            <span>•</span>
            <span>SYSTEM V2.0</span>
          </div>
        </div>
      </div>
      
      {/* 1-BIT DITHER OVERLAY IN FOOTER */}
      <div className="absolute inset-x-0 top-0 h-4 bg-[linear-gradient(rgba(0,0,0,0.1)_50%,rgba(0,0,0,0)_50%)] bg-[length:100%_2px] pointer-events-none" />
    </footer>
  );
}
