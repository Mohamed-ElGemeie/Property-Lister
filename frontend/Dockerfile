# Use official Node.js 20 Alpine as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build Next.js app for production
RUN npm run build

# Expose port (Next.js default is 3000)
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
