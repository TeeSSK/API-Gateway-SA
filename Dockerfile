FROM node:alpine AS base

RUN npm i -g pnpm

WORKDIR /app

FROM base AS builder
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src src
RUN pnpm build

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base AS production
ENV NODE_ENV production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER node

CMD ["node", "dist/main.js"]
