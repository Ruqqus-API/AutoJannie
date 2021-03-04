<template>
	<div class="space-y-4 shadow-sm">
		<div class="bg-white">
			<div class="px-5 py-4" :class="active ? 'text-white bg-purple-500 rounded-t' : 'border text-gray-900 bg-white opacity-60 rounded'">
				<div class="flex items-center space-x-3">
					<div class="flex items-center justify-center px-2 w-14 h-14 text-xl font-bold rounded-md border-2 border-white border-dashed border-opacity-40 text-opacity-90" :class="{'text-white':active}">
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
					<label class="label">Trigger</label>
					<form class="flex flex-col w-100 space-y-4">
						<div v-for="(trigger, index) in triggers" :key="index" class="flex flex-row content-center flex-grow p-6 border border-gray-200 rounded hover:bg-gray-100">
							<t-radio name="options" :checked="trigger.checked" />
							<span class="flex-shrink-0 ml-2">
								<i class="fas fa-fw text-3xl" :class="trigger.icon"></i>
							</span>
							<div class="flex flex-col ml-2">
								<strong>
									{{ trigger.name }}
								</strong>
								<span class="text-sm leading-tight text-gray-700">{{ trigger.description }}</span>
							</div>
						</div>
					</form>
				</div>
				<div class="mt-5 flex justify-end p-5 border-t">
					<t-button variant="purple500">
						Next step
						<i class="fas fa-arrow-right fa-sm pl-2"></i>
					</t-button>
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
				checked: false,
				type: 'link',
				name: 'New Link Post',
				icon: 'fa-link',
				description: 'Triggers when a link submission is posted to the guild.',
			},
			{
				id: 2,
				checked: false,
				type: 'text',
				name: 'New Text Post',
				icon: 'fa-quote-left',
				description: 'Triggers when a text submission is posted to the guild.',
			},
			{
				id: 3,
				checked: false,
				type: 'comment',
				name: 'New Comment',
				icon: 'fa-comment-alt',
				description: 'Triggers when a comment is posted to a guild thread.',
			}
			]
		}
	},
	/*computed: {
		anyChecked: function() {
			return (this.triggers.filter((trigger) => {trigger.checked}).length > 0);
		},
	},*/
}
</script>
