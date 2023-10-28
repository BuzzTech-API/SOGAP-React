# Use a imagem oficial do Node.js
FROM node:20-alpine as frontend

WORKDIR /code
COPY package.json /code
COPY package-lock.json /code
RUN npm install
ENV PATH /code/node_modules/.bin:$PATH
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
WORKDIR /code/app/
COPY . /code/app/
# Exponha a porta em que o aplicativo React será executado
EXPOSE 3000

# Comando para iniciar o servidor da aplicação React
CMD npm startnew --host 0.0.0.0 --port 3000 --disableHostCheck true
