# 📚 Siddcn Documentation

Comprehensive documentation site built with Fumadocs.

## 🚧 Setup

This app is a placeholder. To set it up:

```bash
# From the monorepo root
cd apps/docs

# Create Fumadocs app
npx create-fumadocs-app@latest

# Or manually:
npm init
npm install fumadocs-core fumadocs-mdx next react react-dom

# Development
npm run dev
```

## 📋 Documentation Structure

```
docs/
├── getting-started/
│   ├── introduction.mdx
│   ├── installation.mdx
│   ├── quick-start.mdx
│   └── first-component.mdx
├── components/
│   ├── buttons.mdx
│   ├── progress.mdx
│   ├── badges.mdx
│   ├── charts.mdx
│   └── trees.mdx
├── guides/
│   ├── adding-components.mdx
│   ├── ssh-setup.mdx
│   ├── customization.mdx
│   └── best-practices.mdx
├── api/
│   ├── component-registry.mdx
│   ├── types.mdx
│   └── utilities.mdx
└── examples/
    ├── basic-usage.mdx
    ├── custom-components.mdx
    └── ssh-integration.mdx
```

## 📝 Content to Create

### Getting Started
- Introduction to siddcn
- What is a TUI?
- Why use siddcn?
- Installation steps
- Quick start tutorial
- Your first component

### Component Documentation
Each component category should have:
- Overview and use cases
- Installation command
- Basic usage example
- Advanced examples
- Props API reference
- Variants showcase
- Accessibility notes

### Guides
- **Adding Components**: Detailed guide with examples
- **SSH Setup**: Security best practices, key generation
- **Customization**: Theming, colors, layouts
- **Best Practices**: Component design, performance
- **Deployment**: Production considerations
- **Troubleshooting**: Common issues and solutions

### API Reference
- Component Registry API
- Type definitions
- Utility functions
- Hooks (if any)
- CLI commands

### Examples
- Basic CLI app
- Custom component creation
- SSH server setup
- Integration with existing tools
- Advanced patterns

## 🎨 Fumadocs Features to Use

- **MDX Support** - Write docs in MDX
- **Code Blocks** - Syntax highlighting
- **Search** - Built-in search functionality
- **Table of Contents** - Auto-generated TOC
- **API References** - TypeScript type extraction
- **Versioning** - Multiple doc versions
- **Dark Mode** - Theme switching

## 📦 Package.json Structure

```json
{
  "name": "docs",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "fumadocs-core": "^latest",
    "fumadocs-mdx": "^latest",
    "fumadocs-ui": "^latest",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "siddcn": "workspace:*"
  }
}
```

## 🛠️ fumadocs.config.js

```javascript
import { defineConfig } from 'fumadocs-mdx/config';

export default defineConfig({
  docs: {
    dir: './content/docs',
  },
});
```

## 📋 Initial Content Outline

### 1. Introduction
```mdx
---
title: Introduction
description: Welcome to siddcn documentation
---

# Introduction to Siddcn

Siddcn is a Terminal UI component library...

## Features

- 🎯 Extensible Architecture
- 🔌 SSH Access
- 🎨 Beautiful UI
...
```

### 2. Installation
```mdx
---
title: Installation
description: How to install siddcn
---

# Installation

## Using npm

```bash
npm install -g siddcn
```

## Using yarn

```bash
yarn global add siddcn
```
...
```

### 3. Quick Start
```mdx
---
title: Quick Start
description: Get started with siddcn in 5 minutes
---

# Quick Start

Let's create your first TUI app...
```

## 🎯 Integration Points

### Link to Main Site
```typescript
// In docs config
export const config = {
  links: {
    website: 'https://siddcn.dev',
    github: 'https://github.com/yourusername/siddcn',
    npm: 'https://www.npmjs.com/package/siddcn'
  }
};
```

### Component Previews
```mdx
# Button Component

<ComponentPreview>
  <Button>Click me</Button>
</ComponentPreview>
```

## 🔗 Useful Links

- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [MDX Documentation](https://mdxjs.com)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Note**: This is a placeholder. Run the setup commands above to initialize the actual Fumadocs application.
