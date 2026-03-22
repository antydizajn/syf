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
  // Comprehensive list of connectors that shouldn't hang at the end of a line.
  const connectors = [
    'a', 'i', 'o', 'u', 'w', 'z', 
    'że', 'bo', 'czy', 'lecz', 'nad', 'pod', 'dla', 'przy', 
    'ale', 'do', 'po', 'są', 'za'
  ];

  // Create a pattern for all connectors (case-insensitive)
  // We match them at start of string or after space/punctuation, followed by exactly one space.
  const pattern = `(^|[\\s\\(\\)\\[\\]\\{\\}"'])(${connectors.join('|')})\\s+`;
  const regex = new RegExp(pattern, 'gi');

  // Replace trailing space with non-breaking space (NBSP)
  result = result.replace(regex, (match, p1, p2) => {
    return `${p1}${p2}\u00A0`;
  });

  return result;
}
