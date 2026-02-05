"use client";

import Link from "next/link";
import Image from "next/image"; // <--- Import Image
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`pointer-events-auto flex items-center justify-between gap-6 rounded-full border px-5 py-3 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out
          ${
            scrolled
              ? "w-auto min-w-[500px] border-white/10 bg-black/80 shadow-emerald-500/10"
              : "w-full max-w-7xl border-transparent bg-transparent shadow-none"
          }
        `}
      >
        {/* LOGO SECTION */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <div className="relative h-8 w-8 transition-transform duration-300 group-hover:scale-110">
            {/* Using your icon.png here */}
            <Image
              src="/icon.png"
              alt="siddcn logo"
              width={32}
              height={32}
              className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300 hidden sm:block">
            siddcn
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <div
                key={link.href}
                className="relative px-4 py-1.5 text-sm font-medium transition-colors"
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>

                {/* Hover Effect (Gray Pill) */}
                {hoveredPath === link.href && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/10"
                    layoutId="navbar-hover"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Active State (Emerald Glow) */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/5 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] border border-white/5"
                    layoutId="navbar-active"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    <div className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* GITHUB BUTTON */}
        <a
          href="https://github.com/sidgaikwad/siddcn"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-white/5 px-6 font-medium text-white transition-all duration-300 hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] shrink-0"
        >
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 transition-transform group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="relative">GitHub</span>
          </span>
        </a>
      </motion.div>
    </motion.header>
  );
}
