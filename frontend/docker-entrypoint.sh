#!/bin/sh
set -e

# Replace $BACKEND_URL in the template and output to the real config file
envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Injected Backend URL: $BACKEND_URL"

# Start Nginx
exec nginx -g 'daemon off;'