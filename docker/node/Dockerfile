FROM node:14.7.0-alpine3.12 as base
LABEL maintainer="Thibaut BAYER<bt0r>"
WORKDIR /app
COPY . /app
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime
RUN npm install -g typescript
RUN npm install -g webpack-cli
RUN npm link typescript

FROM base as prod
CMD node dist/index.js
