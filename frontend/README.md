# React Frontend

This is the frontend service exposed to the user and is accessible on port 3000. 
**Important: In order to be accessible from the host machine, the ip of the host machine must be set in the docker-compose.yml file in the root directory of the project under ```frontend -> build -> args -> REACT_APP_HOST_IP```.**

## How does it work?

Inside the /frontend folder is the source code for the frontend app, while inside the dockerfile is the instructions for building the docker image for the frontend app. The docker image is built using the docker-compose file in the root directory of the project.

The dockerfile is based on the the node:17-alpine image : `` FROM node:17-alpine ``

---
    RUN mkdir -p /home/frontend

    COPY ./frontend /home/frontend

    WORKDIR /home/frontend

    RUN npm install

    ARG REACT_APP_HOST_IP_ADDRESS

    ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS

    CMD ["npm", "start"]
---

The above instructions do the following:
1. Create a directory for the frontend app
2. Copy the source code for the frontend app into the directory
3. Set the working directory to the frontend app directory
4. Install the dependencies for the frontend app using npm
5. Set the environment variable for the host ip address passed in as an argument from the root docker-compose file
6. Start the frontend app by running the npm start command (npm script)
