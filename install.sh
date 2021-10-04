#!/bin/bash

echo "Installation starting...\n"
npm install
cd ./app
npm install
cd ../frontend
npm install
echo "Installation complete!\n"