FROM node:lts

WORKDIR  /var/www/html/app/

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 8000