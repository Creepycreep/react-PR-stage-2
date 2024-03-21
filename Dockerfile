FROM node:20.11-slim as build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM nginx:1.23.4

RUN rm /etc/nginx/conf.d/default.conf
COPY /.nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
