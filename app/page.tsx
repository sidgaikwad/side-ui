import Link from "next/link";
import { ComponentGrid } from "@/components/component-grid";
import { TerminalDemo } from "@/components/terminal-demo";
import { Features } from "@/components/features";
import { AnimatedBackground } from "@/components/animated-background";
import { FadeIn } from "@/components/fade-in";
import { ShimmerButton } from "@/components/shimmer-button";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <FadeIn delay={0} direction="up">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 glass">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Now available on npm
            </div>
          </FadeIn>

          <FadeIn delay={100} direction="up">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl text-balance">
              Build terminal UIs
              <br />
              <span className="gradient-text-blue">with React</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200} direction="up">
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty">
              Beautiful, extensible TUI components built with React Ink. 
              Browse and preview components directly in your terminal via SSH or CLI.
            </p>
          </FadeIn>

          {/* Quick Start Commands */}
          <FadeIn delay={300} direction="up">
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="code-block flex items-center gap-3 px-6 py-3 gradient-border">
                <span className="text-white/40">$</span>
                <code className="font-mono text-white">npm install -g siddcn</code>
                <button 
                  className="ml-2 text-white/40 transition-colors hover:text-white hover:scale-110 transform duration-200"
                  aria-label="Copy command"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={400} direction="up">
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ShimmerButton href="/docs" variant="primary">
                Get Started
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </ShimmerButton>

              <ShimmerButton href="/components" variant="secondary">
                Browse Components
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="border-y border-white/5 px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-5xl">
          <FadeIn direction="up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                See it in action
              </h2>
              <p className="mt-4 text-lg text-white/60">
                Experience the beautiful TUI interface
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200} direction="up">
            <TerminalDemo />
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <FadeIn direction="up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Why siddcn?
              </h2>
              <p className="mt-4 text-lg text-white/60">
                Built for developers who love the terminal
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200} direction="up">
            <Features />
          </FadeIn>
        </div>
      </section>

      {/* Component Preview */}
      <section className="border-y border-white/5 px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <FadeIn direction="up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Component Library
              </h2>
              <p className="mt-4 text-lg text-white/60">
                5 categories, 13 components, infinitely extensible
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200} direction="up">
            <ComponentGrid />
          </FadeIn>

          <FadeIn delay={400} direction="up">
            <div className="mt-12 text-center">
              <ShimmerButton href="/components" variant="secondary">
                View All Components
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SSH Connection Guide */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Connect anywhere
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Browse components remotely via SSH
            </p>
          </FadeIn>

          <FadeIn delay={200} direction="up">
            <div className="code-block mt-8 overflow-hidden text-left gradient-border">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
                </div>
                <span className="ml-2 font-mono text-xs text-white/40">terminal</span>
              </div>

              <pre className="overflow-x-auto p-6 font-mono text-sm">
                <code className="text-white/80">{`$ ssh localhost -p 2222

Component Categories
━━━━━━━━━━━━━━━━━━━━━━━━━━
  Buttons
  Progress Bars
  Badges
  Charts
  Trees

Navigate with arrow keys
Select with Enter
Exit with q`}</code>
              </pre>
            </div>
          </FadeIn>

          <FadeIn delay={400} direction="up">
            <div className="mt-8 flex justify-center gap-4">
              <ShimmerButton href="/docs/ssh-setup" variant="secondary">
                Setup Guide
              </ShimmerButton>
              <ShimmerButton href="/docs/quickstart" variant="primary">
                Quick Start
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white">
                  <span className="text-sm font-bold text-black">S</span>
                </div>
                <span className="font-semibold text-white">siddcn</span>
              </div>
              <p className="mt-4 text-sm text-white/50">
                Terminal UI components for modern developers
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Documentation</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link href="/docs" className="hover:text-white transition-colors">Introduction</Link></li>
                <li><Link href="/docs/installation" className="hover:text-white transition-colors">Installation</Link></li>
                <li><Link href="/components" className="hover:text-white transition-colors">Components</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link href="/components" className="hover:text-white transition-colors">Component Library</Link></li>
                <li><Link href="/docs/adding-components" className="hover:text-white transition-colors">Add Components</Link></li>
                <li><Link href="/themes" className="hover:text-white transition-colors">Themes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Community</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="https://github.com/sidgaikwad/siddcn" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://npmjs.com/package/siddcn" className="hover:text-white transition-colors">npm</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-white/40">
            <p>Built with React Ink. MIT License.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
