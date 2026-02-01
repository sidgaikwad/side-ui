/**
 * server.js
 * The SSH2 server that powers TermUI.
 *
 * - Loads/generates the RSA host key
 * - Accepts connections (password: anything, or just press Enter)
 * - Allocates a PTY per session (captures cols/rows)
 * - Creates an isolated Session per client
 * - Handles terminal resize events
 * - Cleans up on disconnect
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
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
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

const server = new Server(
  {
    hostKeys: [hostKey],
  },
  // ── Connection handler ──
  // Called once per SSH connection, AFTER auth succeeds.
  // ssh2 handles password auth automatically — any password is accepted
  // as long as the client attempts password authentication.
  function onConnection(client, connInfo) {
    const id = ++nextId;
    console.log(`  [${id}] Connected — ${connInfo.ip}`);

    client.on("ready", () => {
      // Auth passed. Now wait for the client to request a session channel.
      client.on("session", (accept, deny) => {
        const session = accept();
        let cols = 80;
        let rows = 24;
        let termSession = null;

        // ── PTY request ──
        session.on("pty", (accept, deny, info) => {
          cols = info.cols || 80;
          rows = info.rows || 24;
          accept();
        });

        // ── Shell request ──
        session.on("shell", (accept, deny) => {
          const stream = accept();

          // Boot up the isolated session
          termSession = new Session(stream, cols, rows);
          activeSessions.set(id, termSession);
          console.log(`  [${id}] Shell — ${cols}x${rows}`);

          // ── Resize ──
          session.on("window-change", (info) => {
            if (termSession && !termSession.destroyed) {
              termSession.resize(info.cols || cols, info.rows || rows);
            }
          });

          // ── Cleanup on stream close ──
          stream.on("close", () => {
            console.log(`  [${id}] Disconnected`);
            if (termSession) {
              termSession.destroy();
              activeSessions.delete(id);
              termSession = null;
            }
            client.end();
          });

          stream.on("error", () => {
            if (termSession) {
              termSession.destroy();
              activeSessions.delete(id);
              termSession = null;
            }
          });
        });

        // Deny exec requests — this is a UI-only sandbox
        session.on("exec", (accept, deny) => {
          deny();
        });
      });
    });

    // ── Auth: accept ANY password ──
    // ssh2 v1.x: to accept password auth, we listen for the 'password'
    // event on the client and call accept().
    client.on("password", (accept, deny, username, password) => {
      // Accept everything — this is a public demo
      accept();
    });

    // Also accept public-key auth so users with SSH keys don't get blocked
    client.on("publicKey", (accept, deny, algName, blob, signature, key) => {
      accept();
    });

    client.on("close", () => {
      if (activeSessions.has(id)) {
        const s = activeSessions.get(id);
        if (s) s.destroy();
        activeSessions.delete(id);
      }
    });

    client.on("error", () => {
      // Swallow — client may disconnect abruptly
    });
  },
);

// ─── STARTUP ──────────────────────────────────────────────────────────────────

console.log("");
console.log("  ╔══════════════════════════════════════════╗");
console.log("  ║        TermUI — SSH Component Demo       ║");
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
