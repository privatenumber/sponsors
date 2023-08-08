import path from 'path';
import fs from 'fs/promises';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

type Sponsor = {
	image: string;
	link: string;
};

const sponsors = {
	platinum: undefined,
	gold: undefined,
	silver1: undefined,
	silver2: undefined,
} satisfies Record<string, Sponsor | undefined>;

type SponsorTiers = keyof typeof sponsors;

export default async (
	request: VercelRequest,
	response: VercelResponse,
) => {
	const tier = request.query.tier as string;
	const serveImage = 'image' in request.query;
	const darkMode = request.query.image === 'dark';

	if (!Object.hasOwn(sponsors, tier)) {
		return response.status(404).end('Specified sponsor not found');
	}

	// Cache for 24 hours
	response.setHeader('cache-control', 'public, max-age=86400');

	const sponsor = sponsors[tier as SponsorTiers];

	const date = new Date().toISOString().split('T')[0];
	await kv.incr(`${date}_${tier}_${serveImage ? 'image' : 'link'}`);

	if (sponsor) {
		if (serveImage) {
			return response
				.setHeader('content-type', 'image/svg+xml')
				.end('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>');
		}

		// @ts-expect-error Will be fine when sponsors are added
		return response.redirect(302, sponsor.link);
	}

	if (serveImage) {
		const fileName = tier.replace(/\d$/, '');
		const placeholderBanner = await fs.readFile(path.join(process.cwd(), `./placeholder-banners/pngs/${fileName}-${darkMode ? 'dark' : 'light'}.png`));
		return response
			.setHeader('content-type', 'image/png')
			.end(placeholderBanner);
	}

	return response.redirect(302, 'https://github.com/sponsors/privatenumber');
};
