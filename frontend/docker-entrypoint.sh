#!/bin/sh
set -e
# Use public backend URL on Render; locally default to http://backend:8000
export BACKEND_ORIGIN="${BACKEND_ORIGIN:-http://backend:8000}"
envsubst '${BACKEND_ORIGIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g "daemon off;"