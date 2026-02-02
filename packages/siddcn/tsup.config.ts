import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.tsx', 'src/server.ts', 'src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'ink'],
  banner: {
    js: '#!/usr/bin/env node',
  },
});
