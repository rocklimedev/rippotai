FROM node:20-slim

WORKDIR /app

# Required for MongoDB Atlas TLS
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
