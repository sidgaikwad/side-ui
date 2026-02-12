"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { Wordmark } from "./WordMark";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      footer.style.setProperty("--x", `${x}px`);
      footer.style.setProperty("--y", `${y}px`);
    };

    footer.addEventListener("mousemove", handleMouseMove);
    return () => footer.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-black pt-20 pb-10 overflow-hidden transition-colors duration-300"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-default">
              <div className="h-8 w-8 relative transition-transform group-hover:scale-110">
                <Image
                  src="/icon.png"
                  alt="siddcn logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-zinc-900 dark:text-white tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                siddcn
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-slate-500 max-w-xs leading-relaxed">
              The ultimate Terminal UI component library for modern developers.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-500 mt-4 bg-emerald-500/10 px-3 py-1.5 rounded-full w-fit border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              System Online
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Documentation",
              links: [
                { label: "Introduction", href: `${DOCS_URL}/docs` },
                { label: "Installation", href: `${DOCS_URL}/docs/installation` },
                { label: "Components", href: "/components" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Component Library", href: "/components" },
                { label: "Add Components", href: `${DOCS_URL}/docs/adding-components` },
                { label: "Themes", href: "/themes" },
              ],
            },
            {
              title: "Community",
              links: [
                { label: "GitHub", href: "https://github.com/sidgaikwad/siddcn" },
                { label: "NPM", href: "https://npmjs.com/package/siddcn" },
                { label: "Discord", href: "#" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-6 text-sm font-semibold text-zinc-900 dark:text-white tracking-wider uppercase opacity-80">
                {col.title}
              </h4>
              <ul className="space-y-4 text-sm text-zinc-500 dark:text-slate-400">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 -ml-3 transition-all duration-200 group-hover:opacity-100 group-hover:ml-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 dark:text-slate-600">
          <p>Built with React Ink. MIT License.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-mono text-xs z-20">
            <span>© {new Date().getFullYear()} siddcn</span>
            <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>

      {/* --- THE WORDMARK ANIMATION --- */}
      <div className="relative w-full opacity-30 dark:opacity-50 hover:opacity-100 transition-opacity duration-500">
        <Wordmark />
      </div>
    </footer>
  );
}