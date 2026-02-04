import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

// Component data
const componentData: Record<
  string,
  {
    name: string;
    icon: string;
    variants: Record<
      string,
      {
        name: string;
        description: string;
        installCommand: string;
        usage: string;
        props?: {
          name: string;
          type: string;
          required: boolean;
          description: string;
        }[];
        preview: string;
      }
    >;
  }
> = {
  buttons: {
    name: "Buttons",
    icon: "O",
    variants: {
      simple: {
        name: "Simple Button",
        description: "A basic button component for terminal interfaces",
        installCommand: "npx siddcn add button-simple",
        usage: `import { SimpleButton } from 'siddcn';

export default function App() {
  return <SimpleButton label="Click me" />;
}`,
        props: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "The text displayed on the button",
          },
        ],
        preview: "[ Click me ]",
      },
      primary: {
        name: "Primary Button",
        description: "A styled primary action button with emphasis",
        installCommand: "npx siddcn add button-primary",
        usage: `import { PrimaryButton } from 'siddcn';

export default function App() {
  return <PrimaryButton label="Submit" />;
}`,
        preview: "[ Submit ]",
      },
      danger: {
        name: "Danger Button",
        description: "A button for destructive actions with warning styling",
        installCommand: "npx siddcn add button-danger",
        usage: `import { DangerButton } from 'siddcn';

export default function App() {
  return <DangerButton label="Delete" />;
}`,
        preview: "[ Delete ]",
      },
    },
  },
  progress: {
    name: "Progress Bars",
    icon: "|",
    variants: {
      linear: {
        name: "Linear Progress",
        description: "A horizontal progress bar with percentage display",
        installCommand: "npx siddcn add progress-linear",
        usage: `import { LinearProgress } from 'siddcn';

export default function App() {
  return <LinearProgress value={75} max={100} />;
}`,
        props: [
          {
            name: "value",
            type: "number",
            required: true,
            description: "Current progress value",
          },
          {
            name: "max",
            type: "number",
            required: false,
            description: "Maximum value (default: 100)",
          },
          {
            name: "animated",
            type: "boolean",
            required: false,
            description: "Enable animation",
          },
        ],
        preview: "[========  ] 75%",
      },
      circular: {
        name: "Circular Progress",
        description: "A circular spinner-style progress indicator",
        installCommand: "npx siddcn add progress-circular",
        usage: `import { CircularProgress } from 'siddcn';

export default function App() {
  return <CircularProgress percentage={60} />;
}`,
        preview: "( 60% )",
      },
      step: {
        name: "Step Progress",
        description: "Multi-step progress indicator for wizards and flows",
        installCommand: "npx siddcn add progress-step",
        usage: `import { StepProgress } from 'siddcn';

export default function App() {
  return <StepProgress currentStep={2} totalSteps={4} />;
}`,
        preview: "[1] -> [2] -> [ ] -> [ ]",
      },
    },
  },
  badges: {
    name: "Badges",
    icon: "*",
    variants: {
      status: {
        name: "Status Badge",
        description: "Display status with color coding",
        installCommand: "npx siddcn add badge-status",
        usage: `import { StatusBadge } from 'siddcn';

export default function App() {
  return <StatusBadge status="success" />;
}`,
        props: [
          {
            name: "status",
            type: '"success" | "warning" | "error" | "info"',
            required: true,
            description: "The status type to display",
          },
        ],
        preview: "< Active >",
      },
      count: {
        name: "Count Badge",
        description: "Display numerical count values",
        installCommand: "npx siddcn add badge-count",
        usage: `import { CountBadge } from 'siddcn';

export default function App() {
  return <CountBadge count={42} />;
}`,
        preview: "( 42 )",
      },
      dot: {
        name: "Dot Badge",
        description: "Simple dot indicator for status",
        installCommand: "npx siddcn add badge-dot",
        usage: `import { DotBadge } from 'siddcn';

export default function App() {
  return <DotBadge color="green" />;
}`,
        preview: "* Online",
      },
    },
  },
  charts: {
    name: "Charts",
    icon: "^",
    variants: {
      bar: {
        name: "Bar Chart",
        description: "Display data as vertical bars in the terminal",
        installCommand: "npx siddcn add chart-bar",
        usage: `import { BarChart } from 'siddcn';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 60 },
];

export default function App() {
  return <BarChart data={data} />;
}`,
        preview: "| | |  |",
      },
      line: {
        name: "Line Chart",
        description: "Display data as a line graph",
        installCommand: "npx siddcn add chart-line",
        usage: `import { LineChart } from 'siddcn';

export default function App() {
  return <LineChart />;
}`,
        preview: "_/\\_/",
      },
    },
  },
  trees: {
    name: "Trees",
    icon: "+",
    variants: {
      file: {
        name: "File Tree",
        description:
          "File system hierarchy display with vim-style navigation (j/k)",
        installCommand: "npx siddcn add tree-file",
        usage: `import { FileTree } from 'siddcn';

const tree = {
  name: 'project',
  type: 'dir',
  children: [
    { name: 'src', type: 'dir', children: [
      { name: 'index.tsx', type: 'file' }
    ]},
    { name: 'package.json', type: 'file' }
  ]
};

export default function App() {
  return <FileTree data={tree} />;
}`,
        preview: "+- project/\n   +- src/\n   |  +- index.tsx\n   +- package.json",
      },
      data: {
        name: "Data Tree",
        description: "Hierarchical data with expandable/collapsible nodes",
        installCommand: "npx siddcn add tree-data",
        usage: `import { DataTree } from 'siddcn';

export default function App() {
  return <DataTree data={treeData} />;
}`,
        preview: "+- Root\n   +- Branch\n      +- Leaf",
      },
    },
  },
  tabs: {
    name: "Tabs",
    icon: "=",
    variants: {
      modern: {
        name: "Modern Tabs",
        description: "Clean modern tab interface",
        installCommand: "npx siddcn add tabs-modern",
        usage: `import { Tabs } from 'siddcn';

const tabs = [
  { id: 'tab1', label: 'Dashboard', content: <Dashboard /> },
  { id: 'tab2', label: 'Settings', content: <Settings /> }
];

export default function App() {
  return <Tabs tabs={tabs} style="modern" />;
}`,
        preview: "[ Dashboard ]  Settings  Analytics",
      },
      rounded: {
        name: "Rounded Tabs",
        description: "Tabs with rounded borders",
        installCommand: "npx siddcn add tabs-rounded",
        usage: `import { Tabs } from 'siddcn';

export default function App() {
  return <Tabs tabs={tabs} style="rounded" />;
}`,
        preview: "( Tab 1 )  Tab 2  Tab 3",
      },
      pills: {
        name: "Pill Tabs",
        description: "Pill-shaped tab buttons",
        installCommand: "npx siddcn add tabs-pills",
        usage: `import { Tabs } from 'siddcn';

export default function App() {
  return <Tabs tabs={tabs} style="pills" />;
}`,
        preview: "[Tab 1] [Tab 2] [Tab 3]",
      },
    },
  },
  table: {
    name: "Table",
    icon: "#",
    variants: {
      default: {
        name: "Data Table",
        description:
          "Scrollable table with row selection and vim-style navigation",
        installCommand: "npx siddcn add table",
        usage: `import { Table } from 'siddcn';

const columns = [
  { key: 'name', header: 'Name', width: 20 },
  { key: 'status', header: 'Status', width: 10 }
];

const data = [
  { name: 'John Doe', status: 'Active' },
  { name: 'Jane Smith', status: 'Pending' }
];

export default function App() {
  return <Table columns={columns} data={data} maxVisibleRows={10} />;
}`,
        props: [
          {
            name: "columns",
            type: "TableColumn[]",
            required: true,
            description: "Column definitions",
          },
          {
            name: "data",
            type: "TableRow[]",
            required: true,
            description: "Data rows",
          },
          {
            name: "maxVisibleRows",
            type: "number",
            required: false,
            description: "Maximum visible rows (default: 10)",
          },
          {
            name: "onSelect",
            type: "(row, index) => void",
            required: false,
            description: "Row selection callback",
          },
        ],
        preview: "| Name       | Status  |\n|------------|--------|\n| John Doe   | Active |",
      },
    },
  },
  multiselect: {
    name: "Multi-Select",
    icon: "x",
    variants: {
      default: {
        name: "Multi-Select List",
        description: "Select multiple items with optional limits",
        installCommand: "npx siddcn add multiselect",
        usage: `import { MultiSelect } from 'siddcn';

const items = [
  { value: 'react', label: 'React', desc: 'UI Library' },
  { value: 'vue', label: 'Vue', desc: 'Framework' },
  { value: 'svelte', label: 'Svelte', desc: 'Compiler' }
];

export default function App() {
  return <MultiSelect items={items} maxSelect={2} />;
}`,
        props: [
          {
            name: "items",
            type: "SelectItem[]",
            required: true,
            description: "Available items",
          },
          {
            name: "maxSelect",
            type: "number",
            required: false,
            description: "Maximum selections allowed",
          },
          {
            name: "showProgress",
            type: "boolean",
            required: false,
            description: "Show selection progress",
          },
        ],
        preview: "[x] React - UI Library\n[ ] Vue - Framework\n[x] Svelte - Compiler",
      },
    },
  },
};

