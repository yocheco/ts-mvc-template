FROM node:14.15

# Create app directory
RUN mkdir -p /usr/app
RUN chmod -R 777 /usr/app
WORKDIR /usr/app

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN set -ex \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        autoconf \
        libtool \
        libpng-dev \
        pkg-config \
        nasm \
    && wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb \
         && dpkg -i /tmp/libpng12.deb \
         && rm /tmp/libpng12.deb \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --silent

# Bundle app source
COPY . .

# for typescript
RUN npm run build
WORKDIR /usr/app/dist


EXPOSE ${PORT}
CMD [ "node", "server.js" ]