import Link from "next/link";

// Component data
const componentData: Record<
  string,
  {
    name: string;
    icon: string;
    description: string;
    variants: {
      id: string;
      name: string;
      description: string;
      preview: string;
    }[];
  }
> = {
  buttons: {
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
  progress: {
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
  badges: {
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
  charts: {
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
  trees: {
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
  tabs: {
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
  table: {
    name: "Table",
    icon: "#",
    description: "Scrollable data grid",
    variants: [
      {
        id: "default",
        name: "Data Table",
        description: "Scrollable table with row selection",
        preview: "| Name  | Status |",
      },
    ],
  },
  multiselect: {
    name: "Multi-Select",
    icon: "x",
    description: "Multiple item selection with limits",
    variants: [
      {
        id: "default",
        name: "Multi-Select List",
        description: "Select multiple items with optional limits",
        preview: "[x] React\n[ ] Vue",
      },
    ],
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const data = componentData[category];

  if (!data) {
    return (
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl text-terminal-red">Category not found</h1>
          <Link href="/components" className="mt-4 text-terminal-cyan">
            Back to components
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-terminal-text/60">
          <Link href="/components" className="hover:text-terminal-cyan">
            Components
          </Link>
          <span>/</span>
          <span className="text-terminal-cyan">{data.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-2 flex items-center gap-3">
            <span className="font-mono text-4xl text-terminal-cyan">
              {data.icon}
            </span>
            <h1 className="text-4xl font-bold text-terminal-cyan">{data.name}</h1>
          </div>
          <p className="text-lg text-terminal-text/70">{data.description}</p>
        </div>

        {/* Variants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.variants.map((variant) => (
            <Link
              key={variant.id}
              href={`/components/${category}/${variant.id}`}
              className="group block rounded-lg border border-terminal-cyan/20 bg-terminal-bg/50 p-6 transition-all hover:border-terminal-cyan/50"
            >
              <h3 className="mb-2 text-xl font-semibold text-terminal-cyan transition-colors group-hover:text-terminal-blue">
                {variant.name}
              </h3>
              <p className="mb-4 text-sm text-terminal-text/70">
                {variant.description}
              </p>
              <div className="rounded border border-terminal-cyan/10 bg-terminal-bg/80 p-3 font-mono text-sm text-terminal-green">
                <pre className="whitespace-pre">{variant.preview}</pre>
              </div>
            </Link>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-12 border-t border-terminal-cyan/20 pt-8">
          <Link href="/components" className="text-terminal-cyan hover:underline">
            ← Back to all components
          </Link>
        </div>
      </div>
    </main>
  );
}
