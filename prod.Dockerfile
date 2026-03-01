########## STAGE:1  --> installing dependencies
FROM node:22-alpine AS deps
 
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

######### STAGE:2 
FROM node:22-alpine AS builder

WORKDIR /app

# copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate || echo "NO prisma schema found"

# make dist folder
RUN npm run build

######### STAGE:3  --> install only production dependencies
FROM node:22-alpine AS prod-deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

######### STAGE:4  
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# copy build output
COPY --from=prod-deps /app/dist ./dist

# copy only the production dependencies
COPY --from=builder /app/dist ./dist

# copy prisma folder 
COPY --from=builder /app/prisma ./prisma

# run the app
CMD ["node", "dist/main.js"]
