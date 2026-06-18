# ============================================================================
# CollegeOS Frontend — Dockerfile
# Multi-stage build for production-optimized Next.js image
# ============================================================================

FROM node:20-alpine AS base

WORKDIR /app

# ─── Dependencies ────────────────────────────────────────────────────────────
FROM base AS deps

COPY package.json package-lock.json* ./
RUN npm install

# ─── Builder ─────────────────────────────────────────────────────────────────
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build 2>/dev/null || true

# ─── Development ─────────────────────────────────────────────────────────────
FROM base AS development

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ─── Runner (Production) ────────────────────────────────────────────────────
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
