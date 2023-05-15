#!/bin/sh
cp -f /usr/share/nginx/html/index.html /tmp

sed -i -e "s|__LABELS_URL__|$LABELS_URL|g" /tmp/index.html
sed -i -e "s|__USERS_URL__|$USERS_URL|g" /tmp/index.html
sed -i -e "s|__PRICING_URL__|$PRICING_URL|g" /tmp/index.html
sed -i -e "s|__ORDERS_URL__|$ORDERS_URL|g" /tmp/index.html
sed -i -e "s|__MANIFESTS_URL__|$MANIFESTS_URL|g" /tmp/index.html
sed -i -e "s|__INTEGRATIONS_URL__|$INTEGRATIONS_URL|g" /tmp/index.html
sed -i -e "s|__SHIPMENTS_URL__|$SHIPMENTS_URL|g" /tmp/index.html
sed -i -e "s|__ADDRESSBOOK_URL__|$ADDRESSBOOK_URL|g" /tmp/index.html

cat /tmp/index.html > /usr/share/nginx/html/index.html