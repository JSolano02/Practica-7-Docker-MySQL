# Imagen oficial de Node.js para ejecutar la aplicación.
FROM node:22-alpine

WORKDIR /app

# Instalar las dependencias antes de copiar el código para aprovechar la caché.
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY src/ ./src/

EXPOSE 3000
CMD ["npm", "start"]
