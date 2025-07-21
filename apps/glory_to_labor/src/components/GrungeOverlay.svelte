<script lang="ts">
	import { Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const { width, height } = context.stateLayoutDerived.canvasSizes();

	const SCALE_ADJUSTMENT = 1;
</script>

<FadeContainer show={true} duration={SECOND} zIndex={0}>
	<Sprite
		anchor={0.5}
		pivot={0.5}
		key="grunge"
		x={width / 2}
		y={height / 2}
		width={width * SCALE_ADJUSTMENT}
		height={height * SCALE_ADJUSTMENT}
		blendMode="screen"
		alpha={1}
	/>
</FadeContainer>