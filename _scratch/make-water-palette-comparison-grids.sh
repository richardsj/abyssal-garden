#!/usr/bin/env bash
# Usage: _scratch/make-water-palette-comparison-grids.sh DIR        (run from the project root)
# DIR holds capture-water-<palette>.json files written by chrome-capture-water-palette-views-as-dataurls.js.
# Decodes each into DIR/shots/<palette>/ and then, for every view, writes DIR/compare/<view>.jpg: the same view in
# every palette, three across (so five palettes make two rows), each tile 1600x900 with its palette name stamped on
# it by the capture script. Also DIR/compare-small/<view>.jpg at 2400 px wide for a quick look.
set -euo pipefail
DIR=${1:?usage: $0 DIR}
mkdir -p "$DIR/shots" "$DIR/compare" "$DIR/compare-small"
PALETTES=()
for json in "$DIR"/capture-water-*.json; do
  name=$(basename "$json" .json); name=${name#capture-water-}
  node _scratch/decode-captured-dataurls-to-images.mjs "$json" "$DIR/shots/$name" >/dev/null
  PALETTES+=("$name")
done
COUNT=${#PALETTES[@]}
for first in "$DIR/shots/${PALETTES[0]}"/view*.jpg; do
  view=$(basename "$first")
  INPUTS=(); LAYOUT=""; LABELS=""
  for i in "${!PALETTES[@]}"; do
    INPUTS+=(-i "$DIR/shots/${PALETTES[$i]}/$view")
    LAYOUT+="$(( (i % 3) * 1600 ))_$(( (i / 3) * 900 ))|"; LABELS+="[$i:v]"
  done
  ffmpeg -y -loglevel error "${INPUTS[@]}" -filter_complex "${LABELS}xstack=inputs=$COUNT:layout=${LAYOUT%|}:fill=black[o]" -map "[o]" -q:v 3 "$DIR/compare/$view"
  ffmpeg -y -loglevel error -i "$DIR/compare/$view" -vf scale=2400:-1 -q:v 4 "$DIR/compare-small/$view"
done
ls "$DIR/compare"
