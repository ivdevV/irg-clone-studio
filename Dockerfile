# ---------- STAGE 1: Build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm ci

# Copia el resto del código
COPY . .

# Compila el proyecto (usa bun si prefieres)
RUN npm run build

# ---------- STAGE 2: Serve with Nginx ----------
FROM nginx:alpine

# Copia configuración de Nginx personalizada
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos generados por el build (dist)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
