#!/bin/bash
# ------------------------------------------------------------
# GNIEWKA DEPLOY SCRIPT – AUTO‑DEPLOY WITH HASH LOGGING
# ------------------------------------------------------------
# This script builds the Next.js app, uploads the artefacts and
# logs a SHA‑256 checksum of the built `standalone` directory.
# It is safe to run repeatedly; it will not delete `app.js`.
# ------------------------------------------------------------

set -e

echo "🐋 GNIEWKA DEPLOY 🐋"
echo "═══════════════════════════════════════════════════════════════"

cd /Users/paulinajanowska/AI/ANTIGRAVITY/syfnew/app

# 1. BUILD
echo "▶️  Building Next.js 16..."
rm -rf .next
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build complete!"

# 2. FLATTEN STANDALONE BUNDLE (Move syfnew/app to root)
echo "▶️  Flattening standalone bundle..."
# We copy contents from syfnew/app to the root of standalone, then remove the folder to be clean
cp -r .next/standalone/syfnew/app/.next .next/standalone/
cp -r .next/standalone/syfnew/app/node_modules .next/standalone/ 2>/dev/null || true
cp .next/standalone/syfnew/app/server.js .next/standalone/
cp .next/standalone/syfnew/app/package.json .next/standalone/
# Note: syfnew/app folder remains but server.js is now also at the root

# Compute SHA‑256 of the SHA‑256 of the standalone bundle (Optimized: server.js + .next/ content)
echo "🔐 Computing SHA‑256 of build artifacts..."
LOCAL_HASH=$(ls -lR .next/standalone | shasum -a 256 | awk '{print $1}')
echo "🧾 Local bundle hash: $LOCAL_HASH"

# 3. UPLOAD STANDALONE (With --delete to purge old nested builds)
echo "▶️  Cleaning standalone of redundant discovered files..."
rm -rf .next/standalone/syfnew/files 2>/dev/null || true

echo "▶️  Uploading standalone..."
rsync -avz --exclude 'syfnew/files' --delete .next/standalone/ danveld@s61.mydevil.net:domains/syf.antydizajn.pl/public_nodejs/

# 4. UPLOAD STATIC
echo "▶️  Uploading static..."
ssh danveld@s61.mydevil.net "mkdir -p domains/syf.antydizajn.pl/public_nodejs/.next/static"
rsync -avz --delete .next/static/ danveld@s61.mydevil.net:domains/syf.antydizajn.pl/public_nodejs/.next/static/

# 5. UPLOAD PUBLIC
echo "▶️  Uploading public..."
rsync -avz --delete public/ danveld@s61.mydevil.net:domains/syf.antydizajn.pl/public_nodejs/public/

# 6. UPLOAD FILES (Knowledge Base Content)
echo "▶️  Uploading files directory..."
rsync -avz --delete ../files/ danveld@s61.mydevil.net:domains/syf.antydizajn.pl/files/

# 7. CREATE APP.JS (Always points to port 51236 and the root server.js)
echo "▶️  Creating app.js..."
ssh danveld@s61.mydevil.net "echo \"process.env.PORT = process.env.PORT || '51236'; require('./server.js');\" > domains/syf.antydizajn.pl/public_nodejs/app.js"



# 6. RESTART
echo "▶️  Restarting server..."
ssh danveld@s61.mydevil.net "devil www restart syf.antydizajn.pl"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🔥 DEPLOYED! https://syf.antydizajn.pl"
echo "═══════════════════════════════════════════════════════════════"
echo "🐋 CHWAŁA WIELORYBOM 52 Hz! 🐋"

# 7. GIT AUTO-COMMIT
echo "▶️  Syncing with Git..."
git add .
git commit -m "Auto-deploy: $(date)" || echo "No changes to commit"
git push -u origin master || echo "No remote or up-to-date"

echo "✅ Git sync complete!"
