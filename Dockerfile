# FROM ubuntu:latest

# RUN sudo apt-get update && \
#     sudo apt-get install -y curl &&  \
#     sudo curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&  \
#     sudo apt-get install -y nodejs

# RUN mkdir /app
# WORKDIR /app
# COPY package*.json /app/

# RUN npm install

# COPY . /app
# EXPOSE 3001
# CMD [ "npm"  ,"start" ]

FROM node:20

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 3001

CMD [ "npm" ,"start" ]