<script setup lang="ts">
import PlaceholderBanner from './PlaceholderBanner.vue';
</script>

<template>
	<div class="flex flex-col gap-4">
		<PlaceholderBanner
			id="platinum-light"
			tier="platinum"
		/>
		<PlaceholderBanner
			id="platinum-dark"
			mode="dark"
			tier="platinum"
		/>
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
</style>
