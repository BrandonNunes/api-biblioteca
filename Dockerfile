FROM node

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 8000

COPY . .

CMD [ "node", "dist/index.js" ]
