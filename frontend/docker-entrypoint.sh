#!/bin/sh
set -e
# Use Render private hostname:port when provided; default to docker-compose host locally
export BACKEND_HOSTPORT="${BACKEND_HOSTPORT:-backend:8000}"
envsubst '${BACKEND_HOSTPORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g "daemon off;"