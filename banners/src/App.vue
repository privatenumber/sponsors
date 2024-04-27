<script setup lang="ts">
import PlaceholderBanner from './PlaceholderBanner.vue';
</script>

<template>
	<div class="flex gap-2 my-10 mx-10">
		<PlaceholderBanner
			id="donate"
			class="donate"
			title="Enjoyed this project?"
		>
			<template #action>
				<IconMaterialSymbolsCoffee class="mr-1 text-pink-700" />
				<span class="text-pink-700">Buy me coffee</span>
			</template>

			I'm glad you found it useful!
			If you're feeling generous, I'd really appreciate a coffee.
		</PlaceholderBanner>
		<PlaceholderBanner
			id="sponsor"
			class="sponsor"
			title="Sponsorship program"
		>
			<template #action>
				<IconMaterialSymbolsFavorite class="mr-1 text-cyan-700" />
				<span class="text-cyan-700">Join for $2</span>
			</template>

			Join my sponsorship program to get early access to project development & releases, and Discussions!
		</PlaceholderBanner>
		<!--
		<PlaceholderBanner
			id="gold-light"
			tier="gold"
		/>

		<PlaceholderBanner
			id="gold-dark"
			mode="dark"
			tier="gold"
		/>

		<PlaceholderBanner
			id="silver-light"
			tier="silver"
		/>

		<PlaceholderBanner
			id="silver-dark"
			mode="dark"
			tier="silver"
		/> -->
	</div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.donate {
	background: linear-gradient(25deg, #4158D0f0 0%, #C850C0f0 46%, #FFCC70f0 100%);
}

.sponsor {
	background: linear-gradient(25deg, #4158D0f0 0%, #1bb29f 46%, #81F98F 100%);
}
</style>
