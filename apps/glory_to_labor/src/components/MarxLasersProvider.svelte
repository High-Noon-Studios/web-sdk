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
	const board = context.stateGameDerived.boardLayout();

</script>

<SpineProvider
	x={board.x + board.width * 0.75}
	y={board.y}
	key="marx"
	height={props.height}
>
	<SpineTrack
		loop={false}
		trackIndex={0}
		animationName="static"
		timeScale={1}
	/>

	{@render props.children()}
</SpineProvider>