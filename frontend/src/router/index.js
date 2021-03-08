import Vue from 'vue'
import VueRouter from 'vue-router'
import qs from 'qs';
//import store from "@/store";

// Components

// Dashboard
import DashboardView from "@/views/Dashboard.vue"

// Guild
import GuildView from "@/views/Guild/Guild.vue"
import GuildOverviewView from "@/views/Guild/Overview.vue";
import GuildRulesView from "@/views/Guild/Rules.vue";
import GuildSettingsView from "@/views/Guild/Settings.vue";

import RuleEditorView from "@/views/Guild/RuleEditor/Editor.vue";
import RuleEditorFirstStep from "@/views/Guild/RuleEditor/FirstStep.vue";
import RuleEditorSecondStep from "@/views/Guild/RuleEditor/SecondStep.vue";
import RuleEditorThirdStep from "@/views/Guild/RuleEditor/ThirdStep.vue";
import RuleEditorFourthStep from "@/views/Guild/RuleEditor/FourthStep.vue";

// User

Vue.use(VueRouter)

const routes = [

  // Home View
  { path: '/', name: 'home-view', component: DashboardView, props: true },

  // Guild View
  // { path: '/+:guild', alias: '/+:guild/moderation', name: 'guild-moderation-view', component: GuildModerationView },
  // { path: '/+:guild/settings', name: 'guild-settings-view', component: GuildSettingsView }

  //{ path: '/+:guild/rules/create', name: 'create-rule-view', component: RuleEditorView },
  { path: '/+:guild/rules/edit', name: 'edit-rule-view', component: RuleEditorView },

  {
    path: '/+:guild', component: GuildView, props: true,
    children: [
    { path: '', name: 'guild-overview-view', component: GuildOverviewView },
    { path: '/+:guild/overview', name: 'guild-overview-view', component: GuildOverviewView },
    { path: '/+:guild/rules', component: GuildRulesView,
    children: [
    { path: '/+:guild/rules/:sort?', name: 'guild-rules-view', component: GuildRulesView }
    ]
  },
  { path: '/+:guild/configuration', name: 'guild-settings-view', component: GuildSettingsView }
    //{ path: '/+:guild/settings', component: GuildSettingsView, name: 'guild-settings-view', props: true,
    ]
  },

  {
    path: '/+:guild/rules/create', alias: '/+:guild/rules/edit', component: RuleEditorView,
    children: [
    { path: '/+:guild/rules/create/trigger', alias: '/+:guild/rules/create/1', component: RuleEditorFirstStep, name: 'rule-editor-first-step', props: { currentStep: 1 } },
    { path: '/+:guild/rules/create/filters', alias: '/+:guild/rules/create/2', component: RuleEditorSecondStep, name: 'rule-editor-second-step', props: { currentStep: 2 } },
    { path: '/+:guild/rules/create/actions', alias: '/+:guild/rules/create/3', component: RuleEditorThirdStep, name: 'rule-editor-third-step', props: { currentStep: 3 } },
    { path: '/+:guild/rules/create/confirm', alias: '/+:guild/rules/create/4', component: RuleEditorFourthStep, name: 'rule-editor-fourth-step', props: { currentStep: 4 } }
    ]
  }

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
