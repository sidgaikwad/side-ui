/**
 * screens/select.js
 * Single-select list component demo.
 * Features:
 * - Keyboard navigation
 * - Category filtering (Dynamic List)
 * - Persistent selection state
 * - Collapsible info panel
 */

"use strict";

const { colors } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── SELECT ITEMS ─────────────────────────────────────────────────────────────

const ITEMS = [
  {
    value: "node",
    label: "Node.js",
    icon: "⬡",
    desc: "JavaScript runtime",
    category: "web",
  },
  {
    value: "python",
    label: "Python",
    icon: "🐍",
    desc: "General purpose",
    category: "systems",
  },
  {
    value: "rust",
    label: "Rust",
    icon: "⬢",
    desc: "Systems language",
    category: "systems",
  },
  {
    value: "go",
    label: "Go",
    icon: "◈",
    desc: "Cloud native",
    category: "systems",
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: "◎",
    desc: "Typed JavaScript",
    category: "web",
  },
  {
    value: "java",
    label: "Java",
    icon: "☕",
    desc: "Enterprise",
    category: "systems",
  },
  {
    value: "swift",
    label: "Swift",
    icon: "◇",
    desc: "Apple ecosystem",
    category: "mobile",
  },
  {
    value: "kotlin",
    label: "Kotlin",
    icon: "◆",
    desc: "JVM language",
    category: "mobile",
  },
  {
    value: "elixir",
    label: "Elixir",
    icon: "◌",
    desc: "Functional",
    category: "web",
  },
  {
    value: "ruby",
    label: "Ruby",
    icon: "◉",
    desc: "Developer joy",
    category: "web",
  },
];

const FILTERS = ["all", "web", "systems"];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      cursor: 0, // Visual cursor position in the *filtered* list
      selectedVal: null, // The actual value of the selected item (persists across filters)
      activeFilter: 0, // Index in FILTERS array
      accordionOpen: false, // Installation info state
    };
  },

  handleInput(session, event) {
    const state = session.screenState;
    const currentFilter = FILTERS[state.activeFilter];

    // Derived list based on filter
    const visibleItems =
      currentFilter === "all"
        ? ITEMS
        : ITEMS.filter(
            (i) => i.category === currentFilter || i.category === "mobile",
          );

    switch (event.type) {
      case "CHAR":
        if (event.char === "q" || event.char === "Q") {
          session.navigate("menu");
          return;
        }
        // 'f' to cycle filters
        if (event.char === "f" || event.char === "F") {
          state.activeFilter = (state.activeFilter + 1) % FILTERS.length;
          state.cursor = 0; // Reset cursor to top when filter changes
          session.render();
          return;
        }
        // 'i' to toggle accordion
        if (event.char === "i" || event.char === "I") {
          state.accordionOpen = !state.accordionOpen;
          session.render();
          return;
        }
        break;

      case "UP":
        state.cursor = Math.max(0, state.cursor - 1);
        session.render();
        break;

      case "DOWN":
        state.cursor = Math.min(visibleItems.length - 1, state.cursor + 1);
        session.render();
        break;

      case "ENTER":
        if (visibleItems.length > 0) {
          state.selectedVal = visibleItems[state.cursor].value;
        }
        session.render();
        break;

      case "ESCAPE":
        session.navigate("menu");
        break;

      case "CTRL_C":
        session.destroy();
        break;
    }
  },

  render(session) {
    const { cols } = session;
    const state = session.screenState;
    const lines = [];

    const currentFilter = FILTERS[state.activeFilter];
    // Re-calculate visible items for rendering
    const visibleItems =
      currentFilter === "all"
        ? ITEMS
        : ITEMS.filter(
            (i) => i.category === currentFilter || i.category === "mobile",
          );

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

    // ── Filter Tabs Component ──
    let filterBar = "";
    FILTERS.forEach((f, idx) => {
      const label = f.toUpperCase();
      if (idx === state.activeFilter) {
        // Active Filter style
        filterBar += colors.cyan(colors.inverse(` ${label} `));
      } else {
        // Inactive Filter style
        filterBar += colors.dim(colors.gray(` [${label}] `));
      }
      filterBar += "  ";
    });
    lines.push(centerBlock([filterBar], cols)[0]);
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(40)))], cols)[0]);
    lines.push("");

    // ── Items List ──
    if (visibleItems.length === 0) {
      lines.push(
        centerBlock([colors.dim(colors.gray("(No items found)"))], cols)[0],
      );
    } else {
      for (let i = 0; i < visibleItems.length; i++) {
        const item = visibleItems[i];
        const isCursor = i === state.cursor;
        const isSelected = item.value === state.selectedVal;

        // Pad label for alignment
        const labelPadded = item.label.padEnd(14);
        const descPadded = item.desc;

        let row;
        // Selection Indicator (Checkmark)
        const checkMark = isSelected ? colors.green(colors.bold(" ✓")) : "  ";

        if (isCursor) {
          // Hovered Row
          row =
            "    " +
            colors.cyan(colors.bold("▸ ")) +
            (isSelected ? colors.green(item.icon) : colors.cyan(item.icon)) +
            " " +
            colors.bold(colors.white(labelPadded)) +
            checkMark +
            colors.dim(colors.cyan("  " + descPadded));
        } else {
          // Normal Row
          const iconStyle = isSelected
            ? colors.green(item.icon)
            : colors.dim(colors.gray(item.icon));
          const textStyle = isSelected
            ? colors.green(labelPadded)
            : colors.gray(labelPadded);

          row =
            "    " +
            "  " + // indent for cursor space
            iconStyle +
            " " +
            textStyle +
            checkMark +
            colors.dim(colors.gray("  " + descPadded));
        }

        lines.push(row);
      }
    }

    // ── Selection confirmation area ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(40)))], cols)[0]);
    lines.push("");

    const selectedItem = ITEMS.find((i) => i.value === state.selectedVal);

    if (selectedItem) {
      lines.push(
        centerBlock(
          [
            colors.dim(colors.gray("Selected: ")) +
              colors.green(
                colors.bold(selectedItem.icon + "  " + selectedItem.label),
              ) +
              colors.dim(colors.gray("  — " + selectedItem.desc)),
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

    // ── Installation Accordion ──
    const arrow = state.accordionOpen ? "▼" : "▶";
    const accTitle = ` ${arrow}  How to use this component `;
    const accHeader = state.accordionOpen
      ? colors.bold(colors.cyan(accTitle))
      : colors.dim(colors.white(accTitle));

    lines.push(centerBlock([accHeader], cols)[0]);

    if (state.accordionOpen) {
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("───────────────────────────────────"))],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("1. Import: ") +
              colors.yellow("const { Select } = require('siddcn')"),
          ],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("2. Data:   ") +
              colors.green("const items = [{ label: 'Node', ... }]"),
          ],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("3. Render: ") +
              colors.cyan("<Select items={items} onSelect={...} />"),
          ],
          cols,
        )[0],
      );
      lines.push("");
    } else {
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("   (Press 'i' to view code)"))],
          cols,
        )[0],
      );
    }

    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray(
              "↑↓ Navigate   f Filter   Enter Select   i Info   q Back",
            ),
          ),
        ],
        cols,
      )[0],
    );

    return lines.join("\r\n"); // Fixed newline for raw mode
  },
};
