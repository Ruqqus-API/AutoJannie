const fs = require('fs')

function getCommands() {
	var commands = []
	const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(__dirname + `/commands/${file}`);
		commands.push({ command });
	}

	return commands
}

function hasCommand(commands, command) {
	return new Promise((resolve, reject) => {
		commands.forEach(c => {

			if (c.command.aliases) {
				c.command.aliases.forEach(alias => {
					if (command == alias) {
						resolve(c)
					}
				})
			}
			if (c.command.name == command) {
				resolve(c)
			}

		})
		reject(command)
	})
}


module.exports = { getCommands, hasCommand }