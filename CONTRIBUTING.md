# Adding New Components to siddcn

This guide will walk you through adding a new component to the siddcn library.

## Component Checklist

When adding a new component, you need to update 6 files:

- [ ] Create component file in `src/components/`
- [ ] Create showcase screen in `src/screens/`
- [ ] Update main menu in `src/screens/MainMenu.js`
- [ ] Register in main app `src/index.js`
- [ ] Add to CLI installer `cli/index.js`
- [ ] Add to web showcase `web/server.js`

## Step-by-Step Guide

### Step 1: Create the Component

Create a new file in `src/components/YourComponent.js`:

```javascript
import React from "react";
import { Box, Text } from "ink";

// Export any style/variant constants
export const YourComponentStyles = {
  STYLE1: "style1",
  STYLE2: "style2",
};

// Main component export
export const YourComponent = ({
  label,
  style = YourComponentStyles.STYLE1,
  isSelected = false,
  color = "#00A8E8",
}) => {
  // Component logic here

  return (
    <Box>
      <Text color={color}>
        {isSelected ? "▶ " : "  "}
        {label}
      </Text>
    </Box>
  );
};

export default YourComponent;
```

**Component Best Practices:**

- Always export style/variant constants
- Include an `isSelected` prop for navigation
- Support custom colors
- Use the theme system when appropriate
- Keep it simple and focused

### Step 2: Create the Showcase Screen

Create `src/screens/YourComponentScreen.js`:

```javascript
import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import YourComponent, {
  YourComponentStyles,
} from "../components/YourComponent.js";
import InstallationAccordion from "../components/InstallationAccordion.js";
import BoxComponent from "../utils/Box.js";

const VARIANTS = [
  { style: YourComponentStyles.STYLE1, label: "Style 1", color: "#00A8E8" },
  { style: YourComponentStyles.STYLE2, label: "Style 2", color: "#00D9FF" },
];

export const YourComponentScreen = ({ onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInstall, setShowInstall] = useState(false);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(VARIANTS.length - 1, prev + 1));
    } else if (input === "i") {
      setShowInstall((prev) => !prev);
    } else if (key.escape || input === "q") {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <BoxComponent
        title="Your Component - X Variants"
        borderStyle="bold"
        width={70}
      >
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text>Component description and usage information</Text>
          </Box>

          <Box flexDirection="column">
            {VARIANTS.map((variant, index) => (
              <Box key={variant.style} marginY={0}>
                <YourComponent
                  label={variant.label}
                  style={variant.style}
                  isSelected={selectedIndex === index}
                  color={variant.color}
                />
              </Box>
            ))}
          </Box>

          <Box
            marginTop={2}
            borderStyle="single"
            borderColor="#6C757D"
            paddingX={1}
          >
            <Text dimColor>
              <Text color="#FFD700">↑↓</Text> Navigate •
              <Text color="#FFD700"> i</Text> Installation •
              <Text color="#FFD700"> ESC</Text> Back
            </Text>
          </Box>
        </Box>
      </BoxComponent>

      <InstallationAccordion
        componentName="YourComponent"
        isOpen={showInstall}
      />
    </Box>
  );
};

export default YourComponentScreen;
```

**Screen Best Practices:**

- Always include navigation hints
- Use BoxComponent for consistent styling
- Include InstallationAccordion
- Handle keyboard input consistently
- Show all component variants

### Step 3: Update Main Menu

In `src/screens/MainMenu.js`, add your component to MENU_ITEMS:

```javascript
const MENU_ITEMS = [
  // ... existing items
  {
    key: "yourcomponent", // Screen key (lowercase, no spaces)
    label: "Your Component", // Display name
    icon: "✨", // Icon/emoji
    desc: "Short description", // Brief description
    color: "#00A8E8", // Accent color (hex)
  },
];
```

**Menu Tips:**

- Choose a unique, descriptive icon
- Keep descriptions under 20 characters
- Use theme-compatible colors
- Maintain 3-column grid layout

### Step 4: Register in Main App

In `src/index.js`, import and register your screen:

