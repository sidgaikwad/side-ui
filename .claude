# Siddcn Project - Claude Context & Rules

## 🎯 Project Overview

**Siddcn** is a Terminal UI (TUI) component library built with React Ink, featuring SSH access for remote browsing of components. Think of it as "shadcn/ui for the terminal" with the ability to connect via SSH like terminal.shop.

### Key Features
- ✨ **Extensible Component System** - Add new component types in minutes
- 🔌 **SSH Access** - Browse components remotely via SSH  
- 🎨 **Beautiful TUI** - Gradient animations, colors, smooth navigation
- 📦 **Pre-built Components** - Buttons, Progress bars, Badges, Charts, Trees, Tables, etc.
- 📖 **Interactive Documentation** - Built-in installation guides with accordions
- ⌨️ **Intuitive Navigation** - Vim-like keybindings (j/k), arrow keys, Enter, Esc

---

## 🏗️ Architecture

### Monorepo Structure (Turborepo + pnpm)

```
siddcn/
├── apps/
│   ├── website/          # Next.js showcase website
│   ├── docs/             # Fumadocs documentation site
│   └── examples/         # Example projects
├── packages/
│   └── siddcn/           # Core TUI library ⭐
│       ├── src/
│       │   ├── components/   # Component implementations
│       │   │   ├── animated-text/
│       │   │   ├── backgrounds/
│       │   │   ├── badges/
│       │   │   ├── buttons/
│       │   │   ├── cards/
│       │   │   ├── charts/
│       │   │   ├── dashboards/
│       │   │   ├── multiselect/
│       │   │   ├── notifications/
│       │   │   ├── progress/
│       │   │   ├── select/
│       │   │   ├── spinners/
│       │   │   ├── table/
│       │   │   ├── tabs/
│       │   │   ├── text-input/
│       │   │   ├── trees/
│       │   │   └── registry.tsx   # ⭐ Component registry
│       │   ├── screens/          # Navigation screens
│       │   ├── types/            # TypeScript definitions
│       │   ├── utils/            # Utility functions
│       │   ├── App.tsx           # Main app component
│       │   ├── cli.tsx           # CLI entry point
│       │   ├── server.ts         # SSH server
│       │   └── index.ts          # Public API exports
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
└── [config files: turbo.json, pnpm-workspace.yaml, etc.]
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React + Ink |
| **Language** | TypeScript |
| **Build Tool** | tsup |
| **Monorepo** | Turborepo |
| **Package Manager** | pnpm |
| **SSH Server** | ssh2 |
| **Terminal UI** | Ink components + cli-spinners |
| **Styling** | Gradient-string, Chalk |
| **Website** | Next.js |
| **Docs** | Fumadocs |
| **CSS** | TailwindCSS |

---

## 📋 Development Commands

### From Root Directory
```bash
pnpm install           # Install all dependencies
pnpm dev               # Run dev for all packages
pnpm build             # Build all packages
pnpm lint              # Lint all packages
pnpm clean             # Clean all packages
```

### From packages/siddcn
```bash
pnpm dev               # Run CLI in dev mode
pnpm dev:server        # Run SSH server in dev mode
pnpm build             # Build the package
pnpm typecheck         # Type check the code
```

### SSH Server
```bash
ssh localhost -p 2222  # Connect to local SSH server
```

---

## 🎨 Component Registry Pattern

The heart of siddcn is the **Component Registry** system in `packages/siddcn/src/components/registry.tsx`.

### Adding a New Component
1. Create folder: `src/components/my-component/index.tsx`
2. Create React component using Ink
3. Add to `registry.tsx`:

```typescript
'my-components': {
  id: 'my-components',
  name: 'My Components',
  description: 'Custom component type',
  icon: '🎨',
  variants: [{
    id: 'default',
    name: 'Default',
    preview: MyComponent,
    installCommand: 'npx siddcn add my-component',
    usage: '<MyComponent />'
  }]
}
```

### Current Component Categories
- Animated Text
- Backgrounds
- Badges (Status, Count, Dot)
- Buttons (Simple, Primary, Danger)
- Cards
- Charts (Bar, Line)
- Dashboards
- Multiselect
- Notifications
- Progress (Linear, Circular, Step)
- Select
- Spinners
- Tables
- Tabs
- Text Input
- Trees (File, Data)

---

## 📝 Coding Conventions

### TypeScript
- Use explicit types for public APIs
- Prefer interfaces over types for object shapes
- Use `React.FC` for component types
- Document complex logic with comments

### Ink Components
- Use Ink's `<Box>` and `<Text>` components
- Follow React hooks rules
- Test across different terminal sizes
- Keep components small and focused

### File Organization
- One component per file
- Group related components in folders
- Keep registry.ts organized by category
- Use index.ts for clean exports

### Commit Messages
```
feat: add new component
fix: resolve rendering issue
docs: update README
chore: update dependencies
refactor: simplify navigation logic
test: add component tests
```

---

## ⌨️ Navigation Controls

| Key | Action |
|-----|--------|
| `↑`/`↓` or `j`/`k` | Navigate menu items |
| `Enter` | Select item |
| `i` | Toggle installation accordion |
| `Esc` | Go back |
| `q` or `Ctrl+C` | Exit |

---

## 🔧 Troubleshooting

### Common Issues
1. **Port in use**: `SSH_PORT=3333 pnpm dev:server`
2. **Module not found**: `rm -rf node_modules && pnpm install`
3. **Components not showing**: Check registry imports and rebuild
4. **SSH connection refused**: Ensure server is running and host key exists

### SSH Key Generation
```bash
cd packages/siddcn
ssh-keygen -t rsa -b 4096 -f host.key -N ""
```

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `packages/siddcn/src/components/registry.tsx` | Component registry (add new components here) |
| `packages/siddcn/src/App.tsx` | Main TUI application |
| `packages/siddcn/src/server.ts` | SSH server implementation |
| `packages/siddcn/src/screens/` | Navigation screens |
| `DEVELOPMENT.md` | Development workflow guide |
| `PROJECT_SUMMARY.md` | Complete project summary |
| `packages/siddcn/ADDING_COMPONENTS.md` | Guide for adding components |

---

## 🚀 Project Status

**Phase 1 (Core)** - ✅ Complete
- Monorepo setup
- Component registry system
- Navigation screens
- SSH server integration
- Sample components
- Documentation

**Phase 2 (Polish)** - In Progress
- More component types
- Theme system
- Better error handling
- Component search

---

## 💡 Important Notes

1. This is a **pnpm workspace** monorepo - use `pnpm` for package management
2. The core library is in `packages/siddcn`
3. Component registry pattern makes adding components trivial
4. SSH host key (`host.key`) should be generated but NOT committed
5. The project uses ESM modules (`"type": "module"`)
6. Node.js >= 18.0.0 is required
