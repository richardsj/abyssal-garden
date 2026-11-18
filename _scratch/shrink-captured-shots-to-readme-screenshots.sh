#!/usr/bin/env bash
# Shrinks chosen captures (decoded with decode-captured-dataurls-to-images.mjs) to 1600x900 JPEGs in
# .github/screenshots, the README picture size.
#   night: from chrome-capture-night-dive-views-as-dataurls.js     -> night-*.jpg
#   day:   from chrome-capture-six-viewpoints-by-day-as-dataurls.js -> day-*.jpg
# Usage: _scratch/shrink-night-shots-to-readme-screenshots.sh <decoded-shots-directory> [night|day]
set -euo pipefail
SHOTS_DIR="$1"; SET_NAME="${2:-night}"; OUT_DIR=".github/screenshots"
VIEW_NAMES='pose1 whale-fluke
pose2 shipwreck
pose3 bait-ball
pose4 sponge-garden
pose5 kelp-basin
pose6 purple-grotto'
if [ "$SET_NAME" = night ]; then
  LIST="$VIEW_NAMES
fly_4_swarm_from_below jellyfish
fly_3_pose1_stirred plankton-sparks"
else
  LIST="$VIEW_NAMES"
fi
while read -r SOURCE_NAME TARGET_NAME; do
  OUT_FILE="$OUT_DIR/$SET_NAME-$TARGET_NAME.jpg"
  ffmpeg -y -loglevel error -i "$SHOTS_DIR/$SOURCE_NAME.jpg" -vf "scale=1600:900:flags=lanczos" -q:v 3 "$OUT_FILE"
  echo "$OUT_FILE $(stat -f %z "$OUT_FILE") bytes"
done <<< "$LIST"
