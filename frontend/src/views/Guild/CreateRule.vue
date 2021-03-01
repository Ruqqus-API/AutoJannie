<template>
	<div class="flex h-screen pt-12 bg-gray-50">

		<div class="relative hidden md:flex items-center flex-col flex-shrink-0 w-80 bg-white border-r dark:bg-gray-750 dark:border-white-13 center-line">
			<div class="w-full p-4 bg-white border-b z-10">
				<div class="text-xl font-medium">Create a rule</div>
				<p class="text-gray-500 text-sm mt-1">
					Wizard will follow this rule and moderate your guild automagically.
				</p>
			</div>

			<div class="space-y-4 relative p-4 w-full h-full z-10">
				<div class="flex space-x-4 z-10">
					<div class="w-full bg-white">
						<div class="shadow-xs rounded">
							<div class="flex items-center space-x-2 px-2 py-1.5 bg-gray-100 border rounded-t">
								<div class="flex items-center justify-center px-2 w-5 h-5 bg-purple-500 font-bold rounded text-white hover:text-gray-800">
									<i class="fas fa-bolt fa-fw text-3xs"></i>
								</div>
								<div class="text-gray-500 text-xs font-semibold uppercase tracking-wide leading-tight">
									1. Trigger
								</div>
							</div>
							<div class="p-3 bg-white border border-t-0 rounded-b">
								<div class="flex items-center space-x-2">
									<div class="flex items-center justify-center px-2 w-9 h-9 bg-gray-100 shadow-inner font-bold rounded text-gray-500 hover:text-gray-800">
										<i class="fas fa-link fa-fw fa-sm"></i>
									</div>
									<div class="capitalize font-medium">Link post</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-white">
					<div class="flex space-x-4 z-10 opacity-40">
						<div class="w-full bg-white">
							<div class="shadow-xs rounded">
								<div class="flex items-center space-x-2 px-2 py-1.5 bg-gray-100 border rounded-t">
									<div class="flex items-center justify-center px-2 w-5 h-5 bg-gray-400 font-bold rounded text-white hover:text-gray-800">
										<i class="fas fa-filter fa-fw text-3xs"></i>
									</div>
									<div class="text-gray-500 text-xs font-semibold uppercase tracking-wide leading-tight">
										2. Filter
									</div>
								</div>
								<div class="p-3 bg-white border border-t-0 rounded-b">
									<div class="flex items-center space-x-2">
										<div class="flex items-center justify-center px-2 w-9 h-9 bg-gray-100 shadow-inner font-bold rounded text-gray-500 hover:text-gray-800">
											<i class="fas fa-link fa-fw fa-sm"></i>
										</div>
										<div class="capitalize font-medium">Link post</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-white">
					<div class="flex flex-col items-center justify-center z-10 opacity-40">
						<button class="flex items-center justify-center rounded px-3 py-1.5 text-sm border font-medium text-gray-400 bg-gray-50 hover:text-gray-500 hover:bg-gray-100 transition duration-100 z-10">
							<i class="fas fa-filter fa-sm fa-fw mr-2"></i>
							Add filter
						</button>
					</div>
				</div>
				<div class="bg-white">
					<div class="flex space-x-4 z-10 opacity-40">
						<div class="w-full bg-white">
							<div class="shadow-xs rounded">
								<div class="flex items-center space-x-2 px-2 py-1.5 bg-gray-100 border rounded-t">
									<div class="flex items-center justify-center px-2 w-5 h-5 bg-gray-400 font-bold rounded text-white hover:text-gray-800">
										<i class="fas fa-hat-wizard fa-fw text-3xs"></i>
									</div>
									<div class="text-gray-500 text-xs font-semibold uppercase tracking-wide leading-tight">
										3. Action
									</div>
								</div>
								<div class="p-3 bg-white border border-t-0 rounded-b">
									<div class="flex items-center space-x-2">
										<div class="flex items-center justify-center px-2 w-9 h-9 bg-gray-100 shadow-inner font-bold rounded text-gray-500 hover:text-gray-800">
											<i class="fas fa-link fa-fw fa-sm"></i>
										</div>
										<div class="capitalize font-medium">Link post</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Content section -->
		<vue-scroll>
			<div>
				<div class="grid grid-cols-12 p-8">
					<div class="col-start-2 col-end-12">
						<div class="space-y-12">
							<Trigger :active="true"/>
							<Condition class="hidden"/>
							<Action class="hidden"/>
						</div>
					</div>
				</div>
			</div>
		</vue-scroll>

	</div>
</template>

<script>
// Import Components
//import { mapState } from 'vuex';

import Trigger from "@/components/Trigger.vue"
import Condition from "@/components/Filter.vue"
import Action from "@/components/Action.vue"

export default {
	name: "GuildView",
	components: {
		Trigger,
		Condition,
		Action
	},
	data() {
		return {
			menu: [
			{
				mobileDivider: true,
				items: [
				{
					name: 'overview',
					route: `/+${this.$route.params.guild}/overview`,
					icon: 'fa-columns',
					textCase: 'capitalize'
				},
				{
					name: 'rules',
					route: `/+${this.$route.params.guild}/rules`,
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

<style scoped>

.center-line::after {
	position: absolute;
	top: 0;
	bottom: 0;
	left: calc(50% - 2px);
	z-index: 1;
	width: 1px;
	content: "";
	background: #e3e3e3;
}

</style>