# Use uma imagem leve do Node.js
FROM node:latest AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia o restante da aplicação
COPY . .

# Compila o aplicativo
RUN yarn build

# Etapa de produção com NGINX
FROM nginx:latest

# Copia os arquivos compilados para o diretório padrão do NGINX
COPY --from=builder /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
