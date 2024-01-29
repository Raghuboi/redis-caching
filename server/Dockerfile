FROM node:lts as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development app/dist ./dist