<script setup lang="ts">
import PlaceholderBanner from './PlaceholderBanner.vue';
</script>

<template>
	<div class="flex gap-2 my-10 mx-10">
		<PlaceholderBanner
			id="donate"
			class="donate"
			title="Love using this project?"
		>
			<template #action>
				<IconMaterialSymbolsCoffee class="mr-1 text-pink-700" />
				<span class="text-pink-700">Buy me coffee</span>
			</template>

			I'm glad you found it so useful!
			If you're feeling generous, I'd appreciate a cup of coffee. Thanks!

			<template #bg>
				<img
					class="w-4/5 -translate-x-6 -translate-y-16"
					src="./heart.png"
				>
			</template>
		</PlaceholderBanner>

		<PlaceholderBanner
			id="sponsor"
			class="sponsor"
			title="Sponsors-only benefits"
		>
			<template #action>
				<IconMaterialSymbolsFavorite class="mr-1 text-cyan-700" />
				<span class="text-cyan-700">Join for $4</span>
			</template>

			Access the private dev repo for free support, pre-release downloads,
			and influence project planning!

			<template #bg>
				<img
					class="w-2/3 -translate-x-4 -translate-y-10"
					src="./galaxy-brain.png"
				>
			</template>
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
