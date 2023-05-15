FROM node:16.19.1 AS ui-build
WORKDIR /usr/src/app
COPY . .
RUN npm install --force
RUN npm run build --verbose

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=ui-build /usr/src/app/build/ /usr/share/nginx/html
EXPOSE 3000 80

ENTRYPOINT ["sh", "-c", "cd /usr/share/nginx/html/ && ./set-env.sh && nginx -g 'daemon off;'"]