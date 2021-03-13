//for keeping track of which step is the user at
export default {
	state: () => ({
		step: 1,
	}),
	mutations: {
		nextStep (state) {
			state.step ++;
		},
		previousStep (state) {
			state.step --;
		},
	},
};
