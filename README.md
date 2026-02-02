# 🎨 Siddcn - Terminal UI Component Library

A beautiful, extensible TUI (Terminal User Interface) component library built with React Ink, accessible via SSH like terminal.shop.

## 🏗️ Project Structure

```
siddcn-monorepo/
├── apps/
│   ├── website/          # Next.js showcase website
│   └── docs/             # Fumadocs documentation
├── packages/
│   └── siddcn/           # Core TUI package with SSH server
└── shared/
    └── tsconfig/         # Shared TypeScript configs
```

## 📦 Packages

### `siddcn` (Core Package)
The main TUI component library built with Ink that includes:
- 🔌 SSH server integration for remote access
- 🎯 Component registry system (easily extensible)
- 🧭 Navigation state machine (Loader → Menu → Category → Detail)
- 📦 Pre-built components (buttons, progress bars, badges, charts, etc.)
- 📖 Interactive component documentation with accordions

### `website` (Next.js App)
Showcase website featuring:
- Component previews
- Live demos
- Installation guides
- API documentation

### `docs` (Fumadocs)
Comprehensive documentation with:
- Getting started guides
- Component API references
- SSH connection guides
- Contribution guidelines

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all apps in development
npm run dev

# Build everything
npm run build
```

## 🎮 User Flow

1. **Connect via SSH**: `ssh user@your-server -p 2222`
2. **Loader Screen**: Animated loader while initializing
3. **Main Menu**: Browse component categories (buttons, badges, tabs, charts, trees, etc.)
4. **Category View**: See all variants of selected component type
5. **Component Detail**: View selected component with:
   - Live preview
   - Installation instructions (accordion - press 'i')
   - Usage examples
   - Props documentation

## 🎯 Key Features

### Extensible Architecture
Adding new component types is simple:
```typescript
// packages/siddcn/src/components/registry.ts
export const componentRegistry = {
  'progress-bar': {
    variants: [/* ... */],
    // ...
  },
  // Add your new component type here!
  'accordion': {
    variants: [/* ... */],
    // ...
  }
};
```

### Navigation
- `↑/↓` or `j/k`: Navigate items
- `Enter`: Select item
- `i`: Toggle accordion (in detail view)
- `Esc` or `q`: Go back
- `Ctrl+C`: Exit

## 🛠️ Development

### Add a New Component Type

1. Create component files in `packages/siddcn/src/components/[type]/`
2. Add variants to the registry
3. Export from the main index
4. That's it! The navigation system handles the rest

### Project Commands

```bash
# Development
npm run dev              # Start all apps
npm run dev --filter=siddcn  # Start only core package

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

## 📚 Tech Stack

- **Framework**: React + Ink (TUI rendering)
- **Language**: TypeScript
- **SSH**: ssh2 (SSH server implementation)
- **Monorepo**: Turborepo
- **Website**: Next.js 14
- **Docs**: Fumadocs
- **Package Manager**: npm

## 🎨 Component Categories

- **Buttons**: Various button styles and states
- **Progress Bars**: Linear, circular, multi-step
- **Badges**: Status indicators, labels
- **Charts**: Bar, line, pie charts
- **Trees**: File trees, hierarchical data
- **Tabs**: Navigation tabs
- **Tables**: Data tables
- **Forms**: Inputs, selects, checkboxes
- **More**: Easily extensible!

## 📖 Documentation

Detailed documentation available at `/apps/docs`

## 🤝 Contributing

We welcome contributions! See our contribution guide in the docs.

## 📄 License

MIT

## 🙏 Acknowledgments

- Inspired by [terminal.shop](https://terminal.shop)
- Built with [Ink](https://github.com/vadimdemedes/ink)
- Component architecture inspired by [shadcn/ui](https://ui.shadcn.com)
