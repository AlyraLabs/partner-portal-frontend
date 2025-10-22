# Dockerfile для Next.js на Render
FROM node:18-alpine AS base

# Устанавливаем зависимости только когда нужно
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Устанавливаем зависимости
COPY package.json package-lock.json* ./
RUN npm ci

# Пересобираем исходный код только когда нужно
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Собираем приложение
RUN npm run build

# Production image, копируем все файлы и запускаем next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Автоматически используем output traces для уменьшения размера
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Автоматически используем output traces для уменьшения размера
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
