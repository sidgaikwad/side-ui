# 🚀 Development Guide

Complete guide for developing and contributing to the siddcn monorepo.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Building](#building)
- [Publishing](#publishing)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 10.0.0
- **Git**
- A terminal emulator with good Unicode support

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repo-url>
cd siddcn-project

# Install all dependencies (monorepo-wide)
npm install

# This will install dependencies for:
# - Root workspace
# - packages/siddcn
# - apps/website (when created)
# - apps/docs (when created)
```

### 2. Generate SSH Host Key (for SSH server)

```bash
cd packages/siddcn
ssh-keygen -t rsa -b 4096 -f host.key -N ""
```

This creates `host.key` and `host.key.pub` in the siddcn package directory.

### 3. Verify Setup

```bash
# Check that turborepo is working
npx turbo --version

# Try building everything
npm run build
```

## Project Structure

```
siddcn-project/
├── apps/
│   ├── website/              # Next.js showcase (to be created)
│   └── docs/                 # Fumadocs documentation (to be created)
├── packages/
│   └── siddcn/               # Core TUI library
│       ├── src/
│       │   ├── components/   # Component implementations
│       │   │   ├── buttons/
│       │   │   ├── progress/
│       │   │   ├── badges/
│       │   │   ├── charts/
│       │   │   ├── trees/
│       │   │   └── registry.ts
│       │   ├── screens/      # UI screens
│       │   ├── ssh/          # SSH server logic
│       │   ├── types/        # TypeScript types
│       │   ├── App.tsx       # Main app
│       │   ├── cli.tsx       # CLI entry
│       │   ├── server.ts     # SSH server entry
│       │   └── index.ts      # Public API
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── package.json              # Root package.json
├── turbo.json               # Turborepo config
├── tsconfig.json            # Shared TypeScript config
└── README.md                # Project overview
```

## Development Workflow

### Working on the Core Package

```bash
# Navigate to the package
cd packages/siddcn

# Run CLI in development mode (with hot reload)
npm run dev

# Run SSH server in development mode
npm run dev:server

# In another terminal, connect to the SSH server
ssh localhost -p 2222
# Username: anything
# Password: anything (in dev mode)
```

### Adding a New Component

1. **Create component files:**
   ```bash
   cd packages/siddcn/src/components
   mkdir my-component
   cd my-component
   ```

2. **Create `index.tsx`:**
   ```typescript
   import React from 'react';
   import { Box, Text } from 'ink';

   export const MyComponent: React.FC = () => {
     return (
       <Box>
         <Text color="cyan">My Component!</Text>
       </Box>
     );
   };
   ```

3. **Register in `registry.ts`:**
   ```typescript
   import { MyComponent } from '../components/my-component';

   export const componentRegistry = {
     // ... existing entries
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
   };
   ```

4. **Test it:**
   ```bash
   npm run dev
   # Navigate to your new component in the menu
   ```

See [ADDING_COMPONENTS.md](./packages/siddcn/ADDING_COMPONENTS.md) for more details.

### Working on Multiple Packages

```bash
# From monorepo root, run dev for all packages
npm run dev

# Or target specific packages
npx turbo dev --filter=siddcn
npx turbo dev --filter=website
```

## Testing

### Manual Testing

1. **CLI Testing:**
   ```bash
   cd packages/siddcn
   npm run dev
   # Manually navigate and test all features
   ```

2. **SSH Testing:**
   ```bash
   # Terminal 1: Start server
   npm run dev:server

   # Terminal 2: Connect as client
   ssh localhost -p 2222

   # Test from different terminals, different SSH clients
   ```

3. **Component Testing:**
   - Navigate to each component
   - Test keyboard shortcuts (↑↓, j/k, Enter, Esc, i, q)
   - Verify previews render correctly
   - Check accordion toggle with 'i'
   - Test back navigation with Esc

### Automated Testing (Future)

```bash
# Unit tests (to be implemented)
npm run test

# E2E tests (to be implemented)
npm run test:e2e
```

## Building

### Build All Packages

```bash
# From monorepo root
npm run build

# This runs turborepo build pipeline:
# 1. Builds packages/siddcn
# 2. Builds apps/website (when created)
# 3. Builds apps/docs (when created)
```

### Build Single Package

```bash
# Build just the core package
cd packages/siddcn
npm run build

# Output goes to dist/
# - dist/cli.js (CLI entry point)
# - dist/server.js (SSH server entry point)
# - dist/index.js (Library exports)
# - dist/*.d.ts (Type definitions)
```

### Build Outputs

After building `packages/siddcn`:

```
packages/siddcn/dist/
├── cli.js              # CLI executable
├── server.js           # SSH server executable
├── index.js            # Main library export
├── App.js              # App component
├── components/         # All components
├── screens/            # All screens
├── types/              # Type definitions
└── *.d.ts             # TypeScript declarations
```

## Publishing

### Pre-publish Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG is updated
- [ ] Version is bumped in package.json
- [ ] Built successfully
- [ ] Tested in production mode

### Publishing to npm

```bash
cd packages/siddcn

# Build
npm run build

# Test the build
node dist/cli.js

# Publish (requires npm credentials)
npm publish

# Or for scoped package
npm publish --access public
```

### Version Management

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features, backward compatible)
npm version minor

# Major version (breaking changes)
npm version major
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use (SSH Server)

```bash
# Error: EADDRINUSE
# Solution: Use different port
SSH_PORT=3333 npm run dev:server
```

#### 2. Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# For monorepo-wide clean
npm run clean
npm install
```

#### 3. TypeScript Errors

```bash
# Run type checking
npm run typecheck

# Regenerate declarations
npm run build
```

#### 4. SSH Connection Refused

```bash
# Check server is running
ps aux | grep node

# Check firewall
# On macOS:
sudo pfctl -s all

# On Linux:
sudo iptables -L
```

#### 5. Components Not Showing

- Check registry imports are correct
- Verify component is exported
- Check for TypeScript errors
- Rebuild the package

#### 6. Terminal Rendering Issues

- Ensure terminal supports Unicode
- Check terminal size (minimum 80x24 recommended)
- Try different terminal emulator
- Check color support with `echo $TERM`

### Debug Mode

```bash
# Run with debug logging (to be implemented)
DEBUG=siddcn:* npm run dev

# Or for specific modules
DEBUG=siddcn:registry npm run dev
```

### Getting Help

1. Check [ADDING_COMPONENTS.md](./packages/siddcn/ADDING_COMPONENTS.md)
2. Look at existing components for examples
3. Check the [Ink documentation](https://github.com/vadimdemedes/ink)
4. Open an issue on GitHub

## Performance Tips

### Development

- Use `npm run dev` for fast iteration with hot reload
- Test in production mode (`npm run build && node dist/cli.js`) before publishing
- Profile with Node.js inspector if experiencing slowness

### SSH Server

- Limit concurrent connections in production
- Use connection pooling
- Implement rate limiting
- Monitor memory usage

## Code Style

### TypeScript

- Use explicit types for public APIs
- Prefer interfaces over types for object shapes
- Use `React.FC` for component types
- Document complex logic with comments

### Components

- Keep components small and focused
- Use Ink's `<Box>` and `<Text>` components
- Follow React hooks rules
- Test across different terminal sizes

### File Organization

- One component per file
- Group related components in folders
- Keep registry.ts organized by category
- Use index.ts for clean exports

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes and commit
git add .
git commit -m "feat: add new component type"

# Push and create PR
git push origin feature/new-component
```

### Commit Message Convention

```
feat: add new component
fix: resolve rendering issue
docs: update README
chore: update dependencies
refactor: simplify navigation logic
test: add component tests
```

## Next Steps

1. **Add Tests**: Implement unit and E2E tests
2. **CI/CD**: Set up GitHub Actions
3. **Documentation**: Complete Fumadocs site
4. **Website**: Build Next.js showcase
5. **More Components**: Expand component library
6. **Themes**: Add customizable themes
7. **Plugins**: Create plugin system

---

Happy coding! 🚀
