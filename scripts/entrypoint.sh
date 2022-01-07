#!/bin/bash

echo "################## Installing dependencies... ##################"
npm install

echo "################## Seeding local database... ##################"
npm run seed

echo "################## Seeding test database... ##################"
npm run seed:test

echo "################## Starting server... ##################"
npm start