FROM node:22-alpine

WORKDIR /backend

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["pnpm", "start:dev", "-H", "0.0.0.0", "-p", "3000"]