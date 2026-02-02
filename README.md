# siddcn

**A beautiful, themeable TUI component library built with React Ink** - Inspired by shadcn/ui

Build stunning terminal user interfaces with pre-built, customizable components. Install only what you need, when you need it.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React Ink](https://img.shields.io/badge/React%20Ink-4.4.1-purple)

## ✨ Features

- 🎨 **12 Component Types** - Buttons, Progress Bars, Spinners, Tables, Cards, Badges, and more
- 🌈 **6 Built-in Themes** - Ocean, Forest, Sunset, Midnight, Cyber, Monochrome
- 📦 **Install What You Need** - shadcn-style CLI for selective component installation
- 🎭 **50+ Variants** - Multiple styles for each component
- 🚀 **Zero Config** - Works out of the box
- 🌐 **Web Showcase** - Browse components in your browser
- 📡 **SSH Support** - Run as an SSH server (coming soon)

## 🚀 Quick Start

### View the Showcase

```bash
# Run the TUI showcase
npx siddcn

# Or view components in your browser
npm run web
```

### Install in Your Project

```bash
# Initialize siddcn in your project
npx siddcn init

# Add individual components
npx siddcn add button
npx siddcn add progressbar
npx siddcn add spinner

# List all available components
npx siddcn list
```

## 📦 Components

### Interactive

- **Buttons** - 8 variants (Primary, Secondary, Success, Danger, Warning, Info, Ghost, Outlined)
- **Select** - Single-select dropdown
- **Multi-Select** - Checkbox multi-select

### Feedback

- **Progress Bars** - 6 animated styles (Blocks, Arrows, Dots, Lines, Gradient, Smooth)
- **Spinners** - 17 loading animations

### Display

- **Tables** - 4 layout styles with sorting and selection
- **Cards** - 4 visual styles
- **Badges** - 12 status indicator variants
- **Tree** - Collapsible hierarchy view

### Forms

- **Text Input** - With validation support

### Navigation

- **Tabs** - 4 tab interface styles

### Styling

- **Themes** - 6 color schemes

## 🎨 Usage Example

```javascript
import React from "react";
import { render } from "ink";
import { Button } from "./components/Button";
import { ProgressBar } from "./components/ProgressBar";
import { Spinner } from "./components/Spinner";

const App = () => (
  <Box flexDirection="column" padding={1}>
    <Button label="Click Me" variant="primary" icon="🚀" />

    <ProgressBar progress={75} style="gradient" label="Loading..." />

    <Spinner style="dots2" label="Processing..." color="#00A8E8" />
  </Box>
);

render(<App />);
```

## 🎯 How to Add a New Component

1. **Create the component file** in `src/components/`:

```javascript
// src/components/MyComponent.js
import React from "react";
import { Box, Text } from "ink";

export const MyComponent = ({ label }) => {
  return (
    <Box>
      <Text>{label}</Text>
    </Box>
  );
};
```

2. **Create a showcase screen** in `src/screens/`:

```javascript
// src/screens/MyComponentScreen.js
import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import MyComponent from "../components/MyComponent.js";
import InstallationAccordion from "../components/InstallationAccordion.js";
import BoxComponent from "../utils/Box.js";

export const MyComponentScreen = ({ onBack }) => {
  const [showInstall, setShowInstall] = useState(false);

  useInput((input, key) => {
    if (input === "i") {
      setShowInstall((prev) => !prev);
    } else if (key.escape || input === "q") {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <BoxComponent title="My Component" borderStyle="bold" width={70}>
        <Box flexDirection="column">
          <Text>Component description here</Text>
          <MyComponent label="Example" />
        </Box>
      </BoxComponent>

      <InstallationAccordion componentName="MyComponent" isOpen={showInstall} />
    </Box>
  );
};
```

3. **Add to main menu** in `src/screens/MainMenu.js`:

```javascript
const MENU_ITEMS = [
  // ... existing items
  {
    key: "mycomponent",
    label: "My Component",
    icon: "✨",
    desc: "Description",
    color: "#00A8E8",
  },
];
```

4. **Register in main app** in `src/index.js`:

```javascript
import MyComponentScreen from "./screens/MyComponentScreen.js";

// In the screens object:
const screens = {
  // ... existing screens
  mycomponent: <MyComponentScreen onBack={handleBack} />,
};
```

5. **Add to CLI** in `cli/index.js`:

```javascript
const COMPONENTS = {
  // ... existing components
  mycomponent: {
    name: "MyComponent",
    files: ["components/MyComponent.js"],
    dependencies: ["ink", "react"],
  },
};
```

6. **Add to web showcase** in `web/server.js`:

```javascript
const COMPONENTS = [
  // ... existing components
  {
    id: "mycomponent",
    name: "My Component",
    description: "Component description",
    category: "Display",
    variants: 1,
  },
];
```

## 🎨 Themes

siddcn comes with 6 built-in themes that can be switched at runtime:

- **Ocean** (Default) - Cool blue tones
- **Forest** - Natural green palette
- **Sunset** - Warm orange/red colors
- **Midnight** - Purple/magenta scheme
- **Cyber** - Neon green cyberpunk style
- **Monochrome** - Classic black and white

Change themes programmatically:

```javascript
import { setTheme } from "./themes/index.js";

setTheme("cyber");
```

## 🌐 Web Interface

View all components in your browser:

```bash
npm run web
```

Open http://localhost:3000 to browse the component library with:

- Component filtering by category
- Installation commands
- Live statistics
- Responsive design

## 🏗️ Project Structure

```
siddcn/
├── src/
│   ├── components/          # Component library
│   │   ├── Button.js
│   │   ├── ProgressBar.js
│   │   ├── Spinner.js
│   │   └── ...
│   ├── screens/             # Showcase screens
│   │   ├── Loader.js
│   │   ├── MainMenu.js
│   │   ├── ButtonsScreen.js
│   │   └── ...
│   ├── utils/               # Utilities
│   │   ├── Box.js
│   │   └── animations.js
│   ├── themes/              # Theme system
│   │   └── index.js
│   └── index.js             # Main app
├── cli/                     # CLI installer
│   └── index.js
├── web/                     # Web showcase
│   └── server.js
└── package.json
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run showcase in development mode
npm run dev

# Run web server
npm run web

# Run both simultaneously
npm run both
```

## 📝 License

MIT © 2024

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com)
- Built with [React Ink](https://github.com/vadimdemedes/ink)
- Based on the TermUI project architecture

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new components
- Create new themes
- Improve documentation
- Report bugs
- Suggest features

---

**Made with ❤️ for the terminal**
