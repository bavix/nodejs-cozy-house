FROM node:10-alpine

ADD . /var/www/app
WORKDIR /var/www/app

RUN npm ci

CMD npm run start
