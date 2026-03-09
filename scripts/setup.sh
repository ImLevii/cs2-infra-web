#!/bin/bash
set -e

cd /vercel/share/v0-project

echo "Installing dependencies with yarn..."
yarn install

echo "Starting Nuxt dev server..."
yarn dev
