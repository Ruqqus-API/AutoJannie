<template>
	<div class="space-y-4 shadow-sm">
		<div class="bg-white">
			<div v-if="Object.keys(picked).length" class="px-5 py-4 border text-gray-900 bg-white" :class="active ? 'rounded-t' : 'opacity-60'">
				<div class="flex items-center space-x-3">
					<div class="flex items-center justify-center px-2 w-14 h-14 bg-gray-100 text-gray-500 text-xl font-bold rounded-md shadow-inner">
						<i class="fas fa-fw" :class="picked.icon"></i>
					</div>
					<div>
						<div class="text-xl font-medium">{{ picked.name }}</div>
						<p class="text-opacity-80 text-sm">{{ picked.description }}</p>
					</div>
				</div>
			</div>
			<div v-else class="px-5 py-4 border" :class="active ? 'text-white bg-blue-500 border-transparent rounded-t' : 'text-gray-900 bg-white opacity-60 rounded'">
				<div class="flex items-center space-x-3">
					<div class="flex items-center justify-center px-2 w-14 h-14 border-2 border-dashed border-white border-opacity-40 text-xl font-bold rounded-md text-opacity-90" :class="{'text-white':active}">
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
					<form class="flex flex-col w-100 space-y-2">
						<label v-for="(trigger, index) in triggers" :key="index" class="flex flex-row content-center flex-grow border border-gray-200 rounded overflow-hidde cursor-pointer" :class="trigger.name === picked.name ? 'border-blue-500' : 'hover:border-gray-300'">
							<div class="flex items-center justify-center p-4" :class="trigger.name === picked.name ? 'bg-blue-50' : 'hover:bg-gray-50'">
								<t-radio name="options" :value="trigger" v-model="picked"/>
							</div>
							<div class="flex p-4">
								<div class="ml-3">
									<strong :class="{ 'text-blue-500':trigger.name === picked.name }">
										{{ trigger.name }}
									</strong>
									<p class="text-sm leading-tight text-gray-500">
										{{ trigger.description }}
									</p>
								</div>
							</div>
						</label>
					</form>
				</div>
				<!--<div class="mt-5 flex justify-end p-5 border-t">
					<t-button variant="primary" :disabled="Object.keys(picked).length === 3" @click="nextStep()">
						Next step
						<i class="fas fa-arrow-right fa-sm pl-2"></i>
					</t-button>
				</div>-->
			</div>
		</div>
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
			//picked: {},
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
			],
			anyChecked: false,
		}
	},
	computed: {
		picked: {
			get () {
				return this.$store.state.triggers.picked;
			},
			set (value) {
				this.$store.commit("setPicked", {trigger: value});
			},
		},
	},
	methods: {
		nextStep () {
			this.$router.push(`/+${this.$route.params.guild}/rules/create/2`);
		},
	},
}
</script>
