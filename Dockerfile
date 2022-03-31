FROM node:16-alpine
WORKDIR /app
COPY --chown=node:node . /app
RUN npm ci
RUN npm run build
USER node
CMD "node" "build/index.js"
EXPOSE 3000