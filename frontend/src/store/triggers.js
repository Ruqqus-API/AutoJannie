//store selected trigger
export default {
	state: () => ({
		picked: {
			//default value
			icon: 'fa-bolt',
			type: 'none',
			name: 'Select a trigger.',
		},
	}),
	mutations: {
		setPicked (state, payload) {
			state.picked = payload.trigger;
		},
	},
}
