<template>
	<div
		class="banner relative sans-serif rounded-md overflow-hidden"
	>
		<div class="relative z-10">
			<slot />
		</div>
		<img
			class="heart-bg absolute top-0 left-0 opacity-20 z-0"
			src="./heart-bg.png"
		>
	</div>
</template>

<style scoped>
.banner {
	color: rgb(255 255 255 / 90%);

	@apply
		px-5
		py-3;
}

.heart-bg {
	width: 45%;
	transform: translateX(-10%) translateY(-25%);
}
</style>
