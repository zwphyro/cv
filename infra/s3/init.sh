#!/usr/bin/env bash
# Creates the S3 bucket named in S3_BUCKET.
# Runs on every `up`; an existing bucket is kept.
set -euo pipefail

: "${AWS_ENDPOINT_URL:?}" "${AWS_ACCESS_KEY_ID:?}" "${AWS_SECRET_ACCESS_KEY:?}" "${S3_BUCKET:?}"

# S3-compatible storages are addressed by endpoint, not by bucket subdomain
aws configure set default.s3.addressing_style path

if output=$(aws s3api head-bucket --bucket "$S3_BUCKET" 2>&1); then
  echo "s3-init: bucket \"$S3_BUCKET\" already exists"
elif [[ $output == *"(404)"* ]]; then
  echo "s3-init: creating bucket \"$S3_BUCKET\""
  aws s3api create-bucket --bucket "$S3_BUCKET"
else
  echo "s3-init: cannot check bucket \"$S3_BUCKET\": $output" >&2
  exit 1
fi
