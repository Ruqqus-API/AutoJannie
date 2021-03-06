import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index.js"
import axios from "../node_modules/axios"
import vuescroll from "../node_modules/vuescroll"
import VueTailwind from "vue-tailwind"

// import FontAwesome
import "./assets/fontawesome/css/all.css";

import "vuescroll/dist/vuescroll.css";

// import custom style
import "../node_modules/tailwindcss/tailwind.css"
import "./assets/css/style.css";

import settings from './settings';

// Import VueSession from 'vue-session'
Vue.prototype.$http = axios

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

//Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
