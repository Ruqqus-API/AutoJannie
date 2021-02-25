const yaml = require('js-yaml');

var faunadb = require('faunadb');
const { Create, Collection, If, Let, Exists, Update, Match, Index, Var, Select } = faunadb.query

module.exports = {
	async execute(passOn, post) {

		const { client, faunaClient, redisClient } = passOn

		const guild = await client.guilds.fetch(post.guild.name)

		const guildmasters = guild.guildmasters

		if (!guildmasters.some(gm => gm.username === post.author.username)) {
			post.comment(`You are not the guildmaster of +${guild.name}, you can't set up an Automod for this guild!`)
			return
		}


		var postText = post.content.body.text

		if (postText.startsWith("```") && postText.endsWith("```")) {
			postText = postText.slice(3, -3)
		}
		const rules = yaml.loadAll(postText);

		const config = {
			name: post.guild.name,
			guildmasters: post.guild.guildmasters,
			rules: rules
		}

		redisClient.set(`${post.guild.name}_config`, JSON.stringify(config))
		redisClient.set(`${post.guild.name}_config_exists`, 'true')

		faunaClient.query(

			Let(
				{
					match: Match(Index('guild_by_name'), post.guild.name),
					data: {
						data: {
							name: post.guild.name,
							guildmasters: post.guild.guildmasters,
							rules: rules
						}
					}
				},

				If(
					// Check if the config for the guild already exists in the db
					Exists(
						Var('match')
					),

					// If it does, update it
					Update(
						Select('ref', Var('match')),
						Var('data')
					),

					// If not, add it to the db
					Create(
						Collection('guilds'),
						Var('data')

					)
				)
			)
		)
			.then(res => {
				post.comment(`Config successfully saved to the database! Automoderator is now active`)
			})
			.catch(err => {
				post.comment(`Something went wrong, please contact @movie`)
				console.log(err)
			})
	}
}