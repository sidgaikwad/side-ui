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
import { SimpleButton, PrimaryButton, DangerButton, GlowButton, PulseButton, IconButton } from "./buttons";
import { LinearProgress, CircularProgress, StepProgress } from "./progress";
import { StatusBadge, CountBadge, DotBadge } from "./badges";
import { BarChart, LineChart } from "./charts";
import { FileTree, DataTree } from "./trees";
import { Tabs, DashboardTab, AnalyticsTab, SettingsTab } from "./tabs";
import { Table } from "./table";
import { MultiSelect } from "./multiselect";
import { DotsSpinner, BouncingSpinner, PulseSpinner, BarSpinner, WaveSpinner } from "./spinners";
import { BasicInput, PasswordInput, SearchInput, TextInputPreview } from "./text-input";
import { BasicCard, InfoCard, WarningCard, SuccessCard, ErrorCard, GlowCard, CardPreview } from "./cards";
import { BasicSelect, SelectPreview } from "./select";
import { TwinklingStars, MatrixRain } from "./backgrounds";
import { TypewriterText, LoadingDots, AnimatedTextPreview } from "./animated-text";
import { Toast, Banner, InlineNotification, ProgressNotification, NotificationPreview } from "./notifications";

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
      {
        id: "glow",
        name: "Glow Button",
        description: "Animated glowing border button",
        preview: GlowButton,
        installCommand: "npx siddcn add button-glow",
        usage: `import { GlowButton } from 'siddcn';

<GlowButton label="Glow" />`,
      },
      {
        id: "pulse",
        name: "Pulse Button",
        description: "Pulsating animated button",
        preview: PulseButton,
        installCommand: "npx siddcn add button-pulse",
        usage: `import { PulseButton } from 'siddcn';

<PulseButton label="Pulse" />`,
      },
      {
        id: "icon",
        name: "Icon Button",
        description: "Button with leading icon",
        preview: IconButton,
        installCommand: "npx siddcn add button-icon",
        usage: `import { IconButton } from 'siddcn';

<IconButton label="Action" icon=">" />`,
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

  spinners: {
    id: "spinners",
    name: "Spinners",
    description: "Animated loading indicators",
    icon: "⟳",
    variants: [
      {
        id: "dots",
        name: "Dots Spinner",
        description: "Classic dots animation spinner",
        preview: DotsSpinner,
        installCommand: "npx siddcn add spinner-dots",
        usage: `import { DotsSpinner } from 'siddcn';

<DotsSpinner text="Loading..." />`,
      },
      {
        id: "bounce",
        name: "Bouncing Spinner",
        description: "Bouncing animation effect",
        preview: BouncingSpinner,
        installCommand: "npx siddcn add spinner-bounce",
        usage: `import { BouncingSpinner } from 'siddcn';

<BouncingSpinner text="Processing..." />`,
      },
      {
        id: "pulse",
        name: "Pulse Spinner",
        description: "Pulsating circle animation",
        preview: PulseSpinner,
        installCommand: "npx siddcn add spinner-pulse",
        usage: `import { PulseSpinner } from 'siddcn';

<PulseSpinner text="Working..." />`,
      },
      {
        id: "bar",
        name: "Bar Spinner",
        description: "Animated sliding bar",
        preview: BarSpinner,
        installCommand: "npx siddcn add spinner-bar",
        usage: `import { BarSpinner } from 'siddcn';

<BarSpinner width={20} />`,
      },
      {
        id: "wave",
        name: "Wave Spinner",
        description: "Wave animation effect",
        preview: WaveSpinner,
        installCommand: "npx siddcn add spinner-wave",
        usage: `import { WaveSpinner } from 'siddcn';

<WaveSpinner />`,
      },
    ],
  },

  textinput: {
    id: "textinput",
    name: "Text Input",
    description: "Text input fields with various styles",
    icon: "✎",
    variants: [
      {
        id: "basic",
        name: "Basic Input",
        description: "Simple text input with blinking cursor",
        preview: TextInputPreview,
        installCommand: "npx siddcn add input-basic",
        usage: `import { BasicInput } from 'siddcn';

<BasicInput 
  label="Name"
  placeholder="Enter your name..."
  onChange={(value) => console.log(value)}
/>`,
      },
      {
        id: "password",
        name: "Password Input",
        description: "Masked password input",
        preview: PasswordInput,
        installCommand: "npx siddcn add input-password",
        usage: `import { PasswordInput } from 'siddcn';

<PasswordInput 
  label="Password"
  onSubmit={(value) => handlePassword(value)}
/>`,
      },
      {
        id: "search",
        name: "Search Input",
        description: "Search-style input with icon",
        preview: SearchInput,
        installCommand: "npx siddcn add input-search",
        usage: `import { SearchInput } from 'siddcn';

<SearchInput 
  placeholder="Search..."
  onSubmit={(query) => search(query)}
/>`,
      },
    ],
  },

  cards: {
    id: "cards",
    name: "Cards",
    description: "Container components for content",
    icon: "◰",
    variants: [
      {
        id: "basic",
        name: "Basic Card",
        description: "Simple card with title and content",
        preview: CardPreview,
        installCommand: "npx siddcn add card-basic",
        usage: `import { BasicCard } from 'siddcn';

<BasicCard title="Card Title" subtitle="Subtitle">
  <Text>Card content here</Text>
</BasicCard>`,
      },
      {
        id: "info",
        name: "Info Card",
        description: "Card for informational content",
        preview: InfoCard,
        installCommand: "npx siddcn add card-info",
        usage: `import { InfoCard } from 'siddcn';

<InfoCard title="Information">
  <Text>Important info here</Text>
</InfoCard>`,
      },
      {
        id: "warning",
        name: "Warning Card",
        description: "Animated warning card",
        preview: WarningCard,
        installCommand: "npx siddcn add card-warning",
        usage: `import { WarningCard } from 'siddcn';

<WarningCard title="Warning">
  <Text>Warning message</Text>
</WarningCard>`,
      },
      {
        id: "success",
        name: "Success Card",
        description: "Success confirmation card",
        preview: SuccessCard,
        installCommand: "npx siddcn add card-success",
        usage: `import { SuccessCard } from 'siddcn';

<SuccessCard title="Success!">
  <Text>Operation completed</Text>
</SuccessCard>`,
      },
      {
        id: "error",
        name: "Error Card",
        description: "Animated error card",
        preview: ErrorCard,
        installCommand: "npx siddcn add card-error",
        usage: `import { ErrorCard } from 'siddcn';

<ErrorCard title="Error">
  <Text>Error message</Text>
</ErrorCard>`,
      },
      {
        id: "glow",
        name: "Glow Card",
        description: "Card with animated glowing border",
        preview: GlowCard,
        installCommand: "npx siddcn add card-glow",
        usage: `import { GlowCard } from 'siddcn';

<GlowCard title="Featured">
  <Text>Highlighted content</Text>
</GlowCard>`,
      },
    ],
  },

  select: {
    id: "select",
    name: "Select",
    description: "Selection input components",
    icon: "▽",
    variants: [
      {
        id: "basic",
        name: "Basic Select",
        description: "Simple list selection",
        preview: SelectPreview,
        installCommand: "npx siddcn add select-basic",
        usage: `import { BasicSelect } from 'siddcn';

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' }
];

<BasicSelect options={options} onChange={(v) => setSelected(v)} />`,
      },
      {
        id: "radio",
        name: "Radio Select",
        description: "Radio button style selection",
        preview: SelectPreview,
        installCommand: "npx siddcn add select-radio",
        usage: `import { RadioSelect } from 'siddcn';

<RadioSelect 
  options={options} 
  label="Choose one"
  onChange={(v) => setSelected(v)} 
/>`,
        props: {
          options: {
            type: "SelectOption[]",
            required: true,
            description: "Array of options",
          },
        },
      },
      {
        id: "dropdown",
        name: "Dropdown Select",
        description: "Collapsible dropdown menu",
        preview: SelectPreview,
        installCommand: "npx siddcn add select-dropdown",
        usage: `import { DropdownSelect } from 'siddcn';

<DropdownSelect 
  options={options}
  placeholder="Select..."
  onChange={(v) => setSelected(v)} 
/>`,
      },
    ],
  },

  backgrounds: {
    id: "backgrounds",
    name: "Backgrounds",
    description: "Animated background effects",
    icon: "✧",
    variants: [
      {
        id: "stars",
        name: "Twinkling Stars",
        description: "Animated starfield background",
        preview: TwinklingStars,
        installCommand: "npx siddcn add bg-stars",
        usage: `import { TwinklingStars } from 'siddcn';

<TwinklingStars width={60} density={0.15} />`,
      },
      {
        id: "matrix",
        name: "Matrix Rain",
        description: "Matrix-style falling characters",
        preview: MatrixRain,
        installCommand: "npx siddcn add bg-matrix",
        usage: `import { MatrixRain } from 'siddcn';

<MatrixRain width={60} height={5} />`,
      },
    ],
  },

  animatedtext: {
    id: "animatedtext",
    name: "Animated Text",
    description: "Text with animation effects",
    icon: "A",
    variants: [
      {
        id: "typewriter",
        name: "Typewriter",
        description: "Character-by-character typing effect",
        preview: AnimatedTextPreview,
        installCommand: "npx siddcn add text-typewriter",
        usage: `import { TypewriterText } from 'siddcn';

<TypewriterText 
  text="Hello, World!" 
  speed={50} 
  onComplete={() => console.log('Done!')}
/>`,
      },
      {
        id: "gradient",
        name: "Gradient Text",
        description: "Animated color cycling gradient",
        preview: AnimatedTextPreview,
        installCommand: "npx siddcn add text-gradient",
        usage: `import { GradientText } from 'siddcn';

<GradientText text="Rainbow Text" />`,
      },
      {
        id: "pulse",
        name: "Pulsing Text",
        description: "Fading in and out effect",
        preview: AnimatedTextPreview,
        installCommand: "npx siddcn add text-pulse",
        usage: `import { PulsingText } from 'siddcn';

<PulsingText text="Pulsing..." />`,
      },
      {
        id: "loading",
        name: "Loading Dots",
        description: "Loading text with animated dots",
        preview: LoadingDots,
        installCommand: "npx siddcn add text-loading",
        usage: `import { LoadingDots } from 'siddcn';

<LoadingDots text="Processing" />`,
      },
      {
        id: "marquee",
        name: "Marquee Text",
        description: "Scrolling marquee effect",
        preview: AnimatedTextPreview,
        installCommand: "npx siddcn add text-marquee",
        usage: `import { MarqueeText } from 'siddcn';

<MarqueeText text="Breaking news!" width={20} />`,
      },
    ],
  },

  notifications: {
    id: "notifications",
    name: "Notifications",
    description: "Alert and notification components",
    icon: "!",
    variants: [
      {
        id: "toast",
        name: "Toast",
        description: "Popup toast notification",
        preview: NotificationPreview,
        installCommand: "npx siddcn add notif-toast",
        usage: `import { Toast } from 'siddcn';

<Toast 
  type="success"
  title="Saved!"
  message="Your changes have been saved"
  duration={3000}
/>`,
      },
      {
        id: "banner",
        name: "Banner",
        description: "Full-width banner notification",
        preview: Banner,
        installCommand: "npx siddcn add notif-banner",
        usage: `import { Banner } from 'siddcn';

<Banner type="warning" message="Low disk space warning" />`,
      },
      {
        id: "inline",
        name: "Inline",
        description: "Inline notification message",
        preview: InlineNotification,
        installCommand: "npx siddcn add notif-inline",
        usage: `import { InlineNotification } from 'siddcn';

<InlineNotification 
  type="error" 
  message="Invalid input detected" 
/>`,
      },
      {
        id: "progress",
        name: "Progress Notification",
        description: "Notification with progress bar",
        preview: ProgressNotification,
        installCommand: "npx siddcn add notif-progress",
        usage: `import { ProgressNotification } from 'siddcn';

<ProgressNotification 
  title="Uploading"
  progress={45}
  status="Uploading file.txt..."
/>`,
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
