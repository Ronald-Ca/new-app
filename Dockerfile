FROM node:latest AS builder
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn
COPY .env .env
COPY . .
RUN yarn build


FROM nginx:latest as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
