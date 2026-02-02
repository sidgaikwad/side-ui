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
 *
 * @param {string[]} lines      - Array of content lines (may contain ANSI codes)
 * @param {object}   options
 * @param {string}   options.style     - Border style: 'round'|'sharp'|'double'|'heavy'|'ascii' (default: 'round')
 * @param {function} options.color     - Color function from ansi.colors, e.g. colors.cyan (default: colors.gray)
 * @param {string}   options.title     - Optional title shown in the top border
 * @param {number}   options.width     - Fixed width. If not set, auto-sizes to the widest content line + padding
 * @param {number}   options.padding   - Horizontal padding inside the border (default: 1)
 * @returns {string[]} Array of fully rendered lines including the border
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
    const leftDashes = Math.floor(remaining / 2);
    const rightDashes = remaining - leftDashes;
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
        ? line.slice(0, contentWidth) // rough truncation (won't perfectly handle ANSI mid-string)
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
 * Useful for separating sections within a bordered panel.
 *
 * @param {number}   innerWidth  - The inner width of the box (total width - 2)
 * @param {object}   options
 * @param {string}   options.style  - Border style name
 * @param {function} options.color  - Color function
 * @param {string}   options.label  - Optional centered label in the divider
 * @returns {string} A single divider line string
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
    const left = Math.floor(remaining / 2);
    const right = remaining - left;
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
