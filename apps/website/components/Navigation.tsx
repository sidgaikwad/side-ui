"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL;

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/components", label: "Components" },
    { href: `${DOCS_URL}/docs`, label: "Docs", external: true },
    { href: "/themes", label: "Themes" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-b border-white/5 bg-black/80 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white overflow-hidden transition-transform group-hover:scale-110">
            <span className="text-lg font-bold text-black relative z-10">
              S
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute text-lg font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
              S
            </span>
          </div>
          <span className="font-semibold text-white group-hover:text-blue-100 transition-colors">
            siddcn
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) =>
            "external" in link && link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-lg px-4 py-2 text-sm text-white/60 transition-all hover:text-white group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-4 py-2 text-sm transition-all group ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {(pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))) && (
                  <div className="absolute inset-0 rounded-lg bg-white/10" />
                )}
                <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ),
          )}

          <div className="ml-4 h-5 w-px bg-white/10" />

          <a
            href="https://github.com/sidgaikwad/siddcn"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
