# https://github.com/nodejs/docker-node/issues/2153
FROM node:20
# node:lts

EXPOSE 3000

WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm ci

ADD . /app

RUN npm run generate:prisma

RUN npm run test

RUN npm run build

CMD ["npm","run","run"]