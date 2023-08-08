import path from 'path';
import fs from 'fs/promises';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

	if (!Object.hasOwn(sponsors, tier)) {
		return response.status(404).end('Specified sponsor not found');
	}

	// Cache for 24 hours
	response.setHeader('cache-control', 'public, max-age=86400');

	const sponsor = sponsors[tier as SponsorTiers];

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
		const [placeholderBanner, heartBg] = await Promise.all([
			fs.readFile(path.resolve(`./placeholder-banners/${fileName}.svg`), 'utf8'),
			fs.readFile(path.resolve('./placeholder-banners/heart-bg.png'), { encoding: 'base64' }),
		]);

		return response
			.setHeader('content-type', 'image/svg+xml')
			.end(placeholderBanner.replace('{{ heart_base64 }}', heartBg));
	}

	return response.redirect(302, 'https://github.com/sponsors/privatenumber');
};
