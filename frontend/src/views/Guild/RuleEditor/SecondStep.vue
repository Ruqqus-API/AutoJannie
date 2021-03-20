<template>
	<div>
		<div class="grid grid-cols-12 p-8">
			<div class="col-start-2 col-end-12">
				<div class="space-y-8">
					<Condition :active="true"/>
					<Navigation :currentStep="currentStep"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import component
import Condition from "@/components/Filter.vue";
import Navigation from "@/components/Navigation/RuleEditorNavigation.vue";

export default {
	name: "CreateRule",
	props: {
		currentStep: Number
	},
	components: {
		Condition,
		Navigation
	},
	data() {
		return {
		}
	},
	activated() {
		if (this.$store.state.triggers.picked.type === 'none') {
			this.$route.push('./1');
		}
	},
}
</script>
