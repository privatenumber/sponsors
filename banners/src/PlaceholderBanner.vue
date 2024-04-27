<script setup lang="ts">
import BannerContainer from './BannerContainer.vue';

defineProps<{
	title: string;
}>();
</script>

<template>
	<BannerContainer class="container">
		<div class="content-layer relative">
			<div
				v-if="$slots.action"
				class="
					button shadow-sm font-medium absolute
					flex items-center top-0 right-0 rounded
					px-3 py-2 gap-1
					text-sm
				"
			>
				<slot name="action" />
			</div>

			<div
				class="heading pt-1 text-xl font-semibold flex items-center"
			>
				{{ title }}
			</div>

			<p class="text-base font-light">
				<slot />
			</p>
		</div>
	</BannerContainer>
</template>

<style scoped>
.container {
	max-width: 412px;
	min-width: 412px;
	height: 130px;
}

.heading {
	@apply
			mb-3
			gap-2;

	text-shadow: 0px 2px 4px #00000030;
}

.button {
	background-color: rgb(255 255 255 / 90%);
}

.heart-icon {
	@apply w-6;
}

p {
	@apply
		mt-2
		;

	color: rgba(255 255 255 / 90%);
	text-shadow: 0px 2px 5px #00000030;
}
</style>
