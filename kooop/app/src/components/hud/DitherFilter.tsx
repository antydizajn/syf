'use client';

import React from 'react';

export const DitherFilter: React.FC = () => {
  return (
    <svg className="hidden">
      <filter id="dither-filter">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 1" />
          <feFuncG type="discrete" tableValues="0 1" />
          <feFuncB type="discrete" tableValues="0 1" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
};
