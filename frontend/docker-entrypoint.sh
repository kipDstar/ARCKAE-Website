#!/bin/sh
set -e

# Replace $BACKEND_URL in template to create the final config
envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

echo "✓ Backend endpoint configured: $BACKEND_URL"

# Start nginx
exec nginx -g 'daemon off;'