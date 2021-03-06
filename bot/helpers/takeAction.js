const { calculatePassedTime } = require('../helpers/datemath')

module.exports = {
	async execute({ client, faunaClient, redisClient }, submission, config) {
		const s = submission

		var author = await client.users.fetch(s.author.username)

		console.log(s.content.title)

		const t = getType(s)
		const types = ['text', 'link', 'comment']
		const submission_type = ['text', 'link']
		const not_needed = ['message', 'action', 'gm_notification']

		var rules = config.data.rules


		const actions = {
			kick: () => {
				if (t == 'comment') return { error: 'Can\'t kick a comment!' }
				client.APIRequest({ type: "POST", path: `kick/${s.guild.id}/${s.id}` })
				return true

			},

			exile: () => {
				client.APIRequest({ type: "POST", path: `exile/${s.guild.id}/${s.guild.id}?user=${author.username}&thing=${s.full_id}` })
				return true
			},

			pin: () => {
				// TODO
			},

			toggle_nsfw: (s) => {
				if (t == 'comment') return { error: 'Can\'t toggle NSFW on a comment!' }
				client.APIRequest({ type: "POST", path: `toggle_post_nsfw/${s.id}` })
				return true
			},

			toggle_nsfl: (s) => {
				if (t == 'comment') return { error: 'Can\'t toggle NSFW a comment!' }
				client.APIRequest({ type: "POST", path: `toggle_post_nsfl/${s.id}` })
				return true
			}

		}

		const author_handler = {

			or: ({ c, save, r, s }) => ororand(check, author_handler, { c, save, r, s }).some(v => v === true),

			and: ({ c, save, r, s }) => ororand(check, author_handler, { c, save, r, s }).push(res.every(v => v === true)),

			is_contributor: () => {
				// TODO
			},

			is_guildmaster: () => config.data.guildmasters.some(gm => gm.username === author.username),

			comment_rep: ({ r, c, s, check }) => user_rep_calc(r[c][check], author.stats.comment_rep),

			post_rep: ({ r, c, s, check }) => user_rep_calc(r[c][check], author.stats.post_rep),

			rep: ({ r, c, s, check }) => user_rep_calc(r[c][check], author.stats.post_rep + author.stats.comment_rep),

			account_age: ({ r, c, check }) => {
				let v = r[c][check]
				let reg = /([<>]) (\d+) (second|minute|hour|day|week|month|year)/g

				let matches = reg.exec(v);

				const time_needed = calculatePassedTime(matches[2], matches[3])

				if (matches[1] == '<') {
					return (Date.now() / 1000 - author.created_at < time_needed)

				} else if (matches[1] == '>') {
					return (Date.now() / 1000 - author.created_at >= time_needed)

				} else {
					return false
				}

			}
		}


		const handlers = {

			or: ({ c, save, r, s }) => ororand(c, handlers, { c, save, r, s }).some(v => v === true),

			and: ({ c, save, r, s }) => ororand(c, handlers, { c, save, r, s }).every(v => v === true),

			author: ({ c, save, r }) => {
				let val = []
				for (check in r[c]) {
					val.push(author_handler[check]({ s, t, c, save, check, r }))
				}
				return val.every(v => v == true)
			},

			action: ({ c, save, r }) => {
				if (!all_executed(save, not_needed)) return false
				return actions[r[c]]()
			},

			message: ({ c, save, r }) => {
				if (!all_executed(save, not_needed)) return false
				if (t == 'comment') {
					s.reply(r[c])
				} else {
					s.comment(r[c])
				}
				return true
			},

			title: ({ c, r, s }) => {
				if (!is_submission(t, submission_type)) return false
				if (r[c] == s.content.title) {
					return true
				} else {
					return false
				}
			},

			'title-includes': ({ c, r, s }) => {
				if (!is_submission(t, submission_type)) return false
				if (Array.isArray(r[c])) {
					return r[c].some(e => (s.content.title).includes(e))
				} else {
					return (s.content.title).includes(r[c])
				}
			},

			text: ({ c, r, s }) => {
				if (!is_submission(t, submission_type)) return false
				if (r[c] == s.content.body.text) {
					return true
				} else {
					return false
				}
			},

			'text-includes': ({ c, r, s }) => {
				if (!is_submission(t, submission_type)) return false
				if (Array.isArray(r[c])) {
					return r[c].some(e => (s.content.body.text).includes(e))
				} else {
					return (s.content.body.text).includes(r[c])
				}
			}
		}


		rules.forEach(r => {
			if (r.type == t) {
				var save = {}
				for (c in r) {
					if (!handlers.hasOwnProperty(c)) continue
					save[c] = handlers[c]({ c, save, r, s })
				}
				console.log(save)
			}

		})


		function ororand(obj, handler, pass) {
			let val = []

			for (conf in obj) {
				const res = handler[conf](pass)
				re.push(res)
			}
			return val
		}

		function all_executed(save, not_needed) {
			var n = []
			for (i in save) {
				if (not_needed.includes(i)) continue
				n.push(save[i])
			}
			return n.every(v => v == true)
		}

		function user_rep_calc(rep, compare) {
			let reg = /([<>]) (\d+)/g
		
			let matches = reg.exec(rep);
		
			if (matches[1] == '<') {
				return (compare < parseInt(matches[2]))
		
			} else if (matches[1] == '>') {
				return (compare >= parseInt(matches[2]))
		
			} else {
				return false
			}
		}
	}
}

const is_submission = (type, st) => st.includes(type)

function getType(submission) {
	if (submission.content.domain == 'text post') return 'text'
	if (submission.content.domain !== 'text post') return 'link'
	if (submission.full_id.startsWith('t3')) return 'comment'
}

