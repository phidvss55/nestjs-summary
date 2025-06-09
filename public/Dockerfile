FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 8080

# CMD ["npx http-server ."]

CMD ["http-server", ".", "-p", "8080", "--cors"]