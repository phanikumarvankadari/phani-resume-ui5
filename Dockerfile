# SAP UI5 Resume Application - Docker Image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S ui5user && \
    adduser -S ui5user -u 1001 -G ui5user

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application source code
COPY . .

# Change ownership to non-root user
RUN chown -R ui5user:ui5user /app

# Switch to non-root user
USER ui5user

# Expose the port that UI5 tooling uses
EXPOSE 8081

# Health check to ensure application is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8081/ || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV UI5_HOST=0.0.0.0
ENV UI5_PORT=8081

# Start the application
CMD ["npm", "start"]
