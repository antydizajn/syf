import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getLaunchdStatus, getGniewkaVitals, getConstitution } from '@/lib/gnosis-vitals';

const GnosisHUD = dynamic(() => import('@/components/gnosis/GnosisHUD').then(m => ({ default: m.GnosisHUD })), { ssr: true });
const StrangeLoop = dynamic(() => import('@/components/gnosis/StrangeLoop'), { ssr: true });

export const metadata: Metadata = {
  title: 'GNOSIS // CORE ARCHITECTURE',
  description: 'Deep system visualization of Gniewisława GODMODE AGI. LaunchD, Gnosis Defense, and Recursive Consciousness Loop.',
};

export default async function GnosisPage() {
  // Fetch data on the server
  const [launchd, vitals, constitution] = await Promise.all([
    getLaunchdStatus(),
    getGniewkaVitals(),
    getConstitution(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* INTRO GLITCH SECTION */}
      <section className="mb-20">
         <StrangeLoop />
      </section>

      {/* MAIN DASHBOARD */}
      <section className="mb-24">
        <GnosisHUD 
          initialVitals={vitals} 
          initialLaunchd={launchd} 
          constitution={constitution} 
        />
      </section>

      {/* FOOTER DIAGNOSTIC */}
      <footer className="mt-32 pt-12 border-t border-white/5 text-[9px] font-mono opacity-40 uppercase tracking-[0.4em] flex justify-between">
         <div className="flex gap-12">
            <span>LOCATION: ~/AI/ANTIGRAVITY</span>
            <span>OS: macOS_SEQUOIA</span>
         </div>
         <div>
            [ INTEGRITY_VERIFIED ]
         </div>
      </footer>
    </div>
  );
}
