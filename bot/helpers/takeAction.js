module.exports = {
	execute({ client, faunaClient, redisClient }, submission, config) {

		const s = submission

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
				client.APIRequest({ type: "POST", path: `exile/${s.guild.id}/${s.guild.id}?user=${s.author.username}&thing=${s.full_id}` })
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

			is_guildmaster: () => config.data.guildmasters.some(gm => gm.username === s.author.username),

			comment_rep: (c) => {

			},

			account_age: (c) => {

			}
		}


		const handlers = {

			or: ({ c, save, r, s }) => ororand(c, handlers, { c, save, r, s }).some(v => v === true),

			and: ({ c, save, r, s }) => ororand(c, handlers, { c, save, r, s }).every(v => v === true),

			author: ({ c, save }) => {
				let val = []
				for (check in c) {
					val.push(author_handler[check]({ s, t, c, save, check }))
				}
				return val.every(v => v === true)
			},

			action: ({ c, save, r }) => {
				console.log("ACTION BLOCK")
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
					return r[c].some(e => e.includes(s.content.title))
				} else {
					return r[c].includes(s.content.title)
				}
			},

		}


		rules.forEach(r => {
			if (r.type == t) {
				var save = {}
				for (c in r) {
					if (!handlers.hasOwnProperty(c)) continue
					save[c] = handlers[c]({ c, save, r, s })
				}
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
			if (!n.every(v => v == true)) {
				return false
			}
			return true
		}
	}
}

const is_submission = (type, st) => st.includes(type)

function getType(submission) {
	if (submission.content.domain == 'text post') return 'text'
	if (submission.content.domain !== 'text post') return 'link'
	if (submission.full_id.startsWith('t3')) return 'comment'
}

