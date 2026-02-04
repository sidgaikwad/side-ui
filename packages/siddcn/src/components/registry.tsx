/**
 * Component Registry - COMPLETE & FIXED
 *
 * This is the central registry for all TUI components.
 */

import React from "react";
import {
  ComponentRegistry,
  ComponentCategory,
  ComponentVariant,
} from "../types";

// Import component variants
import { SimpleButton, PrimaryButton, DangerButton } from "./buttons";
import { LinearProgress, CircularProgress, StepProgress } from "./progress";
import { StatusBadge, CountBadge, DotBadge } from "./badges";
import { BarChart, LineChart } from "./charts";
import { FileTree, DataTree } from "./trees";
import { Tabs, DashboardTab, AnalyticsTab, SettingsTab } from "./tabs";
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
          ],
        },
        { name: "package.json", type: "file" },
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
          children: [{ name: "Leaf 1", type: "file" }],
        },
      ],
    }}
  />
);

// Create static tab content components to prevent re-rendering
const TabPreviewContent: React.FC = () => <DashboardTab />;

const TabsModernPreview: React.FC = () => (
  <Tabs
    tabs={[
      { id: "tab1", label: "Tab 1", content: <TabPreviewContent /> },
      { id: "tab2", label: "Tab 2", content: <TabPreviewContent /> },
      { id: "tab3", label: "Tab 3", content: <TabPreviewContent /> },
    ]}
    style="modern"
  />
);

const TabsRoundedPreview: React.FC = () => (
  <Tabs
    tabs={[
      { id: "tab1", label: "Tab 1", content: <TabPreviewContent /> },
      { id: "tab2", label: "Tab 2", content: <TabPreviewContent /> },
    ]}
    style="rounded"
  />
);

const TabsPillsPreview: React.FC = () => (
  <Tabs
    tabs={[
      { id: "tab1", label: "Tab 1", content: <TabPreviewContent /> },
      { id: "tab2", label: "Tab 2", content: <TabPreviewContent /> },
    ]}
    style="pills"
  />
);

const TablePreview: React.FC = () => (
  <Table
    columns={[
      { key: "name", header: "Name", width: 15 },
      { key: "status", header: "Status", width: 10 },
    ]}
    data={[
      { name: "John Doe", status: "Active" },
      { name: "Jane Smith", status: "Pending" },
    ]}
    maxVisibleRows={5}
  />
);

