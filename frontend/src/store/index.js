import Vue from 'vue';
import Vuex from 'vuex';

import triggers from './triggers';
import steps from './steps';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        triggers,
        steps,
    },
});

Vue.prototype.$store = store;

export default store;
