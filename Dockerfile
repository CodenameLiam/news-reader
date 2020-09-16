# Using the Node version 12 base image
FROM node:12

# Copy the current directory
COPY . /src

# From the client-side directory
WORKDIR /src/client
# Install node modules
RUN npm install
# Build the application
RUN npm run-script build

# From the server-side directory
WORKDIR /src/server
# Install node modules
RUN npm install

# Expose the container on port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]