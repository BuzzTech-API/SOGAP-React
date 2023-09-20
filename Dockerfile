# Use a imagem oficial do Node.js
FROM node:20 as frontend

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci
COPY . /code
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Exponha a porta em que o aplicativo React será executado
EXPOSE 3000

# Comando para iniciar o servidor da aplicação React
CMD ["npm", "start"]
