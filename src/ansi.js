/**
 * ansi.js
 * All ANSI escape code primitives.
 */

"use strict";

// ─── RAW SEQUENCES ────────────────────────────────────────────────────────────

const ESC = "\x1b";
const CSI = ESC + "[";

// ─── FOREGROUND COLORS ────────────────────────────────────────────────────────

const FG = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
};

function fg(code, str) {
  return `${CSI}${code}m${str}${CSI}0m`;
}

const colors = {
  black: (s) => fg(FG.black, s),
  red: (s) => fg(FG.red, s),
  green: (s) => fg(FG.green, s),
  yellow: (s) => fg(FG.yellow, s),
  blue: (s) => fg(FG.blue, s),
  magenta: (s) => fg(FG.magenta, s),
  cyan: (s) => fg(FG.cyan, s),
  white: (s) => fg(FG.white, s),
  gray: (s) => `${CSI}2m${CSI}37m${s}${CSI}0m`, // dim + white

  // Styles
  bold: (s) => `${CSI}1m${s}${CSI}0m`,
  dim: (s) => `${CSI}2m${s}${CSI}0m`,
  italic: (s) => `${CSI}3m${s}${CSI}0m`,
  underline: (s) => `${CSI}4m${s}${CSI}0m`,
  inverse: (s) => `${CSI}7m${s}${CSI}0m`,
  strike: (s) => `${CSI}9m${s}${CSI}0m`,

  // Bright foreground (90-97)
  brightRed: (s) => fg(91, s),
  brightGreen: (s) => fg(92, s),
  brightYellow: (s) => fg(93, s),
  brightBlue: (s) => fg(94, s),
  brightMagenta: (s) => fg(95, s),
  brightCyan: (s) => fg(96, s),
  brightWhite: (s) => fg(97, s),

  // 256-color foreground
  color256: (n, s) => `${CSI}38;5;${n}m${s}${CSI}0m`,

  reset: `${CSI}0m`,
};

// ─── BACKGROUND COLORS ────────────────────────────────────────────────────────

function bgColor(code, str) {
  return `${CSI}${code}m${str}${CSI}0m`;
}

const bg = {
  black: (s) => bgColor(40, s),
  red: (s) => bgColor(41, s),
  green: (s) => bgColor(42, s),
  yellow: (s) => bgColor(43, s),
  blue: (s) => bgColor(44, s),
  magenta: (s) => bgColor(45, s),
  cyan: (s) => bgColor(46, s),
  white: (s) => bgColor(47, s),

  // Bright backgrounds (100-107)
  brightBlack: (s) => bgColor(100, s),
  brightRed: (s) => bgColor(101, s),
  brightGreen: (s) => bgColor(102, s),
  brightYellow: (s) => bgColor(103, s),
  brightBlue: (s) => bgColor(104, s),
  brightMagenta: (s) => bgColor(105, s),
  brightCyan: (s) => bgColor(106, s),
  brightWhite: (s) => bgColor(107, s),

  // 256-color background
  color256: (n, s) => `${CSI}48;5;${n}m${s}${CSI}0m`,
};

// ─── COMBINED STYLE HELPERS ──────────────────────────────────────────────────

function style(opts, str) {
  let open = "";
  if (opts.bold) open += `${CSI}1m`;
  if (opts.dim) open += `${CSI}2m`;
  if (opts.italic) open += `${CSI}3m`;
  if (opts.underline) open += `${CSI}4m`;
  if (opts.inverse) open += `${CSI}7m`;
  if (opts.fg) open += `${CSI}${opts.fg}m`;
  if (opts.bg) open += `${CSI}${opts.bg}m`;
  if (opts.fg256) open += `${CSI}38;5;${opts.fg256}m`;
  if (opts.bg256) open += `${CSI}48;5;${opts.bg256}m`;
  return `${open}${str}${CSI}0m`;
}

// ─── CURSOR CONTROL ──────────────────────────────────────────────────────────

const cursor = {
  hide: () => `${ESC}[?25l`,
  show: () => `${ESC}[?25h`,
  moveTo: (row, col) => `${CSI}${row};${col}H`,
  moveUp: (n = 1) => `${CSI}${n}A`,
  moveDown: (n = 1) => `${CSI}${n}B`,
  moveRight: (n = 1) => `${CSI}${n}C`,
  moveLeft: (n = 1) => `${CSI}${n}D`,
  savePosition: () => `${ESC}7`,
  restorePosition: () => `${ESC}8`,
};

// ─── SCREEN CONTROL ──────────────────────────────────────────────────────────

const screen = {
  clear: () => `${CSI}2J${CSI}H`,
  clearLine: () => `${CSI}2K`,
  clearBelow: () => `${CSI}J`,
  saveCursor: () => `${CSI}s`,
  restCursor: () => `${CSI}u`,
};

// ─── ALTERNATE SCREEN BUFFER ─────────────────────────────────────────────────

const alt = {
  enter: () => `${ESC}[?1049h`,
  exit: () => `${ESC}[?1049l`,
};

// ─── UTILITY: strip ANSI codes ───────────────────────────────────────────────

// Improved Regex: Catches [parameters][letter] which covers colors AND cursor codes
const ANSI_REGEX = /\x1b\[[\d;?]*[a-zA-Z]/g;

function visibleLength(str) {
  return str.replace(ANSI_REGEX, "").length;
}

// ─── UTILITY: pad a string ───────────────────────────────────────────────────

function padEnd(str, width, char = " ") {
  const vLen = visibleLength(str);
  if (vLen >= width) return str;
  return str + char.repeat(width - vLen);
}

function padStart(str, width, char = " ") {
  const vLen = visibleLength(str);
  if (vLen >= width) return str;
  return char.repeat(width - vLen) + str;
}

function center(str, width, char = " ") {
  const vLen = visibleLength(str);
  if (vLen >= width) return str;
  const total = width - vLen;
  const left = Math.floor(total / 2);
  const right = total - left;
  return char.repeat(left) + str + char.repeat(right);
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

module.exports = {
  colors,
  bg,
  style,
  cursor,
  screen,
  alt,
  visibleLength,
  padEnd,
  padStart,
  center,
  ESC,
  CSI,
};
