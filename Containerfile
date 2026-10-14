FROM node:26-alpine AS build-stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack && corepack enable
ARG VITE_DAPHINE_URL
ENV VITE_DAPHINE_URL=$VITE_DAPHINE_URL
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY ./ .
RUN VITE_DAPHINE_URL=$VITE_DAPHINE_URL pnpm build

FROM docker.io/nginx:latest AS production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
