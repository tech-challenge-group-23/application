FROM node:20.13-alpine3.19
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml .
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 8080
CMD ["sh", "-c", "pnpm webhook"]
