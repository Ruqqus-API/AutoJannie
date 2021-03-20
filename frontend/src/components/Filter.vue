<template>
	<div class="space-y-4">
		<div class="bg-white">
			<div class="px-5 py-4" :class="active ? 'text-white bg-purple-500 rounded-t' : 'border text-gray-900 bg-white opacity-60 rounded'">
				<div class="flex items-center space-x-3">
					<div class="flex items-center justify-center px-2 w-14 h-14 text-xl font-bold rounded-md border-2 border-white border-dashed border-opacity-50 text-current text-opacity-90">
						<i class="fas fa-filter"></i>
					</div>
					<div>
						<div class="text-xl font-medium">Pick a Filter</div>
						<p class="text-opacity-80 text-sm">A filter lets you run the rule only if it matches certain conditions.</p>
					</div>
				</div>
			</div>
			<div class="border-t-0 border rounded-b" v-show="active">
				<div class="p-5">
					<FilterListing :fields="availableFields" />
				</div>
				<!--<div class="mt-5 flex justify-between p-5 border-t">
					<t-button variant="white" @click="previousStep()">
						<i class="fas fa-arrow-left fa-sm pr-2"></i>
						Previous step
					</t-button>
					<t-button variant="primary">
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

import FilterListing from './FilterListing.vue';

export default {
	name: "CreateRule",
	props: {
		active: Boolean
	},
	components: {
		FilterListing,
	},
	data() {
		//list of conditions for each field
		const conditions = {
			//age is the same thing as integers but allows strings ("2 days/3 months/etc")
			age: [
				{
					//name used as text option displayed to the user
					text: 'less than',
					value: {
						//name used for future YAML parsing
						name: '<',
						//whether this condition is integer-only or not, null if value disabled
						integer: false,
					},
				},
				{
					text: 'greater than',
					value: {
						name: '>',
						integer: false,
					},
				},
				{
					text: 'equals',
					value: {
						name: '=',
						integer: false,
					},
				},
			],
			integers: [
				{
					text: 'less than',
					value: {
						name: '<',
						integer: true,
					},
				},
				{
					text: 'greater than',
					value: {
						name: '>',
						integer: true,
					},
				},
				{
					text: 'equals',
					value: {
						name: '=',
						integer: true,
					},
				},
			],
			//for author.is_guildmaster and is_contributor
			bool: [
				{
					text: 'true',
					value: {
						name: 'true',
						integer: null,
					},
				},
				{
					text: 'false',
					value: {
						name: 'false',
						integer: null,
					},
				},
			],
			title: [
				{
					text: 'includes',
					value: {
						name: 'title-includes',
						integer: false,
					},
				},
				{
					text: 'matches',
					value: {
						name: 'title-matches',
						integer: false,
					},
				},
				{
					text: 'includes regex',
					value: {
						name: 'title-includes',
						integer: false,
					},
				},
				{
					text: 'matches regex',
					value: {
						name: 'title-matches-regex',
						integer: false,
					},
				},
			],
			text: [
				{
					text: 'includes',
					value: {
						name: 'text-includes',
						integer: false,
					},
				},
				{
					text: 'matches',
					value: {
						name: 'text-matches',
						integer: false,
					},
				},
				{
					text: 'includes regex',
					value: {
						name: 'text-includes-regex',
						integer: false,
					},
				},
				{
					text: 'matches regex',
					value: {
						name: 'text-matches-regex',
						integer: false,
					},
				},
			],
			domain: [
				{
					text: 'includes',
					value: {
						name: 'domain-includes',
						integer: false,
					},
				},
				{
					text: 'matches',
					value: {
						name: 'domain-matches',
						integer: false,
					},
				},
				{
					text: 'includes regex',
					value: {
						name: 'domain-includes-regex',
						integer: false,
					},
				},
				{
					text: 'matches regex',
					value: {
						name: 'domain-matches-regex',
						integer: false,
					},
				},
			],
		};
		return {
			conditions: conditions,
			//list of all fields
			fields: [
				{
					//text, used for the dropdown, displayed to the user
					text: 'Author Account Age',
					//dropdown value
					value: {
						//name used for future YAML parsing
						name: 'author.created_at',
						//list of trigger types this field is available for, used later for filtering
						types: [
							'link',
							'text',
							'comment',
						],
						//list of conditions for this field
						conditions: conditions.age,
					},
				},
				{
					text: 'Author Comment Rep',
					value: {
						name: 'author.comment_rep',
						types: [
							'link',
							'text',
							'comment',
						],
						conditions: conditions.integers,
					},
				},
				{
					text: 'Author Post Rep',
					value: {
						name: 'author.comment_rep',
						types: [
							'link',
							'text',
							'comment',
						],
						conditions: conditions.integers,
					},
				},
				{
					text: 'Author Combined Rep',
					value: {
						name: 'author.rep',
						types: [
							'link',
							'text',
							'comment',
						],
						conditions: conditions.integers,
					},
				},
				{
					text: 'Author Is Guildmaster',
					value: {
						name: 'author.is_guildmaster',
						types: [
							'link',
							'text',
							'comment',
						],
						conditions: conditions.bool,
					},
				},
				{
					text: 'Author Is Contributor',
					value: {
						name: 'author.is_contributor',
						types: [
							'link',
							'text',
							'comment',
						],
						conditions: conditions.bool,
					},
				},
				{
					text: 'Text',
					value: {
						name: 'text',
						types: [
							'link',
							'text', 
							'comment',
						],
						conditions: conditions.text,
					},
				},
				{
					text: 'Title',
					value: {
						name: 'title',
						types: [
							'link',
							'text',
						],
						conditions: conditions.title,
					},
				},
				{
					text: 'Domain',
					value: {
						name: 'domain',
						types: ['link'],
						conditions: conditions.domain,
					},
				},
			],
		}
	},
	computed: {
		availableFields () {
			//filter fields based on selected trigger, passed down as argument to FilterListing.vue
			return this.fields.filter(field => field.value.types.includes(this.$store.state.triggers.picked.type));
		},
	},
	methods: {
		previousStep () {
			this.$router.push(`/+${this.$route.params.guild}/rules/create/1`);
		},
	},
}
</script>
