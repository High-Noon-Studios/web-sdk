<script lang="ts">
	import { SpineProvider, SpineTrack, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const { width, height } = context.stateLayoutDerived.mainLayoutStandard();

	const SCALE_ADJUSTMENT = 1.1;
</script>

<FadeContainer show={true} duration={SECOND}>
	<SpineProvider
		key="vignette"
		x={width / 2}
		y={height / 2}
		height={height * SCALE_ADJUSTMENT}
		width={width * SCALE_ADJUSTMENT}
	>
		<SpineTrack trackIndex={0} animationName={'idle'} loop={true} timeScale={1} />
	</SpineProvider>
</FadeContainer>

<!-- <Sprite
		anchor={0.5}
		pivot={0.5}
		key="vignette"
		x={width / 2}
		y={height / 2}
		width={width * SCALE_ADJUSTMENT}
		height={height * SCALE_ADJUSTMENT}
	/> -->
