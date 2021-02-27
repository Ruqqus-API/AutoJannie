<template>
	<div class="flex h-screen pt-14">
		<Sidebar :menu="menu" sidebar-color="primary" sticky-header>
			<template v-slot:header>
				<div class="flex flex-shrink-0 w-full items-center h-16 md:px-4 border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 dark:bg-gray-700 mb-2">
					<div class="flex items-center">
						<img
						src="https://i.ibb.co/3CLCcQ4/image.png"
						class="w-10 h-10 rounded-sm bg-gray-300 dark:bg-gray-800"
						alt="Guild icon"
						to="/+minecraft"
						/>
						<div class="pl-2">
							<div class="text-lg font-medium text-white">+minecraft</div>
							<div class="text-sm text-white text-opacity-80">
								1400 members
							</div>
						</div>
					</div>
				</div>
			</template>
		</Sidebar>

		<!-- Content section -->
		<router-view></router-view>

	</div>
</template>

<script>
// Import Components
//import { mapState } from 'vuex';

import Sidebar from "@/components/Navigation/Sidebar.vue"

export default {
	name: "GuildView",
	components: {
		Sidebar
	},
	data() {
		return {
			menu: [
			{
				mobileDivider: true,
				items: [
				{
					name: 'overview',
					route: 'overview',
					icon: 'fa-columns',
					textCase: 'capitalize'
				},
				{
					name: 'rules',
					route: 'rules',
					icon: 'fa-scroll',
					textCase: 'capitalize'
				},
				{
					name: 'settings',
					route: 'settings',
					//route: `/+${this.$route.params.guild}/settings`,
					icon: 'fa-cog',
					textCase: 'capitalize'
				}
				]
			}
			]
		};
	},
	computed: {
		//...mapState("persist", ["v"]),
	}
}
</script>