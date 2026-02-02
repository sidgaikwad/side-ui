# 🌐 Siddcn Website

Next.js website for showcasing siddcn components.

## 🚧 Setup

This app is a placeholder. To set it up:

```bash
# From the monorepo root
cd apps/website

# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install dependencies
npm install

# Development
npm run dev
```

## 📋 TODO

- [ ] Create homepage with hero section
- [ ] Component showcase pages
- [ ] Interactive component previews
- [ ] Installation guides
- [ ] Search functionality
- [ ] Dark/light mode
- [ ] Copy code examples

## 🎨 Pages to Create

### Home (`/`)
- Hero section with terminal demo
- Feature highlights
- Quick start guide
- Component gallery preview

### Components (`/components`)
- Grid of all component categories
- Search and filter
- Link to individual component pages

### Component Detail (`/components/[category]/[variant]`)
- Live preview
- Code examples
- Props documentation
- Installation command
- Usage examples

### Docs (`/docs`)
- Getting started
- Installation
- SSH setup
- Adding components
- API reference

### Examples (`/examples`)
- Real-world usage examples
- Code sandboxes
- Templates

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (for the website itself!)
- **Code Highlighting**: Shiki or Prism
- **Search**: Algolia or similar
- **Analytics**: Vercel Analytics

## 🔗 Integration with Siddcn

```typescript
// Example: Using siddcn components in preview
import { LinearProgress } from 'siddcn';
import { render } from 'ink';

// Render to string for preview
const preview = renderToString(<LinearProgress value={75} />);
```

## 📦 Package.json Structure

```json
{
  "name": "website",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "siddcn": "workspace:*"
  }
}
```

---

**Note**: This is a placeholder. Run the setup commands above to initialize the actual Next.js application.
