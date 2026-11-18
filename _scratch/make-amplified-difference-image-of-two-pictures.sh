#!/bin/bash
# Usage: make-amplified-difference-image-of-two-pictures.sh <picture A> <picture B> <output jpg> [gain, default 6]
# Writes |A - B| multiplied by the gain: black where the two pictures agree, bright where they differ. For checking
# that a change touched only what it should (for example: where do the jellyfish shadows fall?).
# The pictures are converted to red/green/blue planes first: a difference taken on the camera-style colour planes
# that JPEG uses comes out as flat green.
set -eu
g="${4:-6}"
ffmpeg -y -loglevel error -i "$1" -i "$2" -filter_complex "[0:v]format=gbrp[a];[1:v]format=gbrp[b];[a][b]blend=all_mode=difference,lutrgb=r='clip(val*${g},0,255)':g='clip(val*${g},0,255)':b='clip(val*${g},0,255)',format=yuvj444p" "$3"
