FROM node:15

COPY ./package*.json /app/frontend/
RUN npm install -g npm@7.6.3
COPY ./ /app/frontend/
RUN npm @angular/cli build
# built files are in /app/frontend/dist/
