/**
 * screens/buttons.js
 * Showcases styled terminal button variants.
 * User can cycle through buttons and "press" them.
 */

"use strict";

const { colors, bg, visibleLength, padEnd } = require("../ansi");
const { drawBox } = require("../components/border");
const { centerBlock } = require("../components/center");

// ─── BUTTON DEFINITIONS ──────────────────────────────────────────────────────

const BUTTONS = [
  {
    label: "Primary",
    symbol: "◉",
    render: (isSelected, isPressed) => {
      const label = " ◉  Primary  ";
      if (isPressed) return colors.bold(bg.cyan(colors.white(label)));
      if (isSelected)
        return colors.bold(
          colors.cyan("▸ ") + bg.color256(24, colors.white(label)) + " ◂",
        );
      return colors.dim(colors.cyan("  " + label + "  "));
    },
    desc: "Main call-to-action. Bold and prominent.",
  },
  {
    label: "Secondary",
    symbol: "◎",
    render: (isSelected, isPressed) => {
      const label = " ◎  Secondary ";
      if (isPressed) return colors.bold(bg.blue(colors.white(label)));
      if (isSelected)
        return colors.bold(colors.blue("▸ ") + colors.inverse(label) + " ◂");
      return colors.dim(colors.blue("  " + label + "  "));
    },
    desc: "Supporting action. Softer presence.",
  },
  {
    label: "Danger",
    symbol: "⚠",
    render: (isSelected, isPressed) => {
      const label = " ⚠  Danger   ";
      if (isPressed) return colors.bold(bg.red(colors.white(label)));
      if (isSelected)
        return colors.bold(
          colors.red("▸ ") + bg.color256(52, colors.white(label)) + " ◂",
        );
      return colors.dim(colors.red("  " + label + "  "));
    },
    desc: "Destructive actions. Warns the user.",
  },
  {
    label: "Success",
    symbol: "✓",
    render: (isSelected, isPressed) => {
      const label = " ✓  Success  ";
      if (isPressed) return colors.bold(bg.green(colors.white(label)));
      if (isSelected)
        return colors.bold(
          colors.green("▸ ") + bg.color256(22, colors.white(label)) + " ◂",
        );
      return colors.dim(colors.green("  " + label + "  "));
    },
    desc: "Confirms a positive action.",
  },
  {
    label: "Ghost",
    symbol: "○",
    render: (isSelected, isPressed) => {
      const label = " ○  Ghost    ";
      if (isPressed) return colors.bold(colors.inverse(label));
      if (isSelected)
        return colors.bold(
          colors.white("▸ ") + colors.underline(colors.white(label)) + " ◂",
        );
      return colors.dim(colors.gray("  " + label + "  "));
    },
    desc: "Minimal. Blends into the background.",
  },
  {
    label: "Outlined",
    symbol: "□",
    render: (isSelected, isPressed) => {
      const label = " □  Outlined ";
      if (isPressed) return colors.bold(bg.magenta(colors.white(label)));
      if (isSelected)
        return colors.bold(
          colors.magenta("▸ ") + colors.magenta(colors.bold(label)) + " ◂",
        );
      return colors.dim(colors.magenta("  " + label + "  "));
    },
    desc: "Bordered style. Clean and structured.",
  },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      selected: 0,
      pressed: null, // index of button being "pressed"
      history: [], // log of pressed buttons
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
        state.selected = Math.min(BUTTONS.length - 1, state.selected + 1);
        session.render();
        break;

      case "ENTER":
      case "CHAR":
        if (event.type === "CHAR" && event.char === " ") {
          // Space also acts as press
        } else if (event.type === "CHAR") {
          break;
        }
        // "Press" the button — show pressed state briefly
        state.pressed = state.selected;
        state.history.push(BUTTONS[state.selected].label);
        if (state.history.length > 5) state.history.shift();
        session.render();

        // Reset pressed state after a short flash
        setTimeout(() => {
          if (!session.destroyed) {
            state.pressed = null;
            session.render();
          }
        }, 150);
        break;

      case "CHAR":
        if (event.char === "q" || event.char === "Q") {
          session.navigate("menu");
        }
        break;

      case "ESCAPE":
        session.navigate("menu");
        break;

      case "CTRL_C":
        session.destroy();
        break;
    }

    // Handle 'q' explicitly
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
      centerBlock(
        [colors.bold(colors.cyan("── Button Components ──"))],
        cols,
      )[0],
    );
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray("Styled button variants for terminal interfaces"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push("");
    lines.push("");

    // ── Buttons ──
    for (let i = 0; i < BUTTONS.length; i++) {
      const btn = BUTTONS[i];
      const isSelected = i === state.selected;
      const isPressed = i === state.pressed;

      const rendered = btn.render(isSelected, isPressed);
      lines.push(centerBlock([rendered], cols)[0]);

      // Description under each button
      const descStyle = isSelected
        ? colors.dim(colors.white(btn.desc))
        : colors.dim(colors.gray(btn.desc));
      lines.push(centerBlock([descStyle], cols)[0]);
      lines.push("");
    }

    // ── Press History Log ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(36)))], cols)[0]);

    if (state.history.length > 0) {
      lines.push(
        centerBlock(
          [
            colors.dim(colors.gray("Recent: ")) +
              colors.yellow(state.history.join(" → ")),
          ],
          cols,
        )[0],
      );
    } else {
      lines.push(
        centerBlock(
          [
            colors.dim(
              colors.gray("Press Enter or Space to activate a button"),
            ),
          ],
          cols,
        )[0],
      );
    }

    lines.push("");
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("↑↓ Navigate   Enter Press   q Back"))],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};
