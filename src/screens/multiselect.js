/**
 * screens/multiselect.js
 * Multi-select checkbox list demo.
 * Features:
 * - Toggle selection (Space)
 * - Bulk actions (Select All/None)
 * - Limit enforcement (Max 3 items)
 * - View filtering (Show selected only)
 */

"use strict";

const { colors } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── ITEMS ────────────────────────────────────────────────────────────────────

const ITEMS = [
  { value: "docker", label: "Docker", desc: "Containerization" },
  { value: "kubernetes", label: "Kubernetes", desc: "Container orchestration" },
  { value: "terraform", label: "Terraform", desc: "Infrastructure as code" },
  { value: "aws", label: "AWS", desc: "Cloud platform" },
  { value: "gcp", label: "GCP", desc: "Google Cloud" },
  { value: "azure", label: "Azure", desc: "Microsoft Cloud" },
  { value: "github", label: "GitHub Actions", desc: "CI/CD pipeline" },
  { value: "gitlab", label: "GitLab CI", desc: "DevOps platform" },
  { value: "jenkins", label: "Jenkins", desc: "Automation server" },
  { value: "ansible", label: "Ansible", desc: "Config management" },
  { value: "grafana", label: "Grafana", desc: "Monitoring dashboards" },
  { value: "prometheus", label: "Prometheus", desc: "Metrics collection" },
];

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {
      cursor: 0,
      checked: new Set(), // Set of checked indices
      confirmed: false, // Whether the user pressed Enter to confirm
      accordionOpen: false, // Installation info
      maxSelect: 0, // 0 = unlimited, 3 = max 3
      viewMode: "all", // 'all' or 'selected'
    };
  },

  handleInput(session, event) {
    const state = session.screenState;

    // Derived list for cursor movement mapping
    // (In a real app, you'd map visual indices to actual data indices)
    // For this demo, we keep cursor logic simple on the main list.

    switch (event.type) {
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
        // 'l' to toggle limit
        if (event.char === "l" || event.char === "L") {
          state.maxSelect = state.maxSelect === 0 ? 3 : 0;
          // Trim selection if we just enabled limit
          if (state.maxSelect > 0 && state.checked.size > state.maxSelect) {
            const arr = Array.from(state.checked);
            state.checked = new Set(arr.slice(0, state.maxSelect));
          }
          session.render();
          return;
        }
        // 'v' to toggle view mode
        if (event.char === "v" || event.char === "V") {
          state.viewMode = state.viewMode === "all" ? "selected" : "all";
          session.render();
          return;
        }

        // Space to toggle
        if (event.char === " ") {
          if (state.checked.has(state.cursor)) {
            state.checked.delete(state.cursor);
          } else {
            // Check limit
            if (state.maxSelect === 0 || state.checked.size < state.maxSelect) {
              state.checked.add(state.cursor);
            }
          }
          state.confirmed = false;
          session.render();
          return;
        }

        // 'a' to select all (only if no limit)
        if (event.char === "a" || event.char === "A") {
          if (state.maxSelect === 0) {
            for (let i = 0; i < ITEMS.length; i++) state.checked.add(i);
          }
          session.render();
          return;
        }
        // 'n' to clear all
        if (event.char === "n" || event.char === "N") {
          state.checked.clear();
          session.render();
          return;
        }
        break;

      case "UP":
        state.cursor = Math.max(0, state.cursor - 1);
        session.render();
        break;

      case "DOWN":
        state.cursor = Math.min(ITEMS.length - 1, state.cursor + 1);
        session.render();
        break;

      case "ENTER":
        state.confirmed = true;
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

    const checkedCount = state.checked.size;
    const isLimitActive = state.maxSelect > 0;
    const isLimitReached = isLimitActive && checkedCount >= state.maxSelect;

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Multi-Select ──"))], cols)[0],
    );
    lines.push(
      centerBlock([colors.dim(colors.gray("Pick your DevOps stack"))], cols)[0],
    );
    lines.push("");

    // ── Status Bar / Controls ──
    // Show current limit status
    let statusLine = "";
    if (isLimitActive) {
      statusLine += colors.yellow(colors.inverse(" Limit: Max 3 "));
    } else {
      statusLine += colors.dim(colors.gray(" Limit: Off "));
    }
    statusLine += "   ";
    if (state.viewMode === "selected") {
      statusLine += colors.magenta(colors.inverse(" View: Selected "));
    } else {
      statusLine += colors.dim(colors.gray(" View: All "));
    }

    lines.push(centerBlock([statusLine], cols)[0]);
    lines.push("");

    // Selection count badge
    let badgeLine;
    if (checkedCount === 0) {
      badgeLine = colors.dim(colors.gray("  Nothing selected"));
    } else {
      let countColor = colors.cyan;
      if (isLimitReached) countColor = colors.red;

      badgeLine =
        colors.dim(colors.gray("  Selected: ")) +
        countColor(colors.bold(String(checkedCount))) +
        colors.dim(colors.gray(" / " + ITEMS.length));
    }
    lines.push(centerBlock([badgeLine], cols)[0]);
    lines.push("");

    // Progress bar
    const barWidth = 30;
    const filled = Math.round((checkedCount / ITEMS.length) * barWidth);
    const empty = barWidth - filled;
    const selBar =
      colors.dim(colors.gray("[")) +
      colors.cyan("█".repeat(filled)) +
      colors.dim(colors.gray("░".repeat(empty))) +
      colors.dim(colors.gray("]"));
    lines.push(centerBlock([selBar], cols)[0]);
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(42)))], cols)[0]);
    lines.push("");

    // ── Items ──
    let itemsShown = 0;

    for (let i = 0; i < ITEMS.length; i++) {
      const item = ITEMS[i];
      const isCursor = i === state.cursor;
      const isChecked = state.checked.has(i);

      // Filtering logic: if viewMode is 'selected', skip unchecked
      if (state.viewMode === "selected" && !isChecked) {
        continue;
      }
      itemsShown++;

      // Checkbox character
      const checkbox = isChecked ? "☑" : "☐";
      const labelPadded = item.label.padEnd(18);

      // Determine if disabled (Limit reached AND not currently checked)
      const isDisabled = isLimitReached && !isChecked;

      let row;
      let cursorMarker = isCursor ? colors.cyan(colors.bold("▸ ")) : "  ";

      if (isDisabled) {
        // Disabled Style
        const boxStyle = colors.red("✖");
        const textStyle = isCursor
          ? colors.gray(labelPadded)
          : colors.dim(colors.gray(labelPadded));

        row =
          "    " +
          cursorMarker +
          boxStyle +
          " " +
          textStyle +
          colors.dim(colors.red(" (Limit reached)"));
      } else if (isChecked) {
        // Checked Style
        const boxStyle = colors.green(colors.bold(checkbox));
        const textStyle = isCursor
          ? colors.bold(colors.white(labelPadded))
          : colors.green(labelPadded);

        row =
          "    " +
          cursorMarker +
          boxStyle +
          " " +
          textStyle +
          colors.dim(colors.green(item.desc));
      } else {
        // Unchecked Style
        const boxStyle = colors.dim(colors.gray(checkbox));
        const textStyle = isCursor
          ? colors.bold(colors.white(labelPadded))
          : colors.gray(labelPadded);

        row =
          "    " +
          cursorMarker +
          boxStyle +
          " " +
          textStyle +
          colors.dim(colors.gray(item.desc));
      }

      lines.push(row);
    }

    if (itemsShown === 0) {
      lines.push(
        centerBlock([colors.dim(colors.gray("(No items selected)"))], cols)[0],
      );
    }

    // ── Confirmation / Summary ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(42)))], cols)[0]);
    lines.push("");

    if (state.confirmed && checkedCount > 0) {
      const selectedNames = [];
      for (let i = 0; i < ITEMS.length; i++) {
        if (state.checked.has(i)) selectedNames.push(ITEMS[i].label);
      }
      lines.push(
        centerBlock(
          [
            colors.green(colors.bold("✓ Confirmed: ")) +
              colors.cyan(selectedNames.join(colors.dim(colors.gray(", ")))),
          ],
          cols,
        )[0],
      );
    } else if (state.confirmed && checkedCount === 0) {
      lines.push(
        centerBlock(
          [colors.yellow(colors.bold("⚠ Nothing selected"))],
          cols,
        )[0],
      );
    } else {
      lines.push(
        centerBlock(
          [colors.dim(colors.gray("Press Enter to confirm selection"))],
          cols,
        )[0],
      );
    }
    lines.push("");

    // ── Installation Accordion ──
    const arrow = state.accordionOpen ? "▼" : "▶";
    const accTitle = ` ${arrow}  Get MultiSelect `;
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
              colors.yellow("const { MultiSelect } = require('side-ui')"),
          ],
          cols,
        )[0],
      );
      lines.push(
        centerBlock(
          [
            colors.white("2. Props:  ") +
              colors.green("items={...} limit={3} onConfirm={...}"),
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
            colors.gray("Space Toggle   l Limit(3)   v View   i Info   q Back"),
          ),
        ],
        cols,
      )[0],
    );

    return lines.join("\r\n"); // Fixed newline for raw mode
  },
};
