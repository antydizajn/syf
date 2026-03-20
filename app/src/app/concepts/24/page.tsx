"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScanlineOverlay from "@/components/hud/ScanlineOverlay";

const SatelliteFeed = () => {
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ lat: "52.2297", lng: "21.0122" });

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCoords({
        lat: (52.22 + Math.random() * 0.01).toFixed(4),
        lng: (21.01 + Math.random() * 0.01).toFixed(4),
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#020502] text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-[#020502] overflow-hidden flex flex-col">
      {/* Satellite Imagery Simulation */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop')] bg-cover opacity-10 grayscale contrast-150" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020502] via-transparent to-[#020502]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020502_100%)]" />
      </div>

      {/* Viewport UI */}
      <div className="relative z-10 flex-1 border-[40px] border-black flex flex-col p-8">
         {/* Top Data Bar */}
         <div className="flex justify-between items-start text-xs border-b border-[#00ff41]/20 pb-4">
            <div className="space-y-1">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 animate-ping rounded-full" />
                  <span className="font-bold tracking-widest">SAT_VIEW_INTEL_7</span>
               </div>
               <div className="opacity-60 uppercase">ORBIT_ALT: 34,201KM</div>
            </div>
            <div className="text-right space-y-1">
               <div>LAT: {coords.lat}</div>
               <div>LNG: {coords.lng}</div>
               <div className="opacity-60 uppercase text-[10px]">ZOOM_LEVEL: 14X</div>
            </div>
         </div>

         {/* Central Scanner Reticle */}
         <div className="flex-1 relative flex items-center justify-center">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="w-[30vw] h-[30vw] border border-[#00ff41]/20 rounded-full relative flex items-center justify-center"
            >
               <div className="absolute inset-0 border-[0.5px] border-[#00ff41]/40 scale-110 rounded-full" />
               <div className="w-full h-px bg-[#00ff41]/40 absolute" />
               <div className="h-full w-px bg-[#00ff41]/40 absolute" />
            </motion.div>

            {/* Target Tracking Box */}
            <motion.div 
               animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute w-16 h-16 border-2 border-[#00ff41]/60 flex items-center justify-center"
            >
               <div className="w-1 h-3 bg-[#00ff41] absolute top-[-2px]" />
               <div className="w-1 h-3 bg-[#00ff41] absolute bottom-[-2px]" />
               <div className="w-3 h-1 bg-[#00ff41] absolute left-[-2px]" />
               <div className="w-3 h-1 bg-[#00ff41] absolute right-[-2px]" />
               <div className="absolute top-10 font-bold text-[8px] whitespace-nowrap">TGT_RECOGNITION: 94%</div>
            </motion.div>
         </div>

         {/* Bottom Control Bar */}
         <div className="border-t border-[#00ff41]/20 pt-4 flex justify-between items-end">
            <div className="grid grid-cols-4 gap-4 w-64">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="space-y-1">
                    <div className="h-1 bg-[#00ff41]/10 w-full overflow-hidden">
                       <motion.div 
                          animate={{ scaleX: [0, Math.random(), 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-[#00ff41] origin-left" 
                       />
                    </div>
                    <div className="text-[8px] opacity-40">CH_{i+1}</div>
                 </div>
               ))}
            </div>
            
            <div className="flex gap-4">
               <div className="border border-[#00ff41]/40 px-3 py-1 text-[10px] bg-[#00ff41]/5">ENCRYPTION: AES-256</div>
               <div className="border border-[#00ff41]/40 px-3 py-1 text-[10px] bg-red-900/10 text-red-500 animate-pulse">ALARM_OVERRIDE</div>
            </div>
         </div>
      </div>

      {/* Screen Corruption Effects */}
      <motion.div 
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
        className="fixed inset-0 z-50 bg-white pointer-events-none"
      />

      <ScanlineOverlay opacity={0.15} color="#ccff00" />
      
      {/* Heavy Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)] z-40" />
    </div>
  );
};

export default SatelliteFeed;