```javascript
// Add import at top
import YourComponentScreen from "./screens/YourComponentScreen.js";

// Add to screens object
const screens = {
  menu: <MainMenu onSelect={handleScreenSelect} />,
  // ... other screens
  yourcomponent: <YourComponentScreen onBack={handleBack} />,
};
```

### Step 5: Add to CLI Installer

In `cli/index.js`, add to COMPONENTS object:

```javascript
const COMPONENTS = {
  // ... existing components
  yourcomponent: {
    name: "YourComponent",
    files: ["components/YourComponent.js"], // Array of required files
    dependencies: ["ink", "react"], // npm dependencies
  },
};
```

**If your component needs utilities or themes:**

```javascript
yourcomponent: {
  name: 'YourComponent',
  files: [
    'components/YourComponent.js',
    'utils/animations.js',      // If using animations
    'themes/index.js'           // If using themes
  ],
  dependencies: ['ink', 'react', 'chalk']
}
```

### Step 6: Add to Web Showcase

In `web/server.js`, add to COMPONENTS array:

```javascript
const COMPONENTS = [
  // ... existing components
  {
    id: "yourcomponent", // Must match menu key
    name: "Your Component", // Display name
    description: "Full description here", // Detailed description
    category: "Interactive", // Category for filtering
    variants: 2, // Number of style variants
  },
];
```

**Categories:**

- `Interactive` - User interaction components
- `Feedback` - Loading/progress indicators
- `Display` - Content display components
- `Forms` - Input/form components
- `Navigation` - Navigation components
- `Styling` - Theme/styling utilities

## Animation Support

If your component needs animations, import from `utils/animations.js`:

```javascript
import { animations, AnimationController } from "../utils/animations.js";
import { useState, useEffect } from "react";

export const AnimatedComponent = ({ style = "dots" }) => {
  const [frame, setFrame] = useState(0);
  const frames = animations.spinners[style];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 80);

    return () => clearInterval(interval);
  }, [frames.length]);

  return <Text>{frames[frame]}</Text>;
};
```

## Theme Support

To use the theme system:

```javascript
import { getTheme } from "../themes/index.js";

export const ThemedComponent = () => {
  const theme = getTheme();

  return <Text color={theme.primary.hex()}>Themed text</Text>;
};
```

**Available theme colors:**

- `primary`, `secondary`
- `success`, `danger`, `warning`, `info`
- `text`, `muted`, `background`
- `border`, `accent`

## Testing Your Component

1. **Visual test in showcase:**

```bash
npm start
```

Navigate to your component and verify appearance.

2. **Test installation:**

```bash
# In a test project
npx siddcn init
npx siddcn add yourcomponent
```

3. **Test web showcase:**

```bash
npm run web
```

Check that your component appears and filters work.

## Common Patterns

### Keyboard Navigation

```javascript
useInput((input, key) => {
  if (key.upArrow) {
    // Move selection up
  } else if (key.downArrow) {
    // Move selection down
  } else if (key.return) {
    // Select/activate
  } else if (input === "i") {
    // Toggle installation
  } else if (key.escape || input === "q") {
    // Go back
    onBack();
  }
});
```

### State Management

```javascript
const [selectedIndex, setSelectedIndex] = useState(0);
const [showInstall, setShowInstall] = useState(false);
const [customState, setCustomState] = useState(initialValue);
```

### Layout Structure

```javascript
<Box flexDirection="column" padding={1}>
  <BoxComponent title="Title" borderStyle="bold" width={70}>
    {/* Main content */}
  </BoxComponent>

  <InstallationAccordion componentName="Name" isOpen={showInstall} />
</Box>
```

## Tips for Great Components

1. **Keep it simple** - Each component should do one thing well
2. **Be consistent** - Follow existing component patterns
3. **Document well** - Add clear descriptions and examples
4. **Test thoroughly** - Check all variants and states
5. **Think accessibility** - Use clear labels and navigation
6. **Optimize performance** - Clean up effects and intervals
7. **Support theming** - Use theme colors where appropriate
8. **Handle edge cases** - Test with different terminal sizes

## Need Help?

- Check existing components for reference
- Look at the TermUI documentation (included)
- Test in both TUI and web showcase
- Verify CLI installation works

---

Happy component building! 🚀
