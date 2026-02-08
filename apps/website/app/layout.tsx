import React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

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
    // suppressHydrationWarning is required for next-themes
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <div className="relative min-h-screen">
             {/* Gradient Background Pattern */}
             <div className="absolute inset-0 grid-pattern pointer-events-none -z-10" />
             {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}