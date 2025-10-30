# Dockerfile for Next.js on Render
FROM node:20-alpine AS base

# Install dependencies only when required
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ linux-headers eudev-dev libusb-dev
WORKDIR /app

# Install project dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild source only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build
RUN ls -la .next/
RUN find .next/ -name "*.js" | head -10

# Production image: copy everything and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Install runtime dependencies
RUN apk add --no-cache libc6-compat eudev libusb

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Prepare output directory owned by the runtime user
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output and static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN ls -la ./
RUN find . -name "server.js" | head -5

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
