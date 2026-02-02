/**
 * screens/cards.js
 * Card / panel layout component demo.
 * Shows 4 styled cards arranged in a 2×2 grid.
 * User can navigate between cards with arrow keys.
 */

"use strict";

const { colors, visibleLength } = require("../ansi");
const { drawBox } = require("../components/border");
const { centerBlock } = require("../components/center");

// ─── CARD DATA ────────────────────────────────────────────────────────────────

const CARDS = [
  {
    title: "📊 Analytics",
    color: colors.cyan,
    borderStyle: "round",
    content: [
      "Daily Active Users",
      colors.bold(colors.cyan("  12,847")) +
        colors.dim(colors.green("  ↑ 12.5%")),
      "",
      "Page Views",
      colors.bold(colors.cyan(" 284,921")) +
        colors.dim(colors.green("  ↑ 8.2%")),
      "",
      "Bounce Rate",
      colors.bold(colors.yellow("     34%")) +
        colors.dim(colors.red("   ↑ 2.1%")),
    ],
  },
  {
    title: "⚡ Performance",
    color: colors.green,
    borderStyle: "sharp",
    content: [
      "Response Time",
      colors.bold(colors.green("  124ms")) + colors.dim(colors.gray("  avg")),
      "",
      "Uptime",
      colors.bold(colors.green(" 99.97%")) +
        colors.dim(colors.gray("  last 30d")),
      "",
      "Errors",
      colors.bold(colors.red("      3")) +
        colors.dim(colors.gray("  this hour")),
    ],
  },
  {
    title: "🚀 Deployments",
    color: colors.magenta,
    borderStyle: "round",
    content: [
      "Latest: v2.4.1",
      colors.dim(colors.gray("  deployed 12 min ago")),
      "",
      "Status:  " + colors.green(colors.bold("● Live")),
      "Branch:  " + colors.cyan("main"),
      "CI:      " + colors.green("✓ passed"),
      "",
      "Commits: " +
        colors.yellow("47") +
        colors.dim(colors.gray(" since last")),
    ],
  },
  {
    title: "👥 Team Status",
    color: colors.yellow,
    borderStyle: "heavy",
    content: [
      colors.green("● ") + "Alice        " + colors.dim(colors.gray("working")),
      colors.green("● ") +
        "Bob          " +
        colors.dim(colors.gray("in meeting")),
      colors.yellow("● ") + "Charlie      " + colors.dim(colors.gray("away")),
      colors.green("● ") + "Diana        " + colors.dim(colors.gray("coding")),
      colors.dim(colors.gray("○ ")) +
        "Eve          " +
        colors.dim(colors.gray("offline")),
      "",
      colors.dim(colors.gray("3 online · 1 away · 1 offline")),
    ],
  },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      selected: 0, // Currently highlighted card (0-3)
      accordionOpen: false, // Installation info state
    };
  },

  handleInput(session, event) {
    const state = session.screenState;

    switch (event.type) {
      case "UP":
        // Move up in the 2x2 grid
        if (state.selected >= 2) state.selected -= 2;
        session.render();
        break;

      case "DOWN":
        // Move down in the 2x2 grid
        if (state.selected < 2) state.selected += 2;
        session.render();
        break;

      case "LEFT":
        // Move left in the 2x2 grid
        if (state.selected % 2 === 1) state.selected -= 1;
        session.render();
        break;

      case "RIGHT":
        // Move right in the 2x2 grid
        if (state.selected % 2 === 0) state.selected += 1;
        session.render();
        break;

      case "ESCAPE":
        session.navigate("menu");
        break;

      case "CTRL_C":
        session.destroy();
        break;

      case "CHAR":
        if (event.char === "q" || event.char === "Q") {
          session.navigate("menu");
          return;
        }
        if (event.char === "i" || event.char === "I") {
          state.accordionOpen = !state.accordionOpen;
          session.render();
          return;
        }
        break;
    }
  },

  render(session) {
    const { cols, rows } = session;
    const state = session.screenState;
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Cards / Panels ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Dashboard-style card layouts"))],
        cols,
      )[0],
    );
    lines.push("");

    // ── Render cards in a 2x2 grid ──
    // Each card is rendered as a box, then we interleave rows from left and right cards

    const cardWidth = Math.min(38, Math.floor((cols - 6) / 2));

    // Render each card into its box lines
    const renderedCards = CARDS.map((card, idx) => {
      const isSelected = idx === state.selected;
      const borderColor = isSelected ? card.color : colors.dim;
      const titleStyle = isSelected
        ? colors.bold(card.color(card.title))
        : colors.dim(card.color(card.title));

      return drawBox(card.content, {
        style: card.borderStyle,
        color: borderColor,
        title: card.title,
        width: cardWidth,
        padding: 1,
      });
    });

    // Find the max height across all cards
    const maxHeight = Math.max(...renderedCards.map((c) => c.length));

    // Pad all cards to the same height
    const paddedCards = renderedCards.map((cardLines) => {
      const padded = [...cardLines];
      while (padded.length < maxHeight) {
        padded.push(" ".repeat(cardWidth));
      }
      return padded;
    });

    // Interleave: row 0 = cards[0] and cards[1] side by side
    //             row 1 = cards[2] and cards[3] side by side
    const gap = "   "; // gap between left and right cards

    // Top row (cards 0 and 1)
    for (let line = 0; line < maxHeight; line++) {
      const leftLine = paddedCards[0][line] || " ".repeat(cardWidth);
      const rightLine = paddedCards[1][line] || " ".repeat(cardWidth);
      lines.push(centerBlock([leftLine + gap + rightLine], cols)[0]);
    }

    lines.push(""); // gap between rows

    // Bottom row (cards 2 and 3)
    for (let line = 0; line < maxHeight; line++) {
      const leftLine = paddedCards[2][line] || " ".repeat(cardWidth);
      const rightLine = paddedCards[3][line] || " ".repeat(cardWidth);
      lines.push(centerBlock([leftLine + gap + rightLine], cols)[0]);
    }

    // ── Footer ──
    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(colors.gray("Selected: ")) +
            colors.cyan(colors.bold(CARDS[state.selected].title)),
        ],
        cols,
      )[0],
    );
    lines.push("");

    // ── Installation Accordion ──
    const arrow = state.accordionOpen ? "▼" : "▶";
    const accTitle = ` ${arrow}  How to use Cards `;
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
              colors.yellow("const { drawBox } = require('side-ui')"),
          ],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("2. Define: ") +
              colors.green("const lines = ['Line 1', 'Line 2']"),
          ],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("3. Draw:   ") +
              colors.cyan("drawBox(lines, { title: 'Box', style: 'round' })"),
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
        [colors.dim(colors.gray("↑↓←→ Navigate   i Info   q Back"))],
        cols,
      )[0],
    );

    return lines.join("\r\n"); // Fixed newline for raw mode
  },
};
