/**
 * screens/badges.js
 * Status badges and tags component showcase.
 * A static display of all badge/tag variants.
 */

"use strict";

const { colors, bg, padEnd } = require("../ansi");
const { centerBlock } = require("../components/center");

// ─── BADGE RENDERERS ──────────────────────────────────────────────────────────

function badge(label, type) {
  switch (type) {
    case "success":
      return bg.green(colors.bold(colors.white(` ✓ ${label} `)));
    case "error":
      return bg.red(colors.bold(colors.white(` ✗ ${label} `)));
    case "warning":
      return bg.yellow(colors.bold(colors.white(` ⚠ ${label} `)));
    case "info":
      return bg.blue(colors.bold(colors.white(` ℹ ${label} `)));
    case "neutral":
      return bg.brightBlack(colors.white(` ● ${label} `));
    default:
      return colors.white(` ${label} `);
  }
}

// Outlined badge (no background, just colored text with border chars)
function outlinedBadge(label, colorFn) {
  return colorFn(`[ ${label} ]`);
}

// Dot badge (just a colored dot + label)
function dotBadge(label, colorFn, dotChar = "●") {
  return colorFn(dotChar) + " " + colorFn(label);
}

// ─── SCREEN DEFINITION ────────────────────────────────────────────────────────

module.exports = {
  initState(session) {
    return {};
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
    const lines = [];

    // ── Title ──
    lines.push("");
    lines.push(
      centerBlock([colors.bold(colors.cyan("── Badges & Tags ──"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Status indicators and label components"))],
        cols,
      )[0],
    );
    lines.push("");
    lines.push("");

    // ── Section: Solid Badges ──
    lines.push(
      centerBlock([colors.bold(colors.white("Solid Badges"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Full background with icon"))],
        cols,
      )[0],
    );
    lines.push("");

    const solidBadges = [
      badge("Success", "success"),
      badge("Error", "error"),
      badge("Warning", "warning"),
      badge("Info", "info"),
      badge("Neutral", "neutral"),
    ];

    // Render badges in a row
    lines.push(centerBlock([solidBadges.join("  ")], cols)[0]);
    lines.push("");
    lines.push("");

    // ── Section: Outlined Badges ──
    lines.push(
      centerBlock([colors.bold(colors.white("Outlined Badges"))], cols)[0],
    );
    lines.push(
      centerBlock([colors.dim(colors.gray("Bordered, no fill"))], cols)[0],
    );
    lines.push("");

    const outlinedBadges = [
      outlinedBadge("active", colors.green),
      outlinedBadge("pending", colors.yellow),
      outlinedBadge("failed", colors.red),
      outlinedBadge("paused", colors.cyan),
      outlinedBadge("archived", colors.gray),
    ];

    lines.push(centerBlock([outlinedBadges.join("  ")], cols)[0]);
    lines.push("");
    lines.push("");

    // ── Section: Dot Status Indicators ──
    lines.push(
      centerBlock([colors.bold(colors.white("Status Dots"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Compact status indicators"))],
        cols,
      )[0],
    );
    lines.push("");

    const statusItems = [
      { label: "API Gateway", status: "online", color: colors.green },
      { label: "Database", status: "online", color: colors.green },
      { label: "Cache Layer", status: "degraded", color: colors.yellow },
      { label: "CDN", status: "online", color: colors.green },
      { label: "Auth Service", status: "offline", color: colors.red },
      { label: "Queue Worker", status: "online", color: colors.green },
      { label: "Search Index", status: "degraded", color: colors.yellow },
      { label: "Email Service", status: "offline", color: colors.red },
    ];

    for (const item of statusItems) {
      // Use ANSI-aware padEnd here if needed, but since label is plain text, standard padEnd works.
      const labelPadded = item.label.padEnd(18);
      const statusBadge = outlinedBadge(item.status, item.color);
      const row =
        "    " +
        item.color("●") +
        " " +
        colors.white(labelPadded) +
        statusBadge;
      lines.push(centerBlock([row], cols)[0]);
    }

    lines.push("");
    lines.push("");

    // ── Section: Version Tags ──
    lines.push(
      centerBlock([colors.bold(colors.white("Version Tags"))], cols)[0],
    );
    lines.push(
      centerBlock(
        [colors.dim(colors.gray("Software version indicators"))],
        cols,
      )[0],
    );
    lines.push("");

    const versionTags = [
      { label: "v1.0.0", tag: "stable", color: colors.green },
      { label: "v2.1.0", tag: "latest", color: colors.cyan },
      { label: "v3.0.0", tag: "beta", color: colors.yellow },
      { label: "v0.9.0", tag: "alpha", color: colors.magenta },
      { label: "v2.0.5", tag: "deprecated", color: colors.red },
    ];

    for (const ver of versionTags) {
      // FIX: Use ANSI-aware padEnd helper for the colored tag string
      const coloredTag = ver.color(colors.bold(`[${ver.tag}]`));

      const row =
        "    " +
        colors.bold(colors.white(ver.label.padEnd(10))) +
        padEnd(coloredTag, 20) + // Fixed alignment
        ver.color(
          "─".repeat(
            ver.tag === "deprecated"
              ? 8
              : ver.tag === "latest"
                ? 12
                : ver.tag === "stable"
                  ? 10
                  : 6,
          ),
        );
      lines.push(centerBlock([row], cols)[0]);
    }

    lines.push("");
    lines.push("");

    // ── Footer ──
    lines.push(centerBlock([colors.dim(colors.gray("─".repeat(44)))], cols)[0]);
    lines.push(centerBlock([colors.dim(colors.gray("q Back"))], cols)[0]);

    return lines.join("\r\n"); // Fixed newline for raw mode
  },
};
