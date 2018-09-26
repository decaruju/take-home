FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN yarn global add serve

COPY . .

EXPOSE 5000

CMD [ "serve", "-s" , "."]
