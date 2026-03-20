/**
 * SYF.OS CONSOLE_FLEX
 * Highly stylized developer console output for brutalist branding.
 */

export const initConsoleFlex = () => {
  if (typeof window === 'undefined') return;

  const ascii = `
  _____ __     __ ______   ____   _____ 
 / ____|\\ \\   / /|  ____| / __ \\ / ____|
| (___   \\ \\_/ / | |__   | |  | | (___  
 \\___ \\   \\   /  |  __|  | |  | |\\___ \\ 
 ____) |   | |   | |     | |__| |____) |
|_____/    |_|   |_|      \\____/|_____/ 
                                        
 [ SYF.OS // V2.0 // REDESIGN ]
  `;

  const styles = {
    header: 'color: #FFFFFF; background: #000000; font-weight: bold; font-size: 14px; padding: 4px 8px; border: 1px solid #FFFFFF;',
    log: 'color: #000000; background: #FFFFFF; font-family: monospace; font-size: 12px; padding: 2px 4px;',
    status: 'color: #00FF00; font-weight: bold; font-family: monospace;',
    warning: 'color: #FF0000; font-weight: bold; font-family: monospace;',
    gray: 'color: #888888; font-family: monospace; font-size: 10px;'
  };

  console.log(`%c${ascii}`, 'color: #000000; font-weight: bold; font-family: monospace;');
  
  console.log('%c[ SYSTEM_LOAD ]%c SUCCESS: SYF.OS V2.0 INITIALIZED', styles.header, styles.status);
  
  console.log('%c[ DIAGNOSTICS ]%c', 'color: #FFFFFF; background: #333333; padding: 2px 4px;', '');
  console.log('  > NODE_COUNT: 6');
  console.log('  > TOTAL_CAPACITY: 75.1 KB');
  console.log('  > PROTOCOL: ATOMOWKA_ULTRA');
  
  console.log('%c[ LOGS ]', styles.header);
  console.log('%c  13:45:00 %c SECTOR_0 BIT_FLIP [53.54%] ... OK', styles.gray, '');
  console.log('%c  13:45:01 %c INTEGRITY_CHECK ... PASSED', styles.gray, '');
  console.log('%c  13:45:02 %c NO ONE SURVIVED THIS PAGE WITHOUT A SCAR.', styles.warning, '');
  
  console.log('%c[ READY ]%c SYF.ANTYDIZAJN.PL IS LIVE.', styles.header, styles.log);
};
