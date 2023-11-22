FROM node:16-buster

ARG GITLAB_ACCESS_TOKEN

WORKDIR /app

COPY package.json package-lock.json /app/
# COPY .npmrc /app/.npmrc  

RUN npm install && \
    rm -rf /tmp/* /var/tmp/*

# COPY ./docker-utils/entrypoint/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY ./.docker/run.sh /usr/local/bin/docker-run.sh

COPY . /app

RUN npm run build

EXPOSE 3000

USER node

ENV TYPEORM_MIGRATION=ENABLE

ENV NPM_INSTALL=DISABLE

CMD npm run start:prod