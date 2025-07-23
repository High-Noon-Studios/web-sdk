<script lang="ts">
	import { Container, Filters, Graphics } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();
	const { width, height } = context.stateLayoutDerived.mainLayoutStandard();

	const oldFilmFilter = new Filters.CRTFilter({
		noise: 0.2,
		noiseSize: 1,
		seed: 1,
		vignetting: 0.3,
		vignettingAlpha: 1,
		vignettingBlur: 0.68,
	});
</script>

<Container filters={[oldFilmFilter]}>
	<Graphics
		draw={(g) => {
			g.clear();
			g.rect(0, 0, width, height);
			g.fill({ color: 0xffffff, alpha: 0.1 });
		}}
		x={0}
		y={0}
		width={width}
		height={height}
		blendMode="screen"
	/>
</Container>