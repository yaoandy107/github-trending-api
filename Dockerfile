FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY --chown=node:node . /app
RUN pnpm install --frozen-lockfile
RUN pnpm build
USER node

FROM node:18-alpine
ENV NODE_ENV production
WORKDIR /app
RUN npm install -g pnpm
COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
RUN pnpm install --frozen-lockfile --prod
USER node

EXPOSE 3000
CMD "npm" "run" "start:prod"
