<template>
	<div class="flex h-screen pt-12 bg-gray-50">

		<div class="relative hidden md:flex items-center flex-col flex-shrink-0 w-80 bg-white border-r dark:bg-gray-750 dark:border-white-13 center-line">
			<div class="w-full p-4 bg-white border-b z-10">
				<div class="flex items-center space-x-2 mb-4 text-sm">
					<router-link :to="`/+${$route.params.guild}/rules`" class="text-gray-400 hover:text-gray-500 hover:underline">
						Guild rules
					</router-link>
					<i class="fas fa-arrow-right fa-fw fa-sm text-gray-400"></i>
					<div class="text-gray-500">Create new rule</div>
				</div>
				<div class="text-xl font-medium">Create a rule</div>
				<p class="text-gray-500 text-sm mt-1">
					Wizard will follow this rule and moderate your guild automagically.
				</p>
			</div>

			<div class="space-y-4 relative p-4 w-full h-full z-10">
				<router-link class="block bg-white text-gray-900" to="./1">
					<div class="flex space-x-4 z-10 transition duration-100" :class="{ 'hover:opacity-100 opacity-40':!isFirst }">
						<div class="w-full bg-white">
							<div class="shadow-xs rounded">
								<div class="flex items-center space-x-2 px-2 py-1.5 bg-gray-100 border rounded-t">
									<div class="flex items-center justify-center px-2 w-5 h-5 font-bold rounded text-white hover:text-gray-800" :class="isFirst ? 'bg-blue-500' : 'bg-gray-400'">
										<i class="fas fa-bolt fa-fw text-3xs"></i>
									</div>
									<div class="text-gray-500 text-xs font-semibold uppercase tracking-wide leading-tight">
										1. Trigger
									</div>
								</div>
								<div class="space-y-2 p-3 bg-white border border-t-0 rounded-b">
									<div class="flex items-center space-x-2">
										<div class="flex items-center justify-center px-2 w-9 h-9 bg-gray-100 shadow-inner font-bold rounded text-gray-500 hover:text-gray-800">
											<i class="fas fa-fw fa-sm" :class="$store.state.triggers.picked.icon"></i>
										</div>
										<div class="capitalize font-medium">{{ $store.state.triggers.picked.name }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</router-link>
				<router-link class="block bg-white text-gray-900" to="./2">
					<div class="flex space-x-4 z-10 transition duration-100" :class="{ 'hover:opacity-100 opacity-40':!isSecond }">
						<div class="w-full bg-white">
							<div class="shadow-xs rounded">
								<div class="flex items-center space-x-2 px-2 py-1.5 bg-gray-100 border rounded-t">
									<div class="flex items-center justify-center px-2 w-5 h-5 font-bold rounded text-white hover:text-gray-800" :class="isSecond ? 'bg-blue-500' : 'bg-gray-400'">
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
				</router-link>
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
				<div class="bg-white">
					<div class="flex flex-col items-center justify-center z-10 opacity-40">
						<button class="flex items-center justify-center rounded px-3 py-1.5 text-sm border font-medium text-gray-400 bg-gray-50 hover:text-gray-500 hover:bg-gray-100 transition duration-100 z-10">
							<i class="fas fa-hat-wizard fa-sm fa-fw mr-2"></i>
							Add action
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Content section -->
		<vue-scroll>
			<keep-alive>
				<router-view>
				</router-view>
			</keep-alive>
		</vue-scroll>

	</div>
</template>

<script>
// Import Components
import axios from 'axios'

export default {
	name: "GuildView",
	components: {
	},
	data() {
		return {
			config: [],
			errored: false,
			loading: true,
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
		isFirst() {
			return this.$route.name === 'rule-editor-first-step'
		},
		isSecond() {
			return this.$route.name === 'rule-editor-second-step'
		},
		isThird() {
			return this.$route.name === 'rule-editor-third-step'
		},
		isLast() {
			return this.$route.name === 'rule-editor-fourth-step'
		},
		triggerIcon() {
			if (this.config.conditions.type === 'text') {
				return 'fa-quote-left'
			} else if (this.config.conditions.type === 'link') {
				return 'fa-link'
			} else {
				return 'fa-comment-alt'
			}
		},
		actionIcon() {
			if (this.config.actions.action === 'kick') {
				return 'fa-door-open text-red-500'
			} else {
				return 'fa-comment-alt text-gray-500'
			}
		}
	},
	created() {
		axios
		.get('https://gist.githubusercontent.com/Panjkrc/998bd3ee77fb37b05e1a6f36eccc9436/raw/bcdf8069385a8a951147f338c73d14d72589a658/config.json')
		.then(response => {
			this.config = response.data.data.rules_vue
		})
		.catch(error => {
			console.log(error)
			this.errored = true
		})
		.finally(() => this.loading = false)
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

.separator {
	display: flex;
	align-items: center;
	text-align: center;
}

.separator::before,
.separator::after {
	content: '';
	flex: 1;
	border-bottom: 1px solid #e3e3e3;
}

.separator:not(:empty)::before {
	margin-right: .25em;
}

.separator:not(:empty)::after {
	margin-left: .25em;
}
</style>
