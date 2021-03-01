<template>
	<div class="flex flex-grow items-center justify-between border border-gray-300 rounded px-4 py-3">
		<div class="flex items-center space-x-2">
			<div class="flex items-center text-sm bg-gray-100 shadow-inner rounded-sm text-gray-500 hover:text-gray-800">
				<div class="flex items-center justify-center border-r w-9 h-9">
					<i class="fas fa-fw text-center" :class="icon"></i>
				</div>
				<div class="w-24 text-center">
					{{ rule.conditionCount || 0 }} {{ rule.conditionCount === 1 ? ' fitler' : ' filters' }}
				</div>
			</div>
			<i class="fas fa-arrow-right fa-fw text-2xs text-gray-500"></i>
			<div class="flex items-center justify-center px-2 w-9 h-9 text-lg bg-gray-100 shadow-inner font-bold rounded-sm text-red-500 hover:text-gray-800">
				<i class="fas fa-door-open"></i>
			</div>
		</div>
		<div class="font-medium text-gray-600">{{ rule.name }}</div>
		<div class="flex items-center space-x-2">
			<div class="text-xs font-medium uppercase tracking-wide" :class="rule.active ? 'text-green-500' : 'text-red-500'">
				{{ rule.active ? 'On' : 'Off'}}
			</div>
			<t-toggle v-model="rule.active"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Navbar",
		props: {
			rule: {
				Type: Object
			}
		},
		data() {
			return {
			};
		},
		computed: {
			icon() {
				if (this.rule.type === 'text') {
					return 'fa-quote-left'
				} else if (this.rule.type === 'link') {
					return 'fa-link'
				} else {
					return 'fa-comment-alt'
				}
			}
		}
	};
</script>