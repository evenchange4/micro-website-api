FROM zenato/puppeteer
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --pure-lockfile --production
COPY . .
RUN ls -lA
EXPOSE 3000
CMD npm start
