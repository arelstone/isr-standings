FROM node:12.18.0-alpine
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn
# RUN yarn --prod --ignore-optional

COPY dist dist

CMD [ "node", "dist/main.js"]
