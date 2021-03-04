<template>
	<div class="h-screen pt-12">
		<div class="bg-white border-b">
			<div class="max-w-6xl mx-auto px-6 h-16">
				<!-- Tabs -->
				<div class="flex flex-shrink-0 items-end space-x-6 w-full h-full">
					<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
						<a :href="href" @click="navigate" class="group">
							<div class="border-b-2 pb-5 capitalize font-medium leading-tight" :class="isExactActive ? 'text-gray-900 border-purple-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
								{{ tab.name }}
								<span v-if="tab.badge" class="ml-1 px-2 py-0.5 rounded-full bg-white border text-sm text-gray-500 font-normal">
									{{ tab.badge.count }}
								</span>
							</div>
						</a>
					</router-link>
				</div>
			</div>
		</div>

		<!-- Content section -->
		<router-view></router-view>

	</div>
</template>

<script>
// Import Components
//import { mapState } from 'vuex';

export default {
	name: "GuildView",
	components: {
	},
	data() {
		return {
			tabs: [
			{
				name: "overview",
				route: {
					name: 'guild-overview-view',
				}
			},
			{
				name: "rules",
				route: {
					name: 'guild-rules-view',
					params: { sort: 'active' }
				}
			},
			{
				name: "settings",
				route: {
					name: 'guild-settings-view'
				}
			},
			]
		};
	},
	computed: {
		//...mapState("persist", ["v"]),
	}
}
</script>