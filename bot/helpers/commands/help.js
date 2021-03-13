const { getCommands, hasCommand } = require('../../helpers/commands');
const { command_prefix, app_name } = require('../../config.json')

module.exports = {
	name: 'help',
	description: `Help utility for ${app_name}`,
	usage: command_prefix + ' help [Command]',
	aliases: ['h'],
	execute(passOn, content, args, comment) {

		if (args.length == 0) {
			const commands = getCommands()
			let message = '<h6>List of all comands:</h6> <hr>'
			commands.forEach(c => {
				if (c.command.owner) return
				message = message.concat(`• ${c.command.name}<br>`)
			})
			message = message.concat(`<br><hr>Run <code>${command_prefix} help command_name</code> to get help on specific command`)
			comment.reply(message)

		} else {
			const command = args[0]
			const commands = getCommands()

			hasCommand(commands, command).then(c => {
				if (c.command.owner) return
				let message = `Command <code>${command}</code> details: <hr>• Description: ${c.command.description} <br>• Usage: <code>${c.command.usage}</code> <br>`
				if (c.command.aliases !== 'undefined' && c.command.aliases.length !== 0) {
					message = message.concat(`• Aliases: `)
					c.command.aliases.forEach(a => {
						message = message.concat(`<code>${a}</code>, `)
					})
					message = message.slice(0, -2)
				}
				comment.reply(message)
			})
		}
	}
}
