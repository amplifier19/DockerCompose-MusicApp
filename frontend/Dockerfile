FROM node:17-alpine

RUN mkdir -p /home/frontend

COPY ./frontend /home/frontend

WORKDIR /home/frontend

RUN npm install

ARG REACT_APP_HOST_IP_ADDRESS

ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS

CMD ["npm", "start"]
