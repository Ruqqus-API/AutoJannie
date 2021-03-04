  <template>
    <nav class="fixed w-full bg-white border-b dark:bg-gray-800 z-50">
        <div class="mx-auto px-6">
            <div class="flex items-center justify-between h-12">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <router-link to="/" class="font-medium text-xl text-purple-500 tracking-wide">
                            <i class="fas fa-hat-wizard fa-sm pr-2"></i>
                        </router-link>
                    </div>
                </div>
                <div class="ml-3 rounded-full px-3 py-1 font-mono font-medium text-xs bg-yellow-100 text-yellow-700">
                    <i class="fas fa-pen fa-sm pr-2"></i>Rule Editor
                </div>
                <div class="select-none flex items-center space-x-4">
                    <div class="text-xs font-medium uppercase tracking-wide leading-tight w-14 text-center" :class="rule.active ? 'text-green-500' : 'text-gray-500'">
                        {{ rule.active ? 'Enabled' : 'Disabled'}}
                    </div>
                    <t-toggle variant="success" v-model="rule.active" @click.prevent/>
                </div>
                <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <button class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: menu

              Menu open: "hidden", Menu closed: "block"
          -->
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
            <!--
              Heroicon name: x

              Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</div>
</div>
</div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
  -->
  <div class="hidden md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-bold">Dashboard</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Team</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Projects</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Calendar</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Reports</a>
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
            <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="ml-3">
                <div class="text-base font-bold leading-none text-white">Tom Cook</div>
                <div class="text-sm font-bold leading-none text-gray-400">tom@example.com</div>
            </div>
            <button class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: bell -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </button>
        </div>
        <div class="mt-3 px-2 space-y-1">
            <a href="#" class="block px-3 py-2 rounded-md text-base font-bold text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</a>

            <a href="#" class="block px-3 py-2 rounded-md text-base font-bold text-gray-400 hover:text-white hover:bg-gray-700">Settings</a>

            <a href="#" class="block px-3 py-2 rounded-md text-base font-bold text-gray-400 hover:text-white hover:bg-gray-700">Sign out</a>
        </div>
    </div>
</div>
</nav>
</template>

<script>

    //import SelectGuild from "@/components/Select/SelectGuild.vue"
    export default {
        name: "Navbar",
        data() {
            return {
                rule: {
                    active: false
                }
            };
        },
        components: {
        }
    };
</script>
