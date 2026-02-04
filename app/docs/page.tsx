import Link from "next/link";
import { Navigation } from "../components/Navigation";

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs", description: "Learn about siddcn and its features" },
        { title: "Installation", href: "/docs/installation", description: "How to install siddcn" },
        { title: "Quick Start", href: "/docs/quickstart", description: "Get up and running quickly" },
        { title: "SSH Setup", href: "/docs/ssh-setup", description: "Configure SSH access" },
      ],
    },
    {
      title: "Components",
      items: [
        { title: "Buttons", href: "/docs/components/buttons", description: "Interactive buttons" },
        { title: "Progress", href: "/docs/components/progress", description: "Progress indicators" },
        { title: "Badges", href: "/docs/components/badges", description: "Status badges" },
        { title: "Charts", href: "/docs/components/charts", description: "Data visualization" },
        { title: "Trees", href: "/docs/components/trees", description: "Tree structures" },
        { title: "Tabs", href: "/docs/components/tabs", description: "Tabbed navigation" },
        { title: "Table", href: "/docs/components/table", description: "Data tables" },
        { title: "MultiSelect", href: "/docs/components/multiselect", description: "Multi-selection" },
      ],
    },
    {
      title: "Customization",
      items: [
        { title: "Themes", href: "/docs/themes", description: "Theming and styling" },
        { title: "Adding Components", href: "/docs/adding-components", description: "Create new components" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Documentation</h1>
          <p className="mt-4 text-lg text-white/60">
            Everything you need to build beautiful terminal UIs with siddcn.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 text-xl font-semibold text-white">{section.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <h3 className="font-medium text-white group-hover:text-blue-400">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Introduction Content */}
        <div className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white">Introduction</h2>
          <p className="mt-4 text-white/60">
            Siddcn is a terminal UI component library built with React Ink. It provides beautiful, 
            accessible, and extensible components for building terminal-based applications.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="font-medium text-white">React Ink Based</h3>
              <p className="mt-1 text-sm text-white/50">
                Built on top of React Ink for a familiar React development experience.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="font-medium text-white">SSH Access</h3>
              <p className="mt-1 text-sm text-white/50">
                Browse and preview components remotely via SSH.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="font-medium text-white">6 Built-in Themes</h3>
              <p className="mt-1 text-sm text-white/50">
                Choose from beautiful themes or create your own.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="font-medium text-white">Vim-style Navigation</h3>
              <p className="mt-1 text-sm text-white/50">
                Navigate with familiar vim keybindings.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white">Quick Start</h3>
            <div className="code-block mt-4 p-4 font-mono text-sm">
              <code className="text-emerald-400">$ npm install -g siddcn</code>
              <br />
              <code className="text-emerald-400">$ siddcn</code>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/docs/installation"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-white/90"
            >
              Get Started
            </Link>
            <Link
              href="/components"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
