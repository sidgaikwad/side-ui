import { CodeBlock } from "@/components/CodeBlock";

export default function AddingComponentsPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-terminal-cyan">Adding Components</h1>

      <p className="lead text-xl text-terminal-text/80">
        Learn how to create and add your own components to siddcn.
      </p>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Component Structure
      </h2>

      <p className="text-terminal-text/70">
        Each component in siddcn follows a specific structure:
      </p>

      <CodeBlock
        code={`src/components/
├── mycomponent/
│   └── index.tsx      # Component implementation
├── registry.tsx       # Component registry
└── index.ts           # Exports`}
        language="text"
        filename="Directory Structure"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Step 1: Create the Component
      </h2>

      <CodeBlock
        code={`// src/components/mycomponent/index.tsx
import React from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

interface MyComponentProps {
  title: string;
  value?: number;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  value = 0 
}) => {
  const theme = getTheme();
  
  return (
    <Box 
      borderStyle={theme.borderStyle} 
      borderColor={theme.colors.border}
      padding={1}
    >
      <Text color={theme.colors.primary} bold>
        {title}
      </Text>
      <Text color={theme.colors.text}>: {value}</Text>
    </Box>
  );
};`}
        language="tsx"
        filename="src/components/mycomponent/index.tsx"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Step 2: Add to Registry
      </h2>

      <p className="text-terminal-text/70">
        Register your component in the registry for it to appear in the CLI browser:
      </p>

      <CodeBlock
        code={`// src/components/registry.tsx
import { MyComponent } from './mycomponent';

// Add preview wrapper
const MyComponentPreview: React.FC = () => (
  <MyComponent title="Demo" value={42} />
);

export const componentRegistry: ComponentRegistry = {
  // ... existing components
  
  mycomponent: {
    id: 'mycomponent',
    name: 'My Component',
    description: 'A custom component I created',
    icon: '✨',
    variants: [
      {
        id: 'default',
        name: 'Default',
        description: 'The default variant',
        preview: MyComponentPreview,
        installCommand: 'npx siddcn add mycomponent',
        usage: \`import { MyComponent } from 'siddcn';

<MyComponent title="Hello" value={100} />\`,
        props: {
          title: {
            type: 'string',
            required: true,
            description: 'The component title'
          },
          value: {
            type: 'number',
            required: false,
            default: '0',
            description: 'The numeric value'
          }
        }
      }
    ]
  }
};`}
        language="tsx"
        filename="src/components/registry.tsx"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Step 3: Export the Component
      </h2>

      <CodeBlock
        code={`// src/components/index.ts
export * from './buttons';
export * from './progress';
export * from './badges';
// ... other exports

// Add your component
export * from './mycomponent';`}
        language="tsx"
        filename="src/components/index.ts"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Registry Types
      </h2>

      <p className="text-terminal-text/70">
        Here are the type definitions for the registry:
      </p>

      <CodeBlock
        code={`interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  preview: React.FC;
  installCommand: string;
  usage: string;
  props?: Record<string, {
    type: string;
    required: boolean;
    default?: string;
    description: string;
  }>;
}

interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  variants: ComponentVariant[];
}

type ComponentRegistry = Record<string, ComponentCategory>;`}
        language="tsx"
        filename="src/types/index.ts"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Best Practices
      </h2>

      <ul className="space-y-2 text-terminal-text/70">
        <li>
          <strong className="text-terminal-cyan">Use the theme system</strong> -
          Always use <code className="text-terminal-green">getTheme()</code> for colors
          and border styles
        </li>
        <li>
          <strong className="text-terminal-cyan">Support keyboard navigation</strong> -
          Use <code className="text-terminal-green">useInput</code> from Ink for
          keyboard handling
        </li>
        <li>
          <strong className="text-terminal-cyan">Keep previews simple</strong> -
          Preview components should be stateless and show the component clearly
        </li>
        <li>
          <strong className="text-terminal-cyan">Document props</strong> - Include
          all props with types and descriptions in the registry
        </li>
        <li>
          <strong className="text-terminal-cyan">Add TypeScript types</strong> -
          Export interfaces for all component props
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Testing Your Component
      </h2>

      <CodeBlock
        code={`# Rebuild the package
npm run build

# Run the CLI to test
npm run start

# Or test in development
npm run dev`}
        language="bash"
        filename="Terminal"
      />
    </article>
  );
}
