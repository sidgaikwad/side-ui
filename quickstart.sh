#!/bin/bash

# Siddcn Project Quick Start Script
echo "🚀 Siddcn Quick Start"
echo "===================="
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ required (you have $(node -v))"
    exit 1
fi

echo "✅ Node.js version check passed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Generate SSH key if doesn't exist
if [ ! -f "packages/siddcn/host.key" ]; then
    echo "🔐 Generating SSH host key..."
    ssh-keygen -t rsa -b 4096 -f packages/siddcn/host.key -N "" -q
    echo "✅ SSH host key generated"
else
    echo "✅ SSH host key already exists"
fi
echo ""

# Build the project
echo "🔨 Building project..."
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Success message
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo ""
echo "1. Run the CLI:"
echo "   cd packages/siddcn"
echo "   pnpm run dev"
echo ""
echo "2. Run the SSH server:"
echo "   cd packages/siddcn"
echo "   pnpm run dev:server"
echo ""
echo "3. Connect via SSH:"
echo "   ssh localhost -p 2222"
echo ""
echo "4. Add new components:"
echo "   See packages/siddcn/ADDING_COMPONENTS.md"
echo ""
echo "Happy building! 🚀"
