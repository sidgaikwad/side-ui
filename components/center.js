/**
 * components/center.js
 * Centers an array of lines within a given terminal width.
 */

"use strict";

const { visibleLength } = require("../ansi");

/**
 * Center an array of lines horizontally within the given width.
 * Each line is individually padded with spaces on the left.
 *
 * @param {string[]} lines  - Lines to center (may contain ANSI codes)
 * @param {number}   width  - Total width to center within
 * @returns {string[]} Centered lines
 */
function centerBlock(lines, width) {
  return lines.map((line) => {
    const vLen = visibleLength(line);
    if (vLen >= width) return line;
    const leftPad = Math.floor((width - vLen) / 2);
    return " ".repeat(leftPad) + line;
  });
}

/**
 * Center a single line.
 */
function centerLine(line, width) {
  const vLen = visibleLength(line);
  if (vLen >= width) return line;
  const leftPad = Math.floor((width - vLen) / 2);
  return " ".repeat(leftPad) + line;
}

module.exports = { centerBlock, centerLine };
