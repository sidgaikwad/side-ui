/**
 * input.js
 * Parses raw bytes from an SSH channel stream and emits
 * clean, named key events. Handles multi-byte escape sequences
 * for arrow keys, function keys, home/end, page up/down, etc.
 */

"use strict";

const EventEmitter = require("events");

// ─── KEY SEQUENCE MAP ─────────────────────────────────────────────────────────
// Maps raw byte sequences to event type names

const SEQUENCES = {
  "\x1b[A": "UP",
  "\x1b[B": "DOWN",
  "\x1b[C": "RIGHT",
  "\x1b[D": "LEFT",
  "\x1b[H": "HOME",
  "\x1b[F": "END",
  "\x1b[2~": "INSERT",
  "\x1b[3~": "DELETE",
  "\x1b[5~": "PAGE_UP",
  "\x1b[6~": "PAGE_DOWN",
  "\x1b[1~": "HOME",
  "\x1b[4~": "END",
  "\x1bOP": "F1",
  "\x1bOQ": "F2",
  "\x1bOR": "F3",
  "\x1bOS": "F4",
  "\x1b[15~": "F5",
  "\x1b[17~": "F6",
  "\x1b[18~": "F7",
  "\x1b[19~": "F8",
  "\x1b[20~": "F9",
  "\x1b[21~": "F10",
  "\x1b[23~": "F11",
  "\x1b[24~": "F12",

  // Shift + arrows
  "\x1b[1;2A": "SHIFT_UP",
  "\x1b[1;2B": "SHIFT_DOWN",
  "\x1b[1;2C": "SHIFT_RIGHT",
  "\x1b[1;2D": "SHIFT_LEFT",

  // Ctrl + arrows
  "\x1b[1;5A": "CTRL_UP",
  "\x1b[1;5B": "CTRL_DOWN",
  "\x1b[1;5C": "CTRL_RIGHT",
  "\x1b[1;5D": "CTRL_LEFT",
};

// Single-byte control characters
const CONTROLS = {
  "\x0d": "ENTER", // Carriage return
  "\x0a": "ENTER", // Line feed
  "\x7f": "BACKSPACE", // DEL (most terminals send this for backspace)
  "\x08": "BACKSPACE", // BS
  "\x1b": "ESCAPE", // Standalone escape (only if not followed by [ )
  "\x03": "CTRL_C", // ETX
  "\x04": "CTRL_D", // EOT
  "\x09": "TAB", // HT
  "\x1a": "CTRL_Z", // SUB
  "\x01": "CTRL_A",
  "\x05": "CTRL_E",
  "\x06": "CTRL_F",
  "\x02": "CTRL_B",
  "\x0b": "CTRL_K",
  "\x15": "CTRL_U",
};

// ─── PARSER CLASS ─────────────────────────────────────────────────────────────

class InputParser extends EventEmitter {
  constructor() {
    super();
    this._buffer = "";
    this._escTimer = null;
  }

  /**
   * Feed raw data from the SSH stream into the parser.
   * Call this whenever you get a 'data' event on the channel.
   */
  feed(data) {
    this._buffer += data.toString("utf8");
    this._processBuffer();
  }

  _processBuffer() {
    // Clear any pending escape timeout — we have new data
    if (this._escTimer) {
      clearTimeout(this._escTimer);
      this._escTimer = null;
    }

    while (this._buffer.length > 0) {
      // Check if buffer starts with an escape sequence
      if (this._buffer[0] === "\x1b") {
        // If we only have the bare escape byte, wait a tiny bit
        // to see if more bytes arrive (it might be the start of a sequence)
        if (this._buffer.length === 1) {
          this._escTimer = setTimeout(() => {
            // Timeout fired — it was a standalone Escape key
            this._buffer = "";
            this.emit("key", { type: "ESCAPE" });
          }, 50);
          return; // Wait for more data or timeout
        }

        // Try to match a known multi-byte sequence
        let matched = null;
        // Check longest sequences first (greedy)
        for (const seq of Object.keys(SEQUENCES).sort(
          (a, b) => b.length - a.length,
        )) {
          if (this._buffer.startsWith(seq)) {
            matched = seq;
            break;
          }
        }

        if (matched) {
          this._buffer = this._buffer.slice(matched.length);
          this.emit("key", { type: SEQUENCES[matched] });
          continue;
        }

        // If buffer starts with ESC[ but isn't complete yet, wait for more
        if (
          this._buffer.length < 6 &&
          (this._buffer.startsWith("\x1b[") || this._buffer.startsWith("\x1bO"))
        ) {
          this._escTimer = setTimeout(() => {
            // Timed out waiting — emit what we have as individual chars
            const buf = this._buffer;
            this._buffer = "";
            for (const ch of buf) {
              this._emitSingle(ch);
            }
          }, 50);
          return;
        }

        // Unknown escape sequence — skip the ESC and continue
        this._buffer = this._buffer.slice(1);
        this.emit("key", { type: "ESCAPE" });
        continue;
      }

      // Not an escape sequence — process single character
      const ch = this._buffer[0];
      this._buffer = this._buffer.slice(1);
      this._emitSingle(ch);
    }
  }

  _emitSingle(ch) {
    // Check control characters
    if (CONTROLS[ch]) {
      this.emit("key", { type: CONTROLS[ch] });
      return;
    }

    // Printable character
    const code = ch.charCodeAt(0);
    if (code >= 32 && code < 127) {
      this.emit("key", { type: "CHAR", char: ch });
      return;
    }

    // Anything else — ignore silently (stray control codes, etc)
  }

  destroy() {
    if (this._escTimer) {
      clearTimeout(this._escTimer);
      this._escTimer = null;
    }
    this.removeAllListeners();
  }
}

// ─── FACTORY ──────────────────────────────────────────────────────────────────

function createInputParser(stream) {
  const parser = new InputParser();
  const onData = (data) => parser.feed(data);
  stream.on("data", onData);

  // Cleanup when stream closes
  stream.on("close", () => {
    stream.removeListener("data", onData);
    parser.destroy();
  });

  return parser;
}

module.exports = { createInputParser, InputParser };
