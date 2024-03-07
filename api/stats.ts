import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';
import type { SponsorTiers } from './types.js';

type Data = {
	[Tier in SponsorTiers]: {
		[Type in 'link' | 'image']?: {
			[date: string]: number;
		};
	};
};

type KeyComponents = [string, SponsorTiers, 'link' | 'image'];

export default async (
	_request: VercelRequest,
	response: VercelResponse,
) => {
	const keys = await kv.keys('*');

	const data: Data = {
		platinum: {},
		gold: {},
		silver1: {},
		silver2: {},
	};

	const keyComponents = keys.map(key => [
		key,
		...key.split('_') as KeyComponents,
	] as const);

	const dates = new Set(keyComponents.map(([, date]) => date));
	const baseDateObject = Object.fromEntries(Array.from(dates).sort().map(date => [date, 0]));

	await Promise.all(keyComponents.map(([key, date, tier, type]) => {
		if (type === 'image') {
			return;
		}

		if (!Object.hasOwn(data[tier], type)) {
			data[tier][type] = { ...baseDateObject };
		}

		return (async () => {
			const count = await kv.get<number>(key);
			data[tier][type]![date] = count!;
		})();
	}));

	return response.json(data);
};
