#!/bin/bash
set -e

echo "Installing dependencies with yarn..."
yarn install

echo "Starting Nuxt dev server..."
yarn dev
