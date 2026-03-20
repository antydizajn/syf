/**
 * SYF.OS TYPOGRAPHY_GUARDIAN
 * Enforces strict Polish typography rules (Sierotki) and ASCII connectors.
 */

const SIEROTKI_REGEX = /(?:^|[\s\u00A0])([aiouwzAIOUWZ])(?:\s+)/g;
const DASH_REGEX = /[\u2013\u2014]/g; // en dash and em dash
const QUOTE_REGEX = /[\u201C\u201D]/g; // smart quotes

/**
 * Sanitizes a text string according to SYF branding rules.
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(SIEROTKI_REGEX, (match, p1) => {
      // Replaces the space after a single-letter word with a non-breaking space
      const prefix = match.startsWith(' ') || match.startsWith('\u00A0') ? match[0] : '';
      return `${prefix}${p1}\u00A0`;
    })
    .replace(DASH_REGEX, '-')
    .replace(QUOTE_REGEX, '"');
};

/**
 * Recursively walks the DOM and sanitizes text nodes.
 */
const walkAndSanitize = (node: Node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const original = node.nodeValue || '';
    const sanitized = sanitizeText(original);
    if (original !== sanitized) {
      node.nodeValue = sanitized;
    }
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    !['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes((node as Element).tagName) &&
    !(node as HTMLElement).dataset?.noTypo
  ) {
    node.childNodes.forEach(walkAndSanitize);
  }
};

/**
 * Initializes the Typography Guardian.
 */
export const initTypographyGuardian = () => {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

  // Initial pass
  walkAndSanitize(document.body);

  // Observe changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        walkAndSanitize(node);
      });
      if (mutation.type === 'characterData') {
        const node = mutation.target;
        const original = node.nodeValue || '';
        const sanitized = sanitizeText(original);
        if (original !== sanitized) {
          // Disconnect to avoid infinite loops if we were observing characterData too closely,
          // but usually characterData mutation target is the text node itself.
          observer.disconnect();
          node.nodeValue = sanitized;
          observer.observe(document.body, observerConfig);
        }
      }
    });
  });

  const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true,
  };

  observer.observe(document.body, observerConfig);

  console.log('%c[ TYPO_GUARDIAN ]%c ACTIVE: SIEROTKI & ASCII_ONLY ENABLED', 
    'color: #FFFFFF; background: #000000; font-weight: bold; padding: 2px 4px;', 
    'color: #00FF00; font-weight: bold;'
  );
};
