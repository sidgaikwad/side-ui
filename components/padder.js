/**
 * components/padder.js
 * Adds padding around blocks of lines.
 */

"use strict";

/**
 * Add vertical and horizontal padding to an array of lines.
 *
 * @param {string[]} lines       - The content lines
 * @param {object}   options
 * @param {number}   options.top    - Blank lines above (default 0)
 * @param {number}   options.bottom - Blank lines below (default 0)
 * @param {number}   options.left   - Spaces prepended to each line (default 0)
 * @param {number}   options.right  - Spaces appended (rarely needed, default 0)
 * @returns {string[]}
 */
function pad(lines, options = {}) {
  const top = options.top || 0;
  const bottom = options.bottom || 0;
  const left = options.left || 0;
  const right = options.right || 0;

  const leftStr = " ".repeat(left);
  const rightStr = " ".repeat(right);

  const result = [];

  // Top padding
  for (let i = 0; i < top; i++) result.push("");

  // Content with left/right padding
  for (const line of lines) {
    result.push(leftStr + line + rightStr);
  }

  // Bottom padding
  for (let i = 0; i < bottom; i++) result.push("");

  return result;
}

module.exports = { pad };
