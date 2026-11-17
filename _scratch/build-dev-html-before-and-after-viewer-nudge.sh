#!/usr/bin/env bash
# Builds two dev pages for a before/after comparison of the viewer-nudges-bait-balls change:
#   OUT_DIR/before.html  = dev build using shaders.js as committed at HEAD
#   OUT_DIR/after.html   = dev build of the working tree
# Usage: _scratch/build-dev-html-before-and-after-viewer-nudge.sh OUT_DIR   (run from the project root)
# Then serve OUT_DIR (python3 -m http.server) and open before.html / after.html?pose=3&time=20
set -euo pipefail
OUT_DIR=${1:?usage: $0 OUT_DIR}
PROJECT_ROOT=$PWD
mkdir -p "$OUT_DIR/before-build/source"
cp -R source/src source/build.mjs source/template.html "$OUT_DIR/before-build/source/"
ln -sfn "$PROJECT_ROOT/source/node_modules" "$OUT_DIR/before-build/source/node_modules"
git show HEAD:source/src/shaders.js > "$OUT_DIR/before-build/source/src/shaders.js"
(cd "$OUT_DIR/before-build/source" && node build.mjs --dev) && mv "$OUT_DIR/before-build/dev.html" "$OUT_DIR/before.html"
(cd source && node build.mjs --dev) && cp dev.html "$OUT_DIR/after.html"   # dev.html is gitignored
rm -rf "$OUT_DIR/before-build"
ls -l "$OUT_DIR"/*.html
