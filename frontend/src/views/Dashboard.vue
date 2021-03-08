<template>
	<div class="flex pt-12 h-screen bg-gray-50">
		<div class="w-full">
			<div class="grid grid-cols-12 gap-4 p-8">
				<div class="col-start-1 col-end-9 space-y-4">
					<div class="w-full">
						<div class="flex flex-col w-full bg-white border rounded shadow-xs">
							<div class="px-4 py-3 break-words">
								<span class="text-lg font-medium">Create a rule today</span>
								<span class="flex items-center text-gray-500">
									<i class="fas fa-clock text-lg text-blue-400 pr-2"></i>
									It only takes a few minutes to save hours of moderation time.
								</span>
							</div>
						</div>
					</div>
					<div class="flex flex-col w-full bg-white border rounded shadow-xs">
						<div class="px-4 pt-3 break-words">
							<span class="text-lg font-medium">Guilds</span>
						</div>
						<div class="p-4 space-y-4">
							<div class="space-y-2">
								<router-link v-for="guild in guilds" :key="guild.name" :to="`/+${guild.name}`" class="flex items-center justify-between w-full bg-white border rounded p-4 hover:border-gray-300">
									<div class="flex items-center">
										<img :src="guild.profile_url" class="w-10 h-10 rounded" alt="guild image"/>
										<div class="ml-3">
											<div class="font-medium">+{{ guild.name }}</div>
											<p class="text-sm text-gray-500">
												{{ guild.members_count }} member{{ guild.members_count === 1 ? '' : 's' }}
											</p>
										</div>
									</div>
									<t-button :variant="guild.connected ? 'gray200' : 'primary'" class="w-28 capitalize" @click.prevent>
										{{ guild.connected === true ? 'disconnect' : 'connect' }}
									</t-button>
								</router-link>
							</div>
							<div class="flex items-center text-gray-500">
								<i class="fas fa-info-circle text-lg text-blue-400 pr-2"></i>
								<p>
									Your guild must have <span class="text-sm font-mono px-2 py-0.5 bg-orange-100 text-orange-600 rounded">@autojannie</span> as a guild master in order to work with GuildWizard. Click "connect" to get started.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-4 space-y-4">
					<div class="w-full">
						<div class="flex flex-col w-full bg-white border rounded shadow-xs">
							<div class="px-4 py-3 break-words">
								<span class="text-lg font-medium">Your Profile</span>
							</div>
						</div>
					</div>
					<div class="w-full">
						<div class="flex flex-col w-full bg-white border rounded shadow-xs">
							<div class="px-4 py-3 break-words">
								<span class="text-lg font-medium">Pro Tips from the Docs</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import component

export default {
	name: "GuildRules",
	components: {
	},
	data() {
		return {
			guilds: [
			{
				id: 1,
				name: 'gaming',
				profile_url: `https://i.ibb.co/jVzKrHf/image.png`,
				members_count: 4200,
				connected: true
			},
			{
				id: 2,
				name: 'aesthetic',
				profile_url: `https://i.ibb.co/v4SskW1/image.png`,
				members_count: 720,
				connected: false
			},
			],
			tabs: [
			{
				name: "active",
				route: {
					name: 'guild-rules-view',
					params: { sort: 'active' },
				},
				badge: {
					count: 10
				}
			},
			{
				name: "inactive",
				route: {
					name: 'guild-rules-view',
					params: { sort: 'inactive' },
					badge: {
						count: 1
					}
				}
			},
			{
				name: "reports",
				route: {
					name: 'guild-rules-reports'
				}
			},
			]
		}
	},
	computed: {
	}
}
</script>