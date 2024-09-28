FROM node:22-alpine AS build-stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ARG VITE_DAPHINE_URL
ENV VITE_DAPHINE_URL=$VITE_DAPHINE_URL
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY ./ .
RUN VITE_DAPHINE_URL=$VITE_DAPHINE_URL pnpm build

FROM docker.io/nginx:latest as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