export default async function ComponentVariantPage({
  params,
}: {
  params: Promise<{ category: string; variant: string }>;
}) {
  const { category, variant } = await params;

  const categoryData = componentData[category];
  if (!categoryData) {
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

  const variantData = categoryData.variants[variant];
  if (!variantData) {
    return (
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl text-terminal-red">Variant not found</h1>
          <Link href="/components" className="mt-4 text-terminal-cyan">
            Back to components
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-terminal-text/60">
          <Link href="/components" className="hover:text-terminal-cyan">
            Components
          </Link>
          <span>/</span>
          <Link
            href={`/components/${category}`}
            className="hover:text-terminal-cyan"
          >
            {categoryData.name}
          </Link>
          <span>/</span>
          <span className="text-terminal-cyan">{variantData.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl">{categoryData.icon}</span>
            <h1 className="text-3xl font-bold text-terminal-cyan">
              {variantData.name}
            </h1>
          </div>
          <p className="text-lg text-terminal-text/70">
            {variantData.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-terminal-text">
            Preview
          </h2>
          <div className="rounded-lg border border-terminal-cyan/30 bg-terminal-bg/80 p-6">
            <pre className="font-mono text-terminal-green">
              {variantData.preview}
            </pre>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-terminal-text">
            Installation
          </h2>
          <CodeBlock
            code={variantData.installCommand}
            language="bash"
            filename="Terminal"
          />
        </section>

        {/* Usage */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-terminal-text">
            Usage
          </h2>
          <CodeBlock
            code={variantData.usage}
            language="tsx"
            filename="App.tsx"
          />
        </section>

        {/* Props */}
        {variantData.props && variantData.props.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-terminal-text">
              Props
            </h2>
            <div className="overflow-hidden rounded-lg border border-terminal-cyan/20">
              <table className="w-full">
                <thead className="bg-terminal-bg/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-terminal-cyan">
                      Prop
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-terminal-cyan">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-terminal-cyan">
                      Required
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-terminal-cyan">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variantData.props.map((prop, idx) => (
                    <tr
                      key={prop.name}
                      className={
                        idx % 2 === 0 ? "bg-terminal-bg/30" : "bg-terminal-bg/10"
                      }
                    >
                      <td className="px-4 py-3 font-mono text-sm text-terminal-green">
                        {prop.name}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-terminal-yellow">
                        {prop.type}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {prop.required ? (
                          <span className="text-terminal-red">Yes</span>
                        ) : (
                          <span className="text-terminal-text/50">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-terminal-text/70">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12 border-t border-terminal-cyan/20 pt-8">
          <Link
            href="/components"
            className="text-terminal-cyan hover:underline"
          >
            ← Back to all components
          </Link>
        </div>
      </div>
    </main>
  );
}
