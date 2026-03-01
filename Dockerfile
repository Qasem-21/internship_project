FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

Run npm run build

EXPOSE 3004

CMD ["npm", "run", "start:prod"]