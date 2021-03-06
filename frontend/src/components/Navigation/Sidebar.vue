<template>
	<div class="hidden md:flex items-center flex-col flex-shrink-0 w-72 bg-white border-r dark:bg-gray-750 dark:border-white-13">

		<slot name="header" v-if="stickyHeader"/>

		<!-- Scrollable section -->
		<vue-scroll :ops="hideBar">

			<slot name="header" v-if="!stickyHeader"/>

			<div class="py-3">
				<ul v-for="(section, index) in menu" :key="index" class="-mt-2 mb-5 list-unstyled border-gray-200 dark:border-white-13" :class="{'pb-2 border-b':section.divider}">
					<li v-if="section.header" slot="header" class="py-1 sticky top-0 bg-white dark:bg-gray-750 dark:border-white-13">
						<div class="px-4 text-xs tracking-wide font-bold uppercase text-gray-500 text-opacity-80 dark:text-opacity-60">
							{{ section.name }}
						</div>
					</li>
					<li v-for="(item, index) in section.items" :key="index" class="item">
						<div v-if="item.header">
							<div class="px-4 text-xs uppercase text-gray-500 tracking-wider font-medium mb-1">
								{{ item.name }}
							</div>
						</div>
						<div v-if="!item.header">
							<router-link v-slot="{ href, navigate, isActive }" :to="item.route">
								<a :href="href" @click="navigate" class="block px-4 py-2 text-left transition duration-100 border-t border-b" :class="isActive ? 'text-blue-500 bg-blue-50 border-blue-100' : 'text-gray-700 border-transparent hover:bg-gray-50'">
									<span class="flex items-center justify-between">
										<span class="flex items-center">
											<i class="fas fa-fw mr-3" :class="[isActive ? 'text-blue-500' : 'text-gray-500', item.icon]"></i>
											<span :class="item.textCase">{{ item.name }}</span>
										</span>
										<span v-if="item.badge" class="ml-1 px-2.5 py-0.5 rounded-full border text-xs leading-none font-normal text-white border-transparent" :class="isActive ? 'bg-orange-500' : 'bg-gray-300'">
											{{ item.badge.count }}
										</span>
									</span>
								</a>
							</router-link>
						</div>
					</li>
				</ul>
			</div>
			
			<slot name="footer"/>

		</vue-scroll>
	</div>
</template>

<script>
// import components

export default {
	props: {
		menu: {
			type: Array,
			required: true,
			default: () => [{ textCase: 'lowercase' }]
		},
		sidebarColor: {
			type: String,
			default: 'white'
		},
		stickyHeader: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			drag: false,
	hideBar: { // Vue-Scroll bar
		bar: {
			opacity: 0
		}
	}
};
}
};
</script>