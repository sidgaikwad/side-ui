/**
 * screens/chart.js
 * Live ASCII bar chart demo.
 * Displays labeled data that updates every second with
 * smoothly animated bar transitions.
 */

"use strict";

const { colors, visibleLength } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── CHART CONFIG ─────────────────────────────────────────────────────────────

const LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CHART_HEIGHT = 12; // Max bar height in characters
const BAR_WIDTH = 3; // Width of each bar
const GAP = 2; // Gap between bars

// ─── DATA GENERATION ──────────────────────────────────────────────────────────

function generateData() {
  return LABELS.map(() => Math.floor(Math.random() * 100));
}

// Smoothly interpolate current values toward target values
function interpolateData(current, target, factor = 0.15) {
  return current.map((cur, i) => {
    const diff = target[i] - cur;
    return cur + diff * factor;
  });
}

// ─── CHART RENDERER ──────────────────────────────────────────────────────────

function renderChart(values, cols) {
  const lines = [];
  const maxVal = 100; // Scale to 100

  // ── Y-axis labels and bars ──
  for (let row = CHART_HEIGHT; row >= 1; row--) {
    const threshold = (row / CHART_HEIGHT) * maxVal;

    // Y-axis label
    const yLabel = String(Math.round(threshold)).padStart(3, " ");

    let rowLine = colors.dim(colors.gray(yLabel)) + " ";

    // Y-axis line
    rowLine += colors.dim(colors.gray("│"));

    // Each bar
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      const barHeight = (val / maxVal) * CHART_HEIGHT;

      // Gap before bar
      rowLine += " ".repeat(GAP);

      if (barHeight >= row) {
        // This bar reaches this row — draw a filled block
        let barColor;
        // Color gradient based on value
        if (val >= 80) barColor = colors.red;
        else if (val >= 60) barColor = colors.yellow;
        else if (val >= 40) barColor = colors.cyan;
        else if (val >= 20) barColor = colors.blue;
        else barColor = colors.dim;

        rowLine += barColor("█".repeat(BAR_WIDTH));
      } else {
        // Empty space above bar
        rowLine += " ".repeat(BAR_WIDTH);
      }
    }

    lines.push(rowLine);
  }

  // ── X-axis ──
  // Axis line
  let axisLine =
    "    " +
    colors.dim(
      colors.gray("└" + "─".repeat((BAR_WIDTH + GAP) * LABELS.length + GAP)),
    );
  lines.push(axisLine);

  // Labels
  let labelLine = "     ";
  for (let i = 0; i < LABELS.length; i++) {
    labelLine += " ".repeat(GAP);
    // Center label under bar
    const label = LABELS[i];
    const padLeft = Math.floor((BAR_WIDTH - label.length) / 2);
    const padRight = BAR_WIDTH - label.length - padLeft;
    labelLine +=
      " ".repeat(padLeft) +
      colors.dim(colors.gray(label)) +
      " ".repeat(padRight);
  }
  lines.push(labelLine);

  // Value labels under each bar
  let valLine = "     ";
  for (let i = 0; i < values.length; i++) {
    valLine += " ".repeat(GAP);
    const valStr = String(Math.round(values[i]));
    const padLeft = Math.floor((BAR_WIDTH - valStr.length) / 2);
    const padRight = BAR_WIDTH - valStr.length - padLeft;

    let valColor;
    if (values[i] >= 80) valColor = colors.red;
    else if (values[i] >= 60) valColor = colors.yellow;
    else if (values[i] >= 40) valColor = colors.cyan;
    else valColor = colors.blue;

    valLine +=
      " ".repeat(padLeft) +
      valColor(colors.bold(valStr)) +
      " ".repeat(padRight);
  }
  lines.push(valLine);

  return lines;
}

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    const target = generateData();
    return {
      current: target.slice(), // Current (animated) values
      target: target, // Target values (what we're interpolating toward)
      tick: 0,
      updateTick: 0, // Counts ticks between data refreshes
    };
  },

  onMount(session) {
    session.startAnimation(() => {
      const state = session.screenState;
      state.tick++;
      state.updateTick++;

      // Smoothly interpolate toward target
      state.current = interpolateData(state.current, state.target, 0.12);

      // Every 150 ticks (~10 seconds at 15fps), generate new target data
      if (state.updateTick >= 150) {
        state.target = generateData();
        state.updateTick = 0;
      }

      session.render();
    }, 66); // ~15 fps
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
    // 'r' to immediately generate new data
    if (event.type === "CHAR" && (event.char === "r" || event.char === "R")) {
      session.screenState.target = generateData();
      session.screenState.updateTick = 0;
    }
  },

  render(session) {
    const { cols } = session;
    const state = session.screenState;
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Live Bar Chart ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [
          colors.dim(
            colors.gray("Weekly traffic — auto-updates every 10 seconds"),
          ),
        ],
        cols,
      )[0],
    );
    lines.push("");

    // ── Legend ──
    const legend =
      colors.red("█") +
      colors.dim(colors.gray(" 80-100  ")) +
      colors.yellow("█") +
      colors.dim(colors.gray(" 60-79   ")) +
      colors.cyan("█") +
      colors.dim(colors.gray(" 40-59   ")) +
      colors.blue("█") +
      colors.dim(colors.gray(" 0-39"));
    lines.push(centerBlock([legend], cols)[0]);
    lines.push("");

    // ── Chart ──
    const chartLines = renderChart(state.current, cols);
    const centeredChart = centerBlock(chartLines, cols);
    for (const line of centeredChart) {
      lines.push(line);
    }

    // ── Summary ──
    lines.push("");
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(44)))], cols)[0]);

    const avg = state.current.reduce((a, b) => a + b, 0) / state.current.length;
    const max = Math.max(...state.current);
    const min = Math.min(...state.current);
    const maxIdx = state.current.indexOf(max);

    lines.push(
      centerBlock(
        [
          colors.dim(colors.gray("Avg: ")) +
            colors.cyan(colors.bold(Math.round(avg).toString())) +
            colors.dim(colors.gray("   Peak: ")) +
            colors.red(colors.bold(Math.round(max).toString())) +
            colors.dim(colors.gray(" (" + LABELS[maxIdx] + ")")) +
            colors.dim(colors.gray("   Low: ")) +
            colors.blue(colors.bold(Math.round(min).toString())),
        ],
        cols,
      )[0],
    );

    lines.push("");
    lines.push(
      centerBlock([colors.dim(colors.gray("r New Data   q Back"))], cols)[0],
    );

    return lines.join("\n");
  },
};
