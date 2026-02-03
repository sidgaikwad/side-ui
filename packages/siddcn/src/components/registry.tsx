/**
 * Component Registry
 *
 * This is the central registry for all TUI components.
 * To add a new component type:
 * 1. Create your component files in src/components/[type]/
 * 2. Add an entry here with variants
 * 3. That's it! The navigation system auto-discovers it.
 */

import React from "react";
import {
  ComponentRegistry,
  ComponentCategory,
  ComponentVariant,
} from "../types";

// Import component variants
import {
  SimpleButton,
  PrimaryButton,
  DangerButton,
} from "./buttons";
import {
  LinearProgress,
  CircularProgress,
  StepProgress,
} from "./progress";
import { StatusBadge, CountBadge, DotBadge } from "./badges";
import { BarChart, LineChart } from "./charts";
import { FileTree, DataTree } from "./trees";
import {
  Tabs,
  DashboardTab,
  AnalyticsTab,
  SettingsTab,
} from "./tabs";
import { Table } from "./table";
import { MultiSelect } from "./multiselect";

// Preview wrapper components with default props
const FileTreePreview: React.FC = () => (
  <FileTree
    data={{
      name: "project",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            { name: "index.tsx", type: "file" },
            { name: "App.tsx", type: "file" },
            { name: "styles.css", type: "file" },
          ],
        },
        { name: "package.json", type: "file" },
        { name: "README.md", type: "file" },
      ],
    }}
  />
);

const DataTreePreview: React.FC = () => (
  <DataTree
    data={{
      name: "Root",
      type: "dir",
      children: [
        {
          name: "Branch 1",
          type: "dir",
          children: [
            { name: "Leaf 1", type: "file" },
            { name: "Leaf 2", type: "file" },
          ],
        },
        {
          name: "Branch 2",
          type: "dir",
          children: [{ name: "Leaf 3", type: "file" }],
        },
      ],
    }}
  />
);

const TabsModernPreview: React.FC = () => (
  <Tabs
    tabs={[
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "📊",
        content: <DashboardTab />,
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: "📈",
        content: <AnalyticsTab />,
      },
      {
        id: "settings",
        label: "Settings",
        icon: "⚙️",
        content: <SettingsTab />,
      },
    ]}
    style="modern"
  />
);

const TabsRoundedPreview: React.FC = () => (
  <Tabs
    tabs={[
      { id: "tab1", label: "Tab 1", content: <DashboardTab /> },
      { id: "tab2", label: "Tab 2", content: <AnalyticsTab /> },
      { id: "tab3", label: "Tab 3", content: <SettingsTab /> },
    ]}
    style="rounded"
  />
);

const TabsPillsPreview: React.FC = () => (
  <Tabs
    tabs={[
      { id: "tab1", label: "Tab 1", content: <DashboardTab /> },
      { id: "tab2", label: "Tab 2", content: <AnalyticsTab /> },
      { id: "tab3", label: "Tab 3", content: <SettingsTab /> },
    ]}
    style="pills"
  />
);

const TablePreview: React.FC = () => (
  <Table
    columns={[
      { key: "name", header: "Name", width: 20 },
      { key: "email", header: "Email", width: 30 },
      { key: "status", header: "Status", width: 10 },
    ]}
    data={[
      {
        name: "John Doe",
        email: "john@example.com",
        status: "Active",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Pending",
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        status: "Active",
      },
      {
        name: "Alice Brown",
        email: "alice@example.com",
        status: "Inactive",
      },
    ]}
    maxVisibleRows={10}
  />
);

const MultiSelectPreview: React.FC = () => (
  <MultiSelect
    items={[
      { value: "react", label: "React", desc: "UI Library" },
      { value: "vue", label: "Vue", desc: "Progressive Framework" },
      {
        value: "angular",
        label: "Angular",
        desc: "Full Framework",
      },
      { value: "svelte", label: "Svelte", desc: "Compiler" },
    ]}
    maxSelect={2}
    showProgress={true}
  />
);

