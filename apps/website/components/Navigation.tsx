"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  
  // 2. Theme State
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Avoid hydration mismatch
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Fetch GitHub Stars
    fetch("https://api.github.com/repos/sidgaikwad/siddcn")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Failed to fetch stars", err));

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "border-white/10 bg-black/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* --- LEFT: LOGO --- */}
        <Link href="/" className="flex items-center gap-3 group z-50">
          <div className="relative h-7 w-7 overflow-hidden">
            <Image
              src="/icon.png"
              alt="siddcn logo"
              width={28}
              height={28}
              className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <span className="font-mono font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            siddcn
          </span>
        </Link>

        {/* --- RIGHT SIDE CONTAINER (Links + Socials) --- */}
        <div className="flex items-center gap-6">
          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Magnetic Hover Background */}
                  {hoveredPath === link.href && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-white/5"
                      layoutId="navbar-hover"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-emerald-500 shadow-[0_-1px_6px_rgba(16,185,129,0.5)]"
                      layoutId="navbar-active"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* SOCIALS & MOBILE TOGGLE */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="group p-2 text-zinc-400 hover:text-white transition-colors relative"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  // Sun Icon (Show when Dark)
                  <svg className="w-5 h-5 fill-current transition-transform group-hover:rotate-90" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                ) : (
                  // Moon Icon (Show when Light)
                  <svg className="w-5 h-5 fill-current transition-transform group-hover:-rotate-12" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )}

            {/* X (Twitter) */}
            <a
              href="https://x.com/_sidd24_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub with Star Count */}
            <a
              href="https://github.com/sidgaikwad/siddcn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>

              {/* Star Count Badge */}
              <div className="flex items-center gap-1 text-xs font-mono bg-white/5 px-2 py-1 rounded-md border border-white/10 group-hover:border-white/20 transition-colors">
                <span className="text-yellow-500">★</span>
                <span>{stars !== null ? stars : "..."}</span>
              </div>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex gap-4 px-4 py-2">
                <a href="https://x.com/_sidd24_" target="_blank" className="text-zinc-400 hover:text-white">X (Twitter)</a>
                <a href="https://github.com/sidgaikwad/siddcn" target="_blank" className="text-zinc-400 hover:text-white flex items-center gap-2">
                  GitHub
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/80">
                    ★ {stars !== null ? stars : "-"}
                  </span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}