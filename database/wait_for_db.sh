#!/bin/sh
set -e

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"
DB_PASSWORD="${DB_PASSWORD:-postgres}"
DB_NAME="${DB_NAME:-postgres}"  # use default DB to test connection

echo "Waiting for database at $DB_HOST:$DB_PORT..."

# Wait until the DB port is open
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Database port not ready, sleeping 2s..."
  sleep 2
done



echo "Database is ready! Running commands..."
exec "$@"
