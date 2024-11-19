# use alpine image for node 22.8 version
FROM node:22-alpine3.19 AS development

# determine workiing directory for app
WORKDIR /app

# copy package json and lock files into workdir
COPY package*.json ./

#install dependencies
RUN npm ci && npm cache clean --force

# copy all files to image from project
COPY . .

# create dist folder
RUN npm run build


EXPOSE ${PORT}

#start server
CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]
