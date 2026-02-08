import Link from "next/link";
import { ComponentGrid } from "@/components/ComponentGrid";
import { TerminalDemo } from "@/components/TerminalDemo";
import { SshTerminal } from "@/components/SshTerminal";
import { Features } from "@/components/Features";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FadeIn } from "@/components/FadeIn";
import { ShimmerButton } from "@/components/ShimmerButton";

// Define the Docs URL with a fallback
const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white dark:bg-[#030303] overflow-hidden selection:bg-emerald-500/30 transition-colors duration-300">
      {/* --- Global Effects --- */}
      {/* Only show animated background in dark mode if it's too heavy for light mode */}
      <div className="hidden dark:block">
        <AnimatedBackground />
      </div>

      {/* Scanline Overlay (Dark Mode Only) */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[length:100%_2px,3px_100%] mix-blend-overlay opacity-0 dark:opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" />

      {/* Retro Grid Floor Effect (Adaptive) */}
      <div className="absolute inset-0 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />

      {/* --- Hero Section --- */}
      <section className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8 z-10">
        {/* Main Glow Spotlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 rounded-[100%] blur-[120px] opacity-20 dark:opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-[100%] blur-[100px] mix-blend-screen" />

        <div className="mx-auto max-w-5xl text-center relative">
          <FadeIn delay={0} direction="up">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-300 backdrop-blur-md shadow-[0_0_20px_-10px_rgba(16,185,129,0.5)] transition-transform hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </span>
              v1.0 Now available on npm
            </div>
          </FadeIn>

          <FadeIn delay={100} direction="up">
            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl text-balance drop-shadow-2xl">
              Build terminal UIs
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-500 animate-gradient-x">
                with siddcn
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200} direction="up">
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-slate-400 text-pretty">
              Beautiful, extensible TUI components built with{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">React Ink</span>.
              Browse and preview components directly in your terminal via SSH or
              CLI.
            </p>
          </FadeIn>

          {/* Quick Start Code Block */}
          <FadeIn delay={300} direction="up">
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-600 to-blue-600 opacity-40 blur transition duration-200 group-hover:opacity-75" />
                <div className="relative flex items-center gap-4 rounded-lg bg-white dark:bg-black/90 px-8 py-4 ring-1 ring-zinc-200 dark:ring-white/10 backdrop-blur shadow-xl dark:shadow-none">
                  <span className="text-emerald-500 font-bold select-none">
                    $
                  </span>
                  <code className="font-mono text-lg text-zinc-800 dark:text-white">
                    npm install -g siddcn
                  </code>
                  <button
                    className="ml-4 text-zinc-400 dark:text-white/40 transition-colors hover:text-zinc-900 dark:hover:text-white"
                    aria-label="Copy command"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400} direction="up">
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ShimmerButton
                href="https://www.npmjs.com/package/siddcn"
                variant="primary"
              >
                Get Started
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </ShimmerButton>

              <ShimmerButton href="/components" variant="secondary">
                Browse Components
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Terminal Demo Section (Main) --- */}
      <section className="relative py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

          <FadeIn direction="up">
            <div className="mb-12 text-center relative z-10">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                See it in action
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-slate-400">
                Experience the beautiful TUI interface
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 space-y-4">
              <FadeIn delay={400} direction="left">
                
                {/* Info Card 1 */}
                <div className="p-5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-md hover:border-emerald-500/30 transition-colors group shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Zero Runtime</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-slate-400">
                    Runs directly in Node.js. No browser required. Light speed startup.
                  </p>
                </div>

                {/* Info Card 2 */}
                <div className="p-5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-md hover:border-blue-500/30 transition-colors group shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">TypeScript First</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-slate-400">
                    Built with React Ink. Full type safety for all components and props.
                  </p>
                </div>

                {/* Info Card 3 */}
                <div className="p-5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-md hover:border-purple-500/30 transition-colors group shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Themeable</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-slate-400">
                    Customize colors, borders, and spacing with standard Tailwind classes.
                  </p>
                </div>

                {/* Info Card 4 */}
                <div className="p-5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-md hover:border-amber-500/30 transition-colors group shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Flexbox Layouts</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-slate-400">
                    Powered by Yoga. Build complex, responsive terminal grids with ease.
                  </p>
                </div>
              </FadeIn>
            </div>
            
            {/* Right: The Terminal (Kept dark intentionally for contrast, or you can make it white too) */}
            <div className="lg:col-span-8">
              <FadeIn delay={200} direction="right">
                <div className="relative rounded-xl border border-zinc-200 dark:border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl overflow-hidden ring-1 ring-white/5 h-[500px]">
                  <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                  <TerminalDemo />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-24 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn direction="up">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">
                Why <span className="text-emerald-500 dark:text-emerald-400">siddcn</span>?
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-slate-400">
                Built for developers who live in the terminal
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200} direction="up">
            <Features />
          </FadeIn>
        </div>
      </section>

      {/* --- Component Library Preview --- */}
      <section className="border-y border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/10 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <FadeIn direction="up">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">
                Component Library
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-slate-400">
                17 categories,{" "}
                <span className="text-zinc-900 dark:text-white font-semibold">50+ components</span>
                , infinitely extensible
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200} direction="up">
            <ComponentGrid />
          </FadeIn>

          <FadeIn delay={400} direction="up">
            <div className="mt-16 text-center">
              <ShimmerButton href="/components" variant="secondary">
                View All Components
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- SSH Section --- */}
      <section className="px-4 py-32 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background glow specific to SSH */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <FadeIn direction="up">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">
                Connect anywhere
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-slate-400">
                Browse components remotely via SSH. No installation required.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: The SSH Terminal */}
            <div className="lg:col-span-8">
              <FadeIn delay={200} direction="right">
                <SshTerminal />
              </FadeIn>
            </div>

            {/* Right Column: SSH Features */}
            <div className="lg:col-span-4 space-y-5">
              <FadeIn delay={400} direction="left">
                {/* Feature 1 */}
                <div className="p-5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-md hover:border-pink-500/30 transition-colors group shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-pink-500/10 text-pink-600 dark:text-pink-400 group-hover:text-pink-500 dark:group-hover:text-pink-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Any Terminal</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-slate-400">
                    Accessible from any device with an SSH client. No browser needed.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-md hover:border-purple-500/30 transition-colors group shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Secure Tunnel</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-slate-400">
                    End-to-end encrypted connection using standard SSHv2 protocols.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-5 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-md hover:border-indigo-500/30 transition-colors group shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Zero Install</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-slate-400">
                    Just one command to start. No npm dependencies required on the client.
                  </p>
                </div>
              </FadeIn>

              {/* Action Buttons inside the column */}
              <FadeIn delay={600} direction="up">
                <div className="flex gap-3 pt-2">
                  <ShimmerButton
                    href={`${DOCS_URL}/docs/ssh-setup`}
                    variant="secondary"
                  >
                    Setup Guide
                  </ShimmerButton>
                  <ShimmerButton
                    href={`${DOCS_URL}/docs/quickstart`}
                    variant="primary"
                  >
                    Quick Start
                  </ShimmerButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}