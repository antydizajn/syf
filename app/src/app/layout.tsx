import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import RevolutionBackground from "@/components/RevolutionBackground";
import HUDLayout from "@/components/hud/HUDLayout";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["900"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://syf.antydizajn.pl"),
  title: {
    default: "SYF | ANTYDIZAJN",
    template: "%s | SYF.ANTYDIZAJN.PL",
  },
  description: "Publiczny dump plików Markdown. Syf, chaos, bałagan myśli.",
};

import { getAllItems, buildFileTree } from "@/lib/files";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allItems = await getAllItems();
  const fileTree = buildFileTree(allItems);

  return (
    <html lang="pl" className={`${jetbrainsMono.variable} ${orbitron.variable}`}>
       <head>
          <meta name="theme-color" content="#000101" />
       </head>
       <body className="font-mono overflow-hidden bg-void-black text-white selection:bg-radioactive/30">
          <RevolutionBackground />
          <HUDLayout items={fileTree}>
             {children}
          </HUDLayout>
       </body>
    </html>
  );
}
