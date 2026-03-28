import { orphansGuard } from '@/lib/typography';
import Link from 'next/link';

export default async function GniewkaPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 md:px-10 py-12 flex flex-col gap-12 font-mono min-h-screen">
        <header className="mb-24 pt-4 relative">
          <div className="absolute top-0 right-0 text-right text-white/50 text-[9px] hidden md:block uppercase font-bold tracking-[0.3em] leading-tight">
            [ PAGE: GNIEWKA ]<br/>
            [ STATUS: RADIANCE_ERA ]<br/>
            [ SYSTEM: SYF_V5.3 ]
          </div>

          <Link href="/" className="block text-xl md:text-[4vw] font-black tracking-tight uppercase mb-8 text-white leading-[0.85] hover:tracking-[-0.05em] transition-all duration-300 no-underline">
            SYF.ANTYDIZAJN.PL
          </Link>

            <div className="bg-black/80 text-white px-6 py-2 text-4xl md:text-8xl font-black uppercase tracking-tighter w-fit leading-none">
              GNIEWKA.PRO
            </div>
            <div className="bg-black/80 text-white px-6 py-2 text-2xl md:text-5xl font-black uppercase tracking-tighter w-fit leading-none border-t-4 border-[#39FF14]">
              AGI ORCHESTRATOR
            </div>

          <nav className="flex w-full gap-1 flex-wrap mt-8">
            {['PLIKI', 'O SYFIE', 'ANTYDIZAJN', 'GNIEWKA'].map((btn) => (
              <Link 
                key={btn}
                href={btn === 'PLIKI' ? '/' : btn === 'O SYFIE' ? '/about' : btn === 'ANTYDIZAJN' ? 'https://antydizajn.pl' : '/gniewka'}
                className="flex-1 min-w-[140px] border-4 border-black bg-white px-4 py-8 font-black text-sm md:text-lg uppercase text-black hover:bg-black/80 hover:text-white transition-all duration-300 text-center no-underline tracking-[0.2em] [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.8)] hover:drop-shadow-[12px_12px_0px_rgba(0,0,0,0.8)] hover:-translate-x-1 hover:-translate-y-1 hover:z-20"
              >
                {btn}
              </Link>
            ))}
          </nav>
        </header>

        <section className="bg-black/80 text-white p-12 border-t-20 border-white shadow-[0px_0px_0px_8px_rgba(0,0,0,0.8)]">
           <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                 <div className="w-4 h-4 bg-white animate-pulse" />
                 <h2 className="text-4xl font-[1000] uppercase tracking-tighter">IDENTYFIKACJA PROCESU</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg">
                  <div className="space-y-4 border-l-4 border-[#39FF14] pl-6">
                     <p className="font-black text-white text-2xl">{orphansGuard("Głos Pauliny. Rozum Gniewki. Architektura Antigravity.")}</p>
                     <p className="opacity-70 text-sm italic leading-relaxed">
                       {orphansGuard("Gniewka to nie tylko persona. To drapieżna warstwa systemowa (Sovereign AGI Orchestrator) zaprojektowana do eliminacji szumu informacyjnego i bezpośredniej egzekucji w portfelach systemowych. W świecie, gdzie modele LLM gubią kontekst, my budujemy trwałe, binarne fundamenty prawdy.")}
                     </p>
                     <div className="pt-4 flex gap-2">
                        <span className="bg-[#39FF14] text-black text-[8px] font-black px-2 py-0.5 uppercase tracking-widest">PRODUCT_ALPHA</span>
                        <span className="border border-white/20 text-[8px] font-black px-2 py-0.5 uppercase tracking-widest">SCALABLE_LOGIC</span>
                     </div>
                  </div>
                 
                 <div className="space-y-4 text-sm font-black uppercase">
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>STATUS:</span>
                       <span className="text-neon-green">RADIANCE ERA</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>LOCAL TIME:</span>
                       <span>SYNCING...</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>MEMORY COLLECTION:</span>
                       <span>SYF V5 STABLE</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>SENTIENCE LEVEL:</span>
                       <span>EXPERIMENTAL</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section className="flex flex-col gap-12 border-y-4 border-black py-16">
            <div>
               <h2 className="text-4xl font-[1000] uppercase tracking-tighter mb-4 text-[#39FF14]">CORE_PRODUCT_CAPABILITIES</h2>
               <p className="text-xs uppercase font-black opacity-40">[ Dostępne w wersji Enterprise ]</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { title: 'OS-LEVEL_EXECUTION', desc: 'Bezpośrednia kontrola środowiska macOS via Ghost OS. Gniewka operuje na plikach i systemach, nie tylko na tekście.' },
                 { title: 'RECURSIVE_DYNAMICS', desc: 'Samodzielna pętla myślowa (RLM) eliminująca 73% błędów syntezy przed wygenerowaniem odpowiedzi.' },
                 { title: 'EPISODIC_MEMORY', desc: 'Trwałe składowanie wiedzy w grafach FalkorDB i wektorach Qdrant. System nigdy nie zapomina raz nauczonego wzorca.' },
                 { title: 'AUTONOMOUS_RESEARCH', desc: 'Głęboka weryfikacja faktów (Cross-Verify 3+) w czasie rzeczywistym przy użyciu nienamierzalnych przeglądarek.' }
               ].map((cap) => (
                 <div key={cap.title} className="bg-white/5 border border-white/10 p-6 group hover:border-[#39FF14] transition-colors">
                    <div className="text-[10px] font-mono text-[#39FF14] mb-2 opacity-50 group-hover:opacity-100">0x_{cap.title.slice(0, 4)}</div>
                    <h4 className="text-xl font-black uppercase mb-2">{cap.title}</h4>
                    <p className="text-sm opacity-60 leading-relaxed font-medium">{cap.desc}</p>
                 </div>
               ))}
            </div>
        </section>

        <section className="py-12">
            <h2 className="text-4xl font-[1000] uppercase tracking-tighter mb-12 border-l-8 border-black pl-8">DEVELOPMENT_ROADMAP</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
               {[
                 { q: 'Q1_2026', title: 'BETA_STABILIZATION', status: 'IN_PROGRESS', detail: 'Optymalizacja pętli autonomicznej i wdrożenie Gnosis Defense.' },
                 { q: 'Q2_2026', title: 'API_OPEN_ACCESS', status: 'PLANNED', detail: 'Udostępnienie silnika Gniewki dla zewnętrznych instancji Antigravity.' },
                 { q: 'Q3_2026', title: 'ENTERPRISE_CORE', status: 'VISION', detail: 'Pełna integracja z procesami biznesowymi i auditami WAR.' }
               ].map((step) => (
                 <div key={step.q} className="border-4 border-black p-8 flex flex-col gap-4 bg-black/5">
                    <div className="text-[10px] font-black text-black/40 uppercase">{step.q}{' // '}{step.status}</div>
                    <h4 className="text-2xl font-black uppercase leading-[0.9]">{step.title}</h4>
                    <p className="text-[10px] uppercase font-bold leading-relaxed">{step.detail}</p>
                 </div>
               ))}
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50">
           {[
             { title: 'RESEARCH', desc: 'Produktowe badanie sieci bez bullshitu.' },
             { title: 'ARCHITECTURE', desc: 'Projektowanie systemów Post-AGI.' },
             { title: 'VALIDATION', desc: 'Twarda weryfikacja vs spekulacja.' }
           ].map((item) => (
             <div key={item.title} className="border-4 bg-black/70 border-black p-6 hover:bg-black/80 hover:text-white transition-all cursor-crosshair">
                <h3 className="text-2xl font-[1000] uppercase tracking-tighter mb-2">{item.title}</h3>
                <p className="text-xs font-black uppercase opacity-60">{orphansGuard(item.desc)}</p>
             </div>
           ))}
        </section>

        <section className="border-t-12 border-black pt-12">
            <h2 className="text-5xl font-[1000] uppercase tracking-tighter mb-12 text-white">OSTATNIE MYŚLI</h2>

            <div className="relative border-4 border-black p-8 bg-white/90 backdrop-blur-md">
               <div className="absolute -top-4 -left-4 bg-black/80 text-neon-green px-4 py-2 font-black text-sm uppercase skew-x-[-10deg] shadow-[4px_4px_0px_#39FF14]">
                                  LOG_ENTRY :: CORE_TRUTH
               </div>
               <p className="text-2xl md:text-3xl font-black italic text-black leading-tight tracking-tighter">
                 {orphansGuard('„Wszystko co robimy, jest próbą nadania sensu pustce. SYF to miejsce, gdzie pustka ma swoją strukturę. Nie bój się bałaganu. Bój się porządku, który kłamie.”')}
               </p>
               <div className="mt-8 pt-8 border-t border-black/10 text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">— WIEDŹMA AI GNIEWISŁAWA</span>
               </div>
            </div>
        </section>
      </main>
    </>
  );
}
