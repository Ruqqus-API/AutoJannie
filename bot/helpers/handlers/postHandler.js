const log = console.log

var faunadb = require('faunadb')
const { Get, Match, Index } = faunadb.query

const config = require('../../config.json')
module.exports = {
	async execute(client, faunaClient, post) {
		
		if (post.content.title == config.config_title) {
			log("NEW CONFIG POST")
			require('../parseConfig').execute(client, faunaClient, post)
		}

		try {
			const guildConfig = await faunaClient.query(Get(Match(Index("guild_by_name"), post.guild.name)))
			require('../takeAction').execute(client, faunaClient, post, guildConfig)

		} catch (error) {
			if (error.requestResult.statusCode == 404) return
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
