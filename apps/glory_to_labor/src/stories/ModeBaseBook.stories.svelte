<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'MODE_BASE/book',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';
	import { randomInteger } from 'utils-shared/random';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { playBet } from '../game/utils';
	import books from './data/base_books';

	setContext();
</script>

{#snippet template(args: TemplateArgs<any>)}
	<StoryGameTemplate
		skipLoadingScreen={args.skipLoadingScreen}
		action={async () => {
			await args.action?.(args.data);
		}}
	>
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

<Story
	name="random"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			const index = randomInteger({ min: 0, max: books.length - 1 });
			const data = books[index];
			console.log('Running a book at index', index);
			await playBet({ ...data, state: data.events });
		},
	})}
	{template}
/>

<Story
	name="h"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log(JSON.stringify(books[0], null, 2))
			const index = books.findIndex((book) => book.payoutMultiplier === 0);
			const data = books[index];
			data.events = data.events.map(event => {
				if (event.type === 'reveal') {
					return {
						...event,
						board: [
              [
                {
                  "name": "H1"
                },
                {
                  "name": "H2"
                },
                {
                  "name": "H3"
                },
                {
                  "name": "H4"
                },
                {
                  "name": "H1"
                }
              ],
              [
                {
                  "name": "H2"
                },
                {
                  "name": "H3"
                },
                {
                  "name": "H4"
                },
                {
                  "name": "H1"
                },
                {
                  "name": "H2"
                }
              ],
              [
                {
                  "name": "H3"
                },
                {
                  "name": "H4"
                },
                {
                  "name": "H1"
                },
                {
                  "name": "H2"
                },
                {
                  "name": "H3"
                }
              ],
              [
                {
                  "name": "H4"
                },
                {
                  "name": "H1"
                },
                {
                  "name": "H2"
                },
                {
                  "name": "H3"
                },
                {
                  "name": "H4"
                }
              ],
              [
                {
                  "name": "H1"
                },
                {
                  "name": "H2"
                },
                {
                  "name": "H3"
                },
                {
                  "name": "H4"
                },
                {
                  "name": "H1"
                }
              ]
            ]
          };
				} else {
					return event;
				}
			});
			console.log('Running a book at index', index);
			await playBet({ ...data, state: data.events });
		},
	})}
	{template}
/>

<Story
	name="freespin"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			const index = books.findIndex((book) =>
				book.events.some((event) => event.type === 'freeSpinTrigger'),
			);
			const data = books[index];
			console.log('Running a book at index', index);
			await playBet({ ...data, state: data.events });
		},
	})}
	{template}
/>

<Story
	name="freespin_big"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			const index = books.findIndex((book) =>
				book.events.some((event) => event.type === 'freeSpinTrigger') && book.payoutMultiplier > 10000,
			);
			const data = books[index];
			console.log('Running a book at index', index);
			await playBet({ ...data, state: data.events });
		},
	})}
	{template}
/>