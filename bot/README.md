# bot

## Project setup
Make `.env` file and fill it with following variables:  

`CLIENT_ID`  
`CLIENT_SECRET`  
`REFRESH_TOKEN`  
`AGENT` - set to something like "censortron-1984 by @username"  
`NODE_ENV` - set to "production" when in production  
`FAUNA_SECRET` - your faunadb "server" secret  

## Run
`docker-compose up`

If you made changes to the code and want to restart it, run:  
`docker-compose restart bot`
