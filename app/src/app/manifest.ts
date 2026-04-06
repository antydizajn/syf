import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SYF.ANTYDIZAJN.PL',
    short_name: 'SYF',
    description: 'Publiczny dump plików Markdown. Syf, chaos, bałagan myśli.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ff00ff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
