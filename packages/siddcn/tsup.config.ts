import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.tsx', 'src/server.ts', 'src/index.ts'],
  format: ['cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'ink'],
  outExtension({ format }) {
    return {
      js: `.js`,
    }
  },
  esbuildOptions(options) {
    options.banner = {
      js: '#!/usr/bin/env node',
    }
  },
});
