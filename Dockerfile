FROM node:18.14.1
WORKDIR /app
COPY ./ /app
COPY ["package.json", "package-lock.json*", "./"]
