<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SpineProvider, SpineTrack } from 'pixi-svelte';
	import { getContext } from '../game/context';

	type Props = {
		children: Snippet;
		height: number;
	};

	const props: Props = $props();
	const context = getContext();
</script>

<SpineProvider
	x={context.stateGameDerived.boardLayout().x - context.stateGameDerived.boardLayout().width * 0.75}
	y={context.stateGameDerived.boardLayout().y}
	key="marx"
	height={props.height}
>
	{@render props.children()}
</SpineProvider>