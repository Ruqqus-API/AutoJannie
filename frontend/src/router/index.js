import Vue from 'vue'
import VueRouter from 'vue-router'
import qs from 'qs';
//import store from "@/store";

// Components

// Dashboard
import DashboardView from "@/views/Dashboard.vue"

// Guild
import GuildModerationView from "@/views/Guild/Moderation.vue";
import GuildSettingsView from "@/views/Guild/Settings.vue";

// User

Vue.use(VueRouter)

const routes = [

  // Home View
  { path: '/', name: 'home-view', component: DashboardView, props: true },

  // Guild View
  { path: '/+:guild', alias: '/+:guild/moderation', name: 'guild-moderation-view', component: GuildModerationView },
  { path: '/+:guild/settings', name: 'guild-settings-view', component: GuildSettingsView }

  // {
  //   path: '/+:guild', component: GuildView, props: true,
  //   children: [
  //   { path: '/+guild', alias: '/+:guild/moderation', name: 'guild-moderation-view', component: GuildSettings,
  //   //{ path: '/+:guild/settings', component: GuildSettingsView, name: 'guild-settings-view', props: true,
  //   ]
  // }

  ]

  const router = new VueRouter({
    mode: 'history',
    scrollBehavior: function(to) {
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: 'smooth'
        }
      } else {
        return { x: 0, y: 0 }
      }
    },
    parseQuery(query) {
      return qs.parse(query);
    },
    stringifyQuery  : query => {
      let result = qs.stringify(query, { format: 'RFC1738' })
      return result ? ('?' + result) : ''
    },
    routes
  })

  export default router
