# pull node-alpine version from dockerhub and name it as build_image
FROM node:17-alpine3.14 AS build_image

# clear the cache ofdocker images current docker image already pulled into the local machine 
RUN apk add --no-cache nodejs npm

# change the work directory to "azure" 
WORKDIR /docker         

# copy the package.json file to working directory
COPY package.json ./

# run "npm install" to download all necessary dependancies and packages
RUN npm install

# copy everything we downloaded to working directory
COPY . .

# build the project
# RUN npm run build

# use the node-alpine version here again
FROM node:17-alpine3.14

# change the working directory to "webApp"
WORKDIR /webapp

# copy the everything in build_image from azure to webApp directory
COPY --from=build_image /docker /webapp/

# define the exposing port of the application
EXPOSE 1234

# execute "npm start" command to start the application
CMD ["npm", "start"]
