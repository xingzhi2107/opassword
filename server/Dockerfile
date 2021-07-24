FROM opassword-server-base:latest

COPY ./ ./

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start:prod"]

