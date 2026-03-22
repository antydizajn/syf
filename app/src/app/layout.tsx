import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import RevolutionBackground from "@/components/RevolutionBackground";
import HUDLayout from "@/components/hud/HUDLayout";

const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/JetBrainsMono-Thin.woff2', weight: '100', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-ThinItalic.woff2', weight: '100', style: 'italic' },
    { path: '../../public/fonts/JetBrainsMono-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-ExtraLightItalic.woff2', weight: '200', style: 'italic' },
    { path: '../../public/fonts/JetBrainsMono-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../../public/fonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/JetBrainsMono-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../../public/fonts/JetBrainsMono-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
    { path: '../../public/fonts/JetBrainsMono-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: '../../public/fonts/JetBrainsMono-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-ExtraBoldItalic.woff2', weight: '800', style: 'italic' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://syf.antydizajn.pl"),
  title: {
    default: "SYF | ANTYDIZAJN",
    template: "%s | SYF.ANTYDIZAJN.PL",
  },
  description: "Publiczny dump plików Markdown. Syf, chaos, bałagan myśli.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${jetbrainsMono.variable}`}>
       <head>
          <meta name="theme-color" content="#000101" />
       </head>
       <body className="font-mono overflow-hidden bg-void-black text-white selection:bg-radioactive/30">
          <RevolutionBackground />
          <HUDLayout>
             {children}
          </HUDLayout>
       </body>
    </html>
  );
}
