#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import ssh2 from 'ssh2';
import { render } from 'ink';
import React from 'react';
import { App } from './App.js';

const { Server } = ssh2;

const PORT = process.env.SSH_PORT ? parseInt(process.env.SSH_PORT) : 2222;
const HOST_KEY = process.env.SSH_HOST_KEY || path.join(process.cwd(), 'host.key');

// Generate or load host key
let hostKey: Buffer;
try {
  hostKey = fs.readFileSync(HOST_KEY);
  console.log('✅ Loaded existing host key');
} catch (err) {
  console.log('⚠️  No host key found. Generate one with:');
  console.log(`   ssh-keygen -t rsa -b 4096 -f ${HOST_KEY} -N ""`);
  console.log('\n   For development, we\'ll use a temporary key (not secure for production!)');
  
  // For development purposes only - in production, always use a proper key
  hostKey = Buffer.from(`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3jKWLqRV8VnKN+GWwqJAWZvP6LWxLfpCWB0aF4yqTcQUzKm5
-----END RSA PRIVATE KEY-----`);
}

const server = new Server({
  hostKeys: [hostKey]
}, (client) => {
  console.log('📡 Client connected');

  client.on('authentication', (ctx) => {
    // For demo purposes, accept any password
    // In production, implement proper authentication
    if (ctx.method === 'password') {
      console.log(`🔐 Auth attempt: ${ctx.username}`);
      ctx.accept();
    } else if (ctx.method === 'none') {
      ctx.accept();
    } else {
      ctx.reject();
    }
  }).on('ready', () => {
    console.log('✅ Client authenticated');

    client.on('session', (accept) => {
      const session = accept();

      session.once('pty', (accept, reject, info) => {
        accept?.();
      });

      session.on('shell', (accept) => {
        console.log('🐚 Shell requested');
        const stream = accept();

        // Create a pseudo-terminal for Ink
        const inkInstance = render(React.createElement(App, {
          onExit: () => {
            stream.exit(0);
            stream.end();
          }
        }), {
          stdout: stream as any,
          stdin: stream as any,
          stderr: stream as any,
          exitOnCtrlC: false
        });

        stream.on('data', (data) => {
          // Forward input to Ink
          stream.write(data);
        });

        stream.on('close', () => {
          console.log('🔌 Stream closed');
          inkInstance.unmount();
        });
      });
    });
  }).on('end', () => {
    console.log('👋 Client disconnected');
  }).on('error', (err) => {
    console.error('❌ Client error:', err.message);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('🚀 Siddcn SSH Server Started');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Listening on port ${PORT}`);
  console.log('');
  console.log('Connect with:');
  console.log(`   ssh localhost -p ${PORT}`);
  console.log('');
  console.log('💡 Tips:');
  console.log('   - Use any username/password (demo mode)');
  console.log('   - Press Ctrl+C or q to exit');
  console.log('   - Navigate with ↑↓ or j/k');
  console.log('');
  console.log('⚠️  Note: Host key location:', HOST_KEY);
  console.log('');
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.error('   Try a different port: SSH_PORT=3333 npm run dev:server');
  } else {
    console.error('❌ Server error:', err.message);
  }
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down SSH server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
