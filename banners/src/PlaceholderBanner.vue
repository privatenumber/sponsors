<template>
	<div
		class="banner relative sans-serif rounded-md overflow-hidden"
	>
		<img
			class="heart-bg absolute top-0 right-0 opacity-30"
			src="./heart-bg.png"
		>
		<div class="content-layer relative">
			<div
				class="
					learn-more-button shadow-sm font-medium absolute
					flex items-center top-0 right-0 rounded text-pink-700
				"
			>
				Sponsor $2
				<IconMaterialSymbolsChevronRightRounded class="w-5 h-5" />
			</div>

			<div
				class="heading flex items-center"
			>
				<IconOcticonHeartFill24 class="heart-icon mt-0.5" />
				Do you rely on this project? <span class="font-normal italic tracking-wide">Show your support!</span>
			</div>

			<p class="max-w-[70%]">
				If this project has helped you, you can help back by funding development.
				No matter the amount, your support will be greatly appreciated!
			</p>
		</div>
	</div>
</template>

<style scoped>
.banner {
	background: linear-gradient(25deg, #4158D0f0 0%, #C850C0f0 46%, #FFCC70f0 100%);
	color: rgb(255 255 255 / 90%);
	width: 830px;
	height: 130px;
	font-size: 15px;

	@apply
		px-6
		py-4;
}

.heading {
	@apply
			mb-3
			gap-2;

	font-weight: 600;
	font-size: 1.5em;
	text-shadow: 0px 2px 2px #00000030;
}

.learn-more-button {
	@apply
			px-4
			py-2
			gap-2;

	font-size: 1em;
	background-color: rgb(255 255 255 / 90%);
}

.heart-icon {
	@apply w-6;
}

.heart-bg {
	width: 30%;
	transform: translateX(-10%) translateY(-30%);
}

p {
	@apply
		mt-2
		leading-6
		text-base;

	color: rgba(255 255 255 / 90%);
	text-shadow: 0px 2px 4px #00000030;
}
</style>
