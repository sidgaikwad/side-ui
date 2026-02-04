"use client";

import Link from "next/link";

export function ComponentGrid() {
  const categories = [
    {
      id: "buttons",
      name: "Buttons",
      count: 3,
      description: "Interactive button components",
      preview: "[ Button ]",
    },
    {
      id: "progress",
      name: "Progress",
      count: 3,
      description: "Progress indicators",
      preview: "[========  ] 75%",
    },
    {
      id: "badges",
      name: "Badges",
      count: 3,
      description: "Status indicators",
      preview: "< Active >",
    },
    {
      id: "charts",
      name: "Charts",
      count: 2,
      description: "Data visualization",
      preview: "| | |  |",
    },
    {
      id: "trees",
      name: "Trees",
      count: 2,
      description: "Hierarchical data",
      preview: "+- src/\n   +- dist/",
    },
    {
      id: "tabs",
      name: "Tabs",
      count: 3,
      description: "Tabbed navigation",
      preview: "[ Tab 1 ] Tab 2",
    },
    {
      id: "table",
      name: "Table",
      count: 1,
      description: "Data grids",
      preview: "| Name | Status |",
    },
    {
      id: "multiselect",
      name: "MultiSelect",
      count: 1,
      description: "Multiple selection",
      preview: "[x] React\n[ ] Vue",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/components/${category.id}`}
          className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-white">
              {category.name}
            </h3>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/40">
              {category.count}
            </span>
          </div>

          <p className="mb-4 text-sm text-white/50">
            {category.description}
          </p>

          <div className="rounded-lg border border-white/5 bg-black/50 p-3 font-mono text-xs text-emerald-400/80">
            <pre className="whitespace-pre">{category.preview}</pre>
          </div>
        </Link>
      ))}
    </div>
  );
}
