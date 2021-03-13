<template>
	<div class="space-y-4">

		<div v-for="(filterGroup, groupIndex) in filters.groups" :key="groupIndex" class="flex flex-col space-y-1">
			<label class="label block" :class="{ 'border-t border-gray-200 pt-3': groupIndex > 0 }">{{ groupIndex === 0 ? 'Only continue if...' : 'OR continue if...' }}</label>

			<div v-for="(filter, index) in filterGroup" :key="index" class="flex flex-row space-x-3">
				<div class="w-full block flex-grow flex-col">
					<t-rich-select 
						:options="fields"
						placeholder="Select a field..."
						v-model="filter.field"
						:variant="{error: filter.field.types && !filter.field.types.includes($store.state.triggers.picked.type)}" />

					<!-- validation -->
					<span v-if="filter.field.types && !filter.field.types.includes($store.state.triggers.picked.type)" class="text-red-600 text-sm">
						<i class="fas fa-exclamation-circle"></i> Type "{{ $store.state.triggers.picked.type }}" has no attribute "{{ filter.field.name }}".
					</span>

				</div>

				<div class="w-full block flex-grow">
					<t-rich-select 
						:options="filter.field.conditions"
						placeholder="Select a condition..."
						no-results-text="Select a field first."
						v-model="filter.condition"
						:variant="{error: filter.condition.name && filter.field.conditions.filter(x => x.value.name === filter.condition.name).length === 0}" />

						<!-- validation -->
						<span v-if="filter.condition.name && filter.field.conditions.filter(x => x.value.name === filter.condition.name).length === 0" class="text-red-600 text-sm">
							<i class="fas fa-exclamation-circle"></i> Condition "{{ filter.condition.name }}" isn't compatible with field "{{ filter.field.name }}".
						</span>

				</div>

				<div class="w-full block flex-grow">
					<t-input 
						placeholder="Enter a value..."
						:disabled="!filter.condition.name || filter.condition.integer === null"
						:type="filter.condition.integer ? 'number' : 'text'"
						v-model="filter.value" />
				</div>

				<div>
					<t-button variant="gray100" :disabled="filters.groups.length === 1 && filterGroup.length === 1" @click="deleteFilter(groupIndex, index)">
						<i class="fas fa-trash"></i>
					</t-button>	
				</div>

			</div>
			<div>
				<t-button v-if="filters.groups.length > 1" variant="gray100" @click="createFilter(groupIndex)">
					<i class="fas fa-plus"></i> And
				</t-button>
			</div>
		</div>

		<div class="flex flex-row space-x-3">

			<t-button v-if="filters.groups.length === 1" variant="gray100" @click="createFilter(filters.groups.length - 1)">
				<i class="fas fa-plus"></i> And
			</t-button>

			<t-button variant="gray100" @click="createGroup()">
				<i class="fas fa-plus"></i> Or
			</t-button>

		</div>

	</div>
</template>

<script>
	export default {
		props: {
			//receives the filtered fields array as property
			fields: Array,
		},
		data () {
			return {
				filters: {
					//the rule runs if all conditions are true in at least one group
					//tldr: groups = OR blocks 
					groups: [
							//array of groups
							[
								//array of filters in the group
								{
									field: {conditions: []},
									condition: {name: null, integer: false},
									value: null,
								},
							],
					],
				},
			};
		},
		methods: {
			createFilter (group) {
				//add a new filter to the given group
				this.filters.groups[group].push(
					{
						field: {conditions: []},
						condition: {name: null, integer: false},
						value: null,
					},
				);
			},
			createGroup () {
				//create new group
				this.filters.groups.push([]);

				//add a filter to the new group by default, the group is deleted if all filters in it are deleted
				this.createFilter(this.filters.groups.length - 1);
			},
			deleteFilter (group, position) {
				//delete a filter in a group
				this.filters.groups[group].splice(position, 1);

				//delete parent group if empty
				if (this.filters.groups[group].length === 0) {
					this.filters.groups.splice(group, 1);
				}
			},
		},
	};
</script>
