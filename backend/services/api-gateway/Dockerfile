FROM node:20-alpine

WORKDIR /app

# Copy root configurations
COPY package.json lerna.json ./
COPY shared ./shared
COPY services/api-gateway ./services/api-gateway

# Install dependencies (this bootstraps the monorepo)
RUN npm install

# Build shared library first
WORKDIR /app/shared
RUN npm run build

# Build the API Gateway
WORKDIR /app/services/api-gateway
RUN npm run build

# Expose port
EXPOSE 3000

# Start the service
CMD ["npm", "start"]
