<template>
	<div class="flex pt-12 h-screen bg-gray-50">
		<div class="w-full">
			<div class="grid grid-cols-12 gap-4 p-8">
				<div class="col-start-1 col-end-9 space-y-4">
					<div class="w-full">
						<div class="flex flex-col w-full bg-white border rounded shadow-xs">
							<div class="px-4 py-3 break-words">
								<span class="text-lg font-medium">Create a rule today</span>
								<span class="flex items-center text-gray-500">
									<i class="fas fa-clock text-lg text-blue-400 pr-2"></i>
									It only takes a few minutes to save hours of moderation time.
								</span>
							</div>
						</div>
					</div>
					<div class="flex flex-col w-full bg-white border rounded shadow-xs">
						<div class="px-4 py-3 break-words">
							<span class="text-lg font-medium">Overview</span>
						</div>
						<div>
							<div v-if="rules.length > 0" class="flex flex-shrink-0 items-end space-x-6 w-full h-full border-b px-4 pt-4">
								<!-- Tabs -->
								<div class="flex flex-shrink-0 items-end space-x-6 w-full h-full">
									<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
										<a :href="href" @click="navigate" class="group">
											<div class="border-b-3 pb-3 capitalize font-medium leading-tight" :class="isExactActive ? 'text-gray-900 border-blue-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
												{{ tab.name }}
												<span v-if="tab.badge" class="ml-1 px-2 py-0.5 rounded-full bg-white border text-sm text-gray-500 font-normal">
													{{ tab.badge.count }}
												</span>
											</div>
										</a>
									</router-link>
								</div>
							</div>
							<div class="p-4 space-y-3">
								<div v-if="rules.length > 0" class="flex items-center mb-4">
									<div class="flex items-center space-x-2">
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
									</div>
									<div class="ml-auto relative flex items-center justify-center">
										<i class="absolute left-3 fas fa-search fa-fw text-gray-400 z-0"></i>
										<t-input placeholder="Filter rules" variant="primary" :fixedClasses="'block w-full pl-9 pr-3 py-2 transition duration-100 ease-in-out border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'"/>
									</div>
								</div>
								<div v-if="rules.length > 0" class="space-y-2">
									<Rule v-for="rule in rules" :key="rule.id" :rule="rule"/>
								</div>
								<div v-else class="p-4">
									<div class="flex flex-col items-center justify-center p-12 rounded border-2 border-dashed">
										<i class="fas fa-hat-wizard text-gray-300 text-5xl mb-2"></i>
										<p class="font-medium text-gray-500 mb-5">{{ $route.params.guild }} has no rules configured.</p>
										<t-button variant="primary" :to="`/+${$route.params.guild}/rules/edit`">Make a rule</t-button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-4 space-y-4">
					<div class="w-full">
						<div class="flex flex-col w-full bg-white border rounded shadow-xs">
							<div class="px-4 py-3 break-words">
								<span class="text-lg font-medium">Your Profile</span>
							</div>
						</div>
					</div>
					<div class="w-full">
						<div class="flex flex-col w-full bg-white border rounded shadow-xs">
							<div class="px-4 py-3 break-words">
								<span class="text-lg font-medium">Pro Tips from the Docs</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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