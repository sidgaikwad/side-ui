"use client";

import Link from "next/link";

export function ComponentGrid() {
  const categories = [
    {
      id: "buttons",
      name: "Buttons",
      icon: "O",
      count: 3,
      description: "Interactive button components",
      preview: "[ Button ]",
    },
    {
      id: "progress",
      name: "Progress Bars",
      icon: "|",
      count: 3,
      description: "Progress indicators",
      preview: "[========  ] 75%",
    },
    {
      id: "badges",
      name: "Badges",
      icon: "*",
      count: 3,
      description: "Status indicators",
      preview: "< Active >",
    },
    {
      id: "charts",
      name: "Charts",
      icon: "^",
      count: 2,
      description: "Data visualization",
      preview: "| | |  |",
    },
    {
      id: "trees",
      name: "Trees",
      icon: "+",
      count: 2,
      description: "Hierarchical data",
      preview: "+- src/\n   +- dist/",
    },
    {
      id: "tabs",
      name: "Tabs",
      icon: "=",
      count: 3,
      description: "Tabbed navigation",
      preview: "[ Tab 1 ] Tab 2",
    },
    {
      id: "table",
      name: "Table",
      icon: "#",
      count: 1,
      description: "Data grids",
      preview: "| Name | Status |",
    },
    {
      id: "multiselect",
      name: "Multi-Select",
      icon: "x",
      count: 1,
      description: "Multiple selection",
      preview: "[x] React\n[ ] Vue",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/components/${category.id}`}
          className="group block rounded-lg border border-terminal-blue/20 bg-terminal-bg/50 p-6 transition-all hover:scale-105 hover:border-terminal-blue/50"
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="font-mono text-4xl text-terminal-cyan">
              {category.icon}
            </div>
            <span className="rounded bg-terminal-cyan/20 px-2 py-1 text-xs text-terminal-cyan">
              {category.count} variant{category.count !== 1 ? "s" : ""}
            </span>
          </div>

          <h3 className="mb-2 text-xl font-semibold text-terminal-cyan transition-colors group-hover:text-terminal-blue">
            {category.name}
          </h3>

          <p className="mb-4 text-sm text-terminal-text/70">
            {category.description}
          </p>

          <div className="rounded border border-terminal-cyan/10 bg-terminal-bg/80 p-3 font-mono text-sm text-terminal-green">
            <pre className="whitespace-pre">{category.preview}</pre>
          </div>
        </Link>
      ))}
    </div>
  );
}
