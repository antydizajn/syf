/**
 * SYF.OS TYPOGRAPHY_GUARDIAN
 * Enforces strict Polish typography rules (Sierotki) and ASCII connectors.
 * Optimized for performance: scoped observation, debouncing, and de-duplication.
 */

import { orphansGuard } from './typography';

const SANITIZED_ATTR = 'data-tg-sanitized';

/**
 * Sanitizes a text string according to SYF branding rules.
 */
const sanitizeText = (text: string): string => {
  return orphansGuard(text);
};

/**
 * Recursively walks the DOM and sanitizes text nodes.
 * Skips already sanitized elements to prevent layout thrashing.
 */
const walkAndSanitize = (node: Node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (parent && parent.getAttribute(SANITIZED_ATTR)) return;

    const original = node.nodeValue || '';
    const sanitized = sanitizeText(original);
    
    if (original !== sanitized) {
      node.nodeValue = sanitized;
      if (parent) parent.setAttribute(SANITIZED_ATTR, '1');
    }
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    !['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE'].includes((node as Element).tagName) &&
    !(node as HTMLElement).dataset?.noTypo &&
    !(node as HTMLElement).getAttribute(SANITIZED_ATTR)
  ) {
    node.childNodes.forEach(walkAndSanitize);
  }
};

/**
 * Initializes the Typography Guardian.
 */
export const initTypographyGuardian = () => {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

  const targetNode = document.querySelector('main') || document.body;

  // Initial pass: Batch processing to avoid blocking hydration
  const processAll = () => {
    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => walkAndSanitize(targetNode), { timeout: 2000 });
    } else {
        setTimeout(() => walkAndSanitize(targetNode), 500);
    }
  };

  processAll();

  // Mutation logic with micro-batching
  let mutationQueue: Node[] = [];
  let frameId: number | null = null;

  const flushQueue = () => {
    const batch = mutationQueue.splice(0, 50); // Process in chunks
    batch.forEach(node => walkAndSanitize(node));
    
    if (mutationQueue.length > 0) {
      frameId = requestAnimationFrame(flushQueue);
    } else {
      frameId = null;
    }
  };

  const observer = new MutationObserver((mutations) => {
    let needsFlush = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        mutationQueue.push(node);
        needsFlush = true;
      });
      
      if (mutation.type === 'characterData') {
        mutationQueue.push(mutation.target);
        needsFlush = true;
      }
    });

    if (needsFlush && !frameId) {
      frameId = requestAnimationFrame(flushQueue);
    }
  });

  const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true,
  };

  // Start observing
  observer.observe(targetNode, observerConfig);

  console.log('%c[ TYPO_GUARDIAN ]%c OPTIMIZED: SCOPED_BATCH_MODE ACTIVE', 
    'color: #FFFFFF; background: #000000; font-weight: bold; padding: 2px 4px;', 
    'color: #00FF00; font-weight: bold;'
  );
};
