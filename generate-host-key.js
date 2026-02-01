/**
 * generate-host-key.js
 * Generates an RSA private key and saves it as host.key
 * Run once before starting the server: node generate-host-key.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const keyPath = path.join(__dirname, "host.key");

if (fs.existsSync(keyPath)) {
  console.log("host.key already exists. Skipping generation.");
  process.exit(0);
}

try {
  // Node 19.0+ has generatePrivateKeyPairSync that can export PEM directly
  const { privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  fs.writeFileSync(keyPath, privateKey, { mode: 0o600 });
  console.log("✓ host.key generated successfully.");
  console.log("  Location: " + keyPath);
  console.log("  Keep this file secret. It identifies your SSH server.");
} catch (err) {
  console.error("✗ Failed to generate host key:", err.message);
  process.exit(1);
}
