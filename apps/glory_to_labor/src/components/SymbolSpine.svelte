<script lang="ts">
	import { SpineProvider, SpineTrack, type SpineTrackProps, Container } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { getSymbolInfo } from '../game/utils';
	import SymbolSpineMain from './SymbolSpineMain.svelte';

	type Props = {
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		x?: number;
		y?: number;
		listener: SpineTrackProps['listener'];
		showWinFrame: boolean;
		loop?: boolean;
	};

	const props: Props = $props();
</script>


<!-- tumble frame -->
{#if props.showWinFrame}
<Container>
	<SpineProvider x={props.x} y={props.y} key="winFrame" width={SYMBOL_SIZE * 1.5}>
		<SpineTrack trackIndex={0} animationName={'idle'} loop />
	</SpineProvider>
</Container>
{/if}

<!-- main -->
<SymbolSpineMain
	x={props.x}
	y={props.y}
	symbolInfo={props.symbolInfo}
	listener={props.listener}
	loop={props.loop}
/>

