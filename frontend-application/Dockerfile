# Use the official Node.js 20 image as a builder
FROM node:20 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files into the docker image
COPY . .

# Build the project for production
RUN npm run build

# Use nginx to serve the static files
FROM nginx:alpine

# Copy static assets from builder stage
COPY --from=builder /usr/src/app/dist/temp/browser /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 4200
EXPOSE 4200

# Start nginx
CMD ["nginx", "-g", "daemon off;"]