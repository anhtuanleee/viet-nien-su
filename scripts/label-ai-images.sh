#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="public/event-illustrations/unique"
OUTPUT_DIR="public/event-illustrations/labeled"
LABEL="MINH HỌA AI · KHÔNG PHẢI ẢNH TƯ LIỆU"

command -v convert >/dev/null 2>&1 || {
  echo "ImageMagick 'convert' is required." >&2
  exit 1
}

mkdir -p "$OUTPUT_DIR"

for source in "$SOURCE_DIR"/*.webp; do
  output="$OUTPUT_DIR/$(basename "$source")"
  convert "$source" \
    \( -size 1672x86 xc:'#09100ee6' \) -gravity south -compose over -composite \
    -gravity southwest -font DejaVu-Sans-Bold -pointsize 27 -fill '#f3ead7' \
    -annotate +34+27 "$LABEL" -quality 88 "$output"
done

echo "Created labeled AI illustrations in $OUTPUT_DIR"
