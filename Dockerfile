FROM node:16-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm ci --prod
USER node
CMD "npm" "start"
EXPOSE 3000