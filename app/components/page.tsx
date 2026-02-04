import { Navigation } from "./Navigation";
import { ComponentGrid } from "./ComponentGrid";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Components</h1>
          <p className="mt-4 text-lg text-white/60">
            Browse the complete siddcn component library. Each component is designed to be 
            accessible, themeable, and easy to use.
          </p>
        </div>

        <ComponentGrid />

        <div className="mt-16 text-center">
          <p className="text-white/50">
            All components support keyboard navigation and theming.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">
            <span>Press</span>
            <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-white">t</kbd>
            <span>to toggle themes in the CLI</span>
          </div>
        </div>
      </main>
    </div>
  );
}
