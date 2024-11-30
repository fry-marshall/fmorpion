#!/bin/sh

db_ready=false
while [ "$db_ready" != true ]; do
  echo nc -z mysqldb "$DATABASE_DOCKER_PORT"
  if nc -z mysqldb "$DATABASE_DOCKER_PORT" >/dev/null 2>&1; then
    db_ready=true
  else
    echo "Waiting for MySQL to be ready..."
    sleep 1
  fi
done

echo "MySQL is ready"
npx tsc
npm run migrate
npm start