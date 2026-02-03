#!/bin/bash
echo "Building siddcn..."
pnpm run build

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo ""
echo "Starting siddcn TUI..."
node dist/cli.js