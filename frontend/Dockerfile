FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm ci 

COPY . .

RUN npm run build 

RUN npm run export
