"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sections: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quickstart" },
      { title: "SSH Setup", href: "/docs/ssh-setup" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Buttons", href: "/docs/components/buttons" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Badges", href: "/docs/components/badges" },
      { title: "Charts", href: "/docs/components/charts" },
      { title: "Trees", href: "/docs/components/trees" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Table", href: "/docs/components/table" },
      { title: "MultiSelect", href: "/docs/components/multiselect" },
    ],
  },
  {
    title: "Customization",
    items: [
      { title: "Themes", href: "/docs/themes" },
      { title: "Adding Components", href: "/docs/adding-components" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "CLI Commands", href: "/docs/api/cli" },
      { title: "Component Props", href: "/docs/api/props" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 overflow-y-auto border-r border-terminal-cyan/20 pr-4">
      <nav className="space-y-6 py-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 font-semibold text-terminal-cyan">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded px-3 py-1.5 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-terminal-cyan/20 text-terminal-cyan"
                        : "text-terminal-text/70 hover:bg-terminal-cyan/10 hover:text-terminal-cyan"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
