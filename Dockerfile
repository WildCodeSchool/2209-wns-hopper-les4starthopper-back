# FROM node:alpine
# RUN mkdir /app
# WORKDIR /app
# COPY package*.json ./
# RUN npm i
# COPY src src
# CMD nodemon




FROM node:alpine
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i
COPY src src
COPY tsconfig.json tsconfig.json
COPY src/test src/test
COPY jest.config.js jest.config.js
CMD npm start 
