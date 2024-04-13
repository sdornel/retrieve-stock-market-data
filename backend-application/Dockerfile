# Use the official Node.js 20 image.
# https://hub.docker.com/_/node
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "node", "index.js" ]