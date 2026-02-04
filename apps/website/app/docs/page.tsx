import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

export default function DocsPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-terminal-cyan">Introduction</h1>

      <p className="lead text-xl text-terminal-text/80">
        Siddcn is a terminal UI component library built with React Ink. It
        provides beautiful, accessible, and extensible components for building
        terminal-based applications.
      </p>

      <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-terminal-cyan/30 bg-terminal-bg/50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-terminal-cyan">
            React Ink Based
          </h3>
          <p className="text-sm text-terminal-text/70">
            Built on top of React Ink, providing a familiar React development
            experience for terminal UIs.
          </p>
        </div>

        <div className="rounded-lg border border-terminal-blue/30 bg-terminal-bg/50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-terminal-blue">
            SSH Access
          </h3>
          <p className="text-sm text-terminal-text/70">
            Browse and preview components remotely via SSH, just like
            terminal.shop.
          </p>
        </div>

        <div className="rounded-lg border border-terminal-green/30 bg-terminal-bg/50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-terminal-green">
            6 Built-in Themes
          </h3>
          <p className="text-sm text-terminal-text/70">
            Choose from 6 beautiful themes or create your own custom theme.
          </p>
        </div>

        <div className="rounded-lg border border-terminal-yellow/30 bg-terminal-bg/50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-terminal-yellow">
            Vim-style Navigation
          </h3>
          <p className="text-sm text-terminal-text/70">
            Navigate with familiar vim keybindings (h/j/k/l) across all
            components.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-terminal-text">Quick Start</h2>

      <p className="text-terminal-text/70">
        Get started with siddcn in just a few commands:
      </p>

      <CodeBlock
        code={`# Install globally
npm install -g siddcn

# Run the interactive CLI
siddcn

# Or connect via SSH (if server is running)
ssh localhost -p 2222`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Available Components
      </h2>

      <p className="text-terminal-text/70">
        Siddcn comes with a growing library of terminal UI components:
      </p>

      <ul className="space-y-2 text-terminal-text/70">
        <li>
          <strong className="text-terminal-cyan">Buttons</strong> - Interactive
          buttons with various styles
        </li>
        <li>
          <strong className="text-terminal-cyan">Progress Bars</strong> - Linear,
          circular, and step progress indicators
        </li>
        <li>
          <strong className="text-terminal-cyan">Badges</strong> - Status
          indicators and labels
        </li>
        <li>
          <strong className="text-terminal-cyan">Charts</strong> - Bar and line
          charts for data visualization
        </li>
        <li>
          <strong className="text-terminal-cyan">Trees</strong> - File trees and
          data hierarchies
        </li>
        <li>
          <strong className="text-terminal-cyan">Tabs</strong> - Tabbed
          navigation with multiple styles
        </li>
        <li>
          <strong className="text-terminal-cyan">Table</strong> - Scrollable data
          grids with selection
        </li>
        <li>
          <strong className="text-terminal-cyan">Multi-Select</strong> - Multiple
          item selection with limits
        </li>
      </ul>

      <div className="not-prose mt-8 flex gap-4">
        <Link
          href="/docs/installation"
          className="rounded-lg bg-terminal-cyan px-6 py-3 font-semibold text-terminal-bg transition-colors hover:bg-terminal-cyan/80"
        >
          Get Started
        </Link>
        <Link
          href="/components"
          className="rounded-lg border border-terminal-cyan px-6 py-3 font-semibold text-terminal-cyan transition-colors hover:bg-terminal-cyan/10"
        >
          Browse Components
        </Link>
      </div>
    </article>
  );
}
