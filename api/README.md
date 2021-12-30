# 3party

sql used in the context. so, use the follow command to up a new instance of sql server If need
`docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=P@ss5961" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU14-ubuntu-20.04`

# run tests

Command: - "node server.js".

# Docker the app

sample:

`docker build . -t node-web-api`

## Run the image

`docker run -p 49160:1337 -d node-web-api`
