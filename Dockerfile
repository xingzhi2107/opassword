FROM node:14.17.3-alpine

WORKDIR /usr/src/app
RUN npm set unsafe-perm true
