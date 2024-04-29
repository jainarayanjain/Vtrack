FROM node:18-bullseye-slim

# LABEL maintainer="Sumit Sharma <sumit.sharma@acsicorp.com>"

# WORKDIR /vtrack

# COPY . .

# EXPOSE 4000
# # # Copy the service-worker.js file from the public folder
# # COPY public/service-worker.js/ public/

# CMD ["npm", "run", "dev"]
# RUN npm ci --location=project



# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json if they exist
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
