import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllFiles } from '@/lib/files';

export default async function AboutPage() {
  const allFiles = await getAllFiles();

  return (
    <>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 md:px-10 py-20 flex flex-col gap-12 min-h-screen font-mono">
        <header className="border-b-12 border-black pb-8">
           <h1 className="text-7xl md:text-9xl font-[1000] tracking-tighter uppercase leading-[0.8] wrap-break-word">
            O SYFIE<span className="opacity-20">.</span>OS
           </h1>
           <p className="mt-6 text-xl font-black bg-black text-white px-4 py-2 inline-block transform -rotate-1">
             PUBLICZNY_DUMP_PLIKÓW_MARKDOWN
           </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-[1000] uppercase tracking-tighter border-b-4 border-black pb-2">
                CO_TO_JEST?
              </h2>
              <div className="text-lg leading-relaxed space-y-4">
                 <p>
                   <strong>SYF</strong> to publiczny dump plików Markdown. 
                   Bez bazy danych, bez logowania, bez bullshitu.
                 </p>
                 <p>
                   Wrzucasz plik <code>.md</code> do folderu → 
                   automatycznie dostępny pod <code>/NAZWA</code>.
                 </p>
              </div>
           </div>

           <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-[1000] uppercase tracking-tighter border-b-4 border-black pb-2">
                JAK_TO_DZIAŁA?
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
                   <span>I tak dalej. Zero magii. Czysty filesystem.</span>
                 </li>
              </ul>
           </div>
        </section>

        <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-help">
           <h2 className="text-3xl font-[1000] uppercase tracking-tighter mb-8 bg-black text-white px-4 py-1 inline-block">
             TECH_STACK // CORE
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

        <section className="bg-black text-white p-12 mt-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 text-[60px] font-[1000] opacity-10 leading-none select-none">
             SYF SYF SYF SYF
           </div>
           <h3 className="text-4xl font-[1000] tracking-tighter uppercase mb-6 relative z-10">DLACZEGO &quot;SYF&quot;?</h3>
           <p className="text-xl font-bold italic border-l-8 border-white pl-6 relative z-10">
             Bo to jest syf. Chaotyczny zbiór plików, myśli, researchu. 
             Nie udajemy, że to jest eleganckie. To jest brutalne i szczere. 
             W morzu wypolerowanych interfejsów, wybieramy brud.
           </p>
        </section>

        </section>
      </main>
      <Footer />
    </>
  );
}
