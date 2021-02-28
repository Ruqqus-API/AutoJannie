const faunadb = require('faunadb')
const { Get, Match, Index, Map, Paginate, Lambda, Var, Let, If, Exists, Update, Select, Create, Collection } = require('faunadb')

const client = new faunadb.Client({ secret: "fnAECxesB8ACBY3E8bmCIfpBYikntW5IwxRPPNPk" })

const getGuildById = (guild_id) => client.query(Get(Match(Index("guild_by_id"), guild_id)))
const getGuildByName = (guild_name) => client.query(Get(Match(Index("guild_by_name"), guild_name)))
const getGuildsByGm = (gm_name) => client.query(Map(Paginate(Match(Index("guilds_by_gm"), gm_name)), Lambda("X", Get(Var("X")))))

/**
 * 
 * @param {string} guild_name - Name of the guild 
 * @param {object} config 
 * 
 * config should have following data:
 * name: guild name
 * config_post_id: id of the config post (not needed if config created through web console)
 * guildmasters: array of guild guilmasters (User object)
 * guild_id: guild id
 * rules_yaml: rules in yaml format
 * rules: list of rules (Rule object)
 *  
 */

function saveConfig(guild_name, config) {
	client.query(Let(
		{
			match: Match(Index('guild_by_name'), guild_name),
			data: {
				data: config
			}
		},

		If(	// Check if the config for the guild already exists in the db
			Exists(Var('match')),

			// If it does, update it
			Update(Select('ref', Get(Var('match'))), Var('data')),

			// If not, add it to the db
			Create(Collection('guilds'),Var('data'))
		)
	))
		.then(res => {
			return {
				message: `Config successfully saved to the database! Automoderator is now active`,
				res
			}
		})
		.catch(err => {
			return {
				message: `Something went wrong, config failed to save!`,
				err
			}
		})
}

module.exports = { getGuildById, getGuildByName, getGuildsByGm, saveConfig }