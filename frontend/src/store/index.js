import Vue from 'vue';
import Vuex from 'vuex';

import triggers from './triggers';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        triggers,
    },
});

Vue.prototype.$store = store;

export default store;
