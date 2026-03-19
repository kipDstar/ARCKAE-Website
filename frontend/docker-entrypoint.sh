#!/bin/sh

# Copy nginx template to final config (no substitution needed)
cp /etc/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;'