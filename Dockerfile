FROM node:12

COPY . /src

WORKDIR /src/client

RUN npm install

RUN npm run-script build

WORKDIR /src/server

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]