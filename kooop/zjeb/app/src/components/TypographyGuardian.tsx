'use client';

import React, { useEffect, useRef } from 'react';

/**
 * TypographyGuardian
 * 
 * Automatycznie poprawia polską typografię (zasada sierotek).
 * Przenosi spójniki jednoznakowe (a, i, o, u, w, z) do nowej linii
 * poprzez zamianę spacji po nich na twardą spację (&nbsp;).
 */
export const TypographyGuardian: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fixTypography = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text) {
        // Regex: szuka spójników jednoznakowych (a, i, o, u, w, z)
        // Zamienia zwykłą spację PO spójniku na twardą (\u00A0),
        // jeśli spójnik jest poprzedzony spacją, nawiasem lub jest na początku linii.
        const fixedText = text.replace(/(^|[\s\(\[])([aiouwz])[\s]/gi, '$1$2\u00A0');
        if (fixedText !== text) {
          node.textContent = fixedText;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Nie poprawiamy wewnątrz tagów, które nie powinny być modyfikowane
      const tagName = (node as Element).tagName.toLowerCase();
      if (['script', 'style', 'code', 'pre', 'textarea'].includes(tagName)) {
        return;
      }
      node.childNodes.forEach(fixTypography);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      fixTypography(containerRef.current);

      // Obserwuj zmiany w DOM (np. po renderowaniu Markdowna)
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach(fixTypography);
        });
      });

      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [children]);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
};
