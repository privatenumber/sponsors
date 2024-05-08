import { defineConfig, presets } from 'sponsorkit';

export default defineConfig({
	// Providers configs
	github: {
		type: 'user',
		login: 'privatenumber',
	},

	// Rendering configs
	width: 800,
	formats: ['svg'],
	tiers: [
		{
			title: 'Past Sponsors',
			monthlyDollars: -1,
			preset: presets.xs,
		},
		{
			title: 'Donors',
			preset: presets.xs,
		},
		{
			title: 'Sponsors',
			monthlyDollars: 2,
			preset: presets.base,
		},
		{
			title: 'Bronze Sponsors',
			monthlyDollars: 10,
			preset: presets.medium,
		},
		{
			title: 'Silver Sponsors',
			monthlyDollars: 25,
			preset: presets.large,
		},
		{
			title: 'Gold Sponsors',
			monthlyDollars: 100,
			preset: presets.large,
		},
		{
			title: 'Premium Sponsors',
			monthlyDollars: 300,
			preset: presets.xl,
		},
	],
});
