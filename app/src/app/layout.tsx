import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ScanlineOverlay } from "@/components/ScanlineOverlay";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

// Enhanced Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://syf.antydizajn.pl"),
  title: {
    default: "SYF | ANTYDIZAJN",
    template: "%s | SYF.ANTYDIZAJN.PL",
  },
  description: "Publiczny dump plików Markdown. Syf, chaos, bałagan myśli. Zero bazy danych, zero logowania, zero bullshitu.",
  keywords: ["markdown", "files", "dump", "antydizajn", "syf", "chaos", "public"],
  authors: [{ name: "ANTYDIZAJN" }],
  creator: "ANTYDIZAJN",
  publisher: "ANTYDIZAJN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SYF | ANTYDIZAJN",
    description: "Publiczny dump plików Markdown. Syf, chaos, bałagan myśli.",
    url: "https://syf.antydizajn.pl",
    siteName: "SYF.ANTYDIZAJN.PL",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SYF.ANTYDIZAJN.PL - Publiczny dump plików Markdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SYF | ANTYDIZAJN",
    description: "Publiczny dump plików Markdown. Syf, chaos, bałagan myśli.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${jetbrainsMono.variable} ${orbitron.variable}`}>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#ff00ff" />
      </head>
      <body>
        {/* SKIP LINK - Accessibility */}
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>
        
        {/* SCANLINES OVERLAY */}
        <ScanlineOverlay />
        
        {/* NOISE OVERLAY */}
        <div className="noise" aria-hidden="true" />
        
        {/* GLOW ORBS */}
        <div className="glow-orb glow-orb-1" aria-hidden="true" />
        <div className="glow-orb glow-orb-2" aria-hidden="true" />
        <div className="glow-orb glow-orb-3" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  );
}
