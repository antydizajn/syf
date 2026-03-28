import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import HUDLayout from "@/components/hud/HUDLayout";

const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'block', // Use 'block' for critical path to prevent FOUT/LCP shift
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#000101",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://syf.antydizajn.pl"),
  title: {
    default: "SYF | ANTYDIZAJN",
    template: "%s | SYF.ANTYDIZAJN.PL",
  },
  description: "Publiczny dump plikow Markdown. Syf, chaos, balagan mysli. [AGI-SECURED]",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${jetbrainsMono.variable} bg-[#000101]/80`}>
       <head>
          <link rel="canonical" href="https://syf.antydizajn.pl" />
          <link rel="preconnect" href="https://syf.antydizajn.pl" />
          <link rel="preconnect" href="https://gniewka.antydizajn.pl" />
          <link rel="preconnect" href="https://antydizajn.pl" />
          <style dangerouslySetInnerHTML={{ __html: `
            :root { --font-mono: 'JetBrains Mono', monospace; }
            html { background-color: rgba(0, 1, 1, 0.8) !important; color: white !important; }
            body { background-color: transparent !important; font-family: 'JetBrains Mono', monospace; }
            @media (prefers-color-scheme: dark) { html { background-color: rgba(0, 1, 1, 0.8) !important; } }
          `}} />
       </head>
       <body className="font-mono overflow-hidden bg-transparent text-white selection:bg-radioactive/30 antialiased">
          <HUDLayout>
             {children}
          </HUDLayout>
       </body>
    </html>
  );
}
