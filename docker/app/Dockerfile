FROM node:10-alpine
MAINTAINER Babichev Maxim <info@babichev.net>

RUN npm install pm2@latest -g

WORKDIR /var/www/app

CMD ["pm2-runtime", "process.yml"]
