#!/usr/bin/env node
import fs from "fs";
import path from "path";
import ssh2 from "ssh2";
import { render } from "ink";
import React from "react";
import { App } from "./App.js";

const { Server } = ssh2;

const PORT = process.env.SSH_PORT ? parseInt(process.env.SSH_PORT) : 2222;
const HOST_KEY =
  process.env.SSH_HOST_KEY || path.join(process.cwd(), "host.key");

// Generate or load host key
let hostKey: Buffer;
try {
  hostKey = fs.readFileSync(HOST_KEY);
  console.log("✅ Loaded existing host key");
} catch (err) {
  // For development purposes only
  hostKey = Buffer.from(`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3jKWLqRV8VnKN+GWwqJAWZvP6LWxLfpCWB0aF4yqTcQUzKm5
-----END RSA PRIVATE KEY-----`);
}

const server = new Server(
  {
    hostKeys: [hostKey],
  },
  (client) => {
    console.log("📡 Client connected");

    client
      .on("authentication", (ctx) => {
        if (ctx.method === "password") {
          ctx.accept();
        } else if (ctx.method === "none") {
          ctx.accept();
        } else {
          ctx.reject();
        }
      })
      .on("ready", () => {
        console.log("✅ Client authenticated");

        client.on("session", (accept) => {
          const session = accept();

          let cols = 80;
          let rows = 24;

          session.once("pty", (accept, reject, info) => {
            cols = info.cols || 80;
            rows = info.rows || 24;
            accept?.();
          });

          session.on("shell", (accept) => {
            console.log("🐚 Shell requested");
            const stream = accept();

            // ─── CRITICAL FIX FOR STAIRCASE EFFECT ───
            // We wrap the stream to force \n -> \r\n conversion
            const wrapStream = (baseStream: any) => {
              const wrapped = Object.create(baseStream);

              wrapped.isTTY = true;
              wrapped.columns = cols;
              wrapped.rows = rows;

              wrapped.setRawMode = (mode: boolean) => {
                return wrapped;
              };

              // Intercept writes to fix line endings
              wrapped.write = (data: any, encoding?: any, cb?: any) => {
                let chunk = data;

                // Convert Buffer to string to fix newlines, then back if needed
                if (Buffer.isBuffer(data)) {
                  chunk = data.toString("utf8");
                }

                if (typeof chunk === "string") {
                  // Replace raw newlines with Carriage Return + Newline
                  // This fixes the "stepping" distortion
                  chunk = chunk.replace(/\n/g, "\r\n");
                }

                return baseStream.write(chunk, encoding, cb);
              };

              wrapped.ref = () => wrapped;
              wrapped.unref = () => wrapped;
              return wrapped;
            };

            const stdin = wrapStream(stream);
            const stdout = wrapStream(stream);

            // Render Ink app
            try {
              const inkInstance = render(
                React.createElement(App, {
                  onExit: () => {
                    stream.exit(0);
                    stream.end();
                  },
                }),
                {
                  stdout: stdout as any,
                  stdin: stdin as any,
                  stderr: stdout as any,
                  exitOnCtrlC: true,
                  patchConsole: false,
                },
              );

              session.on("window-change", (accept, reject, info) => {
                cols = info.cols || 80;
                rows = info.rows || 24;
                // Update specific properties Ink looks for
                stdin.columns = cols;
                stdin.rows = rows;
                stdout.columns = cols;
                stdout.rows = rows;
              });

              stream.on("close", () => {
                console.log("🔌 Stream closed");
                inkInstance.unmount();
              });
            } catch (error) {
              console.error("Error rendering Ink app:", error);
              stream.exit(1);
              stream.end();
            }
          });
        });
      })
      .on("end", () => {
        console.log("👋 Client disconnected");
      })
      .on("error", (err) => {
        console.error("❌ Client error:", err.message);
      });
  },
);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`📡 Listening on port ${PORT}`);
  console.log("");
  console.log("Connect with:");
  console.log(`   ssh localhost -p ${PORT}`);
  console.log("");
  console.log("💡 Tips:");
  console.log("   - Use any username/password (demo mode)");
  console.log("   - Press Ctrl+C or q to exit");
  console.log("   - Navigate with ↑↓ or j/k");
  console.log("");
  console.log("⚠️  Note: Host key location:", HOST_KEY);
  console.log("");
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use`);
    console.error(
      "   Try a different port: SSH_PORT=3333 npm run start:server",
    );
  } else {
    console.error("❌ Server error:", err.message);
  }
  process.exit(1);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\n👋 Shutting down SSH server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
