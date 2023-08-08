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
		{
			title: 'Past Sponsors',
			monthlyDollars: -1,
			preset: presets.xs,
		},
		{
			title: 'Appreciator',
			monthlyDollars: 10,
			preset: presets.small,
		},
		{
			title: 'Supporter',
			monthlyDollars: 25,
			preset: presets.small,
		},
		{
			title: 'Project backer',
			monthlyDollars: 70,
			preset: presets.medium,
		},
		{
			title: 'Priority Patron',
			monthlyDollars: 150,
			preset: presets.medium,
		},
		{
			title: 'Silver Sponsors',
			monthlyDollars: 300,
			preset: presets.large,
		},
		{
			title: 'Gold Sponsors',
			monthlyDollars: 600,
			preset: presets.large,
		},
		{
			title: 'Platinum Sponsors',
			monthlyDollars: 1500,
			preset: presets.xl,
		},
	],
});
