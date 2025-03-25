FROM node:18-alpine

RUN mkdir -p /home/app

COPY . /home/app/

EXPOSE 3006

WORKDIR /home/app

RUN npm install

CMD ["npm", "start"]
