# ============================================
# BUILD STAGE
# ============================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm ci --only=production

# ============================================
# PRODUCTION STAGE
# ============================================
FROM node:18-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built dependencies from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application source code
COPY --chown=nodejs:nodejs . .

# Create directories for logs and uploads
RUN mkdir -p logs uploads && \
    chown -R nodejs:nodejs logs uploads

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', r => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start application
CMD ["node", "server.js"]

FROM node:18-alpine

WORKDIR /app

# Copy package.json DAN package-lock.json (tanda * akan menangani keduanya)
COPY package*.json ./

# --- BAGIAN INI DIHAPUS SAJA ---
# COPY yarn.lock ./ 
# -------------------------------

# Pastikan gunakan npm install, BUKAN yarn install
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]