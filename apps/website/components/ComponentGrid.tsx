"use client";

import Link from "next/link";
import { AnimatedCard } from "./AnimatedCard";

export function ComponentGrid() {
  const categories = [
    {
      id: "buttons",
      name: "Buttons",
      count: 6,
      description: "Interactive button variants",
      preview: "[ Primary ] [ Glow ]",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "progress",
      name: "Progress",
      count: 3,
      description: "Progress indicators",
      preview: "[========  ] 75%",
      color: "from-emerald-500/20 to-green-500/20",
    },
    {
      id: "badges",
      name: "Badges",
      count: 3,
      description: "Status indicators",
      preview: "< Active > (42)",
      color: "from-amber-500/20 to-yellow-500/20",
    },
    {
      id: "charts",
      name: "Charts",
      count: 2,
      description: "Data visualization",
      preview: "▂▃▅▇▆▄▂",
      color: "from-cyan-500/20 to-teal-500/20",
    },
    {
      id: "trees",
      name: "Trees",
      count: 2,
      description: "File & data hierarchies",
      preview: "├─ src/\n└─ index.tsx",
      color: "from-teal-500/20 to-green-500/20",
    },
    {
      id: "tabs",
      name: "Tabs",
      count: 3,
      description: "Tabbed navigation",
      preview: "[ Tab 1 ] Tab 2",
      color: "from-indigo-500/20 to-blue-500/20",
    },
    {
      id: "table",
      name: "Table",
      count: 1,
      description: "Scrollable data grids",
      preview: "| Name | Status |",
      color: "from-rose-500/20 to-red-500/20",
    },
    {
      id: "multiselect",
      name: "MultiSelect",
      count: 1,
      description: "Multiple selection",
      preview: "[x] React\n[ ] Vue",
      color: "from-fuchsia-500/20 to-pink-500/20",
    },
    {
      id: "spinners",
      name: "Spinners",
      count: 5,
      description: "Loading animations",
      preview: "⠋ Loading...",
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      id: "textinput",
      name: "Text Input",
      count: 3,
      description: "Input fields & forms",
      preview: "> Type... █",
      color: "from-sky-500/20 to-blue-500/20",
    },
    {
      id: "cards",
      name: "Cards",
      count: 6,
      description: "Container components",
      preview: "┌─ Card ─┐",
      color: "from-slate-500/20 to-gray-500/20",
    },
    {
      id: "select",
      name: "Select",
      count: 3,
      description: "Selection inputs",
      preview: "▸ Option 1",
      color: "from-lime-500/20 to-green-500/20",
    },
    {
      id: "backgrounds",
      name: "Backgrounds",
      count: 2,
      description: "Animated effects",
      preview: "*  . +  *",
      color: "from-indigo-500/20 to-cyan-500/20",
    },
    {
      id: "animatedtext",
      name: "Animated Text",
      count: 4,
      description: "Text animations",
      preview: "Typing..._",
      color: "from-pink-500/20 to-rose-500/20",
    },
    {
      id: "notifications",
      name: "Notifications",
      count: 4,
      description: "Toasts & alerts",
      preview: "[+] Success!",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      id: "dashboards",
      name: "Dashboards",
      count: 6,
      description: "System monitors",
      preview: "CPU [||||  ] 65%",
      color: "from-red-500/20 to-orange-500/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, idx) => (
        <Link
          key={category.id}
          href={`/components/${category.id}`}
          className="group relative block"
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${category.color} blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          <AnimatedCard className="relative h-full">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium text-white group-hover:text-blue-50 transition-colors">
                {category.name}
              </h3>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/40 group-hover:bg-white/10 group-hover:text-white/60 transition-all">
                {category.count}
              </span>
            </div>

            <p className="mb-4 text-sm text-white/50 group-hover:text-white/60 transition-colors">
              {category.description}
            </p>

            <div className="rounded-lg border border-white/5 bg-black/50 p-3 font-mono text-xs text-emerald-400/80 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-all">
              <pre className="whitespace-pre">{category.preview}</pre>
            </div>

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </AnimatedCard>
        </Link>
      ))}
    </div>
  );
}
