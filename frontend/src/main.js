import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from '../node_modules/vuex'
import store from "./store/index.js"
import vuescroll from "../node_modules/vuescroll"
import VueTailwind from "vue-tailwind"

// import FontAwesome
import "./assets/fontawesome/css/all.css";

import "vuescroll/dist/vuescroll.css";

// import custom style
import "../node_modules/tailwindcss/tailwind.css"
import "./assets/css/style.css";

import settings from './settings';

Vue.use(VueTailwind, settings);

// Vuescroll
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  },
  name: 'vue-scroll' // customize component name, default -> vueScroll
});

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
