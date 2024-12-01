FROM node:18.19.1

WORKDIR /client/

COPY package.json /client/

RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps


RUN npm install yarn --legacy-peer-deps


COPY . /client/

RUN yarn build

CMD [ "yarn", "dev" ]