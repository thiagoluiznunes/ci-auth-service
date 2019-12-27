FROM node:11

LABEL maintainer="thiagoluiz.dev@gmail.com"

# Create app directory
WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "run",  "prod" ]
