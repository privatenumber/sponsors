import fs from 'fs/promises';
import { graphql } from '@octokit/graphql';
import { gql } from 'code-tag';

type GitHubGraphQlPageInfo = {
	endCursor: string;
	hasNextPage: boolean;
};

type GraphQlResult<Property extends string, T> = {
	viewer: {
		[Key in Property]: T & {
			totalCount: number;
			pageInfo: GitHubGraphQlPageInfo;
		};
	};
};

const getAllPages = async <
	Property extends string,
	Fetch extends (cursor?: string) => Promise<GraphQlResult<Property, unknown>>
>(
	property: Property,
	getPage: Fetch,
) => {
	const allItems: unknown[] = [];
	let pageInfo: GitHubGraphQlPageInfo | undefined;
	do {
		const page = await getPage(pageInfo?.endCursor);
		const result = page.viewer[property];
		allItems.push(result);

		pageInfo = result.pageInfo;
	} while (pageInfo.hasNextPage);

	return allItems as Awaited<ReturnType<Fetch>>['viewer'][Property][];
};

type SponsorType = 'User' | 'Organization';

type SponsorEntity = {
	nodes: {
		sponsorEntity: {
			login: string;
			__typename: SponsorType;
		};
	}[];
};

const getSponsors = async (
	cursor?: string,
) => graphql<GraphQlResult<'sponsorshipsAsMaintainer', SponsorEntity>>(
	gql`
		query {
			viewer {
				sponsorshipsAsMaintainer(
					first: 100,
					orderBy: { field: CREATED_AT, direction: ASC },
					activeOnly: false,
					${cursor ? `after: "${cursor}"` : ''}
				) {
					totalCount
					pageInfo {
						endCursor
						hasNextPage
					}
					nodes {
						${

						/**
						 * We don't need to filter by privacy level
						 * because includePrivate defaults to false
						 */
						''
						}
						sponsorEntity {
							__typename
							... on User { login }
							... on Organization {login}
						}
					}
				}
			}
		}
	`,
	{
		headers: {
			authorization: `token ${process.env.SPONSORKIT_GITHUB_TOKEN}`,
		},
	},
);

(async () => {
	const resultPages = await getAllPages('sponsorshipsAsMaintainer', getSponsors);

	const userSponsors: string[] = [];
	const orgSponsors: string[] = [];

	for (const page of resultPages) {
		for (const { sponsorEntity } of page.nodes) {
			if (sponsorEntity.__typename === 'User') {
				userSponsors.push(sponsorEntity.login);
			} else {
				orgSponsors.push(sponsorEntity.login);
			}
		}
	}

	const data = {
		users: userSponsors,
		organizations: orgSponsors,
		fetched: new Date(),
	};

	console.log(data);

	await fs.writeFile(
		'./sponsorkit/sponsors.json',
		`${JSON.stringify(data)}\n`,
	);
})();
