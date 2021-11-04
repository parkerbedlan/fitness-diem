FROM node:14

# Create app directory
WORKDIR /usr/src/app

# need to fix ubuntu build "Error: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.25' not found (required by /usr/src/app/node_modules/argon2/lib/binding/napi-v3/argon2.node)"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g node-pre-gyp
RUN node-pre-gyp rebuild -C ./node_modules/argon2

COPY . .
COPY .env.production .env

# RUN npm install
# RUN npm install -g node-pre-gyp
# RUN node-pre-gyp rebuild -C ./node_modules/argon2

RUN npm run build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node