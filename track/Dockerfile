FROM node:17-alpine

ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=password

RUN mkdir -p /home/track

COPY ./track /home/track

WORKDIR /home/track

RUN npm install

CMD ["npm", "start"]