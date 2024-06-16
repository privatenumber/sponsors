<template>
	<div
		class="banner relative sans-serif rounded-md overflow-hidden"
	>
		<div class="relative z-10">
			<slot />
		</div>
		<div class="bg">
			<slot name="bg" />
		</div>
	</div>
</template>

<style scoped>
.banner {
	color: rgb(255 255 255 / 90%);

	@apply
		px-3.5
		py-3;
}

.bg {
	@apply
		absolute
		top-0
		left-0
		opacity-25
		z-0
		blur-[2px];

	/* transform: translateX(-10%) translateY(-25%); */
}
</style>
