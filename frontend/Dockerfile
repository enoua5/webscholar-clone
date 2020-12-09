FROM node:15

COPY ./package*.json /app/frontend/
RUN npm install

COPY ./ /app/frontend/
RUN npx @angular/cli build

# built files are in /app/frontend/dist/
