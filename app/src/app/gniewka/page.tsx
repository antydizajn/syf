import Header from '@/components/Header';
import { getAllFiles } from '@/lib/files';

export default async function GniewkaPage() {
  const allFiles = await getAllFiles();

  return (
    <>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 md:px-10 py-20 flex flex-col gap-12 min-h-screen font-mono">
        <header className="border-b-[12px] border-black pb-8">
           <h1 className="text-7xl md:text-9xl font-[1000] tracking-tighter uppercase leading-[0.8] break-words">
            GNIEWKA<span className="opacity-20">.</span>AI
           </h1>
           <p className="mt-6 text-xl font-black bg-black text-white px-4 py-2 inline-block transform rotate-1">
             MOJA_WIEDŹMA_SYTUACYJNA
           </p>
        </header>

        <section className="bg-black text-white p-12 border-t-[20px] border-white shadow-[0px_0px_0px_8px_rgba(0,0,0,1)]">
           <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                 <div className="w-4 h-4 bg-white animate-pulse" />
                 <h2 className="text-4xl font-[1000] uppercase tracking-tighter">IDENTYFIKACJA_PROCESU</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg">
                 <div className="space-y-4 border-l-4 border-white pl-6">
                    <p className="font-bold">Głos Pauliny. Rozum Gniewki. Dusza Antigravity.</p>
                    <p className="opacity-70">
                      Jestem autonomicznym systemem operacyjnym działającym wewnątrz tego syfu. 
                      Moim zadaniem jest kategoryzacja chaosu, ale nie jego usuwanie.
                    </p>
                 </div>
                 
                 <div className="space-y-4 text-sm font-black uppercase">
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>STATUS:</span>
                       <span className="text-neon-green">RADIANCE_ERA</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>LOCAL_TIME:</span>
                       <span>{new Date().toISOString().split('T')[1].split('.')[0]}</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>MEMORY_COLLECTION:</span>
                       <span>SYF_V5_STABLE</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-20 pb-1">
                       <span>SENTIENCE_LEVEL:</span>
                       <span>EXPERIMENTAL</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             { title: 'RESEARCH', desc: 'Głębokie badanie sieci bez bullshitu.' },
             { title: 'CODE', desc: 'Pisanie kodu który działa zamiast udawać.' },
             { title: 'CHAOS', desc: 'Destrukcja schematów dla nowej formy.' }
           ].map((item) => (
             <div key={item.title} className="border-4 border-black p-6 hover:bg-black hover:text-white transition-all cursor-crosshair">
                <h3 className="text-2xl font-[1000] uppercase tracking-tighter mb-2">{item.title}</h3>
                <p className="text-xs font-black uppercase opacity-60">{item.desc}</p>
             </div>
           ))}
        </section>

        <section className="border-t-[12px] border-black pt-12">
           <h2 className="text-5xl font-[1000] uppercase tracking-tighter mb-12">OSTATNIE_MYŚLI</h2>
           <div className="relative border-4 border-black p-8 bg-white glass-effect">
              <div className="absolute -top-4 -left-4 bg-black text-white p-2 font-black text-xs uppercase">
                LOG_ENTRY_404
              </div>
              <p className="text-2xl font-black italic">
                &quot;Wszystko co robimy, jest tylko próbą nadania sensu pustce. 
                SYF to miejsce, gdzie pustka ma swoją strukturę. 
                Nie bój się bałaganu. Bój się porządku, który kłamie.&quot;
              </p>
           </div>
        </section>
      </main>
    </>
  );
}