const MultiSelectPreview: React.FC = () => (
  <MultiSelect
    items={[
      { value: "react", label: "React", desc: "UI Library" },
      { value: "vue", label: "Vue", desc: "Framework" },
    ]}
    maxSelect={2}
    showProgress={false}
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
        usage: `import { SimpleButton } from 'siddcn';

<SimpleButton label="Click me" />`,
        props: {
          label: {
            type: "string",
            required: true,
            description: "Button label text",
          },
        },
      },
      {
        id: "primary",
        name: "Primary Button",
        description: "A styled primary action button",
        preview: PrimaryButton,
        installCommand: "npx siddcn add button-primary",
        usage: `import { PrimaryButton } from 'siddcn';

<PrimaryButton label="Submit" />`,
      },
      {
        id: "danger",
        name: "Danger Button",
        description: "A button for destructive actions",
        preview: DangerButton,
        installCommand: "npx siddcn add button-danger",
        usage: `import { DangerButton } from 'siddcn';

<DangerButton label="Delete" />`,
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
        usage: `import { LinearProgress } from 'siddcn';

<LinearProgress value={75} max={100} />`,
      },
      {
        id: "circular",
        name: "Circular Progress",
        description: "A circular/spinner progress indicator",
        preview: CircularProgress,
        installCommand: "npx siddcn add progress-circular",
        usage: `import { CircularProgress } from 'siddcn';

<CircularProgress percentage={60} />`,
      },
      {
        id: "step",
        name: "Step Progress",
        description: "Multi-step progress indicator",
        preview: StepProgress,
        installCommand: "npx siddcn add progress-step",
        usage: `import { StepProgress } from 'siddcn';

<StepProgress />`,
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
        usage: `import { StatusBadge } from 'siddcn';

<StatusBadge status="success" />`,
      },
      {
        id: "count",
        name: "Count Badge",
        description: "Display numerical count",
        preview: CountBadge,
        installCommand: "npx siddcn add badge-count",
        usage: `import { CountBadge } from 'siddcn';

<CountBadge count={42} />`,
      },
      {
        id: "dot",
        name: "Dot Badge",
        description: "Simple dot indicator",
        preview: DotBadge,
        installCommand: "npx siddcn add badge-dot",
        usage: `import { DotBadge } from 'siddcn';

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
        usage: `import { BarChart } from 'siddcn';

<BarChart />`,
      },
      {
        id: "line",
        name: "Line Chart",
        description: "Display data as a line graph",
        preview: LineChart,
        installCommand: "npx siddcn add chart-line",
        usage: `import { LineChart } from 'siddcn';

<LineChart />`,
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
        description: "File system hierarchy with vim navigation",
        preview: FileTreePreview,
        installCommand: "npx siddcn add tree-file",
        usage: `import { FileTree } from 'siddcn';

const tree = {
  name: 'project',
  type: 'dir',
  children: [
    { name: 'src', type: 'dir', children: [] }
  ]
};

<FileTree data={tree} />`,
      },
      {
        id: "data",
        name: "Data Tree",
        description: "Hierarchical data with expandable nodes",
        preview: DataTreePreview,
        installCommand: "npx siddcn add tree-data",
        usage: `import { DataTree } from 'siddcn';

<DataTree data={treeData} />`,
      },
    ],
  },

  tabs: {
    id: "tabs",
    name: "Tabs",
    description: "Tabbed navigation with multiple styles",
    icon: "📑",
    variants: [
      {
        id: "modern",
        name: "Modern Tabs",
        description: "Clean modern tab interface",
        preview: TabsModernPreview,
        installCommand: "npx siddcn add tabs-modern",
        usage: `import { Tabs } from 'siddcn';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <YourContent /> }
];

<Tabs tabs={tabs} style="modern" />`,
      },
      {
        id: "rounded",
        name: "Rounded Tabs",
        description: "Tabs with rounded borders",
        preview: TabsRoundedPreview,
        installCommand: "npx siddcn add tabs-rounded",
        usage: `import { Tabs } from 'siddcn';

<Tabs tabs={tabs} style="rounded" />`,
      },
      {
        id: "pills",
        name: "Pill Tabs",
        description: "Pill-shaped tab buttons",
        preview: TabsPillsPreview,
        installCommand: "npx siddcn add tabs-pills",
        usage: `import { Tabs } from 'siddcn';

<Tabs tabs={tabs} style="pills" />`,
      },
    ],
  },

  table: {
    id: "table",
    name: "Table",
    description: "Scrollable data grid",
    icon: "📋",
    variants: [
      {
        id: "default",
        name: "Data Table",
        description: "Scrollable table with row selection",
        preview: TablePreview,
        installCommand: "npx siddcn add table",
        usage: `import { Table } from 'siddcn';

const columns = [
  { key: 'name', header: 'Name', width: 20 }
];

<Table columns={columns} data={data} />`,
      },
    ],
  },

  multiselect: {
    id: "multiselect",
    name: "Multi-Select",
    description: "Multiple item selection with limits",
    icon: "☑️",
    variants: [
      {
        id: "default",
        name: "Multi-Select List",
        description: "Select multiple items with optional limits",
        preview: MultiSelectPreview,
        installCommand: "npx siddcn add multiselect",
        usage: `import { MultiSelect } from 'siddcn';

const items = [
  { value: 'opt1', label: 'Option 1', desc: 'Description' }
];

<MultiSelect items={items} maxSelect={2} />`,
      },
    ],
  },
};

export function getCategories(): ComponentCategory[] {
  return Object.values(componentRegistry);
}

export function getCategory(categoryId: string): ComponentCategory | undefined {
  return componentRegistry[categoryId];
}

export function getVariant(
  categoryId: string,
  variantId: string,
): ComponentVariant | undefined {
  const category = getCategory(categoryId);
  return category?.variants.find((v) => v.id === variantId);
}
