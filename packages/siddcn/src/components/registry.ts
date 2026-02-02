/**
 * Component Registry
 * 
 * This is the central registry for all TUI components.
 * To add a new component type:
 * 1. Create your component files in src/components/[type]/
 * 2. Add an entry here with variants
 * 3. That's it! The navigation system auto-discovers it.
 */

import React from 'react';
import { ComponentRegistry } from '../types';

// Import component variants
import { SimpleButton, PrimaryButton, DangerButton } from '../components/buttons';
import { LinearProgress, CircularProgress, StepProgress } from '../components/progress';
import { StatusBadge, CountBadge, DotBadge } from '../components/badges';
import { BarChart, LineChart } from '../components/charts';
import { FileTree, DataTree } from '../components/trees';

export const componentRegistry: ComponentRegistry = {
  'buttons': {
    id: 'buttons',
    name: 'Buttons',
    description: 'Interactive button components with various styles',
    icon: '🔘',
    variants: [
      {
        id: 'simple',
        name: 'Simple Button',
        description: 'A basic button component',
        preview: SimpleButton,
        installCommand: 'npx siddcn add button-simple',
        usage: `import { Button } from 'siddcn/button';

<Button onPress={() => console.log('Clicked!')}>
  Click me
</Button>`,
        props: {
          label: {
            type: 'string',
            required: true,
            description: 'Button label text'
          },
          onPress: {
            type: '() => void',
            required: false,
            description: 'Click handler function'
          }
        }
      },
      {
        id: 'primary',
        name: 'Primary Button',
        description: 'A styled primary action button',
        preview: PrimaryButton,
        installCommand: 'npx siddcn add button-primary',
        usage: `import { PrimaryButton } from 'siddcn/button';

<PrimaryButton onPress={handleSubmit}>
  Submit
</PrimaryButton>`,
        props: {
          label: {
            type: 'string',
            required: true,
            description: 'Button label text'
          },
          variant: {
            type: '"primary" | "secondary"',
            required: false,
            default: 'primary',
            description: 'Button variant style'
          }
        }
      },
      {
        id: 'danger',
        name: 'Danger Button',
        description: 'A button for destructive actions',
        preview: DangerButton,
        installCommand: 'npx siddcn add button-danger',
        usage: `import { DangerButton } from 'siddcn/button';

<DangerButton onPress={handleDelete}>
  Delete
</DangerButton>`,
      }
    ]
  },
  
  'progress': {
    id: 'progress',
    name: 'Progress Bars',
    description: 'Progress indicators and loading states',
    icon: '📊',
    variants: [
      {
        id: 'linear',
        name: 'Linear Progress',
        description: 'A horizontal progress bar',
        preview: LinearProgress,
        installCommand: 'npx siddcn add progress-linear',
        usage: `import { LinearProgress } from 'siddcn/progress';

<LinearProgress value={75} max={100} />`,
        props: {
          value: {
            type: 'number',
            required: true,
            description: 'Current progress value'
          },
          max: {
            type: 'number',
            required: false,
            default: '100',
            description: 'Maximum value'
          }
        }
      },
      {
        id: 'circular',
        name: 'Circular Progress',
        description: 'A circular/spinner progress indicator',
        preview: CircularProgress,
        installCommand: 'npx siddcn add progress-circular',
        usage: `import { CircularProgress } from 'siddcn/progress';

<CircularProgress percentage={60} />`,
      },
      {
        id: 'step',
        name: 'Step Progress',
        description: 'Multi-step progress indicator',
        preview: StepProgress,
        installCommand: 'npx siddcn add progress-step',
        usage: `import { StepProgress } from 'siddcn/progress';

<StepProgress 
  steps={['Step 1', 'Step 2', 'Step 3']} 
  currentStep={2} 
/>`,
      }
    ]
  },

  'badges': {
    id: 'badges',
    name: 'Badges',
    description: 'Status indicators and labels',
    icon: '🏷️',
    variants: [
      {
        id: 'status',
        name: 'Status Badge',
        description: 'Display status with color coding',
        preview: StatusBadge,
        installCommand: 'npx siddcn add badge-status',
        usage: `import { StatusBadge } from 'siddcn/badge';

<StatusBadge status="success">Active</StatusBadge>`,
      },
      {
        id: 'count',
        name: 'Count Badge',
        description: 'Display numerical count',
        preview: CountBadge,
        installCommand: 'npx siddcn add badge-count',
        usage: `import { CountBadge } from 'siddcn/badge';

<CountBadge count={42} />`,
      },
      {
        id: 'dot',
        name: 'Dot Badge',
        description: 'Simple dot indicator',
        preview: DotBadge,
        installCommand: 'npx siddcn add badge-dot',
        usage: `import { DotBadge } from 'siddcn/badge';

<DotBadge color="green" />`,
      }
    ]
  },

  'charts': {
    id: 'charts',
    name: 'Charts',
    description: 'Data visualization components',
    icon: '📈',
    variants: [
      {
        id: 'bar',
        name: 'Bar Chart',
        description: 'Display data as vertical bars',
        preview: BarChart,
        installCommand: 'npx siddcn add chart-bar',
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
        id: 'line',
        name: 'Line Chart',
        description: 'Display data as a line graph',
        preview: LineChart,
        installCommand: 'npx siddcn add chart-line',
        usage: `import { LineChart } from 'siddcn/chart';

<LineChart 
  data={[10, 20, 15, 30, 25]} 
/>`,
      }
    ]
  },

  'trees': {
    id: 'trees',
    name: 'Trees',
    description: 'Hierarchical data structures',
    icon: '🌳',
    variants: [
      {
        id: 'file',
        name: 'File Tree',
        description: 'Display file system hierarchy',
        preview: FileTree,
        installCommand: 'npx siddcn add tree-file',
        usage: `import { FileTree } from 'siddcn/tree';

<FileTree 
  root="/project"
  structure={fileStructure}
/>`,
      },
      {
        id: 'data',
        name: 'Data Tree',
        description: 'Display hierarchical data',
        preview: DataTree,
        installCommand: 'npx siddcn add tree-data',
        usage: `import { DataTree } from 'siddcn/tree';

<DataTree 
  data={treeData}
  expandable
/>`,
      }
    ]
  }
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
export function getVariant(categoryId: string, variantId: string): ComponentVariant | undefined {
  const category = getCategory(categoryId);
  return category?.variants.find(v => v.id === variantId);
}
