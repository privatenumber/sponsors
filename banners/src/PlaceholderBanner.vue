<script setup lang="ts">
import OcticonSponsorTiers24 from '~icons/octicon/sponsor-tiers-24';
import MaterialSymbolsChevronRightRounded from '~icons/material-symbols/chevron-right-rounded';

const props = defineProps<{
	mode?: 'dark';
	tier: 'platinum' | 'gold' | 'silver';
}>();

const capitalize = (string_: string) => string_.charAt(0).toUpperCase() + string_.slice(1);
</script>

<template>
	<div
		class="banner relative sans-serif rounded-md overflow-hidden"
		:class="[tier, mode]"
	>
		<img
			class="heart-bg absolute top-0 right-0 opacity-30"
			src="./heart-bg.png"
		>
		<div class="content-layer relative">
			<div
				class="learn-more-button shadow-sm font-medium absolute flex items-center top-0 right-0 rounded text-pink-700"
			>
				Learn more
				<MaterialSymbolsChevronRightRounded class="w-5 h-5" />
			</div>

			<div
				class="heading flex items-center"
			>
				<OcticonSponsorTiers24 class="text-pink-600 heart-icon" />
				Become a {{ capitalize(props.tier) }} sponsor!
			</div>

			<p>
				Your banner & link will be showcased right here, reaching a wide audience across all my projects and websites.
			</p>

			<p v-if="tier !== 'silver'">
				Sponsor to support the development of projects you use and love!
			</p>
		</div>
	</div>
</template>

<style scoped>

.platinum {
	width: 830px;
	height: 130px;
	font-size: 15px;

	@apply
		px-6
		py-4;

	& .heading {
		@apply
			mb-3
			gap-2;
	}

	& .heart-icon {
		@apply w-7;
	}

	& .learn-more-button {
		@apply
			px-4
			py-2
			gap-2;
	}

	& .heart-bg {
		width: 30%;
		transform: translateX(-10%) translateY(-30%);
	}
}

.gold {
	width: 830px;
	height: 100px;
	font-size: 14px;

	@apply
		px-6
		py-2;

	& .heading {
		@apply
			mb-1
			gap-2;
	}
	& .heart-icon {
		@apply w-6;
	}

	& .learn-more-button {
		@apply
			px-4
			py-1
			gap-2;
	}

	& .heart-bg {
		width: 25%;
		transform: translateX(-20%) translateY(-30%);
	}
}

.silver {
	width: 410px;
	height: 100px;
	font-size: 12px;

	@apply
		px-4
		py-4;

	& .heading {
		@apply
			mb-2
			gap-1;
	}
	& .heart-icon {
		@apply w-6;
	}

	& .learn-more-button {
		@apply
			px-2
			py-1
			gap-1;
	}

	& .heart-bg {
		width: 45%;
		transform: translateX(-10%) translateY(-30%);
	}
}

.banner {
	background-color: #F7F8FA;
	border: 1px solid #D7D8DB;
	color: rgb(37 41 47 / 70%);

	&.dark {
		background-color: #22262C;
		color: #CBD1D8;
		border-color: #373B41;
	}
}

.heading {
	font-weight: 600;
	font-size: 1.5em;
}

.learn-more-button {
	font-size: 1em;
	background-color: rgb(255 255 255 / 50%);
}

p {
	line-height: 1.4em;
	font-size: 1em;
	margin: 4px 0;
}
</style>
