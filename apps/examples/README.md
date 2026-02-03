# 🎨 Siddcn Examples

Live examples showing how to use siddcn components in real TUI applications.

## 📦 What's Included

### 1. **Dashboard Demo** (`examples/dashboard.tsx`)
A real-time system monitoring dashboard with:
- CPU, Memory, and Disk usage meters
- Auto-updating progress bars
- System status badges
- Live data simulation

### 2. **Form Demo** (`examples/form.tsx`)
Interactive user registration form featuring:
- Text input fields
- Tab navigation between fields
- Form validation
- Submit handling
- Success confirmation

### 3. **Progress Demo** (`examples/progress-demo.tsx`)
Comprehensive progress indicator showcase:
- Multiple progress bars with different speeds
- Linear progress bars
- Circular progress indicators
- Step progress animation
- Auto-looping demos

### 4. **Component Playground** (`examples/playground.tsx`)
Interactive component browser:
- Navigate through all component types
- Live component previews
- Interactive controls (+/- for progress)
- Side-by-side layout

## 🚀 Quick Start

### Run All Examples Menu

```bash
# From monorepo root
pnpm --filter examples dev
```

### Run Individual Examples

```bash
# Dashboard
pnpm --filter examples dev:dashboard

# Form
pnpm --filter examples dev:form

# Progress Demo
pnpm --filter examples dev:progress

# Playground
pnpm --filter examples dev:playground
```

## 🎯 How to Use

### From Monorepo Root

```bash
# Install dependencies first
pnpm install

# Run any example
pnpm --filter examples dev:dashboard
```

### From Examples Directory

```bash
cd apps/examples

# Run specific example
pnpm dev:dashboard
pnpm dev:form
pnpm dev:progress
pnpm dev:playground
```

## 📚 Learning from Examples

### Example 1: Basic Component Usage (Dashboard)

```typescript
import { LinearProgress, StatusBadge } from 'siddcn';

// Use progress bars
<LinearProgress value={75} max={100} />

// Use status badges
<StatusBadge status="success" />
```

### Example 2: Interactive Forms (Form Demo)

```typescript
import { PrimaryButton, SimpleButton } from 'siddcn';
import TextInput from 'ink-text-input';

// Combine native Ink components with siddcn
<TextInput value={name} onChange={setName} />
<PrimaryButton label="Submit" />
```

### Example 3: Real-time Updates (Progress Demo)

```typescript
// Animate progress with state
const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress(prev => prev >= 100 ? 0 : prev + 5);
  }, 200);
  return () => clearInterval(interval);
}, []);

<LinearProgress value={progress} max={100} animated={false} />
```

## 🛠️ Creating Your Own Example

### Step 1: Create Example File

Create `examples/my-app.tsx`:

```typescript
#!/usr/bin/env node
import React from 'react';
import { render, Box, Text } from 'ink';
import { SimpleButton, LinearProgress } from 'siddcn';

const MyApp = () => {
  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">My Custom App</Text>
      <SimpleButton label="Click Me" />
      <LinearProgress value={50} max={100} />
    </Box>
  );
};

render(<MyApp />);
```

### Step 2: Add Script to package.json

```json
{
  "scripts": {
    "dev:my-app": "tsx examples/my-app.tsx"
  }
}
```

### Step 3: Run It

```bash
pnpm dev:my-app
```

## 📖 Example Walkthroughs

### Dashboard Example Explained

**Purpose**: Show how to build a real-time monitoring dashboard

**Key Concepts**:
- Multiple progress bars for different metrics
- Auto-updating data with `useEffect` and `setInterval`
- Status badges for system health
- Organized layout with borders

**Code Highlights**:
```typescript
// Auto-update every 2 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCpuUsage(Math.floor(Math.random() * 100));
  }, 2000);
  return () => clearInterval(interval);
}, []);
```

### Form Example Explained

**Purpose**: Demonstrate form handling in TUI

**Key Concepts**:
- Tab navigation between fields
- State management for form data
- Submit handling
- Conditional rendering for success state

**Code Highlights**:
```typescript
// Tab navigation
useInput((input, key) => {
  if (key.tab) {
    if (currentField === 'name') setCurrentField('email');
    else if (currentField === 'email') setCurrentField('submit');
  }
});
```

### Progress Demo Explained

**Purpose**: Showcase all progress component variants

**Key Concepts**:
- Multiple concurrent animations
- Different update speeds
- Auto-looping progress
- Component combinations

**Code Highlights**:
```typescript
// Different speeds for different bars
const interval1 = setInterval(() => {
  setProgress1((prev) => (prev >= 100 ? 0 : prev + 5));
}, 200);

const interval2 = setInterval(() => {
  setProgress2((prev) => (prev >= 100 ? 0 : prev + 3));
}, 150);
```

### Playground Explained

**Purpose**: Interactive component browser

**Key Concepts**:
- Component selection with keyboard
- Side-by-side layout
- Interactive controls
- Component switching

**Code Highlights**:
```typescript
// Navigate components
useInput((input, key) => {
  if (key.upArrow) {
    setSelectedComponent(prev => Math.max(0, prev - 1));
  }
});

// Render selected component
const renderComponent = () => {
  switch (selectedComponent) {
    case 0: return <SimpleButton />;
    case 1: return <LinearProgress />;
    // ...
  }
};
```

## 🎨 Available Components to Test

All siddcn components are available:

### Buttons
- `SimpleButton`
- `PrimaryButton`
- `DangerButton`

### Progress
- `LinearProgress`
- `CircularProgress`
- `StepProgress`

### Badges
- `StatusBadge`
- `CountBadge`
- `DotBadge`

### Charts
- `BarChart`
- `LineChart`

### Trees
- `FileTree`
- `DataTree`

## 🐛 Troubleshooting

### "Cannot find module 'siddcn'"

**Solution**: Make sure you've installed dependencies:
```bash
pnpm install
```

### Example won't run

**Solution**: Build the siddcn package first:
```bash
cd ../../packages/siddcn
pnpm run build
cd ../../apps/examples
pnpm dev:dashboard
```

### Components not rendering

**Solution**: Check that you're importing from 'siddcn':
```typescript
import { SimpleButton } from 'siddcn';  // ✓ Correct
import { SimpleButton } from '../components';  // ✗ Wrong
```

## 💡 Tips

1. **Start simple**: Begin with the playground to see all components
2. **Learn by example**: Check dashboard.tsx for real-world usage
3. **Experiment**: Modify examples to test different configurations
4. **Copy patterns**: Use these as templates for your own apps
5. **Test components**: Perfect place to test before using in production

## 📝 Next Steps

1. Run each example to see components in action
2. Modify examples to experiment
3. Create your own example app
4. Build a real TUI application using siddcn!

## 🎯 Common Use Cases

### Building a CLI Tool
Use the **form example** as a starting point

### Creating a Dashboard
Use the **dashboard example** as a template

### Progress Indication
Use the **progress demo** for loading states

### Component Testing
Use the **playground** to test components

---

Happy building! 🚀

For more info, check the main siddcn docs at `../../packages/siddcn/README.md`
