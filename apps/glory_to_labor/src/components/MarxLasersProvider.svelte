<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SpineProvider } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { Filters } from 'pixi-svelte';

	type Props = {
		children: Snippet;
		height: number;
	};

	const props: Props = $props();
	const context = getContext();

	const blurFilter = new Filters.DropShadowFilter({
		blur: 2,
		offset: { x: 0, y: 0 },
		color: 0x000000,
		alpha: 1,
	});
</script>

<SpineProvider
	x={context.stateGameDerived.boardLayout().x - context.stateGameDerived.boardLayout().width * 0.75}
	y={context.stateGameDerived.boardLayout().y + context.stateGameDerived.boardLayout().height * 0.5}
	key="marx"
	height={props.height}
	filters={[blurFilter]}
>
	{@render props.children()}
</SpineProvider>