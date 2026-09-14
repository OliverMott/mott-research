#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)
SOURCE_DIR=${1:-/Users/omott/Downloads/MOTT}
WORK_DIR=${AUCTION_IMPORT_WORK_DIR:-/private/tmp/mott-auction-r2-import}
CONCURRENCY=${AUCTION_IMPORT_CONCURRENCY:-4}

if [[ ! -f "$PROJECT_ROOT/.env.local" ]]; then
  echo "Missing $PROJECT_ROOT/.env.local" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source "$PROJECT_ROOT/.env.local"
set +a

for variable in R2_ACCOUNT_ID R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY R2_BUCKET R2_PUBLIC_URL; do
  if [[ -z "${!variable:-}" ]]; then
    echo "Missing $variable in .env.local" >&2
    exit 1
  fi
done

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Source directory not found: $SOURCE_DIR" >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required but was not found" >&2
  exit 1
fi

mkdir -p "$WORK_DIR/thumbnails" "$WORK_DIR/full" "$WORK_DIR/done"

R2_ENDPOINT="https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com/$R2_BUCKET"
export WORK_DIR R2_ENDPOINT R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY

process_image() {
  local source_file=$1
  local filename stem width height thumb_width thumb_height full_width full_height
  local thumbnail_file full_file marker

  filename=$(basename "$source_file")
  stem=${filename%.*}
  thumbnail_file="$WORK_DIR/thumbnails/$stem.webp"
  full_file="$WORK_DIR/full/$stem.webp"
  marker="$WORK_DIR/done/$stem"

  if [[ -f "$marker" ]]; then
    echo "skipped $filename"
    return
  fi

  width=$(sips -g pixelWidth "$source_file" 2>/dev/null | awk '/pixelWidth:/{print $2}')
  height=$(sips -g pixelHeight "$source_file" 2>/dev/null | awk '/pixelHeight:/{print $2}')
  if [[ -z "$width" || -z "$height" ]]; then
    echo "Could not read dimensions: $source_file" >&2
    return 1
  fi

  if (( width >= height )); then
    thumb_width=360
    thumb_height=0
    full_width=1800
    full_height=0
  else
    thumb_width=0
    thumb_height=360
    full_width=0
    full_height=1800
  fi

  if [[ ! -f "$thumbnail_file" ]]; then
    cwebp -quiet -mt -q 76 -resize "$thumb_width" "$thumb_height" "$source_file" -o "$thumbnail_file"
  fi
  if [[ ! -f "$full_file" ]]; then
    cwebp -quiet -mt -q 84 -resize "$full_width" "$full_height" "$source_file" -o "$full_file"
  fi

  curl --silent --show-error --fail \
    --aws-sigv4 'aws:amz:auto:s3' \
    --user "$R2_ACCESS_KEY_ID:$R2_SECRET_ACCESS_KEY" \
    --header 'Content-Type: image/webp' \
    --header 'Cache-Control: public, max-age=31536000, immutable' \
    --upload-file "$thumbnail_file" \
    "$R2_ENDPOINT/auction/thumbnails/$stem.webp"

  curl --silent --show-error --fail \
    --aws-sigv4 'aws:amz:auto:s3' \
    --user "$R2_ACCESS_KEY_ID:$R2_SECRET_ACCESS_KEY" \
    --header 'Content-Type: image/webp' \
    --header 'Cache-Control: public, max-age=31536000, immutable' \
    --upload-file "$full_file" \
    "$R2_ENDPOINT/auction/full/$stem.webp"

  touch "$marker"
  echo "uploaded $filename"
}

export -f process_image

image_count=$(find "$SOURCE_DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) | wc -l | tr -d ' ')
if [[ "$image_count" == "0" ]]; then
  echo "No JPEG images found in $SOURCE_DIR" >&2
  exit 1
fi

echo "Processing $image_count images with $CONCURRENCY workers"
find "$SOURCE_DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0 \
  | xargs -0 -n 1 -P "$CONCURRENCY" bash -c 'process_image "$1"' _

python3 - "$SOURCE_DIR" "$WORK_DIR/manifest.json" <<'PY'
import json
import pathlib
import re
import sys

source_dir = pathlib.Path(sys.argv[1])
manifest_path = pathlib.Path(sys.argv[2])

def natural_key(path: pathlib.Path):
    return [int(part) if part.isdigit() else part.casefold() for part in re.split(r"(\d+)", path.name)]

sources = sorted(
    (path for path in source_dir.iterdir() if path.is_file() and path.suffix.casefold() in {".jpg", ".jpeg"}),
    key=natural_key,
)

images = []
for index, source in enumerate(sources, start=1):
    stem = source.stem
    images.append({
        "thumbnail": f"auction/thumbnails/{stem}.webp",
        "full": f"auction/full/{stem}.webp",
        "alt": f"Mott Research auction photograph {index}",
    })

manifest_path.write_text(json.dumps({"images": images}, separators=(",", ":")) + "\n")
PY

curl --silent --show-error --fail \
  --aws-sigv4 'aws:amz:auto:s3' \
  --user "$R2_ACCESS_KEY_ID:$R2_SECRET_ACCESS_KEY" \
  --header 'Content-Type: application/json' \
  --header 'Cache-Control: public, max-age=300' \
  --upload-file "$WORK_DIR/manifest.json" \
  "$R2_ENDPOINT/auction/manifest.json"

thumbnail_count=$(find "$WORK_DIR/thumbnails" -maxdepth 1 -type f -name '*.webp' | wc -l | tr -d ' ')
full_count=$(find "$WORK_DIR/full" -maxdepth 1 -type f -name '*.webp' | wc -l | tr -d ' ')
thumbnail_size=$(du -sh "$WORK_DIR/thumbnails" | awk '{print $1}')
full_size=$(du -sh "$WORK_DIR/full" | awk '{print $1}')

echo "Import complete: $thumbnail_count thumbnails ($thumbnail_size), $full_count lightbox images ($full_size)"
