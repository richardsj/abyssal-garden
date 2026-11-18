#!/usr/bin/env bash
# Shrinks chosen night-dive captures (from chrome-capture-night-dive-views-as-dataurls.js, decoded with
# decode-captured-dataurls-to-images.mjs) to 1600x900 JPEGs in .github/screenshots, the size of the daytime set.
# Usage: _scratch/shrink-night-shots-to-readme-screenshots.sh <decoded-shots-directory>
set -euo pipefail
SHOTS_DIR="$1"; OUT_DIR=".github/screenshots"
while read -r SOURCE_NAME TARGET_NAME; do
  ffmpeg -y -loglevel error -i "$SHOTS_DIR/$SOURCE_NAME.jpg" -vf "scale=1600:900:flags=lanczos" -q:v 3 "$OUT_DIR/$TARGET_NAME.jpg"
  echo "$OUT_DIR/$TARGET_NAME.jpg $(stat -f %z "$OUT_DIR/$TARGET_NAME.jpg") bytes"
done <<'LIST'
pose1 night-whale-fluke
pose2 night-shipwreck
pose3 night-bait-ball
pose4 night-sponge-garden
pose5 night-kelp-basin
pose6 night-purple-grotto
fly_4_swarm_from_below night-jellyfish
fly_3_pose1_stirred night-plankton-sparks
LIST
