#!/bin/bash

echo "Deployment starting...\n"
cd ../app
rm -rf build node_modules
cd ../frontend
yarn install
yarn build
cd ../deploy
node deploy.js
cd ../app
rm -rf build
yarn install
echo "Deployment complete!\n"