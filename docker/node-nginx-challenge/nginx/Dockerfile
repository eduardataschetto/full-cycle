FROM nginx:1.15.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN mkdir /etc/nginx/sites-available -p && touch /etc/nginx/sites-available/index.js