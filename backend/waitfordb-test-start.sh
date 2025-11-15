#!/bin/sh
set -e

DB_HOST="$1"
DB_PORT="$2"
shift 2

echo "Waiting for database at $DB_HOST:$DB_PORT..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Database not ready, sleeping 2 seconds..."
  sleep 2
done
echo "Database is up!"

echo "Waiting for db-init to finish (marker file /shared/db-init.done)..."
while [ ! -f /shared/db-init.done ]; do
  echo "db-init not finished, sleeping 2 seconds..."
  sleep 2
done
echo "db-init finished successfully."

echo "Running e2e tests..."
npm run test:e2e

echo "E2E tests passed! Starting NestJS..."
exec "$@"
