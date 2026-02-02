#!/usr/bin/env node
/**
 * install-component.js
 * CLI tool to install individual TermUI components
 *
 * Usage:
 *   node install-component.js progress
 *   node install-component.js buttons --path ./my-components
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ─── COMPONENT REGISTRY ───────────────────────────────────────────────────────

const COMPONENTS = {
  progress: {
    name: "Progress Bar",
    files: [
      "src/screens/progress.js",
      "src/ansi.js",
      "src/components/center.js",
      "src/components/border.js",
    ],
  },
  spinners: {
    name: "Spinners",
    files: [
      "src/screens/spinners.js",
      "src/ansi.js",
      "src/components/center.js",
    ],
  },
  buttons: {
    name: "Buttons",
    files: [
      "src/screens/buttons.js",
      "src/ansi.js",
      "src/components/border.js",
      "src/components/center.js",
    ],
  },
  table: {
    name: "Data Table",
    files: ["src/screens/table.js", "src/ansi.js", "src/components/center.js"],
  },
  select: {
    name: "Select List",
    files: ["src/screens/select.js", "src/ansi.js", "src/components/center.js"],
  },
  multiselect: {
    name: "Multi-Select",
    files: [
      "src/screens/multiselect.js",
      "src/ansi.js",
      "src/components/center.js",
    ],
  },
  textinput: {
    name: "Text Input",
    files: [
      "src/screens/textinput.js",
      "src/ansi.js",
      "src/components/center.js",
    ],
  },
  tree: {
    name: "Tree View",
    files: ["src/screens/tree.js", "src/ansi.js", "src/components/center.js"],
  },
  chart: {
    name: "Bar Chart",
    files: ["src/screens/chart.js", "src/ansi.js", "src/components/center.js"],
  },
  cards: {
    name: "Cards",
    files: [
      "src/screens/cards.js",
      "src/ansi.js",
      "src/components/border.js",
      "src/components/center.js",
    ],
  },
  badges: {
    name: "Badges",
    files: [
      "src/screens/badges.js",
      "src/ansi.js",
      "src/components/center.js",
      "src/components/border.js",
    ],
  },
  tabs: {
    name: "Tabs",
    files: ["src/screens/tabs.js", "src/ansi.js", "src/components/center.js"],
  },
};

// ─── CLI ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const componentId = args[0];
const targetPath = args.includes("--path")
  ? args[args.indexOf("--path") + 1]
  : "./termui-components";

if (!componentId) {
  console.log("");
  console.log("  TermUI Component Installer");
  console.log("  ─────────────────────────────");
  console.log("");
  console.log("  Usage:");
  console.log(
    "    node install-component.js <component-id> [--path <target-dir>]",
  );
  console.log("");
  console.log("  Available components:");
  Object.keys(COMPONENTS).forEach((id) => {
    console.log(`    • ${id.padEnd(15)} — ${COMPONENTS[id].name}`);
  });
  console.log("");
  console.log("  Examples:");
  console.log("    node install-component.js progress");
  console.log(
    "    node install-component.js buttons --path ./my-app/components",
  );
  console.log("");
  process.exit(0);
}

const component = COMPONENTS[componentId];

if (!component) {
  console.error(`✗ Component "${componentId}" not found.`);
  console.error("");
  console.error("Available: " + Object.keys(COMPONENTS).join(", "));
  process.exit(1);
}

// ─── INSTALL ──────────────────────────────────────────────────────────────────

console.log("");
console.log(`  Installing ${component.name}...`);
console.log("");

let copiedCount = 0;
const copiedFiles = [];

for (const file of component.files) {
  const sourcePath = path.join(__dirname, file);
  const targetFilePath = path.join(targetPath, file);

  if (!fs.existsSync(sourcePath)) {
    console.log(`  ⚠ Source not found: ${file}`);
    continue;
  }

  // Create directory structure
  const targetDir = path.dirname(targetFilePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy file
  fs.copyFileSync(sourcePath, targetFilePath);
  console.log(`  ✓ Copied: ${file}`);
  copiedCount++;
  copiedFiles.push(file);
}

console.log("");
console.log(`  ✓ Installation complete! (${copiedCount} files)`);
console.log("");
console.log("  Files installed to:");
console.log(`    ${path.resolve(targetPath)}`);
console.log("");
console.log("  Usage in your code:");
console.log(
  `    const ${componentId} = require('./${path.join(targetPath, "src/screens", componentId)}.js');`,
);
console.log("");

// Generate example usage file
const examplePath = path.join(targetPath, `example-${componentId}.js`);
const exampleCode = `/**
 * Example usage of ${component.name} component
 */

const { Session } = require('./src/session');  // You'll need session.js too
const ${componentId}Screen = require('./src/screens/${componentId}');

// Create a mock session for testing
// In a real SSH app, you'd get this from your SSH server
const mockStream = process.stdout;
const session = new Session(mockStream, 120, 30);

// Initialize and render the component
session.currentScreenKey = '${componentId}';
session.screenState = ${componentId}Screen.initState ? ${componentId}Screen.initState(session) : {};

if (${componentId}Screen.onMount) {
  ${componentId}Screen.onMount(session);
}

// Render
const frame = ${componentId}Screen.render(session);
console.log(frame);

// Handle input (example)
process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
  const key = data.toString();
  
  // Parse key event (simplified)
  let event = { type: 'CHAR', char: key };
  if (key === '\\x1b[A') event = { type: 'UP' };
  if (key === '\\x1b[B') event = { type: 'DOWN' };
  if (key === '\\r')     event = { type: 'ENTER' };
  if (key === '\\x03')   process.exit(0);  // Ctrl+C
  
  ${componentId}Screen.handleInput(session, event);
});
`;

fs.writeFileSync(examplePath, exampleCode);
console.log("  ✓ Example file created:");
console.log(`    ${path.resolve(examplePath)}`);
console.log("");
