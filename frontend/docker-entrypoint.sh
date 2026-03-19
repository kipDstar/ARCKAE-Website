#!/bin/sh
set -e

# Debug: show what we got
echo "DEBUG: BACKEND_URL = '$BACKEND_URL'"

# If BACKEND_URL is empty, try to use a default or exit with error
if [ -z "$BACKEND_URL" ]; then
  echo "ERROR: BACKEND_URL is not set!"
  echo "This should be auto-injected from render.yaml, or set manually in Render environment."
  exit 1
fi

# Replace $BACKEND_URL in the template and output to the real config file
envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Injected Backend URL: $BACKEND_URL"
echo "Final nginx config:"
cat /etc/nginx/conf.d/default.conf | head -20

# Start Nginx
exec nginx -g 'daemon off;'