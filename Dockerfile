# TODO: optimize size
# https://hub.docker.com/r/zenato/puppeteer/~/dockerfile/
FROM evenchange4/docker-puppeteer:latest
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --pure-lockfile
COPY . .
RUN yarn run build
RUN ls -lA
EXPOSE 3000
CMD npm start
