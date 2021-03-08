<template>
	<div>
		<div class="grid grid-cols-12 p-8">
			<div class="col-start-2 col-end-12">
				<div class="space-y-8">
					<Trigger :active="true"/>
					<Navigation :currentStep="currentStep" :validated="true"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import component
import Trigger from "@/components/Trigger.vue";
import Navigation from "@/components/Navigation/RuleEditorNavigation.vue";

export default {
	name: "CreateRule",
	props: {
		active: Boolean,
		currentStep: Number
	},
	components: {
		Trigger,
		Navigation
	},
	data() {
		return {
		}
	}
}
</script>