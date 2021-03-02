<template>
	<div class="flex h-screen pt-12">
		<Sidebar :menu="menu" sidebar-color="primary" sticky-header>
			<template v-slot:header>
				<div class="flex flex-shrink-0 w-full items-center h-20 md:px-6 border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
					<div class="flex items-center">
						<div class="border rounded bg-gray-50 p-1">
							<img
							src="https://i.ibb.co/3CLCcQ4/image.png"
							class="w-9 h-9 bg-gray-300 dark:bg-gray-800"
							alt="Guild icon"
							to="/+minecraft"
							/>
						</div>
						<div class="pl-3">
							<div class="text-lg font-medium">+{{ $route.params.guild }}</div>
							<div class="text-sm text-gray-500">
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
				header: true,
				mobileDivider: true,
				items: [
				{
					header: true,
					name: 'moderation'
				},
				{
					name: 'overview',
					route: `/+${this.$route.params.guild}/overview`,
					icon: 'fa-columns',
					textCase: 'capitalize'
				},
				{
					name: 'rules',
					//route: `/+${this.$route.params.guild}/rules/active`,
					route: {
						name: 'guild-rules-view',
					},
					icon: 'fa-scroll',
					textCase: 'capitalize'
				},
				{
					name: 'configuration',
					route: `/+${this.$route.params.guild}/settings`,
					icon: 'fa-wrench',
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