export const componentRegistry: ComponentRegistry = {
  buttons: {
    id: "buttons",
    name: "Buttons",
    description: "Interactive button components with various styles",
    icon: "🔘",
    variants: [
      {
        id: "simple",
        name: "Simple Button",
        description: "A basic button component",
        preview: SimpleButton,
        installCommand: "npx siddcn add button-simple",
        usage: `import { Button } from 'siddcn/button';

<Button onPress={() => console.log('Clicked!')}>
  Click me
</Button>`,
        props: {
          label: {
            type: "string",
            required: true,
            description: "Button label text",
          },
          onPress: {
            type: "() => void",
            required: false,
            description: "Click handler function",
          },
        },
      },
      {
        id: "primary",
        name: "Primary Button",
        description: "A styled primary action button",
        preview: PrimaryButton,
        installCommand: "npx siddcn add button-primary",
        usage: `import { PrimaryButton } from 'siddcn/button';

<PrimaryButton onPress={handleSubmit}>
  Submit
</PrimaryButton>`,
        props: {
          label: {
            type: "string",
            required: true,
            description: "Button label text",
          },
          variant: {
            type: '"primary" | "secondary"',
            required: false,
            default: "primary",
            description: "Button variant style",
          },
        },
      },
      {
        id: "danger",
        name: "Danger Button",
        description: "A button for destructive actions",
        preview: DangerButton,
        installCommand: "npx siddcn add button-danger",
        usage: `import { DangerButton } from 'siddcn/button';

<DangerButton onPress={handleDelete}>
  Delete
</DangerButton>`,
      },
    ],
  },

  progress: {
    id: "progress",
    name: "Progress Bars",
    description: "Progress indicators and loading states",
    icon: "📊",
    variants: [
      {
        id: "linear",
        name: "Linear Progress",
        description: "A horizontal progress bar",
        preview: LinearProgress,
        installCommand: "npx siddcn add progress-linear",
        usage: `import { LinearProgress } from 'siddcn/progress';

<LinearProgress value={75} max={100} />`,
        props: {
          value: {
            type: "number",
            required: true,
            description: "Current progress value",
          },
          max: {
            type: "number",
            required: false,
            default: "100",
            description: "Maximum value",
          },
        },
      },
      {
        id: "circular",
        name: "Circular Progress",
        description: "A circular/spinner progress indicator",
        preview: CircularProgress,
        installCommand: "npx siddcn add progress-circular",
        usage: `import { CircularProgress } from 'siddcn/progress';

<CircularProgress percentage={60} />`,
      },
      {
        id: "step",
        name: "Step Progress",
        description: "Multi-step progress indicator",
        preview: StepProgress,
        installCommand: "npx siddcn add progress-step",
        usage: `import { StepProgress } from 'siddcn/progress';

<StepProgress 
  steps={['Step 1', 'Step 2', 'Step 3']} 
  currentStep={2} 
/>`,
      },
    ],
  },

  badges: {
    id: "badges",
    name: "Badges",
    description: "Status indicators and labels",
    icon: "🏷️",
    variants: [
      {
        id: "status",
        name: "Status Badge",
        description: "Display status with color coding",
        preview: StatusBadge,
        installCommand: "npx siddcn add badge-status",
        usage: `import { StatusBadge } from 'siddcn/badge';

<StatusBadge status="success">Active</StatusBadge>`,
      },
      {
        id: "count",
        name: "Count Badge",
        description: "Display numerical count",
        preview: CountBadge,
        installCommand: "npx siddcn add badge-count",
        usage: `import { CountBadge } from 'siddcn/badge';

<CountBadge count={42} />`,
      },
      {
        id: "dot",
        name: "Dot Badge",
        description: "Simple dot indicator",
        preview: DotBadge,
        installCommand: "npx siddcn add badge-dot",
        usage: `import { DotBadge } from 'siddcn/badge';

<DotBadge color="green" />`,
      },
    ],
  },

  charts: {
    id: "charts",
    name: "Charts",
    description: "Data visualization components",
    icon: "📈",
    variants: [
      {
        id: "bar",
        name: "Bar Chart",
        description: "Display data as vertical bars",
        preview: BarChart,
        installCommand: "npx siddcn add chart-bar",
        usage: `import { BarChart } from 'siddcn/chart';

<BarChart 
  data={[
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 60 }
  ]} 
/>`,
      },
      {
        id: "line",
        name: "Line Chart",
        description: "Display data as a line graph",
        preview: LineChart,
        installCommand: "npx siddcn add chart-line",
        usage: `import { LineChart } from 'siddcn/chart';

<LineChart 
  data={[10, 20, 15, 30, 25]} 
/>`,
      },
    ],
  },

  trees: {
    id: "trees",
    name: "Trees",
    description: "Hierarchical data structures",
    icon: "🌳",
    variants: [
      {
        id: "file",
        name: "File Tree",
        description: "Display file system hierarchy with vim-style navigation",
        preview: FileTreePreview,
        installCommand: "npx siddcn add tree-file",
        usage: `import { FileTree } from 'siddcn/tree';

const fileStructure = {
  name: 'project',
  type: 'dir',
  children: [
    {
      name: 'src',
      type: 'dir',
      children: [
        { name: 'index.tsx', type: 'file' },
        { name: 'App.tsx', type: 'file' }
      ]
    },
    { name: 'package.json', type: 'file' }
  ]
};

<FileTree 
  data={fileStructure}
  onSelect={(node) => console.log('Selected:', node)}
/>`,
        props: {
          data: {
            type: "TreeNode",
            required: true,
            description:
              "Tree data structure with name, type, and optional children",
          },
          onSelect: {
            type: "(node: TreeNode) => void",
            required: false,
            description: "Callback when a node is selected",
          },
        },
      },
      {
        id: "data",
        name: "Data Tree",
        description: "Display hierarchical data with expandable nodes",
        preview: DataTreePreview,
        installCommand: "npx siddcn add tree-data",
        usage: `import { DataTree } from 'siddcn/tree';

const treeData = {
  name: 'Root',
  type: 'dir',
  children: [
    {
      name: 'Branch 1',
      type: 'dir',
      children: [
        { name: 'Leaf 1', type: 'file' }
      ]
    }
  ]
};

<DataTree 
  data={treeData}
  onSelect={(node) => console.log('Selected:', node)}
/>`,
        props: {
          data: {
            type: "TreeNode",
            required: true,
            description: "Tree data structure",
          },
          onSelect: {
            type: "(node: TreeNode) => void",
            required: false,
            description: "Callback when a node is selected",
          },
        },
      },
    ],
  },

  tabs: {
    id: "tabs",
    name: "Tabs",
    description: "Tabbed navigation with multiple style variants",
    icon: "📑",
    variants: [
      {
        id: "modern",
        name: "Modern Tabs",
        description: "Clean modern tab interface with bold borders",
        preview: TabsModernPreview,
        installCommand: "npx siddcn add tabs-modern",
        usage: `import { Tabs } from 'siddcn/tabs';

const tabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    content: <DashboardContent />
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    content: <AnalyticsContent />
  }
];

<Tabs 
  tabs={tabs}
  defaultTab={0}
  style="modern"
  onTabChange={(index) => console.log('Tab changed:', index)}
/>`,
        props: {
          tabs: {
            type: "Tab[]",
            required: true,
            description:
              "Array of tab objects with id, label, icon, and content",
          },
          defaultTab: {
            type: "number",
            required: false,
            default: "0",
            description: "Index of initially active tab",
          },
          style: {
            type: '"modern" | "rounded" | "underline" | "pills" | "blocks"',
            required: false,
            default: "modern",
            description: "Visual style of the tabs",
          },
          onTabChange: {
            type: "(index: number) => void",
            required: false,
            description: "Callback when active tab changes",
          },
        },
      },
      {
        id: "rounded",
        name: "Rounded Tabs",
        description: "Tabs with rounded borders",
        preview: TabsRoundedPreview,
        installCommand: "npx siddcn add tabs-rounded",
        usage: `import { Tabs } from 'siddcn/tabs';

<Tabs tabs={tabs} style="rounded" />`,
      },
      {
        id: "pills",
        name: "Pill Tabs",
        description: "Pill-shaped tab buttons",
        preview: TabsPillsPreview,
        installCommand: "npx siddcn add tabs-pills",
        usage: `import { Tabs } from 'siddcn/tabs';

<Tabs tabs={tabs} style="pills" />`,
      },
    ],
  },

  table: {
    id: "table",
    name: "Table",
    description: "Data tables with sorting and navigation",
    icon: "📋",
    variants: [
      {
        id: "default",
        name: "Data Table",
        description: "Scrollable data table with row selection",
        preview: TablePreview,
        installCommand: "npx siddcn add table",
        usage: `import { Table } from 'siddcn/table';

const columns = [
  { key: 'name', header: 'Name', width: 20 },
  { key: 'email', header: 'Email', width: 30 },
  { key: 'status', header: 'Status', width: 10 }
];

const data = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' }
];

<Table 
  columns={columns}
  data={data}
  maxVisibleRows={10}
  onSelect={(row, index) => console.log('Selected:', row)}
/>`,
        props: {
          columns: {
            type: "TableColumn[]",
            required: true,
            description:
              "Array of column definitions with key, header, and width",
          },
          data: {
            type: "TableRow[]",
            required: true,
            description: "Array of row data objects",
          },
          maxVisibleRows: {
            type: "number",
            required: false,
            default: "10",
            description: "Maximum number of visible rows before scrolling",
          },
          onSelect: {
            type: "(row: TableRow, index: number) => void",
            required: false,
            description: "Callback when a row is selected",
          },
        },
      },
    ],
  },

  multiselect: {
    id: "multiselect",
    name: "Multi-Select",
    description: "Multiple item selection with limits and progress",
    icon: "☑️",
    variants: [
      {
        id: "default",
        name: "Multi-Select List",
        description: "Select multiple items from a list with optional limits",
        preview: MultiSelectPreview,
        installCommand: "npx siddcn add multiselect",
        usage: `import { MultiSelect } from 'siddcn/multiselect';

const items = [
  { value: 'react', label: 'React', desc: 'UI Library' },
  { value: 'vue', label: 'Vue', desc: 'Progressive Framework' },
  { value: 'angular', label: 'Angular', desc: 'Full Framework' }
];

<MultiSelect 
  items={items}
  maxSelect={2}
  showProgress={true}
  onConfirm={(selected) => console.log('Selected:', selected)}
/>`,
        props: {
          items: {
            type: "SelectItem[]",
            required: true,
            description:
              "Array of items with value, label, and optional description",
          },
          maxSelect: {
            type: "number",
            required: false,
            default: "0",
            description: "Maximum selectable items (0 = unlimited)",
          },
          showProgress: {
            type: "boolean",
            required: false,
            default: "true",
            description: "Show progress bar for selections",
          },
          onConfirm: {
            type: "(selected: string[]) => void",
            required: false,
            description: "Callback when selection is confirmed",
          },
        },
      },
    ],
  },
};

/**
 * Get all component categories
 */
export function getCategories(): ComponentCategory[] {
  return Object.values(componentRegistry);
}

/**
 * Get a specific category by ID
 */
export function getCategory(categoryId: string): ComponentCategory | undefined {
  return componentRegistry[categoryId];
}

/**
 * Get a specific component variant
 */
export function getVariant(
  categoryId: string,
  variantId: string,
): ComponentVariant | undefined {
  const category = getCategory(categoryId);
  return category?.variants.find((v) => v.id === variantId);
}