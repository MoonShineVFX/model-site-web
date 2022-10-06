FROM node:14-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production
COPY . ./
RUN yarn build

CMD [ "yarn", "start" ]
