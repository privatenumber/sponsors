import { defineConfig, presets } from 'sponsorkit';

export default defineConfig({
	// Providers configs
	github: {
		type: 'user',
		login: 'privatenumber',
	},

	// Rendering configs
	width: 800,
	formats: ['svg', 'png'],
	tiers: [
		// Past sponsors, currently only supports GitHub
		{
			title: 'Past Sponsors',
			monthlyDollars: -1,
			preset: presets.xs,
		},
		// Default tier
		{
			title: 'Backers',
			preset: presets.base,
		},
		{
			title: 'Sponsors',
			monthlyDollars: 10,
			preset: presets.medium,
		},
		{
			title: 'Silver Sponsors',
			monthlyDollars: 50,
			preset: presets.large,
		},
		{
			title: 'Gold Sponsors',
			monthlyDollars: 100,
			preset: presets.xl,
		},
	],
});
