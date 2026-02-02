# 📚 Adding New Component Types to Siddcn

This guide explains how to add new component types to the siddcn library. The architecture is designed to be **extremely extensible** - adding a new component type requires minimal changes.

## 🎯 Quick Overview

To add a new component type, you need to:

1. Create the component implementation
2. Add it to the registry
3. That's it! ✨

The navigation system automatically discovers and integrates your new components.

## 📝 Step-by-Step Guide

### Step 1: Create Component Directory

Create a new directory for your component type:

```bash
cd packages/siddcn/src/components
mkdir accordions  # or whatever your component type is called
```

### Step 2: Implement Your Components

Create an `index.tsx` file with your component variants:

```typescript
// packages/siddcn/src/components/accordions/index.tsx
import React from 'react';
import { Box, Text } from 'ink';

export const SimpleAccordion: React.FC = () => {
  return (
    <Box flexDirection="column">
      <Text bold color="cyan">▶ Accordion Header</Text>
      <Box marginLeft={2}>
        <Text>This is the accordion content</Text>
      </Box>
    </Box>
  );
};

export const MultiAccordion: React.FC = () => {
  return (
    <Box flexDirection="column">
      <Text bold color="cyan">▼ Section 1</Text>
      <Box marginLeft={2} flexDirection="column">
        <Text>Content for section 1</Text>
      </Box>
      <Text bold color="cyan" marginTop={1}>▶ Section 2</Text>
      <Text bold color="cyan" marginTop={1}>▶ Section 3</Text>
    </Box>
  );
};
```

**Tips for Component Implementation:**
- Use Ink's `<Box>` and `<Text>` components
- Follow React best practices
- Keep components stateless for previews (state can be in actual usage)
- Use colors to make components visually appealing
- Test in the terminal to ensure proper rendering

### Step 3: Register Your Components

Add your component type to the registry:

```typescript
// packages/siddcn/src/components/registry.ts

// 1. Import your components
import { SimpleAccordion, MultiAccordion } from '../components/accordions';

// 2. Add entry to componentRegistry
export const componentRegistry: ComponentRegistry = {
  // ... existing entries ...
  
  'accordions': {
    id: 'accordions',
    name: 'Accordions',
    description: 'Collapsible content sections',
    icon: '📂',
    variants: [
      {
        id: 'simple',
        name: 'Simple Accordion',
        description: 'A single collapsible section',
        preview: SimpleAccordion,
        installCommand: 'npx siddcn add accordion-simple',
        usage: `import { Accordion } from 'siddcn/accordion';

<Accordion title="Click to expand">
  Your content here
</Accordion>`,
        props: {
          title: {
            type: 'string',
            required: true,
            description: 'Accordion header text'
          },
          defaultOpen: {
            type: 'boolean',
            required: false,
            default: 'false',
            description: 'Whether accordion starts open'
          }
        }
      },
      {
        id: 'multi',
        name: 'Multi-section Accordion',
        description: 'Multiple collapsible sections',
        preview: MultiAccordion,
        installCommand: 'npx siddcn add accordion-multi',
        usage: `import { MultiAccordion } from 'siddcn/accordion';

<MultiAccordion
  sections={[
    { title: 'Section 1', content: '...' },
    { title: 'Section 2', content: '...' }
  ]}
/>`,
      }
    ]
  }
};
```

### Step 4: Export Your Components (Optional)

If you want users to be able to import your components:

```typescript
// packages/siddcn/src/index.ts

export * from './components/accordions';
```

### Step 5: Test Your Components

Run the CLI to see your new components:

```bash
cd packages/siddcn
npm run dev
```

Navigate through the menu to find your new component type!

## 📋 Registry Entry Reference

Each component category has the following structure:

```typescript
{
  id: string;              // Unique identifier (kebab-case)
  name: string;            // Display name
  description: string;     // Brief description
  icon: string;            // Emoji icon for the menu
  variants: [              // Array of component variants
    {
      id: string;          // Variant identifier
      name: string;        // Variant display name
      description: string; // Variant description
      preview: Component;  // React component for preview
      installCommand: string; // CLI install command
      usage: string;       // Code example
      props?: {            // Optional: prop documentation
        propName: {
          type: string;
          required: boolean;
          default?: string;
          description: string;
        }
      }
    }
  ]
}
```

## 🎨 Best Practices

### Component Implementation

1. **Keep it simple**: Preview components should be straightforward
2. **Use colors wisely**: Make components visually distinct but not overwhelming
3. **Consider terminal constraints**: Remember you're in a terminal, not a browser
4. **Test different sizes**: Test your components in different terminal window sizes

### Registry Configuration

1. **Choose good IDs**: Use kebab-case, be descriptive
2. **Write clear descriptions**: Help users understand what the component does
3. **Provide usage examples**: Show realistic, copy-paste ready code
4. **Document props**: If your component has props, document them thoroughly

### Icons

Choose appropriate emoji icons for your component categories:
- 🔘 Buttons
- 📊 Progress/Charts
- 🏷️ Badges/Labels
- 🌳 Trees/Hierarchies
- 📂 Accordions/Collapsible
- 📝 Forms/Inputs
- 🎨 Visual/Design elements
- ⚙️ Settings/Config

## 🔄 Component Variants

Each component category can have multiple variants. Use variants to show:

- Different styles (primary, secondary, danger)
- Different sizes (small, medium, large)
- Different states (active, disabled, loading)
- Different layouts (vertical, horizontal, grid)

Example:
```typescript
variants: [
  { id: 'small', name: 'Small Button', ... },
  { id: 'medium', name: 'Medium Button', ... },
  { id: 'large', name: 'Large Button', ... }
]
```

## 🚀 Advanced: Interactive Components

For components that need interactivity in the preview:

```typescript
import { useState } from 'react';
import { useInput } from 'ink';

export const InteractiveAccordion: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  useInput((input) => {
    if (input === ' ') {
      setOpen(!open);
    }
  });
  
  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        {open ? '▼' : '▶'} Accordion (press space)
      </Text>
      {open && (
        <Box marginLeft={2}>
          <Text>This content can be toggled!</Text>
        </Box>
      )}
    </Box>
  );
};
```

## 📚 Examples

Check out the existing component types for reference:

- **Buttons** (`src/components/buttons/`) - Simple components
- **Progress** (`src/components/progress/`) - Animated components
- **Charts** (`src/components/charts/`) - Data visualization
- **Trees** (`src/components/trees/`) - Hierarchical layouts

## 🐛 Troubleshooting

### Component doesn't appear in menu
- Check that you added it to `componentRegistry`
- Verify the registry import path is correct
- Make sure there are no TypeScript errors

### Component renders incorrectly
- Test with `npm run dev` directly
- Check terminal size and colors support
- Verify Ink components are used correctly

### Props don't show in detail view
- Ensure `props` object is defined in the variant
- Check the prop definition structure matches the type

## 🎉 That's It!

You've successfully added a new component type to siddcn! The navigation system will automatically:

- ✅ Show it in the main menu
- ✅ Create a category view for variants
- ✅ Display detailed view with preview
- ✅ Show installation and usage instructions

The architecture is designed to make this process as smooth as possible. Happy component building! 🚀
