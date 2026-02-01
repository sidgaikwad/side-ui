/**
 * renderer.js
 * Handles writing a complete ANSI frame to an SSH channel stream.
 * Manages alternate screen buffer, cursor visibility, and full redraws.
 */

"use strict";

const { cursor, screen, alt } = require("./ansi");

/**
 * Render a complete frame to the stream.
 * This clears the screen and writes the new frame atomically
 * so there's no flicker between frames.
 *
 * @param {Stream} stream  - The SSH channel stream to write to
 * @param {string} frame   - The fully composed ANSI string to display
 */
function renderFrame(stream, frame) {
  // Build the entire output as one string and write it in a single call.
  // This minimizes flicker — a single write is effectively atomic
  // from the terminal's perspective.
  const output =
    screen.clear() + // Clear everything
    cursor.hide() + // Hide cursor to prevent flicker
    frame + // The actual UI content
    cursor.show(); // Show cursor again at the end

  stream.write(output);
}

/**
 * Enter the alternate screen buffer.
 * Call this once when the SSH session first starts.
 * The alternate buffer is a clean slate — the user's previous
 * terminal content is preserved and restored on exit.
 *
 * @param {Stream} stream
 */
function enterAltScreen(stream) {
  stream.write(alt.enter());
}

/**
 * Exit the alternate screen buffer.
 * Call this when the user disconnects or presses Ctrl+C.
 * Restores the user's terminal to its previous state.
 *
 * @param {Stream} stream
 */
function exitAltScreen(stream) {
  stream.write(alt.exit() + cursor.show());
}

module.exports = { renderFrame, enterAltScreen, exitAltScreen };
