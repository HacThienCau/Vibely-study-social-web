#!/bin/bash

# Load environment variables
source .env

# Build images
echo "Building backend..."
docker build -t backend ./backend \
  --build-arg NODE_ENV="${NODE_ENV}" \
  --build-arg MONGO_URI_ATLAS="${MONGO_URI_ATLAS}" \
  --build-arg JWT_SECRET="${JWT_SECRET}" \
  --build-arg FRONTEND_URL="${FRONTEND_URL}" \
  --build-arg CLOUDINARY_NAME="${CLOUDINARY_NAME}" \
  --build-arg CLOUDINARY_API_KEY="${CLOUDINARY_API_KEY}" \
  --build-arg CLOUDINARY_API_SECRET="${CLOUDINARY_API_SECRET}" \
  --build-arg EMAIL_USER="${EMAIL_USER}" \
  --build-arg EMAIL_PASS="${EMAIL_PASS}"

echo "Building frontend-user..."
docker build -t frontend-user ./frontend-user \
  --build-arg URL="${URL}" \
  --build-arg NEXT_PUBLIC_BACKEND_URL="${NEXT_PUBLIC_BACKEND_URL}" \
  --build-arg PUBLIC_FOLDER="${PUBLIC_FOLDER}"

echo "Building frontend-admin..."
docker build -t frontend-admin ./frontend-admin \
  --build-arg NEXT_PUBLIC_BACKEND_URL="${NEXT_PUBLIC_BACKEND_URL}"

echo "Building socket..."
docker build -t socket ./socket

# Run docker-compose
echo "Starting services..."
docker-compose up -d
