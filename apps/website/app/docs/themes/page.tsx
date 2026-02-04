import { CodeBlock } from "@/components/CodeBlock";

export default function ThemesPage() {
  const themes = [
    {
      id: "default",
      name: "Default (Cyan & Green)",
      primary: "#7dcfff",
      secondary: "#7aa2f7",
      border: "round",
    },
    {
      id: "ocean",
      name: "Ocean (Blue Theme)",
      primary: "#7aa2f7",
      secondary: "#7dcfff",
      border: "double",
    },
    {
      id: "forest",
      name: "Forest (Green Theme)",
      primary: "#9ece6a",
      secondary: "#98c379",
      border: "round",
    },
    {
      id: "sunset",
      name: "Sunset (Orange & Pink)",
      primary: "#f7768e",
      secondary: "#e0af68",
      border: "round",
    },
    {
      id: "minimal",
      name: "Minimal (White & Gray)",
      primary: "#ffffff",
      secondary: "#888888",
      border: "single",
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk (Pink & Cyan)",
      primary: "#ff79c6",
      secondary: "#8be9fd",
      border: "bold",
    },
  ];

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-terminal-cyan">Themes</h1>

      <p className="lead text-xl text-terminal-text/80">
        Siddcn comes with 6 built-in themes and supports custom themes.
      </p>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Available Themes
      </h2>

      <div className="not-prose my-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="rounded-lg border border-terminal-cyan/20 bg-terminal-bg/50 p-4"
          >
            <div
              className="mb-3 h-2 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            <h3 className="font-semibold text-terminal-text">{theme.name}</h3>
            <p className="mt-1 text-sm text-terminal-text/60">
              Border: {theme.border}
            </p>
            <div className="mt-2 flex gap-2">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: theme.primary }}
                title="Primary"
              />
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: theme.secondary }}
                title="Secondary"
              />
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Changing Themes
      </h2>

      <p className="text-terminal-text/70">
        You can change themes in the CLI by pressing <code className="text-terminal-green">t</code> or <code className="text-terminal-green">T</code> at any time.
      </p>

      <h3 className="text-xl font-semibold text-terminal-text">
        Programmatic Theme Change
      </h3>

      <CodeBlock
        code={`import { setTheme, getTheme, getThemeNames } from 'siddcn';

// Get available themes
const themes = getThemeNames();
// Returns: [{ id: 'default', name: 'Default (Cyan & Green)' }, ...]

// Set a theme
setTheme('ocean');

// Get current theme
const currentTheme = getTheme();
console.log(currentTheme.name); // "Ocean (Blue Theme)"`}
        language="tsx"
        filename="theme-usage.tsx"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Theme Structure
      </h2>

      <p className="text-terminal-text/70">
        Each theme follows this structure:
      </p>

      <CodeBlock
        code={`interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    text: string;
    dimText: string;
    border: string;
    background: string;
  };
  borderStyle: 'single' | 'double' | 'round' | 'bold' | 'classic';
}`}
        language="tsx"
        filename="types/theme.ts"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Creating Custom Themes
      </h2>

      <p className="text-terminal-text/70">
        You can create and register custom themes:
      </p>

      <CodeBlock
        code={`import { themes, setTheme } from 'siddcn';

// Add a custom theme
themes['myTheme'] = {
  name: 'My Custom Theme',
  colors: {
    primary: 'magenta',
    secondary: 'cyan',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
    text: 'white',
    dimText: 'gray',
    border: 'magenta',
    background: 'black',
  },
  borderStyle: 'round',
};

// Use your custom theme
setTheme('myTheme');`}
        language="tsx"
        filename="custom-theme.tsx"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Using Theme in Components
      </h2>

      <CodeBlock
        code={`import React from 'react';
import { Box, Text } from 'ink';
import { getTheme } from 'siddcn';

const MyComponent = () => {
  const theme = getTheme();
  
  return (
    <Box 
      borderStyle={theme.borderStyle} 
      borderColor={theme.colors.border}
      padding={1}
    >
      <Text color={theme.colors.primary}>
        Themed Content
      </Text>
    </Box>
  );
};`}
        language="tsx"
        filename="themed-component.tsx"
      />
    </article>
  );
}
