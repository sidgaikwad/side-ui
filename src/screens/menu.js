/**
 * screens/menu.js
 * The main menu — entry point when a user connects.
 * Displays all available component demos in a styled navigable list.
 */

"use strict";

const { colors, padEnd, center, visibleLength } = require("../ansi");
const { drawBox } = require("../components/border");
const { centerBlock } = require("../components/center");

// ─── MENU ITEMS ───────────────────────────────────────────────────────────────
// Each item: { key, label, icon, desc, category }

const MENU_ITEMS = [
  {
    key: "buttons",
    label: "Buttons",
    icon: "◉",
    desc: "Styled button variants",
    category: "Interactive",
  },
  {
    key: "select",
    label: "Select List",
    icon: "◎",
    desc: "Single-select navigation",
    category: "Interactive",
  },
  {
    key: "multiselect",
    label: "Multi-Select",
    icon: "☑",
    desc: "Checkbox multi-select",
    category: "Interactive",
  },
  {
    key: "textinput",
    label: "Text Input",
    icon: "✎",
    desc: "Live text input field",
    category: "Interactive",
  },
  {
    key: "tree",
    label: "Tree View",
    icon: "⊞",
    desc: "Collapsible hierarchy",
    category: "Interactive",
  },
  {
    key: "tabs",
    label: "Tabs",
    icon: "⊟",
    desc: "Tabbed interface",
    category: "Interactive",
  },
  {
    key: "table",
    label: "Table",
    icon: "⊞",
    desc: "Data table with scrolling",
    category: "Display",
  },
  {
    key: "cards",
    label: "Cards",
    icon: "◇",
    desc: "Panel / card layouts",
    category: "Display",
  },
  {
    key: "badges",
    label: "Badges",
    icon: "◆",
    desc: "Status badges & tags",
    category: "Display",
  },
  {
    key: "progress",
    label: "Progress Bars",
    icon: "▓",
    desc: "Animated progress bars",
    category: "Animated",
  },
  {
    key: "spinners",
    label: "Spinners",
    icon: "◌",
    desc: "Loading spinner animations",
    category: "Animated",
  },
  {
    key: "chart",
    label: "Bar Chart",
    icon: "▄",
    desc: "Live ASCII bar chart",
    category: "Animated",
  },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      selected: 0,
    };
  },

  handleInput(session, event) {
    const state = session.screenState;

    switch (event.type) {
      case "UP":
        state.selected = Math.max(0, state.selected - 1);
        session.render();
        break;

      case "DOWN":
        state.selected = Math.min(MENU_ITEMS.length - 1, state.selected + 1);
        session.render();
        break;

      case "ENTER":
        const item = MENU_ITEMS[state.selected];
        if (item) {
          session.navigate(item.key);
        }
        break;

      case "CTRL_C":
        session.destroy();
        break;
    }
  },

  render(session) {
    const { cols, rows } = session;
    const state = session.screenState;
    const lines = [];

    // ── Header ──
    const headerTitle = colors.bold(
      colors.cyan("  ╔══════════════════════════════════════╗"),
    );
    const headerMid = colors.bold(
      colors.cyan("  ║") +
        colors.white("        TermUI Component Library       ") +
        colors.cyan("║"),
    );
    const headerBot = colors.bold(
      colors.cyan("  ╚══════════════════════════════════════╝"),
    );

    lines.push("");
    lines.push(centerBlock([headerTitle], cols)[0]);
    lines.push(centerBlock([headerMid], cols)[0]);
    lines.push(centerBlock([headerBot], cols)[0]);
    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray("Interactive Terminal UI Components — SSH Edition"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push("");
    lines.push("");

    // ── Category grouping ──
    let currentCategory = "";

    for (let i = 0; i < MENU_ITEMS.length; i++) {
      const item = MENU_ITEMS[i];
      const isSelected = i === state.selected;

      // Print category header when it changes
      if (item.category !== currentCategory) {
        currentCategory = item.category;
        if (i > 0) lines.push(""); // gap between groups

        let catColor;
        switch (currentCategory) {
          case "Interactive":
            catColor = colors.cyan;
            break;
          case "Display":
            catColor = colors.yellow;
            break;
          case "Animated":
            catColor = colors.magenta;
            break;
          default:
            catColor = colors.gray;
        }
        lines.push("  " + catColor(colors.bold(`── ${currentCategory} ──`)));
      }

      // ── Menu item row ──
      const icon = item.icon;
      const label = item.label;
      const desc = item.desc;

      // Pad label to fixed width for alignment
      const labelWidth = 18;
      const paddedLabel =
        label + " ".repeat(Math.max(0, labelWidth - label.length));

      if (isSelected) {
        // Selected row: highlighted
        const row =
          "  " +
          colors.cyan(colors.bold("▸ ")) +
          colors.cyan(colors.bold(icon)) +
          " " +
          colors.bold(colors.white(paddedLabel)) +
          colors.dim(colors.cyan(desc));
        lines.push(row);
      } else {
        // Normal row
        const row =
          "  " +
          colors.dim("  ") +
          colors.dim(colors.gray(icon)) +
          " " +
          colors.gray(paddedLabel) +
          colors.dim(colors.gray(desc));
        lines.push(row);
      }
    }

    // ── Footer ──
    lines.push("");
    lines.push("");
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("↑↓ Navigate   Enter Select   q Quit"))],
        cols,
      )[0],
    );
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(40)))], cols)[0]);
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray(
              "Connected via SSH  ·  " +
                MENU_ITEMS.length +
                " components  ·  Node.js",
            ),
          ),
        ],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};
