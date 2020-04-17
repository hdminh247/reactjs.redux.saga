# State 1, base on nginx
FROM nginx:alpine

# Create app directory
WORKDIR /usr/share/nginx/html

## Bundle app source
COPY ./build /usr/share/nginx/html

EXPOSE 8082
