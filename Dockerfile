# production stage

FROM node:20-alpine AS prod-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production
RUN npm install -g pm2

EXPOSE 3000

CMD ['pm2-runtime', '/app/main.js']