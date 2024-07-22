import { defineConfig, tierPresets } from 'sponsorkit';

export default defineConfig({
	// Providers configs
	github: {
		type: 'user',
		login: 'privatenumber',
	},

	renders: [
		{
			name: 'sponsors',
			width: 800,
			formats: ['svg'],
			tiers: [
				{
					title: 'Past Sponsors',
					monthlyDollars: -1,
					preset: tierPresets.xs,
				},
				{
					title: 'Donors',
					preset: tierPresets.xs,
				},
				{
					title: 'Sponsors',
					monthlyDollars: 2,
					preset: tierPresets.base,
				},
				{
					title: 'Bronze Sponsors',
					monthlyDollars: 10,
					preset: tierPresets.medium,
				},
				{
					title: 'Silver Sponsors',
					monthlyDollars: 25,
					preset: tierPresets.large,
				},
				{
					title: 'Gold Sponsors',
					monthlyDollars: 100,
					preset: tierPresets.large,
				},
				{
					title: 'Premium Sponsors',
					monthlyDollars: 300,
					preset: tierPresets.xl,
				},
			],
		},
		{
			name: 'list',
			width: 640,
			formats: ['svg'],
			includePastSponsors: true,
			includePrivate: true,
			tiers: [
				{
					preset: tierPresets.xs,
				},
			],
		},
	],
});
