/**
 * screens/progress.js
 * Animated progress bar demo.
 * Shows multiple progress bars auto-filling at different rates.
 * Demonstrates different bar styles including a "Racing" bar.
 * Includes an interactive installation accordion.
 */

"use strict";

const { colors } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── PROGRESS BAR CONFIGS ─────────────────────────────────────────────────────

const BARS = [
  {
    label: "Downloading",
    speed: 1.2,
    color: colors.cyan,
    style: "block",
    width: 40,
  },
  {
    label: "Compiling",
    speed: 0.7,
    color: colors.green,
    style: "hash",
    width: 40,
  },
  {
    label: "Uploading",
    speed: 0.4,
    color: colors.yellow,
    style: "equal",
    width: 40,
  },
  {
    label: "Processing",
    speed: 0.9,
    color: colors.magenta,
    style: "block",
    width: 40,
  },
  {
    label: "Deployment",
    speed: 1.5,
    color: colors.red,
    style: "racing", // 🏎 Real Car Style
    width: 40,
  },
];

// ─── BAR RENDERERS ────────────────────────────────────────────────────────────

function renderBar(pct, width, style, colorFn) {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;

  let filledStr, emptyStr, left, right;

  switch (style) {
    case "block":
      filledStr = "█".repeat(filled);
      emptyStr = "░".repeat(empty);
      left = "[";
      right = "]";
      break;
    case "hash":
      filledStr = "#".repeat(filled);
      emptyStr = "·".repeat(empty);
      left = "|";
      right = "|";
      break;
    case "equal":
      filledStr = "=".repeat(filled);
      emptyStr = "-".repeat(empty);
      left = "[";
      right = "]";
      break;
    case "racing":
      // Racing style:  ═════🏎 -------
      // We use the real car emoji.
      // NOTE: On Windows, '🏎' faces LEFT. On Mac/Linux, it faces RIGHT.
      // We use a '═' trail to visually indicate speed/direction regardless of car orientation.
      if (filled === 0) {
        filledStr = "";
        emptyStr = "─".repeat(empty);
      } else if (filled >= width) {
        filledStr = "═".repeat(filled);
        emptyStr = "";
      } else {
        // We subtract 1 from repeat to make room for the car itself
        filledStr = "═".repeat(Math.max(0, filled - 1)) + "🏎";
        emptyStr = "─".repeat(Math.max(0, empty - 1));
      }
      left = "🏁"; // Start flag
      right = " ";
      break;
    default:
      filledStr = "█".repeat(filled);
      emptyStr = "░".repeat(empty);
      left = "[";
      right = "]";
  }

  // Color transitions based on percentage
  let barColor;
  if (pct >= 100) {
    barColor = colors.green;
  } else if (pct >= 75) {
    barColor = colors.cyan;
  } else if (pct >= 50) {
    barColor = colors.yellow;
  } else {
    barColor = colorFn;
  }

  const pctStr = String(Math.round(pct)).padStart(3, " ") + "%";

  return (
    colors.dim(colors.gray(left)) +
    barColor(filledStr) +
    colors.dim(colors.gray(emptyStr)) +
    colors.dim(colors.gray(right)) +
    " " +
    (pct >= 100 ? colors.green(colors.bold(pctStr)) : colors.white(pctStr))
  );
}

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      progresses: BARS.map(() => 0), // Current percentage for each bar
      completed: 0, // Count of bars that hit 100%
      tick: 0, // Frame counter
      accordionOpen: false, // State for the installation accordion
    };
  },

  onMount(session) {
    // Start the animation loop at ~15 fps
    session.startAnimation(() => {
      const state = session.screenState;
      state.tick++;

      let allDone = true;
      for (let i = 0; i < BARS.length; i++) {
        if (state.progresses[i] < 100) {
          allDone = false;
          // Each bar advances at its own speed
          state.progresses[i] += BARS[i].speed;
          if (state.progresses[i] >= 100) {
            state.progresses[i] = 100;
            state.completed++;
          }
        }
      }

      // If all bars completed, reset after a pause
      if (allDone) {
        // Wait 60 ticks (~4 seconds) then reset
        if (state.tick % 60 === 0) {
          state.progresses = BARS.map(() => 0);
          state.completed = 0;
          state.tick = 0;
        }
      }

      session.render();
    }, 66); // ~15 fps
  },

  handleInput(session, event) {
    const state = session.screenState;

    if (event.type === "CHAR" && (event.char === "q" || event.char === "Q")) {
      session.navigate("menu");
      return;
    }
    if (event.type === "ESCAPE") {
      session.navigate("menu");
      return;
    }
    if (event.type === "CTRL_C") {
      session.destroy();
      return;
    }
    // 'r' to reset animation
    if (event.type === "CHAR" && (event.char === "r" || event.char === "R")) {
      state.progresses = BARS.map(() => 0);
      state.completed = 0;
      state.tick = 0;
    }
    // 'i' to toggle installation accordion
    if (event.type === "CHAR" && (event.char === "i" || event.char === "I")) {
      state.accordionOpen = !state.accordionOpen;
      session.render();
    }
  },

  render(session) {
    const { cols } = session;
    const state = session.screenState;
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Progress Bars ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Animated progress with style variants"))],
        cols,
      )[0],
    );
    lines.push("");
    lines.push("");

    // ── Progress Bars ──
    for (let i = 0; i < BARS.length; i++) {
      const bar = BARS[i];
      const pct = state.progresses[i];
      const done = pct >= 100;

      // Label line
      const labelPadded = bar.label.padEnd(14);
      let labelLine;
      if (done) {
        labelLine =
          colors.green(colors.bold(labelPadded)) +
          colors.green(colors.bold(" ✓ Complete"));
      } else {
        labelLine =
          colors.white(colors.bold(labelPadded)) +
          colors.dim(colors.gray(" ●"));
        // Animate the dots while in progress
        const dots = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
        const spinnerChar = dots[state.tick % dots.length];
        labelLine =
          colors.white(colors.bold(labelPadded)) +
          " " +
          BARS[i].color(spinnerChar);
      }

      lines.push(centerBlock([labelLine], cols)[0]);

      // Bar line
      const barRendered = renderBar(pct, bar.width, bar.style, bar.color);
      lines.push(centerBlock([barRendered], cols)[0]);
      lines.push("");
    }

    // ── Status summary ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(44)))], cols)[0]);

    const completedCount = state.progresses.filter((p) => p >= 100).length;
    if (completedCount === BARS.length) {
      lines.push(
        centerBlock(
          [colors.green(colors.bold("✓ All tasks completed!"))],
          cols,
        )[0],
      );
    } else {
      lines.push(
        centerBlock(
          [
            colors.dim(
              colors.gray(`${completedCount}/${BARS.length} complete`),
            ),
          ],
          cols,
        )[0],
      );
    }
    lines.push("");

    // ── Installation Accordion ──
    const arrow = state.accordionOpen ? "▼" : "▶";
    const accTitle = ` ${arrow}  Get these components `;
    const accHeader = state.accordionOpen
      ? colors.bold(colors.cyan(accTitle))
      : colors.dim(colors.white(accTitle));

    lines.push(centerBlock([accHeader], cols)[0]);

    if (state.accordionOpen) {
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("──────────────────────────────"))],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [colors.white("1. Install: ") + colors.yellow("npm install side-ui")],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("2. Import:  ") +
              colors.green("const { ProgressBar } = require('side-ui')"),
          ],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("3. Use:     ") +
              colors.cyan("<ProgressBar style='racing' />"),
          ],
          cols,
        )[0],
      );
      lines.push("");
    } else {
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("   (Press 'i' to view installation)"))],
          cols,
        )[0],
      );
    }

    lines.push("");
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("r Reset   i Install info   q Back"))],
        cols,
      )[0],
    );

    return lines.join("\r\n"); // Fixed newline for raw mode
  },
};
