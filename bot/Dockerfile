FROM node:current

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 80 443

CMD ["npm", "start"]
