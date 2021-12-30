FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 1337
EXPOSE 1433

CMD [ "node", "server.js" ]
