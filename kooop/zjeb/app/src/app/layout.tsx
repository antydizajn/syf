import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ScanlineOverlay } from "@/components/ScanlineOverlay";
import RevolutionBackground from "@/components/RevolutionBackground";
import { TypographyGuardian } from "@/components/TypographyGuardian";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "700", "900"],
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

import { AmbientProvider } from "@/components/AmbientContext";
import { RecallHUD } from "@/components/RecallHUD";
import { DiagnosticHUD } from "@/components/DiagnosticHUD";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${jetbrainsMono.variable} ${orbitron.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://stats.g.doubleclick.net" />
      </head>
      <body className="bg-transparent text-black min-h-screen flex flex-col relative text-rendering-optimizeLegibility antialiased">
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>
        <AmbientProvider>
          <DiagnosticHUD />
          {/* REVOLUTION BACKGROUND */}
          <RevolutionBackground />
          
          {/* 1-BIT SCANLINES */}
          <div className="fixed inset-0 pointer-events-none z-1001 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%]" />
          
          {/* NOISE OVERLAY */}
          <div className="noise opacity-[0.05]" aria-hidden="true" />
          
          <main id="main-content" className="flex-1 relative z-10 px-4 md:px-10 pb-20">
            <TypographyGuardian>
              {children}
            </TypographyGuardian>
            <Footer />
          </main>

          <ScanlineOverlay />
          <RecallHUD />
        </AmbientProvider>
      </body>
    </html>
  );
}
