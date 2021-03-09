const { calculatePassedTime } = require('../helpers/datemath')
const psl = require('psl')

module.exports = {
	async execute({ client, faunaClient, redisClient }, submission, config) {

		const s = submission
		if(s.content.title && s.content.title == require('../config.json').config_title) return

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

			or: ({ save, r }) => ororand(r, author_handler, { save }).some(v => v === true),

			and: ({ save, r }) => ororand(r, author_handler, { c, save, r, s }).push(res.every(v => v === true)),

			is_contributor: () => {
				// TODO
			},

			is_guildmaster: ({ r }) => config.data.guildmasters.some(gm => gm.username === author.username) == Boolean(r),

			comment_rep: ({ r }) => user_rep_calc(r, author.stats.comment_rep),

			post_rep: ({ r }) => user_rep_calc(r, author.stats.post_rep),

			rep: ({ r }) => user_rep_calc(r, author.stats.post_rep + author.stats.comment_rep),

			account_age: ({ r }) => {
				let v = r
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

			or: ({ save, r }) => ororand(r, handlers, { save }).some(v => v === true),

			and: ({ save, r }) => ororand(r, handlers, { save }).every(v => v === true),

			author: ({ save, r }) => {
				let val = []
				for (c in r) {
					val.push(author_handler[c]({ save, r: r[c] }))
				}
				return val.every(v => v == true)
			},

			action: ({ save, r }) => {
				if (!all_executed(save, not_needed)) return false
				return actions[r]()
			},

			message: ({ save, r }) => {
				if (!all_executed(save, not_needed)) return false
				if (t == 'comment') {
					s.reply(replace_placeholders(r))
				} else {
					s.comment(replace_placeholders(r))
				}
				return true
			},

			title: ({ r }) => {
				if (!is_submission(t, submission_type)) return false
				return exact(r, s.content.title)
			},

			'title-includes': ({ r }) => {
				if (!is_submission(t, submission_type)) return false
				return includes(r, s.content.title)
			},

			text: ({ r }) => {
				if (!is_submission(t, submission_type)) return false
				return exact(r, s.content.body.text)
			},

			'text-includes': ({ r }) => {
				if (!is_submission(t, submission_type)) return false
				return includes(r, s.content.body.text)
			},

			domain: ({ r }) => {
				if (t != 'link') return false
				const d = psl.parse(s.domain)
				if (Array.isArray(r)) {
					return r.some(e => e == d.domain)
				} else {
					return r == d.domain
				}
			},
			'~domain': (d) => !domain(d)
		}


		rules.forEach(r => {
			if (r.type == t) {
				var save = {}
				for (c in r) {
					if (!handlers.hasOwnProperty(c)) continue
					save[c] = handlers[c]({ r: r[c], save })
				}
				console.log(save)
			}

		})

		function ororand(r, handler, { save }) {
			let val = []

			for (c in r) {
				const res = handler[c]({ r: r[c], save })
				val.push(res)
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

		function exact(check, str) {
			if (Array.isArray(check)) {
				return check.some(e => str == e)
			} else {
				return str == check
			}
		}

		function includes(check, str) {
			if (Array.isArray(check)) {
				return check.some(e => str.includes(e))
			} else {
				return str.includes(check)
			}
		}

		function replace_placeholders(m) {

			const replacements = {
				'{{author}}': s.author.username,
				'{{body}}': t == 'comment' ? s.content.text : s.content.body.text,
				'{{permalink}}': s.link,
				'{{guild}}': `+${s.guild.name}`,
				'{{kind}}': t == 'comment' ? t : `${t} submission`,
				'{{title}}': s.content.title,
				'{{domain}}': s.content.domain,
				'{{url}}': s.full_link
			}
			for (r in replacements) {
				if (m.indexOf(r) != -1) {
					m = m.replace(r, replacements[r])
				}
			}

			return m
		}
	}
}

const is_submission = (type, st) => st.includes(type)

function getType(submission) {
	if (submission.content.domain == 'text post') return 'text'
	if (submission.content.domain !== 'text post') return 'link'
	if (submission.full_id.startsWith('t3')) return 'comment'
}

