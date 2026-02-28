FROM node:22-alpine

WORKDIR /app

# copy only the files needed to install dependency
COPY package.json package-lock.json ./

# install dependencies 
RUN npm ci

# copy the the rest of files
COPY . .

# run development build 
CMD ["npm", "run", "start:dev"]