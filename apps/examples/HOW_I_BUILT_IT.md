# 🏗️ How I Built the Examples App

A step-by-step guide showing my thought process and approach.

## 🎯 Goal

Create a standalone `examples` app in the monorepo where developers can:
1. Test siddcn components locally
2. See real-world usage patterns
3. Learn by example
4. Prototype their own TUI apps

## 📐 Architecture Decisions

### 1. **Monorepo Integration**

**Decision**: Make it a workspace package in `apps/examples`

**Why**:
- Easy access to siddcn package via `workspace:*`
- Follows monorepo best practices
- Can run independently but shares dependencies
- Build once, use everywhere

### 2. **Multiple Examples vs Single App**

**Decision**: Multiple example files + selector menu

**Why**:
- Each example focused on one concept
- Easy to run specific examples
- Developers can copy individual examples
- Menu provides discoverability

### 3. **Technology Stack**

**Choices**:
- ✅ TypeScript (type safety)
- ✅ TSX for development (fast iteration)
- ✅ Ink 4.4.1 (TUI framework)
- ✅ siddcn workspace dependency

**Why**:
- Consistent with main package
- Fast development with tsx
- No build step needed for development
- Direct workspace linking

## 🏗️ Building Process

### Step 1: Project Structure

\`\`\`
apps/examples/
├── package.json          # Dependencies and scripts
├── tsconfig.json        # TypeScript config
├── src/
│   └── index.tsx        # Main selector menu
├── examples/            # Individual examples
│   ├── dashboard.tsx
│   ├── form.tsx
│   ├── progress-demo.tsx
│   └── playground.tsx
└── README.md            # Documentation
\`\`\`

**Reasoning**:
- `src/` for the main entry point (selector)
- `examples/` for individual demos
- Each example is standalone and runnable
- Clear separation of concerns

### Step 2: Package Configuration

\`\`\`json
{
  "name": "examples",
  "private": true,
  "dependencies": {
    "siddcn": "workspace:*",  // ← Key: workspace dependency
    "ink": "^4.4.1",
    "react": "^18.3.1"
  },
  "scripts": {
    "dev": "tsx src/index.tsx",
    "dev:dashboard": "tsx examples/dashboard.tsx",
    "dev:form": "tsx examples/form.tsx",
    "dev:progress": "tsx examples/progress-demo.tsx",
    "dev:playground": "tsx examples/playground.tsx"
  }
}
\`\`\`

**Key Points**:
- `workspace:*` links to local siddcn package
- Each example gets its own script
- Using `tsx` for direct TypeScript execution
- No build step needed for development

### Step 3: Example Selection

**Four example types chosen**:

1. **Dashboard** - Real-world monitoring app
   - Why: Shows practical usage
   - Demonstrates: Multiple components, real-time updates

2. **Form** - Interactive input handling
   - Why: Common CLI use case
   - Demonstrates: State management, user input

3. **Progress Demo** - All progress components
   - Why: Showcases animation capabilities
   - Demonstrates: Multiple variants, timing

4. **Playground** - Component browser
   - Why: Quick testing environment
   - Demonstrates: Component switching, interactivity

### Step 4: Building Dashboard Example

**Approach**:
\`\`\`typescript
// 1. Define state for metrics
const [cpuUsage, setCpuUsage] = useState(45);
const [memoryUsage, setMemoryUsage] = useState(62);

// 2. Auto-update with interval
useEffect(() => {
  const interval = setInterval(() => {
    setCpuUsage(Math.floor(Math.random() * 100));
    setMemoryUsage(Math.floor(Math.random() * 100));
  }, 2000);
  return () => clearInterval(interval);
}, []);

// 3. Render with siddcn components
<LinearProgress value={cpuUsage} max={100} />
<StatusBadge status="success" />
\`\`\`

**Why This Works**:
- Simulates real data with random values
- Shows real-time updates
- Multiple component types in one view
- Organized layout with boxes and borders

### Step 5: Building Form Example

**Approach**:
\`\`\`typescript
// 1. State for each field
const [name, setName] = useState('');
const [currentField, setCurrentField] = useState('name');

// 2. Tab navigation
useInput((input, key) => {
  if (key.tab) {
    // Cycle through fields
    setCurrentField(nextField);
  }
});

// 3. Conditional rendering based on focus
{currentField === 'name' ? (
  <TextInput value={name} onChange={setName} />
) : (
  <Text>{name}</Text>
)}
\`\`\`

**Why This Works**:
- Mimics web form behavior in terminal
- Shows field focus management
- Demonstrates input handling
- Success state after submission

### Step 6: Building Progress Demo

**Approach**:
\`\`\`typescript
// Multiple intervals at different speeds
useEffect(() => {
  const interval1 = setInterval(() => {
    setProgress1(prev => (prev >= 100 ? 0 : prev + 5));
  }, 200);
  
  const interval2 = setInterval(() => {
    setProgress2(prev => (prev >= 100 ? 0 : prev + 3));
  }, 150);
  
  return () => {
    clearInterval(interval1);
    clearInterval(interval2);
  };
}, []);
\`\`\`

**Why This Works**:
- Shows different animation speeds
- Auto-loops for continuous demo
- Multiple progress types visible
- Clear visual comparison

### Step 7: Building Playground

**Approach**:
\`\`\`typescript
// Component selection
const components = ['Buttons', 'Progress', 'Badges'];
const [selected, setSelected] = useState(0);

// Keyboard navigation
useInput((input, key) => {
  if (key.upArrow) setSelected(prev => prev - 1);
  if (key.downArrow) setSelected(prev => prev + 1);
});

// Dynamic rendering
const renderComponent = () => {
  switch (selected) {
    case 0: return <SimpleButton />;
    case 1: return <LinearProgress />;
    // ...
  }
};
\`\`\`

**Why This Works**:
- Interactive component browser
- Keyboard-driven navigation
- Live preview updates
- Easy to add more components

## 🎨 Design Patterns Used

### 1. **Separation of Concerns**
Each example is self-contained:
- Own state management
- Own keyboard handlers
- Own layout
- Can run independently

### 2. **Composition Over Configuration**
\`\`\`typescript
// Compose Ink components with siddcn components
<Box flexDirection="column">
  <Text bold>Title</Text>
  <LinearProgress value={50} />
</Box>
\`\`\`

### 3. **Progressive Enhancement**
- Start simple (static components)
- Add interactivity (keyboard input)
- Add real-time updates (intervals)
- Add advanced features (multi-component)

### 4. **State Management**
\`\`\`typescript
// Local state for UI
const [progress, setProgress] = useState(0);

// Effects for side effects
useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval);
}, []);

// Input handlers for interaction
useInput((input, key) => {...});
\`\`\`

## 🔧 Technical Decisions

### Why tsx over building?

**Decision**: Use `tsx` for development

**Pros**:
- No build step
- Instant feedback
- Easy debugging
- TypeScript support

**Cons**:
- Slightly slower startup
- Requires tsx installed

**Conclusion**: Fast iteration is more important for examples

### Why workspace dependency?

**Decision**: Use `"siddcn": "workspace:*"`

**Pros**:
- Always uses latest local version
- No publish needed
- Easy testing of new features
- True monorepo workflow

**Cons**:
- Must build siddcn package first

**Conclusion**: Perfect for development examples

### Why multiple small examples?

**Decision**: 4 focused examples vs 1 large app

**Pros**:
- Each teaches one concept
- Easy to understand
- Copy-paste friendly
- Quick to run

**Cons**:
- Some code duplication
- Need multiple files

**Conclusion**: Better for learning

## 📚 What Each Example Teaches

### Dashboard → Production Usage
**Teaches**:
- Real-world app structure
- Multiple components together
- Real-time data updates
- Layout organization

**Best For**: Building monitoring tools, dashboards

### Form → User Input
**Teaches**:
- Input handling
- Field navigation
- State management
- Submit workflows

**Best For**: CLI tools, configuration wizards

### Progress Demo → Animations
**Teaches**:
- Component variants
- Animation timing
- Multiple intervals
- Visual feedback

**Best For**: Loading states, progress tracking

### Playground → Testing
**Teaches**:
- Component switching
- Interactive controls
- Layout techniques
- Quick prototyping

**Best For**: Component testing, experimentation

## 🚀 Running Examples

### From Monorepo Root
\`\`\`bash
pnpm install
pnpm --filter examples dev:dashboard
\`\`\`

### From Examples Directory
\`\`\`bash
cd apps/examples
pnpm dev:dashboard
\`\`\`

### Why It Works
1. `pnpm install` links workspace packages
2. `siddcn` package is already built
3. `tsx` runs TypeScript directly
4. Ink renders to terminal

## 🎯 Future Enhancements

Potential additions:
- [ ] Chart example with live data
- [ ] Tree navigation example
- [ ] Theme switcher example
- [ ] Multi-page app example
- [ ] Error handling example
- [ ] Loading states example

## 💡 Key Takeaways

1. **Keep examples focused** - One concept per file
2. **Make them runnable** - Each should work standalone
3. **Show real patterns** - Use realistic scenarios
4. **Document well** - Explain why, not just what
5. **Easy to copy** - Developers should be able to use as templates

## 🔗 Integration Points

### With Main Package
\`\`\`typescript
// Direct import from workspace
import { LinearProgress, StatusBadge } from 'siddcn';
\`\`\`

### With Monorepo
\`\`\`json
// pnpm-workspace.yaml includes:
packages:
  - 'apps/*'  // ← This includes apps/examples
\`\`\`

### With Scripts
\`\`\`bash
# Filter to specific workspace
pnpm --filter examples dev:dashboard
\`\`\`

---

This is how I approached building the examples app - focused on developer experience, learning, and practical usage! 🎉
