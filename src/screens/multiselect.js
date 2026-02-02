/**
 * screens/multiselect.js
 * Multi-select checkbox list demo.
 * User can toggle items on/off with Space, confirm with Enter.
 * Shows selected count and a summary at the bottom.
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

      case "CHAR":
        if (event.char === " ") {
          // Toggle the current item
          if (state.checked.has(state.cursor)) {
            state.checked.delete(state.cursor);
          } else {
            state.checked.add(state.cursor);
          }
          state.confirmed = false;
          session.render();
          return;
        }
        if (event.char === "q" || event.char === "Q") {
          session.navigate("menu");
          return;
        }
        // 'a' to select all, 'n' to clear all
        if (event.char === "a" || event.char === "A") {
          for (let i = 0; i < ITEMS.length; i++) state.checked.add(i);
          session.render();
          return;
        }
        if (event.char === "n" || event.char === "N") {
          state.checked.clear();
          session.render();
          return;
        }
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

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Multi-Select ──"))], cols)[0],
    );
    lines.push(
      centerBlock([colors.dim(colors.gray("Pick your DevOps stack"))], cols)[0],
    );
    lines.push("");

    // Selection count badge
    let badgeLine;
    if (checkedCount === 0) {
      badgeLine = colors.dim(colors.gray("  Nothing selected"));
    } else {
      badgeLine =
        colors.dim(colors.gray("  Selected: ")) +
        colors.cyan(colors.bold(String(checkedCount))) +
        colors.dim(colors.gray(" / " + ITEMS.length));
    }
    lines.push(centerBlock([badgeLine], cols)[0]);
    lines.push("");

    // Progress bar showing selection ratio
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
    for (let i = 0; i < ITEMS.length; i++) {
      const item = ITEMS[i];
      const isCursor = i === state.cursor;
      const isChecked = state.checked.has(i);

      // Checkbox character
      const checkbox = isChecked ? "☑" : "☐";
      const labelPadded = item.label.padEnd(18);

      let row;
      if (isCursor && isChecked) {
        row =
          "    " +
          colors.cyan(colors.bold("▸ ")) +
          colors.green(colors.bold(checkbox)) +
          " " +
          colors.bold(colors.white(labelPadded)) +
          colors.dim(colors.green(item.desc));
      } else if (isCursor) {
        row =
          "    " +
          colors.cyan(colors.bold("▸ ")) +
          colors.dim(colors.gray(checkbox)) +
          " " +
          colors.bold(colors.white(labelPadded)) +
          colors.dim(colors.cyan(item.desc));
      } else if (isChecked) {
        row =
          "    " +
          colors.dim("  ") +
          colors.green(checkbox) +
          " " +
          colors.green(labelPadded) +
          colors.dim(colors.gray(item.desc));
      } else {
        row =
          "    " +
          colors.dim("  ") +
          colors.dim(colors.gray(checkbox)) +
          " " +
          colors.gray(labelPadded) +
          colors.dim(colors.gray(item.desc));
      }

      lines.push(row);
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
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray(
              "↑↓ Navigate   Space Toggle   a All   n None   Enter Confirm   q Back",
            ),
          ),
        ],
        cols,
      )[0],
    );

    return lines.join("\n");
  },
};
