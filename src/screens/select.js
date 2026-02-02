/**
 * screens/select.js
 * Single-select list component demo.
 * User navigates with arrows, presses Enter to select.
 * Shows the selected item in a confirmation area below.
 */

"use strict";

const { colors } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── SELECT ITEMS ─────────────────────────────────────────────────────────────

const ITEMS = [
  { value: "node", label: "Node.js", icon: "⬡", desc: "JavaScript runtime" },
  { value: "python", label: "Python", icon: "🐍", desc: "General purpose" },
  { value: "rust", label: "Rust", icon: "⬢", desc: "Systems language" },
  { value: "go", label: "Go", icon: "◈", desc: "Cloud native" },
  {
    value: "typescript",
    label: "TypeScript",
    icon: "◎",
    desc: "Typed JavaScript",
  },
  { value: "java", label: "Java", icon: "☕", desc: "Enterprise" },
  { value: "swift", label: "Swift", icon: "◇", desc: "Apple ecosystem" },
  { value: "kotlin", label: "Kotlin", icon: "◆", desc: "JVM language" },
  { value: "elixir", label: "Elixir", icon: "◌", desc: "Functional" },
  { value: "ruby", label: "Ruby", icon: "◉", desc: "Developer joy" },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      cursor: 0, // Currently highlighted item
      selected: null, // The confirmed selection (index or null)
    };
  },

  handleInput(session, event) {
    const state = session.screenState;

    switch (event.type) {
      case "UP":
        state.cursor = Math.max(0, state.cursor - 1);
        session.render();
        break;

      case "DOWN":
        state.cursor = Math.min(ITEMS.length - 1, state.cursor + 1);
        session.render();
        break;

      case "ENTER":
        state.selected = state.cursor;
        session.render();
        break;

      case "ESCAPE":
        session.navigate("menu");
        break;

      case "CTRL_C":
        session.destroy();
        break;
    }

    if (event.type === "CHAR" && (event.char === "q" || event.char === "Q")) {
      session.navigate("menu");
    }
  },

  render(session) {
    const { cols } = session;
    const state = session.screenState;
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Select List ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Choose your favorite programming language"))],
        cols,
      )[0],
    );
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(40)))], cols)[0]);
    lines.push("");

    // ── Items ──
    for (let i = 0; i < ITEMS.length; i++) {
      const item = ITEMS[i];
      const isCursor = i === state.cursor;
      const isSelected = i === state.selected;

      // Pad label for alignment
      const labelPadded = item.label.padEnd(14);
      const descPadded = item.desc;

      let row;
      if (isCursor && isSelected) {
        // Currently hovered AND is the confirmed selection
        row =
          "    " +
          colors.cyan(colors.bold("▸ ")) +
          colors.cyan(colors.bold(item.icon)) +
          " " +
          colors.bold(colors.white(labelPadded)) +
          colors.green(colors.bold(" ✓")) +
          colors.dim(colors.cyan("  " + descPadded));
      } else if (isCursor) {
        // Currently hovered
        row =
          "    " +
          colors.cyan(colors.bold("▸ ")) +
          colors.cyan(item.icon) +
          " " +
          colors.bold(colors.white(labelPadded)) +
          colors.dim(colors.cyan("  " + descPadded));
      } else if (isSelected) {
        // Confirmed selection but not hovered
        row =
          "    " +
          colors.dim("  ") +
          colors.green(item.icon) +
          " " +
          colors.green(labelPadded) +
          colors.green(colors.bold(" ✓")) +
          colors.dim(colors.gray("  " + descPadded));
      } else {
        // Normal item
        row =
          "    " +
          colors.dim("  ") +
          colors.dim(colors.gray(item.icon)) +
          " " +
          colors.gray(labelPadded) +
          colors.dim(colors.gray("  " + descPadded));
      }

      lines.push(row);
    }

    // ── Selection confirmation area ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(40)))], cols)[0]);
    lines.push("");

    if (state.selected !== null) {
      const sel = ITEMS[state.selected];
      lines.push(
        centerBlock(
          [
            colors.dim(colors.gray("Selected: ")) +
              colors.green(colors.bold(sel.icon + "  " + sel.label)) +
              colors.dim(colors.gray("  — " + sel.desc)),
          ],
          cols,
        )[0],
      );
    } else {
      lines.push(
        centerBlock(
          [
            colors.dim(
              colors.gray("No selection yet. Press Enter to confirm."),
            ),
          ],
          cols,
        )[0],
      );
    }

    lines.push("");
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("↑↓ Navigate   Enter Select   q Back"))],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};
