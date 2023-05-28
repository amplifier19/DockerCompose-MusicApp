# Track API 

This is the API for the tracking the progress of each track in the playlist. It is a REST API written in JavaScipt using Node.js and mongodb.

## How does it work?

Inside the /track folder is the source code for the track api, while inside the dockerfile is the instructions for building the docker image for the track api. The docker image is built using the docker-compose file in the root directory of the project.

The dockerfile is based on the the node:17-alpine image : `` FROM node:17-alpine `` and then is accompanied by the following instructions: 
---
    ENV MONGO_INITDB_ROOT_USERNAME=admin \
        MONGO_INITDB_ROOT_PASSWORD=password

    RUN mkdir -p /home/track

    COPY ./track /home/track

    WORKDIR /home/track

    RUN npm install

    CMD ["npm", "start"]
---

which in order do the following:
1. Set the environment variables for the mongodb database username and password
2. Create a directory for the track api
3. Copy the source code for the track api into the directory
4. Set the working directory to the track api directory
5. Install the dependencies for the track api using npm
6. Start the track api by running the npm start command (npm script)