```
$ docker build -t micro-website-api .
$ docker run --rm -it \
  -p 3000:3000 \
  -e "TIMEOUT=300000" \
  micro-website-api
```


[![Greenkeeper badge](https://badges.greenkeeper.io/evenchange4/micro-website-api.svg)](https://greenkeeper.io/)