# Stage 1 - build (tem as ferramentas necessárias)
FROM node:18 AS build
WORKDIR /app

# instalar ferramentas só no build (necessárias p/ node-gyp e libs nativas)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3 g++ make libpq-dev \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .
# RUN npm run build  # se houver etapa de build

# Stage 2 - runtime (somente o essencial)
FROM node:18-slim
WORKDIR /app

# runtime libs mínimas para Postgres e certificados
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 ca-certificates \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

# copiar artefatos e node_modules do build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

ENV NODE_ENV=production
CMD ["node", "src/server.js"]

