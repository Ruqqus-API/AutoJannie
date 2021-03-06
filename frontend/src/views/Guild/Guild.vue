<template>
	<div class="flex h-screen pt-12">
		<Sidebar :menu="menu">
			<template v-slot:header>
				<div class="p-4">
					<SelectGuild/>
				</div>
			</template>
			<template v-slot:footer>
				<div class="absolute bottom-0 w-full">
					<div class="w-full border-t p-4 space-y-6">
						<div class="text-gray-600">
							<i class="fas fa-cog fa-fw mr-4 text-gray-500"></i>Settings
						</div>
						<div class="space-y-3">
							<div class="text-gray-600">
								<i class="fas fa-external-link-alt fa-fw mr-4 text-gray-500"></i>Visit guild
							</div>
							<div class="text-gray-600">
								<i class="fas fa-book fa-fw mr-4 text-gray-500"></i>GuildWizard Docs
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

import Sidebar from "@/components/Navigation/Sidebar.vue";
import SelectGuild from "@/components/Select/SelectGuild";

export default {
	name: "GuildView",
	components: {
		Sidebar,
		SelectGuild
	},
	data() {
		return {
			menu: [
			{
				mobileDivider: true,
				items: [
				{
					header: true,
					name: 'moderation'
				},
				{
					name: 'overview',
					route: `/+${this.$route.guild}/overview`,
					icon: 'fa-columns',
					textCase: 'capitalize'
				},
				{
					name: 'rules',
					route: `/+${this.$route.guild}/rules`,
					icon: 'fa-gavel',
					textCase: 'capitalize',
					badge: {
						count: 10
					}
				},
				{
					name: 'configuration',
					route: `/+${this.$route.guild}/configuration`,
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