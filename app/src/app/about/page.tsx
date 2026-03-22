import { orphansGuard } from '@/lib/typography';
import Link from 'next/link';

export default async function AboutPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 md:px-10 py-12 flex flex-col gap-12 font-mono min-h-screen">
        <header className="mb-24 pt-4 relative">
          <div className="absolute top-0 right-0 text-right text-white/50 text-[9px] hidden md:block uppercase font-bold tracking-[0.3em] leading-tight">
            [ PAGE: ABOUT ]<br/>
            [ SYSTEM: SYF_V5.3 ]
          </div>

          <Link href="/" className="block text-xl md:text-[4vw] font-bold tracking-tight uppercase mb-8 text-white leading-[0.85] hover:tracking-[-0.05em] transition-all duration-300 no-underline">
            SYF.ANTYDIZAJN.PL
          </Link>

          <div className="flex flex-col gap-1 mb-6">
            <div className="bg-black text-white px-6 py-2 text-4xl md:text-8xl font-bold uppercase tracking-tighter w-fit leading-none">
              O SYFIE
            </div>
            <div className="bg-black text-white px-6 py-2 text-3xl md:text-7xl font-bold uppercase tracking-tighter w-fit leading-none">
              DUMP PLIKÓW
            </div>
          </div>

          <nav className="flex w-full gap-1 flex-wrap mt-8">
            {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
              <Link 
                key={btn}
                href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
                className="flex-1 min-w-[140px] border-4 border-black bg-white px-4 py-8 font-black text-sm md:text-lg uppercase text-black hover:bg-black hover:text-white transition-all duration-300 text-center no-underline tracking-[0.2em] [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)] drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:drop-shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:z-20"
              >
                {btn}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="flex flex-col gap-6 bg-black/70 backdrop-blur-md border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <h2 className="text-3xl font-[1000] uppercase tracking-tighter border-b-4 border-black pb-2">
                CO TO JEST?
              </h2>
              <div className="text-lg leading-relaxed space-y-4 font-bold">
                 <p>
                   {orphansGuard("SYF to publiczny dump plików Markdown. Bez bazy danych, bez logowania, bez bullshitu.")}
                 </p>
                 <p>
                   {orphansGuard("Wrzucasz plik .md do folderu → automatycznie dostępny pod /NAZWA.")}
                 </p>
              </div>
           </div>

           <div className="flex flex-col gap-6 bg-black/70 backdrop-blur-md border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <h2 className="text-3xl font-[1000] uppercase tracking-tighter border-b-4 border-black pb-2">
                JAK TO DZIAŁA?
              </h2>
              <ul className="space-y-4 text-sm font-black uppercase">
                 <li className="flex gap-4">
                   <span className="bg-black text-white px-2">01</span>
                   <span>Plik <code>manifest.md</code> → /manifest</span>
                 </li>
                 <li className="flex gap-4">
                   <span className="bg-black text-white px-2">02</span>
                   <span>Plik <code>research-ai.md</code> → /research-ai</span>
                 </li>
                 <li className="flex gap-4 opacity-30">
                   <span className="bg-black text-white px-2">03</span>
                   <span>{orphansGuard("I tak dalej. Zero magii. Czysty filesystem.")}</span>
                 </li>
              </ul>
           </div>
        </section>

        <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-help">
           <h2 className="text-3xl font-[1000] uppercase tracking-tighter mb-8 bg-black text-white px-4 py-1 inline-block">
             TECH STACK // CORE
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] font-black uppercase">
              <div className="flex flex-col border-l-4 border-black pl-4">
                 <span className="opacity-50">FRAMEWORK:</span>
                 <span className="text-lg leading-none">NEXT.JS 16.2.0</span>
              </div>
              <div className="flex flex-col border-l-4 border-black pl-4">
                 <span className="opacity-50">RUNTIME:</span>
                 <span className="text-lg leading-none">REACT 19</span>
              </div>
              <div className="flex flex-col border-l-4 border-black pl-4">
                 <span className="opacity-50">DATABASE:</span>
                 <span className="text-lg leading-none">FILESYSTEM</span>
              </div>
           </div>
        </section>

        <section className="bg-black/70 text-white p-12 mt-32 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 text-[60px] font-[1000] opacity-10 leading-none select-none">
             SYF SYF SYF SYF
           </div>
           <h3 className="text-4xl font-[1000] tracking-tighter uppercase mb-6 relative z-10">DLACZEGO &quot;SYF&quot;?</h3>
           <p className="text-xl font-bold italic border-l-8 border-white pl-6 relative z-10">
             {orphansGuard("Bo to jest syf. Chaotyczny zbiór plików, myśli, researchu. Nie udajemy, że to jest eleganckie. To jest brutalne i szczere. W morzu wypolerowanych interfejsów, wybieramy brud.")}
           </p>
        </section>
      </main>
    </>
  );
}
