#!/usr/bin/env bash
# Usage: _scratch/make-before-after-image-pairs.sh BEFORE_DIR AFTER_DIR OUT_DIR
# For every .jpg present in both directories (contact sheets excluded), writes OUT_DIR/<name>.jpg with the "before"
# picture on the left and the "after" picture on the right, each 1600 px wide, separated by a white line.
# Used by the denser-reef-life workstream to compare a phase's stills with the baseline's, view by view.
set -euo pipefail
BEFORE_DIR=${1:?usage: $0 BEFORE_DIR AFTER_DIR OUT_DIR}; AFTER_DIR=${2:?}; OUT_DIR=${3:?}
mkdir -p "$OUT_DIR"
for before in "$BEFORE_DIR"/*.jpg; do
  name=$(basename "$before")
  case "$name" in sheet-*) continue;; esac
  [ -f "$AFTER_DIR/$name" ] || continue
  ffmpeg -y -loglevel error -i "$before" -i "$AFTER_DIR/$name" \
    -filter_complex "[0:v]scale=1600:-1,pad=1608:ih:0:0:white[a];[1:v]scale=1600:-1[b];[a][b]hstack=inputs=2[o]" -map "[o]" -q:v 3 "$OUT_DIR/$name"
done
ls "$OUT_DIR"
