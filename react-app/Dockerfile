FROM node:22.0
WORKDIR /app/react

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

COPY . .

RUN yarn install --production
# RUN yarn

ENTRYPOINT [ "yarn", "start" ]


