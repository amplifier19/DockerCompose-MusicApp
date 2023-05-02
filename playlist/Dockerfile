FROM node:17-alpine

ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=password

RUN mkdir -p /home/playlist

COPY ./playlist /home/playlist

WORKDIR /home/playlist

RUN npm install

CMD ["npm", "start"]
