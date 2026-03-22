/**
 * Polish Typography Guardian (Sierotki)
 * Replaces spaces after single-letter connectors with non-breaking spaces.
 */
export function orphansGuard(text: string | null | undefined): string {
  if (!text) return "";
  
  // Rules for Polish connectors: a, i, o, u, w, z (case insensitive)
  // and some common multi-letter ones if needed, but pure Sierotki is single-letter.
  const connectors = ["a", "i", "o", "u", "w", "z", "ale", "do", "po", "są", "A", "I", "O", "U", "W", "Z", "ALE", "DO", "PO", "SĄ"];
  
  let result = text;
  
  connectors.forEach(c => {
    // Match connector at the beginning of string or after space/punctuation, 
    // and followed by exactly one space.
    const regex = new RegExp(`(^|[\\s\\(\\)\\[\\]\\{\\}"'])(${c})\\s+`, "g");
    result = result.replace(regex, `$1$2\u00A0`);
  });
  
  return result;
}
