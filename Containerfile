FROM node:20-alpine AS build-stage
ARG VITE_DAPHINE_URL
ENV VITE_DAPHINE_URL=$VITE_DAPHINE_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN VITE_DAPHINE_URL=$VITE_DAPHINE_URL npm run build

FROM docker.io/nginx:latest as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
