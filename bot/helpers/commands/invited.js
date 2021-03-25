const { command_prefix, maintainer } = require('../../config.json')
const { getConfig } = require('../config')

module.exports = {
	name: 'invited',
	description: 'Checks for GM invite',
	usage: `${command_prefix} invited`,
	aliases: ['i', 'check', 'update'],
	async execute({ client, faunaClient, comment, redisClient }) {
		let post = await client.posts.fetch(comment.post.id)

		require('../parseConfig').execute({client, faunaClient, redisClient, context: 'invite', comment}, post)
	}
}
