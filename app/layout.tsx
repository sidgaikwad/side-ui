import React from "react"
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Siddcn - Terminal UI Component Library",
  description:
    "Beautiful, extensible TUI components built with React Ink. Browse and preview components directly in your terminal via SSH or CLI.",
  keywords: ["tui", "terminal", "cli", "react", "ink", "components", "ssh"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased gradient-bg`}
      >
        <Navigation />
        <div className="grid-pattern min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
