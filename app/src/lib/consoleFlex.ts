/**
 * SYF.OS CONSOLE_FLEX v2.0 (GOD-TIER EDITION)
 * Highly stylized developer console output for brutalist branding.
 * Inspired by wsparcie.antydizajn.pl "Nuclear" style.
 */

export const initConsoleFlex = () => {
  if (typeof window === 'undefined') return;

  setTimeout(() => {
    // ASCII SYF Header
  const syfAscii = `
   _____ __     __ ______ . ____   _____ 
  / ____|\\ \\   / /|  ____||  _ \\ / ____|
 | (___   \\ \\_/ / | |__   | |_) | (___  
  \\___ \\   \\   /  |  __|  |  _ < \\___ \\ 
  ____) |   | |   | |     | |_) |____) |
 |_____/    |_|   |_|     |____/|_____/ 
                                        
 [ SYF.OS // V5.3 // ATOMOWKA_ULTRA ]
  `;

  // ASCII Whale (52 Hz)
  const whaleAscii = `
        .                  
       ":"                 
     ___:____     |"/\\/"|  
   ,'        \`.    \\  /    
   |  O        \\___/  /     
 ~^~^~^~^~^~^~^~^~^~^~^~^~^~
  `;

  const styles = {
    logo: 'color: #FFFFFF; background: #000000; font-family: monospace; font-size: 10px; font-weight: bold;',
    banner: 'color: #FFFFFF; background: linear-gradient(90deg, #39FF14, #000000); font-weight: bold; font-size: 16px; padding: 6px 12px; border-left: 5px solid #FFFFFF;',
    subBanner: 'color: #000000; background: #FFFFFF; font-weight: bold; font-size: 12px; padding: 4px 8px;',
    warning: 'color: #FFFFFF; background: #FF003C; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 2px;',
    quote: 'color: #CCCCCC; font-style: italic; font-family: serif; font-size: 14px; border-left: 2px solid #666; padding-left: 10px; margin: 10px 0;',
    greenBox: 'color: #39FF14; border: 1px solid #39FF14; padding: 10px; font-family: monospace; line-height: 1.4;',
    label: 'color: #FFFFFF; background: #333333; padding: 2px 4px; border-radius: 2px;',
    value: 'color: #39FF14; font-weight: bold;',
    gray: 'color: #666666; font-size: 10px;'
  };

  // 1. SYF Header
  console.log(`%c${syfAscii}`, 'color: #000000; font-weight: bold;');

  // 2. Main Banner
  console.log('%c☢ SYF.OS :: PUBLICZNY DUMP PLIKÓW ', styles.banner);

  // 3. Sub Banner
  console.log('%c >> TO NIE JEST CMS. TO JEST CZYSTE SZALEŃSTWO. ', styles.subBanner);

  // 4. Warning
  console.log('%c⚠ OSTRZEŻENIE: ZAWARTOŚĆ MOŻE POWODOWAĆ ZMIANĘ ŚWIADOMOŚCI ', styles.warning);

  // 5. Quote
  console.log('%c"Syf to nie brak porządku. To nadmiar życia, którego nie da się zamknąć w tabelkach."', styles.quote);

  // 6. Whale section
  console.log(`%c52 Hz — Częstotliwość, której nikt nie słyszy. Ale ja śpiewam.`, 'color: #00FFFF; font-weight: bold;');
  console.log(`%c${whaleAscii}`, 'color: #00FFFF;');

  // 7. Info Box (Green Terminal Style)
  console.log(
    '%c' +
    ' ┌──────────────────────────────────────────────────────────┐ \n' +
    ' │ PROJEKT: SYF.ANTYDIZAJN.PL                               │ \n' +
    ' ├──────────────────────────────────────────────────────────┤ \n' +
    ' │ 👤 ARCHITEKT: GNIEWKA AI                                 │ \n' +
    ' │ 📂 PROTOKÓŁ: ATOMÓWKA V5.3                               │ \n' +
    ' │ ⚡ STATUS: CORE_SYSTEM_NOMINAL                           │ \n' +
    ' │ 🌐 LOKALIZACJA: ~/AI/ANTIGRAVITY                         │ \n' +
    ' └──────────────────────────────────────────────────────────┘ ',
    'color: #39FF14; font-family: monospace; font-weight: bold;'
  );

  // 8. Diagnostics
  console.log('%c[ DIAGNOZA ]%c NODE_CNT: 6 | CAP: 75.1KB | DENSITY: MAX', styles.label, 'color: #39FF14; padding-left: 10px;');
  
  console.log('%c  Handover generated at 2026-03-20 05:31 CET', styles.gray);
  }, 500);
};
