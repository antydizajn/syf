/**
 * SYF_CORE Typography Guardian
 * Unifies Polish orphans (Sierotki) and ASCII normalization for SYF branding.
 */
export function orphansGuard(text: string | null | undefined): string {
  if (!text) return "";

  // 1. Normalize Dashes (—, – -> -) and Quotes (“”, „” -> ")
  // This is critical for hydration sync and SYF aesthetic.
  let result = text
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u201C\u201D\u201E]/g, '"');

  // 2. Polish Orphans (Sierotki)
  const connectors = [
    'a', 'i', 'o', 'u', 'w', 'z', 
    'że', 'bo', 'czy', 'lecz', 'nad', 'pod', 'dla', 'przy', 
    'ale', 'do', 'po', 'są', 'za'
  ];

  // Robust recursive replacement for consecutive connectors
  // We use a regex that matches a connector followed by space(s) and replaces with NBSP.
  // Then we repeat to catch the next one if it was part of a sequence.
  const pattern = `(^|[\\s\\(\\)\\[\\]\\{\\}"'])(${connectors.join('|')})\\s+`;
  const regex = new RegExp(pattern, 'gi');

  let prevResult;
  do {
    prevResult = result;
    result = result.replace(regex, (match, p1, p2) => `${p1}${p2}\u00A0`);
  } while (result !== prevResult);

  return result;
}
