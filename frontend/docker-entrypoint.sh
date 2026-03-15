#!/bin/sh
set -e
# Substitute BACKEND_HOSTPORT into nginx config (Render sets this via fromService; locally use backend:8000)
export BACKEND_HOSTPORT="${BACKEND_HOSTPORT:-backend:8000}"
envsubst '${BACKEND_HOSTPORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g "daemon off;"
