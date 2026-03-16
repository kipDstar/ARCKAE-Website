#!/bin/sh
set -e
# Substitute BACKEND_HOSTPORT into nginx config (Render sets this via fromService; locally use backend:8000)
export BACKEND_ORIGIN="${BACKEND_ORIGIN:-http://backend:8000}"
envsubst '${BACKEND_ORIGIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g "daemon off;"
