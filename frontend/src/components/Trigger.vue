<template>
	<div class="space-y-4 shadow-sm">
		<div class="bg-white">
			<div class="px-5 py-4" :class="active ? 'text-white bg-purple-500 rounded-t' : 'border text-gray-900 bg-white opacity-60 rounded'">
				<div class="flex items-center space-x-3">
					<div class="flex items-center justify-center px-2 w-14 h-14 text-xl font-bold rounded-md border-2 border-white border-opacity-40 text-opacity-90" :class="{'text-white':active}">
						<i class="fas fa-bolt"></i>
					</div>
					<div>
						<div class="text-xl font-medium">Pick a Trigger</div>
						<p class="text-opacity-80 text-sm">A trigger is what activates the wizard.</p>
					</div>
				</div>
			</div>
			<div class="border-t-0 border rounded-b" v-show="active">

				<div class="p-5">
					<label class="label">Select a trigger</label>
					<t-rich-select/>
				</div>

				<div class="space-y-3 hidden">
					<button v-for="trigger in triggers" :key="trigger.name" class="flex w-full text-left space-x-3 p-4 rounded bg-white border hover:border-purple-500">
						<div class="flex items-center justify-center px-2 w-10 h-10 text-lg bg-gray-100 shadow-inner font-bold rounded-sm text-gray-500 hover:text-gray-800">
							<i class="fas fa-fw fa-sm" :class="trigger.icon"></i>
						</div>
						<div>
							<div class="text-lg capitalize font-medium">{{ trigger.type }}</div>
							<p class="text-gray-600 mt-1">{{ trigger.description }}</p>
						</div>
					</button>
				</div>
				<div class="mt-5 flex justify-end p-5 border-t">
					<t-button variant="purple500">Next step</t-button>
				</div>
			</div>
		</div>
<!-- 	<div class="flex items-center justify-center h-20">
		<button class="flex items-center justify-center w-6 h-6 rounded-full text-gray-400 bg-gray-200 border hover:text-white hover:bg-purple-500 shadow-sm">
			<i class="fas fa-plus fa-sm"></i>
		</button>
	</div> -->
</div>
</template>

<script>
// import component

export default {
	name: "CreateRule",
	props: {
		active: Boolean
	},
	components: {
	},
	data() {
		return {
			triggers: [
			{
				id: 1,
				type: 'link',
				icon: 'fa-link',
				description: 'Triggers when a link submission is posted to the guild.',
			},
			{
				id: 2,
				type: 'text',
				icon: 'fa-quote-left',
				description: 'Triggers when a text submission is posted to the guild.',
			},
			{
				id: 3,
				type: 'comment',
				icon: 'fa-comment-alt',
				description: 'Triggers when a comment is posted to a guild thread.',
			}
			]
		}
	},
	computed: {
	}
}
</script>