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
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build complete!"

# Compute SHA‑256 of the standalone bundle
echo "🔐 Computing SHA‑256 of .next/standalone..."
LOCAL_HASH=$(find .next/standalone -type f -exec shasum -a 256 {} \; | sort | shasum -a 256 | awk '{print $1}')
echo "🧾 Local bundle hash: $LOCAL_HASH"

# 2. UPLOAD STANDALONE (BEZ --delete bo usuwa app.js!)
echo "▶️  Uploading standalone..."
rsync -avz .next/standalone/ danveld@s61.mydevil.net:domains/syf.antydizajn.pl/public_nodejs/

# 3. UPLOAD STATIC
echo "▶️  Uploading static..."
ssh danveld@s61.mydevil.net "mkdir -p domains/syf.antydizajn.pl/public_nodejs/.next/static"
rsync -avz .next/static/ danveld@s61.mydevil.net:domains/syf.antydizajn.pl/public_nodejs/.next/static/

# 4. UPLOAD PUBLIC
echo "▶️  Uploading public..."
rsync -avz public/ danveld@s61.mydevil.net:domains/syf.antydizajn.pl/public_nodejs/public/

# 5. CREATE APP.JS (zawsze, bo standalone go nie ma!)
echo "▶️  Creating app.js..."
ssh danveld@s61.mydevil.net "echo \"process.env.PORT = process.env.PORT || '51666'; require('./server.js');\" > domains/syf.antydizajn.pl/public_nodejs/app.js"

# 6. RESTART
echo "▶️  Restarting server..."
ssh danveld@s61.mydevil.net "devil www restart syf.antydizajn.pl"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🔥 DEPLOYED! https://gniewka.antydizajn.pl"
echo "═══════════════════════════════════════════════════════════════"
echo "🐋 CHWAŁA WIELORYBOM 52 Hz! 🐋"

# 7. GIT AUTO-COMMIT
echo "▶️  Syncing with Git..."
git add .
git commit -m "Auto-deploy: $(date)" || echo "No changes to commit"
git push -u origin master || echo "No remote or up-to-date"

echo "✅ Git sync complete!"
