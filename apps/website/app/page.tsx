import Link from "next/link";
import { ComponentGrid } from "@/components/ComponentGrid";
import { TerminalDemo } from "@/components/TerminalDemo";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-blue/20 via-terminal-bg to-terminal-cyan/10 opacity-50" />

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 terminal-glow">
            <span className="bg-gradient-to-r from-terminal-cyan via-terminal-blue to-terminal-green bg-clip-text text-transparent">
              Siddcn
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-terminal-text mb-4">
            Terminal UI Component Library
          </p>

          <p className="text-lg text-terminal-text/80 mb-12 max-w-3xl mx-auto">
            Beautiful, extensible TUI components built with React Ink. Browse
            and preview components directly in your terminal via SSH or CLI.
          </p>

          {/* Quick Start Commands */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="bg-terminal-bg/50 border border-terminal-cyan/30 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-terminal-cyan text-sm mb-2">
                Install globally
              </p>
              <code className="text-terminal-green font-mono">
                npm install -g siddcn
              </code>
            </div>

            <div className="bg-terminal-bg/50 border border-terminal-blue/30 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-terminal-blue text-sm mb-2">Connect via SSH</p>
              <code className="text-terminal-green font-mono">
                ssh demo@siddcn.dev -p 2222
              </code>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/components"
              className="px-8 py-4 bg-terminal-cyan hover:bg-terminal-cyan/80 text-terminal-bg font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              Browse Components
            </Link>

            <Link
              href="/docs"
              className="px-8 py-4 border-2 border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan/10 font-semibold rounded-lg transition-all"
            >
              Read Docs
            </Link>

            <a
              href="https://github.com/sidgaikwad/siddcn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-terminal-text/30 text-terminal-text hover:border-terminal-text/50 font-semibold rounded-lg transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-terminal-bg/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-terminal-cyan">
            See It In Action
          </h2>
          <p className="text-center text-terminal-text/80 mb-12">
            Experience the beautiful TUI interface right in your browser
          </p>
          <TerminalDemo />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-terminal-cyan">
            Why Siddcn?
          </h2>
          <p className="text-center text-terminal-text/80 mb-16">
            Built for developers who love the terminal
          </p>
          <Features />
        </div>
      </section>

      {/* Component Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-terminal-bg/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-terminal-cyan">
            Component Library
          </h2>
          <p className="text-center text-terminal-text/80 mb-12">
            5 categories • 13 components • Infinitely extensible
          </p>
          <ComponentGrid />

          <div className="text-center mt-12">
            <Link
              href="/components"
              className="inline-block px-8 py-4 bg-terminal-blue hover:bg-terminal-blue/80 text-white font-semibold rounded-lg transition-all"
            >
              View All Components
            </Link>
          </div>
        </div>
      </section>

      {/* SSH Connection Guide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-terminal-cyan">
            Connect Anywhere
          </h2>
          <p className="text-terminal-text/80 mb-8">
            Browse components remotely via SSH, just like terminal.shop
          </p>

          <div className="bg-terminal-bg/80 border border-terminal-cyan/30 rounded-lg p-8 text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
              <span className="ml-2 text-terminal-text/60 text-sm">
                terminal
              </span>
            </div>

            <pre className="font-mono text-terminal-green overflow-x-auto">
              <code>{`$ ssh localhost -p 2222
🚀 Siddcn SSH Server
━━━━━━━━━━━━━━━━━━━━━━━━━━
Connected successfully!

✨ Component Categories
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔘  Buttons
📊  Progress Bars
🏷️   Badges
📈  Charts
🌳  Trees

Navigate with ↑↓ • Select with Enter • Exit with q`}</code>
            </pre>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/docs/ssh-setup"
              className="px-6 py-3 border border-terminal-cyan/50 text-terminal-cyan hover:bg-terminal-cyan/10 rounded-lg transition-all"
            >
              Setup Guide
            </Link>
            <Link
              href="/docs/getting-started"
              className="px-6 py-3 bg-terminal-cyan/20 text-terminal-cyan hover:bg-terminal-cyan/30 rounded-lg transition-all"
            >
              Quick Start
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-terminal-text/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-terminal-cyan font-bold mb-4">Siddcn</h3>
              <p className="text-terminal-text/60 text-sm">
                Terminal UI components for modern developers
              </p>
            </div>

            <div>
              <h4 className="text-terminal-text font-semibold mb-4">
                Documentation
              </h4>
              <ul className="space-y-2 text-sm text-terminal-text/60">
                <li>
                  <Link
                    href="/docs/getting-started"
                    className="hover:text-terminal-cyan"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/installation"
                    className="hover:text-terminal-cyan"
                  >
                    Installation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/components"
                    className="hover:text-terminal-cyan"
                  >
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/docs/api" className="hover:text-terminal-cyan">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-terminal-text font-semibold mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-terminal-text/60">
                <li>
                  <Link href="/components" className="hover:text-terminal-cyan">
                    Component Library
                  </Link>
                </li>
                <li>
                  <Link href="/examples" className="hover:text-terminal-cyan">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/adding-components"
                    className="hover:text-terminal-cyan"
                  >
                    Add Components
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/contributing"
                    className="hover:text-terminal-cyan"
                  >
                    Contributing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-terminal-text font-semibold mb-4">
                Community
              </h4>
              <ul className="space-y-2 text-sm text-terminal-text/60">
                <li>
                  <a
                    href="https://github.com/sidgaikwad/siddcn"
                    className="hover:text-terminal-cyan"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/siddcn"
                    className="hover:text-terminal-cyan"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/siddcn"
                    className="hover:text-terminal-cyan"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://npmjs.com/package/siddcn"
                    className="hover:text-terminal-cyan"
                  >
                    npm
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-terminal-text/10 text-center text-sm text-terminal-text/60">
            <p>Built with ❤️ for the terminal • MIT License • © 2026 Siddcn</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
