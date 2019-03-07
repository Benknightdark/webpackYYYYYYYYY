FROM node:10.13-alpine  AS node-builder
WORKDIR /src
ARG arg
COPY . .
RUN npm install --silent
RUN npm run build


FROM nginx:1.15.2-alpine
RUN rm -rf /usr/share/nginx/html/*
#COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=node-builder /src/dist /usr/share/nginx/html
#COPY /dist/. /usr/share/nginx/html
EXPOSE  80
