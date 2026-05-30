FROM node:20-alpine

WORKDIR /app

# Copy root configurations (necessary for Lerna/Workspaces)
COPY package.json lerna.json ./
COPY shared ./shared
COPY services/payment-service ./services/payment-service

# Install dependencies (this bootstraps the monorepo)
RUN npm install

# Build shared library first
WORKDIR /app/shared
RUN npm run build

# Build the payment service
WORKDIR /app/services/payment-service
RUN npm run build

# Start the service
CMD ["npm", "start"]
