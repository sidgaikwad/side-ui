/**
 * screens/textinput.js
 * Text input field demo.
 * User types live into a styled input field.
 * Shows a blinking cursor, input history, and simple validation.
 */

"use strict";

const { colors } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── INPUT PROMPTS ────────────────────────────────────────────────────────────

const PROMPTS = [
  {
    label: "Your Name",
    placeholder: "e.g. John Doe",
    validate: (v) => (v.length > 0 ? null : "Name cannot be empty"),
  },
  {
    label: "Email",
    placeholder: "e.g. you@email.com",
    validate: (v) => (v.includes("@") ? null : "Must contain @"),
  },
  {
    label: "Project",
    placeholder: "e.g. my-awesome-app",
    validate: (v) =>
      /^[a-z0-9-]+$/i.test(v) ? null : "Only letters, numbers, hyphens",
  },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      currentPrompt: 0, // Which prompt we're on
      value: "", // Current input value
      cursor: 0, // Cursor position within value
      history: [], // Previously submitted values
      submitted: false, // Whether current value was submitted
      error: null, // Validation error string or null
      blinkTick: 0, // For cursor blink animation
    };
  },

  onMount(session) {
    // Blink the cursor
    session.startAnimation(() => {
      session.screenState.blinkTick++;
      session.render();
    }, 500); // Blink every 500ms
  },

  handleInput(session, event) {
    const state = session.screenState;
    const prompt = PROMPTS[state.currentPrompt];

    switch (event.type) {
      case "CHAR":
        if (
          event.char === "q" &&
          state.value === "" &&
          state.currentPrompt === 0 &&
          state.history.length === 0
        ) {
          // Only quit if the input is empty on the first prompt (avoid eating 'q' from typed text)
          session.navigate("menu");
          return;
        }
        // Insert character at cursor position
        state.value =
          state.value.slice(0, state.cursor) +
          event.char +
          state.value.slice(state.cursor);
        state.cursor++;
        state.submitted = false;
        state.error = null;
        session.render();
        break;

      case "BACKSPACE":
        if (state.cursor > 0) {
          state.value =
            state.value.slice(0, state.cursor - 1) +
            state.value.slice(state.cursor);
          state.cursor--;
          state.submitted = false;
          state.error = null;
        }
        session.render();
        break;

      case "DELETE":
        if (state.cursor < state.value.length) {
          state.value =
            state.value.slice(0, state.cursor) +
            state.value.slice(state.cursor + 1);
          state.submitted = false;
          state.error = null;
        }
        session.render();
        break;

      case "LEFT":
        state.cursor = Math.max(0, state.cursor - 1);
        session.render();
        break;

      case "RIGHT":
        state.cursor = Math.min(state.value.length, state.cursor + 1);
        session.render();
        break;

      case "HOME":
        state.cursor = 0;
        session.render();
        break;

      case "END":
        state.cursor = state.value.length;
        session.render();
        break;

      case "ENTER":
        // Validate
        const err = prompt.validate(state.value);
        if (err) {
          state.error = err;
          session.render();
          return;
        }
        // Submit
        state.submitted = true;
        state.history.push({ prompt: prompt.label, value: state.value });
        if (state.history.length > 4) state.history.shift();

        // Move to next prompt after a moment
        setTimeout(() => {
          if (session.destroyed) return;
          state.currentPrompt = (state.currentPrompt + 1) % PROMPTS.length;
          state.value = "";
          state.cursor = 0;
          state.submitted = false;
          state.error = null;
          session.render();
        }, 600);
        session.render();
        break;

      case "CTRL_U":
        // Clear the input
        state.value = "";
        state.cursor = 0;
        state.error = null;
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
    const prompt = PROMPTS[state.currentPrompt];
    const lines = [];

    // Cursor blink: visible on even ticks
    const cursorVisible = state.blinkTick % 2 === 0;

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Text Input ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Live text input with cursor and validation"))],
        cols,
      )[0],
    );
    lines.push("");
    lines.push("");

    // ── Prompt step indicator ──
    const steps = PROMPTS.map((p, i) => {
      if (i < state.currentPrompt) return colors.green("●");
      if (i === state.currentPrompt) return colors.cyan(colors.bold("●"));
      return colors.dim(colors.gray("○"));
    }).join(colors.dim(colors.gray(" — ")));

    lines.push(centerBlock([steps], cols)[0]);
    lines.push("");

    // ── Label ──
    lines.push(
      centerBlock(
        [
          colors.bold(colors.white(prompt.label)) +
            colors.dim(colors.gray(" *")),
        ],
        cols,
      )[0],
    );
    lines.push("");

    // ── Input Field ──
    const inputWidth = 44;

    // Build the visible input content
    let displayValue = state.value;
    let displayPlaceholder = "";

    if (state.value === "") {
      displayPlaceholder = prompt.placeholder;
    }

    // Build the input box
    // Top border
    const topBorder = "╭" + "─".repeat(inputWidth - 2) + "╮";
    // Bottom border
    const bottomBorder = "╰" + "─".repeat(inputWidth - 2) + "╯";

    // Content line with cursor
    const contentPadding = 2;
    const maxContentWidth = inputWidth - 2 - contentPadding * 2;

    let contentLine = "";
    if (state.value === "") {
      // Show placeholder
      contentLine = colors.dim(
        colors.gray(displayPlaceholder.slice(0, maxContentWidth)),
      );
      // Cursor at position 0
      if (cursorVisible) {
        contentLine =
          colors.inverse("▌") +
          colors.dim(
            colors.gray(displayPlaceholder.slice(0, maxContentWidth - 1)),
          );
      }
    } else {
      // Show actual value with cursor
      const beforeCursor = state.value.slice(0, state.cursor);
      const atCursor = state.value[state.cursor] || " ";
      const afterCursor = state.value.slice(state.cursor + 1);

      if (cursorVisible) {
        contentLine =
          colors.white(beforeCursor) +
          colors.inverse(atCursor) +
          colors.white(afterCursor);
      } else {
        contentLine = colors.white(state.value);
      }
    }

    // Pad content to fill the box
    const contentVisLen = state.value.length || (state.value === "" ? 1 : 0);
    const rightPad = " ".repeat(
      Math.max(
        0,
        maxContentWidth - Math.max(contentVisLen, displayPlaceholder.length),
      ),
    );

    // Determine border color based on state
    let borderColor;
    if (state.error) borderColor = colors.red;
    else if (state.submitted) borderColor = colors.green;
    else borderColor = colors.cyan;

    lines.push(centerBlock([borderColor(topBorder)], cols)[0]);
    lines.push(
      centerBlock(
        [
          borderColor("│") +
            " ".repeat(contentPadding) +
            contentLine +
            rightPad +
            " ".repeat(contentPadding) +
            borderColor("│"),
        ],
        cols,
      )[0],
    );
    lines.push(centerBlock([borderColor(bottomBorder)], cols)[0]);

    // ── Status / Error / Success ──
    lines.push("");
    if (state.error) {
      lines.push(
        centerBlock([colors.red(colors.bold("✗ " + state.error))], cols)[0],
      );
    } else if (state.submitted) {
      lines.push(
        centerBlock(
          [colors.green(colors.bold('✓ Submitted: "' + state.value + '"'))],
          cols,
        )[0],
      );
    } else {
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("Type and press Enter to submit"))],
          cols,
        )[0],
      );
    }

    // ── History ──
    if (state.history.length > 0) {
      lines.push("");
      lines.push(
        centerBlock([colors.dim(colors.gray("─".repeat(40)))], cols)[0],
      );
      lines.push(centerBlock([colors.dim(colors.gray("History:"))], cols)[0]);
      for (const entry of state.history) {
        lines.push(
          centerBlock(
            [
              colors.dim(colors.gray("  " + entry.prompt + ": ")) +
                colors.dim(colors.cyan('"' + entry.value + '"')),
            ],
            cols,
          )[0],
        );
      }
    }

    // ── Footer ──
    lines.push("");
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray(
              "←→ Move cursor   Ctrl+U Clear   Enter Submit   Esc Back",
            ),
          ),
        ],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};
