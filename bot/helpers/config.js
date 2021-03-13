var faunadb = require('faunadb')

const { Exists, Match, Index, Get } = faunadb.query

function getConfig(guild_name, redisClient, faunaClient) {
	return new Promise(async (resolve, reject) => {
		try {
			let config
			redisClient.get(`${guild_name}_config`, (err, res) => config = JSON.parse(res))
			if (config == null) {
				var config_exists
				redisClient.get(`${guild_name}_config_exists`, (err, res) => config_exists = res)
				if (Boolean(config_exists)) {
					config = await faunaClient.query(Get(Match(Index("guild_by_name"), guild_name))).catch(err => reject(err))
					redisClient.set(`${guild_name}_config`, JSON.stringify(config))
					resolve(config)
				} else {
					config_exists = await faunaClient.query(Exists(Match(Index('guild_by_name'), guild_name))).catch(err => reject(err))
					redisClient.set(`${guild_name}_config_exists`, config_exists)

					if (Boolean(config_exists)) {
						config = await faunaClient.query(Get(Match(Index("guild_by_name"), guild_name))).catch(err => reject(err))
						redisClient.set(`${guild_name}_config`, JSON.stringify(config))
						resolve(config)
					} else {
						resolve(false)
					}
				}
			}
			resolve(config)

		} catch (error) {
			reject(error)
		}

	})
}

module.exports = { getConfig }