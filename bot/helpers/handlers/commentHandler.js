const { command_prefix } = require('../../config.json')
const { getCommands, hasCommand } = require('../commands')

module.exports = {
	execute(passOn, comment) {
		const commentText = comment.content.text

		if (commentText.startsWith(command_prefix)) {
			
			const content = commentText.substring(command_prefix.length + 1, commentText.length)

			const args = content.trim().split(/ +/);

			const commands = getCommands()
			const command = args.shift().toLowerCase();

			hasCommand(commands, command)
				.then(c => {
					c.command.execute({...passOn, content, args, comment, commentText})
				})
				.catch(err => {
					console.log(err)
				})

		}
	}
}