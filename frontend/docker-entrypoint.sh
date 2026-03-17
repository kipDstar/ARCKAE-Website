#!/bin/sh
set -e

# Replace $BACKEND_HOSTPORT in the template and output to the real config file
envsubst '$BACKEND_HOSTPORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx
exec nginx -g 'daemon off;'