const needle = require('needle')

var faunadb = require('faunadb');
const { Map, Collection, Paginate, Documents, Lambda, Get } = faunadb.query


function fetchConfigs(redisClient, faunaClient) {
	faunaClient.query(
		Map(
			Paginate(Documents(Collection('guilds'))),
			Lambda(x => Get(x))
		)
	).then(res => {
		res.data.forEach(config => {
			redisClient.set(`${config.data.name}_config`, JSON.stringify(config))
			redisClient.set(`${config.data.name}_config_exists`, 'true')
		})
	}).catch(err => {
		console.log(err)
		throw err
	})
}


function loadImageHosts() {
	needle.get('https://ruqqus.com/info/image_hosts', (err, res) => {
		let data = (res.body).split('\n')
		redisClient.set("image_hosts", JSON.stringify(data))
	})
}


module.exports = { loadImageHosts, fetchConfigs }