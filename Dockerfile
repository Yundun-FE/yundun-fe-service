FROM node:8.9.4

COPY . /app/
WORKDIR /app

RUN npm install --production

EXPOSE 80
CMD ["npm", "run", "start"]
