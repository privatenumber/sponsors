import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';
import type { SponsorTiers } from './types.js';

type Sponsor = {
	image: string;
	link: string;
};

const sponsors = {
	platinum: undefined,
	gold: undefined,
	silver1: undefined,
	silver2: undefined,
} satisfies Record<SponsorTiers, Sponsor | undefined>;

const trackVisitorCount = async (key: string) => {
	const date = new Date().toISOString().split('T')[0];
	await kv.incr(`${date}_${key}`);
};

const requestHandler = async (
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

	/**
	 * Only track links because images slow down page load and also,
	 * GitHub caches the images anyway so we can't get accurate results
	 */
	if (!serveImage) {
		await trackVisitorCount(`${tier}_link`);
	}

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
		return response.redirect(302, `/banners/assets/${fileName}-${darkMode ? 'dark' : 'light'}.webp`);
	}

	return response.redirect(302, 'https://github.com/sponsors/privatenumber');
};

export default requestHandler;
