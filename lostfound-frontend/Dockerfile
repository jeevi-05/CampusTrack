# ─── Stage 1: Build React app ─────────────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first for layer caching
COPY package.json package-lock.json ./
RUN npm ci --silent

# Pass backend URL at build time via --build-arg
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY . .
RUN npm run build

# ─── Stage 2: Serve with Nginx ────────────────────────────────────────────────
FROM nginx:stable-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build output
COPY --from=build /app/build /usr/share/nginx/html

# Railway assigns PORT dynamically — nginx listens on 80 internally
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
