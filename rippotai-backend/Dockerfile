# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first (to leverage caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
