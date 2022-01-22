FROM node:latest

COPY . /app

WORKDIR /app

ENTRYPOINT [ "node", "main.js" ]