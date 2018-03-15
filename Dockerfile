# Контейнер для REST API e-archiv-service.
# Получение данных из электронного архива документов и договоров
FROM node:carbon

MAINTAINER Grigorchuk Aleksandr <aleksandr.grigorchuk@gmail.com>

COPY . /e-archiv-service

WORKDIR /e-archiv-service

RUN npm install

EXPOSE 9000

CMD ["npm", "start"]