# Use an official Node.js runtime as a parent image
FROM node:16 as base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your NestJS application will run on
EXPOSE 3000

# Start your NestJS application
CMD ["yarn", "start"]
