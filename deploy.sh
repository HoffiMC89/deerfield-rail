#!/bin/bash
# ═══════════════════════════════════════════════════════
# Deerfield Rail Tracker — One-Click GitHub Deploy
# Run this once from any folder on your Mac/PC
# ═══════════════════════════════════════════════════════

GITHUB_USER="HoffiMC89"
REPO_NAME="deerfield-rail"
TOKEN="ghp_IntEc1FFkyDK5FI1KyWK4eqidg0ksX0sPm"

echo "🚂 Deploying Deerfield Rail Tracker to GitHub Pages..."

# 1. Clone the (empty) repo
git clone "https://${TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
cd "$REPO_NAME" || exit 1

# 2. Copy all files from this folder into the repo
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cp "$SCRIPT_DIR"/*.html . 2>/dev/null
cp "$SCRIPT_DIR"/*.json . 2>/dev/null
cp "$SCRIPT_DIR"/*.js   . 2>/dev/null
cp "$SCRIPT_DIR"/*.png  . 2>/dev/null
cp "$SCRIPT_DIR"/README.md . 2>/dev/null

# 3. Commit and push
git add .
git commit -m "🚂 Deerfield Rail Tracker PWA — initial deploy"
git push origin main

echo ""
echo "✅ Done! Your app will be live in ~60 seconds at:"
echo "   https://${GITHUB_USER}.github.io/${REPO_NAME}/"
echo ""
echo "📱 To install on iPhone:"
echo "   1. Open the URL above in Safari"
echo "   2. Tap Share → Add to Home Screen"
echo "   3. Tap Add"
echo ""
echo "⚙️  To enable GitHub Pages (if not already):"
echo "   github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "   → Source: Deploy from branch → main → / (root) → Save"
