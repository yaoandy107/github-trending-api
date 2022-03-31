FROM node:16-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --chown=node:node . /app
RUN npm ci --prod\
    && npm install typescript -g
RUN tsc
USER node
CMD "node" "build/index.js"
EXPOSE 3000