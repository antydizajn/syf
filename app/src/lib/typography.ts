/**
 * SYF_CORE Typography Guardian
 * Unifies Polish orphans (Sierotki) and ASCII normalization for SYF branding.
 */

const orphansCache = new Map<string, string>();

export function orphansGuard(text: string | null | undefined): string {
  if (!text) return "";
  
  if (orphansCache.has(text)) return orphansCache.get(text)!;

  // 1. Normalize Dashes (—, – -> -) and Quotes (“”, „” -> ")
  // This is critical for hydration sync and SYF aesthetic.
  const result = text
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u201C\u201D\u201E]/g, '"');

  // 2. Polish Orphans (Sierotki)
  const connectors = [
    'a', 'i', 'o', 'u', 'w', 'z', 
    'że', 'bo', 'czy', 'lecz', 'nad', 'pod', 'dla', 'przy', 
    'ale', 'do', 'po', 'są', 'za', 'na', 'we', 'ze', 'od', 
    'ku', 'by', 'aż', 'niż', 'lub'
  ];

  // Two passes are sufficient to handle consecutive connectors (e.g., "a i o")
  // without risk of infinite loops and with predictable performance.
  const regex = new RegExp(`(^|[\\s\\(\\)\\[\\]\\{\\}"'])(${connectors.join('|')})[ ]+`, 'gi');
  
  const finalResult = result
    .replace(regex, (match, p1, p2) => `${p1}${p2}\u00A0`)
    .replace(regex, (match, p1, p2) => `${p1}${p2}\u00A0`);

  orphansCache.set(text, finalResult);
  return finalResult;
}
