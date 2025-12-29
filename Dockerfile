# Use the official Remotion image which comes with Chromium and FFmpeg pre-installed
FROM ghcr.io/remotion-dev/template-helloworld:latest

# Set working directory
WORKDIR /app

# Switch to root to install dependencies and manage permissions
USER root

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Adjust permissions for the out directory (where videos are rendered)
RUN mkdir -p out && chmod 777 out

# Create public assets directory if it doesn't exist
RUN mkdir -p public/assets && chmod 777 public/assets

# Use port 3000
EXPOSE 3000

# Start the API
CMD ["npm", "run", "start:api"]
