#!/bin/bash
set -e

NODE_VERSION="10.15.3"
APPS="/myapps"

su - vagrant
mkdir -p $APPS
cd $APPS
wget https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz
tar -xf node-v${NODE_VERSION}-linux-x64.tar.xz
echo "export PATH=/vagrant/node_modules/.bin:$APPS/node-v${NODE_VERSION}-linux-x64/bin:$PATH" >>  /etc/profile