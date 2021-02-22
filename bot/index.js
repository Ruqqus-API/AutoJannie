const Ruqqus = require("ruqqus-js");

const client = new Ruqqus.Client();

require('dotenv').config()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.login({
  id: "CLIENT_ID",
  token: "CLIENT_SECRET",
  code: "AUTHCODE"
});