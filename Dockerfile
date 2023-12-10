FROM node:18.19-alpine3.18

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . /usr/app/

CMD ["node", "app.js"]