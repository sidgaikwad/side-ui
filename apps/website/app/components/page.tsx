import { ComponentCard } from "@/components/ComponentCard";

const components = [
  {
    id: "buttons",
    name: "Buttons",
    icon: "O",
    description: "Interactive button components with various styles",
    variants: [
      {
        id: "simple",
        name: "Simple Button",
        description: "A basic button component",
        preview: "[ Button ]",
      },
      {
        id: "primary",
        name: "Primary Button",
        description: "A styled primary action button",
        preview: "[ Primary ]",
      },
      {
        id: "danger",
        name: "Danger Button",
        description: "A button for destructive actions",
        preview: "[ Delete ]",
      },
    ],
  },
  {
    id: "progress",
    name: "Progress Bars",
    icon: "|",
    description: "Progress indicators and loading states",
    variants: [
      {
        id: "linear",
        name: "Linear Progress",
        description: "A horizontal progress bar",
        preview: "[========  ] 75%",
      },
      {
        id: "circular",
        name: "Circular Progress",
        description: "A circular/spinner progress indicator",
        preview: "( 60% )",
      },
      {
        id: "step",
        name: "Step Progress",
        description: "Multi-step progress indicator",
        preview: "[1] -> [2] -> [ ]",
      },
    ],
  },
  {
    id: "badges",
    name: "Badges",
    icon: "*",
    description: "Status indicators and labels",
    variants: [
      {
        id: "status",
        name: "Status Badge",
        description: "Display status with color coding",
        preview: "< Active >",
      },
      {
        id: "count",
        name: "Count Badge",
        description: "Display numerical count",
        preview: "( 42 )",
      },
      {
        id: "dot",
        name: "Dot Badge",
        description: "Simple dot indicator",
        preview: "* Online",
      },
    ],
  },
  {
    id: "charts",
    name: "Charts",
    icon: "^",
    description: "Data visualization components",
    variants: [
      {
        id: "bar",
        name: "Bar Chart",
        description: "Display data as vertical bars",
        preview: "| | |  |",
      },
      {
        id: "line",
        name: "Line Chart",
        description: "Display data as a line graph",
        preview: "_/\\_/",
      },
    ],
  },
  {
    id: "trees",
    name: "Trees",
    icon: "+",
    description: "Hierarchical data structures",
    variants: [
      {
        id: "file",
        name: "File Tree",
        description: "File system hierarchy with vim navigation",
        preview: "+- src/\n   +- index.ts",
      },
      {
        id: "data",
        name: "Data Tree",
        description: "Hierarchical data with expandable nodes",
        preview: "+- Root\n   +- Child",
      },
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    icon: "=",
    description: "Tabbed navigation with multiple styles",
    variants: [
      {
        id: "modern",
        name: "Modern Tabs",
        description: "Clean modern tab interface",
        preview: "[ Tab 1 ] Tab 2  Tab 3",
      },
      {
        id: "rounded",
        name: "Rounded Tabs",
        description: "Tabs with rounded borders",
        preview: "( Tab 1 ) Tab 2",
      },
      {
        id: "pills",
        name: "Pill Tabs",
        description: "Pill-shaped tab buttons",
        preview: "[Tab 1] [Tab 2]",
      },
    ],
  },
  {
    id: "table",
    name: "Table",
    icon: "#",
    description: "Scrollable data grid",
    variants: [
      {
        id: "default",
        name: "Data Table",
        description: "Scrollable table with row selection",
        preview: "| Name  | Status |\n| John  | Active |",
      },
    ],
  },
  {
    id: "multiselect",
    name: "Multi-Select",
    icon: "x",
    description: "Multiple item selection with limits",
    variants: [
      {
        id: "default",
        name: "Multi-Select List",
        description: "Select multiple items with optional limits",
        preview: "[x] React\n[ ] Vue\n[x] Svelte",
      },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-terminal-cyan">
            Component Library
          </h1>
          <p className="mx-auto max-w-2xl text-terminal-text/70">
            Browse all available TUI components. Each component can be previewed
            in the terminal and installed with a single command.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <ComponentCard key={component.id} {...component} />
          ))}
        </div>
      </div>
    </main>
  );
}
