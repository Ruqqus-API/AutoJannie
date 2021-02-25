const Ruqqus = require("ruqqus-js")
require('dotenv').config()
const client = new Ruqqus.Client({
	agent: process.env.AGENT
})

var faunadb = require('faunadb')
var faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET })

client.on("post", post => require('./helpers/handlers/postHandler').execute(client, faunaClient, post))
client.on("comment", comment => require('./helpers/handlers/commentHandler').execute(client, faunaClient, comment))

client.on("login", () => {
	console.log(`Logged in as ${client.user.username}!`)
});

client.login({
	id: process.env.CLIENT_ID,
	token: process.env.CLIENT_SECRET,
	refresh: process.env.REFRESH_TOKEN,
})
/*
process.on('unhandledRejection', error => {
	// Will print "unhandledRejection err is not defined"
	console.log('unhandledRejection', error.message);
});*/