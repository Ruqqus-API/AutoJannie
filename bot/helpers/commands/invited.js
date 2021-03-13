const { command_prefix, maintainer } = require('../../config.json')
const { getConfig } = require('../config')

module.exports = {
	name: 'invited',
	description: 'Checks for GM invite',
	usage: `${command_prefix} invited`,
	aliases: ['i', 'check'],
	async execute({ client, faunaClient, comment, redisClient }) {

		const config = await getConfig(comment.guild.name, redisClient, faunaClient).catch(e => {
			console.log(err)
			comment.reply(`Sorry, something went wrong. Please contact ${maintainer}`)
		})

		const guildmasters = config.data.guildmasters

		if (!guildmasters.some(gm => gm.username === comment.author.username)) {
			comment.reply(`You are not the guildmaster of +${comment.guild.name}, you can't set up an Automod for this guild!`)
			return
		}

		const res = await client.APIRequest({ type: "POST", path: `accept_invite/${config.data.guild_id}` })
			.catch(() => {
				comment.reply(`Sorry, couldn't save config to the database. I'm not the guildmaster of this guild. Invite me as guildmaster and then comment \`${require('../config.json').command_prefix} invited\` under this post. This should activate the Automoderator`)
				return
			})
			comment.reply(`Config successfully saved to the database! Automoderator is now active`)
	}
}
