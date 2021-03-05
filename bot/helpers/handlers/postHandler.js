const log = console.log

var faunadb = require('faunadb')

const { Exists, Match, Index, Get } = faunadb.query
const configJson = require('../../config.json')

module.exports = {
	async execute(passOn, post) {

		const { client, faunaClient, redisClient } = passOn

		if (post.content.title == configJson.config_title) {
			log("NEW CONFIG POST")
			require('../parseConfig').execute(passOn, post)
		}

		try {
			var config
			redisClient.get(`${post.guild.name}_config`, (err, res) => config = JSON.parse(res))
			if (config == null) {
				var config_exists
				redisClient.get(`${post.guild.name}_config_exists`, (err, res) => config_exists = res)
				if (Boolean(config_exists)) {
					config = await faunaClient.query(Get(Match(Index("guild_by_name"), post.guild.name))).catch(err => console.log(err))
					redisClient.set(`${post.guild.name}_config`, JSON.stringify(config))
					require('../takeAction').execute(passOn, post, config)
				} else {
					config_exists = await faunaClient.query(Exists(Match(Index('guild_by_name'), post.guild.name))).catch(err => console.log(err))
					redisClient.set(`${post.guild.name}_config_exists`, config_exists)

					if (Boolean(config_exists)) {
						config = await faunaClient.query(Get(Match(Index("guild_by_name"), post.guild.name))).catch(err => console.log(err))
						redisClient.set(`${post.guild.name}_config`, JSON.stringify(config))
						require('../takeAction').execute(passOn, post, config)
					}
				}
			}
			

		} catch (error) {
			log(error)
		}
	}
}

/**
 * Flow
 * check if the post is automod config file
 * if it is add it to the db
 *
 * check if the guild has automod config
 * if it does proceed with logic
 * if not ignore the post
 */
