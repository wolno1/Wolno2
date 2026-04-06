// Global configuration for comic metadata and available pages
// This is consumed by the comic reader component to build selectors and render pages.
window.comicsConfig = {
	defaultComicId: 'inusual-feelings',
	defaultLanguage: 'en',
	defaultDisplayMode: 'chapter',
	languages: [
		{ code: 'en', label: 'English', folder: 'en' },
		{ code: 'es', label: 'Español', folder: 'es' },
		{ code: 'ja', label: '日本語', folder: 'ja' },
		{ code: 'ru', label: 'Русский', folder: 'ru' }
	],
	comics: [
		{
			id: 'hope',
			slug: 'hope',
			title: 'HopE',
			summary: 'Follow Hope through a harsh world where optimism is her armor.',
			chapters: [
				{
					id: 'ch1',
					order: 1,
					selectLabel: '1',
					title: 'Chapter 1',
					pages: {
						en: [1],
						es: [1],
						ja: [1],
						ru: [1]
					}
				},
				{
					id: 'ch2',
					order: 2,
					selectLabel: '2',
					title: 'Chapter 2',
					pages: {
						en: [1, 2, 3],
						es: [],
						ja: [],
						ru: []
					}
				},
				{
					id: 'ch3',
					order: 3,
					selectLabel: '3',
					title: 'Chapter 3',
					pages: {
						en: [1, 2, 3],
						es: [],
						ja: [],
						ru: []
					}
				}
			]
		},
		{
			id: 'inusual-feelings',
			slug: 'inusual-feelings',
			title: 'Inu-sual Feelings',
			summary: 'Wolno faces the highs and lows of senior year when Inu arrives.',
			chapters: [
				{
					id: 'ch1',
					order: 1,
					selectLabel: "Chapter 1: Love's cliché",
					title: "Chapter 1: Love's cliché",
					pages: {
						en: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
						es: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
						ja: [],
						ru: []
					}
				},
				{
					id: 'ch2',
					order: 2,
					selectLabel: 'Chapter 2: Under the spotlight',
					title: 'Chapter 2: Under the spotlight',
					pages: {
						en: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
						es: [],
						ja: [],
						ru: []
					}
				},
				{
					id: 'ch3',
					order: 3,
					selectLabel: 'Chapter 3: The Inu Effect',
					title: 'Chapter 3: The Inu Effect',
					pages: {
						en: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
						es: [],
						ja: [],
						ru: []
					}
				}
			]
		},
		{
			id: 'mcthingies',
			slug: 'mcthingies',
			title: 'McThingies',
			summary: 'Short stories exploring the realities of life as an artist.',
			chapters: [
				{
					id: 'ch1',
					order: 1,
					selectLabel: 'Chapter 1: McEffacement',
					title: 'Chapter 1: McEffacement',
					pages: {
						en: [1],
						es: [],
						ja: [],
						ru: []
					}
				},
				{
					id: 'ch2',
					order: 2,
					selectLabel: 'Chapter 2: McParsimony',
					title: 'Chapter 2: McParsimony',
					pages: {
						en: [1],
						es: [],
						ja: [],
						ru: []
					}
				},
				{
					id: 'ch3',
					order: 3,
					selectLabel: 'Chapter 3: McVexation',
					title: 'Chapter 3: McVexation',
					pages: {
						en: [1],
						es: [],
						ja: [],
						ru: []
					}
				},
				{
					id: 'ch4',
					order: 4,
					selectLabel: 'Chapter 4: McInfutation',
					title: 'Chapter 4: McInfutation',
					pages: {
						en: [1],
						es: [],
						ja: [],
						ru: []
					}
				}
			]
		}
	]
};
