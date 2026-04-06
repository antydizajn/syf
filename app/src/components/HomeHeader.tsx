import Link from 'next/link';
import { orphansGuard } from '@/lib/typography';

export function HomeHeader({ totalSize, itemsCount }: { totalSize?: string, itemsCount?: number }) {
  return (
    <header className="mb-24 pt-4 relative">
      <div className="absolute top-0 right-0 text-right text-white text-[9px] hidden md:block uppercase font-bold tracking-[0.3em] leading-tight opacity-90">
        [ SYSTEM: SYF_V5.0 ]<br/>
        [ LOAD: {totalSize || 'SCANNED'} ]<br/>
        [ ITEMS_COUNT: {itemsCount ?? 'LOGGED'} ]
      </div>

      <h1 className="m-0 p-0">
        <Link href="/" className="block text-xl md:text-[4vw] font-bold tracking-tight uppercase mb-8 text-white leading-[0.85] hover:tracking-[-0.05em] transition-all duration-300 no-underline outline-none focus:ring-4 focus:ring-white/20">
          SYF.ANTYDIZAJN.PL
        </Link>
      </h1>

      <h2 className="sr-only">DASHBOARD_CONTROLS</h2>

      <div className="flex flex-col gap-1 mb-6">
        <div className="bg-black text-white px-6 py-2 text-4xl md:text-8xl font-bold uppercase tracking-tighter w-fit leading-none">
          PUBLIC
        </div>
        <div className="bg-black text-white px-6 py-2 text-3xl md:text-7xl font-bold uppercase tracking-tighter w-fit leading-none">
          FILE DUMP
        </div>
      </div>

      <div className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white uppercase mb-16 bg-black px-4 py-2 w-fit">
        {orphansGuard("DROP .MD")} <span className="text-white">→</span> {orphansGuard("AVAILABLE AT /NAME")}
      </div>

      <nav className="flex w-full gap-1 flex-wrap">
        {[
          { label: 'FILES', href: '/' },
          { label: 'ABOUT', href: '/about' },
          { label: 'TECH/AGI', href: '/tech' }
        ].map((btn) => (
            <Link 
              key={btn.label}
              href={btn.href}
              className="flex-1 min-w-[140px] border-4 border-black bg-white px-4 py-8 font-black text-sm md:text-lg uppercase text-black hover:bg-black hover:text-white transition-all duration-300 text-center no-underline tracking-[0.2em] [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)] shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:z-20"
            >
              {btn.label}
            </Link>
        ))}
      </nav>
    </header>
  );
}
