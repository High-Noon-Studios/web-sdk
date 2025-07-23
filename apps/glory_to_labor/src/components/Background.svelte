<script lang="ts">
	import { Graphics, Rectangle, SpineProvider, SpineTrack, Container } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';
	import { COLORS } from '../game/constants';
	import PropagandaBurst from './PropagandaBurst.svelte';
	import { Tween } from 'svelte/motion';
	import { mount, onMount } from 'svelte';
	import { backInOut } from 'svelte/easing';

	const context = getContext();
	const backgroundProps = $derived(
		context.stateLayoutDerived.normalBackgroundLayout({ scale: 0.5 }),
	);
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freegame');

	const { width, height } = $derived(context.stateLayoutDerived.canvasSizes());

	const size = $derived(Math.max(width, height));

	const rotation = new Tween((-15 * Math.PI) / 180);
	const scale = new Tween(0.1);

	onMount(() => {
		rotation.set(0, { duration: 2000, easing: backInOut });
		scale.set(1, { duration: 2000, easing: backInOut });
	});
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={COLORS.cream} zIndex={-3} />

<Container x={width / 2} y={height / 2} rotation={rotation.current} scale={scale.current}>
	<PropagandaBurst wedges={40} innerR={0} outerR={size} color={0x8f1b1b} />
</Container>

<!-- <FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<SpineProvider key="backgroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'enter'} />
	</SpineProvider>
</FadeContainer>

<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-1}>
	<SpineProvider key="foregroundFeatureAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'idle'} loop />
	</SpineProvider>
	<SpineProvider key="foregroundFeatureAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'dust'} loop />
	</SpineProvider>
</FadeContainer> -->
