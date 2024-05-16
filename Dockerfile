FROM node:16.18.1-alpine3.16
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml .
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
