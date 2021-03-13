const log = console.log

var faunadb = require('faunadb')

const { Exists, Match, Index, Get } = faunadb.query
const configJson = require('../../config.json')
const { getConfig } = require('../config')

module.exports = {
	async execute(passOn, post) {

		const { client, faunaClient, redisClient } = passOn

		if (post.content.title == configJson.config_title) {
			require('../parseConfig').execute(passOn, post)
			return
		}

		getConfig(post.guild.name, redisClient, faunaClient)
			.then(config => {
				if(!config) return
				require('../takeAction').execute(passOn, post, config)
			})
			.catch(err => {
				log(`postHandler: ${err}`)
			})
	}
}
