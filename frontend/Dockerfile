# syntax=docker/dockerfile:1

FROM node:22-alpine AS build-stage

WORKDIR /app

# Install dependencies first so this layer is cached until package files change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite writes the static site to /app/dist
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine AS release-stage

# nginx fills ${BACKEND_URL} into this template when the container starts.
# Override it to point the frontend at a different backend.
ENV BACKEND_URL=http://backend:8070
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

COPY --from=build-stage /app/dist /usr/share/nginx/html

# This image runs nginx as a non-root user, so it listens on 8080 instead of 80
EXPOSE 8080
