# 🎨 Siddcn - Terminal UI Component Library

Beautiful, extensible TUI components built with React Ink. Browse and preview components directly in your terminal via SSH or CLI!

[![npm version](https://img.shields.io/npm/v/siddcn.svg)](https://www.npmjs.com/package/siddcn)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Extensible Architecture** - Add new component types in minutes
- 🔌 **SSH Access** - Connect remotely like terminal.shop
- 🎨 **Beautiful UI** - Gradient animations, colors, and smooth navigation
- 📦 **Component Categories** - Buttons, Progress bars, Badges, Charts, Trees, and more
- 📖 **Interactive Docs** - Built-in installation guides and usage examples
- ⌨️ **Keyboard Navigation** - Intuitive controls with vim-like keybindings
- 🚀 **Fast & Lightweight** - Powered by React Ink

## 🚀 Quick Start

### Installation

```bash
npm install -g siddcn
```

### Run Locally

```bash
siddcn
```

### Start SSH Server

```bash
# Generate host key first (one-time setup)
ssh-keygen -t rsa -b 4096 -f host.key -N ""

# Start the server
siddcn-server

# Connect from another terminal
ssh localhost -p 2222
```

## 📖 Usage

### Navigate the Interface

- **↑/↓** or **j/k** - Navigate menu items
- **Enter** - Select item
- **i** - Toggle installation accordion (in detail view)
- **Esc** - Go back
- **q** or **Ctrl+C** - Exit

### Browse Components

1. Start with the main menu showing all component categories
2. Select a category (e.g., "Progress Bars")
3. Choose a variant (e.g., "Linear Progress")
4. View the live preview
5. Press **'i'** to see installation & usage instructions

## 🎨 Component Categories

### Buttons
Interactive button components with various styles:
- Simple Button
- Primary Button
- Danger Button

### Progress Bars
Progress indicators and loading states:
- Linear Progress
- Circular Progress
- Step Progress

### Badges
Status indicators and labels:
- Status Badge
- Count Badge
- Dot Badge

### Charts
Data visualization components:
- Bar Chart
- Line Chart

### Trees
Hierarchical data structures:
- File Tree
- Data Tree

## 🛠️ Development

### Project Structure

```
packages/siddcn/
├── src/
│   ├── components/       # Component implementations
│   │   ├── buttons/
│   │   ├── progress/
│   │   ├── badges/
│   │   ├── charts/
│   │   ├── trees/
│   │   └── registry.ts   # Component registry
│   ├── screens/          # Navigation screens
│   │   ├── LoaderScreen.tsx
│   │   ├── MainMenuScreen.tsx
│   │   ├── CategoryScreen.tsx
│   │   └── ComponentDetailScreen.tsx
│   ├── ssh/              # SSH server
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app component
│   ├── cli.tsx           # CLI entry point
│   ├── server.ts         # SSH server entry point
│   └── index.ts          # Package exports
├── package.json
├── tsconfig.json
└── README.md
```

### Run in Development

```bash
# Clone the monorepo
git clone <repo-url>
cd siddcn-project/packages/siddcn

# Install dependencies
npm install

# Run CLI in dev mode
npm run dev

# Run SSH server in dev mode
npm run dev:server
```

### Build

```bash
npm run build
```

## 🔧 Adding New Components

Adding a new component type is incredibly simple! Check out [ADDING_COMPONENTS.md](./ADDING_COMPONENTS.md) for a complete guide.

**Quick version:**

1. Create component file: `src/components/your-type/index.tsx`
2. Add to registry: `src/components/registry.ts`
3. Done! ✨

Example:

```typescript
// 1. Create component
// src/components/alerts/index.tsx
export const SuccessAlert = () => (
  <Box borderStyle="round" borderColor="green">
    <Text color="green">✓ Success!</Text>
  </Box>
);

// 2. Add to registry
// src/components/registry.ts
export const componentRegistry = {
  // ...existing entries
  'alerts': {
    id: 'alerts',
    name: 'Alerts',
    description: 'Alert and notification components',
    icon: '⚠️',
    variants: [{
      id: 'success',
      name: 'Success Alert',
      preview: SuccessAlert,
      installCommand: 'npx siddcn add alert-success',
      usage: '<SuccessAlert message="Done!" />'
    }]
  }
};
```

That's it! The navigation system auto-discovers your component.

## 🔌 SSH Server Configuration

### Environment Variables

```bash
# Port (default: 2222)
SSH_PORT=3333

# Host key location (default: ./host.key)
SSH_HOST_KEY=/path/to/host.key
```

### Security Notes

⚠️ **Important for Production:**

1. **Generate a proper host key:**
   ```bash
   ssh-keygen -t rsa -b 4096 -f host.key -N ""
   ```

2. **Implement proper authentication:**
   The demo accepts any password. For production:
   ```typescript
   // In server.ts, modify authentication handler
   client.on('authentication', (ctx) => {
     if (ctx.method === 'password') {
       // Add your auth logic here
       if (isValidUser(ctx.username, ctx.password)) {
         ctx.accept();
       } else {
         ctx.reject();
       }
     }
   });
   ```

3. **Use firewall rules** to restrict access
4. **Consider SSH key authentication** instead of passwords

## 📦 Using Components in Your Project

```typescript
import { LinearProgress, SimpleButton } from 'siddcn';
import { render } from 'ink';
import React from 'react';

const MyApp = () => (
  <Box flexDirection="column">
    <SimpleButton label="Click me" />
    <LinearProgress value={75} max={100} />
  </Box>
);

render(<MyApp />);
```

## 🎯 Architecture

### Component Registry Pattern

The heart of siddcn is the component registry system. It provides:

1. **Automatic Discovery** - Components are auto-discovered from registry
2. **Type Safety** - Full TypeScript support
3. **Metadata** - Installation commands, usage examples, prop docs
4. **Easy Extension** - Add new types without touching navigation code

### Navigation State Machine

```
Loader → Main Menu → Category → Component Detail
           ↑            ↑            ↑
           └────────────┴────────────┘
                   (back navigation)
```

### Screen Components

- **LoaderScreen** - Animated loading with progress bar
- **MainMenuScreen** - Browse component categories
- **CategoryScreen** - View variants within a category
- **ComponentDetailScreen** - Preview with installation docs

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add new components** - Follow [ADDING_COMPONENTS.md](./ADDING_COMPONENTS.md)
2. **Improve existing components** - Better styling, animations, features
3. **Fix bugs** - Check issues and submit PRs
4. **Improve docs** - Better examples, clearer instructions
5. **Share feedback** - What components would you like to see?

## 📄 License

MIT © [Your Name]

## 🙏 Acknowledgments

- Built with [Ink](https://github.com/vadimdemedes/ink) by Vadim Demedes
- Inspired by [terminal.shop](https://terminal.shop) and [shadcn/ui](https://ui.shadcn.com)
- SSH integration via [ssh2](https://github.com/mscdex/ssh2)

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/siddcn)
- [Documentation](https://siddcn.dev)
- [NPM Package](https://www.npmjs.com/package/siddcn)
- [Contributing Guide](./CONTRIBUTING.md)

---

Made with ❤️ for the terminal
