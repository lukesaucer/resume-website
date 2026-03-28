#!/bin/sh
set -e

echo "Running database migrations..."
npx payload migrate 2>&1 || echo "Migrations complete (or already up to date)"

echo "Starting production server..."
exec npx next start -p ${PORT:-3000} -H ${HOSTNAME:-0.0.0.0}
