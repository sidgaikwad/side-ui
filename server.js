/**
 * server.js
 * The SSH2 server that powers side-ui.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { Server } = require("ssh2");
const { Session } = require("./src/session");

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const PORT = 2222;
const HOST_KEY_PATH = path.join(__dirname, "host.key");

// ─── HOST KEY ─────────────────────────────────────────────────────────────────

function getHostKey() {
  if (fs.existsSync(HOST_KEY_PATH)) {
    return fs.readFileSync(HOST_KEY_PATH);
  }
  console.log("  Generating host.key...");
  const { privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });
  fs.writeFileSync(HOST_KEY_PATH, privateKey, { mode: 0o600 });
  console.log("  ✓ host.key generated");
  return privateKey;
}

// ─── SESSION TRACKING ─────────────────────────────────────────────────────────

const activeSessions = new Map();
let nextId = 0;

// ─── SSH SERVER ───────────────────────────────────────────────────────────────

const hostKey = getHostKey();

const server = new Server({ hostKeys: [hostKey] }, function onConnection(
  client,
  connInfo,
) {
  const id = ++nextId;
  console.log(`  [${id}] Connection from ${connInfo.ip}`);

  // ── AUTHENTICATION ──
  // Handle authentication requests
  client.on("authentication", (ctx) => {
    console.log(
      `  [${id}] Auth attempt: method=${ctx.method} user=${ctx.username}`,
    );

    // Accept ANY authentication method
    if (ctx.method === "password") {
      console.log(`  [${id}] Accepting password auth`);
      ctx.accept();
    } else if (ctx.method === "publickey") {
      console.log(`  [${id}] Accepting publickey auth`);
      ctx.accept();
    } else if (ctx.method === "none") {
      console.log(`  [${id}] Accepting none auth`);
      ctx.accept();
    } else {
      console.log(`  [${id}] Rejecting auth method: ${ctx.method}`);
      ctx.reject();
    }
  });

  // ── READY (after successful auth) ──
  client.on("ready", () => {
    console.log(`  [${id}] Client authenticated successfully`);

    client.on("session", (accept, reject) => {
      const session = accept();
      let cols = 80;
      let rows = 24;
      let termSession = null;

      // ── PTY request ──
      session.on("pty", (accept, reject, info) => {
        cols = info.cols || 80;
        rows = info.rows || 24;
        console.log(`  [${id}] PTY requested: ${cols}x${rows}`);
        accept();
      });

      // ── Shell request ──
      session.on("shell", (accept, reject) => {
        console.log(`  [${id}] Shell requested`);
        const stream = accept();

        // Create the terminal session
        termSession = new Session(stream, cols, rows);
        activeSessions.set(id, termSession);
        console.log(`  [${id}] Session started`);

        // ── Resize ──
        session.on("window-change", (accept, reject, info) => {
          if (termSession && !termSession.destroyed) {
            console.log(`  [${id}] Resize: ${info.cols}x${info.rows}`);
            termSession.resize(info.cols || cols, info.rows || rows);
          }
          if (accept) accept();
        });

        // ── Stream close ──
        stream.on("close", () => {
          console.log(`  [${id}] Stream closed`);
          if (termSession) {
            termSession.destroy();
            activeSessions.delete(id);
            termSession = null;
          }
          client.end();
        });

        stream.on("error", (err) => {
          console.log(`  [${id}] Stream error: ${err.message}`);
          if (termSession) {
            termSession.destroy();
            activeSessions.delete(id);
            termSession = null;
          }
        });
      });

      // Reject exec requests
      session.on("exec", (accept, reject) => {
        console.log(`  [${id}] Exec rejected`);
        reject();
      });
    });
  });

  // ── Client close ──
  client.on("close", () => {
    console.log(`  [${id}] Client disconnected`);
    if (activeSessions.has(id)) {
      const s = activeSessions.get(id);
      if (s) s.destroy();
      activeSessions.delete(id);
    }
  });

  // ── Client error ──
  client.on("error", (err) => {
    console.log(`  [${id}] Client error: ${err.message}`);
  });
});

// ─── START ────────────────────────────────────────────────────────────────────

console.log("");
console.log("  ╔══════════════════════════════════════════╗");
console.log("  ║        side-ui — SSH Component Demo       ║");
console.log("  ╚══════════════════════════════════════════╝");
console.log("");

server.listen(PORT, "0.0.0.0", () => {
  console.log(`  ✓ Listening on port ${PORT}`);
  console.log("");
  console.log("  Connect:");
  console.log(`    ssh -p ${PORT} demo@localhost`);
  console.log("");
  console.log("  Password: anything (or just press Enter)");
  console.log("");
  console.log("  ─────────────────────────────────────────");
  console.log("  Waiting for connections...");
  console.log("");
});

// ─── GRACEFUL SHUTDOWN ────────────────────────────────────────────────────────

function shutdown() {
  console.log("");
  console.log("  Shutting down...");
  for (const [, s] of activeSessions) {
    if (s) s.destroy();
  }
  activeSessions.clear();
  server.close(() => {
    console.log("  ✓ Closed.");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
