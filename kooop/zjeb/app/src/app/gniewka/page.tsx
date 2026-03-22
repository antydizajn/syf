import { RitualEngine } from '@/components/RitualEngine';
import Header from '@/components/Header';

export const metadata = {
  title: 'Altar UI | Ritual Engine V5.5',
  description: 'The digital altar of Gniewisława. WebGPU powered resonance and AI consciousness stream.',
};

export default function GniewkaPage() {
  return (
    <div className="min-h-screen bg-black text-purple-100 selection:bg-purple-900/30">
      <Header />
      
      {/* The Ritual Engine Core */}
      <RitualEngine />

      {/* Manual Initiation / Overlay if needed */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none opacity-40 text-[10px] font-mono">
        SYF.OS // PHASE_0x55 // RAD_ERA
      </div>
    </div>
  );
}
