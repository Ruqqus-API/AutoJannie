<template>
	<div class="flex items-center border border-transparent">
		<form>
			<label class="flex flex-shrink-0 items-center justify-center w-9">
				<t-checkbox/>
			</label>
		</form>
		<router-link to="/" class="block w-full bg-white border rounded p-4 hover:border-gray-300">
			<div class="flex flex-grow items-center justify-between">
				<div class="flex flex-shrink-0 items-center space-x-2 pr-4 xl:pr-0">
					<div class="flex items-center text-sm bg-gray-100 shadow-inner rounded-sm text-gray-500">
						<div class="flex items-center justify-center w-10 h-10">
							<i class="fas fa-fw" :class="triggerIcon"></i>
						</div>
					</div>
					<i class="fas fa-arrow-right fa-fw text-2xs text-gray-500"></i>
					<div class="flex items-center justify-center px-2 w-10 h-10 text-lg bg-gray-100 shadow-inner font-bold rounded">
						<i class="fas fa-fw" :class="actionIcon"></i>
					</div>
				</div>
				<div class="font-medium text-gray-600">{{ rule.name || 'No title given'}}</div>
				<div class="flex items-center space-x-2 lg:space-x-4 pl-4 xl:pl-0">
					<div class="flex items-center space-x-2">
						<div class="text-xs font-medium uppercase tracking-wide leading-tight w-6 text-center" :class="rule.active ? 'text-green-500' : 'text-gray-500'">
							{{ rule.active ? 'On' : 'Off'}}
						</div>
						<t-toggle variant="success" v-model="rule.active" @click.prevent/>
					</div>
					<t-dropdown text="Menu" :classes="{ dropdown: 'w-40 origin-top-left right-0 bg-white py-2' }">
						<!-- Trigger -->
						<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
							<button class="p-2 leading-tight text-gray-500 hover:text-gray-600 dark:text-gray-200" id="comment-options-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler" @click.prevent>
								<i class="fas fa-ellipsis-h"></i>
							</button>
						</div>
						<!-- Menu -->
						<div slot-scope="{ hide, blurHandler }">
							<router-link :to="`/+${$route.params.guild}/rules/edit`" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
								<i class="fas fa-pen fa-sm fa-fw mr-2"></i><span>Edit rule</span>
							</router-link>
							<router-link to="#" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="blurHandler">
								<i class="fas fa-i-cursor fa-sm fa-fw mr-2"></i><span>Rename</span>
							</router-link>
							<router-link to="#" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="blurHandler">
								<i class="fas fa-copy fa-sm fa-fw mr-2"></i><span>Duplicate</span>
							</router-link>
							<hr>
							<router-link to="#" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
								<i class="fas fa-trash-alt fa-sm fa-fw mr-2"></i><span>Trash</span>
							</router-link>
						</div>
					</t-dropdown>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: "Navbar",
		props: {
			rule: {
				Type: Object
			}
		},
		data() {
			return {
			};
		},
		computed: {
			triggerIcon() {
				if (this.rule.type === 'text') {
					return 'fa-quote-left'
				} else if (this.rule.type === 'link') {
					return 'fa-link'
				} else {
					return 'fa-comment-alt'
				}
			},
			actionIcon() {
				if (this.rule.action === 'kick') {
					return 'fa-door-open text-red-500'
				} else {
					return 'fa-comment-alt text-red-500'
				}
			}
		}
	};
</script>