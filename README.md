# React app with Localization
A quickly written code demonstrating a React app with text based on locale (only English and Norwegain). 
Frontend is React, API uses FastAPI and database uses PostgreSQL on a Docker container.

When running 'npm start', the texts are fetched from the database and added locally to file for the React app to use.

## Setup db

Locate repo in terminal window and run following commands to set up Docker db container and populate db.

```sh
$ cd db
$ docker compose up
$ docker exec -it localization_container bash -c "psql -h localization_container -d localization_db -U root -f infile"
```

The last command you might have to run in a separate terminal.
Make sure the docker container is running before you continue.

## Setup API

Locate repo in terminal window and run following commands to set up FastAPI.

```sh
$ cd api
$ pip install -r requirements.txt
$ uvicorn api:app --reload
```

## Setup React app

Locate repo in terminal window and run following commands to set up the React app.

```sh
$ cd app
$ npm install
$ npm start
```
