#!/usr/bin/env bash
# ViralClawOS — Dev Setup Script
# Run: bash scripts/setup.sh

set -e

echo ""
echo "⌬ ViralClawOS — Dev Setup"
echo "─────────────────────────"
echo ""

# Check node
if ! command -v node &>/dev/null; then
  echo "❌  Node.js not found. Install Node 20+ from https://nodejs.org"
  exit 1
fi

NODE_VERSION=$(node -v | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌  Node.js 20+ required (found $(node -v))"
  exit 1
fi
echo "✓  Node.js $(node -v)"

# Check pnpm
if ! command -v pnpm &>/dev/null; then
  echo "Installing pnpm..."
  npm install -g pnpm@9
fi
echo "✓  pnpm $(pnpm -v)"

# Check Docker
if ! command -v docker &>/dev/null; then
  echo "⚠️  Docker not found — memory services won't run locally"
  echo "    Install from https://www.docker.com"
else
  echo "✓  Docker $(docker -v | cut -d' ' -f3 | tr -d ',')"
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
pnpm install

# Copy .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✓  Created .env from .env.example"
  echo "    ⚠️  Fill in ANTHROPIC_API_KEY and Supabase keys before starting"
else
  echo "✓  .env already exists"
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Fill in .env (ANTHROPIC_API_KEY + Supabase keys required)"
echo "  2. docker compose -f infra/docker-compose.yml up -d   # Start memory services"
echo "  3. pnpm dev                                            # Start all apps"
echo ""
echo "  Landing:   http://localhost:3000"
echo "  Dashboard: http://localhost:3001"
echo ""
