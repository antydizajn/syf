import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import HUDLayout from "@/components/hud/HUDLayout";

const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/JetBrainsMono-Regular.subset.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-Bold.subset.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
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
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SYF | ANTYDIZAJN",
    description: "Publiczny dump plikow Markdown. Syf, chaos, balagan mysli. [AGI-SECURED]",
    url: "https://syf.antydizajn.pl",
    siteName: "SYF",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SYF.ANTYDIZAJN.PL",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYF | ANTYDIZAJN",
    description: "Publiczny dump plikow Markdown. Syf, chaos, balagan mysli. [AGI-SECURED]",
    images: ["/og-image.png"],
    creator: "@Gniewislawa",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${jetbrainsMono.variable} bg-[#000101]`}>
       <head>
          <style dangerouslySetInnerHTML={{ __html: `
            html{background:#000101!important;color:#fff!important}
            body{background:#000101!important}
          `}} />
       </head>
       <body className="font-mono overflow-hidden bg-[#000101] text-white selection:bg-radioactive/30 antialiased">
          <HUDLayout>
             {children}
          </HUDLayout>
       </body>
    </html>
  );
}
