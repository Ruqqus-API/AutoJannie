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
							<div class="px-6 text-2xs uppercase text-gray-500 font-medium tracking-wide mb-2">
								{{ item.name }}
							</div>
						</div>
						<div v-if="!item.header">
							<router-link v-slot="{ href, navigate, isActive }" :to="item.route">
								<a :href="href" @click="navigate" class="block px-6 py-2 text-left transition duration-100" :class="isActive ? 'text-white bg-purple-500' : 'text-gray-500 hover:bg-gray-100'">
									<span v-if="!item.icon" class="flex items-center">
										<img
										:id="item.id"
										v-lazy="item.src"
										class="w-12 h-12 object-fit bg-gray-300 dark:bg-gray-700 rouned-sm"
										:alt="item.alt"
										/>
										<span class="pl-3">+{{ item.name }}</span>
									</span>
									<span v-else class="flex items-center">
										<i class="fas fa-fw text-2xs mr-3" :class="item.icon"></i>
										<span class="font-semibold" :class="item.textCase">{{ item.name }}</span>
									</span>
								</a>
							</router-link>
						</div>
					</li>
				</ul>
			</div>

			<div class="p-3">
				<slot name="footer"/>
			</div>

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