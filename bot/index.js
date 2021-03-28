require('dotenv').config()

const Ruqqus = require("ruqqus-js")
const client = new Ruqqus.Client({
	agent: process.env.AGENT
})

const redis = require('redis')
let redisClient = redis.createClient({
	host: process.env.REDIS_URL
})

const {loadImageHosts, fetchConfigs} = require('./helpers/loadRedis')

var faunadb = require('faunadb')
var faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET })

const passOn = { client, faunaClient, redisClient }

client.on("post", post => require('./helpers/handlers/postHandler').execute(passOn, post))
client.on("comment", comment => require('./helpers/handlers/commentHandler').execute(passOn, comment))

client.on("login", () => {
	console.log(`Logged in as ${client.user.username}!`)
	loadImageHosts(redisClient)
	fetchConfigs(redisClient, faunaClient)

});

client.login({
	id: process.env.CLIENT_ID,
	token: process.env.CLIENT_SECRET,
	refresh: process.env.REFRESH_TOKEN,
})

process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error.message);
});


redisClient.on("error", function (err) {
    console.log("Error " + err);
});