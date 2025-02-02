FROM node:22-alpine3.21 AS builder
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn
ENV NODE_OPTIONS=--max_old_space_size=3072
COPY . .
RUN yarn build
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
