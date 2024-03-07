import type { StatsData } from '../api/stats.js';

const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

(async () => {
	const response = await fetch('https://privatenumber-sponsors.vercel.app/api/stats');
	const stats: StatsData = await response.json();
	const counted = Object.fromEntries(
		Object.entries(stats).map(
			([key, value]) => [key, sum(Object.values(value.link!))],
		),
	);

	console.log(counted);
})();
