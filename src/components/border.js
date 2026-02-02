/**
 * components/border.js
 * Renders box-drawing borders around content.
 * Supports multiple border styles and colors.
 */

"use strict";

const { colors, padEnd, visibleLength } = require("../ansi");

// ─── BORDER CHARACTER SETS ────────────────────────────────────────────────────

const STYLES = {
  round: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    horizontal: "─",
    vertical: "│",
    leftT: "├",
    rightT: "┤",
    topT: "┬",
    bottomT: "┴",
    cross: "┼",
  },
  sharp: {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
    horizontal: "─",
    vertical: "│",
    leftT: "├",
    rightT: "┤",
    topT: "┬",
    bottomT: "┴",
    cross: "┼",
  },
  double: {
    topLeft: "╔",
    topRight: "╗",
    bottomLeft: "╚",
    bottomRight: "╝",
    horizontal: "═",
    vertical: "║",
    leftT: "╠",
    rightT: "╣",
    topT: "╦",
    bottomT: "╩",
    cross: "╬",
  },
  heavy: {
    topLeft: "┏",
    topRight: "┓",
    bottomLeft: "┗",
    bottomRight: "┛",
    horizontal: "━",
    vertical: "┃",
    leftT: "┣",
    rightT: "┫",
    topT: "┳",
    bottomT: "┻",
    cross: "╋",
  },
  ascii: {
    topLeft: "+",
    topRight: "+",
    bottomLeft: "+",
    bottomRight: "+",
    horizontal: "-",
    vertical: "|",
    leftT: "+",
    rightT: "+",
    topT: "+",
    bottomT: "+",
    cross: "+",
  },
};

// ─── BORDER RENDERER ──────────────────────────────────────────────────────────

/**
 * Wraps an array of content lines in a box border.
 */
function drawBox(lines, options = {}) {
  const styleName = options.style || "round";
  const colorFn = options.color || colors.gray;
  const title = options.title || "";
  const padding = options.padding !== undefined ? options.padding : 1;
  const chars = STYLES[styleName] || STYLES.round;

  // Calculate the inner width (content area)
  let innerWidth;
  if (options.width) {
    innerWidth = options.width - 2; // subtract the two vertical borders
  } else {
    // Auto-size: find the widest content line
    let maxLen = 0;
    for (const line of lines) {
      const vl = visibleLength(line);
      if (vl > maxLen) maxLen = vl;
    }
    innerWidth = maxLen + padding * 2;
  }

  const contentWidth = innerWidth - padding * 2;
  const result = [];

  // ── Top border ──
  let topBorder = chars.topLeft;
  if (title) {
    const titleStr = ` ${title} `;
    const titleVisLen = visibleLength(titleStr);
    const remaining = innerWidth - titleVisLen;
    // Ensure we don't get negative repeat count
    const leftDashes = Math.max(0, Math.floor(remaining / 2));
    const rightDashes = Math.max(0, remaining - leftDashes);
    topBorder +=
      chars.horizontal.repeat(leftDashes) +
      titleStr +
      chars.horizontal.repeat(rightDashes);
  } else {
    topBorder += chars.horizontal.repeat(innerWidth);
  }
  topBorder += chars.topRight;
  result.push(colorFn(topBorder));

  // ── Content lines ──
  const pad = " ".repeat(padding);
  for (const line of lines) {
    const vLen = visibleLength(line);
    const truncated =
      vLen > contentWidth
        ? line.slice(0, contentWidth) // Note: simple slice may cut ANSI codes.
        : line;
    const rightPad = " ".repeat(
      Math.max(0, contentWidth - visibleLength(truncated)),
    );
    result.push(
      colorFn(chars.vertical) +
        pad +
        truncated +
        rightPad +
        pad +
        colorFn(chars.vertical),
    );
  }

  // ── Bottom border ──
  const bottomBorder =
    chars.bottomLeft + chars.horizontal.repeat(innerWidth) + chars.bottomRight;
  result.push(colorFn(bottomBorder));

  return result;
}

/**
 * Draw a horizontal divider line that fits inside a box.
 */
function drawDivider(innerWidth, options = {}) {
  const styleName = options.style || "round";
  const colorFn = options.color || colors.gray;
  const label = options.label || "";
  const chars = STYLES[styleName] || STYLES.round;

  if (label) {
    const labelStr = ` ${label} `;
    const labelLen = visibleLength(labelStr);
    const remaining = innerWidth - labelLen;
    const left = Math.max(0, Math.floor(remaining / 2));
    const right = Math.max(0, remaining - left);
    return colorFn(
      chars.leftT +
        chars.horizontal.repeat(left) +
        labelStr +
        chars.horizontal.repeat(right) +
        chars.rightT,
    );
  }

  return colorFn(
    chars.leftT + chars.horizontal.repeat(innerWidth) + chars.rightT,
  );
}

module.exports = { drawBox, drawDivider, STYLES };
