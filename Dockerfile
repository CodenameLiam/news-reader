FROM node:12

COPY . /src

WORKDIR /src/client

RUN npm install

WORKDIR /src/server

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]