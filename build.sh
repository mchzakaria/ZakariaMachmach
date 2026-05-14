#!/bin/bash
set -e

# Copy data.json into portfolio public so Vite bundles it
cp lib/db/data.json artifacts/portfolio/public/data.json

# Build the portfolio
pnpm --filter @workspace/portfolio build

# Vercel Build Output API — bypasses all framework detection
mkdir -p .vercel/output/static
cp -r artifacts/portfolio/dist/public/. .vercel/output/static/

# Write routing: /api/data → /data.json, fallback to SPA index.html
node -e "
const fs = require('fs');
fs.writeFileSync('.vercel/output/config.json', JSON.stringify({
  version: 3,
  routes: [
    { src: '/api/data', dest: '/data.json' },
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/index.html' }
  ]
}, null, 2));
"
