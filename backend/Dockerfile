FROM node:24-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci  

COPY . .

RUN npm run build  

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY --from=builder /app/dist ./dist

USER node

EXPOSE 5000

CMD ["npm", "run", "start"]   



