# side-ui — SSH Terminal UI Component Library

An interactive terminal UI component library accessible via plain SSH.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Connect from any terminal
ssh -p 2222 demo@localhost
# Password: anything (just press Enter)
```

## Components (13 demos)

| Component     | Type        | Description                 |
| ------------- | ----------- | --------------------------- |
| Buttons       | Interactive | 6 styled button variants    |
| Select List   | Interactive | Single-select navigation    |
| Multi-Select  | Interactive | Checkbox multi-select       |
| Text Input    | Interactive | Live text field with cursor |
| Tree View     | Interactive | Collapsible file hierarchy  |
| Tabs          | Interactive | Tabbed content interface    |
| Table         | Scrollable  | Data table with 20 rows     |
| Cards         | Layout      | 2×2 dashboard card grid     |
| Badges        | Display     | Status badges & tags        |
| Progress Bars | Animated    | 4 bars, 3 styles            |
| Spinners      | Animated    | 8 spinner animations        |
| Bar Chart     | Animated    | Live auto-updating chart    |

## Controls

- **↑↓** — Navigate
- **←→** — Context-dependent (tabs, tree, cards)
- **Enter** — Select / confirm
- **Space** — Toggle (multi-select)
- **q** — Go back
- **Ctrl+C** — Quit

## Architecture

```
server.js          SSH server (ssh2)
src/
  ansi.js          ANSI escape code primitives
  input.js         Raw byte → key event parser
  session.js       Per-client isolated state
  renderer.js      Frame writer (alternate screen buffer)
  screens/         13 screen modules (one per component)
  components/      Reusable renderers (borders, centering, padding)
```

## Multi-User

Every SSH connection gets a fully isolated session. Multiple users can
connect simultaneously — each navigates independently with zero shared state.

## Dependencies

Only **one** npm package: `ssh2`. Everything else is pure Node.js.
