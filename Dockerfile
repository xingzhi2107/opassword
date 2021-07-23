FROM opassword-server-base:latest

COPY ./ ./

RUN yarn run build

CMD ["yarn", "start:prod"]

