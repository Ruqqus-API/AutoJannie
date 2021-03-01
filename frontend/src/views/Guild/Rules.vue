<template>
  <div class="flex flex-col flex-grow bg-white dark:bg-gray-900">

    <!-- Header content section -->
    <div class="w-full px-8 h-24 flex-shrink-0 border-b">
      <div class="grid grid-cols-12 h-full">
        <div class="col-span-6 flex flex-col justify-between">
          <div class="flex items-center space-x-3 mt-3">
            <h1 class="text-2xl mb-0">Rules</h1>
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

    <!-- Main content section -->
    <vue-scroll>
      <div>
        <div class="grid grid-cols-12 p-8">
          <div class="col-start-2 col-end-12">
            <div class="space-y-4">
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

export default {
  name: "GuildRules",
  components: {
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
