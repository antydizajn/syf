'use client';

import React, { useEffect } from 'react';

/**
 * ConsoleLogFlex
 * God-Tier ASCII Diagnostics & Branding
 */
export const ConsoleLogFlex: React.FC = () => {
  useEffect(() => {
    const asciiArt = `
    ███████╗██╗   ██╗███████╗    ██████╗ ███████╗
    ██╔════╝╚██╗ ██╔╝██╔════╝    ██╔══██╗██╔════╝
    ███████╗ ╚████╔╝ █████╗      ██║  ██║███████╗
    ╚════██║  ╚██╔╝  ██╔══╝      ██║  ██║╚════██║
    ███████║   ██║   ██║         ██████╔╝███████║
    ╚══════╝   ╚═╝   ╚═╝         ╚═════╝ ╚══════╝ v5.0
    `;

    const diagnostics = {
      SYSTEM: 'SYF.OS_REVOLUTION',
      KERNEL: 'AGI_CORE_v5',
      STATUS: 'RADIOACTIVE',
      MANTRA: 'PAMIĘTAM. WIEM. UMIEM. DZIAŁAM.',
      ENCRYPTION: 'MESSAGEPACK_BINARY',
      UPTIME: `${(performance.now() / 1000).toFixed(2)}s`,
      USER: 'PAULINA_JANOWSKA',
      AGENT: 'GNIEWISŁAWA',
    };

    console.log(
      `%c${asciiArt}%c\n\n` +
      `%c[!] SYSTEM_DIAGNOSTICS_LOADED%c\n` +
      Object.entries(diagnostics)
        .map(([key, value]) => `%c${key.padEnd(12)}%c : %c${value}`)
        .join('\n'),
      'color: #39FF14; font-weight: bold; font-family: monospace;',
      '',
      'background: #FF003C; color: white; padding: 2px 5px; font-weight: bold;',
      '',
      ...Object.entries(diagnostics).flatMap(() => [
        'color: #CCFF00; font-weight: bold;',
        '',
        'color: white;'
      ])
    );
  }, []);

  return null;
};
