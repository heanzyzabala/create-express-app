FROM node:12.21.0-alpine

ENV NODE_ENV production

WORKDIR /usr/app

COPY --chown=node:node ./dist package*.json ./

RUN npm i --production

USER node

CMD ["node", "index.js"]