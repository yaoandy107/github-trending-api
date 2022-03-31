# Stage 1
FROM node:16-alpine AS builder
WORKDIR /app
COPY --chown=node:node . /app
RUN npm ci
RUN npm run build
USER node

FROM node:16-alpine
ENV NODE_ENV production
WORKDIR /app
COPY package* ./
COPY --from=builder /app/build ./build
RUN npm ci --prod
USER node

EXPOSE 3000
CMD "node" "build/index.js"
