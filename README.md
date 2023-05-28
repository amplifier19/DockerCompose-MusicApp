# Microservice Music Player with tracklist

## Description

This is a music player web app that allows you to play music from youtube links . It also allows you to create a mutiple playlists and play the tracks in the order you want.

## Installation

1. Clone the repository
2. Make sure you have docker and docker-compose installed
3. Run `docker-compose up` in the root directory
4. Open `localhost:3000` in your browser

<!--2.1 modify add the host ip to the docker-compose file  -->

## Technologies Used 

- Docker
- Docker compose 
- React
- Node.js
- MongoDB

## How does it work?

This app is made up of 3 distinct parts:
* The playlist service  [[dockerfile](./playlist/Dockerfile),[source code](./playlist)]
    * This service is responsible for creating and managing playlists and is composed of the following docker containers:
        * The playlist api running at port 4000
        * Its own mongodb database to store the playlists
* The track service     [[dockerfile](./track/Dockerfile),[source code](./track/track)]
    * This service is responsible for tracking the state of the tracks and is composed of the following docker containers:
        * The track api running at port 5000
        * Its own mongodb database to store track progress
        
* The frontend service  [[dockerfile](./frontend/Dockerfile),[source code](./frontend/frontend/)]
    * Written in React , this is the the main app exposed to the user and it allows easy playlist management and playback with a simple and intuitive UI. It is compose by the a single docker container running the frontend app at port 3000 and requires the ip of the of the host machine to be set in the .env file in the root directory of the project.

<!-- TODO: explain how the containers communicate with each other -->

<!-- TODO: insert container communication image -->


## Docker Compose Files Explained

The root [docker-compose.yml](./docker-compose.yml) file is responsible for building and running the 3 microservices and their respective databases. It also creates a network for the microservices to communicate with each other.

1. The first service is playlist api consisting of the api and its accompanied database container. The api is built from the [Dockerfile](./playlist/Dockerfile) in the playlist directory and the database is built from the mongo image. The api is exposed at port 4000. The api depends on the database to be running before it can start.

---
    services:
    playlist:
        build: ./playlist
        restart: always
        container_name: playlist
        ports:
        - 4000:4000
        depends_on:
        - mongodb-playlist
    mongodb-playlist:
        image: mongo
        container_name: mongodb-playlist
        environment:
        - MONGO_INITDB_ROOT_USERNAME=admin
        - MONGO_INITDB_ROOT_PASSWORD=password
        volumes:
        - mongo-data-playlist:/data/db
---

2. The second service is the track api consisting of the api and its accompanied database container. The api is built from the [Dockerfile](./track/Dockerfile) in the track directory and the database is built from the mongo image. The api is exposed at port 5000. The api depends on the database to be running before it can start.

---
    track:
        build: ./track
        restart: always
        container_name: track
        ports:
        - 5000:5000
        depends_on:
        - mongodb-track
    mongodb-track:
        image: mongo
        container_name: mongodb-track
        environment:
        - MONGO_INITDB_ROOT_USERNAME=admin
        - MONGO_INITDB_ROOT_PASSWORD=password
        volumes:
        - mongo-data-track:/data/db
---

3. The final microservice is the frontend app. It is built from the [Dockerfile](./frontend/Dockerfile) in the frontend directory. The app is exposed at port 3000. The app depends on the playlist and track api to be running before it can start. It also requires the ip of the host machine to be set as an argument inside the docker-compose file.

---
    frontend:
        build:
        context: ./frontend
        dockerfile: Dockerfile
        args:
            REACT_APP_HOST_IP_ADDRESS: x.x.x.x
        restart: always
        container_name: frontend
        depends_on:
        - playlist
        - track
        ports:
        - 3000:3000
---