"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/components", label: "Components" },
    { href: "/docs", label: "Documentation" },
    { href: "/themes", label: "Themes" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-terminal-cyan/20 bg-terminal-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-2xl font-bold text-terminal-cyan">
            siddcn
          </span>
          <span className="rounded bg-terminal-cyan/20 px-2 py-0.5 font-mono text-xs text-terminal-cyan">
            v1.0
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href))
                  ? "font-medium text-terminal-cyan"
                  : "text-terminal-text/70 hover:text-terminal-cyan"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://github.com/sidgaikwad/siddcn"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-terminal-text/30 px-4 py-2 text-sm text-terminal-text transition-all hover:border-terminal-cyan hover:text-terminal-cyan"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
