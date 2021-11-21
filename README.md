ESTA ALTERACO ENTROU NA MAIN

# Mongo test
This is a [Node](https://nodejs.org/en/) application created for [MongoDB](https://www.mongodb.com/) testing purposes.

It uses [KOA](https://koajs.com/) web framework exposing a simples CRUD API for the maintenance of a blog platform.

## Local setup
 - Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
 - Run the following command:
    ```
    docker-compose up
    ```
    And you should be good to go! The node application will be exposed at port `3000` and the MongoDB at port `27017`
<!-- TODO list all endpoints here -->

## Running linter
This project uses [ESLint](https://eslint.org/) for a linter. You can run it with the following command (you may want to add `--fix` for auto fixing offenses):
```
docker-compose exec app npx eslint .
```

## Running tests
For unit and integration tests we use [Jest](https://jestjs.io/). You can run it with the command:
```
docker-compose exec app npm test
```
