# Use uma imagem leve do Node.js
FROM node:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package.json yarn.lock ./
RUN yarn

# Copia o restante da aplicação
COPY . .

# Compila o aplicativo com limite de memória ajustado
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn build


# Expõe a aplicação na porta 80
EXPOSE 80

# Usa um servidor web de produção
CMD ["npx", "serve", "-s", "dist"]
