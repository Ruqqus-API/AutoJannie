<template>
	<div class="flex items-center justify-end space-x-2">
		<t-button variant="gray200" @click="navigatePrevious()" v-show="!isFirst()">
			Previous
		</t-button>
		<t-button variant="primary" :disabled="!validated" @click="navigateNext()">
			{{ nextButtonText() }}
			<i class="fas fa-arrow-right pl-2" v-show="!isLast()"></i>
		</t-button>
	</div>
</template>

<script>
	export default {
		props: {
			currentStep: Number,
			validated: Boolean
		},
		methods: {
			nextButtonText() {
				if (this.$route.name === 'rule-editor-fourth-step') {
					return 'Create and activate rule'
				}
				return 'Next';
			},
			isFirst() {
				return this.$route.name === 'rule-editor-first-step'
			},
			isLast() {
				return this.$route.name === 'rule-editor-fourth-step'
			},
			navigateNext() {
				if (this.$route.name === 'rule-editor-fourth-step') {
					//submit();
				}
				this.$router.push('./' + (this.currentStep + 1));
			},
			navigatePrevious() {
				if (this.$route.name === 'rule-editor-fourth-step') {
					this.$router.push('./3');
				} else if (this.$route.name === 'rule-editor-third-step') {
					this.$router.push('./2');
				} else if (this.$route.name === 'rule-editor-second-step') {
					this.$router.push('./1');
				}
			}
		}
	}
</script>