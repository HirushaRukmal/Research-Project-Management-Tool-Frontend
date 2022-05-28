FROM public.ecr.aws/docker/library/node:16.15.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1234
CMD [ "npm", "start" ]
