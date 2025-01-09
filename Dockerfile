# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências e instala apenas dependências de produção
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

# Copia o restante da aplicação
COPY . .

# Compila a aplicação
RUN NODE_OPTIONS="--max-old-space-size=2048" yarn build

# Etapa 2: Configuração do servidor
FROM nginx:alpine

# Copia os arquivos compilados para o NGINX
COPY --from=builder /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para rodar o NGINX
CMD ["nginx", "-g", "daemon off;"]
