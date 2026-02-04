import { CodeBlock } from "@/components/CodeBlock";

export default function InstallationPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-terminal-cyan">Installation</h1>

      <p className="lead text-xl text-terminal-text/80">
        Learn how to install siddcn and add components to your project.
      </p>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Global Installation
      </h2>

      <p className="text-terminal-text/70">
        Install siddcn globally to use the interactive CLI browser:
      </p>

      <CodeBlock
        code={`npm install -g siddcn`}
        language="bash"
        filename="Terminal"
      />

      <p className="text-terminal-text/70">
        After installation, run <code className="text-terminal-green">siddcn</code>{" "}
        to launch the interactive component browser.
      </p>

      <h2 className="text-2xl font-semibold text-terminal-text">
        Project Installation
      </h2>

      <p className="text-terminal-text/70">
        To use siddcn components in your project:
      </p>

      <CodeBlock
        code={`# npm
npm install siddcn ink react

# yarn
yarn add siddcn ink react

# pnpm
pnpm add siddcn ink react`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Adding Individual Components
      </h2>

      <p className="text-terminal-text/70">
        You can add individual components using the CLI:
      </p>

      <CodeBlock
        code={`# Add a button component
npx siddcn add button-simple

# Add a progress bar
npx siddcn add progress-linear

# Add a file tree
npx siddcn add tree-file`}
        language="bash"
        filename="Terminal"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Peer Dependencies
      </h2>

      <p className="text-terminal-text/70">
        Siddcn requires the following peer dependencies:
      </p>

      <ul className="space-y-2 text-terminal-text/70">
        <li>
          <code className="text-terminal-green">react</code> {">= 18.0.0"}
        </li>
        <li>
          <code className="text-terminal-green">ink</code> {">= 4.0.0"}
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-terminal-text">
        TypeScript Support
      </h2>

      <p className="text-terminal-text/70">
        Siddcn is written in TypeScript and includes type definitions out of the
        box. No additional configuration is required.
      </p>

      <CodeBlock
        code={`// Types are automatically included
import { SimpleButton, LinearProgress, FileTree } from 'siddcn';

// All props are fully typed
<SimpleButton label="Click me" />
<LinearProgress value={50} max={100} />
<FileTree data={treeData} />`}
        language="tsx"
        filename="App.tsx"
      />

      <h2 className="text-2xl font-semibold text-terminal-text">
        Project Structure
      </h2>

      <p className="text-terminal-text/70">
        A typical project using siddcn looks like this:
      </p>

      <CodeBlock
        code={`my-tui-app/
├── src/
│   ├── index.tsx        # Entry point
│   ├── App.tsx          # Main component
│   └── components/      # Your custom components
├── package.json
└── tsconfig.json`}
        language="text"
        filename="Project Structure"
      />
    </article>
  );
}
