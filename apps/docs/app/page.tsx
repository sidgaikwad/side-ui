import Link from 'next/link';
import { Terminal, Zap, Palette, Keyboard, BookOpen, Code } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col px-4 py-16">
      <div className="mx-auto max-w-5xl w-full">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-accent px-4 py-2 text-sm text-fd-muted-foreground mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Documentation
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight mb-6 text-fd-foreground">
            Siddcn
            <span className="gradient-text block mt-2">Documentation</span>
          </h1>
          
          <p className="text-xl text-fd-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Terminal UI Component Library built with React Ink. Browse and preview components directly in your terminal via SSH or CLI.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90 hover:scale-105"
            >
              Get Started
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://github.com/sidgaikwad/siddcn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-fd-border px-6 py-3 text-sm font-medium transition-all hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Quick Install */}
        <div className="mb-16">
          <div className="rounded-xl border border-fd-border bg-fd-secondary/50 p-6 text-center">
            <p className="text-sm text-fd-muted-foreground mb-3">Quick Install</p>
            <code className="font-mono text-lg text-fd-foreground">npm install -g siddcn</code>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {[
            {
              icon: Terminal,
              title: 'React Ink Based',
              description: 'Familiar React development experience for terminal UIs'
            },
            {
              icon: Zap,
              title: 'SSH Access',
              description: 'Browse components remotely from anywhere via SSH'
            },
            {
              icon: Palette,
              title: '6 Built-in Themes',
              description: 'Choose from beautiful themes or create custom ones'
            },
            {
              icon: Keyboard,
              title: 'Vim Navigation',
              description: 'Navigate with familiar vim keybindings (h/j/k/l)'
            },
            {
              icon: BookOpen,
              title: 'Comprehensive Docs',
              description: 'Detailed documentation for every component'
            },
            {
              icon: Code,
              title: 'Extensible',
              description: 'Add new components in minutes with registry pattern'
            }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="group rounded-xl border border-fd-border bg-fd-secondary/30 p-6 transition-all hover:border-fd-primary/30 hover:bg-fd-accent/50 hover:shadow-lg"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="mb-4 inline-flex rounded-lg bg-fd-accent p-2.5 text-fd-muted-foreground transition-colors group-hover:text-fd-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-fd-foreground mb-8">Quick Links</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { href: '/docs/installation', label: 'Installation' },
              { href: '/docs/quickstart', label: 'Quick Start' },
              { href: '/docs/components', label: 'Components' },
              { href: '/docs/themes', label: 'Themes' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium transition-all hover:bg-fd-accent hover:border-fd-primary/30 hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
