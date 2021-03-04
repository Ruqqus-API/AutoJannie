<template>
  <div class="max-w-7xl mx-auto flex flex-grow h-full bg-white dark:bg-gray-900">

    <!-- Header content section -->
    <div class="hidden w-full px-6 h-20 flex-shrink-0 bg-white border-b">
      <div class="grid grid-cols-12 h-full">
        <div class="col-span-6 flex flex-col justify-between">
          <div class="flex items-center space-x-3 mt-3">
            <h1 class="text-2xl mb-0 leading-tight">Rules</h1>
          </div>
          <!-- Tabs -->
          <div class="flex flex-shrink-0 w-full items-end">
            <router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
              <a :href="href" @click="navigate" class="group">
                <div class="border-b-2 px-3 pb-2 capitalize font-medium" :class="isExactActive ? 'text-gray-900 border-purple-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
                  {{ tab.name }}
                  <span v-if="tab.badge" class="ml-1 px-2 py-0.5 rounded-full bg-white border text-sm text-gray-500 font-normal">
                    {{ tab.badge.count }}
                  </span>
                </div>
              </a>
            </router-link>
          </div>
        </div>
        <div class="col-span-6">
          <div class="flex h-full items-center justify-end space-x-6">
            <div class="flex items-center space-x-6">
              <div class="text-sm text-gray-500">1-20 of 40<i class="fas fa-chevron-right pl-2"></i></div>
              <div class="flex items-center">
                <div class="flex items-center justify-center -space-x-7">
                  <i class="fas fa-search fa-fw text-gray-400 z-10"></i>
                  <t-input placeholder="Filter rules" variant="primary" :fixedClasses="'block w-full pl-9 pr-3 py-2 transition duration-100 ease-in-out border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'"/>
                </div>
                <div class="flex flex-shrink-0 items-center space-x-3 hidden">
                  <button class="flex items-center rounded-sm text-sm font-medium bg-purple-500 border border-transparent text-white px-4 py-2">
                    <i class="fas fa-pen fa-sm pr-2"></i>Create new rule
                  </button>
                  <button class="flex items-center rounded-sm text-sm font-medium bg-white border text-gray-700 px-4 py-2">
                    <i class="fas fa-pause-circle fa-sm pr-2"></i>Pause all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:flex items-center flex-col flex-shrink-0 w-80 bg-white border-r dark:bg-gray-750 dark:border-white-13">
      <div class="px-6 py-4 w-full space-y-4">
        <SelectGuild/>
        <div class="relative flex items-center justify-center pt-4 border-t">
          <i class="absolute left-3 fas fa-search fa-fw text-gray-400 z-0"></i>
          <t-input placeholder="Filter rules" variant="primary" :fixedClasses="'block w-full pl-9 pr-3 py-2 transition duration-100 ease-in-out border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'"/>
        </div>
        <div>
          <router-link v-slot="{ href, navigate, isExactActive }" v-for="tab in tabs" :key="tab.id" :to="tab.route">
            <a :href="href" @click="navigate" class="block py-2 text-left transition duration-100" :class="isExactActive ? 'text-purple-500' : 'text-gray-500 hover:text-gray-600'">
              <span class="flex items-center justify-between">
                <span class="font-medium capitalize">{{ tab.name }}</span>
                <span v-if="tab.badge" class="ml-1 px-3 py-0.5 rounded-full border text-sm font-normal" :class="isExactActive ? 'text-purple-500 bg-purple-100 border-transparent' : 'text-gray-500 bg-white'">
                  {{ tab.badge.count }}
                </span>
              </span>
            </a>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main content section -->
    <vue-scroll>
      <div>
        <div class="grid grid-cols-12 p-4">
          <div class="col-start-1 col-end-12 lg:col-start-2">
            <div class="text-2xl font-medium mb-5">Active Rules</div>
            <div class="flex items-center space-x-2 mb-5">
              <div class="flex items-center bg-white border rounded h-9">
                <div class="flex items-center justify-center w-9">
                  <t-checkbox/>
                </div>
                <div class="flex items-center justify-center w-9 border-l">
                  <t-dropdown text="Menu" :classes="{ dropdown: 'w-40 origin-top-left -left-2 top-1 bg-white py-2' }">
                    <!-- Trigger -->
                    <div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
                      <button class="p-2 leading-tight text-gray-500 hover:text-gray-600 dark:text-gray-200" id="comment-options-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler" @click.prevent>
                        <i class="fas fa-chevron-down fa-sm"></i>
                      </button>
                    </div>
                    <!-- Menu -->
                    <div slot-scope="{ hide, blurHandler }">
                      <div class="text-2xs font-bold uppercase tracking-wide text-gray-500 px-4 py-2">Bulk actions</div>
                      <router-link :to="`/+${$route.params.guild}/rules/edit`" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
                        <i class="fas fa-sun fa-sm fa-fw mr-2"></i><span>Turn on</span>
                      </router-link>
                      <router-link to="#" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="blurHandler">
                        <i class="fas fa-moon fa-sm fa-fw mr-2"></i><span>Turn off</span>
                      </router-link>
                      <hr>
                      <router-link to="#" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
                        <i class="fas fa-trash-alt fa-sm fa-fw mr-2"></i><span>Trash</span>
                      </router-link>
                    </div>
                  </t-dropdown>
                </div>
              </div>
              <t-button variant="gray200" disabled>Trash</t-button>
              <t-button :to="{ name: 'create-rule-view', params: { guild: this.$route.params.guild }}" variant="purple500">
                Create new rule
              </t-button>
            </div>
            <div class="space-y-3">
              <Rule v-for="rule in rules" :key="rule.id" :rule="rule"/>
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>

  </div>
</template>

<script>
// import component
import Rule from "@/components/Rule.vue"
import SelectGuild from "@/components/Select/SelectGuild.vue"

export default {
  name: "GuildRules",
  components: {
    SelectGuild,
    Rule
  },
  data() {
    return {
      rules: [
      {
        id: 1,
        type: 'link',
        conditionsCount: 2,
        name: 'Kick post if brand new account and less than 100 post rep',
      },
      {
        id: 2,
        type: 'text',
        conditionsCount: 1,
        name: 'Kick post if text post contains slurs',
      }
      ],
      tabs: [
      {
        name: "active",
        route: {
          name: 'guild-rules-view',
          params: { sort: 'active' },
        },
        badge: {
          count: 10
        }
      },
      {
        name: "inactive",
        route: {
          name: 'guild-rules-view',
          params: { sort: 'inactive' },
          badge: {
            count: 1
          }
        }
      },
      {
        name: "reports",
        route: {
          name: 'guild-rules-reports'
        }
      },
      ]
    }
  },
  computed: {
  }
}
</script>
