# Use Node.js 20 Alpine
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Make waitfordb-test-start.sh executable
RUN chmod +x waitfordb-test-start.sh

# Build NestJS
RUN npm run build

EXPOSE 3000

# Default command: wait for DB then start app in production
CMD ["./waitfordb-test-start.sh", "db", "5432", "npm", "run", "start:prod"]
