FROM node:16.13.1
WORKDIR /app
COPY ./ /app
COPY ["package.json", "package-lock.json*", "./"]
