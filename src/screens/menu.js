/**
 * screens/menu.js
 * The main menu — entry point when a user connects.
 * Card-based visual component showcase.
 */

"use strict";

const { colors, padEnd, center, visibleLength } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── MENU ITEMS ───────────────────────────────────────────────────────────────

const MENU_ITEMS = [
  {
    key: "buttons",
    label: "Buttons",
    icon: "◉",
    preview: "[ ◉ Primary ]",
    color: colors.cyan,
    desc: "Styled variants",
  },
  {
    key: "select",
    label: "Select",
    icon: "◎",
    preview: "▸ Option 1",
    color: colors.blue,
    desc: "Single-select",
  },
  {
    key: "multiselect",
    label: "Multi-Select",
    icon: "☑",
    preview: "☑ Item A",
    color: colors.green,
    desc: "Checkboxes",
  },
  {
    key: "textinput",
    label: "Text Input",
    icon: "✎",
    preview: "│ Type... ▌",
    color: colors.yellow,
    desc: "Live typing",
  },
  {
    key: "tree",
    label: "Tree",
    icon: "⊞",
    preview: "├── folder/",
    color: colors.magenta,
    desc: "Hierarchy",
  },
  {
    key: "tabs",
    label: "Tabs",
    icon: "⊟",
    preview: "[ Tab 1 ]",
    color: colors.cyan,
    desc: "Tab interface",
  },
  {
    key: "table",
    label: "Table",
    icon: "▦",
    preview: "│ Row 1 │",
    color: colors.blue,
    desc: "Data grid",
  },
  {
    key: "cards",
    label: "Cards",
    icon: "◇",
    preview: "╭─Card─╮",
    color: colors.green,
    desc: "Panel layout",
  },
  {
    key: "badges",
    label: "Badges",
    icon: "◆",
    preview: "[ Active ]",
    color: colors.yellow,
    desc: "Status tags",
  },
  {
    key: "progress",
    label: "Progress",
    icon: "▓",
    preview: "[████░░] 60%",
    color: colors.magenta,
    desc: "Progress bars",
  },
  {
    key: "spinners",
    label: "Spinners",
    icon: "◌",
    preview: "⠋ Loading...",
    color: colors.cyan,
    desc: "Animations",
  },
  {
    key: "chart",
    label: "Chart",
    icon: "▄",
    preview: "▄▆█▅▃",
    color: colors.blue,
    desc: "Live data",
  },
];

// ─── RENDER A COMPONENT CARD ──────────────────────────────────────────────────

function renderCard(item, isSelected, cols) {
  const cardWidth = 26;
  const lines = [];

  const borderColor = isSelected ? item.color : colors.dim;
  const borderChar = isSelected ? "═" : "─";
  const cornerTL = isSelected ? "╔" : "┌";
  const cornerTR = isSelected ? "╗" : "┐";
  const cornerBL = isSelected ? "╚" : "└";
  const cornerBR = isSelected ? "╝" : "┘";
  const sideChar = isSelected ? "║" : "│";

  // Top border
  lines.push(
    borderColor(cornerTL + borderChar.repeat(cardWidth - 2) + cornerTR),
  );

  // Icon + Label
  const labelLine = ` ${item.icon}  ${colors.bold(colors.white(item.label))}`;
  const labelPadded =
    labelLine +
    " ".repeat(Math.max(0, cardWidth - 2 - visibleLength(labelLine)));
  lines.push(borderColor(sideChar) + labelPadded + borderColor(sideChar));

  // Separator
  lines.push(
    borderColor(sideChar) +
      colors.dim("─".repeat(cardWidth - 2)) +
      borderColor(sideChar),
  );

  // Preview
  const previewPadded =
    " " +
    item.preview +
    " ".repeat(Math.max(0, cardWidth - 3 - visibleLength(item.preview)));
  lines.push(
    borderColor(sideChar) +
      (isSelected ? item.color(previewPadded) : colors.dim(previewPadded)) +
      borderColor(sideChar),
  );

  // Description
  const descPadded =
    " " + item.desc + " ".repeat(Math.max(0, cardWidth - 3 - item.desc.length));
  lines.push(
    borderColor(sideChar) +
      colors.dim(colors.gray(descPadded)) +
      borderColor(sideChar),
  );

  // Bottom border
  lines.push(
    borderColor(cornerBL + borderChar.repeat(cardWidth - 2) + cornerBR),
  );

  return lines;
}

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      selected: 0,
    };
  },

  handleInput(session, event) {
    const state = session.screenState;
    const cols = 3; // 3 cards per row

    switch (event.type) {
      case "UP":
        if (state.selected >= cols) {
          state.selected -= cols;
        }
        session.render();
        break;

      case "DOWN":
        if (state.selected + cols < MENU_ITEMS.length) {
          state.selected += cols;
        }
        session.render();
        break;

      case "LEFT":
        if (state.selected % cols !== 0) {
          state.selected--;
        }
        session.render();
        break;

      case "RIGHT":
        if (
          state.selected % cols !== cols - 1 &&
          state.selected < MENU_ITEMS.length - 1
        ) {
          state.selected++;
        }
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
    const { cols } = session;
    const state = session.screenState;
    const lines = [];

    const cardsPerRow = 3;
    const cardWidth = 26;
    const gap = 2;

    // ── Header ──
    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.bold(
            colors.cyan("╔═══════════════════════════════════════════════╗"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push(
      centerBlock(
        [
          colors.bold(
            colors.cyan("║") +
              "      side-ui Component Library Showcase      " +
              colors.cyan("║"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push(
      centerBlock(
        [
          colors.bold(
            colors.cyan("╚═══════════════════════════════════════════════╝"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray("Navigate the grid with arrow keys · Enter to explore"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push("");

    // ── Render cards in grid ──
    const rows = Math.ceil(MENU_ITEMS.length / cardsPerRow);

    for (let row = 0; row < rows; row++) {
      const rowCards = [];
      const cardHeight = 6;

      // Collect cards for this row
      for (let col = 0; col < cardsPerRow; col++) {
        const idx = row * cardsPerRow + col;
        if (idx < MENU_ITEMS.length) {
          const card = renderCard(
            MENU_ITEMS[idx],
            state.selected === idx,
            cols,
          );
          rowCards.push(card);
        } else {
          // Empty placeholder
          rowCards.push(Array(cardHeight).fill(" ".repeat(cardWidth)));
        }
      }

      // Render all lines of this row of cards side-by-side
      for (let lineIdx = 0; lineIdx < cardHeight; lineIdx++) {
        const rowLine = rowCards
          .map((card) => card[lineIdx])
          .join(" ".repeat(gap));
        lines.push(centerBlock([rowLine], cols)[0]);
      }

      lines.push(""); // gap between rows
    }

    // ── Footer ──
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(60)))], cols)[0]);
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray(
              `${MENU_ITEMS.length} components  ·  Arrow keys navigate  ·  Enter select  ·  Ctrl+C quit`,
            ),
          ),
        ],
        cols,
      )[0],
    );

    // CRITICAL FIX: Use \r\n instead of \n for raw mode SSH/TUI sessions
    return lines.join("\r\n");
  },
};
