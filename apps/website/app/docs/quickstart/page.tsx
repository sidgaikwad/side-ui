import { CodeBlock } from "@/components/CodeBlock";

export default function QuickStartPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-terminal-cyan">Quick Start</h1>

      <p className="lead text-xl text-terminal-text/80">
        Get up and running with siddcn in under 5 minutes.
      </p>

      <h2 className="text-2xl font-semibold text-terminal-text">
        1. Create a New Project
      </h2>

      <CodeBlock
        code={`mkdir my-tui-app
cd my-tui-app
npm init -y`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        2. Install Dependencies
      </h2>

      <CodeBlock
        code={`npm install siddcn ink react`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        3. Create Your App
      </h2>

      <CodeBlock
        code={`import React from 'react';
import { render, Box, Text } from 'ink';
import { SimpleButton, LinearProgress, StatusBadge } from 'siddcn';

const App = () => {
  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text bold color="cyan">My TUI App</Text>
      </Box>
      
      <Box marginBottom={1}>
        <StatusBadge status="success" />
      </Box>
      
      <Box marginBottom={1}>
        <LinearProgress value={75} max={100} />
      </Box>
      
      <SimpleButton label="Click Me" />
    </Box>
  );
};

render(<App />);`}
        language="tsx"
        filename="src/index.tsx"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        4. Add Build Script
      </h2>

      <p className="text-terminal-text/70">
        Update your <code className="text-terminal-green">package.json</code>:
      </p>

      <CodeBlock
        code={`{
  "scripts": {
    "start": "tsx src/index.tsx",
    "build": "tsc"
  }
}`}
        language="json"
        filename="package.json"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">5. Run Your App</h2>

      <CodeBlock
        code={`npm start`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Using the Interactive Browser
      </h2>

      <p className="text-terminal-text/70">
        You can also browse all components interactively:
      </p>

      <CodeBlock
        code={`# Install globally
npm install -g siddcn

# Launch the browser
siddcn`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Keyboard Navigation
      </h2>

      <div className="not-prose my-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-terminal-cyan/30">
              <th className="px-4 py-2 text-left text-terminal-cyan">Key</th>
              <th className="px-4 py-2 text-left text-terminal-cyan">Action</th>
            </tr>
          </thead>
          <tbody className="text-terminal-text/70">
            <tr className="border-b border-terminal-cyan/10">
              <td className="px-4 py-2 font-mono">Arrow Keys / h j k l</td>
              <td className="px-4 py-2">Navigate</td>
            </tr>
            <tr className="border-b border-terminal-cyan/10">
              <td className="px-4 py-2 font-mono">Enter</td>
              <td className="px-4 py-2">Select / Confirm</td>
            </tr>
            <tr className="border-b border-terminal-cyan/10">
              <td className="px-4 py-2 font-mono">Esc</td>
              <td className="px-4 py-2">Go Back</td>
            </tr>
            <tr className="border-b border-terminal-cyan/10">
              <td className="px-4 py-2 font-mono">t / T</td>
              <td className="px-4 py-2">Open Theme Selector</td>
            </tr>
            <tr className="border-b border-terminal-cyan/10">
              <td className="px-4 py-2 font-mono">i / I</td>
              <td className="px-4 py-2">Toggle Install Info</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">q</td>
              <td className="px-4 py-2">Quit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
