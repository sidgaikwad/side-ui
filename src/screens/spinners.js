/**
 * screens/spinners.js
 * Showcases different spinner/loader animation styles.
 * All run simultaneously so you can see and compare them side by side.
 */

"use strict";

const { colors } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── SPINNER DEFINITIONS ──────────────────────────────────────────────────────
// Each spinner has: frames (array of strings), label, color, description

const SPINNERS = [
  {
    name: "Braille",
    label: "Loading data...",
    color: colors.cyan,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    desc: "Smooth braille-dot rotation",
  },
  {
    name: "Dots",
    label: "Connecting...",
    color: colors.green,
    frames: ["⠁", "⠃", "⠇", "⏐", "⏐", "⠇", "⠃", "⠁", "⠂", "⠄"],
    desc: "Traveling dot pattern",
  },
  {
    name: "Line",
    label: "Processing...",
    color: colors.yellow,
    frames: ["─", "╲", "│", "╱"],
    desc: "Classic rotating line",
  },
  {
    name: "Arrow",
    label: "Fetching...",
    color: colors.magenta,
    frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
    desc: "Moving arrow indicator",
  },
  {
    name: "Bounce",
    label: "Syncing...",
    color: colors.blue,
    frames: ["▄▄▄", "▀▄▄", "▀▀▄", "▀▀▀", "▀▀▄", "▀▄▄"],
    desc: "Bouncing block animation",
  },
  {
    name: "Clock",
    label: "Waiting...",
    color: colors.red,
    frames: [
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚",
      "🕛",
    ],
    desc: "Clock face rotation",
  },
  {
    name: "Pulse",
    label: "Scanning...",
    color: colors.brightCyan,
    frames: [
      "░░░░░░░░",
      "▒░░░░░░░",
      "▒▒░░░░░░",
      "▒▒▒░░░░░",
      "▒▒▒▒░░░░",
      "▒▒▒░░░░░",
      "▒▒░░░░░░",
      "▒░░░░░░░",
    ],
    desc: "Pulsing fill effect",
  },
  {
    name: "Dots2",
    label: "Uploading...",
    color: colors.brightGreen,
    frames: ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"],
    desc: "Dense braille rotation",
  },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      tick: 0,
    };
  },

  onMount(session) {
    session.startAnimation(() => {
      session.screenState.tick++;
      session.render();
    }, 80); // ~12.5 fps — nice and smooth
  },

  handleInput(session, event) {
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
  },

  render(session) {
    const { cols } = session;
    const { tick } = session.screenState;
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock(
        [colors.bold(colors.cyan("── Spinner Animations ──"))],
        cols,
      )[0],
    );
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray("8 spinner styles — all animated simultaneously"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push("");
    lines.push("");

    // ── Render each spinner as a row ──
    // Layout: [Spinner] Label             Name        Description
    for (let i = 0; i < SPINNERS.length; i++) {
      const sp = SPINNERS[i];
      const frameIndex = tick % sp.frames.length;
      const frame = sp.frames[frameIndex];

      // Name column (padded)
      const namePadded = sp.name.padEnd(10);
      // Label column (padded)
      const labelPadded = sp.label.padEnd(18);

      // Increase padding to 10 to accommodate the wide 'Pulse' spinner (8 chars)
      // This prevents the label column from jittering between rows.
      const framePadded = frame.padEnd(10);

      const row =
        "    " +
        sp.color(colors.bold(framePadded)) + // The animated spinner frame
        "  " +
        colors.white(labelPadded) + // What it's "doing"
        colors.dim(colors.cyan(namePadded)) + // Spinner name
        colors.dim(colors.gray(sp.desc)); // Description

      lines.push(row);
      lines.push("");
    }

    // ── Footer ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(44)))], cols)[0]);
    lines.push(
      centerBlock([colors.dim(colors.gray("Frame: " + tick))], cols)[0],
    );
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("q Back"))], cols)[0]);

    return lines.join("\r\n"); // Fixed newline for raw mode
  },
};
