<template>
	<div>
		<div class="grid grid-cols-12 p-8">
			<div class="col-start-2 col-end-12">
				<div class="space-y-12">
					<Trigger :active="true"/>
					<Condition class="hidden"/>
					<Action class="hidden"/>
				</div>
			</div>
		</div>
	</div>
</template>