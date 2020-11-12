FROM node:12.2.0-alpine

RUN mkdir -p /app
WORKDIR /app

ENV REACT_APP_ENV=prod

COPY . /app
RUN npm install
RUN npm install react-scripts@3.0.1 -g

CMD [ "npm", "start" ]
