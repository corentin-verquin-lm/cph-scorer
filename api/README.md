# CPH Scorer API

> Api of cph scorer

## Configuration :

| config | description | default |
|---|---|---|
| NODE_ENV | current running environement | DEV |
| SWAGGER_PATH | path of swagger | api |
| PORT | port of apps | 8000 |
| DATABASE_URL | url of DB | postgres://psql:psql@127.0.0.1:5432/psql |

## Script :

```bash
# build app
build

# format code (lint & prettier)
format

# start app
start

# start app on dev mode
start:dev

# start app on debug mode
start:debug

# start app was build
start:prod

# running test (need DB enable)
test

# compile app
compile
```

## Author
**Corentin Verquin**
- Github [@corentin-verquin](https://github.com/corentin-verquin)

## License
Copyright © `2021` `Corentin Verquin`.
This project is [MIT](https://opensource.org/licenses/MIT) licensed%