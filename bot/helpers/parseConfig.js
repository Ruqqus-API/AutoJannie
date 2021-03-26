const yaml = require('js-yaml');

const { app_name, maintainer } = require('../config.json')

var faunadb = require('faunadb');
const { Create, Collection, If, Let, Exists, Update, Match, Index, Var, Select, Get } = faunadb.query

module.exports = {
	async execute(passOn, post) {

		const { client, faunaClient, redisClient, contex, comment } = passOn

		const guild = await client.guilds.fetch(post.guild.name)

		const guildmasters = guild.guildmasters

		if (!guildmasters.some(gm => gm.username === post.author.username)) {
			post.comment(`You are not the guildmaster of +${guild.name}, you can't set up an Automod for this guild!`)
			return
		}

		if (!guildmasters.some(gm => gm.username === client.user.username)) {
			const res = await client.APIRequest({ type: "POST", path: `accept_invite/${post.guild.id}` })
				.catch(() => {
					post.comment(`Sorry, couldn't save config to the database. I'm not the guildmaster of this guild. Invite me as guildmaster and then comment \`${require('../config.json').command_prefix} invited\` under this post. This should activate the Automoderator`)
				})
			if (res.length > 1) return
		}

		let postText = post.content.body.text

		if (postText.startsWith("```") && postText.endsWith("```")) {
			postText = postText.slice(3, -3)
		}
		let rules = {}
		try {
			rules = yaml.loadAll(postText);
		} catch (error) {
			post.comment(`
Wizard config could not be saved in the database. Invalid syntax: 
\`\`\`  

${error}  

\`\`\`  

Please consult with \`${app_name}\` [documentation](https://github.com/Ruqqus-API/AutoJannie) and make sure to [validate](http://www.yamllint.com) your config file`)
			return
		}

		const valid_actions = ['action', 'message', 'gm_notification']

		let rules_vue = []

		rules.forEach(r => {
			let conditions = {}
			let actions = {}
			for (c in r) {
				if (valid_actions.includes(c)) {
					actions[c] = r[c]
				} else {
					conditions[c] = r[c]
				}
			}
			rules_vue.push({ conditions, actions })
		})


		const config = {
			name: post.guild.name,
			config_post_id: post.id,
			guildmasters: guildmasters,
			guild_id: guild.id,
			rules_yaml: postText,
			rules: rules,
			rules_vue: rules_vue
		}

		redisClient.set(`${post.guild.name}_config`, JSON.stringify(config))
		redisClient.set(`${post.guild.name}_config_exists`, 'true')

		faunaClient.query(

			Let(
				{
					match: Match(Index('guild_by_name'), post.guild.name),
					data: {
						data: config
					}
				},

				If(
					// Check if the config for the guild already exists in the db
					Exists(
						Var('match')
					),

					// If it does, update it
					Update(Select('ref', Get(Var('match'))), Var('data')),


					// If not, add it to the db
					Create(
						Collection('guilds'),
						Var('data')

					)
				)
			)
		)
			.then(() => {
				let message = 'Config successfully saved to the database! Automoderator is now active'
				if (typeof context !== 'undefined' && context == 'invite') {
					comment.reply(message)
				}
				else {
					post.comment(message)
				}

			})
			.catch(err => {
				post.comment(`Something went wrong, please contact ${maintainer}`)
				console.log(err)
			})
	}
}